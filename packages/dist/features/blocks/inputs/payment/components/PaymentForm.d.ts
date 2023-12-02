import { BotContext } from '@/types';
import { PaymentInputBlock, RuntimeOptions } from '@typebot.io/schemas';
type Props = {
    context: BotContext;
    options: PaymentInputBlock['options'] & RuntimeOptions;
    onSuccess: () => void;
    onTransitionEnd: () => void;
};
export declare const PaymentForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=PaymentForm.d.ts.map