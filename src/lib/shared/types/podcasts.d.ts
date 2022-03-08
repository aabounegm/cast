import { SBEpisode } from './episodes';
import { SBFile } from './common';

export interface SBPodcast {
  id: number;
  title: string;
  author: string;
  episodes: SBEpisode[];
  coverArt: SBFile;
}

export interface Podcast {
  id: number;
  title: string;
  author: string;
  coverUrl: string;
  episodes: Episode[];
}
