import { render } from '@testing-library/svelte';
import type { Podcast } from '$lib/shared/api';
import { PodcastEpisodesPage } from '../..';

const samplePodcast: Podcast = {
  id: 1,
  title: 'sample',
  author: 'sample',
  coverUrl: 'sample',
  episodes: [],
};

it('contains a link to go back to Podcast Gallery', () => {
  const { getByRole } = render(PodcastEpisodesPage, { podcast: samplePodcast });
  const linkBack = getByRole('link', { name: /All podcasts/i });
  expect(linkBack).toHaveAttribute('href', '/');
});
