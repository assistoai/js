import { ClientSideActionContext } from '@/types';
import type { ContinueChatResponse, ChatLog } from '@typebot.io/schemas';
type Props = {
    clientSideAction: NonNullable<ContinueChatResponse['clientSideActions']>[0];
    context: ClientSideActionContext;
    onMessageStream?: (props: {
        id: string;
        message: string;
    }) => void;
};
export declare const executeClientSideAction: ({ clientSideAction, context, onMessageStream, }: Props) => Promise<{
    blockedPopupUrl: string;
} | {
    replyToSend: string | undefined;
    logs?: ChatLog[];
} | void>;
export {};
//# sourceMappingURL=executeClientSideActions.d.ts.map