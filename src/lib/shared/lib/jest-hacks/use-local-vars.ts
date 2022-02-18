/**
 * This function is just a workaround to prevent ESLint and TypeScript
 * from complaining about undefined variables. It doesn't do anything
 * special.
 *
 * It is meant to be used with `svelte-inline-compile` to add references
 * to variables that will be used inside the template string.
 */
export function useLocalVars<FirstArgumentType>(first: FirstArgumentType, _rest: unknown[]) {
  return first;
}
