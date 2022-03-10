import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { localStorageAdapter, persistentWritable } from 'svelte-persistent-writable';

/**
 * The storage wih array of audio URLs, persists in localStorage
 */
export const listeningHistory = persistentWritable<number[]>([], {
  storage: localStorageAdapter('listening-history'),
});

currentlyPlayingEpisode.subscribe(($episode) => {
  if ($episode !== null) {
    addToListeningHistory($episode.podcastID);
  }
});

/**
 * Function that adds a podcast id to the beginning of listening history.
 * It removes any previous occurrences of the same podcast.
 *
 * @param podcastId {string} – an URl to add to history
 */
export const addToListeningHistory = (podcastId: number) => {
  listeningHistory.update((history) => {
    return [podcastId, ...history.filter((id) => id !== podcastId)].slice(0, 6);
  });
};
