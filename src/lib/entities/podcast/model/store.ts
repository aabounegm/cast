import { writable, get } from 'svelte/store';
import type { Podcast } from '$lib/shared/api';

export const podcasts = writable<Podcast[]>([]);

export function getPodcastByID(thisID: Podcast['id']) {
  return get(podcasts).find((podcast) => podcast.id === thisID);
}
