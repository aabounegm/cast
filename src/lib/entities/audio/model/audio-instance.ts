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

/** Tracks the buffered (loaded) ranges in the audio stream that is currently loaded in the `audio` store. */
export const audioBufferedRanges = derived<typeof audio, TimeRanges | undefined>(
  audio,
  ($audio, set) => {
    if ($audio === undefined) {
      set(undefined);
      return;
    }

    function watchBufferedData(event: Event) {
      set((event.target as HTMLAudioElement).buffered);
    }

    // It's supposed to be attached to the 'progress' event
    //   but these fire way too unreliably, so this is our best bet
    $audio.addEventListener('timeupdate', watchBufferedData);

    return () => $audio.removeEventListener('timeupdate', watchBufferedData);
  },
  undefined
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
