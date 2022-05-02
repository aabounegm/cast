import { snackbar } from '$lib/shared/ui/snackbar';
import { get, writable } from 'svelte/store';

// Because apparently Svelte thinks it knows better how the Web APIs should be.
export type SvelteTimeRanges = Array<{ start: number; end: number }>;

export const src = writable('');
export const currentTime = writable(0);
export const duration = writable(NaN);
export const playbackRate = writable(1);
export const paused = writable(true);
export const buffered = writable<SvelteTimeRanges>([]);

export const play = () => paused.set(false);

export const pause = () => paused.set(true);

/**
 * Play after the new data has loaded.
 *
 * This is a workaround that relies on the fact that the duration
 * is manually reset to NaN every time the `src` changes.
 * If it is not reset, we assume that there is nothing new to load.
 *
 * The workaround is to wait until the `duration` store is populated
 * with the actual duration of the new audio and then start playing.
 */
export const playAfterLoading = () => {
  if (!isNaN(get(duration))) {
    play();
  } else {
    const unsubscribe = duration.subscribe(($duration) => {
      if (!isNaN($duration)) {
        unsubscribe();
        play();
      }
    });
  }
};

export const seek = (timeInSeconds: number) => currentTime.set(clampTime(timeInSeconds));

export const move = (deltaInSeconds: number) =>
  currentTime.update(($currentTime) => clampTime($currentTime + deltaInSeconds));

function clampTime(time: number) {
  const d = get(duration);
  return Math.max(0, Math.min(time, isNaN(d) ? 0 : d));
}

export function reportError(el: HTMLElement) {
  // this is necessary as the audio element's error callback accepts 'EventTarget & HTMLElement'
  const audioEl = el as HTMLAudioElement;

  const err = audioEl.error;

  if (err == null) return;

  if (get(src) === '') return;

  // shameful workaround
  if (!window.navigator.onLine) {
    snackbar({ text: 'You are offline. Please connect to the internet and try again.' });
    return;
  }

  const errMsgs = {
    [err.MEDIA_ERR_ABORTED]: 'Episode playback aborted.',
    [err.MEDIA_ERR_DECODE]: 'An error occured while playing the episode. Try to refresh the page.',
    [err.MEDIA_ERR_NETWORK]:
      'A network error has occured. Please check your internet connection and try again.',
    [err.MEDIA_ERR_SRC_NOT_SUPPORTED]: 'Your browser does not support the audio format.',
  };

  snackbar({ text: errMsgs[err.code] });
}
