import type { SBEpisode, Episode } from './types';
import { transformEpisodeRequest } from './proxies';
import supabaseClient from './supabase';

export const episodeRead = async (): Promise<Episode[]> => {
  const res = await supabaseClient.from<SBEpisode>('episodes').select();
  if (res.error) {
    return [];
  }

  return res.data.map((podcast) => transformEpisodeRequest(podcast));
};

export const episodeGet = async (id: number): Promise<null | Episode> => {
  const res = await supabaseClient.from<SBEpisode>('episodes').select().eq('id', id).single();

  if (res.error || !res.data) {
    return null;
  }

  return transformEpisodeRequest(res.data);
};
