import { nowPlayingActive } from '../..';

it('conforms to the Svelte writable store contract', () => {
  expect(nowPlayingActive.subscribe).toBeDefined();
  expect(nowPlayingActive.set).toBeDefined();
});
