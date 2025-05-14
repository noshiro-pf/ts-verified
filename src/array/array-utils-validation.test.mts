import { expectType } from '../expect-type.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr', () => {
  describe('isEmpty', () => {
    const xs = [1, 2, 3] as const;
    const result = Arr.isEmpty(xs);

    expectType<typeof result, boolean>('=');

    test('case 1', () => {
      expect(result).toBe(false);
    });

    test('case 2', () => {
      expect(Arr.isEmpty([])).toBe(true);
    });
  });

  describe('isNonEmpty', () => {
    const xs = [1, 2, 3] as const;
    const result = Arr.isNonEmpty(xs);

    expectType<typeof result, boolean>('=');

    test('case 1', () => {
      expect(result).toBe(true);
    });

    test('case 2', () => {
      expect(Arr.isNonEmpty([])).toBe(false);
    });
  });

  describe('isArrayOfLength', () => {
    test('should return true if array has specified length', () => {
      const arr = [1, 2, 3] as const;
      expect(Arr.isArrayOfLength(arr, 3)).toBe(true);
      if (Arr.isArrayOfLength(arr, 3)) {
        expectType<typeof arr, readonly [1, 2, 3]>('=');
      }
    });

    test('should return false if array does not have specified length', () => {
      const arr = [1, 2, 3] as const;
      expect(Arr.isArrayOfLength(arr, 2)).toBe(false);
    });

    test('should return true for empty array and length 0', () => {
      const arr = [] as const;
      expect(Arr.isArrayOfLength(arr, 0)).toBe(true);
      if (Arr.isArrayOfLength(arr, 0)) {
        expectType<typeof arr, readonly []>('=');
      }
    });

    test('should return false for non-empty array and length 0', () => {
      const arr = [1] as const;
      expect(Arr.isArrayOfLength(arr, 0)).toBe(false);
    });

    test('should work with unknown array type', () => {
      const arr: number[] = [1, 2];
      expect(Arr.isArrayOfLength(arr, 2)).toBe(true);
      if (Arr.isArrayOfLength(arr, 2)) {
        expectType<typeof arr, number[] & ArrayOfLength<2, number>>('=');
      }
      expect(Arr.isArrayOfLength(arr, 3)).toBe(false);
    });

    test('should work with unknown readonly array type', () => {
      const arr: readonly number[] = [1, 2];
      expect(Arr.isArrayOfLength(arr, 2)).toBe(true);
      if (Arr.isArrayOfLength(arr, 2)) {
        expectType<typeof arr, ArrayOfLength<2, number>>('=');
      }
      expect(Arr.isArrayOfLength(arr, 3)).toBe(false);
    });
  });

  describe('isArrayAtLeastLength', () => {
    test('should return true if array length is greater than or equal to specified length', () => {
      const arr = [1, 2, 3] as const;
      expect(Arr.isArrayAtLeastLength(arr, 3)).toBe(true);
      if (Arr.isArrayAtLeastLength(arr, 3)) {
        expectType<typeof arr, readonly [1, 2, 3]>('=');
      }
      expect(Arr.isArrayAtLeastLength(arr, 2)).toBe(true);
      if (Arr.isArrayAtLeastLength(arr, 2)) {
        expectType<typeof arr, readonly [1, 2, 3]>('=');
      }
    });

    test('should return false if array length is less than specified length', () => {
      const arr = [1, 2, 3] as const;
      expect(Arr.isArrayAtLeastLength(arr, 4)).toBe(false);
    });

    test('should return true for empty array and length 0', () => {
      const arr = [] as const;
      expect(Arr.isArrayAtLeastLength(arr, 0)).toBe(true);
      if (Arr.isArrayAtLeastLength(arr, 0)) {
        expectType<typeof arr, readonly []>('=');
      }
    });

    test('should return false for empty array and positive length', () => {
      const arr = [] as const;
      expect(Arr.isArrayAtLeastLength(arr, 1)).toBe(false);
    });

    test('should work with unknown array type', () => {
      const arr: number[] = [1, 2];
      expect(Arr.isArrayAtLeastLength(arr, 2)).toBe(true);
      if (Arr.isArrayAtLeastLength(arr, 2)) {
        expectType<typeof arr, number[] & ArrayAtLeastLen<2, number>>('=');
      }
      expect(Arr.isArrayAtLeastLength(arr, 1)).toBe(true);
      if (Arr.isArrayAtLeastLength(arr, 1)) {
        expectType<typeof arr, number[] & ArrayAtLeastLen<1, number>>('=');
      }
      expect(Arr.isArrayAtLeastLength(arr, 3)).toBe(false);
    });
  });
});
