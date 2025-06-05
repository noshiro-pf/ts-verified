import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = SafeInt;
const typeName = 'SafeInt';
const typeNameInMessage = 'a safe integer';

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
  random,
  is,
  castTo,
  clamp,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  SafeInt,
  SafeUint
>({
  integerOrSafeInteger: 'SafeInteger',
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MIN_VALUE: Number.MIN_SAFE_INTEGER as SafeInt,
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  MAX_VALUE: Number.MAX_SAFE_INTEGER as SafeUint,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a SafeInt.
 * @param value The value to check.
 * @returns `true` if the value is a SafeInt, `false` otherwise.
 */
export const isSafeInt = is;

/**
 * Casts a number to a SafeInt type.
 * @param value The value to cast.
 * @returns The value as a SafeInt type.
 * @throws {TypeError} If the value is not a safe integer.
 * @example
 * ```typescript
 * const x = asSafeInt(5); // SafeInt
 * const y = asSafeInt(-1000); // SafeInt
 * // asSafeInt(1.5); // throws TypeError
 * // asSafeInt(Number.MAX_SAFE_INTEGER + 1); // throws TypeError
 * ```
 */
export const asSafeInt = castTo;

export const SafeInt = {
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
    keyof typeof SafeInt,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('=');
  expectType<
    typeof SafeInt,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'range'
    >
  >('<=');
}
