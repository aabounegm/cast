import { supabaseClient } from '$lib/shared/api';

const credentials = { provider: 'github' } as const;

export function signIn() {
  supabaseClient.auth.signIn(credentials, { redirectTo: window.location.href });
}
