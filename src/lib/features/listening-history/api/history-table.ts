import { supabaseClient } from '$lib/shared/api';

/** Adds a podcast ID into the `history` table on Supabase. */
export async function addToCloudListeningHistory(podcastId: number) {
  // eslint-disable-next-line camelcase
  const response = await supabaseClient.from('history').insert([{ podcast_id: podcastId }]);

  if (response.status >= 400) {
    throw response;
  }
}
