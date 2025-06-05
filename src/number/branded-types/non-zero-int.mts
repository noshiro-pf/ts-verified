import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonZeroInt;
const typeName = 'NonZeroInt';
const typeNameInMessage = 'a non-zero integer';

const {
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
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  undefined,
  undefined
>({
  integerOrSafeInteger: 'Integer',
  nonZero: true,
  MIN_VALUE: undefined,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonZeroInt.
 * @param value The value to check.
 * @returns `true` if the value is a NonZeroInt, `false` otherwise.
 */
export const isNonZeroInt = is;

/**
 * Casts a number to a NonZeroInt type.
 * @param value The value to cast.
 * @returns The value as a NonZeroInt type.
 * @throws {TypeError} If the value is not a non-zero integer.
 * @example
 * ```typescript
 * const x = asNonZeroInt(5); // NonZeroInt
 * const y = asNonZeroInt(-3); // NonZeroInt
 * // asNonZeroInt(0); // throws TypeError
 * // asNonZeroInt(1.5); // throws TypeError
 * ```
 */
export const asNonZeroInt = castTo;

export const NonZeroInt = {
  is,

  abs,

  min: min_,
  max: max_,

  random,

  /** @returns `a ** b` */
  pow,

  /** @returns `a + b` */
  add,

  /** @returns `a - b` */
  sub,

  /** @returns `a * b` */
  mul,

  /** @returns `⌊a / b⌋` */
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
    keyof typeof NonZeroInt,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
  >('=');
  expectType<
    typeof NonZeroInt,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
  >('<=');
}
