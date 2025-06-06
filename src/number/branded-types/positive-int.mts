import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveInt;

const typeNameInMessage = 'a positive integer';

const {
  MIN_VALUE,
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
  clamp,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  1,
  undefined
>({
  integerOrSafeInteger: 'Integer',
  MIN_VALUE: 1,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a PositiveInt (a positive integer >= 1).
 * @param value The value to check.
 * @returns `true` if the value is a PositiveInt, `false` otherwise.
 */
export const isPositiveInt = is;

/**
 * Casts a number to a PositiveInt type.
 * @param value The value to cast.
 * @returns The value as a PositiveInt type.
 * @throws {TypeError} If the value is not a positive integer.
 * @example
 * ```typescript
 * const x = asPositiveInt(5); // PositiveInt
 * const y = asPositiveInt(100); // PositiveInt
 * // asPositiveInt(0); // throws TypeError
 * // asPositiveInt(-1); // throws TypeError
 * ```
 */
export const asPositiveInt = castType;

/**
 * Utility functions for working with PositiveInt (positive integer) branded types.
 * Provides type-safe operations that ensure results remain positive integers (>= 1).
 * All arithmetic operations are clamped to maintain the positive constraint.
 *
 * @example
 * ```typescript
 * // Type checking
 * PositiveInt.is(5); // true
 * PositiveInt.is(0); // false
 * PositiveInt.is(-1); // false
 *
 * // Using MIN_VALUE
 * console.log(PositiveInt.MIN_VALUE); // 1
 *
 * // Arithmetic operations (all results clamped to >= 1)
 * const a = asPositiveInt(10);
 * const b = asPositiveInt(3);
 *
 * PositiveInt.add(a, b); // PositiveInt (13)
 * PositiveInt.sub(a, b); // PositiveInt (7)
 * PositiveInt.sub(b, a); // PositiveInt (1) - clamped
 * PositiveInt.mul(a, b); // PositiveInt (30)
 * PositiveInt.div(a, b); // PositiveInt (3)
 * PositiveInt.pow(a, b); // PositiveInt (1000)
 *
 * // Utility functions
 * PositiveInt.min(a, b); // PositiveInt (3)
 * PositiveInt.max(a, b); // PositiveInt (10)
 * PositiveInt.clamp(asPositiveInt(15), asPositiveInt(5), asPositiveInt(10)); // PositiveInt (10)
 * PositiveInt.random(); // Random PositiveInt
 * ```
 */
export const PositiveInt = {
  /**
   * Type guard that checks if a value is a positive integer (>= 1).
   * @param value - The value to check
   * @returns `true` if the value is a positive integer, `false` otherwise
   */
  is,

  /**
   * The minimum value for a PositiveInt.
   * @readonly
   */
  MIN_VALUE,

  /**
   * Returns the minimum of two positive integers.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns The smaller value as a PositiveInt
   */
  min: min_,

  /**
   * Returns the maximum of two positive integers.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns The larger value as a PositiveInt
   */
  max: max_,

  /**
   * Clamps a positive integer to be within the specified range.
   * @param value - The value to clamp
   * @param min - The minimum value
   * @param max - The maximum value
   * @returns The clamped value as a PositiveInt
   * @example
   * ```typescript
   * PositiveInt.clamp(asPositiveInt(15), asPositiveInt(5), asPositiveInt(10)); // PositiveInt (10)
   * PositiveInt.clamp(asPositiveInt(2), asPositiveInt(5), asPositiveInt(10)); // PositiveInt (5)
   * ```
   */
  clamp,

  /**
   * Generates a random positive integer.
   * @returns A random PositiveInt value
   */
  random,

  /**
   * Raises a positive integer to a power, ensuring the result is never less than 1.
   * @param a - The base positive integer
   * @param b - The exponent positive integer
   * @returns `a ** b` as a PositiveInt, but never less than 1
   * @example
   * ```typescript
   * PositiveInt.pow(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (8)
   * ```
   */
  pow,

  /**
   * Adds two positive integers, ensuring the result is never less than 1.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns `a + b` as a PositiveInt, but never less than 1
   * @example
   * ```typescript
   * PositiveInt.add(asPositiveInt(5), asPositiveInt(3)); // PositiveInt (8)
   * ```
   */
  add,

  /**
   * Subtracts two positive integers, ensuring the result is never less than 1.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns `a - b` as a PositiveInt, but never less than 1 (clamped)
   * @example
   * ```typescript
   * PositiveInt.sub(asPositiveInt(8), asPositiveInt(3)); // PositiveInt (5)
   * PositiveInt.sub(asPositiveInt(3), asPositiveInt(8)); // PositiveInt (1) - clamped
   * ```
   */
  sub,

  /**
   * Multiplies two positive integers, ensuring the result is never less than 1.
   * @param a - First positive integer
   * @param b - Second positive integer
   * @returns `a * b` as a PositiveInt, but never less than 1
   * @example
   * ```typescript
   * PositiveInt.mul(asPositiveInt(4), asPositiveInt(3)); // PositiveInt (12)
   * ```
   */
  mul,

  /**
   * Divides two positive integers using floor division, ensuring the result is never less than 1.
   * @param a - The dividend positive integer
   * @param b - The divisor positive integer
   * @returns `⌊a / b⌋` as a PositiveInt, but never less than 1 (clamped)
   * @example
   * ```typescript
   * PositiveInt.div(asPositiveInt(10), asPositiveInt(3)); // PositiveInt (3)
   * PositiveInt.div(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (1) - clamped
   * ```
   */
  div,
} as const;

expectType<
  keyof typeof PositiveInt,
  keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'positive'
  >
>('=');

expectType<
  typeof PositiveInt,
  TsVerifiedInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'positive'
  >
>('<=');
