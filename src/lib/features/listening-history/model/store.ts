import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { localStorageAdapter, persistentWritable } from 'svelte-persistent-writable';

/**
 * The storage wih array of audio URLs, persists in localStorage
 */
export const listeningHistory = persistentWritable<number[]>([], {
  storage: localStorageAdapter('listening-history'),
});

/**
 * Function that adds a podcast id to the beginning of listening history.
 * It removes any previous occurrences of the same podcast.
 */
export const addToListeningHistory = (podcastId: number) => {
  listeningHistory.update((history) => {
    return [podcastId, ...history.filter((id) => id !== podcastId)].slice(0, 6);
  });
};

currentlyPlayingEpisode.subscribe(($episode) => {
  if ($episode !== null) {
    addToListeningHistory($episode.podcastID);
  }
});
