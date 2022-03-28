import { currentlyPlayingEpisode } from '../..';

it('conforms to the Svelte writable store contract', () => {
  expect(currentlyPlayingEpisode.subscribe).toBeDefined();
  expect(currentlyPlayingEpisode.set).toBeDefined();
});
