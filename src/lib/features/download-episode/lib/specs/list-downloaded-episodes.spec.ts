import { sendRequest } from 'worker-request-response';

import { podcastList } from '$lib/entities/podcast';
import type { Podcast } from '$lib/shared/api';

import { getDownloadedEpisodes } from '../list-downloaded-episodes';

jest.mock('worker-request-response', () => ({
  sendRequest: jest.fn(),
}));
jest.mock('$lib/entities/podcast');

const downloadedUrls = [
  'https://sample.url/resources/1?download=true',
  'https://sample.url/resources/2?download=true',
];

const samplePodcast: Podcast = {
  id: 1,
  title: 'sample podcast',
  author: 'sample author',
  coverUrl: 'https://placekitten.com/1/1',
  episodes: [
    {
      id: 1,
      title: 'sample episode 1',
      duration: 1,
      audioUrl: 'https://sample.url/resources/1',
      episodeNumber: 1,
      podcastID: 1,
    },
    {
      id: 2,
      title: 'sample episode 2',
      duration: 1,
      audioUrl: 'https://sample.url/resources/2',
      episodeNumber: 1,
      podcastID: 1,
    },
    {
      id: 3,
      title: 'sample episode 3',
      duration: 1,
      audioUrl: 'https://sample.url/resources/3',
      episodeNumber: 1,
      podcastID: 1,
    },
  ],
};

it('fetches downloaded episodes from a service worker', async () => {
  Object.defineProperty(window.navigator, 'serviceWorker', {
    configurable: true,
    value: { controller: {} },
  });
  jest.mocked(sendRequest).mockResolvedValueOnce(downloadedUrls);
  jest.mocked(podcastList).mockResolvedValueOnce([samplePodcast]);
  expect(await getDownloadedEpisodes()).toEqual(samplePodcast.episodes.slice(0, 2));
});

it('correctly handles the case where the service worker failed to install', async () => {
  Object.defineProperty(window.navigator, 'serviceWorker', {
    configurable: true,
    value: { controller: null },
  });
  jest.mocked(podcastList).mockResolvedValueOnce([samplePodcast]);
  expect(await getDownloadedEpisodes()).toEqual([]);
});
