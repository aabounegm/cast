export function notNull<ArgumentType>(argument: ArgumentType | null): argument is ArgumentType {
  return argument !== null;
}
