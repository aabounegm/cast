import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import type { Podcast } from '$lib/shared/api';
import { PodcastDisplay } from '../..';

const samplePodcast: Podcast = {
  id: 1,
  title: 'sample title',
  author: 'sample author',
  coverUrl: 'sample URL',
  episodes: [],
};
const podcastDisplayWithContent = useLocalVars(svelte`<PodcastDisplay podcast={samplePodcast} />`, [
  PodcastDisplay,
  samplePodcast,
]);

it('displays the title and author of the podcast', () => {
  const { getByText } = render(podcastDisplayWithContent);

  expect(getByText(samplePodcast.title)).toBeInTheDocument();
  expect(getByText(samplePodcast.author)).toBeInTheDocument();
});

it('displays the amount of episodes', () => {
  const { getByText } = render(podcastDisplayWithContent);

  expect(getByText('0 episodes', { exact: false })).toBeInTheDocument();
});
