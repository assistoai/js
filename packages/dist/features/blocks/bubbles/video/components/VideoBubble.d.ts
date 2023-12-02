import { VideoBubbleBlock } from '@typebot.io/schemas';
type Props = {
    content: VideoBubbleBlock['content'];
    onTransitionEnd: (offsetTop?: number) => void;
};
export declare const showAnimationDuration = 400;
export declare const VideoBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=VideoBubble.d.ts.map