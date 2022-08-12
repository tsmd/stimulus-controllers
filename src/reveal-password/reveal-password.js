import { Controller } from "@hotwired/stimulus";

/**
 * @property {boolean} alwaysValue
 * @property {HTMLInputElement} passwordTarget
 * @property {HTMLButtonElement} revealTarget
 */
export class RevealPasswordController extends Controller {
  static values = {
    always: {
      type: Boolean,
      default: false,
    },
  };

  static targets = ["password", "reveal"];

  get revealed() {
    return this.revealTarget.getAttribute("aria-pressed") === "true";
  }

  /** @param {boolean} revealed */
  set revealed(revealed) {
    this.revealTarget.setAttribute("aria-pressed", String(revealed));
    this.passwordTarget.type = revealed ? "text" : "password";
  }

  connect() {
    this.passwordTarget.addEventListener("input", this.update_);
    this.passwordTarget.form?.addEventListener("submit", this.revert_);
    this.revealTarget.addEventListener("click", this.toggle);

    this.update_();
  }

  disconnect() {
    this.passwordTarget.removeEventListener("input", this.update_);
    this.passwordTarget.form?.removeEventListener("submit", this.revert_);
    this.revealTarget.removeEventListener("click", this.toggle);
  }

  toggle = () => {
    this.revealed = !this.revealed;
  };

  update_ = () => {
    this.revealTarget.hidden =
      !this.alwaysValue && !Boolean(this.passwordTarget.value);
  };

  revert_ = () => {
    this.revealed = false;
  };
}
