import { Controller } from "@hotwired/stimulus";

export class ClipboardCopyController extends Controller {
  copy(e) {
    const { text, selector } = e.params;
    if (text) {
      return this.copyText_(text);
    }
    const target = document.querySelector(selector);
    if (target) {
      return this.copyTarget_(target);
    }
  }

  copyTarget_(target) {
    if (
      target instanceof HTMLInputElement ||
      target instanceof HTMLTextAreaElement
    ) {
      return this.copyText_(target.value);
    }
    if (target instanceof HTMLAnchorElement && target.hasAttribute("href")) {
      return this.copyText_(target.href);
    }
    return this.copyText_(target.textContent.trim());
  }

  async copyText_(text) {
    if ("clipboard" in navigator) {
      await navigator.clipboard.writeText(text);
      this.trigger_(text);
    } else {
      throw new Error("Clipboard API is not supported.");
    }
  }

  trigger_(text) {
    this.element.dispatchEvent(
      new CustomEvent("clipboard-copy", { bubbles: true, detail: text })
    );
  }
}
