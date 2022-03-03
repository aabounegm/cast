import { writable } from 'svelte/store';

export const src = writable('');
export const currentTime = writable(0);
export const duration = writable(NaN);
export const playbackRate = writable(1);
export const paused = writable(false);

export const play = (_src?: string) => {
  if (_src) src.set(_src);
  paused.set(false);
};

export const pause = () => paused.set(true);

export const seek = (timeInSeconds: number) => currentTime.set(timeInSeconds);

export const move = (deltaInSeconds: number) =>
  currentTime.update(($currentTime) => $currentTime + deltaInSeconds);
