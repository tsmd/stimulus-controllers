import { Controller } from "@hotwired/stimulus";
import { listen } from "../helpers.js";

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
    this.subscriptions = [
      listen(this.passwordTarget, "input", this.update_.bind(this)),
      listen(this.revealTarget, "click", this.toggle.bind(this)),
    ];

    if (this.passwordTarget.form) {
      this.subscriptions.push(
        listen(this.passwordTarget.form, "submit", this.revert_.bind(this))
      );
    }

    this.update_();
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  toggle = () => {
    this.revealed = !this.revealed;
  };

  update_ = () => {
    this.revealTarget.style.display =
      this.alwaysValue || Boolean(this.passwordTarget.value) ? "" : "none";
  };

  revert_ = () => {
    this.revealed = false;
  };
}
