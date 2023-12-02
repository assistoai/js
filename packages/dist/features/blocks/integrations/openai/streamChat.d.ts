import { ClientSideActionContext } from '@/types';
export declare const streamChat: (context: ClientSideActionContext & {
    retryAttempt?: number;
}) => (messages: {
    content?: string | undefined;
    role?: 'system' | 'user' | 'assistant' | undefined;
}[], { onMessageStream, }: {
    onMessageStream?: ((props: {
        id: string;
        message: string;
    }) => void) | undefined;
}) => Promise<{
    message?: string;
    error?: object;
}>;
//# sourceMappingURL=streamChat.d.ts.map