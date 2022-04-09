import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { supabaseClient, type Episode } from '$lib/shared/api';
import { user } from '$lib/entities/user';
import { localStorageAdapter, persistentWritable } from 'svelte-persistent-writable';

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
 */
const addToLocalListeningHistory = (podcastId: number) => {
  listeningHistory.update((history) => {
    return [podcastId, ...history.filter((id) => id !== podcastId)].slice(0, 6);
  });
};

/**
 * Function that adds a podcast id into `history` SB table.
 */
const addToCloudListeningHistory = async (podcastId: number) => {
  try {
    await supabaseClient.from('history').insert([
      {
        // eslint-disable-next-line camelcase
        podcast_id: podcastId,
      },
    ]);
  } catch (e) {
    console.error(e);
  }
};

export const addToListeningHistory = (episode: Episode) => {
  const id = episode.podcastID;
  addToLocalListeningHistory(id);
  addToCloudListeningHistory(id);
};

currentlyPlayingEpisode.subscribe(($episode) => {
  if ($episode !== null) addToListeningHistory($episode);
});
