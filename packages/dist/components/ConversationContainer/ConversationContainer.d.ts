import { InputBlock } from '@typebot.io/schemas';
import { BotContext, InitialChatReply, OutgoingLog } from '@/types';
type Props = {
    initialChatReply: InitialChatReply;
    context: BotContext;
    onNewInputBlock?: (inputBlock: InputBlock) => void;
    onAnswer?: (answer: {
        message: string;
        blockId: string;
    }) => void;
    onEnd?: () => void;
    onNewLogs?: (logs: OutgoingLog[]) => void;
};
export declare const ConversationContainer: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=ConversationContainer.d.ts.map