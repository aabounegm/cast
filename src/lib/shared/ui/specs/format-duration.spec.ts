import { formatDuration } from '..';

it('formats the duration as H:MM:SS', () => {
  expect(formatDuration(1 * 60 * 60 + 1 * 60 + 5)).toBe('1:01:05');
  expect(formatDuration(10 * 60 * 60 + 1 * 60 + 5)).toBe('10:01:05');
});

it('omits the hours if not needed', () => {
  expect(formatDuration(10 * 60 + 5)).toBe('10:05');
});

it('omits the leading digit of minutes if not needed', () => {
  expect(formatDuration(0)).toBe('0:00');
  expect(formatDuration(5)).toBe('0:05');
  expect(formatDuration(65)).toBe('1:05');
});

it('supports large durations', () => {
  expect(formatDuration(100 * 60 * 60)).toBe('100:00:00');
});

it('reports an error on negative durations', () => {
  expect(() => formatDuration(-1)).toThrowError(/Negative/i);
});

it('rounds time to the previous second', () => {
  expect(formatDuration(0.5)).toBe('0:00');
});
