declare const typebot: {
    initStandard: (props: import(".").BotProps & {
        id?: string | undefined;
    }) => void;
    initPopup: (props: import(".").PopupProps) => void;
    initBubble: (props: import(".").BubbleProps) => void;
    close: () => void;
    hidePreviewMessage: () => void;
    open: () => void;
    setPrefilledVariables: (variables: Record<string, string | number | boolean>) => void;
    showPreviewMessage: (proactiveMessage?: Pick<import(".").PreviewMessageParams, "avatarUrl" | "message"> | undefined) => void;
    toggle: () => void;
    setInputValue: (value: string) => void;
    unmount: () => void;
};
export default typebot;
//# sourceMappingURL=web.d.ts.map