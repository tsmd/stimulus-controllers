import { Controller } from "@hotwired/stimulus";
import Eripusisu from "eripusisu";
import { randomId } from "../helpers.js";

/**
 * @property {HTMLButtonElement} toggleTarget
 * @property {HTMLElement[]} containerTargets
 */
export class EripusisuController extends Controller {
  static targets = ["toggle", "container"];

  get expanded() {
    return this.toggleTarget.getAttribute("aria-expanded") === "true";
  }

  /** @param {boolean} expanded */
  set expanded(expanded) {
    this.toggleTarget.setAttribute("aria-expanded", String(expanded));
  }

  connect() {
    const eripusisuInstances = [];
    const containerIds = [];

    for (const container of this.containerTargets) {
      const lines = parseInt(container.dataset.lines || 1);
      const instance = new Eripusisu(container, lines);
      eripusisuInstances.push(instance);

      container.id = container.id || randomId(`${this.identifier}-`);
      containerIds.push(container.id);
    }

    this.toggleTarget.setAttribute("aria-controls", containerIds.join(" "));

    /** @type {Eripusisu[]} */
    this.eripusisuInstances = eripusisuInstances;

    this.updateView_();
  }

  disconnect() {
    this.eripusisuInstances.forEach(({ destroy }) => destroy());
  }

  toggle() {
    const needsCollapse = this.eripusisuInstances.some(
      (ellipsis) => ellipsis.needsCollapse
    );
    if (!needsCollapse) {
      return;
    }

    this.expanded = !this.expanded;
    this.eripusisuInstances.forEach((ellipsis) =>
      ellipsis.toggle(this.expanded)
    );
    this.updateView_();
  }

  /** @private */
  updateView_() {
    const needsCollapse = this.eripusisuInstances.some(
      (eripusisu) => eripusisu.needsCollapse
    );
    this.toggleTarget.style.display = needsCollapse ? "" : "none";
  }

  refresh() {
    this.eripusisuInstances.forEach((eripusisu) => {
      eripusisu.refresh();
    });
    this.updateView_();
  }
}
