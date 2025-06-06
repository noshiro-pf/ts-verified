import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = FiniteNumber;

const typeNameInMessage = 'a finite number';

const {
  abs,
  min: min_,
  max: max_,
  pow,
  add,
  sub,
  mul,
  div,
  random,
  is,
  castType,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForFloat<
  ElementType,
  undefined,
  undefined
>({
  MIN_VALUE: undefined,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

const floor = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.floor(x) as TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>;

const ceil = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.ceil(x) as TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>;

const round = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.round(x) as TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>;

expectType<TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>, Int>('=');

/**
 * Checks if a number is a FiniteNumber.
 * @param value The value to check.
 * @returns `true` if the value is a FiniteNumber, `false` otherwise.
 */
export const isFiniteNumber = is;

/**
 * Casts a number to a FiniteNumber type.
 * @param value The value to cast.
 * @returns The value as a FiniteNumber type.
 * @throws {TypeError} If the value is not a finite number (NaN or Infinity).
 * @example
 * ```typescript
 * const x = asFiniteNumber(5.5); // FiniteNumber
 * const y = asFiniteNumber(-10); // FiniteNumber
 * // asFiniteNumber(Infinity); // throws TypeError
 * // asFiniteNumber(NaN); // throws TypeError
 * ```
 */
export const asFiniteNumber = castType;

/**
 * Utility functions for working with FiniteNumber branded types.
 * Provides type-safe operations that ensure results remain finite numbers (not NaN or Infinity).
 * All operations preserve the finite property of the input values.
 *
 * @example
 * ```typescript
 * // Type checking
 * FiniteNumber.is(5.5); // true
 * FiniteNumber.is(Infinity); // false
 * FiniteNumber.is(NaN); // false
 *
 * // Arithmetic operations
 * const a = asFiniteNumber(10.5);
 * const b = asFiniteNumber(3.2);
 *
 * FiniteNumber.add(a, b); // FiniteNumber (13.7)
 * FiniteNumber.sub(a, b); // FiniteNumber (7.3)
 * FiniteNumber.mul(a, b); // FiniteNumber (33.6)
 * FiniteNumber.div(a, b); // FiniteNumber (3.28125)
 * FiniteNumber.pow(a, b); // FiniteNumber (a^b)
 *
 * // Utility functions
 * FiniteNumber.abs(asFiniteNumber(-5.5)); // FiniteNumber (5.5)
 * FiniteNumber.min(a, b); // FiniteNumber (3.2)
 * FiniteNumber.max(a, b); // FiniteNumber (10.5)
 *
 * // Rounding operations (return Int)
 * FiniteNumber.floor(asFiniteNumber(5.8)); // Int (5)
 * FiniteNumber.ceil(asFiniteNumber(5.2)); // Int (6)
 * FiniteNumber.round(asFiniteNumber(5.4)); // Int (5)
 * FiniteNumber.round(asFiniteNumber(5.6)); // Int (6)
 *
 * FiniteNumber.random(); // Random FiniteNumber
 * ```
 */
export const FiniteNumber = {
  /**
   * Type guard that checks if a value is a finite number (not NaN or Infinity).
   * @param value - The value to check
   * @returns `true` if the value is finite, `false` otherwise
   */
  is,

  /**
   * Returns the absolute value of a finite number.
   * @param x - The finite number to get the absolute value of
   * @returns The absolute value as a FiniteNumber
   * @example
   * ```typescript
   * FiniteNumber.abs(asFiniteNumber(-5.5)); // FiniteNumber (5.5)
   * FiniteNumber.abs(asFiniteNumber(3.2)); // FiniteNumber (3.2)
   * ```
   */
  abs,

  /**
   * Returns the minimum of multiple finite numbers.
   * @param values - The finite numbers to compare
   * @returns The smallest value as a FiniteNumber
   */
  min: min_,

  /**
   * Returns the maximum of multiple finite numbers.
   * @param values - The finite numbers to compare
   * @returns The largest value as a FiniteNumber
   */
  max: max_,

  /**
   * Returns the largest integer less than or equal to the given finite number.
   * @param x - The finite number to floor
   * @returns The floor value as an Int
   * @example
   * ```typescript
   * FiniteNumber.floor(asFiniteNumber(5.8)); // Int (5)
   * FiniteNumber.floor(asFiniteNumber(-5.2)); // Int (-6)
   * ```
   */
  floor,

  /**
   * Returns the smallest integer greater than or equal to the given finite number.
   * @param x - The finite number to ceil
   * @returns The ceiling value as an Int
   * @example
   * ```typescript
   * FiniteNumber.ceil(asFiniteNumber(5.2)); // Int (6)
   * FiniteNumber.ceil(asFiniteNumber(-5.8)); // Int (-5)
   * ```
   */
  ceil,

  /**
   * Rounds a finite number to the nearest integer.
   * @param x - The finite number to round
   * @returns The rounded value as an Int
   * @example
   * ```typescript
   * FiniteNumber.round(asFiniteNumber(5.4)); // Int (5)
   * FiniteNumber.round(asFiniteNumber(5.6)); // Int (6)
   * FiniteNumber.round(asFiniteNumber(5.5)); // Int (6)
   * ```
   */
  round,

  /**
   * Generates a random finite number.
   * @returns A random FiniteNumber value
   */
  random,

  /**
   * Raises a finite number to a power.
   * @param a - The base finite number
   * @param b - The exponent finite number
   * @returns `a ** b` as a FiniteNumber
   * @example
   * ```typescript
   * FiniteNumber.pow(asFiniteNumber(2.5), asFiniteNumber(3)); // FiniteNumber (15.625)
   * ```
   */
  pow,

  /**
   * Adds two finite numbers.
   * @param a - First finite number
   * @param b - Second finite number
   * @returns `a + b` as a FiniteNumber
   * @example
   * ```typescript
   * FiniteNumber.add(asFiniteNumber(5.5), asFiniteNumber(3.2)); // FiniteNumber (8.7)
   * ```
   */
  add,

  /**
   * Subtracts two finite numbers.
   * @param a - First finite number
   * @param b - Second finite number
   * @returns `a - b` as a FiniteNumber
   * @example
   * ```typescript
   * FiniteNumber.sub(asFiniteNumber(8.7), asFiniteNumber(3.2)); // FiniteNumber (5.5)
   * ```
   */
  sub,

  /**
   * Multiplies two finite numbers.
   * @param a - First finite number
   * @param b - Second finite number
   * @returns `a * b` as a FiniteNumber
   * @example
   * ```typescript
   * FiniteNumber.mul(asFiniteNumber(5.5), asFiniteNumber(2)); // FiniteNumber (11)
   * ```
   */
  mul,

  /**
   * Divides two finite numbers.
   * @param a - The dividend finite number
   * @param b - The divisor finite number
   * @returns `a / b` as a FiniteNumber
   * @example
   * ```typescript
   * FiniteNumber.div(asFiniteNumber(11), asFiniteNumber(2)); // FiniteNumber (5.5)
   * ```
   */
  div,
} as const;

expectType<
  TsVerifiedInternals.RefinedNumberUtils.ToNonNegative<ElementType>,
  NonNegativeFiniteNumber
>('=');

expectType<
  keyof typeof FiniteNumber,
  keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, never>
>('=');

expectType<
  typeof FiniteNumber,
  TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, never>
>('<=');
