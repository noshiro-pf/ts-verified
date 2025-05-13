import { expectType } from '../expect-type.mjs';

/**
 * A collection of number utility functions.
 * Provides functions for number conversion, range checking, clamping, arithmetic operations, rounding, and type guards for numbers.
 */
export namespace Num {
  /**
   * Converts an unknown value to a number. Alias for the `Number` constructor.
   * @param n The value to convert.
   * @returns The numeric representation of `n`.
   * @example
   * ```typescript
   * Num.from('123'); // 123
   * Num.from('123.45'); // 123.45
   * Num.from(true); // 1
   * Num.from(false); // 0
   * Num.from('hello'); // NaN
   * ```
   */
  export const from: (n: unknown) => number = Number;

  /**
   * Checks if a number is non-zero.
   * Acts as a type guard.
   * @template N The type of the number.
   * @param num The number to check.
   * @returns `true` if `a` is not zero, `false` otherwise.
   */
  export const isNonZero = <N extends number>(
    num: N,
  ): num is NonZeroNumber & RelaxedExclude<N, 0> => num !== 0;

  expectType<NonZeroNumber & RelaxedExclude<123, 0>, UnknownBrand>('<=');

  /**
   * Checks if a number is non-negative (i.e., >= 0).
   * Acts as a type guard.
   * @template N The type of the number.
   * @param num The number to check.
   * @returns `true` if `a` is non-negative, `false` otherwise.
   */
  export const isNonNegative = <N extends number>(
    num: N,
  ): num is NonNegativeNumber & RelaxedExclude<N, NegativeIndex<1024>> =>
    num >= 0;

  /**
   * Checks if a number is positive (i.e., > 0).
   * Acts as a type guard.
   * @template N The type of the number.
   * @param num The number to check.
   * @returns `true` if `a` is positive, `false` otherwise.
   */
  export const isPositive = <N extends number>(
    num: N,
  ): num is PositiveNumber & RelaxedExclude<N, NegativeIndex<1024> | 0> =>
    num > 0;

  /**
   * Creates a function that checks if a number `x` is within the range `lowerBound <= x < upperBound`.
   * @param lowerBound The lower bound (inclusive).
   * @param upperBound The upper bound (exclusive).
   * @returns A function that takes a number `x` and returns `true` if `x` is in the range, `false` otherwise.
   * @example
   * ```typescript
   * const isInRange0to10 = Num.isInRange(0, 10);
   * isInRange0to10(5); // true
   * isInRange0to10(0); // true (inclusive lower bound)
   * isInRange0to10(10); // false (exclusive upper bound)
   * isInRange0to10(-1); // false
   * ```
   */
  export const isInRange =
    (lowerBound: number, upperBound: number) =>
    (x: number): boolean =>
      lowerBound <= x && x < upperBound;

  /**
   * Creates a function that checks if a number `x` is within the range `lowerBound <= x <= upperBound`.
   * @param lowerBound The lower bound (inclusive).
   * @param upperBound The upper bound (inclusive).
   * @returns A function that takes a number `x` and returns `true` if `x` is in the range, `false` otherwise.
   * @example
   * ```typescript
   * const inRange = Num.isInRangeInclusive(1, 10);
   * console.log(inRange(1));   // true (lower bound)
   * console.log(inRange(5));   // true
   * console.log(inRange(10));  // true (upper bound)
   * console.log(inRange(11));  // false
   * ```
   */
  export const isInRangeInclusive =
    (lowerBound: number, upperBound: number) =>
    (x: number): boolean =>
      lowerBound <= x && x <= upperBound;

  /**
   * @internal
   * Helper type for representing indices up to a `SmallUint`.
   * `LEQ[N]` means "less than or equal to N".
   * For example, `LEQ[3]` would be `0 | 1 | 2`. (Assuming `Index<N>` generates `0 | ... | N-1`)
   * Actually, `Index<N>` is `0 | ... | N-1`. So `LEQ[N]` is `Index<N>`.
   * This type maps each `SmallUint` `N` to `Index<N>` (i.e., integers from `0` to `N-1`).
   * @template N A `SmallUint`.
   */
  type LEQ = {
    readonly [N in SmallUint]: Index<N>;
  };

  /**
   * @internal
   * Helper type for representing indices up to and including a `SmallUint`.
   * `LEQC[N]` means "less than or equal to N, closed interval".
   * For example, `LEQC[3]` would be `0 | 1 | 2 | 3`.
   * This type maps each `SmallUint` `N` to `Index<N> | N` (i.e., integers from `0` to `N`).
   * @template N A `SmallUint`.
   */
  type LEQC = {
    readonly [N in SmallUint]: Index<N> | N;
  };

  /**
   * Checks if a number `x` is an unsigned integer within the range `lowerBound <= x < upperBound`.
   * Acts as a type guard.
   * @template L The lower bound type, a `SmallUint`.
   * @template U The upper bound type, a `SmallUint`.
   * @param lowerBound The lower bound (inclusive).
   * @param upperBound The upper bound (exclusive).
   * @returns A function that takes a number `x` and returns `true` if `x` is a safe integer in the range, `false` otherwise.
   * @example
   * ```typescript
   * const isIndex = Num.isUintInRange(0, 10);
   * if (isIndex(5)) {
   *   // x is typed as 5
   *   console.log("Valid index");
   * }
   * ```
   */
  export const isUintInRange =
    <L extends SmallUint, U extends SmallUint>(lowerBound: L, upperBound: U) =>
    (x: number): x is RelaxedExclude<LEQ[U], LEQ[Min<L>]> =>
      Number.isSafeInteger(x) && lowerBound <= x && x < upperBound;

