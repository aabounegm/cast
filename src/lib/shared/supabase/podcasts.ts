import supabaseClient from './client';

interface SBPodcast {
  id: number;
  title: string;
  cover_url: string;
  author: string;
  inserted_at: Date;
  updated_at: Date;
  episodes: SBEpisode[];
}

interface SBEpisode {
  id: number;
  title: string;
  description: string;
  guests: string[];
  duration: number;
  recording_object_id: string;
  published_at: Date;
  inserted_at: Date;
  updated_at: Date;
}

interface Episode {
  id: number;
  title: string;
  duration: number;
  audioUrl: string;
  favorite?: boolean;
}

interface Podcast {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  episodes: Episode[];
}

const transformEpisodeRequest = (episode: SBEpisode): Episode => ({
  id: episode.id,
  title: episode.title,
  duration: episode.duration,
  audioUrl: episode.recording_object_id,
  // TODO: implement favorites
  favorite: false,
});

const transformPodcastRequest = (podcast: SBPodcast): Podcast => ({
  id: podcast.id,
  coverUrl: podcast.cover_url,
  title: podcast.title,
  author: podcast.author,
  episodes: podcast.episodes.map((episode) => transformEpisodeRequest(episode)),
});

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
