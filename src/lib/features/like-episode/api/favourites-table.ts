import { supabaseClient } from '$lib/shared/api';

export async function addCloudLike(episodeId: number) {
  try {
    await supabaseClient.from('favourites').insert([
      {
        // eslint-disable-next-line camelcase
        episode_id: episodeId,
      },
    ]);
  } catch {
    throw new Error('Server error. Check internet connection and ensure you are signed in.');
  }
}

export async function deleteCloudLike(episodeId: number) {
  try {
    await supabaseClient.from('favourites').delete().eq('episode_id', episodeId);
  } catch {
    throw new Error('Server error. Check internet connection and ensure you are signed in.');
  }
}
