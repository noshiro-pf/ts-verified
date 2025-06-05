import { expectType } from '../../expect-type.mjs';
import { asInt16, Int16, isInt16 } from './int16.mjs';
import { asNonZeroInt16 } from './non-zero-int16.mjs';

describe('Int16', () => {
  describe('asInt16', () => {
    test('accepts valid int16 values', () => {
      expect(() => asInt16(0)).not.toThrow();
      expect(() => asInt16(1)).not.toThrow();
      expect(() => asInt16(-1)).not.toThrow();
      expect(() => asInt16(32767)).not.toThrow(); // 2^15 - 1
      expect(() => asInt16(-32768)).not.toThrow(); // -2^15
    });

    test('rejects values outside int16 range', () => {
      expect(() => asInt16(32768)).toThrow(TypeError); // 2^15
      expect(() => asInt16(-32769)).toThrow(TypeError); // -2^15 - 1
      expect(() => asInt16(65536)).toThrow(TypeError);
      expect(() => asInt16(-65536)).toThrow(TypeError);
    });

    test('rejects non-integers', () => {
      expect(() => asInt16(Number.NaN)).toThrow(TypeError);
      expect(() => asInt16(Number.POSITIVE_INFINITY)).toThrow(TypeError);
      expect(() => asInt16(Number.NEGATIVE_INFINITY)).toThrow(TypeError);
      expect(() => asInt16(1.2)).toThrow(TypeError);
      expect(() => asInt16(-3.4)).toThrow(TypeError);
    });

    test('returns the same value for valid inputs', () => {
      expect(asInt16(5)).toBe(5);
      expect(asInt16(-10)).toBe(-10);
      expect(asInt16(0)).toBe(0);
      expect(asInt16(32767)).toBe(32767);
      expect(asInt16(-32768)).toBe(-32768);
    });
  });

  describe('isInt16', () => {
    test('correctly identifies int16 values', () => {
      expect(isInt16(0)).toBe(true);
      expect(isInt16(1)).toBe(true);
      expect(isInt16(-1)).toBe(true);
      expect(isInt16(32767)).toBe(true);
      expect(isInt16(-32768)).toBe(true);
    });

    test('correctly identifies values outside int16 range', () => {
      expect(isInt16(32768)).toBe(false);
      expect(isInt16(-32769)).toBe(false);
      expect(isInt16(65536)).toBe(false);
      expect(isInt16(-65536)).toBe(false);
    });

    test('correctly identifies non-integers', () => {
      expect(isInt16(Number.NaN)).toBe(false);
      expect(isInt16(Number.POSITIVE_INFINITY)).toBe(false);
      expect(isInt16(Number.NEGATIVE_INFINITY)).toBe(false);
      expect(isInt16(1.2)).toBe(false);
      expect(isInt16(-3.4)).toBe(false);
    });
  });

  describe('Int16.is', () => {
    test('same as isInt16 function', () => {
      expect(Int16.is(5)).toBe(isInt16(5));
      expect(Int16.is(32768)).toBe(isInt16(32768));
      expect(Int16.is(-32769)).toBe(isInt16(-32769));
    });
  });

  describe('constants', () => {
    test('MIN_VALUE and MAX_VALUE', () => {
      expect(Int16.MIN_VALUE).toBe(-32768);
      expect(Int16.MAX_VALUE).toBe(32767);
    });
  });

  describe('mathematical operations', () => {
    const a = asInt16(100);
    const b = asInt16(50);
    const c = asInt16(-30);

    test('abs', () => {
      expect(Int16.abs(a)).toBe(100);
      expect(Int16.abs(c)).toBe(30);
      expect(Int16.abs(asInt16(0))).toBe(0);
    });

    test('min and max', () => {
      expect(Int16.min(a, b)).toBe(50);
      expect(Int16.max(a, b)).toBe(100);
      expect(Int16.min(a, c)).toBe(-30);
      expect(Int16.max(a, c)).toBe(100);
    });

    test('add (with clamping)', () => {
      const result = Int16.add(asInt16(32000), asInt16(1000));
      expect(result).toBe(32767); // clamped to max
      expect(Int16.add(a, b)).toBe(150);
    });

    test('sub (with clamping)', () => {
      const result = Int16.sub(asInt16(-32000), asInt16(1000));
      expect(result).toBe(-32768); // clamped to min
      expect(Int16.sub(a, b)).toBe(50);
    });

    test('mul (with clamping)', () => {
      const result = Int16.mul(asInt16(1000), asInt16(100));
      expect(result).toBe(32767); // clamped to max
      expect(Int16.mul(asInt16(10), asInt16(5))).toBe(50);
    });

    test('div (floor division with clamping)', () => {
      expect(Int16.div(a, asNonZeroInt16(50))).toBe(2);
      expect(Int16.div(asInt16(7), asNonZeroInt16(3))).toBe(2);
      expect(Int16.div(asInt16(-7), asNonZeroInt16(3))).toBe(-3);
    });

    test('pow (with clamping)', () => {
      const result = Int16.pow(asInt16(200), asInt16(3));
      expect(result).toBe(32767); // clamped to max
      expect(Int16.pow(asInt16(2), asInt16(3))).toBe(8);
    });
  });

  describe('random', () => {
    test('generates int16 values within specified range', () => {
      const min = -10;
      const max = 10;

      for (let i = 0; i < 10; i++) {
        const result = Int16.random(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(Int16.is(result)).toBe(true);
        expect(Number.isInteger(result)).toBe(true);
      }
    });

    test('generates values within Int16 range', () => {
      for (let i = 0; i < 10; i++) {
        const result = Int16.random(-20, 20);
        expect(result).toBeGreaterThanOrEqual(Int16.MIN_VALUE);
        expect(result).toBeLessThanOrEqual(Int16.MAX_VALUE);
      }
    });
  });

  describe('type assertions', () => {
    test('type relationships', () => {
      expectType<Int16, number>('<=');
      expectType<number, Int16>('>=');

      const _value = asInt16(100);
      expectType<typeof _value, Int16>('<=');
    });
  });
});
