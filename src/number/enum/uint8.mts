import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

const typeName = 'Uint8';
const typeNameInMessage = 'an non-negative integer less than 256';

const {
  MIN_VALUE,
  MAX_VALUE,
  random: randomImpl,
  is: isImpl,
  castTo: castToImpl,
  clamp: clampImpl,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<Uint16, 0, 255>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: 0,
  MAX_VALUE: 255,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a valid Uint8 (non-negative integer in [0, 255]).
 * @param x - The number to check
 * @returns True if x is a valid Uint8
 */
const is = (x: number): x is Uint8 => isImpl(x);

/**
 * Converts a number to Uint8, throwing an error if invalid.
 * @param x - The number to convert
 * @returns The number as Uint8
 * @throws TypeError if x is not a valid Uint8
 */
const castTo = (x: number): Uint8 =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  castToImpl(x) as Uint8;

/**
 * Clamps a number to the Uint8 range [0, 255].
 * @param a - The number to clamp
 * @returns The clamped value as Uint8
 */
const clamp = (a: number): Uint8 => castTo(clampImpl(a));

/**
 * Returns the minimum of the given Uint8 values.
 * @param values - The Uint8 values to compare
 * @returns The minimum value
 */
const min_ = (...values: readonly Uint8[]): Uint8 =>
  castTo(Math.min(...values));

/**
 * Returns the maximum of the given Uint8 values.
 * @param values - The Uint8 values to compare
 * @returns The maximum value
 */
const max_ = (...values: readonly Uint8[]): Uint8 =>
  castTo(Math.max(...values));

/**
 * Raises x to the power of y, clamped to Uint8 range.
 * @param x - The base
 * @param y - The exponent
 * @returns x^y clamped to [0, 255]
 */
const pow = (x: Uint8, y: Uint8): Uint8 => clamp(x ** y);

/**
 * Adds two Uint8 values, clamped to Uint8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x + y clamped to [0, 255]
 */
const add = (x: Uint8, y: Uint8): Uint8 => clamp(x + y);

/**
 * Subtracts two Uint8 values, clamped to Uint8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x - y clamped to [0, 255]
 */
const sub = (x: Uint8, y: Uint8): Uint8 => clamp(x - y);

/**
 * Multiplies two Uint8 values, clamped to Uint8 range.
 * @param x - First operand
 * @param y - Second operand
 * @returns x * y clamped to [0, 255]
 */
const mul = (x: Uint8, y: Uint8): Uint8 => clamp(x * y);

/**
 * Divides two Uint8 values, clamped to Uint8 range.
 * @param x - The dividend
 * @param y - The divisor (cannot be 0)
 * @returns ⌊x / y⌋ clamped to [0, 255]
 */
const div = (x: Uint8, y: Exclude<Uint8, 0>): Uint8 => clamp(Math.floor(x / y));

/**
 * Generates a random Uint8 value within the specified range.
 * @param min - The minimum value (inclusive)
 * @param max - The maximum value (inclusive)
 * @returns A random Uint8 between min and max
 */
const random = (min: Uint8, max: Uint8): Uint8 =>
  castTo(randomImpl(castToImpl(min), castToImpl(max)));

/**
 * Type guard function that checks if a number is a valid Uint8.
 */
export const isUint8 = is;

/**
 * Converts a number to Uint8, throwing an error if invalid.
 */
export const asUint8 = castTo;

/**
 * Utilities for working with 8-bit unsigned integers (range: 0 to 255).
 */
export const Uint8 = {
  is,

  /** `0` */
  MIN_VALUE,

  /** `255` */
  MAX_VALUE,

  max: max_,
  min: min_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[0, 255]` */
  pow,

  /** @returns `a + b`, but clamped to `[0, 255]` */
  add,

  /** @returns `a - b`, but clamped to `[0, 255]` */
  sub,

  /** @returns `a * b`, but clamped to `[0, 255]` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[0, 255]` */
  div,
} as const;

if (import.meta.vitest !== undefined) {
  test.each([
    { name: 'Number.NaN', value: Number.NaN },
    { name: 'Number.POSITIVE_INFINITY', value: Number.POSITIVE_INFINITY },
    { name: 'Number.NEGATIVE_INFINITY', value: Number.NEGATIVE_INFINITY },
    { name: '1.2', value: 1.2 },
    { name: '-3.4', value: -3.4 },
    { name: '256', value: 256 },
    { name: '-129', value: -129 },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  test(`${typeName}.random`, () => {
    const min = 0;
    const max = 5;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  expectType<
    keyof typeof Uint8,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      Uint16,
      'int' | 'non-negative' | 'range'
    >
  >('=');
}
