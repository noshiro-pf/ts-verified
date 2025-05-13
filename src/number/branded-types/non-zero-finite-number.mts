import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonZeroFiniteNumber;
const typeName = 'NonZeroFiniteNumber';
const typeNameInMessage = 'a non-zero finite number';

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
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForFloat<
  ElementType,
  undefined,
  undefined
>({
  nonZero: true,
  MIN_VALUE: undefined,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

// Not provided because reasonable rounding operations that avoid becoming 0 cannot be defined

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

expectType<
  TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>,
  NonZeroInt
>('=');
expectType<
  TsVerifiedInternals.RefinedNumberUtils.RemoveNonZeroBrandKey<
    TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>
  >,
  Int
>('=');

/**
 * Checks if a number is a NonZeroFiniteNumber (a finite number that is not 0).
 * @param value The value to check.
 * @returns `true` if the value is a NonZeroFiniteNumber, `false` otherwise.
 */
export const isNonZeroFiniteNumber = is;

/**
 * Casts a number to a NonZeroFiniteNumber type.
 * @param value The value to cast.
 * @returns The value as a NonZeroFiniteNumber type.
 * @throws {TypeError} If the value is not a non-zero finite number.
 * @example
 * ```typescript
 * const x = asNonZeroFiniteNumber(5.5); // NonZeroFiniteNumber
 * const y = asNonZeroFiniteNumber(-3.2); // NonZeroFiniteNumber
 * // asNonZeroFiniteNumber(0); // throws TypeError
 * // asNonZeroFiniteNumber(Infinity); // throws TypeError
 * ```
 */
export const asNonZeroFiniteNumber = castTo;

export const NonZeroFiniteNumber = {
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
    { name: '0', value: 0 },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  expectType<
    TsVerifiedInternals.RefinedNumberUtils.ToNonNegative<ElementType>,
    PositiveFiniteNumber
  >('=');

  test(`${typeName}.random`, () => {
    const min = castTo(-2.3);
    const max = castTo(4.5);
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(result).not.toBe(0);
  });

  expectType<
    keyof typeof NonZeroFiniteNumber,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, never>
  >('=');
  expectType<
    typeof NonZeroFiniteNumber,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, never>
  >('<=');
}
