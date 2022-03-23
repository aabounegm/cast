import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import { ToggleTranscript } from '../..';

it('dispatches a `click` event upon clicking', async () => {
  const user = userEvent.setup();
  const clickHandler = jest.fn().mockName('on:click event handler');
  const transcriptToggleWithClickHandler = useLocalVars(
    svelte`<ToggleTranscript on:click={clickHandler} />`,
    [ToggleTranscript, clickHandler]
  );

  const { getByRole } = render(transcriptToggleWithClickHandler);
  await user.click(getByRole('button'));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it('has an accessible name that reflects the transcript absence', () => {
  const { getByRole } = render(ToggleTranscript, { transcriptShown: false });
  expect(getByRole('button', { name: /Read the transcript/i })).toBeInTheDocument();
});

it('has an accessible name that reflects the transcript presence', () => {
  const { getByRole } = render(ToggleTranscript, { transcriptShown: true });
  expect(getByRole('button', { name: /Hide the transcript/i })).toBeInTheDocument();
});
