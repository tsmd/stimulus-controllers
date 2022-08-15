import { Controller } from "@hotwired/stimulus";
import { listen } from "../helpers.js";

/**
 * @property {HTMLInputElement} inputTarget
 * @property {HTMLButtonElement} clearTarget
 */
export class ClearInputController extends Controller {
  static targets = ["input", "clear"];

  connect() {
    this.clearTarget.tabIndex = -1;
    this.clearTarget.style.display = "none";

    this.subscriptions = [
      listen(this.clearTarget, "click", this.clear_.bind(this)),
      listen(this.element, "focusout", this.hideButton_.bind(this)),
      listen(this.inputTarget, "focus", this.update_.bind(this)),
      listen(this.inputTarget, "input", this.update_.bind(this)),
      listen(this.inputTarget, "mouseout", this.hideButton_.bind(this)),
      listen(this.inputTarget, "mouseover", this.update_.bind(this)),
    ];
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  clear_() {
    this.inputTarget.value = "";
    this.update_();
    this.inputTarget.focus();
  }

  update_() {
    this.clearTarget.style.display =
      Boolean(this.inputTarget.value) &&
      !this.inputTarget.readOnly &&
      this.inputTarget.getAttribute("aria-disabled") !== "true" &&
      this.inputTarget.getAttribute("aria-readonly") !== "true"
        ? ""
        : "none";
  }

  hideButton_(e) {
    if (!this.element.contains(e.relatedTarget)) {
      this.clearTarget.style.display = "none";
    }
  }
}
