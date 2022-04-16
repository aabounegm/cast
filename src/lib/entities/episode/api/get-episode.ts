import { supabaseClient, transformEpisodeRequest, type SBEpisode } from '$lib/shared/api';

export async function getEpisode(id: number) {
  const { data, error } = await supabaseClient
    .from<SBEpisode>('episodes')
    .select('*')
    .eq('id', id)
    .single();

  if (error !== null) {
    throw error;
  } else {
    return transformEpisodeRequest(data);
  }
}
