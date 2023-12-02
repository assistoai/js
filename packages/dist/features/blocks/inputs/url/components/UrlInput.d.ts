import { InputSubmitContent } from '@/types';
import type { UrlInputBlock } from '@typebot.io/schemas';
type Props = {
    block: UrlInputBlock;
    defaultValue?: string;
    onSubmit: (value: InputSubmitContent) => void;
};
export declare const UrlInput: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=UrlInput.d.ts.map