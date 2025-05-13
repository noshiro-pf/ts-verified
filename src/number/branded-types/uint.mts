import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = Uint;
const typeName = 'Uint';
const typeNameInMessage = 'a non-negative integer';

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
  0,
  undefined
>({
  integerOrSafeInteger: 'Integer',
  MIN_VALUE: 0,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a Uint.
 * @param value The value to check.
 * @returns `true` if the value is a Uint, `false` otherwise.
 */
export const isUint = is;

/**
 * Casts a number to a Uint type.
 * @param value The value to cast.
 * @returns The value as a Uint type.
 * @throws {TypeError} If the value is not a non-negative integer.
 * @example
 * ```typescript
 * const x = asUint(5); // Uint
 * const y = asUint(0); // Uint
 * // asUint(-1); // throws TypeError
 * // asUint(1.5); // throws TypeError
 * ```
 */
export const asUint = castTo;

export const Uint = {
  is,

  /** `0` */
  MIN_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but never less than 0 */
  pow,

  /** @returns `a + b`, but never less than 0 */
  add,

  /** @returns `a - b`, but never less than 0 */
  sub,

  /** @returns `a * b`, but never less than 0 */
  mul,

  /** @returns `⌊a / b⌋`, but never less than 0 */
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
    keyof typeof Uint,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative'
    >
  >('=');

  expectType<
    typeof Uint,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'non-negative'
    >
  >('<=');
}
