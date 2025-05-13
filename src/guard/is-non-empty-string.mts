/**
 * Checks if a value is a non-empty string.
 * Acts as a type guard, narrowing the type of `s` to a non-empty string.
 * @template S The type of the input string, which can be `string`, `null`, or `undefined`.
 * @param s The value to check.
 * @returns `true` if `s` is a string and not empty, `false` otherwise.
 */
export const isNonEmptyString = <S extends string | null | undefined>(
  s: S,
): s is RelaxedExclude<NonNullable<S>, ''> =>
  typeof s === 'string' && s.length > 0;
