import { persistentWritable } from 'svelte-persistent-writable';

import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { user } from '$lib/entities/user';
import type { Episode } from '$lib/shared/api';

import { fetchHistory } from '../api/fetch-history';
import { addToCloudListeningHistory } from '../api/history-table';
import { cookieStorageAdapter } from './cookie-storage-adapter';

user.subscribe(async ($user) => {
  if ($user) {
    const ids = await fetchHistory();
    listeningHistory.set(ids ?? []);
  }
});

/** The storage for an array of podcast IDs, persisted in cookies. */
export const listeningHistory = persistentWritable<number[]>([], {
  storage: cookieStorageAdapter,
});

/**
 * Function that adds a podcast id to the beginning of listening history.
 * It removes any previous occurrences of the same podcast.
 */
const addToLocalListeningHistory = (podcastId: number) => {
  listeningHistory.update((history) => {
    return [podcastId, ...history.filter((id) => id !== podcastId)].slice(0, 6);
  });
};

export const addToListeningHistory = async (episode: Episode) => {
  const id = episode.podcastID;
  addToLocalListeningHistory(id);
  try {
    addToCloudListeningHistory(id);
  } catch (e) {
    alert((e as Error).message);
  }
};

currentlyPlayingEpisode.subscribe(($episode) => {
  if ($episode !== null) addToListeningHistory($episode);
});
