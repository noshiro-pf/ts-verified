import { expectType } from '../expect-type.mjs';

/**
 * Creates a new `Pipe` object, which allows for chaining operations on a value.
 * @template A The type of the initial value.
 * @param a The initial value.
 * @returns A `Pipe<A>` object containing the initial value and chain methods.
 */
export const pipe = <const A,>(a: A): Pipe<A> => ({
  value: a,
  map: (fn) => pipe(fn(a)),
  mapNullable: (fn) => pipe(a == null ? undefined : fn(a)),
});

/**
 * Represents a value that can be transformed through a series of chained operations.
 * @template A The type of the value currently held by the pipe.
 */
type Pipe<A> = Readonly<{
  /** The current value held by the pipe. */
  value: A;
  /**
   * Applies a function to the current value and returns a new `Pipe` with the result.
   * @template B The type of the value returned by the function `fn`.
   * @param fn A function that takes the current value `A` and returns a new value `B`.
   * @returns A new `Pipe<B>` containing the result of applying `fn` to the current value.
   */
  map: <B>(fn: (a: A) => B) => Pipe<B>;
  /**
   * Applies a function to the current value if it is not `null` or `undefined`,
   * and returns a new `Pipe` with the result.
   * If the current value is `null` or `undefined`, it returns a `Pipe` with `undefined`.
   * @template B The type of the value returned by the function `fn`.
   * @param fn A function that takes the non-nullable current value `NonNullable<A>` and returns a new value `B`.
   * @returns A new `Pipe<B | undefined>` containing the result of applying `fn` or `undefined`.
   */
  mapNullable: <B>(fn: (a: NonNullable<A>) => B) => Pipe<B | undefined>;
}>;

if (import.meta.vitest !== undefined) {
  describe('pipe', () => {
    test('case 1', () => {
      expect(
        pipe(1)
          .map((x) => x * 2)
          .map((x) => x.toString()).value,
      ).toBe('2');
    });

    test('case 2', () => {
      expect(
        pipe({ x: 2, y: 3 } as const)
          .map((p) => ({ x: p.x, y: p.y * 4 }) as const)
          .map((p) => ({ x: p.x * 5, y: p.y })).value,
      ).toStrictEqual({ x: 10, y: 12 });
    });

    test('case 3', () => {
      const y = 1 as number | undefined;

      const z = pipe(y)
        .mapNullable((x) => x + 1)
        .mapNullable((x) => x.toString()).value;

      expectType<typeof z, string | undefined>('=');

      expect(z).toBe('2');
    });
  });
}
