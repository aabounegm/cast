import { createClient } from '@supabase/supabase-js';
import constants from './credentials';

const supabaseClient = createClient(
  constants.VITE_SUPABASE_APP_URL,
  constants.VITE_SUPABASE_PUBLIC_ANON_KEY,
  {
    fetch: fetch.bind(globalThis),
  }
);

export default supabaseClient;
