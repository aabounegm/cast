/// <reference types="@sveltejs/kit" />
/// <reference types="unplugin-icons/types/svelte" />
/// <reference types="vite/client" />
/// <reference types="jest-extended" />

declare module 'blns' {
  let naughtyStrings: string[];
  export default naughtyStrings;
}

interface ImportMetaEnv {
  readonly VITE_SUPABASE_APP_URL: string;
  readonly VITE_SUPABASE_PUBLIC_ANON_KEY: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
