import { supabaseClient, transformEpisodeRequest, type SBEpisode } from '$lib/shared/api';

export async function getEpisode(id: number) {
  const { data } = await supabaseClient
    .from<SBEpisode>('episodes')
    .select('*')
    .eq('id', id)
    .single();

  return data ? transformEpisodeRequest(data) : null;
}
