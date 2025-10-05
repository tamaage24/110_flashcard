/// <reference types="vite/client" />

// Vite環境変数用の型定義を拡張
interface ImportMetaEnv {
  readonly VITE_APP_TITLE: string
  // 他のカスタム環境変数があればここに追加
  // 例: readonly VITE_API_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}