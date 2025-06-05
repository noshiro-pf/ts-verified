import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = Uint16;
const typeName = 'Uint16';
const typeNameInMessage = 'a non-negative integer less than 2^16';

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
  MAX_VALUE: 2 ** 16 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a Uint16 (16-bit unsigned integer in the range [0, 2^16)).
 * @param value The value to check.
 * @returns `true` if the value is a Uint16, `false` otherwise.
 */
export const isUint16 = is;

/**
 * Casts a number to a Uint16 type.
 * @param value The value to cast.
 * @returns The value as a Uint16 type.
 * @throws {TypeError} If the value is not a non-negative integer less than 2^16.
 * @example
 * ```typescript
 * const x = asUint16(1000); // Uint16
 * const y = asUint16(0); // Uint16
 * // asUint16(-1); // throws TypeError
 * // asUint16(70000); // throws TypeError
 * ```
 */
export const asUint16 = castTo;

export const Uint16 = {
  is,

  /** `0` */
  MIN_VALUE,

  /** `2^16 - 1` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[0, 2^16)` */
  pow,

  /** @returns `a + b`, but clamped to `[0, 2^16)` */
  add,

  /** @returns `a - b`, but clamped to `[0, 2^16)` */
  sub,

  /** @returns `a * b`, but clamped to `[0, 2^16)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[0, 2^16)` */
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
    keyof typeof Uint16,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('=');

  expectType<
    typeof Uint16,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('<=');
}
