import { get } from 'svelte/store';
import { play, pause, paused } from '$lib/entities/audio';

export function toggleGlobalPlayback() {
  if (get(paused)) {
    play();
  } else {
    pause();
  }
}
