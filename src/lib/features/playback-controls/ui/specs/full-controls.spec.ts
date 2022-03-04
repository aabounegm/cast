import { render, fireEvent } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

jest.mock('~icons/ic/round-play-arrow', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/round-pause', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/round-replay-10', () => ({ default: null }), { virtual: true });
jest.mock('~icons/ic/round-forward-30', () => ({ default: null }), { virtual: true });
jest.mock('$lib/entities/audio', () => ({
  ...jest.requireActual('$lib/entities/audio'),
  audio: {
    subscribe: jest.fn(() => jest.fn()),
  },
  audioDuration: {
    subscribe: jest.fn(() => jest.fn()),
  },
  audioPosition: {
    subscribe: jest.fn(() => jest.fn()),
  },
  move: jest.fn().mockName('move() from $lib/entities/audio'),
  seek: jest.fn().mockName('seek() from $lib/entities/audio'),
  play: jest.fn().mockName('play() from $lib/entities/audio'),
  pause: jest.fn().mockName('pause() from $lib/entities/audio'),
}));

import { move, seek, play, pause, audio, audioDuration, audioPosition } from '$lib/entities/audio';
import { FullControls } from '../..';

it('nudges the global playback position back 10 seconds upon pressing "replay 10s"', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(FullControls);

  await user.click(getByRole('button', { name: /Replay/i }));

  expect(move).toHaveBeenCalledWith(-10);
});

it('nudges the global playback position forward 30 seconds upon pressing "forward 30s"', async () => {
  const user = userEvent.setup();
  const { getByRole } = render(FullControls);

  await user.click(getByRole('button', { name: /Forward/i }));

  expect(move).toHaveBeenCalledWith(30);
});

it('listens to the global playback state to determine the Play button action', async () => {
  jest.mocked(audio.subscribe).mockImplementation((subscriber) => {
    subscriber({ paused: true } as HTMLAudioElement);
    return jest.fn();
  });
  const user = userEvent.setup();
  const { getByRole, rerender } = render(FullControls);

  await user.click(getByRole('button', { name: 'Play' }));
  expect(play).toHaveBeenCalled();
  expect(pause).not.toHaveBeenCalled();

  jest.mocked(audio.subscribe).mockImplementation((subscriber) => {
    subscriber({ paused: false } as HTMLAudioElement);
    return jest.fn();
  });
  rerender({});

  await user.click(getByRole('button', { name: 'Pause' }));
  expect(pause).toHaveBeenCalled();
});

it('listens to the global playback position and audio duration', () => {
  const samplePosition = 13 * 60 + 37; // 13:37
  const sampleDuration = 20 * 60; // 20:00

  jest.mocked(audioPosition.subscribe).mockImplementation((subscriber) => {
    subscriber(samplePosition);
    return jest.fn();
  });
  jest.mocked(audioDuration.subscribe).mockImplementation((subscriber) => {
    subscriber(sampleDuration);
    return jest.fn();
  });

  const { getByText } = render(FullControls);

  expect(getByText('13:37')).toBeInTheDocument();
  expect(getByText('-6:23')).toBeInTheDocument(); // 20:00 - 13:37 = 6:23
});

it('seeks the global audio on scrubbing', async () => {
  const samplePosition = 13 * 60 + 37; // 13:37
  const sampleDuration = 20 * 60; // 20:00

  jest.mocked(audioPosition.subscribe).mockImplementation((subscriber) => {
    subscriber(samplePosition);
    return jest.fn();
  });
  jest.mocked(audioDuration.subscribe).mockImplementation((subscriber) => {
    subscriber(sampleDuration);
    return jest.fn();
  });

  const { getByRole } = render(FullControls);

  // Drag the scrubbing bar from 13:37 to 13:38
  const newValue = 13 * 60 + 38;
  fireEvent.input(getByRole('slider'), { target: { value: newValue } });

  expect(seek).toHaveBeenCalledWith(newValue);
});
