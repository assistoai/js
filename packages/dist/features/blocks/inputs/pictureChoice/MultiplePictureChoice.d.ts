import { InputSubmitContent } from '@/types';
import { PictureChoiceBlock } from '@typebot.io/schemas/features/blocks/inputs/pictureChoice';
type Props = {
    defaultItems: PictureChoiceBlock['items'];
    options: PictureChoiceBlock['options'];
    onSubmit: (value: InputSubmitContent) => void;
    onTransitionEnd: () => void;
};
export declare const MultiplePictureChoice: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=MultiplePictureChoice.d.ts.map