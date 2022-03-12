import { writable } from 'svelte/store';
import type { User } from '@supabase/supabase-js';
import { supabaseClient } from '$lib/shared/api';

export const user = writable<User | null>(supabaseClient.auth.user());
