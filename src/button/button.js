import { Controller } from "@hotwired/stimulus";
import { listen } from "../helpers.js";

export class ButtonController extends Controller {
  connect() {
    this.element.setAttribute("role", "button");
    if (!this.element.hasAttribute("tabindex")) {
      this.element.tabIndex = 0;
    }

    this.subscriptions = [
      listen(this.element, "keydown", this.handleKeydown.bind(this)),
      listen(this.element, "keyup", this.handleKeyup.bind(this)),
    ];
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  /** @param {KeyboardEvent}e */
  handleKeydown(e) {
    if (e.key === " ") {
      e.preventDefault();
    } else if (e.key === "Enter") {
      e.preventDefault();
      this.dispatchClickEvent(e);
    }
  }

  /** @param {KeyboardEvent} e */
  handleKeyup(e) {
    if (e.key === " ") {
      e.preventDefault();
      this.dispatchClickEvent(e);
    }
  }

  /** @param {KeyboardEvent} e */
  dispatchClickEvent(e) {
    // this.element.click();
    const clickEvent = new MouseEvent("click", {
      bubbles: true,
      cancelable: true,
      shiftKey: e.shiftKey,
      ctrlKey: e.ctrlKey,
      altKey: e.altKey,
      metaKey: e.metaKey,
    });
    this.element.dispatchEvent(clickEvent);
  }
}
