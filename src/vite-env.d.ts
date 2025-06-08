/// <reference types="vite/client" />

interface ImportMetaEnv {
    readonly VITE_BACKEND_URL: string;
    readonly VITE_NOTIFICATIONS_INTERVAL_MS: number;
}

interface ImportMeta {
    readonly env: ImportMetaEnv;
}
