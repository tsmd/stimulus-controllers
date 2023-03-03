import { Controller } from "@hotwired/stimulus";
import {
  autoUpdate,
  computePosition,
  flip,
  offset,
  shift,
  size,
} from "@floating-ui/dom";

export class FloatingController extends Controller {
  static targets = ["reference", "floating"];
  static values = {
    placement: { type: String, default: "bottom-start" },
    offset: { type: Number, default: 4 },
    padding: { type: Number, default: 16 },
  };

  connect() {
    this.cleanup_ = autoUpdate(this.referenceTarget, this.floatingTarget, () =>
      this.updatePosition_()
    );
    this.updatePosition_();
  }

  disconnect() {
    this.cleanup_?.();
  }

  updatePosition_() {
    computePosition(this.referenceTarget, this.floatingTarget, {
      placement: this.placementValue,
      middleware: [
        offset(this.offsetValue),
        flip(),
        shift({ padding: this.paddingValue }),
        size({
          apply: ({ availableHeight }) => {
            Object.assign(this.floatingTarget.style, {
              maxHeight: `${availableHeight}px`,
            });
          },
          padding: this.paddingValue,
        }),
      ],
    }).then(({ x, y }) => {
      Object.assign(this.floatingTarget.style, {
        left: `${x}px`,
        top: `${y}px`,
      });
    });
  }

  toggle() {
    this.opened ? this.close() : this.open();
  }
}
