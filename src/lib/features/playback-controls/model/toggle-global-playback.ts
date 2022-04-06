import { get } from 'svelte/store';
import { play, pause, paused } from '$lib/entities/audio';
import { currentlyPlayingEpisode } from '$lib/entities/episode';

export function toggleGlobalPlayback(src?: string) {
  if (get(paused) || (src !== get(currentlyPlayingEpisode)?.audioUrl && src !== undefined)) {
    play(src);
  } else {
    pause();
  }
}
