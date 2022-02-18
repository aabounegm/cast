import { createClient } from '@supabase/supabase-js';
import constants from '../constants';

const supabaseClient = createClient(constants.SUPABASE_URL, constants.SUPABASE_USER_KEY, {
  schema: 'public',
});

export default supabaseClient;
