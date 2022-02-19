/* eslint-disable camelcase */
export interface SBPodcast {
  id: number;
  title: string;
  cover_url: string;
  author: string;
  inserted_at: Date;
  updated_at: Date;
  episodes: SBEpisode[];
}

export interface SBEpisode {
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
/* eslint-enable camelcase */

export interface Episode {
  id: number;
  title: string;
  duration: number;
  audioUrl: string;
  favorite?: boolean;
}

export interface Podcast {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  episodes: Episode[];
}
