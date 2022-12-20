export default class ElementOverlay {
    constructor(options) {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j;
        this.overlay = document.createElement("div");
        this.overlay.className = options.className || "_ext-element-overlay";
        this.overlay.style.background = ((_a = options.style) === null || _a === void 0 ? void 0 : _a.background) || "rgba(250, 240, 202, 0.2)";
        this.overlay.style.borderColor = ((_b = options.style) === null || _b === void 0 ? void 0 : _b.borderColor) || "#F95738";
        this.overlay.style.borderStyle = ((_c = options.style) === null || _c === void 0 ? void 0 : _c.borderStyle) || "solid";
        this.overlay.style.borderRadius = ((_d = options.style) === null || _d === void 0 ? void 0 : _d.borderRadius) || "1px";
        this.overlay.style.borderWidth = ((_e = options.style) === null || _e === void 0 ? void 0 : _e.borderWidth) || "1px";
        this.overlay.style.boxSizing = ((_f = options.style) === null || _f === void 0 ? void 0 : _f.boxSizing) || "border-box";
        this.overlay.style.cursor = ((_g = options.style) === null || _g === void 0 ? void 0 : _g.cursor) || "crosshair";
        this.overlay.style.position = ((_h = options.style) === null || _h === void 0 ? void 0 : _h.position) || "absolute";
        this.overlay.style.zIndex = ((_j = options.style) === null || _j === void 0 ? void 0 : _j.zIndex) || "2147483647";
        // this.overlay.style.transition = "all .2s linear";
        this.shadowContainer = document.createElement("div");
        this.shadowContainer.className = "_ext-element-overlay-container";
        this.shadowContainer.style.position = "absolute";
        this.shadowContainer.style.top = "0px";
        this.shadowContainer.style.left = "0px";
        this.shadowRoot = this.shadowContainer.attachShadow({ mode: "open" });
    }
    addToDOM(parent, useShadowDOM) {
        this.usingShadowDOM = useShadowDOM;
        if (useShadowDOM) {
            parent.insertBefore(this.shadowContainer, parent.firstChild);
            this.shadowRoot.appendChild(this.overlay);
        }
        else {
            parent.appendChild(this.overlay);
        }
    }
    removeFromDOM() {
        this.setBounds({ x: 0, y: 0, width: 0, height: 0 });
        this.overlay.remove();
        if (this.usingShadowDOM) {
            this.shadowContainer.remove();
        }
    }
    captureCursor() {
        this.overlay.style.pointerEvents = "auto";
    }
    ignoreCursor() {
        this.overlay.style.pointerEvents = "none";
    }
    setBounds({ x, y, width, height }) {
        this.overlay.style.left = x + "px";
        this.overlay.style.top = y + "px";
        this.overlay.style.width = width + "px";
        this.overlay.style.height = height + "px";
    }
    getBounds() {
        return {
            x: parseFloat(this.overlay.style.left),
            y: parseFloat(this.overlay.style.top),
            width: parseFloat(this.overlay.style.width),
            height: parseFloat(this.overlay.style.height),
        }
    }
}
