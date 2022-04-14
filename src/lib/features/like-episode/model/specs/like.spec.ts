import { likesStore, toggleLike } from '../like';
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

const expectedLikes: Set<number> = new Set([exampleEpisode.id]);

it('toggles the like', () => {
  toggleLike(exampleEpisode);
  expect(get(likesStore)).toEqual(expectedLikes);
});

it('toggles twice to remove like', () => {
  toggleLike(exampleEpisode);
  toggleLike(exampleEpisode);
  expect(get(likesStore)).toEqual(expectedLikes);
});
