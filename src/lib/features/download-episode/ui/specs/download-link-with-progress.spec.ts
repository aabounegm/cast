import svelte from 'svelte-inline-compile';
import { render, screen } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import DownloadLink from '../download-link-with-progress.svelte';

it.skip('forwards the click event on clicks', async () => {
  const mockClickHandler = jest.fn();
  const user = userEvent.setup();

  const downloadLink = useLocalVars(svelte`<DownloadLink on:click={mockClickHandler} />`, [
    DownloadLink,
    mockClickHandler,
  ]);
  render(downloadLink);
  await user.click(screen.getByRole('button'));

  expect(mockClickHandler).toHaveBeenCalledTimes(1);
});

it.skip('forwards the click event on keyboard activation', async () => {
  const mockClickHandler = jest.fn();
  const user = userEvent.setup();

  const downloadLink = useLocalVars(svelte`<DownloadLink on:click={mockClickHandler} />`, [
    DownloadLink,
    mockClickHandler,
  ]);
  render(downloadLink);
  await user.tab();
  await user.keyboard('{Enter}');
  await user.keyboard(' ');
  await user.keyboard('a');

  expect(mockClickHandler).toHaveBeenCalledTimes(2);
});
