/**
 * Returns the appropriate pluralization suffix.
 *
 * Example:
 * ```ts
 * `1 apple${s(1)}`  // 1 apple
 * `2 apple${s(2)}`  // 2 apples
 * ```
 */
export function s(amount: number) {
  return amount !== 1 ? 's' : '';
}
