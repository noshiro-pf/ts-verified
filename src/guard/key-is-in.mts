/**
 * Checks if a key exists as an own property in an object.
 * Internally, it behaves the same as `Object.hasOwn`, but it's a type guard function for the key, not the object.
 * This narrows the type of `key` to be a key of `obj`.
 * @template K The type of the key.
 * @template R The type of the record (object).
 * @param key The key to check for.
 * @param obj The object to check within.
 * @returns `true` if `key` is an own property of `obj`, `false` otherwise.
 */
export const keyIsIn = <
  const K extends PropertyKey,
  const R extends UnknownRecord,
>(
  key: K,
  obj: R,
): key is K & keyof typeof obj => Object.hasOwn(obj, key);
