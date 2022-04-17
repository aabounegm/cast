import { get, writable } from 'svelte/store';

// Because apparently Svelte thinks it knows better how the Web APIs should be.
export type SvelteTimeRanges = Array<{ start: number; end: number }>;

export const src = writable('');
export const currentTime = writable(0);
export const duration = writable(NaN);
export const playbackRate = writable(1);
export const paused = writable(true);
export const buffered = writable<SvelteTimeRanges>([]);

export const play = (_src?: string) => {
  if (_src) {
    // Setting duration to 0 and subscribing to it helps with catching
    // the moment when the the URL takes effect
    // thus "populatnig" the writables with data.
    // And upon that moment, when the data is loaded
    // and the player is ready, it calls play.
    pause();
    duration.set(0);
    const unsub = duration.subscribe((v) => {
      if (v) {
        paused.set(false);
        unsub();
      }
    });
    src.set(_src);
  } else {
    paused.set(false);
  }
};

export const pause = () => paused.set(true);

export const seek = (timeInSeconds: number) => currentTime.set(clampTime(timeInSeconds));

export const move = (deltaInSeconds: number) =>
  currentTime.update(($currentTime) => clampTime($currentTime + deltaInSeconds));

function clampTime(time: number) {
  const d = get(duration);
  return Math.max(0, Math.min(time, isNaN(d) ? 0 : d));
}
