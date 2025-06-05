import { IMap } from '../collections/index.mjs';
import { expectType } from '../expect-type.mjs';
import { Result } from '../functional/index.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr', () => {
  describe('min', () => {
    {
      const xs = [3, 5, 4] as const;
      const result = Arr.min(xs);

      expectType<typeof result, 3 | 4 | 5>('=');

      test('case 1', () => {
        expect(result).toBe(3);
      });
    }
    {
      const xs = [3, 5, 4] as const;
      const result = Arr.min(xs, (a, b) => a - b);

      expectType<typeof result, 3 | 4 | 5>('=');

      test('case 2', () => {
        expect(result).toBe(3);
      });
    }
    {
      const xs: readonly (3 | 4 | 5)[] = [3, 5, 4] as const;
      const result = Arr.min(xs, (a, b) => a - b);

      expectType<typeof result, 3 | 4 | 5 | undefined>('=');

      test('case 3', () => {
        expect(result).toBe(3);
      });
    }
  });

  describe('max', () => {
    const xs = [3, 5, 4] as const;
    const result = Arr.max(xs, (a, b) => a - b);

    expectType<typeof result, 3 | 4 | 5>('=');

    test('case 1', () => {
      expect(result).toBe(5);
    });

    test('case 2: no comparator', () => {
      const res = Arr.max(xs);
      expectType<typeof res, 3 | 4 | 5>('=');
      expect(res).toBe(5);
    });

    test('case 3: readonly array', () => {
      const arr: readonly number[] = [1, 5, 2];
      const res = Arr.max(arr);
      expectType<typeof res, number | undefined>('=');
      expect(res).toBe(5);
    });

    test('case 4: empty array', () => {
      const arr: readonly number[] = [];
      const res = Arr.max(arr);
      expectType<typeof res, number | undefined>('=');
      expect(res).toBeUndefined();
    });
  });

  describe('minBy', () => {
    const xs: NonEmptyArray<
      | Readonly<{ x: 1; y: 2 }>
      | Readonly<{ x: 2; y: 3 }>
      | Readonly<{ x: 3; y: 2 }>
      | Readonly<{ x: 4; y: 1 }>
      | Readonly<{ x: 5; y: 1 }>
      | Readonly<{ x: 6; y: 1 }>
    > = [
      { x: 5, y: 1 },
      { x: 4, y: 1 },
      { x: 6, y: 1 },
      { x: 3, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
    ] as const;

    const result = Arr.minBy(xs, (a) => a.x);

    expectType<
      typeof result,
      | Readonly<{ x: 1; y: 2 }>
      | Readonly<{ x: 2; y: 3 }>
      | Readonly<{ x: 3; y: 2 }>
      | Readonly<{ x: 4; y: 1 }>
      | Readonly<{ x: 5; y: 1 }>
      | Readonly<{ x: 6; y: 1 }>
    >('=');

    test('case 1', () => {
      expect(result).toStrictEqual({ x: 1, y: 2 });
    });

    test('case 2: empty array', () => {
      const arr: readonly { x: number }[] = [];
      const res = Arr.minBy(arr, (a) => a.x);
      expectType<typeof res, { x: number } | undefined>('=');
      expect(res).toBeUndefined();
    });

    test('case 3: custom comparator', () => {
      const arr = [
        { name: 'apple', score: 10 },
        { name: 'banana', score: 5 },
        { name: 'cherry', score: 12 },
      ] as const;
      const res = Arr.minBy(
        arr,
        (item) => item.name,
        (a, b) => a.localeCompare(b),
      );
      expectType<
        typeof res,
        | Readonly<{ name: 'apple'; score: 10 }>
        | Readonly<{ name: 'banana'; score: 5 }>
        | Readonly<{ name: 'cherry'; score: 12 }>
        | undefined
      >('=');
      expect(res).toStrictEqual({ name: 'apple', score: 10 });
    });
  });

  describe('maxBy', () => {
    const xs: NonEmptyArray<
      | Readonly<{ x: 1; y: 2 }>
      | Readonly<{ x: 2; y: 3 }>
      | Readonly<{ x: 3; y: 2 }>
      | Readonly<{ x: 4; y: 1 }>
      | Readonly<{ x: 5; y: 1 }>
      | Readonly<{ x: 6; y: 1 }>
    > = [
      { x: 5, y: 1 },
      { x: 4, y: 1 },
      { x: 6, y: 1 },
      { x: 3, y: 2 },
      { x: 1, y: 2 },
      { x: 2, y: 3 },
    ] as const;

    const result = Arr.maxBy(xs, (a) => a.x);

    expectType<
      typeof result,
      | Readonly<{ x: 1; y: 2 }>
      | Readonly<{ x: 2; y: 3 }>
      | Readonly<{ x: 3; y: 2 }>
      | Readonly<{ x: 4; y: 1 }>
      | Readonly<{ x: 5; y: 1 }>
      | Readonly<{ x: 6; y: 1 }>
    >('=');

    test('case 1', () => {
      expect(result).toStrictEqual({ x: 6, y: 1 });
    });

    test('case 2: empty array', () => {
      const arr: readonly { x: number }[] = [];
      const res = Arr.maxBy(arr, (a) => a.x);
      expectType<typeof res, { x: number } | undefined>('=');
      expect(res).toBeUndefined();
    });

    test('case 3: custom comparator', () => {
      const arr = [
        { name: 'apple', score: 10 },
        { name: 'banana', score: 5 },
        { name: 'cherry', score: 12 },
      ] as const;
      const res = Arr.maxBy(
        arr,
        (item) => item.name,
        (a, b) => a.localeCompare(b),
      );
      expectType<
        typeof res,
        | Readonly<{ name: 'apple'; score: 10 }>
        | Readonly<{ name: 'banana'; score: 5 }>
        | Readonly<{ name: 'cherry'; score: 12 }>
        | undefined
      >('=');
      expect(res).toStrictEqual({ name: 'cherry', score: 12 });
    });
  });

  describe('count', () => {
    const xs = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
    ] as const;

    const result = Arr.count(xs, (a) => a.x === 2);

    expectType<typeof result, Uint32>('=');

    test('case 1', () => {
      expect(result).toBe(2);
    });

    test('case 2: empty array', () => {
      const arr: readonly number[] = [];
      const res = Arr.count(arr, (x) => x > 0);
      expectType<typeof res, Uint32>('=');
      expect(res).toBe(0);
    });
  });

  describe('countBy', () => {
    const xs = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
    ] as const;

    const result = Arr.countBy(xs, (a) => a.x);

    expectType<typeof result, IMap<1 | 2 | 3, Uint32>>('=');

    test('case 1', () => {
      expect(result).toStrictEqual(
        IMap.new<1 | 2 | 3, number>([
          [1, 3],
          [2, 2],
          [3, 1],
        ]),
      );
    });

    test('case 2: empty array', () => {
      const arr: readonly { x: number }[] = [];
      const res = Arr.countBy(arr, (a) => a.x);
      expectType<typeof res, IMap<number, Uint32>>('=');
      expect(res.size).toBe(0);
    });
  });

  describe('foldl', () => {
    test('empty array', () => {
      const result = Arr.foldl([], (acc, curr: number) => acc + curr, 0);
      expectType<typeof result, number>('=');
      expect(result).toBe(0);
    });

    test('sum numbers', () => {
      const result = Arr.foldl(
        [1, 2, 3] as const,
        (acc, curr) => acc + curr,
        0,
      );
      expectType<typeof result, number>('=');
      expect(result).toBe(6);
    });

    test('concatenate strings', () => {
      const result = Arr.foldl(
        ['a', 'b', 'c'] as const,
        (acc, curr) => acc + curr,
        '',
      );
      expectType<typeof result, string>('=');
      expect(result).toBe('abc');
    });

    test('alias reduce', () => {
      expect(Arr.reduce).toBe(Arr.foldl);
    });
  });

  describe('foldr', () => {
    test('empty array', () => {
      const result = Arr.foldr([], (acc, curr: number) => acc + curr, 0);
      expectType<typeof result, number>('=');
      expect(result).toBe(0);
    });

    test('subtract numbers from right', () => {
      // (1 - (2 - (3 - 0))) = 1 - (2 - 3) = 1 - (-1) = 2
      const result = Arr.foldr(
        [1, 2, 3] as const,
        (acc, curr) => curr - acc,
        0,
      );
      expectType<typeof result, number>('=');
      expect(result).toBe(2); // 3 - (2 - (1 - 0)) = 3 - (2 - 1) = 3 - 1 = 2.  No, this is (acc, curr) => acc - curr.
      // The callback is (previousValue: S, currentValue: A) => S
      // So it's initialValue for S.
      // Iteration 1: prev = 0, curr = 3. Result = 3 - 0 = 3.
      // Iteration 2: prev = 3, curr = 2. Result = 2 - 3 = -1.
      // Iteration 3: prev = -1, curr = 1. Result = 1 - (-1) = 2.
    });

    test('concatenate strings from right', () => {
      const result = Arr.foldr(
        ['a', 'b', 'c'] as const,
        (acc, curr) => curr + acc,
        '',
      );
      expectType<typeof result, string>('=');
      expect(result).toBe('abc'); // c + (b + (a + "")) = cba. No, it's curr + acc.
      // Iteration 1: prev = "", curr = "c". Result = "c" + "" = "c".
      // Iteration 2: prev = "c", curr = "b". Result = "b" + "c" = "bc".
      // Iteration 3: prev = "bc", curr = "a". Result = "a" + "bc" = "abc".
    });

    test('alias reduceRight', () => {
      expect(Arr.reduceRight).toBe(Arr.foldr);
    });
  });

  describe('sum', () => {
    test('empty array', () => {
      const result = Arr.sum([]);
      expectType<typeof result, number>('=');
      expect(result).toBe(0);
    });

    test('positive numbers', () => {
      const result = Arr.sum([1, 2, 3, 4, 5] as const);
      expectType<typeof result, number>('=');
      expect(result).toBe(15);
    });

    test('mixed numbers', () => {
      const result = Arr.sum([1, -2, 3, 0, -5] as const);
      expectType<typeof result, number>('=');
      expect(result).toBe(-3);
    });
  });

  describe('join', () => {
    test('should join array elements', () => {
      const arr = ['Hello', 'World'];
      const result = Arr.join(arr, ' ');

      expect(Result.isOk(result)).toBe(true);
      if (Result.isOk(result)) {
        expect(result.value).toBe('Hello World');
      }
    });

    test('should handle empty separator', () => {
      const arr = ['a', 'b', 'c'];
      const result = Arr.join(arr, '');

      expect(Result.isOk(result)).toBe(true);
      if (Result.isOk(result)) {
        expect(result.value).toBe('abc');
      }
    });

    test('should handle undefined separator', () => {
      const arr = ['a', 'b', 'c'];
      const result = Arr.join(arr);

      expect(Result.isOk(result)).toBe(true);
      if (Result.isOk(result)) {
        expect(result.value).toBe('a,b,c');
      }
    });
  });
});
