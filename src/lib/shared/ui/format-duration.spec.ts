import { formatDuration } from '.';

it('formats the duration as HH:MM:SS', () => {
  expect(formatDuration(0)).toBe('00:00:00');
  expect(formatDuration(5)).toBe('00:00:05');
  expect(formatDuration(65)).toBe('00:01:05');
  expect(formatDuration(3665)).toBe('01:01:05');
});

it('reports an error on negative durations', () => {
  expect(() => formatDuration(-1)).toThrowError(/Negative/);
});

it('reports an error on durations that are 24 hours long or longer', () => {
  expect(() => formatDuration(24 * 60 * 60)).toThrowError(/24 hours/);
});
