import type { SvelteTimeRanges } from '$lib/entities/audio';
import { renderTimeRanges } from '../render-time-ranges';

const sampleDuration = 100; // in seconds
const sampleColor = '#000000';

it('returns a transparent layer when no time ranges are present', () => {
  expect(renderTimeRanges([], sampleDuration, sampleColor)).toBe(
    'linear-gradient(transparent, transparent)'
  );
});

it('correctly calculates the relative position of the time ranges', () => {
  const sampleRanges: SvelteTimeRanges = [
    { start: 0, end: 10 },
    { start: 45.5, end: 55 },
    { start: 97, end: 100 },
  ];
  const backgroundColor = `linear-gradient(${sampleColor}, ${sampleColor})`;

  expect(renderTimeRanges(sampleRanges, sampleDuration, sampleColor)).toBe(
    [
      `${backgroundColor} 0% / 10% 100% no-repeat`,
      `${backgroundColor} 45.5% / ${55 - 45.5}% 100% no-repeat`,
      `${backgroundColor} 97% / 3% 100% no-repeat`,
    ].join(',')
  );
});
