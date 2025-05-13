import { isNonNullish } from '../guard/index.mjs';

/**
 * Converts an unknown value to its string representation.
 *
 * @param value - The unknown value to convert.
 * @param options - Optional parameters.
 * @param options.prettyPrintObject - If true, objects will be stringified with an indent of 2 spaces. Otherwise, they will be stringified without indentation.
 * @returns The string representation of the unknown value.
 */
export const unknownToString = (
  value: unknown,
  options?: Partial<Readonly<{ prettyPrintObject: boolean }>>,
): string => {
  switch (typeof value) {
    case 'string':
      return value;

    case 'number':
    case 'bigint':
    case 'boolean':
    case 'symbol':
    case 'function':
      return value.toString();

    case 'object':
      return isNonNullish(value)
        ? options?.prettyPrintObject === true
          ? JSON.stringify(value, undefined, 2)
          : JSON.stringify(value)
        : 'null';

    case 'undefined':
      return 'undefined';
  }
};
