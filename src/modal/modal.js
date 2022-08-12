import { Controller } from "@hotwired/stimulus";
import { tabbable } from "tabbable";
import {
  disableBodyScroll,
  enableBodyScroll,
} from "body-scroll-lock";

export class ModalController extends Controller {
  static get targets() {
    return ["inert", "backdrop"];
  }

  static get values() {
    return {
      modalStack: Array,
    };
  }

  initialize() {
    /** モーダルを開く直前にフォーカスを当てていた要素 */
    this.focusStack = [];
  }

  handleOpen(event) {
    event.preventDefault();
    this.openModalById(event.target.dataset.modalTargetParam);
  }

  openModalById(modalId) {
    if (!modalId) {
      throw new TypeError("Modal id is required.");
    }

    const target = document.getElementById(modalId);
    if (!target) {
      throw new Error(`Modal \`${modalId}\` is not found.`);
    }

    const currentStack = this.modalStackValue;

    // これまでに開いてきたモーダルを非表示にする
    currentStack.forEach((modalId) => {
      document.getElementById(modalId).style.display = "none";
    });

    this.modalStackValue = [...currentStack, modalId];
    this.focusStack.push(document.activeElement || null);

    disableBodyScroll(target, { reserveScrollBarGap: true });

    target.style.display = "block";
    tabbable(target)[0]?.focus();
  }

  handleClose(event) {
    event.preventDefault();
    this.closeModal();
  }

  handleEscape(event) {
    if (event.key === "Escape" || event.key === "Esc") {
      this.closeModal();
    }
  }

  closeModal() {
    const currentStack = this.modalStackValue;
    const lastModalId = currentStack.pop();

    const lastModal = document.getElementById(lastModalId);
    lastModal.style.display = "none";

    currentStack.forEach((modalId) => {
      document.getElementById(modalId).style.display = "block";
    });

    this.modalStackValue = currentStack;

    enableBodyScroll(lastModal);

    // inert 解除を待つ
    setTimeout(() => {
      this.focusStack.pop()?.focus();
    });
  }

  modalStackValueChanged() {
    const hasModal = this.modalStackValue.length > 0;
    if (this.hasBackdropTarget) {
      this.backdropTarget.style.display = hasModal ? "block" : "none";
    }
    if (this.hasInertTarget) {
      this.inertTarget.inert = hasModal;
    }
  }
}
