import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveInt16;
const typeName = 'PositiveInt16';
const typeNameInMessage = 'a positive integer in [1, 2^15)';

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
  1,
  number
>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: 1,
  MAX_VALUE: 2 ** 15 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a PositiveInt16 (16-bit positive signed integer in the range [1, 2^15)).
 * @param value The value to check.
 * @returns `true` if the value is a PositiveInt16, `false` otherwise.
 */
export const isPositiveInt16 = is;

/**
 * Casts a number to a PositiveInt16 type.
 * @param value The value to cast.
 * @returns The value as a PositiveInt16 type.
 * @throws {TypeError} If the value is not a positive integer in [1, 2^15).
 * @example
 * ```typescript
 * const x = asPositiveInt16(1000); // PositiveInt16
 * const y = asPositiveInt16(32767); // PositiveInt16
 * // asPositiveInt16(0); // throws TypeError
 * // asPositiveInt16(-1); // throws TypeError
 * // asPositiveInt16(32768); // throws TypeError
 * ```
 */
export const asPositiveInt16 = castTo;

export const PositiveInt16 = {
  is,

  /** `1` */
  MIN_VALUE,

  /** `2^15 - 1` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[1, 2^15)` */
  pow,

  /** @returns `a + b`, but clamped to `[1, 2^15)` */
  add,

  /** @returns `a - b`, but clamped to `[1, 2^15)` */
  sub,

  /** @returns `a * b`, but clamped to `[1, 2^15)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[1, 2^15)` */
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
    { name: '-1', value: -1 },
    { name: '32768', value: 32768 },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  test(`${typeName}.random`, () => {
    const min = 1;
    const max = 10;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  expectType<
    keyof typeof PositiveInt16,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('=');
  expectType<
    typeof PositiveInt16,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('<=');
}
