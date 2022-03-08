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
