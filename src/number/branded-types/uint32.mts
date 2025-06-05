import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = Uint32;
const typeName = 'Uint32';
const typeNameInMessage = 'a non-negative integer less than 2^32';

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
  MAX_VALUE: 2 ** 32 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a Uint32 (32-bit unsigned integer in the range [0, 2^32)).
 * @param value The value to check.
 * @returns `true` if the value is a Uint32, `false` otherwise.
 */
export const isUint32 = is;

/**
 * Casts a number to a Uint32 type.
 * @param value The value to cast.
 * @returns The value as a Uint32 type.
 * @throws {TypeError} If the value is not a non-negative integer less than 2^32.
 * @example
 * ```typescript
 * const x = asUint32(1000000); // Uint32
 * const y = asUint32(0); // Uint32
 * // asUint32(-1); // throws TypeError
 * // asUint32(5000000000); // throws TypeError
 * ```
 */
export const asUint32 = castTo;

export const Uint32 = {
  is,

  /** `0` */
  MIN_VALUE,

  /** `2^32 - 1` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[0, 2^32)` */
  pow,

  /** @returns `a + b`, but clamped to `[0, 2^32)` */
  add,

  /** @returns `a - b`, but clamped to `[0, 2^32)` */
  sub,

  /** @returns `a * b`, but clamped to `[0, 2^32)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[0, 2^32)` */
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
    keyof typeof Uint32,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('=');

  expectType<
    typeof Uint32,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative' | 'range'
    >
  >('<=');
}
