import { expectType } from '../../expect-type.mjs';
import {
  asNonZeroSafeInt,
  isNonZeroSafeInt,
  NonZeroSafeInt,
} from './non-zero-safe-int.mjs';

describe('NonZeroSafeInt', () => {
  describe('asNonZeroSafeInt', () => {
    test('accepts valid non-zero safe integers', () => {
      expect(() => asNonZeroSafeInt(1)).not.toThrow();
      expect(() => asNonZeroSafeInt(-1)).not.toThrow();
      expect(() => asNonZeroSafeInt(42)).not.toThrow();
      expect(() => asNonZeroSafeInt(-42)).not.toThrow();
      expect(() => asNonZeroSafeInt(Number.MAX_SAFE_INTEGER)).not.toThrow();
      expect(() => asNonZeroSafeInt(Number.MIN_SAFE_INTEGER)).not.toThrow();
    });

    test('rejects zero', () => {
      expect(() => asNonZeroSafeInt(0)).toThrow(TypeError);
      expect(() => asNonZeroSafeInt(-0)).toThrow(TypeError);
    });

    test('rejects values outside safe integer range', () => {
      expect(() => asNonZeroSafeInt(Number.MAX_SAFE_INTEGER + 1)).toThrow(
        TypeError,
      );
      expect(() => asNonZeroSafeInt(Number.MIN_SAFE_INTEGER - 1)).toThrow(
        TypeError,
      );
      expect(() => asNonZeroSafeInt(Number.MAX_VALUE)).toThrow(TypeError);
      expect(() => asNonZeroSafeInt(-Number.MAX_VALUE)).toThrow(TypeError);
    });

    test('rejects non-integers', () => {
      expect(() => asNonZeroSafeInt(Number.NaN)).toThrow(TypeError);
      expect(() => asNonZeroSafeInt(Number.POSITIVE_INFINITY)).toThrow(
        TypeError,
      );
      expect(() => asNonZeroSafeInt(Number.NEGATIVE_INFINITY)).toThrow(
        TypeError,
      );
      expect(() => asNonZeroSafeInt(1.2)).toThrow(TypeError);
      expect(() => asNonZeroSafeInt(-3.4)).toThrow(TypeError);
    });

    test('returns the same value for valid inputs', () => {
      expect(asNonZeroSafeInt(5)).toBe(5);
      expect(asNonZeroSafeInt(-10)).toBe(-10);
      expect(asNonZeroSafeInt(1)).toBe(1);
    });
  });

  describe('isNonZeroSafeInt', () => {
    test('correctly identifies non-zero safe integers', () => {
      expect(isNonZeroSafeInt(1)).toBe(true);
      expect(isNonZeroSafeInt(-1)).toBe(true);
      expect(isNonZeroSafeInt(42)).toBe(true);
      expect(isNonZeroSafeInt(-42)).toBe(true);
      expect(isNonZeroSafeInt(Number.MAX_SAFE_INTEGER)).toBe(true);
      expect(isNonZeroSafeInt(Number.MIN_SAFE_INTEGER)).toBe(true);
    });

    test('correctly identifies zero', () => {
      expect(isNonZeroSafeInt(0)).toBe(false);
      expect(isNonZeroSafeInt(-0)).toBe(false);
    });

    test('correctly identifies values outside safe integer range', () => {
      expect(isNonZeroSafeInt(Number.MAX_SAFE_INTEGER + 1)).toBe(false);
      expect(isNonZeroSafeInt(Number.MIN_SAFE_INTEGER - 1)).toBe(false);
      expect(isNonZeroSafeInt(Number.MAX_VALUE)).toBe(false);
      expect(isNonZeroSafeInt(-Number.MAX_VALUE)).toBe(false);
    });

    test('correctly identifies non-integers', () => {
      expect(isNonZeroSafeInt(Number.NaN)).toBe(false);
      expect(isNonZeroSafeInt(Number.POSITIVE_INFINITY)).toBe(false);
      expect(isNonZeroSafeInt(Number.NEGATIVE_INFINITY)).toBe(false);
      expect(isNonZeroSafeInt(1.2)).toBe(false);
      expect(isNonZeroSafeInt(-3.4)).toBe(false);
    });
  });

  describe('NonZeroSafeInt.is', () => {
    test('same as isNonZeroSafeInt function', () => {
      expect(NonZeroSafeInt.is(5)).toBe(isNonZeroSafeInt(5));
      expect(NonZeroSafeInt.is(0)).toBe(isNonZeroSafeInt(0));
      expect(NonZeroSafeInt.is(-10)).toBe(isNonZeroSafeInt(-10));
    });
  });

  describe('constants', () => {
    test('MIN_VALUE and MAX_VALUE', () => {
      expect(NonZeroSafeInt.MIN_VALUE).toBe(Number.MIN_SAFE_INTEGER);
      expect(NonZeroSafeInt.MAX_VALUE).toBe(Number.MAX_SAFE_INTEGER);
    });
  });

  describe('mathematical operations', () => {
    const a = asNonZeroSafeInt(5);
    const b = asNonZeroSafeInt(2);
    const c = asNonZeroSafeInt(-3);

    test('abs', () => {
      expect(NonZeroSafeInt.abs(a)).toBe(5);
      expect(NonZeroSafeInt.abs(c)).toBe(3);
      expect(NonZeroSafeInt.abs(asNonZeroSafeInt(-1))).toBe(1);
    });

    test('min and max', () => {
      expect(NonZeroSafeInt.min(a, b)).toBe(2);
      expect(NonZeroSafeInt.max(a, b)).toBe(5);
      expect(NonZeroSafeInt.min(a, c)).toBe(-3);
      expect(NonZeroSafeInt.max(a, c)).toBe(5);
    });

    test('add (with clamping to safe integer range)', () => {
      const largeValue = asNonZeroSafeInt(Number.MAX_SAFE_INTEGER - 1);
      const result = NonZeroSafeInt.add(largeValue, asNonZeroSafeInt(10));
      expect(result).toBe(Number.MAX_SAFE_INTEGER); // clamped to max
      expect(NonZeroSafeInt.add(a, b)).toBe(7);
    });

    test('sub (with clamping to safe integer range)', () => {
      const smallValue = asNonZeroSafeInt(Number.MIN_SAFE_INTEGER + 1);
      const result = NonZeroSafeInt.sub(smallValue, asNonZeroSafeInt(10));
      expect(result).toBe(Number.MIN_SAFE_INTEGER); // clamped to min
      expect(NonZeroSafeInt.sub(a, b)).toBe(3);
    });

    test('mul (with clamping to safe integer range)', () => {
      const largeValue = asNonZeroSafeInt(
        Math.floor(Math.sqrt(Number.MAX_SAFE_INTEGER)),
      );
      const result = NonZeroSafeInt.mul(largeValue, largeValue);
      expect(result).toBeLessThanOrEqual(Number.MAX_SAFE_INTEGER);
      expect(
        NonZeroSafeInt.mul(asNonZeroSafeInt(10), asNonZeroSafeInt(5)),
      ).toBe(50);
    });

    test('div (floor division with clamping)', () => {
      expect(NonZeroSafeInt.div(a, b)).toBe(2);
      expect(NonZeroSafeInt.div(asNonZeroSafeInt(7), asNonZeroSafeInt(3))).toBe(
        2,
      );
      expect(
        NonZeroSafeInt.div(asNonZeroSafeInt(-7), asNonZeroSafeInt(3)),
      ).toBe(-3);
    });

    test('pow (with clamping to safe integer range)', () => {
      const result = NonZeroSafeInt.pow(
        asNonZeroSafeInt(1000),
        asNonZeroSafeInt(10),
      );
      expect(result).toBe(Number.MAX_SAFE_INTEGER); // clamped to max
      expect(NonZeroSafeInt.pow(asNonZeroSafeInt(2), asNonZeroSafeInt(3))).toBe(
        8,
      );
    });
  });

  describe('random', () => {
    test('generates non-zero safe integers within specified range (positive range)', () => {
      const min = 1;
      const max = 20;

      for (let i = 0; i < 10; i++) {
        const result = NonZeroSafeInt.random(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(NonZeroSafeInt.is(result)).toBe(true);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).not.toBe(0);
      }
    });

    test('generates non-zero safe integers within specified range (negative range)', () => {
      const min = -20;
      const max = -1;

      for (let i = 0; i < 10; i++) {
        const result = NonZeroSafeInt.random(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(NonZeroSafeInt.is(result)).toBe(true);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).not.toBe(0);
      }
    });

    test('generates non-zero safe integers within range that spans zero', () => {
      const min = -5;
      const max = 5;

      for (let i = 0; i < 10; i++) {
        const result = NonZeroSafeInt.random(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(NonZeroSafeInt.is(result)).toBe(true);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).not.toBe(0);
      }
    });
  });

  describe('type assertions', () => {
    test('type relationships', () => {
      expectType<NonZeroSafeInt, number>('<=');
      expectType<number, NonZeroSafeInt>('>=');

      const _value = asNonZeroSafeInt(5);
      expectType<typeof _value, NonZeroSafeInt>('<=');
    });
  });
});
