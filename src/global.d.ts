/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_SUPABASE_APP_URL: string;
  readonly VITE_SUPABASE_PUBLIC_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
