import { expectType } from '../../expect-type.mjs';
import { TsVerifiedInternals } from '../refined-number-utils.mjs';

type ElementType = NonZeroUint32;
const typeName = 'NonZeroUint32';
const typeNameInMessage = 'a non-zero integer in [1, 2^32)';

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
  randomNonZero: random,
  is,
  castTo,
  clamp,
} = TsVerifiedInternals.RefinedNumberUtils.operatorsForInteger<
  ElementType,
  1,
  number
>({
  integerOrSafeInteger: 'SafeInteger',
  nonZero: true,
  MIN_VALUE: 1,
  MAX_VALUE: 2 ** 32 - 1,
  typeNameInMessage,
} as const);

/**
 * Checks if a number is a NonZeroUint32 (32-bit non-zero unsigned integer in the range [1, 2^32)).
 * @param value The value to check.
 * @returns `true` if the value is a NonZeroUint32, `false` otherwise.
 */
export const isNonZeroUint32 = is;

/**
 * Casts a number to a NonZeroUint32 type.
 * @param value The value to cast.
 * @returns The value as a NonZeroUint32 type.
 * @throws {TypeError} If the value is not a non-zero integer in [1, 2^32).
 * @example
 * ```typescript
 * const x = asNonZeroUint32(1000); // NonZeroUint32
 * const y = asNonZeroUint32(4294967295); // NonZeroUint32
 * // asNonZeroUint32(0); // throws TypeError
 * // asNonZeroUint32(-1); // throws TypeError
 * // asNonZeroUint32(4294967296); // throws TypeError
 * ```
 */
export const asNonZeroUint32 = castTo;

export const NonZeroUint32 = {
  is,

  /** `1` */
  MIN_VALUE,

  /** `2^32 - 1` */
  MAX_VALUE,

  min: min_,
  max: max_,
  clamp,

  random,

  /** @returns `a ** b`, but clamped to `[1, 2^32)` */
  pow,

  /** @returns `a + b`, but clamped to `[1, 2^32)` */
  add,

  /** @returns `a - b`, but clamped to `[1, 2^32)` */
  sub,

  /** @returns `a * b`, but clamped to `[1, 2^32)` */
  mul,

  /** @returns `⌊a / b⌋`, but clamped to `[1, 2^32)` */
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
    { name: '4294967296', value: 4294967296 },
  ] as const)(`to${typeName}($name) should throw a TypeError`, ({ value }) => {
    expect(() => castTo(value)).toThrow(
      new TypeError(`Expected ${typeNameInMessage}, got: ${value}`),
    );
  });

  test(`${typeName}.random`, () => {
    const min = 1;
    const max = 10;
    const result = random(min, max);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(result).not.toBe(0);
  });

  expectType<
    keyof typeof NonZeroUint32,
    keyof TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('=');
  expectType<
    typeof NonZeroUint32,
    TsVerifiedInternals.RefinedNumberUtils.NumberClass<
      ElementType,
      'int' | 'positive' | 'range'
    >
  >('<=');
}
