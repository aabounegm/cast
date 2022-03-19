import { writable } from 'svelte/store';
import type { Episode } from '$lib/shared/api';

export const currentlyPlayingEpisode = writable<Episode | null>(null);
