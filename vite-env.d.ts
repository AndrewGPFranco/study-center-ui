interface ImportMetaEnv {
    readonly VITE_API_URL: string;
    readonly BASE_URL: string;
    readonly VITE_TOKEN: string;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
