import { addToListeningHistory, listeningHistory } from '../store';
import { get } from 'svelte/store';
import type { Episode } from '$lib/shared/api';

const exampleEpisode: Episode = {
  id: 1,
  episodeNumber: 1,
  podcastID: 1,
  title: 'Episode 1',
  audioUrl: 'http://example.com',
  duration: 5,
};

const expectedHistory: number[] = [exampleEpisode.id];

it('listen to an episode', () => {
  addToListeningHistory(exampleEpisode);
  expect(get(listeningHistory)).toEqual(expectedHistory);
});
