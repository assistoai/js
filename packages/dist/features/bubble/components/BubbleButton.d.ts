import { BubbleTheme, ButtonTheme } from '../types';
type Props = Pick<BubbleTheme, 'placement'> & ButtonTheme & {
    isBotOpened: boolean;
    toggleBot: () => void;
};
export declare const BubbleButton: (props: Props) => import("solid-js").JSX.Element;
export {};
//# sourceMappingURL=BubbleButton.d.ts.map