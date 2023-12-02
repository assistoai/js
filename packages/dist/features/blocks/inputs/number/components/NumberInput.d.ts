import { InputSubmitContent } from '@/types';
import type { NumberInputBlock } from '@typebot.io/schemas';
type NumberInputProps = {
    block: NumberInputBlock;
    defaultValue?: string;
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const NumberInput: (props: NumberInputProps) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=NumberInput.d.ts.map