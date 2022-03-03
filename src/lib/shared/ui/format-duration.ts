/**
 * Formats a time duration in to be human-readable.
 *
 * Example:
 * ```ts
 * formatDuration(5);  // '0:05'
 * formatDuration(3665);  // '1:01:05'
 * formatDuration(36065);  // '10:01:05'
 * ```
 */
export function formatDuration(durationInSeconds: number) {
  if (durationInSeconds < 0) {
    throw Error('Negative durations are not supported');
  }

  const leftoverSeconds = durationInSeconds % 60;
  const durationInWholeMinutes = Math.floor(durationInSeconds / 60);
  const leftoverMinutes = durationInWholeMinutes % 60;
  const durationInWholeHours = Math.floor(durationInWholeMinutes / 60);

  const formattedSeconds = leftoverSeconds.toString().padStart(2, '0');
  const formattedMinutes =
    durationInWholeHours !== 0
      ? leftoverMinutes.toString().padStart(2, '0')
      : leftoverMinutes.toString();
  const formattedHours = durationInWholeHours !== 0 ? durationInWholeHours.toString() : '';

  return [formattedHours, formattedMinutes, formattedSeconds]
    .filter((part) => part !== '')
    .join(':');
}
