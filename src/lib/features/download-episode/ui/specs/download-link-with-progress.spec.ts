import svelte from 'svelte-inline-compile';
import { render, screen, act } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { writable } from 'svelte/store';
import { useLocalVars } from '$lib/shared/lib/jest-hacks';
import DownloadLinkWithProgress from '../download-link-with-progress.svelte';
import { startEpisodeDownload } from '../../lib/download';

jest.mock('../../lib/download', () => ({
  startEpisodeDownload: jest
    .fn()
    .mockName('startEpisodeDownload() from $lib/features/download-episode/lib'),
}));

it('renders the appropriate component depending on progress', async () => {
  const progress = writable(0);
  const user = userEvent.setup();
  jest.mocked(startEpisodeDownload).mockReturnValue(progress);

  const downloadLink = useLocalVars(svelte`<DownloadLinkWithProgress urls={['']} />`, [
    DownloadLinkWithProgress,
  ]);
  render(downloadLink);

  screen.getByText('Download');
  await user.click(screen.getByRole('button'));
  screen.getByText('Downloading, 0%');
  await act(() => progress.set(99));
  screen.getByText('Downloading, 99%');
  await act(() => progress.set(100));
  screen.getByText('Available offline');
});
