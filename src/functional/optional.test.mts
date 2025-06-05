/* eslint-disable @typescript-eslint/no-confusing-void-expression */
import { expectType } from '../expect-type.mjs';
import { Optional } from './optional.mjs';

describe('Optional', () => {
  describe('isOptional', () => {
    test('should return true for Some values', () => {
      expect(Optional.isOptional(Optional.some(42))).toBe(true);
      expect(Optional.isOptional(Optional.some('hello'))).toBe(true);
      expect(Optional.isOptional(Optional.some(null))).toBe(true);
      expect(Optional.isOptional(Optional.some(undefined))).toBe(true);
    });

    test('should return true for None value', () => {
      expect(Optional.isOptional(Optional.none)).toBe(true);
    });

    test('should return false for non-Optional values', () => {
      expect(Optional.isOptional(42)).toBe(false);
      expect(Optional.isOptional('hello')).toBe(false);
      expect(Optional.isOptional(null)).toBe(false);
      expect(Optional.isOptional(undefined)).toBe(false);
      expect(Optional.isOptional({})).toBe(false);
      expect(Optional.isOptional({ type: 'fake', value: 42 })).toBe(false);
    });
  });

  describe('some', () => {
    test('should create a Some variant with the provided value', () => {
      const someNumber = Optional.some(42);
      expect(Optional.isSome(someNumber)).toBe(true);
      expect(Optional.unwrap(someNumber)).toBe(42);

      const someString = Optional.some('hello');
      expect(Optional.isSome(someString)).toBe(true);
      expect(Optional.unwrap(someString)).toBe('hello');

      const someObject = Optional.some({ name: 'Alice', age: 30 });
      expect(Optional.isSome(someObject)).toBe(true);
      expect(Optional.unwrap(someObject)).toStrictEqual({
        name: 'Alice',
        age: 30,
      });
    });

    test('should preserve const types', () => {
      const _someConst = Optional.some('test' as const);
      expectType<typeof _someConst, Optional.Some<'test'>>('=');
    });
  });

  describe('none', () => {
    test('should be a singleton None value', () => {
      expect(Optional.isNone(Optional.none)).toBe(true);
      expect(Optional.isSome(Optional.none)).toBe(false);
      expect(Optional.unwrapOr(Optional.none, undefined)).toBe(undefined);
    });

    test('should always reference the same instance', () => {
      expect(Optional.none).toBe(Optional.none);
    });
  });

  describe('isSome and isNone', () => {
    test('should correctly identify Some values', () => {
      const some = Optional.some(42);
      expect(Optional.isSome(some)).toBe(true);
      expect(Optional.isNone(some)).toBe(false);
    });

    test('should correctly identify None values', () => {
      const none = Optional.none;
      expect(Optional.isSome(none)).toBe(false);
      expect(Optional.isNone(none)).toBe(true);
    });

    test('should act as type guards', () => {
      const optional: Optional<number> = Optional.some(42);

      if (Optional.isSome(optional)) {
        expectType<typeof optional, Optional.Some<number>>('=');
      }

      if (Optional.isNone(optional)) {
        expectType<typeof optional, Optional.None>('<=');
      }
    });
  });

  describe('map', () => {
    test('should map over Some values', () => {
      const some = Optional.some(5);
      const mapped = Optional.map(some, (x) => x * 2);

      expect(Optional.isSome(mapped)).toBe(true);
      if (Optional.isSome(mapped)) {
        expect(Optional.unwrap(mapped)).toBe(10);
      }
    });

    test('should return None for None values', () => {
      const none = Optional.none;
      const mapped = Optional.map(none, (x: never) => x * 2);

      expect(Optional.isNone(mapped)).toBe(true);
    });

    test('should support chaining', () => {
      const result = Optional.map(
        Optional.map(Optional.some('hello'), (s) => s.toUpperCase()),
        (s) => s.length,
      );

      if (Optional.isSome(result)) {
        expect(Optional.unwrap(result)).toBe(5);
      }
    });

    test('should preserve types correctly', () => {
      const some = Optional.some(42);
      const _mapped = Optional.map(some, (x) => x.toString());

      expectType<typeof _mapped, Optional<string>>('=');
    });
  });

  describe('unwrap', () => {
    test('should return the value for Some', () => {
      expect(Optional.unwrap(Optional.some(42))).toBe(42);
      expect(Optional.unwrap(Optional.some('hello'))).toBe('hello');
      expect(Optional.unwrap(Optional.some(null))).toBe(null);
    });

    test('should return undefined for None', () => {
      expect(Optional.unwrapOr(Optional.none, undefined)).toBe(undefined);
    });

    test('should have correct return types', () => {
      const someNumber = Optional.some(42);
      const _unwrapped = Optional.unwrap(someNumber);
      expectType<typeof _unwrapped, number | undefined>('<=');

      const none = Optional.none;
      const _unwrappedNone = Optional.unwrapOr(none, undefined);
      expectType<typeof _unwrappedNone, undefined>('>=');
    });
  });

  describe('unwrapThrow', () => {
    test('should return the value for Some', () => {
      expect(Optional.unwrapThrow(Optional.some(42))).toBe(42);
      expect(Optional.unwrapThrow(Optional.some('hello'))).toBe('hello');
    });

    test('should throw for None', () => {
      expect(() => Optional.unwrapThrow(Optional.none)).toThrow(
        '`unwrapThrow()` has failed because it is `None`',
      );
    });

    test('should have correct return types', () => {
      const someNumber = Optional.some(42);
      const _unwrapped = Optional.unwrapThrow(someNumber);
      expectType<typeof _unwrapped, number>('<=');
    });
  });

  describe('unwrapOr', () => {
    test('should return the value for Some', () => {
      expect(Optional.unwrapOr(Optional.some(42), 0)).toBe(42);
      expect(Optional.unwrapOr(Optional.some('hello'), 'default')).toBe(
        'hello',
      );
    });

    test('should return the default value for None', () => {
      expect(Optional.unwrapOr(Optional.none, 0)).toBe(0);
      expect(Optional.unwrapOr(Optional.none, 'default')).toBe('default');
    });

    test('should have correct return types', () => {
      const someNumber = Optional.some(42);
      const _unwrapped1 = Optional.unwrapOr(someNumber, 0);
      expectType<typeof _unwrapped1, number>('<=');

      const _unwrapped2 = Optional.unwrapOr(someNumber, 'default');
      expectType<typeof _unwrapped2, number | string>('<=');

      const none = Optional.none;
      const _unwrapped3 = Optional.unwrapOr(none, 'default');
      expectType<typeof _unwrapped3, string>('<=');
    });
  });

  describe('expectToBe', () => {
    test('should return the value for Some', () => {
      const expectNumber =
        Optional.expectToBe<Optional<number>>('Expected a number');
      expect(expectNumber(Optional.some(42))).toBe(42);
    });

    test('should throw with custom message for None', () => {
      const expectNumber =
        Optional.expectToBe<Optional<number>>('Expected a number');
      expect(() => expectNumber(Optional.none)).toThrow('Expected a number');
    });

    test('should be curried', () => {
      const expectValidId =
        Optional.expectToBe<Optional<string>>('ID is required');

      const id1 = Optional.some('user-123');
      const id2 = Optional.none;

      expect(expectValidId(id1)).toBe('user-123');
      expect(() => expectValidId(id2)).toThrow('ID is required');
    });
  });

  describe('type utilities', () => {
    test('should correctly unwrap types', () => {
      type SomeNumber = Optional.Some<number>;
      type UnwrappedNumber = Optional.Unwrap<SomeNumber>;
      expectType<UnwrappedNumber, number>('=');

      type None = Optional.None;
      type UnwrappedNone = Optional.Unwrap<None>;
      expectType<UnwrappedNone, never>('=');
    });

    test('should correctly narrow types', () => {
      type MaybeNumber = Optional<number>;

      type OnlySome = Optional.NarrowToSome<MaybeNumber>;
      expectType<OnlySome, Optional.Some<number>>('=');

      type OnlyNone = Optional.NarrowToNone<MaybeNumber>;
      expectType<OnlyNone, Optional.None>('=');
    });
  });

  describe('flatMap', () => {
    test('should chain operations that return Optional', () => {
      const parseNumber = (s: string): Optional<number> => {
        const n = Number(s);
        return Number.isNaN(n) ? Optional.none : Optional.some(n);
      };

      const result = Optional.flatMap(Optional.some('42'), parseNumber);
      if (Optional.isSome(result)) {
        expect(Optional.unwrap(result)).toBe(42);
      }

      const invalid = Optional.flatMap(Optional.some('abc'), parseNumber);
      expect(Optional.isNone(invalid)).toBe(true);
    });

    test('should return None if input is None', () => {
      const result = Optional.flatMap(Optional.none, (_: never) =>
        Optional.some(42),
      );
      expect(Optional.isNone(result)).toBe(true);
    });

    test('should support chaining multiple flatMaps', () => {
      const parseNumber = (s: string): Optional<number> => {
        const n = Number(s);
        return Number.isNaN(n) ? Optional.none : Optional.some(n);
      };

      const divideBy =
        (divisor: number) =>
        (n: number): Optional<number> =>
          divisor === 0 ? Optional.none : Optional.some(n / divisor);

      const result = Optional.flatMap(
        Optional.flatMap(Optional.some('100'), parseNumber),
        divideBy(2),
      );
      if (Optional.isSome(result)) {
        expect(Optional.unwrap(result)).toBe(50);
      }
    });
  });

  describe('filter', () => {
    test('should keep Some values that match predicate', () => {
      const someEven = Optional.some(4);
      const filtered = Optional.filter(someEven, (x) => x % 2 === 0);
      if (Optional.isSome(filtered)) {
        expect(Optional.unwrap(filtered)).toBe(4);
      }
    });

    test('should return None for Some values that do not match predicate', () => {
      const someOdd = Optional.some(5);
      const filtered = Optional.filter(someOdd, (x) => x % 2 === 0);
      expect(Optional.isNone(filtered)).toBe(true);
    });

    test('should return None if input is None', () => {
      const filtered = Optional.filter(Optional.none, (_: never) => true);
      expect(Optional.isNone(filtered)).toBe(true);
    });
  });

  describe('orElse', () => {
    test('should return the first Optional if it is Some', () => {
      const primary = Optional.some(42);
      const fallback = Optional.some(100);
      const result = Optional.orElse(primary, fallback);
      if (Optional.isSome(result)) {
        expect(Optional.unwrap(result)).toBe(42);
      }
    });

    test('should return the alternative if the first is None', () => {
      const primary = Optional.none;
      const fallback = Optional.some('default');
      const result = Optional.orElse(primary, fallback);
      if (Optional.isSome(result)) {
        expect(Optional.unwrap(result)).toBe('default');
      }
    });

    test('should return None if both are None', () => {
      const result = Optional.orElse(Optional.none, Optional.none);
      expect(Optional.isNone(result)).toBe(true);
    });
  });

  describe('zip', () => {
    test('should combine two Some values into a tuple', () => {
      const a = Optional.some(1);
      const b = Optional.some('hello');
      const zipped = Optional.zip(a, b);
      if (Optional.isSome(zipped)) {
        expect(Optional.unwrap(zipped)).toStrictEqual([1, 'hello']);
      }
    });

    test('should return None if first is None', () => {
      const a = Optional.none;
      const b = Optional.some('hello');
      const zipped = Optional.zip(a, b);
      expect(Optional.isNone(zipped)).toBe(true);
    });

    test('should return None if second is None', () => {
      const a = Optional.some(1);
      const b = Optional.none;
      const zipped = Optional.zip(a, b);
      expect(Optional.isNone(zipped)).toBe(true);
    });

    test('should return None if both are None', () => {
      const zipped = Optional.zip(Optional.none, Optional.none);
      expect(Optional.isNone(zipped)).toBe(true);
    });
  });

  describe('fromNullable', () => {
    test('should convert non-null values to Some', () => {
      const helloOpt = Optional.fromNullable('hello');
      if (Optional.isSome(helloOpt))
        expect(Optional.unwrap(helloOpt)).toBe('hello');

      const numOpt = Optional.fromNullable(42);
      if (Optional.isSome(numOpt)) expect(Optional.unwrap(numOpt)).toBe(42);

      const zeroOpt = Optional.fromNullable(0);
      if (Optional.isSome(zeroOpt)) expect(Optional.unwrap(zeroOpt)).toBe(0);

      const emptyOpt = Optional.fromNullable('');
      if (Optional.isSome(emptyOpt)) expect(Optional.unwrap(emptyOpt)).toBe('');

      const falseOpt = Optional.fromNullable(false);
      if (Optional.isSome(falseOpt))
        expect(Optional.unwrap(falseOpt)).toBe(false);
    });

    test('should convert null to None', () => {
      expect(Optional.isNone(Optional.fromNullable(null))).toBe(true);
    });

    test('should convert undefined to None', () => {
      expect(Optional.isNone(Optional.fromNullable(undefined))).toBe(true);
    });

    test('should work with union types', () => {
      const value: string | null = 'test';
      const _optional = Optional.fromNullable(value);
      expectType<typeof _optional, Optional<string>>('>=');
    });
  });

  describe('toNullable', () => {
    test('should convert Some to its value', () => {
      expect(Optional.toNullable(Optional.some(42))).toBe(42);
      expect(Optional.toNullable(Optional.some('hello'))).toBe('hello');
      expect(Optional.toNullable(Optional.some(null))).toBe(null);
    });

    test('should convert None to null', () => {
      expect(Optional.toNullable(Optional.none)).toBe(undefined);
    });

    test('should have correct return type', () => {
      const some = Optional.some(42);
      const _value = Optional.toNullable(some);
      expectType<typeof _value, number | undefined>('<=');
    });
  });

  describe('edge cases', () => {
    test('should handle undefined as a Some value', () => {
      const someUndefined = Optional.some(undefined);
      expect(Optional.isSome(someUndefined)).toBe(true);
      const unwrappedUndefined = Optional.unwrap(someUndefined);
      expect(unwrappedUndefined).toBe(undefined);

      // This is different from None
      expect(someUndefined).not.toBe(Optional.none);
    });

    test('should handle null as a Some value', () => {
      const someNull = Optional.some(null);
      expect(Optional.isSome(someNull)).toBe(true);
      expect(Optional.unwrap(someNull)).toBe(null);
    });

    test('should handle nested Optionals', () => {
      const nested = Optional.some(Optional.some(42));
      expect(Optional.isSome(nested)).toBe(true);

      const inner = Optional.unwrap(nested);
      expect(Optional.isOptional(inner)).toBe(true);
      expect(Optional.unwrap(inner)).toBe(42);
    });
  });
});
