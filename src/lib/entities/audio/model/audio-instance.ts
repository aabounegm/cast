import { writable, derived } from 'svelte/store';

export const audio = writable<HTMLAudioElement | undefined>(undefined);

/** Tracks the duration of the audio stream that is currently loaded in the `audio` store. */
export const audioDuration = derived<typeof audio, number>(
  audio,
  ($audio, set) => {
    if ($audio === undefined) {
      set(NaN);
      return;
    }

    function watchDuration(event: Event) {
      set((event.target as HTMLAudioElement).duration);
    }

    $audio.addEventListener('durationchange', watchDuration);

    return () => $audio.removeEventListener('durationchange', watchDuration);
  },
  NaN
);

/** Tracks the playback position in the audio stream that is currently loaded in the `audio` store. */
export const audioPosition = derived<typeof audio, number>(
  audio,
  ($audio, set) => {
    if ($audio === undefined) {
      set(0);
      return;
    }

    function watchProgress(event: Event) {
      set((event.target as HTMLAudioElement).currentTime);
    }

    $audio.addEventListener('timeupdate', watchProgress);

    return () => $audio.removeEventListener('timeupdate', watchProgress);
  },
  0
);

export const play = (src?: string) => {
  audio.update(($audio) => {
    if ($audio === undefined) {
      return;
    }

    if (src) {
      $audio.src = src;
    }

    $audio.play();
    return $audio;
  });
};

export const pause = () => {
  audio.update(($audio) => {
    if ($audio === undefined) {
      return;
    }

    $audio.pause();
    return $audio;
  });
};

export const seek = (timeInSeconds: number) => {
  audio.update(($audio) => {
    if ($audio === undefined) {
      return;
    }

    $audio.currentTime = timeInSeconds;
    $audio.play();
    return $audio;
  });
};

export const move = (deltaInSeconds: number) => {
  audio.update(($audio) => {
    if ($audio === undefined) {
      return;
    }

    $audio.currentTime += deltaInSeconds;
    $audio.play();
    return $audio;
  });
};
