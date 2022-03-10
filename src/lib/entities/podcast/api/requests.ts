import {
  type Podcast,
  type SBPodcast,
  transformPodcastRequest,
  supabaseClient,
  notNull,
} from '$lib/shared/api';

const allFieldsWithEpisodes = `
  id,
  title,
  author,
  episodes (
    id,
    podcast_id,
    title,
    duration,
    audio: files!audio (name)
  ),
  coverArt: files!cover_art (name)
`;

export const podcastList = async (): Promise<Podcast[]> => {
  const res = await supabaseClient.from<SBPodcast>('podcasts').select(allFieldsWithEpisodes);

  if (res.error !== null) {
    throw res.error;
  }

  return res.data.map(transformPodcastRequest).filter(notNull);
};

export const podcastGet = async (id: number): Promise<null | Podcast> => {
  const res = await supabaseClient
    .from<SBPodcast>('podcasts')
    .select(allFieldsWithEpisodes)
    .eq('id', id)
    .single();

  if (res.error !== null) {
    throw res.error;
  }

  return transformPodcastRequest(res.data);
};
