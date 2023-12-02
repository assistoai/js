import type { ContinueChatResponse, Theme } from '@typebot.io/schemas';
import { BotContext } from '@/types';
type Props = {
    ref: HTMLDivElement | undefined;
    block: NonNullable<ContinueChatResponse['input']>;
    hasHostAvatar: boolean;
    guestAvatar?: NonNullable<Theme['chat']>['guestAvatar'];
    inputIndex: number;
    context: BotContext;
    isInputPrefillEnabled: boolean;
    hasError: boolean;
    onTransitionEnd: () => void;
    onSubmit: (answer: string) => void;
    onSkip: () => void;
};
export declare const InputChatBlock: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=InputChatBlock.d.ts.map