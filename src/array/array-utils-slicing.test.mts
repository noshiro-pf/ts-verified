import { expectType } from '../expect-type.mjs';
import { Optional } from '../functional/index.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr', () => {
  describe('head', () => {
    {
      const xs = [1, 2, 3] as const;
      const head = Arr.head(xs);

      expectType<typeof head, Optional.Some<1>>('=');

      test('case 1', () => {
        expect(Optional.isSome(head)).toBe(true);
        if (Optional.isSome(head)) {
          expect(head.value).toBe(1);
        }
      });
    }
    {
      const xs: MutableNonEmptyArray<number> = [1, 2, 3];
      const head = Arr.head(xs);

      expectType<typeof head, Optional.Some<number>>('=');

      test('case 2', () => {
        expect(Optional.isSome(head)).toBe(true);
        if (Optional.isSome(head)) {
          expect(head.value).toBe(1);
        }
      });
    }
    {
      const mut_xs: number[] = [1, 2, 3];
      const head = Arr.head(mut_xs);

      expectType<typeof head, Optional<number>>('=');

      test('case 3', () => {
        expect(Optional.isSome(head)).toBe(true);
        if (Optional.isSome(head)) {
          expect(head.value).toBe(1);
        }
      });
    }
    {
      const xs = [] as const;

      const head = Arr.head(xs);

      expectType<typeof head, Optional.None>('=');

      test('case 4', () => {
        expect(Optional.isNone(head)).toBe(true);
      });
    }
  });

  describe('last', () => {
    {
      const xs = [1, 2, 3] as const;
      const last = Arr.last(xs);

      expectType<typeof last, Optional.Some<3>>('=');

      test('case 1', () => {
        expect(Optional.isSome(last)).toBe(true);
        if (Optional.isSome(last)) {
          expect(last.value).toBe(3);
        }
      });
    }
    {
      const xs: MutableNonEmptyArray<number> = [1, 2, 3];
      const last = Arr.last(xs);

      expectType<typeof last, Optional.Some<number>>('=');

      test('case 2', () => {
        expect(Optional.isSome(last)).toBe(true);
        if (Optional.isSome(last)) {
          expect(last.value).toBe(3);
        }
      });
    }
    {
      const mut_xs: number[] = [1, 2, 3];
      const last = Arr.last(mut_xs);

      expectType<typeof last, Optional<number>>('=');

      test('case 3', () => {
        expect(Optional.isSome(last)).toBe(true);
        if (Optional.isSome(last)) {
          expect(last.value).toBe(3);
        }
      });
    }
    {
      const xs = [] as const;

      const last = Arr.last(xs);

      expectType<typeof last, Optional.None>('=');

      test('case 4', () => {
        expect(Optional.isNone(last)).toBe(true);
      });
    }
  });

  describe('tail', () => {
    const xs = [1, 2, 3] as const;
    const tail = Arr.tail(xs);

    expectType<typeof tail, readonly [2, 3]>('=');

    test('case 1', () => {
      expect(tail).toStrictEqual([2, 3]);
    });

    test('alias 1', () => {
      expect(Arr.rest).toStrictEqual(Arr.tail);
    });
  });

  describe('butLast', () => {
    {
      const xs = [1, 2, 3] as const;
      const butLast = Arr.butLast(xs);

      expectType<typeof butLast, readonly [1, 2]>('=');

      test('case 1', () => {
        expect(butLast).toStrictEqual([1, 2]);
      });
    }
    {
      const xs: readonly number[] = [1, 2, 3];
      const butLast = Arr.butLast(xs);

      expectType<typeof butLast, readonly number[]>('=');

      test('case 2', () => {
        expect(butLast).toStrictEqual([1, 2]);
      });
    }
  });

  describe('take', () => {
    {
      const xs = [1, 2, 3] as const;
      const t = Arr.take(xs, 2);

      expectType<typeof t, readonly [1, 2]>('=');

      test('case 1', () => {
        expect(t).toStrictEqual([1, 2]);
      });
    }
    {
      const xs: readonly number[] = [1, 2, 3];
      const t = Arr.take(xs, 2);

      expectType<typeof t, readonly number[]>('=');

      test('case 2', () => {
        expect(t).toStrictEqual([1, 2]);
      });
    }
  });

  describe('takeLast', () => {
    {
      const xs = [1, 2, 3] as const;
      const t = Arr.takeLast(xs, 2);

      expectType<typeof t, readonly [2, 3]>('=');

      test('case 1', () => {
        expect(t).toStrictEqual([2, 3]);
      });
    }
    {
      const xs: readonly number[] = [1, 2, 3];
      const t = Arr.takeLast(xs, 2);

      expectType<typeof t, readonly number[]>('=');

      test('case 2', () => {
        expect(t).toStrictEqual([2, 3]);
      });
    }
  });

  describe('skip', () => {
    {
      const xs = [1, 2, 3] as const;
      const t = Arr.skip(xs, 2);

      expectType<typeof t, readonly [3]>('=');

      test('case 1', () => {
        expect(t).toStrictEqual([3]);
      });
    }
    {
      const xs: readonly number[] = [1, 2, 3];
      const t = Arr.skip(xs, 2);

      expectType<typeof t, readonly number[]>('=');

      test('case 2', () => {
        expect(t).toStrictEqual([3]);
      });
    }
  });

  describe('skipLast', () => {
    {
      const xs = [1, 2, 3] as const;
      const t = Arr.skipLast(xs, 2);

      expectType<typeof t, readonly [1]>('=');

      test('case 1', () => {
        expect(t).toStrictEqual([1]);
      });
    }
    {
      const xs: readonly number[] = [1, 2, 3];
      const t = Arr.skipLast(xs, 2);

      expectType<typeof t, readonly number[]>('=');

      test('case 2', () => {
        expect(t).toStrictEqual([1]);
      });
    }
  });
});
