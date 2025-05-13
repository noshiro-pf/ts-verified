import { expectType } from '../expect-type.mjs';
import { keyIsIn } from '../guard/index.mjs';

/**
 * @internal
 * Helper type to determine if a given PropertyKey `T` is a literal type (e.g., 'a', 1)
 * or a general type (e.g., string, number).
 * @template T The PropertyKey type to check.
 * @returns `true` if `T` is a literal type, `false` otherwise.
 */
type IsLiteralTypeImpl<T extends PropertyKey> = string extends T
  ? false
  : number extends T
    ? false
    : symbol extends T
      ? false
      : true;

/**
 * @internal
 * Helper type to ensure that an object `T` only contains keys specified in `ExpectedKeys`.
 * If `T` has any keys not in `ExpectedKeys`, this type resolves to `never`.
 * @template T The object type to check.
 * @template ExpectedKeys The union of string literal types representing the allowed keys.
 */
type StrictPropertyCheck<T, ExpectedKeys extends string> =
  RelaxedExclude<keyof T, ExpectedKeys> extends never ? T : never;

/**
 * A strict version of `match` that ensures the `cases` object only contains keys
 * present in the `Case` union type.
 * It returns the value corresponding to the `target` case.
 * @template Case A union of string literal types representing the possible cases.
 * @template R A record where keys are from `Case` and values are of any type.
 * @param target The specific case to match.
 * @param cases An object mapping cases to their corresponding values.
 *              This object must strictly conform to the `Case` type for its keys.
 * @returns The value associated with the `target` case in the `cases` object.
 */
export const strictMatch = <
  const Case extends string,
  const R extends Record<Case, unknown>,
>(
  target: Case,
  cases: StrictPropertyCheck<R, Case>,
): R[Case] => cases[target];

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
  cases: Record<Case, V>,
): IsLiteralTypeImpl<Case> extends true ? V : V | undefined;

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
>(target: Case, cases: Record<CaseSub, V>): V;

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
>(target: Case, cases: Record<CaseSub, V>): V | undefined {
  return keyIsIn(target, cases) ? cases[target] : undefined;
}

if (import.meta.vitest !== undefined) {
  expectType<IsLiteralTypeImpl<'aaa'>, true>('=');
  expectType<IsLiteralTypeImpl<33>, true>('=');
  expectType<IsLiteralTypeImpl<number | 'aa'>, false>('=');
  expectType<IsLiteralTypeImpl<'aa' | 32>, true>('=');

  test('dummy', () => {
    expect(true).toBe(true);
  });
}
