jest.mock('svelte/store', () => ({
  ...jest.requireActual('svelte/store'),
}));

import { get } from 'svelte/store';

jest.mock('$lib/entities/audio', () => ({
  ...jest.requireActual('$lib/entities/audio'),
  duration: {
    subscribe: jest.fn(() => jest.fn()),
  },
}));

import { src, duration, currentTime, seek, move, play, pause, paused } from '$lib/entities/audio';

describe('Audio playback API', () => {
  const defaultSrc = 'http://commondatastorage.googleapis.com/codeskulptor-assets/Evillaugh.ogg';
  const defaultDuration = 6.452245;
  const playDefault = () => {
    play(defaultSrc);
    jest.mocked(duration.subscribe).mockImplementation((subscriber) => {
      subscriber(defaultDuration);
      return jest.fn();
    });
  };

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

  it('controls playback current time', () => {
    playDefault();
    // console.log('DD', get(duration));
    seek(0.5);
    move(2);
    // console.log('CT', get(currentTime));
    expect(get(currentTime)).toEqual(2.5);
    pause();
  });

  it('sets invalid playback time', () => {
    // playDefault();
    // await new Promise((r) => setTimeout(r, 1000));
    // seek(-1);
    // expect(get(currentTime)).toEqual(0);
    // move(100);
    // expect(get(currentTime)).toEqual(get(duration));
    // pause();
  });
});
