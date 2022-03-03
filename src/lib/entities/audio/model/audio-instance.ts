import { writable } from 'svelte/store';

let audio: HTMLAudioElement | undefined;
export const currentTime = writable(0);
export const duration = writable(NaN);
export const playbackRate = writable(1);
export const paused = writable(false);

export const setAudio = (value: HTMLAudioElement) => {
  audio = value;
};

export const play = (src?: string) => {
  if (audio && src) audio.src = src;
  paused.set(false);
};

export const pause = () => paused.set(true);

export const seek = (timeInSeconds: number) => currentTime.set(timeInSeconds);

export const move = (deltaInSeconds: number) => {
  if (audio) currentTime.set(audio.currentTime + deltaInSeconds);
};
