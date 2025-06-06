import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = SafeInt;

const typeNameInMessage = 'a safe integer';

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
  random,
  is,
  castType,
  clamp,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  SafeInt,
  SafeUint
>({
  integerOrSafeInteger: 'SafeInteger',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MIN_VALUE: Number.MIN_SAFE_INTEGER as SafeInt,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MAX_VALUE: Number.MAX_SAFE_INTEGER as SafeUint,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a SafeInt.
 * @param value The value to check.
 * @returns `true` if the value is a SafeInt, `false` otherwise.
 */
export const isSafeInt = is;

/**
 * Casts a number to a SafeInt type.
 * @param value The value to cast.
 * @returns The value as a SafeInt type.
 * @throws {TypeError} If the value is not a safe integer.
 * @example
 * ```typescript
 * const x = asSafeInt(5); // SafeInt
 * const y = asSafeInt(-1000); // SafeInt
 * // asSafeInt(1.5); // throws TypeError
 * // asSafeInt(Number.MAX_SAFE_INTEGER + 1); // throws TypeError
 * ```
 */
export const asSafeInt = castType;

/**
 * Namespace providing type-safe arithmetic operations for safe integers.
 *
 * All operations automatically clamp results to the safe integer range [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER].
 * This ensures that all arithmetic maintains IEEE 754 precision guarantees, preventing precision loss
 * that can occur with very large integers in JavaScript.
 *
 * @example
 * ```typescript
 * const a = asSafeInt(9007199254740000);  // Near MAX_SAFE_INTEGER
 * const b = asSafeInt(1000);
 *
 * // Arithmetic operations with automatic clamping
 * const sum = SafeInt.add(a, b);          // SafeInt (clamped to MAX_SAFE_INTEGER)
 * const diff = SafeInt.sub(a, b);         // SafeInt (9007199254739000)
 * const product = SafeInt.mul(a, b);      // SafeInt (clamped to MAX_SAFE_INTEGER)
 *
 * // Range operations
 * const clamped = SafeInt.clamp(1e20);        // SafeInt (MAX_SAFE_INTEGER)
 * const minimum = SafeInt.min(a, b);          // SafeInt (1000)
 * const maximum = SafeInt.max(a, b);          // SafeInt (a)
 *
 * // Utility operations
 * const absolute = SafeInt.abs(asSafeInt(-1000)); // SafeInt (1000)
 * const random = SafeInt.random();                // SafeInt (random safe integer)
 * ```castType
 */
export const SafeInt = {
  /**
   * Type guard to check if a value is a SafeInt.
   * @param value The value to check.
   * @returns `true` if the value is a safe integer, `false` otherwise.
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
   * Returns the absolute value of a safe integer.
   * @param a The SafeInt value.
   * @returns The absolute value as a SafeInt, clamped to safe range.
   */
  abs,

  /**
   * Returns the smaller of two SafeInt values.
   * @param a The first SafeInt.
   * @param b The second SafeInt.
   * @returns The minimum value as a SafeInt.
   */
  min: min_,

  /**
   * Returns the larger of two SafeInt values.
   * @param a The first SafeInt.
   * @param b The second SafeInt.
   * @returns The maximum value as a SafeInt.
   */
  max: max_,

  /**
   * Clamps a number to the safe integer range.
   * @param value The number to clamp.
   * @returns The value clamped to [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER] as a SafeInt.
   */
  clamp,

  /**
   * Generates a random SafeInt value within the safe integer range.
   * @returns A random SafeInt between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.
   */
  random,

  /**
   * Raises a SafeInt to the power of another SafeInt.
   * @param a The base SafeInt.
   * @param b The exponent SafeInt.
   * @returns `a ** b` clamped to safe integer range as a SafeInt.
   */
  pow,

  /**
   * Adds two SafeInt values.
   * @param a The first SafeInt.
   * @param b The second SafeInt.
   * @returns `a + b` clamped to safe integer range as a SafeInt.
   */
  add,

  /**
   * Subtracts one SafeInt from another.
   * @param a The minuend SafeInt.
   * @param b The subtrahend SafeInt.
   * @returns `a - b` clamped to safe integer range as a SafeInt.
   */
  sub,

  /**
   * Multiplies two SafeInt values.
   * @param a The first SafeInt.
   * @param b The second SafeInt.
   * @returns `a * b` clamped to safe integer range as a SafeInt.
   */
  mul,

  /**
   * Divides one SafeInt by another using floor division.
   * @param a The dividend SafeInt.
   * @param b The divisor SafeInt.
   * @returns `⌊a / b⌋` clamped to safe integer range as a SafeInt.
   */
  div,
} as const;

expectType<
  keyof typeof SafeInt,
  keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'range'
  >
>('=');

expectType<
  typeof SafeInt,
  TsVerifiedInternals.RefinedNumberUtils.NumberClass<
    ElementType,
    'int' | 'range'
  >
>('<=');
