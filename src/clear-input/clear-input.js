import { Controller } from "@hotwired/stimulus";

/**
 * @property {HTMLInputElement} inputTarget
 * @property {HTMLButtonElement} clearTarget
 */
export class ClearInputController extends Controller {
  static targets = ["input", "clear"];

  connect() {
    this.clearTarget.tabIndex = -1;
    this.clearTarget.hidden = true;

    this.clearTarget.addEventListener("click", this.clear_);
    this.element.addEventListener("focusout", this.hideButton_);
    this.inputTarget.addEventListener("focus", this.update_);
    this.inputTarget.addEventListener("input", this.update_);
    this.inputTarget.addEventListener("mouseout", this.hideButton_);
    this.inputTarget.addEventListener("mouseover", this.update_);
  }

  disconnect() {
    this.clearTarget.removeEventListener("click", this.clear_);
    this.element.removeEventListener("focusout", this.hideButton_);
    this.inputTarget.removeEventListener("focus", this.update_);
    this.inputTarget.removeEventListener("input", this.update_);
    this.inputTarget.removeEventListener("mouseout", this.hideButton_);
    this.inputTarget.removeEventListener("mouseover", this.update_);
  }

  clear_ = () => {
    this.inputTarget.value = "";
    this.update_();
    this.inputTarget.focus();
  };

  update_ = () => {
    this.clearTarget.hidden = !(
      Boolean(this.inputTarget.value) &&
      !this.inputTarget.readOnly &&
      this.inputTarget.getAttribute("aria-disabled") !== "true" &&
      this.inputTarget.getAttribute("aria-readonly") !== "true"
    );
  };

  hideButton_ = (e) => {
    if (!this.element.contains(e.relatedTarget)) {
      this.clearTarget.hidden = true;
    }
  };
}
