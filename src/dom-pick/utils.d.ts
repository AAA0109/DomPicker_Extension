export interface BoundingBox {
    x: number;
    y: number;
    width: number;
    height: number;
}
export interface ElementOverlayStyleOptions {
    background?: string;
    borderColor?: string;
    borderStyle?: string;
    borderRadius?: string;
    borderWidth?: string;
    boxSizing?: string;
    cursor?: string;
    position?: string;
    zIndex?: string;
}
export declare type ElementOverlayOptions = {
    className?: string;
    style?: ElementOverlayStyleOptions;
};
export declare const getElementBounds: (el: HTMLElement) => BoundingBox;
export declare const checkSimilarBounds: (b1: BoundingBox, b2: BoundingBox) => boolean
