import { get } from 'svelte/store';
import { src, currentTime, paused, move, pause, play, seek } from '..';

describe('Audio playback API', () => {
  const defaultSrc = 'http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg';
  const playDefault = () => play(defaultSrc);

  it('loads audio', () => {
    playDefault();
    expect(get(src)).toEqual(defaultSrc);
    expect(get(paused)).toBeFalsy();
    pause();
  });

  it('pause playback', () => {
    playDefault();
    pause();
    play();
    expect(get(paused)).toBeFalsy();
    pause();
    expect(get(paused)).toBeTruthy();
  });

  it('control playback current time', () => {
    playDefault();
    seek(0.5);
    move(2);
    expect(get(currentTime)).toEqual(2.5);
    pause();
  });
});
