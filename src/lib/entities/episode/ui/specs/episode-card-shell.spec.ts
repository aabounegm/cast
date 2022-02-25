import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import type { Episode } from '$lib/shared/api';
import { EpisodeCardShell } from '../..';

const sampleEpisode: Episode = {
  id: 1,
  title: 'sample title',
  audioUrl: 'sample URL',
  duration: 3600,
};
const episodeCardWithContent = useLocalVars(svelte`<EpisodeCardShell episode={sampleEpisode} />`, [
  EpisodeCardShell,
  sampleEpisode,
]);

it('displays the title of the episode', () => {
  const { getByText } = render(episodeCardWithContent);

  expect(getByText(sampleEpisode.title)).toBeInTheDocument();
});

it('displays the duration of the episode', () => {
  const { getByText } = render(episodeCardWithContent);

  expect(getByText('1:00:00', { exact: false })).toBeInTheDocument();
});
