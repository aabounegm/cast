import { get } from 'svelte/store';
import { play, pause, audio } from '$lib/entities/audio';

export function toggleGlobalPlayback() {
  const $audio = get(audio);
  if ($audio === undefined) {
    return;
  }

  if ($audio.paused) {
    play();
  } else {
    pause();
  }
}
