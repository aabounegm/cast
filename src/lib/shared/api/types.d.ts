export interface SBFile {
  name: string;
}

export interface SBPodcast {
  id: number;
  title: string;
  author: string;
  episodes: SBEpisode[];
  coverArt: SBFile;
}

export interface SBEpisode {
  id: number;
  title: string;
  duration: number;
  audio: SBFile;
}

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
