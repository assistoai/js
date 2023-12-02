import { InputSubmitContent } from '@/types';
import type { EmailInputBlock } from '@typebot.io/schemas';
type Props = {
    block: EmailInputBlock;
    defaultValue?: string;
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const EmailInput: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=EmailInput.d.ts.map