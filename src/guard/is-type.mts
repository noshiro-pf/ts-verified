/**
 * Checks if a value is `undefined`.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is `undefined`, `false` otherwise.
 */
export const isUndefined = (u: unknown): u is undefined => u === undefined;

/**
 * Checks if a value is not `undefined`.
 * Acts as a type guard, excluding `undefined` from the type of `u`.
 * @template T The type of the input value.
 * @param u The value to check.
 * @returns `true` if `u` is not `undefined`, `false` otherwise.
 */
export const isNotUndefined = <T,>(u: T): u is RelaxedExclude<T, undefined> =>
  u !== undefined;

/**
 * Checks if a value is a boolean.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is a boolean, `false` otherwise.
 */
export const isBoolean = (u: unknown): u is boolean => typeof u === 'boolean';

/**
 * Checks if a value is not a boolean.
 * Acts as a type guard, excluding `boolean` from the type of `u`.
 * @template T The type of the input value.
 * @param u The value to check.
 * @returns `true` if `u` is not a boolean, `false` otherwise.
 */
export const isNotBoolean = <T,>(u: T): u is RelaxedExclude<T, boolean> =>
  typeof u !== 'boolean';

/**
 * Checks if a value is a number.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is a number, `false` otherwise.
 */
export const isNumber = (u: unknown): u is number => typeof u === 'number';

/**
 * Checks if a value is not a number.
 * Acts as a type guard, excluding `number` from the type of `u`.
 * @template T The type of the input value.
 * @param u The value to check.
 * @returns `true` if `u` is not a number, `false` otherwise.
 */
export const isNotNumber = <T,>(u: T): u is RelaxedExclude<T, number> =>
  typeof u !== 'number';

/**
 * Checks if a value is a bigint.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is a bigint, `false` otherwise.
 */
export const isBigint = (u: unknown): u is bigint => typeof u === 'bigint';

/**
 * Checks if a value is not a bigint.
 * Acts as a type guard, excluding `bigint` from the type of `u`.
 * @template T The type of the input value.
 * @param u The value to check.
 * @returns `true` if `u` is not a bigint, `false` otherwise.
 */
export const isNotBigint = <T,>(u: T): u is RelaxedExclude<T, bigint> =>
  typeof u !== 'bigint';

/**
 * Checks if a value is a string.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is a string, `false` otherwise.
 */
export const isString = (u: unknown): u is string => typeof u === 'string';

/**
 * Checks if a value is not a string.
 * Acts as a type guard, excluding `string` from the type of `u`.
 * @template T The type of the input value.
 * @param u The value to check.
 * @returns `true` if `u` is not a string, `false` otherwise.
 */
export const isNotString = <T,>(u: T): u is RelaxedExclude<T, string> =>
  typeof u !== 'string';

/**
 * Checks if a value is a symbol.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is a symbol, `false` otherwise.
 */
export const isSymbol = (u: unknown): u is symbol => typeof u === 'symbol';

/**
 * Checks if a value is not a symbol.
 * Acts as a type guard, excluding `symbol` from the type of `u`.
 * @template T The type of the input value.
 * @param u The value to check.
 * @returns `true` if `u` is not a symbol, `false` otherwise.
 */
export const isNotSymbol = <T,>(u: T): u is RelaxedExclude<T, symbol> =>
  typeof u !== 'symbol';

/**
 * Checks if a value is `null`.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is `null`, `false` otherwise.
 */
export const isNull = (u: unknown): u is null => u === null;

/**
 * Checks if a value is not `null`.
 * Acts as a type guard, excluding `null` from the type of `u`.
 * @template T The type of the input value (which could be `null`).
 * @param u The value to check.
 * @returns `true` if `u` is not `null`, `false` otherwise.
 */
export const isNotNull = <T,>(u: T | null): u is T => u !== null;

/**
 * Checks if a value is `null` or `undefined`.
 * Acts as a type guard.
 * @param u The value to check.
 * @returns `true` if `u` is `null` or `undefined`, `false` otherwise.
 */
export const isNullish = (u: unknown): u is null | undefined => u == null;

/**
 * Checks if a value is not `null` or `undefined`.
 * Acts as a type guard, narrowing `u` to its non-nullable type.
 * @template T The type of the input value.
 * @param u The value to check.
 * @returns `true` if `u` is not `null` and not `undefined`, `false` otherwise.
 */
export const isNonNullish = <T,>(u: T): u is NonNullable<T> => u != null;
