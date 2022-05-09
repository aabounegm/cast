export interface Episode {
  id: number;
  podcastID: number;
  title: string;
  duration: number;
  audioUrl: string;
  episodeNumber: number;
}

export interface Podcast {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  episodes: Episode[];
}
