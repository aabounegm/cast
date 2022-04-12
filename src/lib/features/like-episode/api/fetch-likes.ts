import { supabaseClient } from '$lib/shared/api';

export async function fetchLikes() {
  const likes = await supabaseClient
    .from('favourites')
    .select('episode_id')
    .order('created_at', { ascending: false });
  return likes.data?.map((e) => e.episode_id);
}
