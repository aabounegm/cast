import { supabaseClient } from '$lib/shared/api';
import { transformEpisodeRequest, type SBEpisode } from '$lib/shared/api/adapters';

export async function fetchEpisode(id: number) {
  const { data } = await supabaseClient
    .from<SBEpisode>('episodes')
    .select('*')
    .eq('id', id)
    .single();

  return data ? transformEpisodeRequest(data) : null;
}
