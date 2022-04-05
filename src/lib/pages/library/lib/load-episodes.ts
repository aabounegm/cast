import { supabaseClient, type Episode } from '$lib/shared/api';
import { transformEpisodeRequest, type SBEpisode } from '$lib/shared/api/adapters';

export async function getEpisodes(ids: number[]) {
  const { data } = await supabaseClient.from<SBEpisode>('episodes').select('*').in('id', ids);
  const episodes = data?.map(transformEpisodeRequest).filter((e) => e);
  return (episodes as Episode[] | undefined) ?? [];
}
