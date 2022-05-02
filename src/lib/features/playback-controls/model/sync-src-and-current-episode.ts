import { get } from 'svelte/store';
import { src, duration } from '$lib/entities/audio';
import { currentlyPlayingEpisode } from '$lib/entities/episode';

/**
 * Sync the URL of the currently playing episode and the `src` attribute
 * of the `<audio>` element on the page.
 *
 * If the `src` actually changed, it resets the duration to NaN
 * to enable the hack of waiting for the browser to update
 * the duration back to a normal value when it's ready to play.
 *
 * @see entities/audio/model/audio-instance.ts
 */
currentlyPlayingEpisode.subscribe(($currentlyPlayingEpisode) => {
  if ($currentlyPlayingEpisode !== null) {
    if (get(src) !== $currentlyPlayingEpisode.audioUrl) {
      duration.set(NaN);
    }

    src.set($currentlyPlayingEpisode.audioUrl);
  }
});
