import { supabaseClient, type Episode } from '$lib/shared/api';
import { transformEpisodeRequest, type SBEpisode } from '$lib/shared/api/adapters';

const cache = new Map<number, Episode>();

export async function getEpisode(id: number) {
  if (cache.has(id)) return cache.get(id);

  const { data } = await supabaseClient
    .from<SBEpisode>('episodes')
    .select('*')
    .eq('id', id)
    .single();

  const episode = data ? transformEpisodeRequest(data) : null;
  if (episode) cache.set(id, episode);
  return episode;
}
