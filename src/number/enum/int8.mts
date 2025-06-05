import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

const typeName = 'Int8';
const typeNameInMessage = 'an integer in [-128, 127]';

const {
  MIN_VALUE,
  MAX_VALUE,
  random: randomImpl,
  is: isImpl,
  castTo: castToImpl,
  clamp: clampImpl,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  Int16,
  -128,
  127
>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: -128,
  MAX_VALUE: 127,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a valid Int8 (integer in [-128, 127]).
 * @param x - The number to check
 * @returns True if x is a valid Int8
 */
const is = (x: number): x is Int8 => isImpl(x);

/**
 * Converts a number to Int8, throwing an error if invalid.
 * @param x - The number to convert
 * @returns The number as Int8
 * @throws TypeError if x is not a valid Int8
 */
const castTo = (x: number): Int8 =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  castToImpl(x) as Int8;

/**
 * Clamps a number to the Int8 range [-128, 127].
 * @param a - The number to clamp
 * @returns The clamped value as Int8
 */
const clamp = (a: number): Int8 => castTo(clampImpl(a));

/**
 * Returns the absolute value of an Int8.
 * @param x - The Int8 value
 * @returns The absolute value
 */
const abs = <N extends Int8>(x: N): AbsoluteValue<N> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.abs(x) as unknown as AbsoluteValue<N>;

/**
 * Returns the minimum of the given Int8 values.
 * @param values - The Int8 values to compare
 * @returns The minimum value
 */
const min_ = (...values: readonly Int8[]): Int8 => castTo(Math.min(...values));

/**
 * Returns the maximum of the given Int8 values.
 * @param values - The Int8 values to compare
 * @returns The maximum value
 */
const max_ = (...values: readonly Int8[]): Int8 => castTo(Math.max(...values));

/**
 * Raises x to the power of y, clamped to Int8 range.
 * @param x - The base
 * @param y - The exponent
 * @returns x^y clamped to [-128, 127]
 */
const pow = (x: Int8, y: Int8): Int8 => clamp(x ** y);

/**
 * Adds two Int8 values, clamped to Int8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x + y clamped to [-128, 127]
 */
const add = (x: Int8, y: Int8): Int8 => clamp(x + y);

/**
 * Subtracts two Int8 values, clamped to Int8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x - y clamped to [-128, 127]
 */
const sub = (x: Int8, y: Int8): Int8 => clamp(x - y);

/**
 * Multiplies two Int8 values, clamped to Int8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x * y clamped to [-128, 127]
 */
const mul = (x: Int8, y: Int8): Int8 => clamp(x * y);

/**
 * Divides two Int8 values, clamped to Int8 range.
 * @param x - The dividend
 * @param y - The divisor (cannot be 0)
 * @returns ⌊x / y⌋ clamped to [-128, 127]
 */
const div = (x: Int8, y: Exclude<Int8, 0>): Int8 => clamp(Math.floor(x / y));

/**
 * Generates a random Int8 value within the specified range.
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random Int8 between min and max
 */
const random = (min: Int8, max: Int8): Int8 =>
  castTo(randomImpl(castToImpl(min), castToImpl(max)));

/**
 * Type guard function that checks if a number is a valid Int8.
 */
export const isInt8 = is;

/**
 * Converts a number to Int8, throwing an error if invalid.
 */
export const asInt8 = castTo;

/**
 * Utilities for working with 8-bit signed integers (range: -128 to 127).
 */
export const Int8 = {
  is,

  /** `-128` */
  MIN_VALUE,

  /** `127` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  abs,
  random,

  /** @returns `a ** b`, but clamped to `[-128, 127]` */
  pow,

  /** @returns `a + b`, but clamped to `[-128, 127]` */
  add,

  /** @returns `a - b`, but clamped to `[-128, 127]` */
  sub,

  /** @returns `a * b`, but clamped to `[-128, 127]` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[-128, 127]` */
  div,
} as const;

if (import.meta.vitest !== undefined) {
  test.each([
    { name: 'Number.NaN', value: Number.NaN },
    { name: 'Number.POSITIVE_INFINITY', value: Number.POSITIVE_INFINITY },
    { name: 'Number.NEGATIVE_INFINITY', value: Number.NEGATIVE_INFINITY },
    { name: '1.2', value: 1.2 },
    { name: '-3.4', value: -3.4 },
    { name: '128', value: 128 },
    { name: '-129', value: -129 },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  test(`${typeName}.random`, () => {
    const min = -5;
    const max = 5;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  expectType<
    keyof typeof Int8,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      Int16,
      'int' | 'range'
    >
  >('=');
}
