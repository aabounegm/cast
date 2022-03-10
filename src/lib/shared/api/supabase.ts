import { createClient } from '@supabase/supabase-js';
import constants from './credentials';

const supabaseClient = createClient(constants.SUPABASE_URL, constants.SUPABASE_USER_KEY, {
  fetch: fetch.bind(globalThis),
});

export default supabaseClient;
