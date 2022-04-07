import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';
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

  render(transcriptToggleWithClickHandler);
  await user.click(screen.getByRole('button'));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it('has an accessible name that reflects the transcript absence', () => {
  render(ToggleTranscript, { transcriptShown: false });
  expect(screen.getByRole('button', { name: /Read the transcript/i })).toBeInTheDocument();
});

it('has an accessible name that reflects the transcript presence', () => {
  render(ToggleTranscript, { transcriptShown: true });
  expect(screen.getByRole('button', { name: /Hide the transcript/i })).toBeInTheDocument();
});
