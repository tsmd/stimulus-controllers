import { Controller } from "@hotwired/stimulus";
import A11yDialog from "a11y-dialog";

/**
 * @property {HTMLElement[]} transitionTargets
 * @property {boolean} openedValue
 */
export class DialogController extends Controller {
  static targets = ["transition"];

  initialize() {
    this.opened = false;
  }

  connect() {
    this.dialog = new A11yDialog(this.element);

    // Dealing with being closed by Esc key
    this.dialog.on("hide", this.close);
  }

  disconnect() {
    this.dialog.off("hide", this.close);
    this.dialog.destroy();
  }

  open = () => {
    if (this.opened) {
      return;
    }
    this.opened = true;

    this.transitionTargets.forEach((targetEl) => {
      const [enter, enterFrom] = getTokens(targetEl, "enter", "enterFrom");
      targetEl.classList.add(...enter, ...enterFrom);
    });

    this.element.style.display = "";
    this.dialog.show();

    requestAnimationFrame(() => {
      this.transitionTargets.forEach(async (targetEl) => {
        const [enter, enterFrom, enterTo] = getTokens(
          targetEl,
          "enter",
          "enterFrom",
          "enterTo"
        );
        targetEl.classList.remove(...enterFrom);
        targetEl.classList.add(...enterTo);
        await animationsComplete(targetEl);
        targetEl.classList.remove(...enter, ...enterTo);
      });
    });
  };

  close = () => {
    if (!this.opened) {
      return;
    }
    this.opened = false;

    this.transitionTargets.forEach((targetEl) => {
      const [leave, leaveFrom] = getTokens(targetEl, "leave", "leaveFrom");
      targetEl.classList.add(...leave, ...leaveFrom);
    });
    requestAnimationFrame(async () => {
      await Promise.allSettled(
        this.transitionTargets.map(async (targetEl) => {
          const [leaveFrom, leaveTo] = getTokens(
            targetEl,
            "leaveFrom",
            "leaveTo"
          );
          targetEl.classList.remove(...leaveFrom);
          targetEl.classList.add(...leaveTo);
          await animationsComplete(targetEl);
        })
      );

      this.dialog.hide();
      this.element.style.display = "none";

      this.transitionTargets.forEach((targetEl) => {
        const [leave, leaveTo] = getTokens(targetEl, "leave", "leaveTo");
        targetEl.classList.remove(...leave, ...leaveTo);
      });
    });
  };
}

function getTokens(element, ...names) {
  return names.map((name) => element.dataset[name]?.split(/\s+/) ?? []);
}

function animationsComplete(element) {
  if (!("allSettled" in Promise)) {
    return Promise.resolve();
  }
  return Promise.allSettled(
    element.getAnimations().map((animation) => animation.finished)
  );
}
