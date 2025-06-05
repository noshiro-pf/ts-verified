import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = FiniteNumber;
const typeName = 'FiniteNumber';
const typeNameInMessage = 'a finite number';

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
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForFloat<
  ElementType,
  undefined,
  undefined
>({
  MIN_VALUE: undefined,
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

expectType<TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>, Int>('=');

/**
 * Checks if a number is a FiniteNumber.
 * @param value The value to check.
 * @returns `true` if the value is a FiniteNumber, `false` otherwise.
 */
export const isFiniteNumber = is;

/**
 * Casts a number to a FiniteNumber type.
 * @param value The value to cast.
 * @returns The value as a FiniteNumber type.
 * @throws {TypeError} If the value is not a finite number (NaN or Infinity).
 * @example
 * ```typescript
 * const x = asFiniteNumber(5.5); // FiniteNumber
 * const y = asFiniteNumber(-10); // FiniteNumber
 * // asFiniteNumber(Infinity); // throws TypeError
 * // asFiniteNumber(NaN); // throws TypeError
 * ```
 */
export const asFiniteNumber = castTo;

/**
 * Utility functions for working with FiniteNumber branded types.
 * Provides type-safe operations that ensure results remain finite numbers.
 */
export const FiniteNumber = {
  is,

  abs,

  min: min_,
  max: max_,

  floor,
  ceil,
  round,
  random,

  /** @returns `a ** b` */
  pow,

  /** @returns `a + b` */
  add,

  /** @returns `a - b` */
  sub,

  /** @returns `a * b` */
  mul,

  /** @returns `a / b` */
  div,
} as const;

if (import.meta.vitest !== undefined) {
  test.each([
    { name: 'Number.NaN', value: Number.NaN },
    { name: 'Number.POSITIVE_INFINITY', value: Number.POSITIVE_INFINITY },
    { name: 'Number.NEGATIVE_INFINITY', value: Number.NEGATIVE_INFINITY },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  expectType<
    TsVerifiedInternals.RefinedNumberUtils.ToNonNegative<ElementType>,
    NonNegativeFiniteNumber
  >('=');

  test(`${typeName}.random`, () => {
    const min = castTo(-2.3);
    const max = castTo(4.5);
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  expectType<
    keyof typeof FiniteNumber,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, never>
  >('=');
  expectType<
    typeof FiniteNumber,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, never>
  >('<=');
}
