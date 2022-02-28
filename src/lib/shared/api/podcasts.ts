import type { SBPodcast, Podcast } from './types';
import { transformPodcastRequest } from './adapters';
import supabaseClient from './supabase';

export const podcastList = async (): Promise<Podcast[]> => {
  const res = await supabaseClient.from<SBPodcast>('podcasts').select('*, episodes (*)');
  if (res.error) {
    alert(res);
    return [];
  }

  return res.data.map(transformPodcastRequest);
};

export const podcastGet = async (id: number): Promise<null | Podcast> => {
  const res = await supabaseClient
    .from<SBPodcast>('podcasts')
    .select('*, episodes (*)')
    .eq('id', id)
    .single();

  if (res.error || !res.data) {
    alert(res);
    return null;
  }

  return transformPodcastRequest(res.data);
};
