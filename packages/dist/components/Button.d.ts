import { JSX } from 'solid-js';
type Props = {
    variant?: 'primary' | 'secondary';
    children: JSX.Element;
    isDisabled?: boolean;
    isLoading?: boolean;
} & JSX.ButtonHTMLAttributes<HTMLButtonElement>;
export declare const Button: (props: Props) => JSX.Element;
export {};
//# sourceMappingURL=Button.d.ts.map