import { JSX } from 'solid-js/jsx-runtime';
type Props = {
    ref: HTMLInputElement | undefined;
    onInput: (value: string) => void;
    onClear: () => void;
} & Omit<JSX.InputHTMLAttributes<HTMLInputElement>, 'onInput'>;
export declare const SearchInput: (props: Props) => JSX.Element;
export {};
//# sourceMappingURL=SearchInput.d.ts.map