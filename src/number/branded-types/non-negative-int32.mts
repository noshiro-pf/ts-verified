import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonNegativeInt32;
const typeName = 'NonNegativeInt32';
const typeNameInMessage = 'a non-negative integer in [0, 2^31)';

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
  MAX_VALUE: 2 ** 31 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonNegativeInt32 (32-bit non-negative signed integer in the range [0, 2^31)).
 * @param value The value to check.
 * @returns `true` if the value is a NonNegativeInt32, `false` otherwise.
 */
export const isNonNegativeInt32 = is;

/**
 * Casts a number to a NonNegativeInt32 type.
 * @param value The value to cast.
 * @returns The value as a NonNegativeInt32 type.
 * @throws {TypeError} If the value is not a non-negative integer in [0, 2^31).
 * @example
 * ```typescript
 * const x = asNonNegativeInt32(1000); // NonNegativeInt32
 * const y = asNonNegativeInt32(0); // NonNegativeInt32
 * // asNonNegativeInt32(-1); // throws TypeError
 * // asNonNegativeInt32(2147483648); // throws TypeError
 * ```
 */
export const asNonNegativeInt32 = castTo;

export const NonNegativeInt32 = {
  is,

  /** `0` */
  MIN_VALUE,

  /** `2^31 - 1` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[0, 2^31)` */
  pow,

  /** @returns `a + b`, but clamped to `[0, 2^31)` */
  add,

  /** @returns `a - b`, but clamped to `[0, 2^31)` */
  sub,

  /** @returns `a * b`, but clamped to `[0, 2^31)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[0, 2^31)` */
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
    { name: '2147483648', value: 2147483648 },
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
    keyof typeof NonNegativeInt32,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('=');
  expectType<
    typeof NonNegativeInt32,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('<=');
}
