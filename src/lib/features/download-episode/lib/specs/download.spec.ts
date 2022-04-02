import fetch from 'jest-mock-fetch';
import { get } from 'svelte/store';
import { waitFor } from '@testing-library/svelte';
import { ReadableStream } from 'web-streams-polyfill/ponyfill';
import { startEpisodeDownload } from '../download';

afterEach(fetch.reset);
const exampleUrl = 'https://example.com/';

it('constructs the correct URL (appends ?download=true)', () => {
  startEpisodeDownload(exampleUrl);
  expect(fetch).toHaveBeenCalledWith(`${exampleUrl}?download=true`);
});

it('watches the download progress', async () => {
  const sampleResponseBytes = [1, 2, 3];
  const store = startEpisodeDownload(exampleUrl);
  let streamController!: ReadableStreamDefaultController<Uint8Array>;

  fetch.mockResponse({
    body: new ReadableStream<Uint8Array>({
      start(controller) {
        streamController = controller;
      },
    }),
    headers: new Headers({
      'Content-Length': sampleResponseBytes.length.toString(),
    }),
  });

  expect(get(store)).toBe(0);
  streamController.enqueue(new Uint8Array(sampleResponseBytes));
  streamController.close();
  await waitFor(() => expect(get(store)).toBe(100));
});
