import svelte from 'svelte-inline-compile';
import { render } from '@testing-library/svelte';
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

  const { getByRole } = render(playbackButtonWithClickHandler);
  await user.click(getByRole('button'));
  expect(clickHandler).toHaveBeenCalledTimes(1);
});

it('has an accessible name that reflects the playing state', () => {
  const { getByRole } = render(PlaybackButton, { playing: true });
  expect(getByRole('button', { name: 'Pause' })).toBeInTheDocument();
});

it('has an accessible name that reflects the paused state', () => {
  const { getByRole } = render(PlaybackButton, { playing: false });
  expect(getByRole('button', { name: 'Play' })).toBeInTheDocument();
});
