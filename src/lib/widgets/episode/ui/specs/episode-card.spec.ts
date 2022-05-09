import { render, screen } from '@testing-library/svelte';
import { sendRequest } from 'worker-request-response';
import userEvent from '@testing-library/user-event';

import type { Episode } from '$lib/shared/api';
import { currentlyPlayingEpisode } from '$lib/entities/episode';
import { paused, playAfterLoading, pause } from '$lib/entities/audio';
import { EpisodeCard } from '../..';

jest.mock('$app/env', () => ({ browser: true }), { virtual: true });
jest.mock('worker-request-response', () => ({
  sendRequest: jest.fn().mockResolvedValue(false),
}));
jest.mock('$lib/entities/audio', () => ({
  ...jest.requireActual('$lib/entities/audio'),
  paused: {
    subscribe: jest.fn(() => jest.fn()),
  },
  move: jest.fn().mockName('move() from $lib/entities/audio'),
  playAfterLoading: jest.fn().mockName('playAfterLoading() from $lib/entities/audio'),
  pause: jest.fn().mockName('pause() from $lib/entities/audio'),
}));
jest.mock('$lib/entities/episode', () => ({
  ...jest.requireActual('$lib/entities/episode'),
  currentlyPlayingEpisode: {
    subscribe: jest.fn(() => jest.fn()),
    set: jest.fn(),
  },
}));

const sampleEpisode: Episode = {
  id: 1,
  episodeNumber: 1,
  podcastID: 1,
  title: 'sample title',
  audioUrl: 'sample URL',
  duration: 3600,
};

const mockServiceWorker = {};
beforeEach(() => {
  Object.defineProperty(window.navigator, 'serviceWorker', {
    configurable: true,
    value: { controller: mockServiceWorker },
  });
});

it('renders the episode card with the necessary actions', async () => {
  render(EpisodeCard, { episode: sampleEpisode });

  screen.getByRole('article', { name: sampleEpisode.title });
  screen.getByRole('button', { name: 'Play' });
  await screen.findByRole('button', { name: 'Download' });
  screen.getByRole('button', { name: 'Like this episode' });
});

it('queries the service worker for the download status of this episode', () => {
  render(EpisodeCard, { episode: sampleEpisode });

  expect(sendRequest).toHaveBeenLastCalledWith(mockServiceWorker, {
    payload: sampleEpisode.audioUrl,
    type: 'check-download-status',
  });
});

it('correctly detects if the episode is playing right now', () => {
  jest.mocked(paused.subscribe).mockImplementationOnce((subscriber) => {
    subscriber(false);
    return jest.fn();
  });
  jest.mocked(currentlyPlayingEpisode.subscribe).mockImplementationOnce((subscriber) => {
    subscriber(sampleEpisode);
    return jest.fn();
  });

  render(EpisodeCard, { episode: sampleEpisode });

  screen.getByRole('button', { name: 'Pause' });
});

it('replaces the currently playing episode upon pressing Play', async () => {
  const user = userEvent.setup();
  render(EpisodeCard, { episode: sampleEpisode });

  await user.click(screen.getByRole('button', { name: 'Play' }));

  expect(currentlyPlayingEpisode.set).toHaveBeenLastCalledWith(sampleEpisode);
  expect(playAfterLoading).toHaveBeenCalled();
});

it('pauses global playback upon pressing Pause', async () => {
  jest.mocked(paused.subscribe).mockImplementationOnce((subscriber) => {
    subscriber(false);
    return jest.fn();
  });
  jest.mocked(currentlyPlayingEpisode.subscribe).mockImplementationOnce((subscriber) => {
    subscriber(sampleEpisode);
    return jest.fn();
  });
  const user = userEvent.setup();
  render(EpisodeCard, { episode: sampleEpisode });

  await user.click(screen.getByRole('button', { name: 'Pause' }));

  expect(pause).toHaveBeenCalled();
});
