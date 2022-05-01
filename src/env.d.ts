interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  readonly VITE_CLIENT_ID: string
  readonly VITE_APP_URL: string
  readonly VITE_SERVER_URL: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}