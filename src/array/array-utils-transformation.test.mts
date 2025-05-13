import { IMap } from '../collections/index.mjs';
import { expectType } from '../expect-type.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr', () => {
  describe('partition', () => {
    const xs = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12] as const;

    {
      const result = Arr.partition(xs, 4);

      expectType<
        typeof result,
        readonly (readonly (
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | 11
          | 12
        )[])[]
      >('=');

      test('case 1', () => {
        expect(result).toStrictEqual([
          [1, 2, 3, 4],
          [5, 6, 7, 8],
          [9, 10, 11, 12],
        ]);
      });
    }

    {
      const result = Arr.partition(xs, 3);

      expectType<
        typeof result,
        readonly (readonly (
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | 11
          | 12
        )[])[]
      >('=');

      test('case 2', () => {
        expect(result).toStrictEqual([
          [1, 2, 3],
          [4, 5, 6],
          [7, 8, 9],
          [10, 11, 12],
        ]);
      });
    }

    {
      const result = Arr.partition(xs, 5);

      expectType<
        typeof result,
        readonly (readonly (
          | 1
          | 2
          | 3
          | 4
          | 5
          | 6
          | 7
          | 8
          | 9
          | 10
          | 11
          | 12
        )[])[]
      >('=');

      test('case 3', () => {
        expect(result).toStrictEqual([
          [1, 2, 3, 4, 5],
          [6, 7, 8, 9, 10],
          [11, 12],
        ]);
      });
    }
  });

  describe('reversed', () => {
    {
      const xs = [1, 2, 3] as const;
      const result = xs.toReversed();

      expectType<typeof result, (1 | 2 | 3)[]>('=');

      test('case 1', () => {
        expect(result).toStrictEqual([3, 2, 1]);
      });
    }
  });

  describe('toSorted', () => {
    {
      const xs = [2, 1, 3] as const;
      const result = xs.toSorted();

      expectType<typeof result, (1 | 2 | 3)[]>('=');

      test('case 1', () => {
        expect(result).toStrictEqual([1, 2, 3]);
      });
    }
    {
      const xs = [2, 1, 3] as const;
      const result = xs.toSorted((a, b) => a - b);

      expectType<typeof result, (1 | 2 | 3)[]>('=');

      test('case 2', () => {
        expect(result).toStrictEqual([1, 2, 3]);
      });
    }
    {
      const xs = [2, 1, 3] as const;
      const result = xs.toSorted((a, b) => b - a);

      expectType<typeof result, (1 | 2 | 3)[]>('=');

      test('case 3', () => {
        expect(result).toStrictEqual([3, 2, 1]);
      });
    }
  });

  describe('toSortedBy', () => {
    {
      const xs = [{ v: 2 }, { v: 1 }, { v: 3 }] as const;
      const sorted = Arr.toSortedBy(xs, (x) => x.v);

      expectType<
        typeof sorted,
        readonly (
          | Readonly<{ v: 1 }>
          | Readonly<{ v: 2 }>
          | Readonly<{ v: 3 }>
        )[]
      >('=');

      test('case 1', () => {
        expect(sorted).toStrictEqual([{ v: 1 }, { v: 2 }, { v: 3 }]);
      });
    }
    {
      const xs = [{ v: 2 }, { v: 1 }, { v: 3 }] as const;
      const sorted = Arr.toSortedBy(
        xs,
        (x) => x.v,
        (a, b) => a - b,
      );

      expectType<
        typeof sorted,
        readonly (
          | Readonly<{ v: 1 }>
          | Readonly<{ v: 2 }>
          | Readonly<{ v: 3 }>
        )[]
      >('=');

      test('case 2', () => {
        expect(sorted).toStrictEqual([{ v: 1 }, { v: 2 }, { v: 3 }]);
      });
    }
  });

  describe('groupBy', () => {
    const xs = [
      { x: 1, y: 1 },
      { x: 2, y: 1 },
      { x: 3, y: 1 },
      { x: 1, y: 2 },
      { x: 2, y: 2 },
      { x: 1, y: 3 },
    ] as const;

    const result = Arr.groupBy(xs, (a) => a.x);

    expectType<
      typeof result,
      IMap<
        1 | 2 | 3,
        readonly (
          | Readonly<{ x: 1; y: 1 }>
          | Readonly<{ x: 1; y: 2 }>
          | Readonly<{ x: 1; y: 3 }>
          | Readonly<{ x: 2; y: 1 }>
          | Readonly<{ x: 2; y: 2 }>
          | Readonly<{ x: 3; y: 1 }>
        )[]
      >
    >('=');

    test('case 1', () => {
      expect(result).toStrictEqual(
        IMap.new<
          1 | 2 | 3,
          readonly (
            | Readonly<{ x: 1; y: 1 }>
            | Readonly<{ x: 1; y: 2 }>
            | Readonly<{ x: 1; y: 3 }>
            | Readonly<{ x: 2; y: 1 }>
            | Readonly<{ x: 2; y: 2 }>
            | Readonly<{ x: 3; y: 1 }>
          )[]
        >([
          [
            1,
            [
              { x: 1, y: 1 },
              { x: 1, y: 2 },
              { x: 1, y: 3 },
            ],
          ],
          [
            2,
            [
              { x: 2, y: 1 },
              { x: 2, y: 2 },
            ],
          ],
          [3, [{ x: 3, y: 1 }]],
        ]),
      );
    });
  });

  describe('zip', () => {
    {
      const xs = [1, 2, 3] as const;
      const ys = [4, 5, 6] as const;
      const zipped = Arr.zip(xs, ys);

      expectType<
        typeof zipped,
        readonly [readonly [1, 4], readonly [2, 5], readonly [3, 6]]
      >('=');

      test('case 1', () => {
        expect(zipped).toStrictEqual([
          [1, 4],
          [2, 5],
          [3, 6],
        ]);
      });
    }
    {
      const xs: readonly number[] = [1, 2, 3];
      const ys: readonly number[] = [4];
      const zipped = Arr.zip(xs, ys);

      expectType<typeof zipped, readonly (readonly [number, number])[]>('=');

      test('case 2', () => {
        expect(zipped).toStrictEqual([[1, 4]]);
      });
    }
    {
      const xs = [1] as const;
      const ys: readonly number[] = [4, 5, 6];
      const zipped = Arr.zip(xs, ys);

      expectType<typeof zipped, readonly [readonly [1, number]]>('=');

      test('case 3', () => {
        expect(zipped).toStrictEqual([[1, 4]]);
      });
    }

    // testArrayEquality({
    //   testName: 'zip',
    //   target: zip([0, 1, 2, 3, 4], [5, 6, 7, 8, 9]),
    //   toBe: [
    //     [0, 5],
    //     [1, 6],
    //     [2, 7],
    //     [3, 8],
    //     [4, 9],
    //   ],
    // });

    // testArrayEquality({
    //   testName: 'zipArrays 2 arrays',
    //   target: zipArrays([0, 1, 2, 3, 4], [5, 6, 7, 8, 9]),
    //   toBe: [
    //     [0, 5],
    //     [1, 6],
    //     [2, 7],
    //     [3, 8],
    //     [4, 9],
    //   ],
    // });

    // testArrayEquality({
    //   testName: 'zipArrays 3 arrays',
    //   target: zipArrays(
    //     [0, 1, 2, 3, 4],
    //     [5, 6, 7, 8, 9, 999, 999],
    //     [10, 11, 12, 13, 14, 999]
    //   ),
    //   toBe: [
    //     [0, 5, 10],
    //     [1, 6, 11],
    //     [2, 7, 12],
    //     [3, 8, 13],
    //     [4, 9, 14],
    //   ],
    // });
  });

  describe('filterNot', () => {
    const xs = [1, 2, 3] as const;
    const filtered = Arr.filterNot(xs, (x) => x % 2 === 0);

    expectType<typeof filtered, readonly (1 | 2 | 3)[]>('=');

    test('case 1', () => {
      expect(filtered).toStrictEqual([1, 3]);
    });
  });

  describe('concat', () => {
    const xs = [1, 2, 3] as const;
    const ys = [4, 5] as const;
    const result = Arr.concat(xs, ys);

    expectType<typeof result, readonly [1, 2, 3, 4, 5]>('=');

    test('case 1', () => {
      expect(result).toStrictEqual([1, 2, 3, 4, 5]);
    });

    // testArrayEquality({
    //   testName: 'concat 2 arrays',
    //   target: concat([1, 2, 3], [4, 5, 6]),
    //   toBe: [1, 2, 3, 4, 5, 6],
    // });

    // testArrayEquality({
    //   testName: 'concat 2 arrays',
    //   target: concat([1, 2, 3], []),
    //   toBe: [1, 2, 3],
    // });

    // testArrayEquality({
    //   testName: 'concat 2 arrays',
    //   target: concat([], [4, 5, 6]),
    //   toBe: [4, 5, 6],
    // });

    // testArrayEquality({
    //   testName: 'concat 2 arrays',
    //   target: concat([], []),
    //   toBe: [],
    // });

    // testArrayEquality({
    //   testName: 'concat 2 arrays',
    //   target: concat(['1', '2', '3'], [4, 5, 6]),
    //   toBe: ['1', '2', '3', 4, 5, 6],
    // });
  });
});
