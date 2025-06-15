import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonZeroSafeInt;

const typeNameInMessage = 'a non-zero safe integer';

const {
  MIN_VALUE,
  MAX_VALUE,
  abs,
  min: min_,
  max: max_,
  pow,
  add,
  sub,
  mul,
  div,
  randomNonZero: random,
  is,
  castType,
  clamp,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  SafeInt,
  SafeUint
>({
  integerOrSafeInteger: 'SafeInteger',
  nonZero: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MIN_VALUE: Number.MIN_SAFE_INTEGER as SafeInt,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MAX_VALUE: Number.MAX_SAFE_INTEGER as SafeUint,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonZeroSafeInt (a non-zero safe integer in the range [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER] excluding 0).
 * @param value The value to check.
 * @returns `true` if the value is a NonZeroSafeInt, `false` otherwise.
 */
export const isNonZeroSafeInt = is;

/**
 * Casts a number to a NonZeroSafeInt type.
 * @param value The value to cast.
 * @returns The value as a NonZeroSafeInt type.
 * @throws {TypeError} If the value is not a non-zero safe integer.
 * @example
 * ```typescript
 * const x = asNonZeroSafeInt(5); // NonZeroSafeInt
 * const y = asNonZeroSafeInt(-1000); // NonZeroSafeInt
 * // asNonZeroSafeInt(0); // throws TypeError
 * // asNonZeroSafeInt(1.5); // throws TypeError
 * ```
 */
export const asNonZeroSafeInt = castType;

/**
 * Namespace providing type-safe arithmetic operations for non-zero safe integers.
 *
 * All operations automatically clamp results to the non-zero safe integer range, excluding zero.
 * This ensures that all arithmetic maintains both the non-zero constraint and IEEE 754 precision guarantees,
 * preventing precision loss while ensuring results are never zero.
 *
 * @example
 * ```typescript
 * const a = asNonZeroSafeInt(9007199254740000);  // Near MAX_SAFE_INTEGER
 * const b = asNonZeroSafeInt(-1000);
 *
 * // Arithmetic operations with non-zero safe range clamping
 * const sum = NonZeroSafeInt.add(a, b);          // NonZeroSafeInt (9007199254739000)
 * const diff = NonZeroSafeInt.sub(a, b);         // NonZeroSafeInt (clamped to MAX_SAFE_INTEGER)
 * const product = NonZeroSafeInt.mul(a, b);      // NonZeroSafeInt (clamped to MIN_SAFE_INTEGER)
 *
 * // Utility operations
 * const absolute = NonZeroSafeInt.abs(b);            // NonZeroSafeInt (1000)
 * const minimum = NonZeroSafeInt.min(a, b);          // NonZeroSafeInt (-1000)
 * const maximum = NonZeroSafeInt.max(a, b);          // NonZeroSafeInt (a)
 *
 * // Random generation
 * const random = NonZeroSafeInt.random();            // NonZeroSafeInt (random non-zero safe integer)
 * ```
 */
export const NonZeroSafeInt = {
  /**
   * Type guard to check if a value is a NonZeroSafeInt.
   * @param value The value to check.
   * @returns `true` if the value is a non-zero safe integer, `false` otherwise.
   */
  is,

  /**
   * The minimum safe integer value (-(2^53 - 1)).
   * @readonly
   */
  MIN_VALUE,

  /**
   * The maximum safe integer value (2^53 - 1).
   * @readonly
   */
  MAX_VALUE,

  /**
   * Returns the absolute value of a non-zero safe integer.
   * @param a The NonZeroSafeInt value.
   * @returns The absolute value as a NonZeroSafeInt, clamped to safe range.
   */
  abs,

  /**
   * Returns the smaller of two NonZeroSafeInt values.
   * @param a The first NonZeroSafeInt.
   * @param b The second NonZeroSafeInt.
   * @returns The minimum value as a NonZeroSafeInt.
   */
  min: min_,

  /**
   * Returns the larger of two NonZeroSafeInt values.
   * @param a The first NonZeroSafeInt.
   * @param b The second NonZeroSafeInt.
   * @returns The maximum value as a NonZeroSafeInt.
   */
  max: max_,

  /**
   * Clamps a number to the non-zero safe integer range.
   * @param value The number to clamp.
   * @returns The value clamped to [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER] \ {0} as a NonZeroSafeInt.
   */
  clamp,

  /**
   * Generates a random NonZeroSafeInt value within the valid range.
   * @returns A random non-zero safe integer between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.
   */
  random,

  /**
   * Raises a NonZeroSafeInt to the power of another NonZeroSafeInt.
   * @param a The base NonZeroSafeInt.
   * @param b The exponent NonZeroSafeInt.
   * @returns `a ** b` clamped to non-zero safe integer range as a NonZeroSafeInt.
   */
  pow,

  /**
   * Adds two NonZeroSafeInt values.
   * @param a The first NonZeroSafeInt.
   * @param b The second NonZeroSafeInt.
   * @returns `a + b` clamped to non-zero safe integer range as a NonZeroSafeInt.
   */
  add,

  /**
   * Subtracts one NonZeroSafeInt from another.
   * @param a The minuend NonZeroSafeInt.
   * @param b The subtrahend NonZeroSafeInt.
   * @returns `a - b` clamped to non-zero safe integer range as a NonZeroSafeInt.
   */
  sub,

  /**
   * Multiplies two NonZeroSafeInt values.
   * @param a The first NonZeroSafeInt.
   * @param b The second NonZeroSafeInt.
   * @returns `a * b` clamped to non-zero safe integer range as a NonZeroSafeInt.
   */
  mul,

  /**
   * Divides one NonZeroSafeInt by another using floor division.
   * @param a The dividend NonZeroSafeInt.
   * @param b The divisor NonZeroSafeInt.
   * @returns `⌊a / b⌋` clamped to non-zero safe integer range as a NonZeroSafeInt.
   */
  div,
} as const;

expectType<
  keyof typeof NonZeroSafeInt,
  keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'range'
  >
>('=');

expectType<
  typeof NonZeroSafeInt,
  TsVerifiedInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'range'
  >
>('<=');
