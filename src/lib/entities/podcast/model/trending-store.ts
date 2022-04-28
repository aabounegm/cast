import { writable } from 'svelte/store';
import type { Podcast } from '$lib/shared/api';

export const trendingPodcasts = writable<Podcast[]>([]);
