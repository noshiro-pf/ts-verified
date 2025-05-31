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
 */
export function strictMatch<
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
 */
export function strictMatch<
  const Case extends string,
  const R extends UnknownRecord,
  const D,
>(
  target: Case,
  cases: StrictPropertyCheck<R, Case>,
  defaultValue: IsLiteralUnionFullyCovered<Case, R> extends true ? never : D,
): ValueOf<R> | D;

export function strictMatch<
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

/**
 * Matches a `target` case against a set of `cases` and returns the corresponding value.
 * If the `target` case is a literal type, it's assumed to be present in `cases`,
 * and the return type is `V`. Otherwise, the return type is `V | undefined`
 * as the key might not be present.
 * @template Case The type of the target case (a PropertyKey).
 * @template V The type of the values in the `cases` object.
 * @param target The specific case to match.
 * @param cases An object mapping cases to their corresponding values.
 * @returns The value associated with the `target` case, or `undefined` if the
 *          `target` is not a literal type and not found in `cases`.
 */
export function match<const Case extends PropertyKey, const V>(
  target: Case,
  cases: ReadonlyRecord<Case, V>,
): IsLiteralType<Case> extends true ? V : V | undefined;

/**
 * Matches a `target` case against a subset of `cases` and returns the corresponding value.
 * This overload is used when `cases` is a record with a subset of keys from `Case`.
 * It assumes the `target` will be one of the keys in `CaseSub`.
 * @template Case The general type of the target case (a PropertyKey).
 * @template V The type of the values in the `cases` object.
 * @template CaseSub A subtype of `Case`, representing the actual keys present in `cases`.
 * @param target The specific case to match.
 * @param cases An object mapping a subset of cases (`CaseSub`) to their corresponding values.
 * @returns The value associated with the `target` case.
 */
export function match<
  const Case extends PropertyKey,
  const V,
  const CaseSub extends Case,
>(target: Case, cases: ReadonlyRecord<CaseSub, V>): V;

/**
 * Implementation of the `match` function.
 * It checks if the `target` key exists in the `cases` object.
 * If it exists, the corresponding value is returned; otherwise, `undefined` is returned.
 * @template Case The type of the target case (a PropertyKey).
 * @template V The type of the values in the `cases` object.
 * @template CaseSub A subtype of `Case`, representing the actual keys present in `cases`.
 * @param target The specific case to match.
 * @param cases An object mapping cases to their corresponding values.
 * @returns The value associated with the `target` case, or `undefined` if not found.
 */
export function match<
  const Case extends PropertyKey,
  const V,
  const CaseSub extends Case,
>(target: Case, cases: ReadonlyRecord<CaseSub, V>): V | undefined {
  return keyIsIn(target, cases) ? cases[target] : undefined;
}
