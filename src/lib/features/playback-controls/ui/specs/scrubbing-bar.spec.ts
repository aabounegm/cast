import svelte from 'svelte-inline-compile';
import { render, screen, fireEvent } from '@testing-library/svelte';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import ScrubbingBar from '../scrubbing-bar.svelte';

const sampleDuration = 13 * 60 + 37; // 13:37
const samplePosition = 1 * 60 + 17; // 1:17

it('reflects the current audio position in the scrubbing thumb', () => {
  render(ScrubbingBar, {
    duration: sampleDuration,
    position: samplePosition,
  });

  const slider = screen.getByRole('slider');
  expect(slider).toHaveValue(samplePosition.toString());
  expect(slider).toHaveAttribute('aria-valuetext', '1:17');
});

it('shows the elapsed and remaining time', () => {
  render(ScrubbingBar, {
    duration: sampleDuration,
    position: samplePosition,
  });

  expect(screen.getByText('1:17')).toBeInTheDocument();
  expect(screen.getByText('-12:20')).toBeInTheDocument(); // 13:37 - 1:17 = 12:20
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
  render(scrubbingBarWithScrubHandler);

  // Drag the scrubbing bar from 1:17 to 1:18
  const newValue = 1 * 60 + 18;
  fireEvent.input(screen.getByRole('slider'), { target: { value: newValue } });

  expect(scrubHandler).toBeCalledWith(new CustomEvent('scrub', { detail: { position: newValue } }));
});
