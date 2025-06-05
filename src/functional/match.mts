import { expectType } from '../expect-type.mjs';
import { keyIsIn } from '../guard/index.mjs';

/**
 * @internal
 * Helper type to ensure that an object `T` only contains keys specified in `ExpectedKeys`.
 * If `T` has any keys not in `ExpectedKeys`, this type resolves to `never`.
 * @template T The object type to check.
 * @template ExpectedKeys The union of string literal types representing the allowed keys.
 */
type StrictPropertyCheck<T, ExpectedKeys extends PropertyKey> =
  RelaxedExclude<keyof T, ExpectedKeys> extends never ? T : never;

/**
 * @internal
 * Helper type to check if all cases in `Case` union are fully covered by keys in `R`.
 * This checks bidirectional coverage: all Case members are in R, and no extra keys.
 * @template Case A union of string literal types representing the possible cases.
 * @template R A record type.
 */
type AllCasesCovered<Case extends PropertyKey, R> =
  TypeEq<Case, keyof R> extends true ? true : false;

expectType<AllCasesCovered<'a' | 'b', { a: 1; b: 2 }>, true>('=');
expectType<AllCasesCovered<'a' | 'b' | 'c', { a: 1; b: 2 }>, false>('=');
expectType<AllCasesCovered<'a' | 'b', { a: 1; b: 2; c: 3 }>, false>('=');
expectType<AllCasesCovered<string, Record<string, string>>, true>('=');

/**
 * @internal
 * Helper type to check if Case is a literal union type and all cases are covered.
 * @template Case A union of string literal types.
 * @template R A record type.
 */
type IsLiteralUnionFullyCovered<
  Case extends PropertyKey,
  R extends UnknownRecord,
> = IsLiteralType<Case> extends true ? AllCasesCovered<Case, R> : false;

expectType<IsLiteralUnionFullyCovered<'a' | 'b', { a: 1; b: 2 }>, true>('=');
expectType<IsLiteralUnionFullyCovered<'a' | 'b' | 'c', { a: 1; b: 2 }>, false>(
  '=',
);
expectType<IsLiteralUnionFullyCovered<'a' | 'b', { a: 1; b: 2; c: 3 }>, false>(
  '=',
);
expectType<IsLiteralUnionFullyCovered<string, Record<string, string>>, false>(
  '=',
);

/**
 * @internal
 * Helper type to determine if a given PropertyKey `T` is a literal type (e.g., 'a', 1)
 * or a general type (e.g., string, number).
 * @template T The PropertyKey type to check.
 * @returns `true` if `T` is a literal type, `false` otherwise.
 */
type IsLiteralType<T extends PropertyKey> = string extends T
  ? false
  : number extends T
    ? false
    : symbol extends T
      ? false
      : true;

expectType<IsLiteralType<'a' | 'b'>, true>('=');
expectType<IsLiteralType<'a'>, true>('=');
expectType<IsLiteralType<string>, false>('=');
expectType<IsLiteralType<number>, false>('=');
expectType<IsLiteralType<1>, true>('=');
expectType<IsLiteralType<number | 'aa'>, false>('=');
expectType<IsLiteralType<'aa' | 32>, true>('=');

/**
 * A strict version of `match` that ensures the `cases` object only contains keys
 * present in the `Case` union type.
 * This overload is available when Case is a literal union and all cases are covered.
 * @template Case A union of string literal types representing the possible cases.
 * @template R A record where keys are from `Case` and values are of any type.
 * @param target The specific case to match.
 * @param cases An object mapping cases to their corresponding values.
 *              This object must strictly conform to the `Case` type for its keys.
 * @returns The value associated with the `target` case in the `cases` object.
 * @example
 * ```typescript
 * type Direction = 'north' | 'south' | 'east' | 'west';
 * const direction: Direction = 'north';
 *
 * // All cases must be covered
 * const result = match(direction, {
 *   north: 0,
 *   south: 180,
 *   east: 90,
 *   west: 270
 * }); // result: number (0)
 *
 * // Type error: missing 'west' case
 * // match(direction, { north: 0, south: 180, east: 90 });
 *
 * // Type error: extra 'up' case
 * // match(direction, { north: 0, south: 180, east: 90, west: 270, up: 45 });
 * ```
 */
export function match<
  const Case extends string,
  const R extends ReadonlyRecord<Case, unknown>,
>(target: Case, cases: StrictPropertyCheck<R, Case>): R[Case];

/**
 * A strict version of `match` that ensures the `cases` object only contains keys
 * present in the `Case` union type, with a required default value for unmatched cases.
 * This overload is available when Case is not a literal union or not all cases are covered.
 * @template Case A union of string literal types representing the possible cases.
 * @template R A record where keys are a subset of `Case` and values are of any type.
 * @template D The type of the default value.
 * @param target The specific case to match.
 * @param cases An object mapping cases to their corresponding values.
 * @param defaultValue The value to return if the `target` case is not found in `cases`.
 * @returns The value associated with the `target` case in the `cases` object, or `defaultValue`.
 * @example
 * ```typescript
 * type Direction = 'north' | 'south' | 'east' | 'west';
 * const direction: Direction = 'north';
 *
 * // Partial cases with default
 * const result = match(direction, {
 *   north: 'N',
 *   south: 'S'
 * }, 'Unknown'); // result: 'N' | 'S' | 'Unknown'
 *
 * // With string type (not literal union)
 * const key: string = getUserInput();
 * const value = match(key, {
 *   home: '/home',
 *   about: '/about',
 *   contact: '/contact'
 * }, '/404'); // default is required for string type
 * ```
 */
export function match<
  const Case extends string,
  const R extends UnknownRecord,
  const D,
>(
  target: Case,
  cases: StrictPropertyCheck<R, Case>,
  defaultValue: IsLiteralUnionFullyCovered<Case, R> extends true ? never : D,
): ValueOf<R> | D;

/**
 * Implementation of the match function.
 * @internal
 */
export function match<
  const Case extends string,
  const R extends UnknownRecord,
  const D,
>(target: Case, cases: R, defaultValue?: D): ValueOf<R> | D {
  if (!keyIsIn(target, cases)) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return defaultValue!;
  }
  return cases[target];
}
