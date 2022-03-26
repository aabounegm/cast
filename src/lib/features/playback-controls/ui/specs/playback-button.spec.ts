import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import { PlaybackButton } from '../..';

it('dispatches a `click` event upon clicking', async () => {
  const user = userEvent.setup();
  const clickHandler = jest.fn().mockName('on:click event handler');
  const playbackButtonWithClickHandler = useLocalVars(
    svelte`<PlaybackButton on:click={clickHandler} />`,
    [PlaybackButton, clickHandler]
  );

  render(playbackButtonWithClickHandler);
  await user.click(screen.getByRole('button'));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it('has an accessible name that reflects the playing state', () => {
  render(PlaybackButton, { playing: true });
  expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
});

it('has an accessible name that reflects the paused state', () => {
  render(PlaybackButton, { playing: false });
  expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
});
