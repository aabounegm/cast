/**
 * To make the application work correctly, you need to add environmental variables:
 * VITE_SUPABASE_URL – URL to Supabase URL
 * VITE_SUPABASE_KEY – Private key to Supabase connection with the API
 */
export default {
  VITE_SUPABASE_APP_URL: (import.meta.env.VITE_SUPABASE_APP_URL as string) || '',
  VITE_SUPABASE_PUBLIC_ANON_KEY: (import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY as string) || '',
};