  /**
   * Checks if a number `x` is an unsigned integer within the range `lowerBound <= x <= upperBound`.
   * Acts as a type guard.
   * @template L The lower bound type, a `SmallUint`.
   * @template U The upper bound type, a `SmallUint`.
   * @param lowerBound The lower bound (inclusive).
   * @param upperBound The upper bound (inclusive).
   * @returns A function that takes a number `x` and returns `true` if `x` is a safe integer in the range, `false` otherwise.
   * @example
   * ```typescript
   * const isValidScore = Num.isUintInRangeInclusive(0, 100);
   * if (isValidScore(85)) {
   *   // x is typed as a number in range 0-100
   *   console.log("Valid score");
   * }
   * ```
   * @param lowerBound The lower bound (inclusive).
   * @param upperBound The upper bound (inclusive).
   * @returns A function that takes a number `x` and returns `true` if `x` is a safe integer in the range, `false` otherwise.
   */
  export const isUintInRangeInclusive =
    <L extends SmallUint, U extends SmallUint>(lowerBound: L, upperBound: U) =>
    (x: number): x is RelaxedExclude<LEQC[U], LEQ[Min<L>]> =>
      Number.isSafeInteger(x) && lowerBound <= x && x <= upperBound;

  /**
   * Clamps a value within the given range. If the target value is invalid (not finite), returns the lower bound.
   *
   * @example
   *   clamp(0, 2)(2.3); // 2
   *   clamp(0, 2)(-0.5); // 0
   *   clamp(0, 2)(1.5); // 1.5
   * @template N The type of the numbers (lowerBound, upperBound, target).
   * @param lowerBound The lower bound of the range.
   * @param upperBound The upper bound of the range.
   * @returns A function that takes a target number and returns the clamped value.
   */
  export const clamp =
    (lowerBound: number, upperBound: number) =>
    (target: number): number =>
      !Number.isFinite(target)
        ? lowerBound
        : Math.max(lowerBound, Math.min(upperBound, target));

  /**
   * Performs division of two numbers.
   * @param a The dividend.
   * @param b The divisor. Must be non-zero (enforced at compile time).
   * @returns The result of the division.
   * @example
   * ```typescript
   * const result = Num.div(10, 2); // 5
   * // Num.div(10, 0); // TypeScript error: Type '0' is not assignable
   * ```
   */
  export const div = (a: number, b: NonZeroNumber | SmallInt<'!=0'>): number =>
    a / b;

  /**
   * Performs integer division (Math.floor(a / b)).
   * @param a The dividend.
   * @param b The divisor. Must be non-zero.
   * @returns The result of integer division. Returns `NaN` if `b` is zero.
   */
  export const divInt = (a: number, b: number): number =>
    Math.floor(Math.floor(a) / Math.floor(b));

  /**
   * Rounds a number to a specified number of decimal places (precision).
   * @param num The number to round.
   * @param precision The number of decimal places to round to.
   * @returns The rounded number.
   */
  export const roundAt = (
    num: number,
    precision: PositiveSafeIntWithSmallInt,
  ): number => {
    const digit = 10 ** precision;

    return Math.round(num * digit) / digit;
  };

  /**
   * Rounds a number to the nearest integer.
   * Uses a bitwise OR for potentially faster rounding for positive numbers.
   * @param num The number to round.
   * @returns The nearest integer.
   */
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  export const roundToInt = (num: number): Int => (0 | (num + 0.5)) as Int;

  /**
   * Returns a function that rounds a number to a specified number of decimal places.
   * @param digit The number of decimal places to round to.
   * @returns A function that takes a target number and returns it rounded to `digit` decimal places.
   */
  export const round = (
    digit: PositiveSafeIntWithSmallInt,
  ): ((num: number) => number) => {
    const powAmount = 10 ** digit;

    return (target: number) => roundToInt(powAmount * target) / powAmount;
  };

  /**
   * Maps `NaN` to `undefined`, otherwise returns the original number.
   * @template N The type of the number.
   * @param num The number to check.
   * @returns The original number if it's not `NaN`, otherwise `undefined`.
   */
  export const mapNaN2Undefined = <N extends number>(
    num: N,
  ): RelaxedExclude<N, NaNType> | undefined =>
    Number.isNaN(num)
      ? undefined
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (num as RelaxedExclude<N, NaNType>);

  /**
   * Increments a `SmallUint` value.
   * @template N The type of the `SmallUint`.
   * @param n The `SmallUint` to increment.
   * @returns The incremented value as `Increment<N>`.
   */
  export const increment = <N extends SmallUint>(n: N): Increment<N> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    (n + 1) as Increment<N>;

  /**
   * Decrements a positive small integer by 1 at the type level.
   * @template N A positive small integer type (1-40).
   * @param n The positive small integer to decrement.
   * @returns The decremented value with the correct type.
   * @example
   * ```typescript
   * const three = 3 as 3;
   * const two = Num.decrement(three); // type is 2, value is 2
   *
   * const one = 1 as 1;
   * const zero = Num.decrement(one); // type is 0, value is 0
   * ```
   */
  export const decrement = <N extends PositiveSmallInt>(n: N): Decrement<N> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    (n - 1) as Decrement<N>;
}
