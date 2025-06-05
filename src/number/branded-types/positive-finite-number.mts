import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = PositiveFiniteNumber;
const typeName = 'PositiveFiniteNumber';
const typeNameInMessage = 'a positive finite number';

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
  number,
  undefined
>({
  MIN_VALUE: Number.MIN_VALUE,
  MAX_VALUE: undefined,
  typeNameInMessage,
} as const);

const floor = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.RemoveNonZeroBrandKey<
  TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>
> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.floor(x) as TsVerifiedInternals.RefinedNumberUtils.RemoveNonZeroBrandKey<
    TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>
  >;

const ceil = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.ceil(x) as TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>;
const round = (
  x: ElementType,
): TsVerifiedInternals.RefinedNumberUtils.RemoveNonZeroBrandKey<
  TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>
> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  Math.round(x) as TsVerifiedInternals.RefinedNumberUtils.RemoveNonZeroBrandKey<
    TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>
  >;

expectType<
  TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>,
  PositiveInt
>('=');
expectType<
  TsVerifiedInternals.RefinedNumberUtils.RemoveNonZeroBrandKey<
    TsVerifiedInternals.RefinedNumberUtils.ToInt<ElementType>
  >,
  Uint
>('=');

/**
 * Checks if a number is a PositiveFiniteNumber (a finite number > 0).
 * @param value The value to check.
 * @returns `true` if the value is a PositiveFiniteNumber, `false` otherwise.
 */
export const isPositiveFiniteNumber = is;

/**
 * Casts a number to a PositiveFiniteNumber type.
 * @param value The value to cast.
 * @returns The value as a PositiveFiniteNumber type.
 * @throws {TypeError} If the value is not a positive finite number.
 * @example
 * ```typescript
 * const x = asPositiveFiniteNumber(5.5); // PositiveFiniteNumber
 * const y = asPositiveFiniteNumber(0.001); // PositiveFiniteNumber
 * // asPositiveFiniteNumber(0); // throws TypeError
 * // asPositiveFiniteNumber(-1); // throws TypeError
 * ```
 */
export const asPositiveFiniteNumber = castTo;

export const PositiveFiniteNumber = {
  is,

  /** `Number.MIN_VALUE` */
  MIN_VALUE,

  min: min_,
  max: max_,
  clamp,

  floor,
  ceil,
  round,
  random,

  /** @returns `a ** b`, but greater than 0 */
  pow,

  /** @returns `a + b`, but greater than 0 */
  add,

  /** @returns `a - b`, but greater than 0 */
  sub,

  /** @returns `a * b`, but greater than 0 */
  mul,

  /** @returns `a / b`, but greater than 0 */
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
    keyof typeof PositiveFiniteNumber,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'positive'
    >
  >('=');

  expectType<
    typeof PositiveFiniteNumber,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<ElementType, 'positive'>
  >('<=');
}
