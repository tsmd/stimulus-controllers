import { Controller } from "@hotwired/stimulus";

export class ButtonController extends Controller {
	connect() {
		this.element.setAttribute("role", "button");
		if (!this.element.hasAttribute("tabindex")) {
			this.element.tabIndex = 0;
		}
	}

	/** @param {KeyboardEvent}e */
	handleKeydown(e) {
		if (e.key === " ") {
			e.preventDefault();
		} else if (e.key === "Enter") {
			e.preventDefault();
			this.dispatchClickEvent(e);
		}
	}

	/** @param {KeyboardEvent} e */
	handleKeyup(e) {
		if (e.key === " ") {
			e.preventDefault();
			this.dispatchClickEvent(e);
		}
	}

	/** @param {KeyboardEvent} e */
	dispatchClickEvent(e) {
		// this.element.click();
		const clickEvent = new MouseEvent("click", {
			bubbles: true,
			cancelable: true,
			shiftKey: e.shiftKey,
			ctrlKey: e.ctrlKey,
			altKey: e.altKey,
			metaKey: e.metaKey,
		});
		this.element.dispatchEvent(clickEvent);
	}
}
