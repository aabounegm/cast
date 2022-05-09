import type { LoadInput } from '@sveltejs/kit';

import { fetchTrending } from '$lib/features/trending-podcasts';
import { podcastList, podcasts, trendingPodcasts } from '$lib/entities/podcast';
import type { Podcast } from '$lib/shared/api';

import { loadPodcastsAndTrending } from '../..';

jest.mock('$app/env', () => ({ dev: false }), { virtual: true });
jest.mock('$lib/features/trending-podcasts', () => ({
  ...jest.requireActual('$lib/features/trending-podcasts'),
  fetchTrending: jest.fn(),
}));
jest.mock('$lib/entities/podcast', () => ({
  ...jest.requireActual('$lib/entities/podcast'),
  podcastList: jest.fn(),
  podcasts: {
    set: jest.fn().mockName('podcasts.set() from $lib/entities/podcast'),
  },
  trendingPodcasts: {
    set: jest.fn().mockName('trendingPodcasts.set() from $lib/entities/podcast'),
  },
}));

const samplePodcasts: Podcast[] = [
  {
    id: 1,
    title: 'sample',
    author: 'sample',
    coverUrl: 'sample',
    episodes: [],
  },
  {
    id: 2,
    title: 'sample',
    author: 'sample',
    coverUrl: 'sample',
    episodes: [],
  },
];
const sampleTrendingPodcasts = samplePodcasts.slice(0, 1);
const sampleTrendingPodcastIDs = sampleTrendingPodcasts.map((podcast) => podcast.id);

beforeEach(jest.clearAllMocks);

it('populates the store of all podcasts and the trending ones', async () => {
  jest.mocked(podcastList).mockResolvedValueOnce(samplePodcasts);
  jest.mocked(fetchTrending).mockResolvedValueOnce(sampleTrendingPodcastIDs);

  await loadPodcastsAndTrending({} as LoadInput);

  expect(podcasts.set).toHaveBeenCalledWith(samplePodcasts);
  expect(trendingPodcasts.set).toHaveBeenCalledWith(sampleTrendingPodcasts);
});

it('handles the errors during data fetching', async () => {
  jest.mocked(podcastList).mockRejectedValueOnce(undefined);
  jest.mocked(fetchTrending).mockResolvedValueOnce(sampleTrendingPodcastIDs);

  expect((await loadPodcastsAndTrending({} as LoadInput)).status).toBe(500);
});
