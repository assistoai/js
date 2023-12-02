import { InputSubmitContent } from '@/types';
import type { ChoiceInputBlock } from '@typebot.io/schemas';
type Props = {
    inputIndex: number;
    defaultItems: ChoiceInputBlock['items'];
    options: ChoiceInputBlock['options'];
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const Buttons: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=Buttons.d.ts.map