import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = Int32;
const typeName = 'Int32';
const typeNameInMessage = 'an integer in [-2^31, 2^31)';

const {
  MIN_VALUE,
  MAX_VALUE,
  min: min_,
  max: max_,
  abs,
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
  number,
  number
>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: -(2 ** 31),
  MAX_VALUE: 2 ** 31 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is an Int32 (32-bit signed integer in the range [-2^31, 2^31)).
 * @param value The value to check.
 * @returns `true` if the value is an Int32, `false` otherwise.
 */
export const isInt32 = is;

/**
 * Casts a number to an Int32 type.
 * @param value The value to cast.
 * @returns The value as an Int32 type.
 * @throws {TypeError} If the value is not an integer in [-2^31, 2^31).
 * @example
 * ```typescript
 * const x = asInt32(100000); // Int32
 * const y = asInt32(-500000); // Int32
 * // asInt32(3000000000); // throws TypeError
 * // asInt32(1.5); // throws TypeError
 * ```
 */
export const asInt32 = castTo;

export const Int32 = {
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
    keyof typeof Int32,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('=');
  expectType<
    typeof Int32,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('<=');
}
