import { Controller } from "@hotwired/stimulus";
import { listen } from "../helpers.js";

export class FlexTextareaController extends Controller {
  connect() {
    this.element.style.boxSizing = "border-box";
    this.resize_();

    this.subscriptions = [
      listen(this.element, "input", this.resize_.bind(this)),
    ];
  }

  disconnect() {
    this.subscriptions.forEach(({ remove }) => remove());
  }

  resize_() {
    this.element.style.height = "";

    const style = window.getComputedStyle(this.element);
    const height =
      this.element.scrollHeight +
      parseInt(style.borderTopWidth) +
      parseInt(style.borderBottomWidth);
    this.element.style.height = `${height}px`;
  }
}
