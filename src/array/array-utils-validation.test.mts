import { expectType } from '../expect-type.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr', () => {
  describe('isArray', () => {
    test('should return true for arrays', () => {
      expect(Arr.isArray([1, 2, 3])).toBe(true);
      expect(Arr.isArray([])).toBe(true);
      expect(Arr.isArray(['a', 'b'])).toBe(true);
    });

    test('should return false for non-arrays', () => {
      expect(Arr.isArray('hello')).toBe(false);
      expect(Arr.isArray(123)).toBe(false);
      expect(Arr.isArray(null)).toBe(false);
      expect(Arr.isArray(undefined)).toBe(false);
      expect(Arr.isArray({})).toBe(false);
      expect(Arr.isArray(new Set())).toBe(false);
    });

    test('should refine union types correctly', () => {
      function processValue(value: string | readonly number[] | null): number {
        if (Arr.isArray(value)) {
          // value should be typed as number[]
          expectType<typeof value, readonly number[]>('=');
          return value.length;
        }
        return 0;
      }

      expect(processValue([1, 2, 3])).toBe(3);
      expect(processValue('hello')).toBe(0);
      expect(processValue(null)).toBe(0);
    });

    test('should work with readonly arrays', () => {
      const readonlyArray: readonly number[] = [1, 2, 3];
      if (Arr.isArray(readonlyArray)) {
        expectType<typeof readonlyArray, readonly number[]>('=');
        expect(readonlyArray.length).toBe(3);
      }
    });

    test('should work with mutable arrays', () => {
      const mutableArray: number[] = [1, 2, 3];
      if (Arr.isArray(mutableArray)) {
        expectType<typeof mutableArray, number[]>('=');
        expect(mutableArray.length).toBe(3);
      }
    });

    test('should exclude impossible array types from unions', () => {
      function checkUnion(
        value: string | boolean | readonly number[] | { readonly a: number },
      ): number {
        if (Arr.isArray(value)) {
          // Only number[] should remain
          expectType<typeof value, readonly number[]>('=');
          return value.length;
        }
        // Non-array types
        expectType<typeof value, string | boolean | { readonly a: number }>(
          '=',
        );
        return -1;
      }

      expect(checkUnion([1, 2])).toBe(2);
      expect(checkUnion('test')).toBe(-1);
      expect(checkUnion(true)).toBe(-1);
      expect(checkUnion({ a: 1 })).toBe(-1);
    });

    test('should exclude impossible array types from unions (including unknown)', () => {
      function checkUnion(
        value:
          | string
          | boolean
          | readonly number[]
          | { readonly a: number }
          // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
          | unknown
          // eslint-disable-next-line @typescript-eslint/no-restricted-types
          | object,
      ): number {
        if (Arr.isArray(value)) {
          // Only number[] should remain
          expectType<typeof value, readonly number[]>('=');
          return value.length;
        }
        // Non-array types
        expectType<typeof value, string | boolean | { readonly a: number }>(
          '=',
        );
        return -1;
      }

      expect(checkUnion([1, 2])).toBe(2);
      expect(checkUnion('test')).toBe(-1);
      expect(checkUnion(true)).toBe(-1);
      expect(checkUnion({ a: 1 })).toBe(-1);
    });
  });

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
