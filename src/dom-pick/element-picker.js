import ElementOverlay from "./element-overlay";
import { getElementBounds, checkSimilarBounds } from "./utils";
export default class ElementPicker {
    constructor(overlayOptions) {
        this.handleMouseMove = (event) => {
            this.mouseX = event.clientX;
            this.mouseY = event.clientY;
        };
        this.handleClick = (event) => {
            var _a;
            if (this.target && ((_a = this.options) === null || _a === void 0 ? void 0 : _a.onClick)) {
                this.options.onClick(this.target);
            }
            event.preventDefault();
        };
        this.tick = () => {
            this.updateTarget();
            this.tickReq = window.requestAnimationFrame(this.tick);
        };
        this.active = false;
        this.overlay = new ElementOverlay(overlayOptions !== null && overlayOptions !== void 0 ? overlayOptions : {});
    }
    start(options) {
        var _a, _b;
        if (this.active) {
            return false;
        }
        this.active = true;
        this.options = options;
        document.addEventListener("mousemove", this.handleMouseMove, true);
        document.addEventListener("click", this.handleClick, true);
        this.overlay.addToDOM((_a = options.parentElement) !== null && _a !== void 0 ? _a : document.body, (_b = options.useShadowDOM) !== null && _b !== void 0 ? _b : true);
        this.tick();
        return true;
    }
    stop() {
        this.active = false;
        this.options = undefined;
        document.removeEventListener("mousemove", this.handleMouseMove, true);
        document.removeEventListener("click", this.handleClick, true);
        this.overlay.removeFromDOM();
        this.target = undefined;
        this.mouseX = undefined;
        this.mouseY = undefined;
        if (this.tickReq) {
            window.cancelAnimationFrame(this.tickReq);
        }
    }
    updateTarget() {
        var _a, _b;
        if (this.mouseX === undefined || this.mouseY === undefined) {
            return;
        }
        // Peek through the overlay to find the new target
        this.overlay.ignoreCursor();
        const elAtCursor = document.elementFromPoint(this.mouseX, this.mouseY);
        const newTarget = elAtCursor;
        this.overlay.captureCursor();
        // If the target hasn't changed, there's nothing to do
        if (!newTarget) return;
        // If we have an element filter and the new target doesn't match,
        // clear out the target
        if ((_a = this.options) === null || _a === void 0 ? void 0 : _a.elementFilter) {
            if (!this.options.elementFilter(newTarget)) {
                this.target = undefined;
                this.overlay.setBounds({ x: 0, y: 0, width: 0, height: 0 });
                return;
            }
        }

        const bounds = getElementBounds(newTarget);
        if (newTarget === this.target) {
            const ori_bounds = this.overlay.getBounds();
            if (checkSimilarBounds(bounds, ori_bounds))
                return ;
        }

        this.target = newTarget;
        this.overlay.setBounds(bounds);
        if ((_b = this.options) === null || _b === void 0 ? void 0 : _b.onHover) {
            this.options.onHover(newTarget);
        }
    }
}
