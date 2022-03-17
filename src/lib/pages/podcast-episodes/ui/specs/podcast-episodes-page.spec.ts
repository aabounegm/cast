import { render } from '@testing-library/svelte';
import { MockComponent } from '$lib/shared/lib/jest-hacks';
import type { Podcast } from '$lib/shared/api';
import { PodcastEpisodesPage } from '../..';

jest.mock('~icons/ic/round-arrow-back', () => ({ default: MockComponent }), {
  virtual: true,
});
jest.mock('~icons/ic/round-play-arrow', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/round-pause', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/round-replay-10', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/round-forward-30', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/sharp-favorite', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/twotone-favorite', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/twotone-file-download-done', () => ({ default: null }), {
  virtual: true,
});

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
