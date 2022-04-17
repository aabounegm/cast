import { supabaseClient, type Podcast } from '$lib/shared/api';

export async function fetchTrending() {
  const hist = await supabaseClient
    .from<{ podcast_id: Podcast['id'] }>('trending_podcasts')
    .select('podcast_id');
  return hist.data?.map((e) => e.podcast_id) ?? [];
}
