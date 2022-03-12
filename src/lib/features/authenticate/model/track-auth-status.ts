import noop from 'lodash.noop';
import { user } from '$lib/entities/user';
import { supabaseClient } from '$lib/shared/api';

export function trackAuthStatus() {
  const { data, error } = supabaseClient.auth.onAuthStateChange((_event, session) => {
    user.set(session?.user ?? null);
  });

  if (error !== null) {
    throw error;
  }

  return data?.unsubscribe ?? noop;
}
