/**
 * To make the application work correctly, you need to add environmental variables:
 * VITE_SUPABASE_URL – URL to Supabase URL
 * VITE_SUPABASE_KEY – Private key to Supabase connection with the API
 */
export default {
  SUPABASE_URL: (import.meta.env.VITE_SUPABASE_URL as string) || '',
  SUPABASE_USER_KEY: (import.meta.env.VITE_SUPABASE_KEY as string) || '',
};
