import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonZeroSafeInt;
const typeName = 'NonZeroSafeInt';
const typeNameInMessage = 'a non-zero safe integer';

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
  SafeInt,
  SafeUint
>({
  integerOrSafeInteger: 'SafeInteger',
  nonZero: true,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MIN_VALUE: Number.MIN_SAFE_INTEGER as SafeInt,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MAX_VALUE: Number.MAX_SAFE_INTEGER as SafeUint,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonZeroSafeInt (a non-zero safe integer in the range [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER] excluding 0).
 * @param value The value to check.
 * @returns `true` if the value is a NonZeroSafeInt, `false` otherwise.
 */
export const isNonZeroSafeInt = is;

/**
 * Casts a number to a NonZeroSafeInt type.
 * @param value The value to cast.
 * @returns The value as a NonZeroSafeInt type.
 * @throws {TypeError} If the value is not a non-zero safe integer.
 * @example
 * ```typescript
 * const x = asNonZeroSafeInt(5); // NonZeroSafeInt
 * const y = asNonZeroSafeInt(-1000); // NonZeroSafeInt
 * // asNonZeroSafeInt(0); // throws TypeError
 * // asNonZeroSafeInt(1.5); // throws TypeError
 * ```
 */
export const asNonZeroSafeInt = castTo;

export const NonZeroSafeInt = {
  is,

  /** `Number.MIN_SAFE_INTEGER` */
  MIN_VALUE,

  /** `Number.MAX_SAFE_INTEGER` */
  MAX_VALUE,

  abs,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]` */
  pow,

  /** @returns `a + b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]` */
  add,

  /** @returns `a - b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]` */
  sub,

  /** @returns `a * b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]` */
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
    keyof typeof NonZeroSafeInt,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('=');

  expectType<
    typeof NonZeroSafeInt,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('<=');
}
