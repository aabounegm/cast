import { likesStore, addLike, removeLike, toggleLike } from '../like';
import { get } from 'svelte/store';
import type { Episode } from '$lib/shared/types';

const exampleEpisode: Episode = {
  id: 1,
  title: 'Episode 1',
  audioUrl: 'http://example.com',
  duration: 5,
};

const expectedLikes: Map<Episode['id'], Episode> = new Map([[exampleEpisode.id, exampleEpisode]]);

it('registers a like', () => {
  addLike(exampleEpisode);
  expect(get(likesStore)).toEqual(expectedLikes);
});

it('removes the registered like', () => {
  removeLike(exampleEpisode);
  expect(get(likesStore)).toEqual(new Map());
});

it('toggles the like', () => {
  toggleLike(exampleEpisode);
  expect(get(likesStore)).toEqual(expectedLikes);
});

it('toggles twice to remove like', () => {
  toggleLike(exampleEpisode);
  toggleLike(exampleEpisode);
  expect(get(likesStore)).toEqual(expectedLikes);
});
