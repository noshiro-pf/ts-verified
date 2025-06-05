/**
 * Checks if a value is a non-null object.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is an object and not `null`, `false` otherwise.
 * @example
 * ```typescript
 * isNonNullObject({}); // true
 * isNonNullObject([]); // true (arrays are objects)
 * isNonNullObject(new Date()); // true
 * isNonNullObject(/regex/); // true
 * isNonNullObject(null); // false
 * isNonNullObject(undefined); // false
 * isNonNullObject("string"); // false
 * isNonNullObject(42); // false
 * isNonNullObject(() => {}); // false (functions are not objects in this context)
 * ```
 */
// eslint-disable-next-line @typescript-eslint/no-restricted-types
export const isNonNullObject = (u: unknown): u is object =>
  typeof u === 'object' && u !== null;
