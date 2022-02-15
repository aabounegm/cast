export const audio = new Audio();

export function play() {
  // need this because `audio.paused` wasn't reactive otherwise
  audio.currentTime = audio.currentTime + 0;
  audio.play();
}
export function pause() {
  // need this because `audio.paused` wasn't reactive otherwise
  audio.currentTime = audio.currentTime + 0;
  audio.pause();
}
export function seek(percent: number) {
  audio.currentTime = 0.01 * percent * audio.duration;
}
export function move(delta: number) {
  audio.currentTime += delta;
  play();
}
