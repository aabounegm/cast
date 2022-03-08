import type { Episode, SBEpisode } from '$lib/shared/types';
import supabaseClient from '$lib/shared/api/supabase';

export const transformEpisodeRequest = (episode: SBEpisode): Episode | null => {
  const { data: audioUrlData } = supabaseClient.storage
    .from('podcast-audio-files')
    .getPublicUrl(episode.audio.name);

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
