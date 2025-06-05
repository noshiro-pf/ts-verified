import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveUint16;
const typeName = 'PositiveUint16';
const typeNameInMessage = 'a positive integer in [1, 2^16)';

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
  MAX_VALUE: 2 ** 16 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a PositiveUint16 (16-bit positive unsigned integer in the range [1, 2^16)).
 * @param value The value to check.
 * @returns `true` if the value is a PositiveUint16, `false` otherwise.
 */
export const isPositiveUint16 = is;

/**
 * Casts a number to a PositiveUint16 type.
 * @param value The value to cast.
 * @returns The value as a PositiveUint16 type.
 * @throws {TypeError} If the value is not a positive integer in [1, 2^16).
 * @example
 * ```typescript
 * const x = asPositiveUint16(1000); // PositiveUint16
 * const y = asPositiveUint16(65535); // PositiveUint16
 * // asPositiveUint16(0); // throws TypeError
 * // asPositiveUint16(-1); // throws TypeError
 * // asPositiveUint16(65536); // throws TypeError
 * ```
 */
export const asPositiveUint16 = castTo;

export const PositiveUint16 = {
  is,

  /** `1` */
  MIN_VALUE,

  /** `2^16 - 1` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[1, 2^16)` */
  pow,

  /** @returns `a + b`, but clamped to `[1, 2^16)` */
  add,

  /** @returns `a - b`, but clamped to `[1, 2^16)` */
  sub,

  /** @returns `a * b`, but clamped to `[1, 2^16)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[1, 2^16)` */
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
    { name: '65536', value: 65536 },
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
    keyof typeof PositiveUint16,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('=');
  expectType<
    typeof PositiveUint16,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('<=');
}
