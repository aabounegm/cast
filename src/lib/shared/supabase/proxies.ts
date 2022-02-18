import type { SBEpisode, Episode, SBPodcast, Podcast } from './types';

export const transformEpisodeRequest = (episode: SBEpisode): Episode => ({
  id: episode.id,
  title: episode.title,
  duration: episode.duration,
  audioUrl: episode.recording_object_id,
  // TODO: implement favorites
  favorite: false,
});

export const transformPodcastRequest = (podcast: SBPodcast): Podcast => ({
  id: podcast.id,
  coverUrl: podcast.cover_url,
  title: podcast.title,
  author: podcast.author,
  episodes: podcast.episodes.map((episode) => transformEpisodeRequest(episode)),
});
