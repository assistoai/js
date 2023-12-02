import type { ChatLog } from '@typebot.io/schemas';
export declare const saveClientLogsQuery: ({ apiHost, sessionId, clientLogs, }: {
    apiHost?: string | undefined;
    sessionId: string;
    clientLogs: ChatLog[];
}) => Promise<{
    data?: unknown;
    error?: Error | undefined;
    response?: Response | undefined;
}>;
//# sourceMappingURL=saveClientLogsQuery.d.ts.map