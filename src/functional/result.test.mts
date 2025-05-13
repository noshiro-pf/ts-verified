import { expectType } from '../expect-type.mjs';
import { Optional } from './optional.mjs';
import { Result } from './result.mjs';

describe('Result', () => {
  describe('ok', () => {
    test('creates Ok result', () => {
      const result = Result.ok(42);
      expect(Result.isOk(result)).toBe(true);
      expect(Result.isErr(result)).toBe(false);
      expect(result.value).toBe(42);
      expectType<typeof result, Result<number, never>>('<=');
    });

    test('creates Ok result with string', () => {
      const result = Result.ok('success');
      expect(Result.isOk(result)).toBe(true);
      expect(result.value).toBe('success');
      expectType<typeof result, Result<string, never>>('<=');
    });
  });

  describe('err', () => {
    test('creates Err result', () => {
      const result = Result.err('error message');
      expect(Result.isErr(result)).toBe(true);
      expect(Result.isOk(result)).toBe(false);
      expect(result.value).toBe('error message');
      expectType<typeof result, Result<never, string>>('<=');
    });

    test('creates Err result with number', () => {
      const result = Result.err(404);
      expect(Result.isErr(result)).toBe(true);
      expect(result.value).toBe(404);
      expectType<typeof result, Result<never, number>>('<=');
    });
  });

  describe('isOk', () => {
    test('type guard for Ok results', () => {
      const result: Result<number, string> = Result.ok(42);
      if (Result.isOk(result)) {
        expectType<typeof result, Result.Ok<number>>('<=');
        expect(result.value).toBe(42);
      }
    });

    test('returns false for Err results', () => {
      const result: Result<number, string> = Result.err('error');
      expect(Result.isOk(result)).toBe(false);
    });
  });

  describe('isErr', () => {
    test('type guard for Err results', () => {
      const result: Result<number, string> = Result.err('error');
      if (Result.isErr(result)) {
        expectType<typeof result, Result.Err<string>>('<=');
        expect(result.value).toBe('error');
      }
    });

    test('returns false for Ok results', () => {
      const result: Result<number, string> = Result.ok(42);
      expect(Result.isErr(result)).toBe(false);
    });
  });

  describe('isResult', () => {
    test('recognizes Ok results', () => {
      const result = Result.ok(42);
      expect(Result.isResult(result)).toBe(true);
    });

    test('recognizes Err results', () => {
      const result = Result.err('error');
      expect(Result.isResult(result)).toBe(true);
    });

    test('rejects non-Result values', () => {
      expect(Result.isResult(42)).toBe(false);
      expect(Result.isResult('string')).toBe(false);
      expect(Result.isResult(null)).toBe(false);
      expect(Result.isResult(undefined)).toBe(false);
      expect(Result.isResult({})).toBe(false);
      expect(Result.isResult({ type: 'unknown', value: 42 })).toBe(false);
    });
  });

  describe('map', () => {
    test('maps Ok result', () => {
      const result = Result.ok(5);
      const mapped = Result.map(result, (x) => x * 2);
      expect(Result.isOk(mapped)).toBe(true);
      if (Result.isOk(mapped)) {
        expect(mapped.value).toBe(10);
      }
      expectType<typeof mapped, Result<number, never>>('<=');
    });

    test('preserves Err result', () => {
      const result: Result<number, string> = Result.err('error');
      const mapped = Result.map(result, (x) => x * 2);
      expect(Result.isErr(mapped)).toBe(true);
      if (Result.isErr(mapped)) {
        expect(mapped.value).toBe('error');
      }
      expectType<typeof mapped, Result<number, string>>('<=');
    });
  });

  describe('mapErr', () => {
    test('maps Err result', () => {
      const result: Result<number, string> = Result.err('error');
      const mapped = Result.mapErr(result, (e) => e.toUpperCase());
      expect(Result.isErr(mapped)).toBe(true);
      if (Result.isErr(mapped)) {
        expect(mapped.value).toBe('ERROR');
      }
      expectType<typeof mapped, Result<number, string>>('<=');
    });

    test('preserves Ok result', () => {
      const result: Result<number, string> = Result.ok(42);
      const mapped = Result.mapErr(result, (e: string) => e.toUpperCase());
      expect(Result.isOk(mapped)).toBe(true);
      if (Result.isOk(mapped)) {
        expect(mapped.value).toBe(42);
      }
      expectType<typeof mapped, Result<number, string>>('~=');
    });
  });

  describe('unwrapThrow', () => {
    test('unwraps Ok result', () => {
      const result = Result.ok(42);
      const value = Result.unwrapThrow(result);
      expect(value).toBe(42);
      expectType<typeof value, number>('<=');
    });

    test('throws on Err result', () => {
      const result = Result.err('error message');
      expect(() => Result.unwrapThrow(result)).toThrow('error message');
    });
  });

  describe('unwrapOkOr', () => {
    test('unwraps Ok result', () => {
      const result = Result.ok(42);
      const value = Result.unwrapOkOr(result, 0);
      expect(value).toBe(42);
      expectType<typeof value, number>('<=');
    });

    test('returns default for Err result', () => {
      const result: Result<number, string> = Result.err('error');
      const value = Result.unwrapOkOr(result, 0);
      expect(value).toBe(0);
      expectType<typeof value, number>('<=');
    });
  });

  describe('unwrapErr', () => {
    test('unwraps Err result', () => {
      const result: Result<number, string> = Result.err('error');
      const value = Result.unwrapErr(result);
      expect(value).toBe('error');
      expectType<typeof value, string | undefined>('<=');
    });

    test('returns undefined for Ok result', () => {
      const result: Result<number, string> = Result.ok(42);
      // eslint-disable-next-line @typescript-eslint/no-confusing-void-expression
      const value = Result.unwrapErr(result);
      expect(value).toBeUndefined();
      expectType<typeof value, string | undefined>('<=');
    });
  });

  describe('fold', () => {
    test('folds Ok result', () => {
      const result = Result.ok(42);
      const folded = Result.fold(
        result,
        (x) => x * 2,
        () => 0,
      );
      expect(Result.isOk(folded)).toBe(true);
      if (Result.isOk(folded)) {
        expect(folded.value).toBe(84);
      }
      expectType<typeof folded, Result<number, number>>('=');
    });

    test('folds Err result', () => {
      const result: Result<number, string> = Result.err('error');
      const folded = Result.fold(
        result,
        (x) => x * 2,
        (e) => e.length,
      );
      expect(Result.isErr(folded)).toBe(true);
      if (Result.isErr(folded)) {
        expect(folded.value).toBe(5); // length of 'error'
      }
      expectType<typeof folded, Result<number, number>>('=');
    });
  });

  describe('fromPromise', () => {
    test('handles async functions that resolve', async () => {
      const asyncFn = async (): Promise<number> =>
        Promise.resolve().then(() => 42);

      const result = await Result.fromPromise(asyncFn());
      expect(Result.isOk(result)).toBe(true);
      expect(Result.unwrapOk(result)).toBe(42);
    });

    test('handles async functions that reject', async () => {
      const error = new Error('Async error');
      const asyncFn = async (): Promise<number> =>
        Promise.reject(error).then(() => 42);

      const result = await Result.fromPromise(asyncFn());
      expect(Result.isErr(result)).toBe(true);
      expect(Result.unwrapErr(result)).toBe(error);
    });

    test('works with different promise types', async () => {
      const stringPromise = Promise.resolve('hello');
      const result = await Result.fromPromise(stringPromise);

      expect(Result.unwrapOk(result)).toBe('hello');
      expectType<typeof result, Result<string, unknown>>('=');
    });
  });

  describe('flatMap', () => {
    test('should chain operations that return Result', () => {
      const divide = (a: number, b: number): Result<number, string> =>
        b === 0 ? Result.err('Division by zero') : Result.ok(a / b);

      const result = Result.flatMap(Result.ok(10), (x) => divide(x, 2));
      expect(Result.unwrapOk(result)).toBe(5);

      const error = Result.flatMap(Result.ok(10), (x) => divide(x, 0));
      expect(Result.unwrapErr(error)).toBe('Division by zero');
    });

    test('should return Err if input is Err', () => {
      const result = Result.flatMap(Result.err('initial error'), (_: never) =>
        Result.ok(42),
      );
      expect(Result.unwrapErr(result)).toBe('initial error');
    });

    test('should support chaining multiple flatMaps', () => {
      const parseNumber = (s: string): Result<number, string> => {
        const n = Number(s);
        return Number.isNaN(n) ? Result.err('Not a number') : Result.ok(n);
      };

      const divide = (a: number, b: number): Result<number, string> =>
        b === 0 ? Result.err('Division by zero') : Result.ok(a / b);

      const result = Result.flatMap(
        Result.flatMap(parseNumber('100'), (x) => divide(x, 2)),
        (x) => Result.ok(x + 10),
      );
      expect(Result.unwrapOk(result)).toBe(60);
    });
  });

  describe('swap', () => {
    test('should swap Ok to Err', () => {
      const okResult = Result.ok(42);
      const swapped = Result.swap(okResult);
      expect(Result.isErr(swapped)).toBe(true);
      expect(Result.unwrapErr(swapped)).toBe(42);
    });

    test('should swap Err to Ok', () => {
      const errResult = Result.err('error');
      const swapped = Result.swap(errResult);
      expect(Result.isOk(swapped)).toBe(true);
      expect(Result.unwrapOk(swapped)).toBe('error');
    });
  });

  describe('toOptional', () => {
    test('should convert Ok to Some-like', () => {
      const okResult = Result.ok(42);
      const optional = Result.toOptional(okResult);
      expect(Optional.isSome(optional)).toBe(true);
      expect(Optional.unwrapThrow(optional)).toBe(42);
    });

    test('should convert Err to None-like', () => {
      const errResult = Result.err('error');
      const optional = Result.toOptional(errResult);
      expect(Optional.isNone(optional)).toBe(true);
    });
  });

  describe('unwrapErrThrow', () => {
    test('should return error value for Err', () => {
      const result = Result.err('error message');
      expect(Result.unwrapErrThrow(result)).toBe('error message');
    });

    test('should throw for Ok', () => {
      const result = Result.ok(42);
      expect(() => Result.unwrapErrThrow(result)).toThrow(
        'Expected Err but got Ok: 42',
      );
    });

    test('should use custom toString function', () => {
      const result = Result.ok({ id: 1, name: 'test' });
      expect(() =>
        Result.unwrapErrThrow(result, (obj) => `Object(id=${obj.id})`),
      ).toThrow('Expected Err but got Ok: Object(id=1)');
    });
  });

  describe('orElse', () => {
    test('should return the first Result if it is Ok', () => {
      const primary = Result.ok(42);
      const fallback = Result.ok(100);
      const result = Result.orElse(primary, fallback);
      expect(Result.unwrapOk(result)).toBe(42);
    });

    test('should return the alternative if the first is Err', () => {
      const primary = Result.err('error');
      const fallback = Result.ok('default');
      const result = Result.orElse(primary, fallback);
      expect(Result.unwrapOk(result)).toBe('default');
    });

    test('should return Err if both are Err', () => {
      const primary = Result.err('error1');
      const fallback = Result.err('error2');
      const result = Result.orElse(primary, fallback);
      expect(Result.unwrapErr(result)).toBe('error2');
    });
  });

  describe('zip', () => {
    test('should combine two Ok values into a tuple', () => {
      const a = Result.ok(1);
      const b = Result.ok('hello');
      const zipped = Result.zip(a, b);
      expect(Result.unwrapOk(zipped)).toStrictEqual([1, 'hello']);
    });

    test('should return first Err if first is Err', () => {
      const a = Result.err('error1');
      const b = Result.ok('hello');
      const zipped = Result.zip(a, b);
      expect(Result.unwrapErr(zipped)).toBe('error1');
    });

    test('should return second Err if second is Err', () => {
      const a = Result.ok(1);
      const b = Result.err('error2');
      const zipped = Result.zip(a, b);
      expect(Result.unwrapErr(zipped)).toBe('error2');
    });

    test('should return first Err if both are Err', () => {
      const a = Result.err('error1');
      const b = Result.err('error2');
      const zipped = Result.zip(a, b);
      expect(Result.unwrapErr(zipped)).toBe('error1');
    });
  });
});
