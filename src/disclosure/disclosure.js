import { Controller } from "@hotwired/stimulus";
import { listen } from "../helpers.js";

export class DisclosureController extends Controller {
  get expanded() {
    return this.element.getAttribute("aria-expanded") === "true";
  }

  /** @param {boolean} expanded */
  set expanded(expanded) {
    this.element.setAttribute("aria-expanded", String(expanded));
  }

  connect() {
    this.controlled =
      this.element
        .getAttribute("aria-controls")
        .split?.(/\s+/)
        .map((id) => this.element.ownerDocument.getElementById(id))
        .filter((el) => Boolean(el)) ?? [];

    this.subscriptions = [
      listen(this.element, "click", this.toggle.bind(this)),
    ];

    this.update_();
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  toggle() {
    this.expanded = !this.expanded;
    this.update_();
  }

  /** @private */
  update_() {
    this.controlled.forEach((el) =>
      el.setAttribute("aria-hidden", String(!this.expanded))
    );
  }
}
