import { BubbleParams } from '../types';
import { BotProps } from '../../../components/Bot';
export type BubbleProps = BotProps & BubbleParams & {
    onOpen?: () => void;
    onClose?: () => void;
    onPreviewMessageClick?: () => void;
};
export declare const Bubble: (props: BubbleProps) => import("solid-js").JSX.Element;
//# sourceMappingURL=Bubble.d.ts.map