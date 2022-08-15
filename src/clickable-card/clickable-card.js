import { Controller } from "@hotwired/stimulus";
import { listen } from "../helpers.js";

/**
 * @property {HTMLAnchorElement} linkTarget
 */
export class ClickableCardController extends Controller {
  static targets = ["link"];

  initialize() {
    /** @private */
    this.screenX_ = -1;
    this.screenY_ = -1;
  }

  connect() {
    this.element.style.cursor = "pointer";

    this.subscriptions = [
      listen(this.element, "mousedown", this.mouseDown_.bind(this)),
      listen(this.element, "mouseup", this.mouseUp_.bind(this)),
    ];
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  /** @type {MouseEvent} e */
  mouseDown_(e) {
    this.screenX_ = e.screenX;
    this.screenY_ = e.screenY;
  }

  /** @type {MouseEvent} e */
  mouseUp_(e) {
    if (this.linkTarget.contains(e.target)) {
      return;
    }

    if (
      Math.abs(e.screenX - this.screenX_) < 5 &&
      Math.abs(e.screenY - this.screenY_) < 5
    ) {
      const clickEvent = new MouseEvent("click", {
        altKey: e.altKey,
        bubbles: true,
        button: e.button,
        cancelable: true,
        ctrlKey: e.ctrlKey,
        metaKey: e.metaKey,
        shiftKey: e.shiftKey,
      });
      this.linkTarget.dispatchEvent(clickEvent);
    }

    this.screenX_ = -1;
    this.screenY_ = -1;
  }
}
