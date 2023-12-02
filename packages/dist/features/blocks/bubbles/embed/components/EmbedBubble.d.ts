import { EmbedBubbleBlock } from '@typebot.io/schemas';
type Props = {
    content: EmbedBubbleBlock['content'];
    onTransitionEnd: (offsetTop?: number) => void;
};
export declare const showAnimationDuration = 400;
export declare const EmbedBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=EmbedBubble.d.ts.map