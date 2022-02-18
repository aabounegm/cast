import { Howl } from 'howler';

let howl = new Howl({ src: [''], html5: true });
let src = '';

export function getAudioSrc() {
  console.log('src', src);
  return src;
}

export function percent() {
  return (100 * howl.seek()) / howl.duration();
}

export function play(_src?: string) {
  if (_src) {
    src = _src;
    howl.unload();
    howl = new Howl({ src: [src], html5: true });
  }
  howl.play();
}
export function pause() {
  howl.pause();
}
export function seek(percent: number) {
  const pos = 0.01 * percent * howl.duration();
  howl.seek(pos);
}
export function move(delta: number) {
  howl.seek(howl.seek() + delta);
}
