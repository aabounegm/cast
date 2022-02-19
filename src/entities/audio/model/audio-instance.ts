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

export function play(src?: string) {
  updateAudio((audio) => {
    if (src) audio.src = src;
    audio.play();
  });
}

export function pause() {
  updateAudio((audio) => audio.pause());
}
export function seek(percent: number) {
  updateAudio((audio) => {
    audio.currentTime = 0.01 * percent * audio.duration;
  });
}
export function move(delta: number) {
  updateAudio((audio) => {
    audio.currentTime += delta;
  });
}
