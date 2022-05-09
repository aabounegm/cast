import { render, screen } from '@testing-library/svelte';

import type { Episode } from '$lib/shared/api';
import { EpisodeCardShell } from '../..';

const sampleEpisode: Episode = {
  id: 1,
  episodeNumber: 1,
  podcastID: 1,
  title: 'sample title',
  audioUrl: 'sample URL',
  duration: 3600,
};

it("displays the title of the episode as the card's accessible name", () => {
  render(EpisodeCardShell, { episode: sampleEpisode });

  screen.getByRole('article', { name: sampleEpisode.title });
});

it('displays the duration of the episode', () => {
  render(EpisodeCardShell, { episode: sampleEpisode });

  screen.getByText('1:00:00', { exact: false });
});
