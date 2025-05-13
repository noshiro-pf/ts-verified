import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = Int;
const typeName = 'Int';
const typeNameInMessage = 'an integer';

const {
  abs,
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
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  undefined,
  undefined
>({
  integerOrSafeInteger: 'Integer',
  MIN_VALUE: undefined,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is an Int.
 * @param value The value to check.
 * @returns `true` if the value is an Int, `false` otherwise.
 */
export const isInt = is;

/**
 * Casts a number to an Int type.
 * @param value The value to cast.
 * @returns The value as an Int type.
 * @throws {TypeError} If the value is not an integer.
 * @example
 * ```typescript
 * const x = asInt(5); // Int
 * const y = asInt(-10); // Int
 * // asInt(5.5); // throws TypeError
 * ```
 */
export const asInt = castTo;

/**
 * Utility functions for working with Int (integer) branded types.
 * Provides type-safe operations that ensure results remain integers.
 */
export const Int = {
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
    keyof typeof Int,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
  >('=');
  expectType<
    typeof Int,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, 'int'>
  >('<=');
}
