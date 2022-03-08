import { get } from 'svelte/store';
import { src, currentTime, paused, move, pause, play, seek } from '..';
import { duration } from '../model/audio-instance';

describe('Audio playback API', () => {
  const defaultSrc = 'http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg';
  const playDefault = () => play(defaultSrc);

  it('loads audio', () => {
    playDefault();
    expect(get(src)).toEqual(defaultSrc);
    expect(get(paused)).toBeFalsy();
    pause();
  });

  it('pauses playback', () => {
    playDefault();
    pause();
    play();
    expect(get(paused)).toBeFalsy();
    pause();
    expect(get(paused)).toBeTruthy();
  });

  it('controls playback current time', async () => {
    playDefault();
    await new Promise((r) => setTimeout(r, 1000));
    seek(0.5);
    move(2);
    expect(get(currentTime)).toEqual(2.5);
    pause();
  });

  it('sets invalid playback time', async () => {
    playDefault();
    await new Promise((r) => setTimeout(r, 1000));
    seek(-1);
    expect(get(currentTime)).toEqual(0);
    move(100);
    expect(get(currentTime)).toEqual(get(duration));
    pause();
  });
});
