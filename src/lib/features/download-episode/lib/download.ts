import { writable, type Writable } from 'svelte/store';

/** Starts fetching the episode and returns a store to watch its download progress. */
export function startEpisodeDownload(url: string): Writable<number> {
  const downloadUrl = new URL(url);
  downloadUrl.searchParams.append('download', 'true');
  const progress = writable(0);
  fetchAndWatchProgress(downloadUrl.toString(), progress);
  return progress;
}

async function fetchAndWatchProgress(url: string, store: Writable<number>) {
  const response = await fetch(url);
  const reader = response.body?.getReader();
  if (!reader) {
    store.set(NaN);
    return;
  }
  const contentLength = parseInt(response.headers.get('Content-Length') ?? '');
  let receivedLength = 0;
  let done = false;
  let value: Uint8Array | undefined;
  while (!done) {
    ({ done, value } = await reader.read());
    receivedLength += value?.length ?? 0;
    if (contentLength) store.set(Math.floor((receivedLength / contentLength) * 100));
  }
  store.set(100);
}
