import { Arr } from '../array/index.mjs';
import { pipe, Result } from '../functional/index.mjs';
import { isRecord } from '../guard/index.mjs';
import { castMutable } from '../others/index.mjs';
import { unknownToString } from '../others/unknown-to-string.mjs';

/**
 * Converts a JavaScript Object Notation (JSON) string into an object.
 *
 * @param text A valid JSON string.
 * @param reviver A function that transforms the results. This function is
 *   called for each member of the object. If a member contains nested objects,
 *   the nested objects are transformed before the parent object is.
 * @returns A `Result` containing the parsed `JsonValue` on success, or an error message string on failure.
 * @example
 * ```typescript
 * const result = Json.parse('{"name": "John", "age": 30}');
 * if (Result.isOk(result)) {
 *   console.log(result.value); // { name: 'John', age: 30 }
 * }
 *
 * const invalid = Json.parse('invalid json');
 * if (Result.isErr(invalid)) {
 *   console.log(invalid.value); // SyntaxError message
 * }
 * ```
 *
 * @example
 * ```typescript
 * const dateReviver = (key: string, value: unknown): unknown => {
 *   if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
 *     return new Date(value);
 *   }
 *   return value;
 * };
 *
 * const result = Json.parseWithReviver('{"date": "2023-01-01T00:00:00Z"}', dateReviver);
 * ```
 */
const parse = (
  text: string,
  reviver?: (this: unknown, key: string, value: JsonValue) => unknown,
): Result<JsonValue, string> => {
  try {
    return Result.ok(
      JSON.parse(
        text,
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        reviver as (this: unknown, key: string, value: unknown) => unknown,
      ),
    );
  } catch (error: unknown) {
    const errStr = unknownToString(error);
    return Result.err(
      Result.isOk(errStr) ? errStr.value : 'Failed to parse JSON',
    );
  }
};

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the
 *   return-value JSON text to make it easier to read. Can be a number (up to 10) or a string.
 * @returns A `Result` containing the JSON string on success, or an error message string on failure.
 * @example
 * ```typescript
 * const obj = { name: 'John', age: 30 };
 * const result = Json.stringify(obj);
 * if (Result.isOk(result)) {
 *   console.log(result.value); // '{"name":"John","age":30}'
 * }
 *
 * // With formatting
 * const formatted = Json.stringify(obj, null, 2);
 * if (Result.isOk(formatted)) {
 *   console.log(formatted.value);
 *   // {
 *   //   "name": "John",
 *   //   "age": 30
 *   // }
 * }
 *
 * // Circular reference error
 * const circular: any = { a: 1 };
 * circular.self = circular;
 * const error = Json.stringify(circular);
 * if (Result.isErr(error)) {
 *   console.log(error.value); // TypeError message
 * }
 * ```
 */
const stringify = (
  value: unknown,
  replacer?: (this: unknown, key: string, val: unknown) => unknown,
  space?: UintRange<1, 11> | string,
): Result<string, string> => {
  try {
    return Result.ok(JSON.stringify(value, replacer, space));
  } catch (error) {
    const errStr = unknownToString(error);
    return Result.err(
      Result.isOk(errStr) ? errStr.value : 'Failed to stringify JSON',
    );
  }
};

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string,
 * including only the specified properties.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param propertiesToBeSelected An array of strings and numbers that acts as an approved list
 *   for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the
 *   return-value JSON text to make it easier to read. Can be a number (up to 10) or a string.
 * @returns A `Result` containing the JSON string on success, or an error message string on failure.
 */
const stringifySelected = (
  value: unknown,
  propertiesToBeSelected?: readonly (number | string)[],
  space?: UintRange<1, 11> | string,
): Result<string, string> => {
  try {
    return Result.ok(
      JSON.stringify(value, castMutable(propertiesToBeSelected), space),
    );
  } catch (error) {
    const errStr = unknownToString(error);
    return Result.err(
      Result.isOk(errStr) ? errStr.value : 'Failed to stringify JSON',
    );
  }
};

/**
 * Converts a JavaScript record to a JSON string with keys sorted alphabetically at all levels.
 *
 * @param value An `UnknownRecord` to be converted.
 * @param space Adds indentation, white space, and line break characters to the
 *   return-value JSON text to make it easier to read. Can be a number (up to 10) or a string.
 * @returns A `Result` containing the JSON string with sorted keys on success, or an error message string on failure.
 */
const stringifySortedKey = (
  value: UnknownRecord,
  space?: UintRange<1, 11> | string,
): Result<string, string> => {
  const allKeys = pipe(keysDeep(value))
    .map((keys) => Arr.uniq(keys))
    .map((ks) => ks.toSorted()).value;

  return stringifySelected(value, allKeys, space);
};

/**
 * @internal
 * Recursively collects all keys from a nested record.
 *
 * @param obj The record to extract keys from.
 * @param mut_keys A mutable array to store the collected keys. This array will be modified by the function.
 */
const keysDeepImpl = (
  obj: UnknownRecord,
  // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
  mut_keys: string[],
): void => {
  for (const k of Object.keys(obj)) {
    mut_keys.push(k);
    const o = obj[k];
    if (isRecord(o)) {
      keysDeepImpl(o, mut_keys);
    }
    if (Array.isArray(o)) {
      for (const li of o) {
        if (isRecord(li)) {
          keysDeepImpl(li, mut_keys);
        }
      }
    }
  }
};

/**
 * @internal
 * Returns a flat array of all unique keys from a potentially nested record.
 *
 * @param obj The record to extract keys from.
 * @returns A readonly array of unique string keys.
 */
const keysDeep = (obj: UnknownRecord): readonly string[] => {
  const mut_keys: string[] = [];
  keysDeepImpl(obj, mut_keys);
  return mut_keys;
};

/**
 * A collection of JSON utility functions.
 */
export const Json = {
  parse,
  stringify,
  stringifySelected,
  stringifySortedKey,
} as const;
