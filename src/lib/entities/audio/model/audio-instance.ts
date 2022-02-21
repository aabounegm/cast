import { writable } from 'svelte/store';

export const audio = writable<HTMLAudioElement>();

export const play = (src?: string) => {
  audio.update(($audio) => {
    if (src) {
      $audio.src = src;
    }

    $audio.play();
    return $audio;
  });
};

export const pause = () => {
  audio.update(($audio) => {
    $audio.pause();
    return $audio;
  });
};

export const seek = (percent: number) => {
  audio.update(($audio) => {
    $audio.currentTime = 0.01 * percent * $audio.duration;
    $audio.play();
    return $audio;
  });
};

export const move = (delta: number) => {
  audio.update(($audio) => {
    $audio.currentTime += delta;
    $audio.play();
    return $audio;
  });
};
