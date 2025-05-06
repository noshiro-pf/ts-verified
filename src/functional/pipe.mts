import { expectType } from '../expect-type.mjs';

export const pipe = <const A,>(a: A): Pipe<A> => ({
  value: a,
  chain: (fn) => pipe(fn(a)),
  chainOptional: (fn) => pipe(a == null ? undefined : fn(a)),
});

type Pipe<A> = Readonly<{
  value: A;
  chain: <B>(fn: (a: A) => B) => Pipe<B>;
  chainOptional: <B>(fn: (a: NonNullable<A>) => B) => Pipe<B | undefined>;
}>;

if (import.meta.vitest !== undefined) {
  describe('pipe', () => {
    test('case 1', () => {
      expect(
        pipe(1)
          .chain((x) => x * 2)
          .chain((x) => x.toString()).value,
      ).toBe('2');
    });

    test('case 2', () => {
      expect(
        pipe({ x: 2, y: 3 } as const)
          .chain((p) => ({ x: p.x, y: p.y * 4 }) as const)
          .chain((p) => ({ x: p.x * 5, y: p.y })).value,
      ).toStrictEqual({ x: 10, y: 12 });
    });

    test('case 3', () => {
      const y = 1 as number | undefined;

      const z = pipe(y)
        .chainOptional((x) => x + 1)
        .chainOptional((x) => x.toString()).value;

      expectType<typeof z, string | undefined>('=');

      expect(z).toBe('2');
    });
  });
}
