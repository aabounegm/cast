import { writable } from 'svelte/store';

export const audio = writable<HTMLAudioElement | undefined>(undefined);

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
