/**
 * Checks if a value is a non-null object.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `a` is an object and not `null`, `false` otherwise.
 */
// eslint-disable-next-line @typescript-eslint/no-restricted-types
export const isNonNullObject = (u: unknown): u is object =>
  typeof u === 'object' && u !== null;
