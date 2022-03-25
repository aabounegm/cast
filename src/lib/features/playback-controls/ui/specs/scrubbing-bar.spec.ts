import svelte from 'svelte-inline-compile';
import { render, fireEvent } from '@testing-library/svelte';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import ScrubbingBar from '../scrubbing-bar.svelte';

const sampleDuration = 13 * 60 + 37; // 13:37
const samplePosition = 1 * 60 + 17; // 1:17

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
