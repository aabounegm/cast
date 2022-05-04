import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import { PlaybackButton } from '../..';

it('dispatches a `play` event upon clicking when paused', async () => {
  const user = userEvent.setup();
  const playHandler = jest.fn().mockName('on:play event handler');
  const pauseHandler = jest.fn().mockName('on:pause event handler');
  const playbackButtonWithClickHandler = useLocalVars(
    svelte`<PlaybackButton on:play={playHandler} on:pause={pauseHandler} playing={false} />`,
    [PlaybackButton, playHandler, pauseHandler]
  );

  render(playbackButtonWithClickHandler);
  await user.click(screen.getByRole('button'));
  expect(playHandler).toHaveBeenCalledTimes(1);
  expect(pauseHandler).not.toHaveBeenCalled();
});

it('dispatches a `pause` event upon clicking when playing', async () => {
  const user = userEvent.setup();
  const playHandler = jest.fn().mockName('on:play event handler');
  const pauseHandler = jest.fn().mockName('on:pause event handler');
  const playbackButtonWithClickHandler = useLocalVars(
    svelte`<PlaybackButton on:play={playHandler} on:pause={pauseHandler} playing={true} />`,
    [PlaybackButton, playHandler, pauseHandler]
  );

  render(playbackButtonWithClickHandler);
  await user.click(screen.getByRole('button'));
  expect(pauseHandler).toHaveBeenCalledTimes(1);
  expect(playHandler).not.toHaveBeenCalled();
});

it('has an accessible name that reflects the playing state', () => {
  render(PlaybackButton, { playing: true });
  expect(screen.getByRole('button', { name: 'Pause' })).toBeInTheDocument();
});

it('has an accessible name that reflects the paused state', () => {
  render(PlaybackButton, { playing: false });
  expect(screen.getByRole('button', { name: 'Play' })).toBeInTheDocument();
});
