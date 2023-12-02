import { InputSubmitContent } from '@/types';
import { ChoiceInputBlock } from '@typebot.io/schemas';
type Props = {
    inputIndex: number;
    defaultItems: ChoiceInputBlock['items'];
    options: ChoiceInputBlock['options'];
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const MultipleChoicesForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=MultipleChoicesForm.d.ts.map