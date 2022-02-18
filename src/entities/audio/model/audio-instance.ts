import { writable } from 'svelte/store';

const _audio = new Audio();

export const audio = writable<HTMLAudioElement>(_audio);

export function play(src?: string) {
  if (src) _audio.src = src;
  // need this because `audio.paused` wasn't reactive otherwise
  _audio.currentTime = _audio.currentTime + 0;
  _audio.play();
  audio.set(_audio);
}
export function pause() {
  // need this because `audio.paused` wasn't reactive otherwise
  _audio.currentTime = _audio.currentTime + 0;
  _audio.pause();
  audio.set(_audio);
}
export function seek(percent: number) {
  _audio.currentTime = 0.01 * percent * _audio.duration;
  audio.set(_audio);
}
export function move(delta: number) {
  _audio.currentTime += delta;
  play();
}
