import { BotContext } from '@/types';
import type { PaymentInputBlock, RuntimeOptions } from '@typebot.io/schemas';
type Props = {
    context: BotContext;
    options: PaymentInputBlock['options'] & RuntimeOptions;
    onSuccess: () => void;
    onTransitionEnd: () => void;
};
export declare const StripePaymentForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=StripePaymentForm.d.ts.map