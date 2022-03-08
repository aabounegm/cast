import type { Episode, Podcast, SBPodcast } from '$lib/shared/types';
import { notNull, supabaseClient } from '$lib/shared/api';
import { transformEpisodeRequest } from '$lib/entities/episode';

export const transformPodcastRequest = (podcast: SBPodcast): Podcast | null => {
  const { data: coverUrlData } = supabaseClient.storage
    .from('podcast-cover-arts')
    .getPublicUrl(podcast.coverArt.name);

  if (coverUrlData === null) {
    return null;
  }

  return {
    id: podcast.id,
    coverUrl: coverUrlData.publicURL,
    title: podcast.title,
    author: podcast.author,
    episodes: podcast.episodes.map(transformEpisodeRequest).filter(notNull) as Episode[],
  };
};
