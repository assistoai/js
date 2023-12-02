import { InputSubmitContent } from '@/types';
import type { TextInputBlock } from '@typebot.io/schemas';
type Props = {
    block: TextInputBlock;
    defaultValue?: string;
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const TextInput: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=TextInput.d.ts.map