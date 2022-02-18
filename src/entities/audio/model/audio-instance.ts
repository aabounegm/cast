let _audio: HTMLAudioElement | undefined;

export function getAudio() {
  _audio ??= new Audio();
  return _audio;
}

export function play(src?: string) {
  const audio = getAudio();
  if (src) audio.src = src;
  // need this because `audio.paused` wasn't reactive otherwise
  audio.currentTime = audio.currentTime + 0;
  audio.play();
}
export function pause() {
  // need this because `audio.paused` wasn't reactive otherwise
  const audio = getAudio();
  audio.currentTime = audio.currentTime + 0;
  audio.pause();
}
export function seek(percent: number) {
  const audio = getAudio();
  audio.currentTime = 0.01 * percent * audio.duration;
}
export function move(delta: number) {
  const audio = getAudio();
  audio.currentTime += delta;
  play();
}
