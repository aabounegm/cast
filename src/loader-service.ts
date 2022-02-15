import type { PodcastEpisode, PodcastSeries } from './podcast';

export async function getPodcast(id: string) {
  console.log('loading podcast', id);
  return podcast;
}

export async function getEpisodes(id: string) {
  console.log('loading episodes', id);
  return episodes;
}

const podcast = {
  coverUrl: 'https://influencermarketing.ai/wp-content/uploads/2020/05/Podcast-blog-6.jpg',
  title: 'Bi Co Bo Co',
  authors: 'Cciqhaqxa',
  description: 'Saxlhi Mayarulal!',
  episodesNumber: 15,
  website: 'https://raxys.app',
} as PodcastSeries;

const episodes = [
  {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
    title: 'Ahulgox',
    description: 'Qо kkanşşinab bakʼalda, Bоda ceve kʼancʼulev.',
    duration: 124,
  },
  {
    src: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
    title: 'Argwan',
    description: 'Qо kkanşşinab bakʼalda, Bоda ceve kʼancʼulev.',
    duration: 42,
  },
] as PodcastEpisode[];
