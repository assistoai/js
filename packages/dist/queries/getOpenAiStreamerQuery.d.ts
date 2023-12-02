export declare const getOpenAiStreamerQuery: ({ apiHost, sessionId }: {
    apiHost?: string | undefined;
    sessionId: string;
}) => (messages: {
    content?: string | undefined;
    role?: 'system' | 'user' | 'assistant' | undefined;
}[]) => Promise<ReadableStream<Uint8Array> | null>;
//# sourceMappingURL=getOpenAiStreamerQuery.d.ts.map