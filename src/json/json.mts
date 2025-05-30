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
    return Result.err(unknownToString(error));
  }
};

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer A function that transforms the results.
 * @param space Adds indentation, white space, and line break characters to the
 *   return-value JSON text to make it easier to read.
 */
const stringify = (
  value: unknown,
  replacer?: (this: unknown, key: string, val: unknown) => unknown,
  space?: UintRange<1, 11> | string,
): Result<string, string> => {
  try {
    return Result.ok(JSON.stringify(value, replacer, space));
  } catch (error) {
    return Result.err(unknownToString(error));
  }
};

/**
 * Converts a JavaScript value to a JavaScript Object Notation (JSON) string.
 *
 * @param value A JavaScript value, usually an object or array, to be converted.
 * @param replacer An array of strings and numbers that acts as an approved list
 *   for selecting the object properties that will be stringified.
 * @param space Adds indentation, white space, and line break characters to the
 *   return-value JSON text to make it easier to read.
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
    return Result.err(unknownToString(error));
  }
};

const stringifySortedKey = (
  value: UnknownRecord,
  space?: UintRange<1, 11> | string,
): Result<string, string> => {
  const allKeys = pipe(keysDeep(value))
    .chain((keys) => Arr.uniq(keys))
    .chain((ks) => ks.toSorted()).value;

  return stringifySelected(value, allKeys, space);
};

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

const keysDeep = (obj: UnknownRecord): readonly string[] => {
  const mut_keys: string[] = [];
  keysDeepImpl(obj, mut_keys);
  return mut_keys;
};

export const Json = {
  parse,
  stringify,
  stringifySelected,
  stringifySortedKey,
} as const;
