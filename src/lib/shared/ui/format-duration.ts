/**
 * Formats a time duration in to be human-readable.
 *
 * Example:
 * ```ts
 * formatDuration(5);  // '00:05'
 * formatDuration(3665);  // '1:01:05'
 * formatDuration(36065);  // '10:01:05'
 * ```
 */
export function formatDuration(durationInSeconds: number) {
  if (durationInSeconds < 0) {
    throw Error('Negative durations are not supported');
  }
  if (durationInSeconds >= 24 * 60 * 60) {
    throw Error('Durations longer or equal to 24 hours are not supported');
  }

  let sliceStart = 11;
  if (durationInSeconds < 10 * 60 * 60) {
    sliceStart++;

    if (durationInSeconds < 1 * 60 * 60) {
      sliceStart += 2;
    }
  }

  return new Date(durationInSeconds * 1000).toISOString().substring(sliceStart, 19);
}
