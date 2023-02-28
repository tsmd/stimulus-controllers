import { Controller } from "@hotwired/stimulus";
import { tabbable } from "tabbable";
import { listen } from "../helpers.js";

export class FocusTrapController extends Controller {
  static targets = ["trapInto"];

  connect() {
    this.enabled = false;

    this.subscriptions = [
      listen(window, "focusin", this.handleWindowFocusin_.bind(this)),
      listen(this.target, "keydown", this.handleKeydown_.bind(this)),
    ];
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  enable() {
    this.enabled = true;

    if (!this.target.contains(document.activeElement)) {
      this.focusFirstTabbable();
    }
  }

  disable() {
    this.enabled = false;
  }

  focusFirstTabbable() {
    this.firstTabbable?.focus();
  }

  focusLastTabbable() {
    this.lastTabbable?.focus();
  }

  /** @private */
  handleWindowFocusin_(e) {
    if (!this.enabled) {
      return;
    }
    if (this.target.contains(e.target)) {
      return;
    }
    this.focusFirstTabbable();
  }

  /** @private */
  handleKeydown_(e) {
    const { key, shiftKey, target } = e;

    if (!this.enabled) {
      return;
    }
    if (key !== "Tab") {
      return;
    }

    if (shiftKey && target === this.firstTabbable) {
      this.focusLastTabbable();
      e.preventDefault();
    } else if (!shiftKey && target === this.lastTabbable) {
      this.focusFirstTabbable();
      e.preventDefault();
    }
  }

  get firstTabbable() {
    return this.tabbables[0];
  }

  get lastTabbable() {
    const tabbables = this.tabbables;
    return tabbables[tabbables.length - 1];
  }

  get tabbables() {
    return tabbable(this.target);
  }

  get target() {
    return this.hasTrapIntoTarget ? this.trapIntoTarget : this.element;
  }
}
