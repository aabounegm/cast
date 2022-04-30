import { writable, get } from 'svelte/store';
import type { Podcast } from '$lib/shared/api';

export const podcasts = writable<Podcast[]>([]);

/**
 * Retrieve a podcast by its ID.
 *
 * Returns `undefined` if a podcast with this ID is not
 * present in the store.
 */
export function getPodcastByID(thisID: Podcast['id']) {
  return get(podcasts).find((podcast) => podcast.id === thisID);
}

/** Save a podcast in the store if it wasn't already there. */
export function addPodcastToStore(thisPodcast: Podcast) {
  podcasts.update(($podcasts) => {
    if (!$podcasts.some((podcast) => podcast.id === thisPodcast.id)) {
      $podcasts.push(thisPodcast);
    }
    return $podcasts;
  });
}
