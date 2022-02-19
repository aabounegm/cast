import { writable, get } from 'svelte/store';

export const audio = writable<HTMLAudioElement>();

function updateAudio(action: (a: HTMLAudioElement) => void) {
  const a = get(audio);
  action(a);
  initAudio(a);
}

export function initAudio(_audio: HTMLAudioElement) {
  audio.set(_audio);
}

export const play = (src?: string) =>
  updateAudio((audio) => {
    if (src) audio.src = src;
    audio.play();
  });

export const pause = () => updateAudio((audio) => audio.pause());

export const seek = (percent: number) =>
  updateAudio((audio) => {
    audio.currentTime = 0.01 * percent * audio.duration;
  });

export const move = (delta: number) =>
  updateAudio((audio) => {
    audio.currentTime += delta;
  });
