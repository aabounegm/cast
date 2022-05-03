import { get } from 'svelte/store';
import { persistentWritable } from 'svelte-persistent-writable';
import { dev } from '$app/env';
import type { PostgrestResponse } from '@supabase/supabase-js';

import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { user } from '$lib/entities/user';
import type { Episode } from '$lib/shared/api';
import { snackbar } from '$lib/shared/ui/snackbar';

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
  addToLocalListeningHistory(episode.podcastID);
  if (get(user) !== null && window.navigator.onLine) {
    try {
      await addToCloudListeningHistory(episode.podcastID);
    } catch (error) {
      if (dev) {
        console.error(error);
      }

      if ((error as PostgrestResponse<unknown>).status >= 500) {
        snackbar({ text: 'Failed to synchronize history due to a problem on our side. Sorry!' });
      } else {
        snackbar({
          text: 'Either you are trying to do something shifty or your sign-in broke. Try signing out and then in again.',
        });
      }
    }
  }
};

currentlyPlayingEpisode.subscribe(($episode) => {
  if ($episode !== null) addToListeningHistory($episode);
});
