/**
 * Checks if a value is a non-empty string.
 * Acts as a type guard, narrowing the type of `s` to a non-empty string.
 * @template S The type of the input string, which can be `string`, `null`, or `undefined`.
 * @param s The value to check.
 * @returns `true` if `s` is a string and not empty, `false` otherwise.
 * @example
 * ```typescript
 * isNonEmptyString("hello"); // true
 * isNonEmptyString(" "); // true (whitespace is considered non-empty)
 * isNonEmptyString(""); // false
 * isNonEmptyString(null); // false
 * isNonEmptyString(undefined); // false
 *
 * // Type guard usage
 * const value: string | null = getValue();
 * if (isNonEmptyString(value)) {
 *   // value is now typed as non-empty string
 *   console.log(value.charAt(0)); // safe to access
 * }
 * ```
 */
export const isNonEmptyString = <S extends string | null | undefined>(
  s: S,
): s is RelaxedExclude<NonNullable<S>, ''> =>
  typeof s === 'string' && s.length > 0;
