import { writable } from 'svelte/store';
import type { User } from './types';
import { supabaseClient } from '$lib/shared/api';

export const user = writable<User | null>(supabaseClient.auth.user() as User);
