import { expectType } from '../../expect-type.mjs';
import {
  asNonZeroInt16,
  isNonZeroInt16,
  NonZeroInt16,
} from './non-zero-int16.mjs';

describe('NonZeroInt16', () => {
  describe('asNonZeroInt16', () => {
    test('accepts valid non-zero int16 values', () => {
      expect(() => asNonZeroInt16(1)).not.toThrow();
      expect(() => asNonZeroInt16(-1)).not.toThrow();
      expect(() => asNonZeroInt16(32767)).not.toThrow(); // 2^15 - 1
      expect(() => asNonZeroInt16(-32768)).not.toThrow(); // -2^15
    });

    test('rejects zero', () => {
      expect(() => asNonZeroInt16(0)).toThrow(TypeError);
    });

    test('rejects values outside int16 range', () => {
      expect(() => asNonZeroInt16(32768)).toThrow(TypeError); // 2^15
      expect(() => asNonZeroInt16(-32769)).toThrow(TypeError); // -2^15 - 1
      expect(() => asNonZeroInt16(65536)).toThrow(TypeError);
      expect(() => asNonZeroInt16(-65536)).toThrow(TypeError);
    });

    test('rejects non-integers', () => {
      expect(() => asNonZeroInt16(Number.NaN)).toThrow(TypeError);
      expect(() => asNonZeroInt16(Number.POSITIVE_INFINITY)).toThrow(TypeError);
      expect(() => asNonZeroInt16(Number.NEGATIVE_INFINITY)).toThrow(TypeError);
      expect(() => asNonZeroInt16(1.2)).toThrow(TypeError);
      expect(() => asNonZeroInt16(-3.4)).toThrow(TypeError);
    });

    test('returns the same value for valid inputs', () => {
      expect(asNonZeroInt16(5)).toBe(5);
      expect(asNonZeroInt16(-10)).toBe(-10);
      expect(asNonZeroInt16(32767)).toBe(32767);
      expect(asNonZeroInt16(-32768)).toBe(-32768);
    });
  });

  describe('isNonZeroInt16', () => {
    test('correctly identifies non-zero int16 values', () => {
      expect(isNonZeroInt16(1)).toBe(true);
      expect(isNonZeroInt16(-1)).toBe(true);
      expect(isNonZeroInt16(32767)).toBe(true);
      expect(isNonZeroInt16(-32768)).toBe(true);
    });

    test('correctly identifies zero', () => {
      expect(isNonZeroInt16(0)).toBe(false);
    });

    test('correctly identifies values outside int16 range', () => {
      expect(isNonZeroInt16(32768)).toBe(false);
      expect(isNonZeroInt16(-32769)).toBe(false);
      expect(isNonZeroInt16(65536)).toBe(false);
      expect(isNonZeroInt16(-65536)).toBe(false);
    });

    test('correctly identifies non-integers', () => {
      expect(isNonZeroInt16(Number.NaN)).toBe(false);
      expect(isNonZeroInt16(Number.POSITIVE_INFINITY)).toBe(false);
      expect(isNonZeroInt16(Number.NEGATIVE_INFINITY)).toBe(false);
      expect(isNonZeroInt16(1.2)).toBe(false);
      expect(isNonZeroInt16(-3.4)).toBe(false);
    });
  });

  describe('NonZeroInt16.is', () => {
    test('same as isNonZeroInt16 function', () => {
      expect(NonZeroInt16.is(5)).toBe(isNonZeroInt16(5));
      expect(NonZeroInt16.is(0)).toBe(isNonZeroInt16(0));
      expect(NonZeroInt16.is(-1)).toBe(isNonZeroInt16(-1));
    });
  });

  describe('constants', () => {
    test('MIN_VALUE and MAX_VALUE', () => {
      expect(NonZeroInt16.MIN_VALUE).toBe(-32768);
      expect(NonZeroInt16.MAX_VALUE).toBe(32767);
    });
  });

  describe('mathematical operations', () => {
    const a = asNonZeroInt16(100);
    const b = asNonZeroInt16(50);
    const c = asNonZeroInt16(-30);

    test('abs', () => {
      expect(NonZeroInt16.abs(a)).toBe(100);
      expect(NonZeroInt16.abs(c)).toBe(30);
    });

    test('min and max', () => {
      expect(NonZeroInt16.min(a, b)).toBe(50);
      expect(NonZeroInt16.max(a, b)).toBe(100);
      expect(NonZeroInt16.min(a, c)).toBe(-30);
      expect(NonZeroInt16.max(a, c)).toBe(100);
    });

    test('add (with clamping)', () => {
      const result = NonZeroInt16.add(
        asNonZeroInt16(32000),
        asNonZeroInt16(1000),
      );
      expect(result).toBe(32767); // clamped to max
      expect(NonZeroInt16.add(a, b)).toBe(150);
    });

    test('sub (with clamping)', () => {
      const result = NonZeroInt16.sub(
        asNonZeroInt16(-32000),
        asNonZeroInt16(1000),
      );
      expect(result).toBe(-32768); // clamped to min
      expect(NonZeroInt16.sub(a, b)).toBe(50);
    });

    test('mul (with clamping)', () => {
      const result = NonZeroInt16.mul(
        asNonZeroInt16(1000),
        asNonZeroInt16(100),
      );
      expect(result).toBe(32767); // clamped to max
      expect(NonZeroInt16.mul(asNonZeroInt16(10), asNonZeroInt16(5))).toBe(50);
    });

    test('div (floor division with clamping)', () => {
      expect(NonZeroInt16.div(a, asNonZeroInt16(50))).toBe(2);
      expect(NonZeroInt16.div(asNonZeroInt16(7), asNonZeroInt16(3))).toBe(2);
      expect(NonZeroInt16.div(asNonZeroInt16(-7), asNonZeroInt16(3))).toBe(-3);
    });

    test('pow (with clamping)', () => {
      const result = NonZeroInt16.pow(asNonZeroInt16(200), asNonZeroInt16(3));
      expect(result).toBe(32767); // clamped to max
      expect(NonZeroInt16.pow(asNonZeroInt16(2), asNonZeroInt16(3))).toBe(8);
    });
  });

  describe('random', () => {
    test('generates non-zero int16 values within specified range', () => {
      const min = -10;
      const max = 10;

      for (let i = 0; i < 10; i++) {
        const result = NonZeroInt16.random(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(NonZeroInt16.is(result)).toBe(true);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).not.toBe(0);
      }
    });

    test('generates values within NonZeroInt16 range', () => {
      for (let i = 0; i < 10; i++) {
        const result = NonZeroInt16.random(-20, 20);
        expect(result).toBeGreaterThanOrEqual(-32768);
        expect(result).toBeLessThanOrEqual(32767);
      }
    });
  });

  describe('type assertions', () => {
    test('type relationships', () => {
      expectType<NonZeroInt16, number>('<=');
      expectType<number, NonZeroInt16>('>=');

      const _value = asNonZeroInt16(100);
      expectType<typeof _value, NonZeroInt16>('<=');
    });
  });
});
