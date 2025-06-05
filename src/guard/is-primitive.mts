import { expectType } from '../expect-type.mjs';

/**
 * Checks if a value is a primitive type.
 * Primitive types are: string, number, boolean, undefined, symbol, bigint.
 * Note: `null` is considered an object by `typeof`, so this function will return `false` for `null`.
 * @param u The value to check.
 * @returns `true` if `u` is a primitive type, `false` otherwise.
 * @example
 * ```typescript
 * isPrimitive("hello"); // true
 * isPrimitive(42); // true
 * isPrimitive(true); // true
 * isPrimitive(undefined); // true
 * isPrimitive(Symbol('test')); // true
 * isPrimitive(123n); // true
 * isPrimitive(null); // false (null is object)
 * isPrimitive({}); // false
 * isPrimitive([]); // false
 * isPrimitive(() => {}); // false
 * ```
 */
export const isPrimitive = (u: unknown): u is Primitive => {
  switch (typeof u) {
    case 'string':
    case 'number':
    case 'boolean':
    case 'undefined':
    case 'symbol':
    case 'bigint':
      return true;
    case 'function':
    case 'object':
      return u === null;
  }
};

expectType<
  bigint | boolean | number | string | symbol | undefined | null,
  Primitive
>('=');
