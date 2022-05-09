import { supabaseClient } from '$lib/shared/api';

export async function signOut() {
  await supabaseClient.auth.signOut();
}
