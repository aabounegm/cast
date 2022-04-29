import Cookies from 'js-cookie';
import { persistentWritable } from 'svelte-persistent-writable';

import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { user } from '$lib/entities/user';
import type { Episode } from '$lib/shared/api';

import { fetchHistory } from '../api/fetch-history';
import { addToCloudListeningHistory } from '../api/history-table';

user.subscribe(async ($user) => {
  if ($user) {
    const ids = await fetchHistory();
    listeningHistory.set(ids ?? []);
  }
});

export const cookieName = 'listening-history';

/**
 * The storage wih array of podcast ids, persists in localStorage
 */
export const listeningHistory = persistentWritable<number[]>([], {
  storage: {
    get() {
      if (typeof document === 'undefined') {
        return null;
      }

      const cookieValue = Cookies.get(cookieName);
      if (cookieValue === undefined) {
        return null;
      } else {
        try {
          return { value: JSON.parse(cookieValue) };
        } catch {
          return { value: [] };
        }
      }
    },
    set(ids) {
      if (typeof document === 'undefined') {
        throw new Error('Cannot set cookies in a non-browser context');
      }

      Cookies.set(cookieName, JSON.stringify(ids), {
        expires: 99999,
        secure: true,
        sameSite: 'Strict',
      });
    },
    remove() {
      if (typeof document === 'undefined') {
        throw new Error('Cannot remove cookies in a non-browser context');
      }

      Cookies.remove(cookieName);
    },
  },
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
