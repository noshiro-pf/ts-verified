import { Result } from '../functional/index.mjs';
import { isNonNullish } from '../guard/index.mjs';

/**
 * Converts an unknown value to its string representation.
 *
 * @param value - The unknown value to convert.
 * @param options - Optional parameters.
 * @param options.prettyPrintObject - If true, objects will be stringified with an indent of 2 spaces. Otherwise, they will be stringified without indentation.
 * @returns A Result containing the string representation of the unknown value, or an error message if JSON.stringify fails (e.g., circular references).
 * @example
 * ```typescript
 * const result = unknownToString('hello');
 * if (Result.isOk(result)) {
 *   console.log(result.value); // 'hello'
 * }
 *
 * const result2 = unknownToString({ a: 1, b: 2 });
 * if (Result.isOk(result2)) {
 *   console.log(result2.value); // '{"a":1,"b":2}'
 * }
 *
 * // Circular reference example
 * const circular: any = { a: 1 };
 * circular.self = circular;
 * const result3 = unknownToString(circular);
 * if (Result.isErr(result3)) {
 *   console.log(result3.value); // Error message about circular reference
 * }
 * ```
 */
export const unknownToString = (
  value: unknown,
  options?: Partial<Readonly<{ prettyPrintObject: boolean }>>,
): Result<string, string> => {
  switch (typeof value) {
    case 'string':
      return Result.ok(value);

    case 'number':
    case 'bigint':
    case 'boolean':
    case 'symbol':
    case 'function':
      return Result.ok(value.toString());

    case 'object':
      if (!isNonNullish(value)) {
        return Result.ok('null');
      }
      try {
        const stringified =
          options?.prettyPrintObject === true
            ? JSON.stringify(value, undefined, 2)
            : JSON.stringify(value);
        return Result.ok(stringified);
      } catch (error) {
        return Result.err(
          error instanceof Error ? error.message : 'Failed to stringify object',
        );
      }

    case 'undefined':
      return Result.ok('undefined');
  }
};
