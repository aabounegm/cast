import type { SBEpisode, Episode } from './types';
import { transformEpisodeRequest } from './adapters';
import supabaseClient from './supabase';

export const episodeList = async (): Promise<Episode[]> => {
  const res = await supabaseClient.from<SBEpisode>('episodes').select('*');
  if (res.error) {
    return [];
  }

  return res.data.map(transformEpisodeRequest);
};

export const episodeGet = async (id: number): Promise<null | Episode> => {
  const res = await supabaseClient.from<SBEpisode>('episodes').select().eq('id', id).single();

  if (res.error) {
    return null;
  }

  return transformEpisodeRequest(res.data);
};
