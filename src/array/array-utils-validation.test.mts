import { expectType } from '../expect-type.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr validations', () => {
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
          expectType<typeof value, readonly unknown[]>('=');
          return value.length;
        }
        // Non-array types
        expectType<
          typeof value,
          | string
          | boolean
          | { readonly a: number }
          // eslint-disable-next-line @typescript-eslint/no-redundant-type-constituents
          | unknown
          // eslint-disable-next-line @typescript-eslint/no-restricted-types
          | object
        >('=');
        return -1;
      }

      expect(checkUnion([1, 2])).toBe(2);
      expect(checkUnion('test')).toBe(-1);
      expect(checkUnion(true)).toBe(-1);
      expect(checkUnion({ a: 1 })).toBe(-1);
    });

    test('should return true for arrays (additional)', () => {
      expect(Arr.isArray([])).toBe(true);
      expect(Arr.isArray([1, 2, 3])).toBe(true);
      expect(Arr.isArray(['a', 'b'])).toBe(true);
    });

    test('should return false for non-arrays (additional)', () => {
      expect(Arr.isArray('string')).toBe(false);
      expect(Arr.isArray(123)).toBe(false);
      expect(Arr.isArray({})).toBe(false);
      expect(Arr.isArray(null)).toBe(false);
      expect(Arr.isArray(undefined)).toBe(false);
    });

    test('should work as type guard (additional)', () => {
      const value: unknown = [1, 2, 3];
      if (Arr.isArray(value)) {
        expectType<typeof value, readonly unknown[]>('=');
        expect(value.length).toBe(3);
      }
    });

    test('should handle array-like objects', () => {
      const arrayLike = { 0: 'a', 1: 'b', length: 2 };
      expect(Arr.isArray(arrayLike)).toBe(false);
    });

    describe('comprehensive type guard tests', () => {
      test('should narrow unknown type to array', () => {
        const value: unknown = [1, 2, 3];
        if (Arr.isArray(value)) {
          expectType<typeof value, readonly unknown[]>('=');
        } else {
          expectType<typeof value, unknown>('=');
        }
      });

      test('should handle any type', () => {
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const value: any = [1, 2, 3];
        if (Arr.isArray(value)) {
          expectType<typeof value, readonly unknown[]>('=');
        }
      });

      test('should work with nested arrays', () => {
        const nested: readonly (readonly number[])[] = [[1], [2], [3]];
        if (Arr.isArray(nested)) {
          expectType<typeof nested, readonly (readonly number[])[]>('=');
        }
      });

      test('should distinguish between array and tuple types', () => {
        const tuple: readonly [1, 2, 3] = [1, 2, 3];
        if (Arr.isArray(tuple)) {
          expectType<typeof tuple, readonly [1, 2, 3]>('=');
        }
      });

      test('should work with empty tuple type', () => {
        const emptyTuple: readonly [] = [];
        if (Arr.isArray(emptyTuple)) {
          expectType<typeof emptyTuple, readonly []>('=');
        }
      });

      test('should handle union of array types', () => {
        type MixedArrayUnion =
          | readonly string[]
          | readonly number[]
          | readonly boolean[];
        const mixedArray: MixedArrayUnion = [1, 2, 3];
        if (Arr.isArray(mixedArray)) {
          expectType<typeof mixedArray, MixedArrayUnion>('<=');
        }
      });

      test('should work with generic function', () => {
        function processGeneric<T>(value: T | readonly number[]): number {
          if (Arr.isArray(value)) {
            // Type is narrowed to array type within this block
            return value.length;
          }
          return 0;
        }
        expect(processGeneric([1, 2, 3])).toBe(3);
        expect(processGeneric('hello')).toBe(0);
      });

      test('should handle never type correctly', () => {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        const neverValue = undefined as never;
        if (Arr.isArray(neverValue)) {
          expectType<typeof neverValue, never>('=');
        }
      });

      test('should work with conditional types', () => {
        type ArrayOrValue<T> = T extends readonly unknown[] ? T : readonly T[];
        function makeArray<T>(value: T): ArrayOrValue<T> {
          if (Arr.isArray(value)) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            return value as ArrayOrValue<T>;
          }
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          return [value] as ArrayOrValue<T>;
        }
        expect(makeArray([1, 2, 3])).toStrictEqual([1, 2, 3]);
        expect(makeArray(5)).toStrictEqual([5]);
      });

      test('should handle intersection types', () => {
        type TaggedArray = readonly number[] & { tag: string };
        const tagged = Object.assign([1, 2, 3], { tag: 'test' }) as TaggedArray;
        if (Arr.isArray(tagged)) {
          expectType<typeof tagged, TaggedArray>('=');
          expect(tagged.tag).toBe('test');
        }
      });

      test('should work with branded types', () => {
        type BrandedArray = readonly number[] & {
          readonly __brand: unique symbol;
        };
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        const branded = [1, 2, 3] as unknown as BrandedArray;
        if (Arr.isArray(branded)) {
          expectType<typeof branded, BrandedArray>('=');
        }
      });

      test('should handle complex union discrimination', () => {
        type ComplexUnion =
          | { type: 'array'; data: readonly string[] }
          | { type: 'object'; data: Record<string, unknown> }
          | readonly number[]
          | string
          | null;

        // eslint-disable-next-line @typescript-eslint/prefer-readonly-parameter-types
        function processComplex(value: ComplexUnion): number {
          if (Arr.isArray(value)) {
            expectType<typeof value, readonly number[]>('=');
            return value.length;
          }
          if (typeof value === 'string') {
            expectType<typeof value, string>('=');
            return value.length;
          }
          if (value === null) {
            expectType<typeof value, null>('=');
            return 0;
          }
          expectType<
            typeof value,
            | { type: 'array'; data: readonly string[] }
            | { type: 'object'; data: Record<string, unknown> }
          >('=');
          return -1;
        }

        expect(processComplex([1, 2, 3])).toBe(3);
        expect(processComplex('test')).toBe(4);
        expect(processComplex(null)).toBe(0);
        expect(processComplex({ type: 'array', data: ['a', 'b'] })).toBe(-1);
      });

      test('should preserve literal types in arrays', () => {
        const literalArray = [1, 2, 3] as const;
        if (Arr.isArray(literalArray)) {
          expectType<typeof literalArray, readonly [1, 2, 3]>('=');
        }
      });

      test('should handle arrays with mixed element types', () => {
        const mixed: readonly (string | number | boolean)[] = [1, 'two', true];
        if (Arr.isArray(mixed)) {
          expectType<typeof mixed, readonly (string | number | boolean)[]>('=');
        }
      });

      test('should work with symbol-keyed arrays', () => {
        const sym = Symbol('test');
        const arrWithSymbol = Object.assign([1, 2, 3], { [sym]: 'value' });
        if (Arr.isArray(arrWithSymbol)) {
          expect(arrWithSymbol.length).toBe(3);
        }
      });
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

    test('should return true for arrays of exact length (additional)', () => {
      expect(Arr.isArrayOfLength([1, 2, 3], 3)).toBe(true);
      expect(Arr.isArrayOfLength([], 0)).toBe(true);
      expect(Arr.isArrayOfLength(['a'], 1)).toBe(true);
    });

    test('should return false for arrays of different length (additional)', () => {
      expect(Arr.isArrayOfLength([1, 2, 3], 2)).toBe(false);
      expect(Arr.isArrayOfLength([1, 2, 3], 4)).toBe(false);
      expect(Arr.isArrayOfLength([], 1)).toBe(false);
    });

    test('should work as type guard with exact length (additional)', () => {
      const array: readonly number[] = [1, 2, 3];
      if (Arr.isArrayOfLength(array, 3)) {
        expectType<typeof array, ArrayOfLength<3, number>>('=');
        expect(array.length).toBe(3);
      }
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

    test('should return true for arrays of at least specified length (additional)', () => {
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 3)).toBe(true);
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 2)).toBe(true);
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 1)).toBe(true);
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 0)).toBe(true);
    });

    test('should return false for arrays shorter than specified length (additional)', () => {
      expect(Arr.isArrayAtLeastLength([1, 2, 3], 4)).toBe(false);
      expect(Arr.isArrayAtLeastLength([], 1)).toBe(false);
    });

    test('should work as type guard for at least length (additional)', () => {
      const array: readonly number[] = [1, 2, 3];
      if (Arr.isArrayAtLeastLength(array, 2)) {
        expectType<typeof array, ArrayAtLeastLen<2, number>>('=');
        expect(array.length >= 2).toBe(true);
      }
    });
  });

  describe('indexIsInRange', () => {
    test('should return true for valid indices', () => {
      const array = ['a', 'b', 'c'];
      expect(Arr.indexIsInRange(array, 0)).toBe(true);
      expect(Arr.indexIsInRange(array, 1)).toBe(true);
      expect(Arr.indexIsInRange(array, 2)).toBe(true);
    });

    test('should return false for invalid indices', () => {
      const array = ['a', 'b', 'c'];
      expect(Arr.indexIsInRange(array, 3)).toBe(false);
      expect(Arr.indexIsInRange(array, 10)).toBe(false);
    });

    test('should work with empty array', () => {
      const empty: readonly string[] = [];
      expect(Arr.indexIsInRange(empty, 0)).toBe(false);
      // @ts-expect-error negative indices should not be allowed
      expect(Arr.indexIsInRange(empty, -1)).toBe(false);
    });

    test('should be type error with floating point indices', () => {
      const array = [1, 2, 3];
      // @ts-expect-error floating point indices should not be allowed
      expect(Arr.indexIsInRange(array, 1.5)).toBe(true); // JavaScript arrays accept floating point indices
      // @ts-expect-error floating point indices should not be allowed
      expect(Arr.indexIsInRange(array, 3.1)).toBe(false);
    });
  });
});
