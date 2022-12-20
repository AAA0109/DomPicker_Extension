import { BoundingBox, ElementOverlayOptions } from "./utils";
export default class ElementOverlay {
    overlay: HTMLDivElement;
    shadowContainer: HTMLDivElement;
    shadowRoot: ShadowRoot;
    usingShadowDOM?: boolean;
    constructor(options: ElementOverlayOptions);
    addToDOM(parent: Node, useShadowDOM: boolean): void;
    removeFromDOM(): void;
    captureCursor(): void;
    ignoreCursor(): void;
    setBounds({ x, y, width, height }: BoundingBox): void;
    getBounds(): BoundingBox
}
