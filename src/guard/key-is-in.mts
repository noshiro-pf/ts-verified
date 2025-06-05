/**
 * Checks if a key exists as an own property in an object.
 * Internally, it behaves the same as `Object.hasOwn`, but it's a type guard function for the key, not the object.
 * This narrows the type of `key` to be a key of `obj`.
 * @template K The type of the key.
 * @template R The type of the record (object).
 * @param key The key to check for.
 * @param obj The object to check within.
 * @returns `true` if `key` is an own property of `obj`, `false` otherwise.
 * @example
 * ```typescript
 * const obj = { a: 1, b: 2, c: 3 };
 * const key: string = 'b';
 *
 * if (keyIsIn(key, obj)) {
 *   // key is now typed as 'a' | 'b' | 'c'
 *   const value = obj[key]; // type-safe access
 *   console.log(value); // 2
 * }
 *
 * // Works with unknown keys
 * const unknownKey = 'd';
 * if (keyIsIn(unknownKey, obj)) {
 *   // This block won't execute
 * } else {
 *   console.log('Key not found');
 * }
 * ```
 */
export const keyIsIn = <
  const K extends PropertyKey,
  const R extends UnknownRecord,
>(
  key: K,
  obj: R,
): key is K & keyof typeof obj => Object.hasOwn(obj, key);
