import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

jest.mock('$lib/entities/audio', () => ({
  ...jest.requireActual('$lib/entities/audio'),

  paused: {
    subscribe: jest.fn(() => jest.fn()),
  },
  move: jest.fn().mockName('move() from $lib/entities/audio'),
  play: jest.fn().mockName('play() from $lib/entities/audio'),
  pause: jest.fn().mockName('pause() from $lib/entities/audio'),
}));

import { move, play, pause, paused } from '$lib/entities/audio';
import { PlaybackControls } from '../..';

it('nudges the global playback position back 10 seconds upon pressing "replay 10s"', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(PlaybackControls);

  await user.click(getByRole('button', { name: /Replay/i }));

  expect(move).toHaveBeenCalledWith(-10);
});

it('nudges the global playback position forward 30 seconds upon pressing "forward 30s"', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(PlaybackControls);

  await user.click(getByRole('button', { name: /Forward/i }));

  expect(move).toHaveBeenCalledWith(30);
});

it('listens to the global playback state to determine the Play button action', async () => {
  jest.mocked(paused.subscribe).mockImplementation((subscriber) => {
    subscriber(true);
    return jest.fn();
  });
  const user = userEvent.setup();
  const { getByRole, rerender } = render(PlaybackControls);

  await user.click(getByRole('button', { name: 'Play' }));
  expect(play).toHaveBeenCalled();
  expect(pause).not.toHaveBeenCalled();

  jest.mocked(paused.subscribe).mockImplementation((subscriber) => {
    subscriber(false);
    return jest.fn();
  });
  rerender({});

  await user.click(getByRole('button', { name: 'Pause' }));
  expect(pause).toHaveBeenCalled();
});
