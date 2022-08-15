import { Controller } from "@hotwired/stimulus";
import { listen, randomId } from "../helpers.js";

/**
 * @property {number} selectedIndexValue
 */
export class TabsController extends Controller {
  static values = {
    selectedIndex: {
      type: Number,
      default: 0,
    },
  };

  connect() {
    this.tabList = this.element.querySelector("[role='tablist']");
    this.tabs = [...this.tabList.querySelectorAll("[role='tab']")];
    this.tabPanels = [
      ...this.element.querySelectorAll("[role='tabpanel']"),
    ].filter(
      (panel) =>
        panel.closest(`[data-controller='${this.identifier}']`) === this.element
    );

    // Add event listeners
    this.subscriptions = [
      listen(this.tabList, "keydown", this.handleListKeydown_.bind(this)),
      ...this.tabs.map((tab) =>
        listen(tab, "click", this.handleTabClick_.bind(this))
      ),
    ];

    this.prepareAttributes_();
    this.updateSelected_();
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  first() {
    this.select_(0);
  }

  previous() {
    this.select_(
      (this.selectedIndexValue - 1 + this.tabs.length) % this.tabs.length
    );
  }

  next() {
    this.select_(
      (this.selectedIndexValue + 1 + this.tabs.length) % this.tabs.length
    );
  }

  last() {
    this.select_(this.tabs.length - 1);
  }

  focusSelected() {
    this.tabs[this.selectedIndexValue].focus();
  }

  /**
   * @param {number} index
   * @private
   */
  select_(index) {
    this.selectedIndexValue = index;
    this.updateSelected_();
  }
  /**
   * @param {KeyboardEvent} e
   * @private
   */
  handleListKeydown_(e) {
    switch (e.key) {
      case "Home":
        this.first();
        this.focusSelected();
        break;
      case "ArrowUp":
      case "ArrowLeft":
        e.preventDefault();
        this.previous();
        this.focusSelected();
        break;
      case "ArrowDown":
      case "ArrowRight":
        e.preventDefault();
        this.next();
        this.focusSelected();
        break;
      case "End":
        this.last();
        this.focusSelected();
        break;
    }
  }

  /**
   * @param {MouseEvent} e
   * @private
   */
  handleTabClick_(e) {
    const index = this.tabs.indexOf(e.currentTarget);
    if (index >= 0) {
      this.select_(index);
    }
    e.preventDefault();
  }

  /** @private */
  prepareAttributes_() {
    for (let i = 0; i < this.tabs.length; i += 1) {
      const tab = this.tabs[i];
      const panel = this.tabPanels[i];
      const id = randomId(`${this.identifier}-`);
      tab.id = id;
      panel.setAttribute("aria-labelledby", id);
      tab.setAttribute("aria-controls", `${id}-panel`);
      panel.id = `${id}-panel`;
      panel.tabIndex = 0;
    }
  }

  /** @private */
  updateSelected_() {
    this.tabs.forEach((tab, i) => {
      const selected = this.selectedIndexValue === i;
      tab.setAttribute("aria-selected", String(selected));
      tab.tabIndex = selected ? 0 : -1;
    });
    this.tabPanels.forEach((panel, i) => {
      const selected = this.selectedIndexValue === i;
      panel.style.display = selected ? "" : "none";
    });
  }
}
