import type { ChatMessage, Settings } from '@typebot.io/schemas';
type Props = {
    message: ChatMessage;
    typingEmulation: Settings['typingEmulation'];
    onTransitionEnd: (offsetTop?: number) => void;
};
export declare const HostBubble: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=HostBubble.d.ts.map