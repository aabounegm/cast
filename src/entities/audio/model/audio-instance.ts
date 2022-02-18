import { writable, get } from 'svelte/store';

export const audio = writable<HTMLAudioElement>();

export function initAudio(_audio: HTMLAudioElement) {
  audio.set(_audio);
}

export function play(src?: string) {
  const _audio = get(audio);
  if (src) _audio.src = src;
  _audio.play();
  audio.set(_audio);
}
export function pause() {
  const _audio = get(audio);
  _audio.pause();
  audio.set(_audio);
}
export function seek(percent: number) {
  const _audio = get(audio);
  _audio.currentTime = 0.01 * percent * _audio.duration;
  audio.set(_audio);
}
export function move(delta: number) {
  const _audio = get(audio);
  _audio.currentTime += delta;
  play();
}
