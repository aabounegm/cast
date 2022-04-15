import { get, writable, type Unsubscriber } from 'svelte/store';

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
    pause();
    duration.set(0);
    let s: Unsubscriber | undefined = undefined;
    s = duration.subscribe((v) => {
      if (v) {
        paused.set(false);
        s?.();
      }
    });
    src.set(_src);
  } else paused.set(false);
};

export const pause = () => paused.set(true);

export const seek = (timeInSeconds: number) => currentTime.set(clampTime(timeInSeconds));

export const move = (deltaInSeconds: number) =>
  currentTime.update(($currentTime) => clampTime($currentTime + deltaInSeconds));

function clampTime(time: number) {
  const d = get(duration);
  return Math.max(0, Math.min(time, isNaN(d) ? 0 : d));
}
