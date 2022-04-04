import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { supabaseClient } from '$lib/shared/api';
import { user } from '$lib/entities/user';
import { localStorageAdapter, persistentWritable } from 'svelte-persistent-writable';
import { get } from 'svelte/store';

user.subscribe(async ($user) => {
  if (!$user) return;
  const hist = await supabaseClient
    .from('history')
    .select('podcast_id')
    .order('created_at', { ascending: false })
    .eq('user_id', $user.id);
  const ids = hist.data?.map((e) => e.podcast_id);
  listeningHistory.set(ids ?? []);
});

/**
 * The storage wih array of podcast ids, persists in localStorage
 */
export const listeningHistory = persistentWritable<number[]>([], {
  storage: localStorageAdapter('listening-history'),
});

/**
 * Function that adds a podcast id to the beginning of listening history.
 * It removes any previous occurrences of the same podcast.
 *
 * @param podcastId {string} – an id to add to history
 */
export const addToLocalListeningHistory = (podcastId: number) => {
  listeningHistory.update((history) => {
    return [podcastId, ...history.filter((id) => id !== podcastId)].slice(0, 6);
  });
};

/**
 * Function that add a row into history SB table.
 *
 * @param podcastId {string} – an id to add to history
 */
export const addToCloudListeningHistory = async (podcastId: number) => {
  const u = get(user);
  if (!u) return;
  await supabaseClient.from('history').insert([
    {
      // eslint-disable-next-line camelcase
      podcast_id: podcastId,
      // eslint-disable-next-line camelcase
      user_id: u.id,
    },
  ]);
};

currentlyPlayingEpisode.subscribe(async ($episode) => {
  if ($episode !== null) {
    const id = $episode.podcastID;
    addToLocalListeningHistory(id);
    addToCloudListeningHistory(id);
  }
});
