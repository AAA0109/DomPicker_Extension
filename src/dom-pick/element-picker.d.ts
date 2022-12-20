import { ElementOverlayOptions } from "./utils";
declare type ElementCallback<T> = (el: HTMLElement) => T;
declare type ElementPickerOptions = {
    parentElement?: Node;
    useShadowDOM?: boolean;
    onClick?: ElementCallback<void>;
    onHover?: ElementCallback<void>;
    elementFilter?: ElementCallback<boolean>;
};
export default class ElementPicker {
    private overlay;
    private active;
    private options?;
    private target?;
    private mouseX?;
    private mouseY?;
    private tickReq?;
    constructor(overlayOptions?: ElementOverlayOptions);
    start(options: ElementPickerOptions): boolean;
    stop(): void;
    private handleMouseMove;
    private handleClick;
    private tick;
    private updateTarget;
}
export {};
