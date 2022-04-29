import { addToListeningHistory, listeningHistory } from '../store';
import { get } from 'svelte/store';
import type { Episode } from '$lib/shared/api';

jest.mock('$app/env', () => ({ browser: true }), { virtual: true });

const exampleEpisode: Episode = {
  id: 1,
  episodeNumber: 1,
  podcastID: 1,
  title: 'Episode 1',
  audioUrl: 'http://example.com',
  duration: 5,
};

const expectedHistory: number[] = [exampleEpisode.id];

it('adds an episode to the history', () => {
  addToListeningHistory(exampleEpisode);
  expect(get(listeningHistory)).toEqual(expectedHistory);
  listeningHistory.set([]);
});

it('saves the value in the store correctly', () => {
  expect(get(listeningHistory)).toEqual([]);
  const sampleIDs = [1, 2, 3, 4, 5, 6];
  listeningHistory.set(sampleIDs);
  expect(get(listeningHistory)).toEqual(sampleIDs);
  listeningHistory.set([]);
  expect(get(listeningHistory)).toEqual([]);
});
