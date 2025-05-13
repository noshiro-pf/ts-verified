import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonNegativeInt16;
const typeName = 'NonNegativeInt16';
const typeNameInMessage = 'a non-negative integer in [0, 2^15)';

const {
  MIN_VALUE,
  MAX_VALUE,
  min: min_,
  max: max_,
  pow,
  add,
  sub,
  mul,
  div,
  random,
  is,
  castTo,
  clamp,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  0,
  number
>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: 0,
  MAX_VALUE: 2 ** 15 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonNegativeInt16 (16-bit non-negative signed integer in the range [0, 2^15)).
 * @param value The value to check.
 * @returns `true` if the value is a NonNegativeInt16, `false` otherwise.
 */
export const isNonNegativeInt16 = is;

/**
 * Casts a number to a NonNegativeInt16 type.
 * @param value The value to cast.
 * @returns The value as a NonNegativeInt16 type.
 * @throws {TypeError} If the value is not a non-negative integer in [0, 2^15).
 * @example
 * ```typescript
 * const x = asNonNegativeInt16(1000); // NonNegativeInt16
 * const y = asNonNegativeInt16(0); // NonNegativeInt16
 * // asNonNegativeInt16(-1); // throws TypeError
 * // asNonNegativeInt16(32768); // throws TypeError
 * ```
 */
export const asNonNegativeInt16 = castTo;

export const NonNegativeInt16 = {
  is,

  /** `0` */
  MIN_VALUE,

  /** `2^15 - 1` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[0, 2^15)` */
  pow,

  /** @returns `a + b`, but clamped to `[0, 2^15)` */
  add,

  /** @returns `a - b`, but clamped to `[0, 2^15)` */
  sub,

  /** @returns `a * b`, but clamped to `[0, 2^15)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[0, 2^15)` */
  div,
} as const;

if (import.meta.vitest !== undefined) {
  test.each([
    { name: 'Number.NaN', value: Number.NaN },
    { name: 'Number.POSITIVE_INFINITY', value: Number.POSITIVE_INFINITY },
    { name: 'Number.NEGATIVE_INFINITY', value: Number.NEGATIVE_INFINITY },
    { name: '1.2', value: 1.2 },
    { name: '-3.4', value: -3.4 },
    { name: '-1', value: -1 },
    { name: '32768', value: 32768 },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  test(`${typeName}.random`, () => {
    const min = 0;
    const max = 10;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  expectType<
    keyof typeof NonNegativeInt16,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('=');
  expectType<
    typeof NonNegativeInt16,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('<=');
}
