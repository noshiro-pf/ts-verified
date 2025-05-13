import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveSafeInt;
const typeName = 'PositiveSafeInt';
const typeNameInMessage = 'a positive safe integer';

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
  SafeUint
>({
  integerOrSafeInteger: 'SafeInteger',
  MIN_VALUE: 1,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MAX_VALUE: Number.MAX_SAFE_INTEGER as SafeUint,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a PositiveSafeInt (a positive safe integer in the range [1, MAX_SAFE_INTEGER]).
 * @param value The value to check.
 * @returns `true` if the value is a PositiveSafeInt, `false` otherwise.
 */
export const isPositiveSafeInt = is;

/**
 * Casts a number to a PositiveSafeInt type.
 * @param value The value to cast.
 * @returns The value as a PositiveSafeInt type.
 * @throws {TypeError} If the value is not a positive safe integer.
 * @example
 * ```typescript
 * const x = asPositiveSafeInt(5); // PositiveSafeInt
 * const y = asPositiveSafeInt(1000); // PositiveSafeInt
 * // asPositiveSafeInt(0); // throws TypeError
 * // asPositiveSafeInt(-1); // throws TypeError
 * ```
 */
export const asPositiveSafeInt = castTo;

export const PositiveSafeInt = {
  is,

  /** `1` */
  MIN_VALUE,

  /** `Number.MAX_SAFE_INTEGER` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[1, MAX_SAFE_INTEGER]` */
  pow,

  /** @returns `a + b`, but clamped to `[1, MAX_SAFE_INTEGER]` */
  add,

  /** @returns `a - b`, but clamped to `[1, MAX_SAFE_INTEGER]` */
  sub,

  /** @returns `a * b`, but clamped to `[1, MAX_SAFE_INTEGER]` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[1, MAX_SAFE_INTEGER]` */
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
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  test(`${typeName}.random`, () => {
    const min = 1;
    const max = 5;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  expectType<
    keyof typeof PositiveSafeInt,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('=');

  expectType<
    typeof PositiveSafeInt,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('<=');
}
