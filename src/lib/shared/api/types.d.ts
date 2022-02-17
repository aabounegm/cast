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
}
