import { toggleGlobalPlayback } from '../toggle-global-playback';

import { get } from 'svelte/store';
import { play, pause } from '$lib/entities/audio';

jest.mock('svelte/store', () => ({
  ...jest.requireActual('svelte/store'),
  get: jest.fn().mockName('get() from svelte/store'),
}));

jest.mock('$lib/entities/audio', () => ({
  ...jest.requireActual('$lib/entities/audio'),
  play: jest.fn().mockName('play() from $lib/entities/audio'),
  pause: jest.fn().mockName('pause() from $lib/entities/audio'),
}));

it('calls `play()` when the audio is paused', () => {
  jest.mocked(get).mockImplementation(() => true);
  toggleGlobalPlayback();

  expect(play).toBeCalled();
});

it('calls `pause()` when the audio is playing', () => {
  jest.mocked(get).mockImplementation(() => false);
  toggleGlobalPlayback();

  expect(pause).toBeCalled();
});
