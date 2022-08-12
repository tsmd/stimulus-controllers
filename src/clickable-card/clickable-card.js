import { Controller } from "@hotwired/stimulus";

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
    this.element.addEventListener("mousedown", this.mouseDown_);
    this.element.addEventListener("mouseup", this.mouseUp_);
  }

  disconnect() {
    this.element.removeEventListener("mousedown", this.mouseDown_);
    this.element.removeEventListener("mouseup", this.mouseUp_);
  }

  /** @type {MouseEvent} e */
  mouseDown_ = (e) => {
    this.screenX_ = e.screenX;
    this.screenY_ = e.screenY;
  };

  /** @type {MouseEvent} e */
  mouseUp_ = (e) => {
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
  };
}
