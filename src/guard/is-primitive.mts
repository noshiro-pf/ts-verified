/**
 * Checks if a value is a primitive type.
 * Primitive types are: string, number, boolean, undefined, symbol, bigint.
 * Note: `null` is considered an object by `typeof`, so this function will return `false` for `null`.
 * @param u The value to check.
 * @returns `true` if `a` is a primitive type, `false` otherwise.
 */
export const isPrimitive = (u: unknown): boolean => {
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
      // typeof null is 'object', so it correctly returns false here.
      return false;
  }
};
