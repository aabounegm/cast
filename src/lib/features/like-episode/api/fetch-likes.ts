import { supabaseClient } from '$lib/shared/api';
import type { SBFavourite } from '$lib/shared/api/adapters';

export async function fetchLikes() {
  const likes = await supabaseClient
    .from<SBFavourite>('favourites')
    .select('episode_id')
    .order('created_at', { ascending: false });
  return likes.data?.map((e) => e.episode_id);
}
