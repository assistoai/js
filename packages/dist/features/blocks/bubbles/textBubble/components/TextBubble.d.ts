import type { Settings, TextBubbleBlock } from '@typebot.io/schemas';
type Props = {
    content: TextBubbleBlock['content'];
    typingEmulation: Settings['typingEmulation'];
    onTransitionEnd: (offsetTop?: number) => void;
};
export declare const showAnimationDuration = 400;
export declare const TextBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=TextBubble.d.ts.map