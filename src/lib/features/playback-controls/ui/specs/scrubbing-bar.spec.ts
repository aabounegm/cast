import svelte from 'svelte-inline-compile';
import { render, fireEvent } from '@testing-library/svelte';

import { seek, currentTime, duration } from '$lib/entities/audio';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import ScrubbingBar from '../scrubbing-bar.svelte';

const sampleDuration = 13 * 60 + 37; // 13:37
const samplePosition = 1 * 60 + 17; // 1:17

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

it('reflects the current audio position in the scrubbing thumb', () => {
  const { getByRole } = render(ScrubbingBar, {
    duration: sampleDuration,
    position: samplePosition,
  });

  const slider = getByRole('slider');
  expect(slider).toHaveValue(samplePosition.toString());
  expect(slider).toHaveAttribute('aria-valuetext', '1:17');
});

it('shows the elapsed and remaining time', () => {
  const { getByText } = render(ScrubbingBar, {
    duration: sampleDuration,
    position: samplePosition,
  });

  expect(getByText('1:17')).toBeInTheDocument();
  expect(getByText('-12:20')).toBeInTheDocument(); // 13:37 - 1:17 = 12:20
});

it('dispatches a `scrub` event upon scrubbing', () => {
  const scrubHandler = jest.fn().mockName('on:scrub event handler');
  const scrubbingBarWithScrubHandler = useLocalVars(
    svelte`
      <ScrubbingBar
        duration={sampleDuration}
        position={samplePosition}
        on:scrub={scrubHandler}
      />
    `,
    [ScrubbingBar, sampleDuration, samplePosition, scrubHandler]
  );
  const { getByRole } = render(scrubbingBarWithScrubHandler);

  // Drag the scrubbing bar from 1:17 to 1:18
  const newValue = 1 * 60 + 18;
  fireEvent.input(getByRole('slider'), { target: { value: newValue } });

  expect(scrubHandler).toBeCalledWith(new CustomEvent('scrub', { detail: { position: newValue } }));
});

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

  const { getByText } = render(ScrubbingBar);

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

  const { getByRole } = render(ScrubbingBar);

  // Drag the scrubbing bar from 13:37 to 13:38
  const newValue = 13 * 60 + 38;
  fireEvent.input(getByRole('slider'), { target: { value: newValue } });

  expect(seek).toHaveBeenCalledWith(newValue);
});
