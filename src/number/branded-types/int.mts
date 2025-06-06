import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = Int;

const typeNameInMessage = 'an integer';

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
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  undefined,
  undefined
>({
  integerOrSafeInteger: 'Integer',
  MIN_VALUE: undefined,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is an Int.
 * @param value The value to check.
 * @returns `true` if the value is an Int, `false` otherwise.
 */
export const isInt = is;

/**
 * Casts a number to an Int type.
 * @param value The value to cast.
 * @returns The value as an Int type.
 * @throws {TypeError} If the value is not an integer.
 * @example
 * ```typescript
 * const x = asInt(5); // Int
 * const y = asInt(-10); // Int
 * // asInt(5.5); // throws TypeError
 * ```
 */
export const asInt = castType;

/**
 * Utility functions for working with Int (integer) branded types.
 * Provides type-safe operations that ensure results remain integers.
 *
 * @example
 * ```typescript
 * // Type checking
 * Int.is(5); // true
 * Int.is(5.5); // false
 *
 * // Arithmetic operations
 * const a = asInt(10);
 * const b = asInt(3);
 *
 * Int.add(a, b); // Int (13)
 * Int.sub(a, b); // Int (7)
 * Int.mul(a, b); // Int (30)
 * Int.div(a, b); // Int (3) - floor division
 * Int.pow(a, b); // Int (1000)
 *
 * // Utility functions
 * Int.abs(asInt(-5)); // Int (5)
 * Int.min(a, b); // Int (3)
 * Int.max(a, b); // Int (10)
 * Int.random(); // Random Int
 * ```
 */
export const Int = {
  /**
   * Type guard that checks if a value is an integer.
   * @param value - The value to check
   * @returns `true` if the value is an integer, `false` otherwise
   */
  is,

  /**
   * Returns the absolute value of an integer.
   * @param a - The integer to get the absolute value of
   * @returns The absolute value as an Int
   * @example
   * ```typescript
   * Int.abs(asInt(-5)); // Int (5)
   * Int.abs(asInt(3)); // Int (3)
   * ```
   */
  abs,

  /**
   * Returns the minimum of two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns The smaller value as an Int
   */
  min: min_,

  /**
   * Returns the maximum of two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns The larger value as an Int
   */
  max: max_,

  /**
   * Generates a random integer.
   * @returns A random Int value
   */
  random,

  /**
   * Raises an integer to a power.
   * @param a - The base integer
   * @param b - The exponent integer
   * @returns `a ** b` as an Int
   * @example
   * ```typescript
   * Int.pow(asInt(2), asInt(3)); // Int (8)
   * ```
   */
  pow,

  /**
   * Adds two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a + b` as an Int
   * @example
   * ```typescript
   * Int.add(asInt(5), asInt(3)); // Int (8)
   * ```
   */
  add,

  /**
   * Subtracts two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a - b` as an Int
   * @example
   * ```typescript
   * Int.sub(asInt(8), asInt(3)); // Int (5)
   * ```
   */
  sub,

  /**
   * Multiplies two integers.
   * @param a - First integer
   * @param b - Second integer
   * @returns `a * b` as an Int
   * @example
   * ```typescript
   * Int.mul(asInt(4), asInt(3)); // Int (12)
   * ```
   */
  mul,

  /**
   * Divides two integers using floor division.
   * @param a - The dividend integer
   * @param b - The divisor integer
   * @returns `⌊a / b⌋` as an Int
   * @example
   * ```typescript
   * Int.div(asInt(10), asInt(3)); // Int (3) - floor division
   * Int.div(asInt(9), asInt(3)); // Int (3)
   * ```
   */
  div,
} as const;

expectType<
  keyof typeof Int,
  keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
>('=');

expectType<
  typeof Int,
  TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
>('<=');
