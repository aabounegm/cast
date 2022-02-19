import { writable, get } from 'svelte/store';

export const audio = writable<HTMLAudioElement>();

function updateAudio(action: (a: HTMLAudioElement) => void) {
  const el = get(audio);
  action(el);
  setAudio(el);
}

export function setAudio(_audio: HTMLAudioElement) {
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
    audio.play();
  });

export const move = (delta: number) =>
  updateAudio((audio) => {
    audio.currentTime += delta;
    audio.play();
  });
