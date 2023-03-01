import { Controller } from "@hotwired/stimulus";
import { tabbable } from "tabbable";

/**
 * @property {HTMLElement} containerTarget
 * @property {boolean} hasContentTarget
 * @property {HTMLTemplateElement} contentTarget
 * @property {boolean} hasButtonContainerTarget
 * @property {HTMLElement} buttonContainerTarget
 */
export class InlayController extends Controller {
  static targets = ["container", "content", "buttonContainer"];

  show() {
    if (this.hasContentTarget) {
      const contentToAppend = this.contentTarget.content;
      const focusTo = tabbable(contentToAppend)[0];
      this.containerTarget.appendChild(contentToAppend);
      this.contentTarget.remove();
      focusTo?.focus({ preventScroll: true });

      if (!this.hasContentTarget && this.hasButtonContainerTarget) {
        this.buttonContainerTarget.remove();
      }
    }
  }
}
