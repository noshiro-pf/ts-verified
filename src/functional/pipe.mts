import { expectType } from '../expect-type.mjs';
import { Optional } from './optional.mjs';

/**
 * Creates a new {@link Pipe} object, which allows for chaining operations on a value.
 * @template A The type of the initial value.
 * @param a The initial value.
 * @returns {Pipe<A>} A {@link Pipe} object containing the initial value and chain methods.
 * @example
 * pipe(1).map(x => x + 1).value; // 2
 */
export const pipe = <const A,>(a: A): Pipe<A> => ({
  value: a,
  map: (fn) => pipe(fn(a)),
  mapNullable: (fn) => pipe(a == null ? undefined : fn(a)),

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  mapOptional: (Optional.isOptional(a)
    ? (fn) => pipe(Optional.map(a, fn))
    : undefined) as A extends Optional<unknown>
    ? <B>(fn: (x: Optional.Unwrap<A>) => B) => Pipe<Optional<B>>
    : never,
});

/**
 * Represents a value that can be transformed through a series of chained operations.
 * @template A The type of the value currently held by the pipe.
 * @property {A} value The current value held by the pipe.
 * @property {(fn: (a: A) => B) => Pipe<B>} map Applies a function to the current value and returns a new {@link Pipe} with the result.
 * @property {(fn: (a: NonNullable<A>) => B) => Pipe<B | undefined>} mapNullable Applies a function to the current value if it is not `null` or `undefined`, and returns a new {@link Pipe} with the result. If the current value is `null` or `undefined`, it returns a {@link Pipe} with `undefined`.
 * @property {A extends Optional<unknown> ? <B>(fn: (a: Optional.Unwrap<A>) => B) => Pipe<Optional<B>> : never} mapOptional Applies a function to the value inside an {@link Optional}, if present, and returns a new {@link Pipe} with the mapped {@link Optional}.
 */
type Pipe<A> = Readonly<{
  /** The current value held by the pipe. */
  value: A;
  /**
   * Applies a function to the current value and returns a new {@link Pipe} with the result.
   * @template B
   * @param fn A function that takes the current value `A` and returns a new value `B`.
   * @returns {Pipe<B>} A new {@link Pipe} containing the result of applying `fn` to the current value.
   */
  map: <B>(fn: (a: A) => B) => Pipe<B>;
  /**
   * Applies a function to the current value if it is not `null` or `undefined`,
   * and returns a new {@link Pipe} with the result.
   * If the current value is `null` or `undefined`, it returns a {@link Pipe} with `undefined`.
   * @template B
   * @param fn A function that takes the non-nullable current value `NonNullable<A>` and returns a new value `B`.
   * @returns {Pipe<B | undefined>} A new {@link Pipe} containing the result of applying `fn` or `undefined`.
   */
  mapNullable: <B>(fn: (a: NonNullable<A>) => B) => Pipe<B | undefined>;
  /**
   * Applies a function to the value inside an {@link Optional}, if present,
   * and returns a new {@link Pipe} with the mapped {@link Optional}.
   * Only available if the current value is an {@link Optional}.
   * @template B
   * @param fn A function that takes the unwrapped value from the {@link Optional} and returns a new value `B`.
   * @returns {Pipe<Optional<B>>} A new {@link Pipe} containing the mapped {@link Optional}.
   */
  mapOptional: A extends Optional<unknown>
    ? <B>(fn: (a: Optional.Unwrap<A>) => B) => Pipe<Optional<B>>
    : never;
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
