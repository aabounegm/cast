import type { SBPodcast, Podcast } from './types';
import { transformPodcastRequest } from './proxies';
import supabaseClient from './supabase';

export const podcastRead = async (): Promise<Podcast[]> => {
  const res = await supabaseClient.from<SBPodcast>('podcasts').select('*, episodes (*)');
  if (res.error) {
    return [];
  }

  return res.data.map((podcast) => transformPodcastRequest(podcast));
};

export const podcastGet = async (id: number): Promise<null | Podcast> => {
  const res = await supabaseClient
    .from<SBPodcast>('podcasts')
    .select('*, episodes (*)')
    .eq('id', id)
    .single();

  if (res.error || !res.data) {
    return null;
  }

  return transformPodcastRequest(res.data);
};
