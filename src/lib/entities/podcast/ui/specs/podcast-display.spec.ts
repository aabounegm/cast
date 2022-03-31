import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';

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
  render(podcastDisplayWithContent);

  expect(screen.getByText(samplePodcast.title)).toBeInTheDocument();
  expect(screen.getByText(samplePodcast.author)).toBeInTheDocument();
});

it('displays the amount of episodes', () => {
  render(podcastDisplayWithContent);

  expect(screen.getByText('0 episodes', { exact: false })).toBeInTheDocument();
});
