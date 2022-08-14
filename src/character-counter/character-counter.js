import { Controller } from "@hotwired/stimulus";

/**
 * @property {HTMLInputElement | HTMLTextAreaElement} textTarget
 * @property {HTMLElement} outputTarget
 */
export class CharacterCounterController extends Controller {
  static targets = ["text", "output"];

  connect() {
    this.formatter = new Intl.NumberFormat();
    this.update();
  }

  update() {
    this.outputTarget.textContent = this.formatter.format(this.length);
  }

  get length() {
    return Array.from(this.textTarget.value).length;
  }
}
