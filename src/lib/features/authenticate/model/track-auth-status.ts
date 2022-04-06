import { noop } from 'lodash-es';
import { user, type User } from '$lib/entities/user';
import { supabaseClient } from '$lib/shared/api';

export function trackAuthStatus() {
  const { data, error } = supabaseClient.auth.onAuthStateChange((_event, session) => {
    user.set((session?.user ?? null) as User | null);
  });

  if (error !== null) {
    throw error;
  }

  return data?.unsubscribe ?? noop;
}
