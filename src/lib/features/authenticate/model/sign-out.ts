import { supabaseClient } from '$lib/shared/api';

export function signOut() {
  supabaseClient.auth.signOut();
}
