import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonNegativeFiniteNumber;
const typeName = 'NonNegativeFiniteNumber';
const typeNameInMessage = 'a non-negative finite number';

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
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForFloat<
  ElementType,
  0,
  undefined
>({
  MIN_VALUE: 0,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

const floor = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.floor(x) as TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>;

const ceil = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.ceil(x) as TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>;

const round = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.round(x) as TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>;

expectType<TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>, Uint>(
  '=',
);

/**
 * Checks if a number is a NonNegativeFiniteNumber (a finite number >= 0).
 * @param value The value to check.
 * @returns `true` if the value is a NonNegativeFiniteNumber, `false` otherwise.
 */
export const isNonNegativeFiniteNumber = is;

/**
 * Casts a number to a NonNegativeFiniteNumber type.
 * @param value The value to cast.
 * @returns The value as a NonNegativeFiniteNumber type.
 * @throws {TypeError} If the value is not a non-negative finite number.
 * @example
 * ```typescript
 * const x = asNonNegativeFiniteNumber(5.5); // NonNegativeFiniteNumber
 * const y = asNonNegativeFiniteNumber(0); // NonNegativeFiniteNumber
 * // asNonNegativeFiniteNumber(-1); // throws TypeError
 * // asNonNegativeFiniteNumber(Infinity); // throws TypeError
 * ```
 */
export const asNonNegativeFiniteNumber = castTo;

export const NonNegativeFiniteNumber = {
  is,

  /** `0` */
  MIN_VALUE,

  min: min_,
  max: max_,
  clamp,

  floor,
  ceil,
  round,
  random,

  /** @returns `a ** b`, but never less than 0 */
  pow,

  /** @returns `a + b`, but never less than 0 */
  add,

  /** @returns `a - b`, but never less than 0 */
  sub,

  /** @returns `a * b`, but never less than 0 */
  mul,

  /** @returns `a / b`, but never less than 0 */
  div,
} as const;

if (import.meta.vitest !== undefined) {
  test.each([
    { name: 'Number.NaN', value: Number.NaN },
    { name: 'Number.POSITIVE_INFINITY', value: Number.POSITIVE_INFINITY },
    { name: 'Number.NEGATIVE_INFINITY', value: Number.NEGATIVE_INFINITY },
    { name: '-1.2', value: -1.2 },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  test(`${typeName}.random`, () => {
    const min = castTo(2.3);
    const max = castTo(4.5);
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  expectType<
    keyof typeof NonNegativeFiniteNumber,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'non-negative'
    >
  >('=');

  expectType<
    typeof NonNegativeFiniteNumber,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'non-negative'
    >
  >('<=');
}
