import { Controller } from "@hotwired/stimulus";

/**
 * @property {HTMLInputElement[]} checkAllTargets
 * @property {HTMLInputElement[]} checkboxTargets
 */
export class CheckAllController extends Controller {
	static get targets() {
		return ["checkAll", "checkbox"];
	}

	checkAll(e) {
		const checked = e.target.checked;
		this.checkboxTargets.forEach((checkbox) => (checkbox.checked = checked));
		this.updateCheckAll();
	}

	check() {
		this.updateCheckAll();
	}

	updateCheckAll() {
		const someChecked = this.checkboxTargets.some(
			(checkbox) => checkbox.checked
		);
		const allChecked = this.checkboxTargets.every(
			(checkbox) => checkbox.checked
		);
		this.checkAllTargets.forEach((checkbox) => {
			checkbox.indeterminate = !allChecked && someChecked;
			checkbox.checked = allChecked;
		});
	}
}
