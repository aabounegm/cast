import { likesStore, toggleLike } from '../like';
import { get } from 'svelte/store';
import type { Episode } from '$lib/shared/api';
import { snackbar } from '$lib/shared/ui/snackbar';

jest.mock('$app/env', () => ({ browser: true }), { virtual: true });
jest.mock('$lib/shared/api', () => ({
  ...jest.requireActual('$lib/shared/api'),
  supabaseClient: {
    auth: {
      user: jest.fn().mockName('supabaseClient.auth.user()').mockReturnValue(null),
      onAuthStateChange: jest.fn().mockName('supabaseClient.auth.onAuthStateChange'),
    },
  },
}));
jest.mock('$lib/shared/ui/snackbar', () => ({
  snackbar: jest.fn().mockName('snackbar'),
}));

const exampleEpisode: Episode = {
  id: 1,
  episodeNumber: 1,
  podcastID: 1,
  title: 'Episode 1',
  audioUrl: 'http://example.com',
  duration: 5,
};

const expectedLikes = [exampleEpisode.id];

it('toggles the like', () => {
  toggleLike(exampleEpisode);
  expect(get(likesStore)).toEqual(expectedLikes);
});

it('toggles twice to remove like', () => {
  toggleLike(exampleEpisode);
  toggleLike(exampleEpisode);
  expect(get(likesStore)).toEqual(expectedLikes);
});

it('asks a new user to sign in', () => {
  toggleLike(exampleEpisode);
  expect(snackbar).toHaveBeenCalled();
});
