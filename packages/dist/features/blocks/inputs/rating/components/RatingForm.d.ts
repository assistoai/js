import { InputSubmitContent } from '@/types';
import type { RatingInputBlock } from '@typebot.io/schemas';
type Props = {
    block: RatingInputBlock;
    defaultValue?: string;
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const RatingForm: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=RatingForm.d.ts.map