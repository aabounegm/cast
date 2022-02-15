export interface PodcastSeries {
  coverUrl: string;
  title: string;
  authors: string;
  website: string;
  description: string;
  episodesNumber: number;
}
export interface PodcastEpisode {
  src: string;
  title: string;
  description: string;
  duration: number;
}
