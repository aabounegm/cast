export {
  src,
  currentTime,
  duration,
  playbackRate,
  paused,
  buffered,
  move,
  pause,
  play,
  seek,
} from './model/audio-instance';
export type { SvelteTimeRanges } from './model/audio-instance';
export { listeningHistory, addToListeningHistory } from './model/listening-history';
