import { Controller } from "@hotwired/stimulus";

export class MenuController extends Controller {
  static targets = ["button", "menu", "menuItem"];
  static classes = ["selected", "unselected"];

  toggle() {
    this.opened ? this.close() : this.open();
  }

  open() {
    this.buttonTarget.setAttribute("aria-expanded", "true");
    this.menuTarget.hidden = false;
    this.focusItem(0);
  }

  close() {
    this.buttonTarget.removeAttribute("aria-expanded");
    this.menuTarget.hidden = true;
  }

  focusButton() {
    this.buttonTarget.focus();
  }

  handleFocusout(e) {
    if (!this.menuTarget.contains(e.relatedTarget)) {
      this.close();
    }
  }

  focusUp() {
    const nextIndex = (this.focusedIndex + this.itemSize - 1) % this.itemSize;
    this.focusItem(nextIndex);
  }

  focusDown() {
    const nextIndex = (this.focusedIndex + 1) % this.itemSize;
    this.focusItem(nextIndex);
  }

  focusFirstItem() {
    this.focusItem(0);
  }

  focusLastItem() {
    this.focusItem(this.itemSize - 1);
  }

  focusItem(index) {
    this.menuItemTargets[index]?.focus();
    this.menuItemTargets.forEach((item, i) => {
      if (index === i) {
        item.classList.remove(...this.unselectedClasses);
        item.classList.add(...this.selectedClasses);
      } else {
        item.classList.remove(...this.selectedClasses);
        item.classList.add(...this.unselectedClasses);
      }
    });
  }

  focusItemOnHover(e) {
    const targetIndex = this.menuItemTargets.indexOf(e.currentTarget);
    this.focusItem(targetIndex);
  }

  select() {
    this.close();
    this.buttonTarget.focus();
  }

  get opened() {
    return this.menuTarget.hidden === false;
  }

  get itemSize() {
    return this.menuItemTargets.length;
  }

  get focusedIndex() {
    return this.menuItemTargets.indexOf(this.focusedItem);
  }

  get focusedItem() {
    return document.activeElement;
  }
}
