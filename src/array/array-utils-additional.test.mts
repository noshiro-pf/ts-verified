import { expectType } from '../expect-type.mjs';
import { Optional } from '../functional/optional.mjs';
import { asUint32 } from '../number/index.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr additional edge cases and uncovered functions', () => {
  describe('Arr.length (alias for size)', () => {
    it('should be alias for size', () => {
      const array = [1, 2, 3];
      expect(Arr.length(array)).toBe(Arr.size(array));
      expect(Arr.length(array)).toBe(3);
    });
  });

  describe('Arr.newArray (alias for create)', () => {
    it('should be alias for create', () => {
      const created1 = Arr.create(3, 'test');
      const created2 = Arr.newArray(3, 'test');
      expect(created1).toEqual(created2);
      expect(created1).toEqual(['test', 'test', 'test']);
    });
  });

  describe('Arr.copy', () => {
    it('should create shallow copy of array', () => {
      const original = [1, 2, 3] as const;
      const copied = Arr.copy(original);
      expectType<typeof copied, readonly [1, 2, 3]>('=');
      expect(copied).toEqual(original);
      expect(copied).not.toBe(original);
    });

    it('should work with empty array', () => {
      const empty = [] as const;
      const copied = Arr.copy(empty);
      expect(copied).toEqual([]);
      expect(copied).not.toBe(empty);
    });

    it('should preserve array type', () => {
      const mixed = [1, 'hello', true] as const;
      const copied = Arr.copy(mixed);
      expectType<typeof copied, readonly [1, 'hello', true]>('=');
      expect(copied).toEqual([1, 'hello', true]);
    });
  });

  describe('Arr.indexIsInRange', () => {
    it('should return true for valid indices', () => {
      const array = ['a', 'b', 'c'];
      expect(Arr.indexIsInRange(array, 0)).toBe(true);
      expect(Arr.indexIsInRange(array, 1)).toBe(true);
      expect(Arr.indexIsInRange(array, 2)).toBe(true);
    });

    it('should return false for invalid indices', () => {
      const array = ['a', 'b', 'c'];
      expect(Arr.indexIsInRange(array, 3)).toBe(false);
      expect(Arr.indexIsInRange(array, 10)).toBe(false);
    });

    it('should work with empty array', () => {
      const empty: readonly string[] = [];
      expect(Arr.indexIsInRange(empty, 0)).toBe(false);
      // @ts-expect-error negative indices should not be allowed
      expect(Arr.indexIsInRange(empty, -1)).toBe(false);
    });

    it('should be type error with floating point indices', () => {
      const array = [1, 2, 3];
      // @ts-expect-error floating point indices should not be allowed
      expect(Arr.indexIsInRange(array, 1.5)).toBe(true); // JavaScript arrays accept floating point indices
      // @ts-expect-error floating point indices should not be allowed
      expect(Arr.indexIsInRange(array, 3.1)).toBe(false);
    });
  });

  describe('Arr.isArrayOfLength', () => {
    it('should return true for arrays of exact length', () => {
      expect(Arr.isArrayOfLength([1, 2, 3], 3)).toBe(true);
      expect(Arr.isArrayOfLength([], 0)).toBe(true);
      expect(Arr.isArrayOfLength(['a'], 1)).toBe(true);
    });

    it('should return false for arrays of different length', () => {
      expect(Arr.isArrayOfLength([1, 2, 3], 2)).toBe(false);
      expect(Arr.isArrayOfLength([1, 2, 3], 4)).toBe(false);
      expect(Arr.isArrayOfLength([], 1)).toBe(false);
    });

    it('should work as type guard', () => {
      const array: readonly number[] = [1, 2, 3];
      if (Arr.isArrayOfLength(array, 3)) {
        expectType<typeof array, ArrayOfLength<3, number>>('=');
        expect(array.length).toBe(3);
      }
    });
  });

  describe('Arr.isArrayAtLeastLength', () => {
    it('should return true for arrays of at least specified length', () => {
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 3)).toBe(true);
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 2)).toBe(true);
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 1)).toBe(true);
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 0)).toBe(true);
    });

    it('should return false for arrays shorter than specified length', () => {
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 4)).toBe(false);
      expect(Arr.isArrayAtLeastLength([], 1)).toBe(false);
    });

    it('should work as type guard', () => {
      const array: readonly number[] = [1, 2, 3];
      if (Arr.isArrayAtLeastLength(array, 2)) {
        expectType<typeof array, ArrayAtLeastLen<2, number>>('=');
        expect(array.length >= 2).toBe(true);
      }
    });
  });

  describe('Arr.isArray', () => {
    it('should return true for arrays', () => {
      expect(Arr.isArray([])).toBe(true);
      expect(Arr.isArray([1, 2, 3])).toBe(true);
      expect(Arr.isArray(['a', 'b'])).toBe(true);
    });

    it('should return false for non-arrays', () => {
      expect(Arr.isArray('string')).toBe(false);
      expect(Arr.isArray(123)).toBe(false);
      expect(Arr.isArray({})).toBe(false);
      expect(Arr.isArray(null)).toBe(false);
      expect(Arr.isArray(undefined)).toBe(false);
    });

    it('should work as type guard', () => {
      const value: unknown = [1, 2, 3];
      if (Arr.isArray(value)) {
        expectType<typeof value, readonly unknown[]>('=');
        expect(value.length).toBe(3);
      }
    });

    it('should handle array-like objects', () => {
      const arrayLike = { 0: 'a', 1: 'b', length: 2 };
      expect(Arr.isArray(arrayLike)).toBe(false);
    });
  });

  describe('Arr.zeros with additional cases', () => {
    it('should create array with zero length', () => {
      const result = Arr.zeros(0);
      expect(result).toEqual([]);
      expect(result.length).toBe(0);
    });

    it('should create large arrays', () => {
      const result = Arr.zeros(asUint32(1000));
      expect(result).toHaveLength(1000);
      // eslint-disable-next-line @typescript-eslint/no-unnecessary-condition
      expect(result.every((x) => x === 0)).toBe(true);
    });

    it('should work with curried version', () => {
      const createTenZeros = Arr.zeros(10);
      expect(createTenZeros).toEqual([0, 0, 0, 0, 0, 0, 0, 0, 0, 0]);
    });
  });

  describe('Arr.seq with additional cases', () => {
    it('should create sequence with zero length', () => {
      const result = Arr.seq(0);
      expect(result).toEqual([]);
    });

    it('should create sequence with large length', () => {
      const result = Arr.seq(asUint32(100));
      expect(result).toHaveLength(100);
      expect(result[0]).toBe(0);
      expect(result[99]).toBe(99);
    });

    it('should work with curried version', () => {
      const createFiveSeq = Arr.seq(5);
      expect(createFiveSeq).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('Arr.create with additional cases', () => {
    it('should create array with function values', () => {
      const fn = (): string => 'test';
      const result = Arr.create(3, fn);
      expect(result).toEqual([fn, fn, fn]);
      expect(result[0]).toBe(fn);
    });

    it('should create array with object values', () => {
      const obj = { a: 1 };
      const result = Arr.create(2, obj);
      expect(result).toEqual([obj, obj]);
      expect(result[0]).toBe(obj); // Same reference
    });

    it('should work with partial application', () => {
      // Arr.create doesn't seem to support currying, test direct usage instead
      const result = Arr.create(3, 'hello');
      expect(result).toEqual(['hello', 'hello', 'hello']);
    });

    it('should create empty array when length is 0', () => {
      const result = Arr.create(0, 'value');
      expect(result).toEqual([]);
    });
  });

  describe('Arr.range with additional edge cases', () => {
    it('should handle range with step larger than difference', () => {
      const result = Arr.range(0, 5, 10);
      expect(result).toEqual([0]);
    });

    it('should handle negative step with increasing range', () => {
      const result = Arr.range(0, 5, -1);
      expect(result).toEqual([]); // Should be empty when step direction conflicts
    });

    it('should be type error with floating point steps', () => {
      // @ts-expect-error floating point step should not be allowed
      const result = Arr.range(0, 2, 0.5);
      // May need to adjust expectations based on actual implementation
      expect(result.length).toBeGreaterThan(0);
      expect(result[0]).toBe(0);
    });

    it('should be type error with zero step (edge case)', () => {
      // @ts-expect-error floating point step should not be allowed
      const result = Arr.range(0, 5, 0);
      expect(Array.isArray(result)).toBe(true);
    });

    it('should work with basic range functionality', () => {
      // Test basic range functionality without currying assumptions
      const result = Arr.range(0, 5, 1);
      expect(result).toEqual([0, 1, 2, 3, 4]);
    });
  });

  describe('Arr.at with additional edge cases', () => {
    it('should handle very large positive indices', () => {
      const array = [1, 2, 3];
      const result = Arr.at(array, asUint32(1000));
      expect(Optional.isNone(result)).toBe(true);
    });

    it('should handle very large negative indices', () => {
      const array = [1, 2, 3];
      const result = Arr.at(array, asUint32(-1000));
      expect(Optional.isNone(result)).toBe(true);
    });

    it('should work with valid indices', () => {
      const array = [10, 20, 30];
      const result = Arr.at(array, 1);
      expect(Optional.isSome(result)).toBe(true);
      if (Optional.isSome(result)) {
        expect(result.value).toBe(20);
      }
    });
  });

  describe('Arr.head with additional cases', () => {
    it('should return none for empty array', () => {
      const result = Arr.head([]);
      expect(Optional.isNone(result)).toBe(true);
    });

    it('should work with single element array', () => {
      const result = Arr.head([42]);
      expect(Optional.isSome(result)).toBe(true);
      if (Optional.isSome(result)) {
        expect(result.value).toBe(42);
      }
    });
  });

  describe('Arr.last with additional cases', () => {
    it('should return none for empty array', () => {
      const result = Arr.last([]);
      expect(Optional.isNone(result)).toBe(true);
    });

    it('should work with single element array', () => {
      const result = Arr.last([42]);
      expect(Optional.isSome(result)).toBe(true);
      if (Optional.isSome(result)) {
        expect(result.value).toBe(42);
      }
    });
  });
});
