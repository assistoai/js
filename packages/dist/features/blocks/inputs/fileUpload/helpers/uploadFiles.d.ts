type UploadFileProps = {
    apiHost: string;
    files: {
        file: File;
        input: {
            sessionId: string;
            fileName: string;
        };
    }[];
    onUploadProgress?: (percent: number) => void;
};
type UrlList = (string | null)[];
export declare const uploadFiles: ({ apiHost, files, onUploadProgress, }: UploadFileProps) => Promise<UrlList>;
export {};
//# sourceMappingURL=uploadFiles.d.ts.map