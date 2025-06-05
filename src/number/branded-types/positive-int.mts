import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveInt;
const typeName = 'PositiveInt';
const typeNameInMessage = 'a positive integer';

const {
  MIN_VALUE,
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
  undefined
>({
  integerOrSafeInteger: 'Integer',
  MIN_VALUE: 1,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a PositiveInt (a positive integer >= 1).
 * @param value The value to check.
 * @returns `true` if the value is a PositiveInt, `false` otherwise.
 */
export const isPositiveInt = is;

/**
 * Casts a number to a PositiveInt type.
 * @param value The value to cast.
 * @returns The value as a PositiveInt type.
 * @throws {TypeError} If the value is not a positive integer.
 * @example
 * ```typescript
 * const x = asPositiveInt(5); // PositiveInt
 * const y = asPositiveInt(100); // PositiveInt
 * // asPositiveInt(0); // throws TypeError
 * // asPositiveInt(-1); // throws TypeError
 * ```
 */
export const asPositiveInt = castTo;

export const PositiveInt = {
  is,

  /** `1` */
  MIN_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but never less than 1 */
  pow,

  /** @returns `a + b`, but never less than 1 */
  add,

  /** @returns `a - b`, but never less than 1 */
  sub,

  /** @returns `a * b`, but never less than 1 */
  mul,

  /** @returns `⌊a / b⌋`, but never less than 1 */
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
    keyof typeof PositiveInt,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive'
    >
  >('=');

  expectType<
    typeof PositiveInt,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive'
    >
  >('<=');
}
