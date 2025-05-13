import { isNonNullObject } from './is-non-null-object.mjs';

/**
 * Checks if a value is a non-null object that is not an array.
 * This is often used to check if a value is a plain JavaScript object (record).
 * Acts as a type guard, narrowing the type of `u` to `UnknownRecord`.
 * @param u The value to check.
 * @returns `true` if `u` is a non-null object and not an array, `false` otherwise.
 * @example
 * ```typescript
 * const value: unknown = { name: 'John', age: 30 };
 * if (isRecord(value)) {
 *   // value is now typed as UnknownRecord
 *   console.log(Object.keys(value)); // ['name', 'age']
 * }
 *
 * isRecord(null); // false
 * isRecord([]); // false
 * isRecord({}); // true
 * ```
 */
export const isRecord = (u: unknown): u is UnknownRecord =>
  isNonNullObject(u) && !Array.isArray(u);
