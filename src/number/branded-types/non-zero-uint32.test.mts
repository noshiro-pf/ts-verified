import { expectType } from '../../expect-type.mjs';
import {
  asNonZeroUint32,
  isNonZeroUint32,
  NonZeroUint32,
} from './non-zero-uint32.mjs';

describe('NonZeroUint32', () => {
  describe('asNonZeroUint32', () => {
    test('accepts valid non-zero uint32 values', () => {
      expect(() => asNonZeroUint32(1)).not.toThrow();
      expect(() => asNonZeroUint32(1000)).not.toThrow();
      expect(() => asNonZeroUint32(4294967295)).not.toThrow(); // 2^32 - 1
      expect(() => asNonZeroUint32(2147483648)).not.toThrow(); // 2^31
    });

    test('rejects zero', () => {
      expect(() => asNonZeroUint32(0)).toThrow(TypeError);
    });

    test('rejects values outside uint32 range', () => {
      expect(() => asNonZeroUint32(4294967296)).toThrow(TypeError); // 2^32
      expect(() => asNonZeroUint32(10000000000)).toThrow(TypeError);
    });

    test('rejects negative integers', () => {
      expect(() => asNonZeroUint32(-1)).toThrow(TypeError);
      expect(() => asNonZeroUint32(-42)).toThrow(TypeError);
    });

    test('rejects non-integers', () => {
      expect(() => asNonZeroUint32(Number.NaN)).toThrow(TypeError);
      expect(() => asNonZeroUint32(Number.POSITIVE_INFINITY)).toThrow(
        TypeError,
      );
      expect(() => asNonZeroUint32(Number.NEGATIVE_INFINITY)).toThrow(
        TypeError,
      );
      expect(() => asNonZeroUint32(1.2)).toThrow(TypeError);
      expect(() => asNonZeroUint32(-3.4)).toThrow(TypeError);
    });

    test('returns the same value for valid inputs', () => {
      expect(asNonZeroUint32(5)).toBe(5);
      expect(asNonZeroUint32(1)).toBe(1);
      expect(asNonZeroUint32(4294967295)).toBe(4294967295);
    });
  });

  describe('isNonZeroUint32', () => {
    test('correctly identifies non-zero uint32 values', () => {
      expect(isNonZeroUint32(1)).toBe(true);
      expect(isNonZeroUint32(1000)).toBe(true);
      expect(isNonZeroUint32(4294967295)).toBe(true);
      expect(isNonZeroUint32(2147483648)).toBe(true);
    });

    test('correctly identifies zero', () => {
      expect(isNonZeroUint32(0)).toBe(false);
    });

    test('correctly identifies values outside uint32 range', () => {
      expect(isNonZeroUint32(4294967296)).toBe(false);
      expect(isNonZeroUint32(10000000000)).toBe(false);
    });

    test('correctly identifies negative integers', () => {
      expect(isNonZeroUint32(-1)).toBe(false);
      expect(isNonZeroUint32(-42)).toBe(false);
    });

    test('correctly identifies non-integers', () => {
      expect(isNonZeroUint32(Number.NaN)).toBe(false);
      expect(isNonZeroUint32(Number.POSITIVE_INFINITY)).toBe(false);
      expect(isNonZeroUint32(Number.NEGATIVE_INFINITY)).toBe(false);
      expect(isNonZeroUint32(1.2)).toBe(false);
      expect(isNonZeroUint32(-3.4)).toBe(false);
    });
  });

  describe('NonZeroUint32.is', () => {
    test('same as isNonZeroUint32 function', () => {
      expect(NonZeroUint32.is(5)).toBe(isNonZeroUint32(5));
      expect(NonZeroUint32.is(0)).toBe(isNonZeroUint32(0));
      expect(NonZeroUint32.is(-1)).toBe(isNonZeroUint32(-1));
    });
  });

  describe('constants', () => {
    test('MIN_VALUE and MAX_VALUE', () => {
      expect(NonZeroUint32.MIN_VALUE).toBe(1);
      expect(NonZeroUint32.MAX_VALUE).toBe(4294967295);
    });
  });

  describe('mathematical operations', () => {
    const a = asNonZeroUint32(1000000);
    const b = asNonZeroUint32(500000);

    test('min and max', () => {
      expect(NonZeroUint32.min(a, b)).toBe(500000);
      expect(NonZeroUint32.max(a, b)).toBe(1000000);
    });

    test('add (with clamping to non-zero uint32 range)', () => {
      const result = NonZeroUint32.add(
        asNonZeroUint32(4294967000),
        asNonZeroUint32(1000),
      );
      expect(result).toBe(4294967295); // clamped to max
      expect(NonZeroUint32.add(a, b)).toBe(1500000);
    });

    test('sub (never goes below 1)', () => {
      expect(NonZeroUint32.sub(a, b)).toBe(500000);
      expect(NonZeroUint32.sub(b, a)).toBe(1); // clamped to 1
    });

    test('mul (with clamping to non-zero uint32 range)', () => {
      const result = NonZeroUint32.mul(
        asNonZeroUint32(100000),
        asNonZeroUint32(100000),
      );
      expect(result).toBe(4294967295); // clamped to max
      expect(NonZeroUint32.mul(asNonZeroUint32(1000), asNonZeroUint32(5))).toBe(
        5000,
      );
    });

    test('div (floor division, never goes below 1)', () => {
      expect(NonZeroUint32.div(a, asNonZeroUint32(500000))).toBe(2);
      expect(NonZeroUint32.div(asNonZeroUint32(7), asNonZeroUint32(3))).toBe(2);
      expect(
        NonZeroUint32.div(asNonZeroUint32(500000), asNonZeroUint32(1000000)),
      ).toBe(1); // floor(500000/1000000) = 0, clamped to 1
    });

    test('pow (with clamping to non-zero uint32 range)', () => {
      const result = NonZeroUint32.pow(
        asNonZeroUint32(10000),
        asNonZeroUint32(3),
      );
      expect(result).toBe(4294967295); // clamped to max
      expect(NonZeroUint32.pow(asNonZeroUint32(2), asNonZeroUint32(3))).toBe(8);
    });
  });

  describe('random', () => {
    test('generates non-zero uint32 values within specified range', () => {
      const min = 1;
      const max = 20;

      for (let i = 0; i < 10; i++) {
        const result = NonZeroUint32.random(min, max);
        expect(result).toBeGreaterThanOrEqual(min);
        expect(result).toBeLessThanOrEqual(max);
        expect(NonZeroUint32.is(result)).toBe(true);
        expect(Number.isInteger(result)).toBe(true);
        expect(result).not.toBe(0);
      }
    });

    test('generates values within NonZeroUint32 range', () => {
      for (let i = 0; i < 10; i++) {
        const result = NonZeroUint32.random(1, 30);
        expect(result).toBeGreaterThanOrEqual(1);
        expect(result).toBeLessThanOrEqual(4294967295);
      }
    });
  });

  describe('type assertions', () => {
    test('type relationships', () => {
      expectType<NonZeroUint32, number>('<=');
      expectType<number, NonZeroUint32>('>=');

      const _value = asNonZeroUint32(1000000);
      expectType<typeof _value, NonZeroUint32>('<=');
    });
  });
});
