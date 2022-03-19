import { createClient } from '@supabase/supabase-js';

const supabaseAppUrl = import.meta.env.VITE_SUPABASE_APP_URL;
const supabasePublicAnonKey = import.meta.env.VITE_SUPABASE_PUBLIC_ANON_KEY;

const supabaseClient = createClient(supabaseAppUrl, supabasePublicAnonKey, {
  fetch: fetch.bind(globalThis),
});

export default supabaseClient;
