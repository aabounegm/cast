import { supabaseClient } from '$lib/shared/api';

/**
 * Function that adds a podcast id into `history` SB table.
 */
export async function addToCloudListeningHistory(podcastId: number) {
  try {
    await supabaseClient.from('history').insert([
      {
        // eslint-disable-next-line camelcase
        podcast_id: podcastId,
      },
    ]);
  } catch {
    throw new Error('Server error. Check internet connection and ensure you are signed in.');
  }
}
