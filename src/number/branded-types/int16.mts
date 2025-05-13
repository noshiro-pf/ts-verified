import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = Int16;
const typeName = 'Int16';
const typeNameInMessage = 'an integer in [-2^15, 2^15)';

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
  MIN_VALUE: -(2 ** 15),
  MAX_VALUE: 2 ** 15 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is an Int16 (16-bit signed integer in the range [-2^15, 2^15)).
 * @param value The value to check.
 * @returns `true` if the value is an Int16, `false` otherwise.
 */
export const isInt16 = is;

/**
 * Casts a number to an Int16 type.
 * @param value The value to cast.
 * @returns The value as an Int16 type.
 * @throws {TypeError} If the value is not an integer in [-2^15, 2^15).
 * @example
 * ```typescript
 * const x = asInt16(1000); // Int16
 * const y = asInt16(-5000); // Int16
 * // asInt16(50000); // throws TypeError
 * // asInt16(1.5); // throws TypeError
 * ```
 */
export const asInt16 = castTo;

export const Int16 = {
  is,

  /** -2^15` */
  MIN_VALUE,

  /** 2^15 - 1` */
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
    keyof typeof Int16,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('=');
  expectType<
    typeof Int16,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('<=');
}
