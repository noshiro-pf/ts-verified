import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonZeroInt32;
const typeName = 'NonZeroInt32';
const typeNameInMessage = 'a non-zero integer in [-2^31, 2^31)';

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
  MIN_VALUE: -(2 ** 31),
  MAX_VALUE: 2 ** 31 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonZeroInt32 (32-bit non-zero signed integer in the range [-2^31, 2^31) excluding 0).
 * @param value The value to check.
 * @returns `true` if the value is a NonZeroInt32, `false` otherwise.
 */
export const isNonZeroInt32 = is;

/**
 * Casts a number to a NonZeroInt32 type.
 * @param value The value to cast.
 * @returns The value as a NonZeroInt32 type.
 * @throws {TypeError} If the value is not a non-zero integer in [-2^31, 2^31).
 * @example
 * ```typescript
 * const x = asNonZeroInt32(1000); // NonZeroInt32
 * const y = asNonZeroInt32(-1000); // NonZeroInt32
 * // asNonZeroInt32(0); // throws TypeError
 * // asNonZeroInt32(2147483648); // throws TypeError
 * ```
 */
export const asNonZeroInt32 = castTo;

export const NonZeroInt32 = {
  is,

  /** `-2^31` */
  MIN_VALUE,

  /** `2^31 - 1` */
  MAX_VALUE,

  abs,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[-2^31, 2^31)` */
  pow,

  /** @returns `a + b`, but clamped to `[-2^31, 2^31)` */
  add,

  /** @returns `a - b`, but clamped to `[-2^31, 2^31)` */
  sub,

  /** @returns `a * b`, but clamped to `[-2^31, 2^31)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[-2^31, 2^31)` */
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
    { name: '2147483648', value: 2147483648 },
    { name: '-2147483649', value: -2147483649 },
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
    keyof typeof NonZeroInt32,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('=');
  expectType<
    typeof NonZeroInt32,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('<=');
}
