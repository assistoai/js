import { BubbleProps } from './features/bubble';
import { PopupProps } from './features/popup';
import { BotProps } from './components/Bot';
import { close, hidePreviewMessage, open, setPrefilledVariables, showPreviewMessage, toggle, setInputValue, unmount } from './features/commands';
export declare const initStandard: (props: BotProps & {
    id?: string;
}) => void;
export declare const initPopup: (props: PopupProps) => void;
export declare const initBubble: (props: BubbleProps) => void;
type Typebot = {
    initStandard: typeof initStandard;
    initPopup: typeof initPopup;
    initBubble: typeof initBubble;
    close: typeof close;
    hidePreviewMessage: typeof hidePreviewMessage;
    open: typeof open;
    setPrefilledVariables: typeof setPrefilledVariables;
    showPreviewMessage: typeof showPreviewMessage;
    toggle: typeof toggle;
    setInputValue: typeof setInputValue;
    unmount: typeof unmount;
};
export declare const parseTypebot: () => {
    initStandard: (props: BotProps & {
        id?: string;
    }) => void;
    initPopup: (props: PopupProps) => void;
    initBubble: (props: BubbleProps) => void;
    close: () => void;
    hidePreviewMessage: () => void;
    open: () => void;
    setPrefilledVariables: (variables: Record<string, string | number | boolean>) => void;
    showPreviewMessage: (proactiveMessage?: Pick<import(".").PreviewMessageParams, "avatarUrl" | "message"> | undefined) => void;
    toggle: () => void;
    setInputValue: (value: string) => void;
    unmount: () => void;
};
export declare const injectTypebotInWindow: (typebot: Typebot) => void;
export {};
//# sourceMappingURL=window.d.ts.map