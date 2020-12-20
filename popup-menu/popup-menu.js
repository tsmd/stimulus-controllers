import {
  Application,
  Controller,
} from "https://cdn.skypack.dev/pin/stimulus@v2.0.0-EVt9D8pnFxBm3QrYD84I/stimulus.js";

class PopupMenuController extends Controller {
  static get targets() {
    return ["item"];
  }

  disconnect() {
    this.close();
  }

  closeOnClickOutside({ target }) {
    if (this.element.contains(target)) {
      return;
    }
    this.close();
  }

  closeOnFocusOut({ relatedTarget }) {
    if (!this.element.contains(relatedTarget)) {
      this.close();
    }
  }

  updateSelectionWithKeyboard(event) {
    if (!this.element.open) {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          this.open();
          this.focusLast();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.open();
          this.focusFirst();
          break;
      }
    } else {
      switch (event.key) {
        case "ArrowUp":
          event.preventDefault();
          this.focusPrevious();
          break;
        case "ArrowDown":
          event.preventDefault();
          this.focusNext();
          break;
        case "Escape":
          event.preventDefault();
          this.close();
          this.summaryElement.focus();
          break;
      }
    }
  }

  // ---
  // Private

  open() {
    this.element.open = true;
  }

  close() {
    this.element.open = false;
  }

  async focusFirst() {
    await nextFrame();
    this.itemTargets[0]?.focus();
  }

  async focusLast() {
    await nextFrame();
    const { itemTargets } = this;
    itemTargets[itemTargets.length - 1]?.focus();
  }

  async focusPrevious() {
    await nextFrame();
    const { activeIndex } = this;
    if (activeIndex <= 0) {
      this.focusLast();
      return;
    }
    this.itemTargets[activeIndex - 1].focus();
  }

  async focusNext() {
    await nextFrame();
    const { itemTargets, activeIndex } = this;
    if (activeIndex < 0 || activeIndex >= itemTargets.length - 1) {
      this.focusFirst();
      return;
    }
    this.itemTargets[activeIndex + 1].focus();
  }

  get activeIndex() {
    return this.itemTargets.indexOf(document.activeElement);
  }

  get summaryElement() {
    return this.element.firstElementChild;
  }
}

function nextFrame() {
  return new Promise(requestAnimationFrame);
}

const app = Application.start();
app.register("popup-menu", PopupMenuController);
