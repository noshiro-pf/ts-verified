import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonZeroInt16;
const typeName = 'NonZeroInt16';
const typeNameInMessage = 'a non-zero integer in [-2^15, 2^15)';

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
  castTo,
  clamp,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  number,
  number
>({
  integerOrSafeInteger: 'SafeInteger',
  nonZero: true,
  MIN_VALUE: -(2 ** 15),
  MAX_VALUE: 2 ** 15 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonZeroInt16 (16-bit non-zero signed integer in the range [-2^15, 2^15) excluding 0).
 * @param value The value to check.
 * @returns `true` if the value is a NonZeroInt16, `false` otherwise.
 */
export const isNonZeroInt16 = is;

/**
 * Casts a number to a NonZeroInt16 type.
 * @param value The value to cast.
 * @returns The value as a NonZeroInt16 type.
 * @throws {TypeError} If the value is not a non-zero integer in [-2^15, 2^15).
 * @example
 * ```typescript
 * const x = asNonZeroInt16(1000); // NonZeroInt16
 * const y = asNonZeroInt16(-1000); // NonZeroInt16
 * // asNonZeroInt16(0); // throws TypeError
 * // asNonZeroInt16(32768); // throws TypeError
 * ```
 */
export const asNonZeroInt16 = castTo;

export const NonZeroInt16 = {
  is,

  /** `-2^15` */
  MIN_VALUE,

  /** `2^15 - 1` */
  MAX_VALUE,

  abs,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[-2^15, 2^15)` */
  pow,

  /** @returns `a + b`, but clamped to `[-2^15, 2^15)` */
  add,

  /** @returns `a - b`, but clamped to `[-2^15, 2^15)` */
  sub,

  /** @returns `a * b`, but clamped to `[-2^15, 2^15)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[-2^15, 2^15)` */
  div,
} as const;

if (import.meta.vitest !== undefined) {
  test.each([
    { name: 'Number.NaN', value: Number.NaN },
    { name: 'Number.POSITIVE_INFINITY', value: Number.POSITIVE_INFINITY },
    { name: 'Number.NEGATIVE_INFINITY', value: Number.NEGATIVE_INFINITY },
    { name: '1.2', value: 1.2 },
    { name: '-3.4', value: -3.4 },
    { name: '0', value: 0 },
    { name: '32768', value: 32768 },
    { name: '-32769', value: -32769 },
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
    expect(result).not.toBe(0);
  });

  expectType<
    keyof typeof NonZeroInt16,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('=');
  expectType<
    typeof NonZeroInt16,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('<=');
}
