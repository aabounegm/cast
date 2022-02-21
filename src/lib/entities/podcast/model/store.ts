import type { Podcast } from '$lib/shared/api';

const samplePodcast: Podcast = {
  id: 1,
  coverUrl: 'https://influencermarketing.ai/wp-content/uploads/2020/05/Podcast-blog-6.jpg',
  title: 'Bi Co Bo Co',
  author: 'Cciqhaqxa',
  episodes: [
    {
      id: 1,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3',
      title: 'Ahulgox',
      duration: 124,
    },
    {
      id: 2,
      audioUrl: 'https://www.soundhelix.com/examples/mp3/SoundHelix-Song-7.mp3',
      title: 'Argwan',
      duration: 42,
    },
  ],
};

export async function getPodcast(_id: number) {
  // TODO: implement the logic of loading a podcast by ID
  return samplePodcast;
}
