/**
 * Formats a time duration in to be human-readable.
 *
 * Example:
 * ```ts
 * formatDuration(5);  // '00:00:05'
 * formatDuration(65);  // '00:01:05'
 * ```
 */
export function formatDuration(durationInSeconds: number) {
  if (durationInSeconds < 0) {
    throw Error('Negative durations are not supported');
  }
  if (durationInSeconds >= 24 * 60 * 60) {
    throw Error('Durations longer or equal to 24 hours are not supported');
  }
  return new Date(durationInSeconds * 1000).toISOString().substring(11, 19);
}
