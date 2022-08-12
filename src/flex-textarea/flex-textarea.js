import { Controller } from "@hotwired/stimulus";

export class FlexTextareaController extends Controller {
  connect() {
    this.element.style.boxSizing = "border-box";
    this.element.addEventListener("input", this.resize_);
    this.resize_();
  }

  disconnect() {
    this.element.removeEventListener("input", this.resize_);
  }

  resize_ = () => {
    this.element.style.height = "";

    const style = window.getComputedStyle(this.element);
    const height =
      this.element.scrollHeight +
      parseInt(style.borderTopWidth) +
      parseInt(style.borderBottomWidth);
    this.element.style.height = `${height}px`;
  };
}
