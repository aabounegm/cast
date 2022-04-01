import { render, screen, act } from '@testing-library/svelte';
import userEvent from '@testing-library/user-event';

import { writable } from 'svelte/store';
import DownloadLinkWithProgress from '../download-link-with-progress.svelte';
import { startEpisodeDownload } from '../../lib/download';

jest.mock('../../lib/download', () => ({
  startEpisodeDownload: jest
    .fn()
    .mockName('startEpisodeDownload() from $lib/features/download-episode/lib'),
}));
jest.mock('../../lib/check-download-status', () => ({
  checkDownloadStatus: jest
    .fn()
    .mockName('checkDownloadStatus() from $lib/features/download-episode/lib')
    .mockResolvedValue(false),
}));

it('renders the appropriate component depending on progress', async () => {
  const progress = writable(0);
  const user = userEvent.setup();
  jest.mocked(startEpisodeDownload).mockReturnValue(progress);

  render(DownloadLinkWithProgress, {
    props: {
      urls: [''],
    },
  });

  // For some reason, it needs to be called 4 times to wait for the onMount to complete to work.
  await act();
  await act();
  await act();
  await act();
  screen.getByText('Download');
  await user.click(screen.getByRole('button'));
  screen.getByText('Downloading, 0%');
  await act(() => progress.set(99));
  screen.getByText('Downloading, 99%');
  await act(() => progress.set(100));
  screen.getByText('Available offline');
});
