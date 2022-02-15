import type { PodcastEpisode, PodcastSeries } from './podcast';

export async function getPodcast(id: string) {
  return podcast;
}

export async function getEpisodes(id: string) {
  return episodes;
}

const podcast = {
  coverUrl:
    'https://upload.wikimedia.org/wikipedia/commons/7/7f/%D0%93%D0%B0%D0%B7%D0%B8-%D0%9C%D1%83%D1%85%D0%B0%D0%BC%D0%BC%D0%B0%D0%B4_%28%D1%81%D1%8B%D0%BD_%D0%A8%D0%B0%D0%BC%D0%B8%D0%BB%D1%8F%29.jpg',
  title: 'Bi Co Bo Co',
  authors: 'Divan',
  description: 'Saxlhi Mayarulal!',
  episodesNumber: 15,
  website: 'https://raxys.app',
} as PodcastSeries;

const episodes = [
  {
    title: 'Ahulgox',
    description: 'Qо kkanşşinab bakʼalda, Bоda ceve kʼancʼulev.',
    duration: 124,
  },
  {
    title: 'Bqqqi',
    description: 'Qо kkanşşinab bakʼalda, Bоda ceve kʼancʼulev.',
    duration: 42,
  },
] as PodcastEpisode[];
