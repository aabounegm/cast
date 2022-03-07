import supabaseClient from './supabase';
import { notNull } from './not-null';
import type { SBEpisode, Episode, SBPodcast, Podcast } from './types';

export const transformEpisodeRequest = (episode: SBEpisode): Episode | null => {
  const { data: audioUrlData } = supabaseClient.storage
    .from('podcast-audio-files')
    .getPublicUrl(episode.audio_name);

  if (audioUrlData === null) {
    return null;
  }

  return {
    id: episode.id,
    title: episode.title,
    duration: episode.duration,
    audioUrl: audioUrlData.publicURL,
    // TODO: implement favorites
    favorite: false,
  };
};

export const transformPodcastRequest = (podcast: SBPodcast): Podcast | null => {
  const { data: coverUrlData } = supabaseClient.storage
    .from('podcast-cover-arts')
    .getPublicUrl(podcast.cover_art_name);

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
