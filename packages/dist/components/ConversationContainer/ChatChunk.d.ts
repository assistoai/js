import { BotContext, ChatChunk as ChatChunkType } from '@/types';
import { ContinueChatResponse, Settings, Theme } from '@typebot.io/schemas';
type Props = Pick<ContinueChatResponse, 'messages' | 'input'> & {
    theme: Theme;
    settings: Settings;
    inputIndex: number;
    context: BotContext;
    hasError: boolean;
    hideAvatar: boolean;
    streamingMessageId: ChatChunkType['streamingMessageId'];
    onNewBubbleDisplayed: (blockId: string) => Promise<void>;
    onScrollToBottom: (top?: number) => void;
    onSubmit: (input: string) => void;
    onSkip: () => void;
    onAllBubblesDisplayed: () => void;
};
export declare const ChatChunk: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=ChatChunk.d.ts.map