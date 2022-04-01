import { get } from 'svelte/store';
import { startEpisodeDownload } from '../download';

const sleep = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const mockFetchAndWatchProgress = jest
  .fn()
  .mockName('fetchAndWatchProgress() from $lib/features/download-episode/lib')
  .mockImplementation(async (url, store) => {
    store.set(0);
    await sleep(1000);
    store.set(100);
  });

jest.mock('../download', () => ({
  ...jest.requireActual('../download'),
  fetchAndWatchProgress: () => mockFetchAndWatchProgress,
}));

it.skip('starts downloading episodes and watches progress', async () => {
  const exampleUrl = 'https://example.com';
  const store = startEpisodeDownload(exampleUrl);
  expect(mockFetchAndWatchProgress).toHaveBeenCalledWith(`${exampleUrl}?download=true`, store);
  expect(get(store)).toBe(0);
  await sleep(1200);
  expect(get(store)).toBe(1000);
});
