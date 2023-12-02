import { ImageBubbleBlock } from '@typebot.io/schemas';
type Props = {
    content: ImageBubbleBlock['content'];
    onTransitionEnd: (offsetTop?: number) => void;
};
export declare const showAnimationDuration = 400;
export declare const mediaLoadingFallbackTimeout = 5000;
export declare const ImageBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=ImageBubble.d.ts.map