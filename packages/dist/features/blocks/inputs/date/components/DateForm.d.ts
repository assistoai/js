import { InputSubmitContent } from '@/types';
import { DateInputBlock } from '@typebot.io/schemas';
type Props = {
    onSubmit: (inputValue: InputSubmitContent) => void;
    options?: DateInputBlock['options'];
    defaultValue?: string;
};
export declare const DateForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=DateForm.d.ts.map