import type { SBEpisode, Episode } from './types';
import { transformEpisodeRequest } from './adapters';
import supabaseClient from './supabase';
import { notNull } from './not-null';

export const episodeList = async (): Promise<Episode[]> => {
  const res = await supabaseClient.from<SBEpisode>('episodes').select('*');
  if (res.error !== null) {
    throw res.error;
  }

  return res.data.map(transformEpisodeRequest).filter(notNull) as Episode[];
};

export const episodeGet = async (id: number): Promise<null | Episode> => {
  const res = await supabaseClient.from<SBEpisode>('episodes').select().eq('id', id).single();

  if (res.error !== null) {
    throw res.error;
  }

  return transformEpisodeRequest(res.data);
};
