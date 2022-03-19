import { render, fireEvent } from '@testing-library/svelte';

jest.mock('$lib/entities/audio', () => ({
  ...jest.requireActual('$lib/entities/audio'),
  duration: {
    subscribe: jest.fn(() => jest.fn()),
  },
  currentTime: {
    subscribe: jest.fn(() => jest.fn()),
  },
  seek: jest.fn().mockName('seek() from $lib/entities/audio'),
}));

import { seek, currentTime, duration } from '$lib/entities/audio';
import { FullControls } from '../..';

it('listens to the global playback position and audio duration', () => {
  const samplePosition = 13 * 60 + 37; // 13:37
  const sampleDuration = 20 * 60; // 20:00

  jest.mocked(currentTime.subscribe).mockImplementation((subscriber) => {
    subscriber(samplePosition);
    return jest.fn();
  });
  jest.mocked(duration.subscribe).mockImplementation((subscriber) => {
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

  jest.mocked(currentTime.subscribe).mockImplementation((subscriber) => {
    subscriber(samplePosition);
    return jest.fn();
  });
  jest.mocked(duration.subscribe).mockImplementation((subscriber) => {
    subscriber(sampleDuration);
    return jest.fn();
  });

  const { getByRole } = render(FullControls);

  // Drag the scrubbing bar from 13:37 to 13:38
  const newValue = 13 * 60 + 38;
  fireEvent.input(getByRole('slider'), { target: { value: newValue } });

  expect(seek).toHaveBeenCalledWith(newValue);
});
