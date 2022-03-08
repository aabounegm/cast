import { get } from 'svelte/store';
import { play, pause, paused } from '$lib/entities/audio';

export function toggleGlobalPlayback(src?: string) {
  if (get(paused)) {
    play(src);
  } else {
    pause();
  }
}
