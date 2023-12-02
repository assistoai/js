import { OutgoingLog } from '@/types';
import { InputBlock } from '@typebot.io/schemas';
import { StartFrom } from '@typebot.io/schemas';
export type BotProps = {
    typebot: string | any;
    isPreview?: boolean;
    resultId?: string;
    prefilledVariables?: Record<string, unknown>;
    apiHost?: string;
    onNewInputBlock?: (inputBlock: InputBlock) => void;
    onAnswer?: (answer: {
        message: string;
        blockId: string;
    }) => void;
    onInit?: () => void;
    onEnd?: () => void;
    onNewLogs?: (logs: OutgoingLog[]) => void;
    startFrom?: StartFrom;
};
export declare const Bot: (props: BotProps & {
    class?: string;
}) => import("solid-js").JSX.Element;
//# sourceMappingURL=Bot.d.ts.map