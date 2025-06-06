import { isRecord } from '../guard/index.mjs';
import { Optional } from './optional.mjs';

/** @internal Symbol to identify the 'Ok' variant of Result. */
const OkTypeSymbol: unique symbol = Symbol('Result.ok');

/** @internal Symbol to identify the 'Err' variant of Result. */
const ErrTypeSymbol: unique symbol = Symbol('Result.err');

/**
 * @internal
 * Represents the 'Ok' variant of a Result, containing a success value.
 * @template S The type of the success value.
 */
type Ok_<S> = Readonly<{
  /** Discriminant property for the 'Ok' type. */
  type: typeof OkTypeSymbol;
  /** The success value. */
  value: S;
}>;

/**
 * @internal
 * Represents the 'Err' variant of a Result, containing an error value.
 * @template E The type of the error value.
 */
type Err_<E> = Readonly<{
  /** Discriminant property for the 'Err' type. */
  type: typeof ErrTypeSymbol;
  /** The error value. */
  value: E;
}>;

/**
 * Represents a value that can either be a success (`Ok`) or an error (`Err`).
 * @template S The type of the success value.
 * @template E The type of the error value.
 */
export type Result<S, E> = Ok_<S> | Err_<E>;

/**
 * Namespace for the `Result` type and related functions.
 * Provides utilities to handle operations that can succeed or fail.
 */
export namespace Result {
  /**
   * Checks if the given value is a `Result`.
   * @param maybeOptional The value to check.
   * @returns `true` if the value is a `Result`, otherwise `false`.
   */
  export const isResult = (
    maybeOptional: unknown,
  ): maybeOptional is Result<unknown, unknown> =>
    isRecord(maybeOptional) &&
    Object.hasOwn(maybeOptional, 'type') &&
    Object.hasOwn(maybeOptional, 'value') &&
    (maybeOptional['type'] === ErrTypeSymbol ||
      maybeOptional['type'] === OkTypeSymbol);

  /**
   * Represents a `Result` that is a success, containing a value.
   * @template S The type of the success value.
   */
  export type Ok<S> = Ok_<S>;

  /**
   * Represents a `Result` that is an error, containing an error value.
   * @template E The type of the error value.
   */
  export type Err<E> = Err_<E>;

  /**
   * Base type for any `Result`, used for generic constraints.
   * Represents a `Result` with unknown success and error types.
   */
  export type Base = Result<unknown, unknown>;

  /**
   * Extracts the success value type `S` from a `Result.Ok<S>`.
   * If the `Result` is `Result.Err<E>`, resolves to `never`.
   * @template R The `Result.Base` type to unwrap.
   */
  export type UnwrapOk<R extends Base> = R extends Ok<infer S> ? S : never;

  /**
   * Extracts the error value type `E` from a `Result.Err<E>`.
   * If the `Result` is `Result.Ok<S>`, resolves to `never`.
   * @template R The `Result.Base` type to unwrap.
   */
  export type UnwrapErr<R extends Base> = R extends Err<infer E> ? E : never;

  /**
   * Narrows a `Result.Base` type to `Result.Ok<S>` if it is an `Ok`.
   * If the `Result` is `Result.Err<E>`, resolves to `never`.
   * @template R The `Result.Base` type to narrow.
   */
  export type NarrowToOk<R extends Base> = R extends Err<unknown> ? never : R;

  /**
   * Narrows a `Result.Base` type to `Result.Err<E>` if it is an `Err`.
   * If the `Result` is `Result.Ok<S>`, resolves to `never`.
   * @template R The `Result.Base` type to narrow.
   */
  export type NarrowToErr<R extends Base> = R extends Ok<unknown> ? never : R;

  /**
   * Creates a `Result.Ok` containing the given success value.
   * @template S The type of the success value.
   * @param value The success value.
   * @returns A `Result.Ok<S>` containing the value.
   */
  export const ok = <const S,>(value: S): Ok<S> => ({
    type: OkTypeSymbol,
    value,
  });

  /**
   * Creates a `Result.Err` containing the given error value.
   * @template E The type of the error value.
   * @param value The error value.
   * @returns A `Result.Err<E>` containing the value.
   */
  export const err = <const E,>(value: E): Err<E> => ({
    type: ErrTypeSymbol,
    value,
  });

  /**
   * @internal
   * Default string conversion function using native String constructor.
   */
  const toStr_ = String;

  /**
   * Checks if a `Result` is `Result.Ok`.
   * Acts as a type guard.
   * @template R The `Result.Base` type to check.
   * @param result The `Result` to check.
   * @returns `true` if the `Result` is `Result.Ok`, otherwise `false`.
   */
  export const isOk = <const R extends Base>(
    result: R,
  ): result is NarrowToOk<R> => result.type === OkTypeSymbol;

  /**
   * Checks if a `Result` is `Result.Err`.
   * Acts as a type guard.
   * @template R The `Result.Base` type to check.
   * @param result The `Result` to check.
   * @returns `true` if the `Result` is `Result.Err`, otherwise `false`.
   */
  export const isErr = <const R extends Base>(
    result: R,
  ): result is NarrowToErr<R> => result.type === ErrTypeSymbol;

  /**
   * Unwraps a `Result`, returning the success value.
   * Throws an error if the `Result` is `Result.Err`.
   * @template R The `Result.Base` type to unwrap.
   * @param result The `Result` to unwrap.
   * @param toStr An optional function to convert the error value to a string for the error message. Defaults to `String`.
   * @returns The success value if `Result.Ok`.
   * @throws Error if the `Result` is `Result.Err`.
   */
  export const unwrapThrow = <const R extends Base>(
    result: R,
    toStr: (e: UnwrapErr<R>) => string = toStr_,
  ): UnwrapOk<R> => {
    if (isErr(result)) {
      throw new Error(
        toStr(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          result.value as UnwrapErr<R>,
        ),
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return result.value as UnwrapOk<R>;
  };

  /**
   * Unwraps a `Result` that is known to be `Ok`, returning the success value.
   * @template R The `Result.Ok` type to unwrap.
   * @param result The `Result.Ok` to unwrap.
   * @returns The success value.
   */
  export function unwrapOk<const R extends Ok<unknown>>(result: R): UnwrapOk<R>;
  /**
   * Unwraps a `Result`, returning the success value or `undefined` if it is `Result.Err`.
   * @template R The `Result.Base` type to unwrap.
   * @param result The `Result` to unwrap.
   * @returns The success value if `Result.Ok`, otherwise `undefined`.
   */
  export function unwrapOk<const R extends Base>(
    result: R,
  ): UnwrapOk<R> | undefined;
  export function unwrapOk<const R extends Base>(
    result: R,
  ): UnwrapOk<R> | undefined {
    return isErr(result)
      ? undefined
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (result.value as UnwrapOk<R>);
  }

  /**
   * Unwraps a `Result`, returning the success value or a default value if it is `Result.Err`.
   * @template R The `Result.Base` type to unwrap.
   * @template D The type of the default value.
   * @param result The `Result` to unwrap.
   * @param defaultValue The value to return if `result` is `Result.Err`.
   * @returns The success value if `Result.Ok`, otherwise `defaultValue`.
   * @example
   * ```typescript
   * // Regular usage
   * const result = Result.ok(42);
   * const value = Result.unwrapOkOr(result, 0);
   * console.log(value); // 42
   *
   * // Curried usage for pipe composition
   * const unwrapWithDefault = Result.unwrapOkOr(0);
   * const value2 = pipe(Result.err("error")).map(unwrapWithDefault).value;
   * console.log(value2); // 0
   * ```
   */
  export function unwrapOkOr<const R extends Base, D>(
    result: R,
    defaultValue: D,
  ): D | UnwrapOk<R>;
  export function unwrapOkOr<S, D>(
    defaultValue: D,
  ): <E>(result: Result<S, E>) => D | S;
  export function unwrapOkOr<const R extends Base, D>(
    ...args: readonly [result: R, defaultValue: D] | readonly [defaultValue: D]
  ):
    | D
    | UnwrapOk<R>
    | (<E>(result: Result<UnwrapOk<R>, E>) => D | UnwrapOk<R>) {
    if (args.length === 2) {
      const [result, defaultValue] = args;
      return isErr(result)
        ? defaultValue
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          (result.value as UnwrapOk<R>);
    } else {
      const [defaultValue] = args;
      return <E,>(result: Result<UnwrapOk<R>, E>) =>
        isErr(result) ? defaultValue : result.value;
    }
  }

  /**
   * Unwraps a `Result`, returning the error value.
   * Throws an error if the `Result` is `Result.Ok`.
   * @template R The `Result.Base` type to unwrap.
   * @param result The `Result` to unwrap.
   * @param toStr An optional function to convert the success value to a string for the error message when the Result is unexpectedly Ok. Defaults to `String`.
   * @returns The error value if `Result.Err`.
   * @throws Error if the `Result` is `Result.Ok`.
   */
  export const unwrapErrThrow = <const R extends Base>(
    result: R,
    toStr: (v: UnwrapOk<R>) => string = toStr_,
  ): UnwrapErr<R> => {
    if (isOk(result)) {
      throw new Error(
        `Expected Err but got Ok: ${toStr(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          result.value as UnwrapOk<R>,
        )}`,
      );
    }
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return result.value as UnwrapErr<R>;
  };

  /**
   * Unwraps a `Result`, returning the error value or `undefined` if it is `Result.Ok`.
   * @template R The `Result.Base` type to unwrap.
   * @param result The `Result` to unwrap.
   * @returns The error value if `Result.Err`, otherwise `undefined`.
   */
  export const unwrapErr = <const R extends Base>(
    result: R,
  ): UnwrapErr<R> | undefined =>
    isErr(result)
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (result.value as UnwrapErr<R>)
      : undefined;

  /**
   * Unwraps a `Result`, returning the error value or a default value if it is `Result.Ok`.
   * @template R The `Result.Base` type to unwrap.
   * @template D The type of the default value.
   * @param result The `Result` to unwrap.
   * @param defaultValue The value to return if `result` is `Result.Ok`.
   * @returns The error value if `Result.Err`, otherwise `defaultValue`.
   * @example
   * ```typescript
   * // Regular usage
   * const result = Result.err("failed");
   * const error = Result.unwrapErrOr(result, "default");
   * console.log(error); // "failed"
   *
   * // Curried usage for pipe composition
   * const unwrapErrorWithDefault = Result.unwrapErrOr("unknown error");
   * const error2 = pipe(Result.ok(42)).map(unwrapErrorWithDefault).value;
   * console.log(error2); // "unknown error"
   * ```
   */
  export function unwrapErrOr<const R extends Base, D>(
    result: R,
    defaultValue: D,
  ): D | UnwrapErr<R>;
  export function unwrapErrOr<E, D>(
    defaultValue: D,
  ): <S>(result: Result<S, E>) => D | E;
  export function unwrapErrOr<const R extends Base, D>(
    ...args: readonly [result: R, defaultValue: D] | readonly [defaultValue: D]
  ):
    | D
    | UnwrapErr<R>
    | (<S>(result: Result<S, UnwrapErr<R>>) => D | UnwrapErr<R>) {
    if (args.length === 2) {
      const [result, defaultValue] = args;
      return isErr(result)
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          (result.value as UnwrapErr<R>)
        : defaultValue;
    } else {
      const [defaultValue] = args;
      return <S,>(result: Result<S, UnwrapErr<R>>) =>
        isErr(result) ? result.value : defaultValue;
    }
  }

  /**
   * Maps a `Result<S, E>` to `Result<S2, E>` by applying a function to the success value.
   * If the `Result` is `Result.Err`, returns the original `Err`.
   * @template R The input `Result.Base` type.
   * @template S2 The type of the success value returned by the mapping function.
   * @param result The `Result` to map.
   * @param mapFn The function to apply to the success value if present.
   * @returns A new `Result<S2, UnwrapErr<R>>`.
   * @example
   * ```typescript
   * // Regular usage
   * const result = Result.ok(5);
   * const mapped = Result.map(result, x => x * 2);
   * console.log(Result.unwrap(mapped)); // 10
   *
   * // Curried version for use with pipe
   * const doubler = Result.map((x: number) => x * 2);
   * const result2 = pipe(Result.ok(5)).map(doubler).value;
   * console.log(Result.unwrap(result2)); // 10
   * ```
   */
  export function map<const R extends Base, S2>(
    result: R,
    mapFn: (value: UnwrapOk<R>) => S2,
  ): Result<S2, UnwrapErr<R>>;
  export function map<S, S2>(
    mapFn: (value: S) => S2,
  ): <E>(result: Result<S, E>) => Result<S2, E>;
  export function map<const R extends Base, S2>(
    ...args:
      | readonly [result: R, mapFn: (value: UnwrapOk<R>) => S2]
      | readonly [mapFn: (value: UnwrapOk<R>) => S2]
  ):
    | Result<S2, UnwrapErr<R>>
    | (<E>(result: Result<UnwrapOk<R>, E>) => Result<S2, E>) {
    if (args.length === 2) {
      const [result, mapFn] = args;
      return isErr(result)
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          (result as Err<UnwrapErr<R>>)
        : ok(
            mapFn(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
              result.value as UnwrapOk<R>,
            ),
          );
    } else {
      const [mapFn] = args;
      return <E,>(result: Result<UnwrapOk<R>, E>) =>
        isErr(result) ? result : ok(mapFn(result.value));
    }
  }

  /**
   * Maps a `Result<S, E>` to `Result<S, E2>` by applying a function to the error value.
   * If the `Result` is `Result.Ok`, returns the original `Ok`.
   * @template R The input `Result.Base` type.
   * @template E2 The type of the error value returned by the mapping function.
   * @param result The `Result` to map.
   * @param mapFn The function to apply to the error value if present.
   * @returns A new `Result<UnwrapOk<R>, E2>`.
   * @example
   * ```typescript
   * // Regular usage
   * const result = Result.err("error");
   * const mapped = Result.mapErr(result, e => e.toUpperCase());
   * console.log(Result.unwrapErr(mapped)); // "ERROR"
   *
   * // Curried usage for pipe composition
   * const errorUppercase = Result.mapErr((e: string) => e.toUpperCase());
   * const result2 = pipe(Result.err("error")).map(errorUppercase).value;
   * console.log(Result.unwrapErr(result2)); // "ERROR"
   * ```
   */
  export function mapErr<const R extends Base, E2>(
    result: R,
    mapFn: (error: UnwrapErr<R>) => E2,
  ): Result<UnwrapOk<R>, E2>;
  export function mapErr<E, E2>(
    mapFn: (error: E) => E2,
  ): <S>(result: Result<S, E>) => Result<S, E2>;
  export function mapErr<const R extends Base, E2>(
    ...args:
      | readonly [result: R, mapFn: (error: UnwrapErr<R>) => E2]
      | readonly [mapFn: (error: UnwrapErr<R>) => E2]
  ):
    | Result<UnwrapOk<R>, E2>
    | (<S>(result: Result<S, UnwrapErr<R>>) => Result<S, E2>) {
    if (args.length === 2) {
      const [result, mapFn] = args;
      return isOk(result)
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          (result as Ok<UnwrapOk<R>>)
        : err(
            mapFn(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
              result.value as UnwrapErr<R>,
            ),
          );
    } else {
      const [mapFn] = args;
      return <S,>(result: Result<S, UnwrapErr<R>>) =>
        isOk(result) ? result : err(mapFn(result.value));
    }
  }

  /**
   * Applies one of two functions depending on whether the `Result` is `Ok` or `Err`.
   * @template R The input `Result.Base` type.
   * @template S2 The type of the success value returned by `mapFn`.
   * @template E2 The type of the error value returned by `mapErrFn`.
   * @param result The `Result` to fold.
   * @param mapFn The function to apply if `result` is `Ok`.
   * @param mapErrFn The function to apply if `result` is `Err`.
   * @returns A new `Result<S2, E2>` based on the applied function.
   * @example
   * ```typescript
   * // Regular usage
   * const result = Result.ok(42);
   * const folded = Result.fold(result, x => x * 2, () => 0);
   * console.log(Result.unwrapOk(folded)); // 84
   *
   * // Curried usage for pipe composition
   * const folder = Result.fold((x: number) => x * 2, () => 0);
   * const result2 = pipe(Result.ok(42)).map(folder).value;
   * console.log(Result.unwrapOk(result2)); // 84
   * ```
   */
  export function fold<const R extends Base, S2, E2>(
    result: R,
    mapFn: (value: UnwrapOk<R>) => S2,
    mapErrFn: (error: UnwrapErr<R>) => E2,
  ): Result<S2, E2>;
  export function fold<S, E, S2, E2>(
    mapFn: (value: S) => S2,
    mapErrFn: (error: E) => E2,
  ): (result: Result<S, E>) => Result<S2, E2>;
  export function fold<const R extends Base, S2, E2>(
    ...args:
      | readonly [
          result: R,
          mapFn: (value: UnwrapOk<R>) => S2,
          mapErrFn: (error: UnwrapErr<R>) => E2,
        ]
      | readonly [
          mapFn: (value: UnwrapOk<R>) => S2,
          mapErrFn: (error: UnwrapErr<R>) => E2,
        ]
  ):
    | Result<S2, E2>
    | ((result: Result<UnwrapOk<R>, UnwrapErr<R>>) => Result<S2, E2>) {
    if (args.length === 3) {
      const [result, mapFn, mapErrFn] = args;
      return isOk(result)
        ? ok(
            mapFn(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
              result.value as UnwrapOk<R>,
            ),
          )
        : err(
            mapErrFn(
              // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
              result.value as UnwrapErr<R>,
            ),
          );
    } else {
      const [mapFn, mapErrFn] = args;
      return (result: Result<UnwrapOk<R>, UnwrapErr<R>>) =>
        isOk(result) ? ok(mapFn(result.value)) : err(mapErrFn(result.value));
    }
  }

  /**
   * Applies a function that returns a `Result` to the success value of a `Result`.
   * If the input is `Err`, returns the original `Err`.
   * This is the monadic bind operation for `Result`.
   * @template R The input `Result.Base` type.
   * @template S2 The success type of the `Result` returned by the function.
   * @template E2 The error type of the `Result` returned by the function.
   * @param result The `Result` to flat map.
   * @param flatMapFn The function to apply that returns a `Result`.
   * @returns The result of applying the function, or the original `Err`.
   * @example
   * ```typescript
   * // Regular usage
   * const divide = (a: number, b: number): Result<number, string> =>
   *   b === 0 ? Result.err("Division by zero") : Result.ok(a / b);
   *
   * const result = Result.flatMap(Result.ok(10), x => divide(x, 2));
   * console.log(Result.unwrapOk(result)); // 5
   *
   * // Curried usage for pipe composition
   * const divideBy2 = Result.flatMap((x: number) => divide(x, 2));
   * const result2 = pipe(Result.ok(10)).map(divideBy2).value;
   * console.log(Result.unwrapOk(result2)); // 5
   * ```
   */
  export function flatMap<const R extends Base, const S2, const E2>(
    result: R,
    flatMapFn: (value: UnwrapOk<R>) => Result<S2, E2>,
  ): Result<S2, E2 | UnwrapErr<R>>;
  export function flatMap<const S, const S2, const E2>(
    flatMapFn: (value: S) => Result<S2, E2>,
  ): <const E>(result: Result<S, E>) => Result<S2, E | E2>;
  export function flatMap<const R extends Base, const S2, const E2>(
    ...args:
      | readonly [result: R, flatMapFn: (value: UnwrapOk<R>) => Result<S2, E2>]
      | readonly [flatMapFn: (value: UnwrapOk<R>) => Result<S2, E2>]
  ):
    | Result<S2, E2 | UnwrapErr<R>>
    | (<E>(result: Result<UnwrapOk<R>, E>) => Result<S2, E | E2>) {
    if (args.length === 2) {
      const [result, flatMapFn] = args;
      return isErr(result)
        ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          (result as Err<UnwrapErr<R>>)
        : flatMapFn(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            result.value as UnwrapOk<R>,
          );
    } else {
      const [flatMapFn] = args;
      return <E,>(result: Result<UnwrapOk<R>, E>) =>
        isErr(result) ? result : flatMapFn(result.value);
    }
  }

  /**
   * Unwraps a `Result`, returning the success value or throwing an error with the provided message.
   * @template R The `Result.Base` type to unwrap.
   * @param result The `Result` to unwrap.
   * @param message The error message to throw if the `Result` is `Result.Err`.
   * @returns The success value if `Result.Ok`.
   * @throws Error with the provided message if the `Result` is `Result.Err`.
   * @example
   * ```typescript
   * // Regular usage
   * const result = Result.ok(42);
   * const value = Result.expectToBe(result, "Operation must succeed");
   * console.log(value); // 42
   *
   * // Curried usage for pipe composition
   * const mustBeOk = Result.expectToBe("Operation must succeed");
   * const value2 = pipe(Result.ok(42)).map(mustBeOk).value;
   * console.log(value2); // 42
   * ```
   */
  export function expectToBe<const R extends Base>(
    result: R,
    message: string,
  ): UnwrapOk<R>;
  export function expectToBe<S>(
    message: string,
  ): <E>(result: Result<S, E>) => S;
  export function expectToBe<const R extends Base>(
    ...args: readonly [result: R, message: string] | readonly [message: string]
  ): UnwrapOk<R> | (<E>(result: Result<UnwrapOk<R>, E>) => UnwrapOk<R>) {
    if (args.length === 2) {
      const [result, message] = args;
      if (isErr(result)) {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return result.value as UnwrapOk<R>;
    } else {
      const [message] = args;
      return <E,>(result: Result<UnwrapOk<R>, E>): UnwrapOk<R> => {
        if (isErr(result)) {
          throw new Error(message);
        }
        return result.value;
      };
    }
  }

  /**
   * @internal
   * Utility type to extract the resolved value type from a Promise.
   * @template P The Promise type.
   * @example
   * UnwrapPromise<Promise<string>> // string
   * UnwrapPromise<Promise<number>> // number
   */
  type UnwrapPromise<P extends Promise<unknown>> =
    P extends Promise<infer V> ? V : never;

  /**
   * Converts a Promise into a Promise that resolves to a `Result`.
   * If the input Promise resolves, the `Result` will be `Ok` with the resolved value.
   * If the input Promise rejects, the `Result` will be `Err` with the rejection reason.
   * @template P The type of the input Promise.
   * @param promise The Promise to convert.
   * @returns A Promise that resolves to `Result<UnwrapPromise<P>, unknown>`.
   */
  export const fromPromise = <const P extends Promise<unknown>>(
    promise: P,
  ): Promise<Result<UnwrapPromise<P>, unknown>> =>
    promise
      .then(
        (v) =>
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          ok(v) as Ok<UnwrapPromise<P>>,
      )
      .catch(err);

  /**
   * Swaps the success and error values of a `Result`.
   * @template R The input `Result.Base` type.
   * @param result The `Result` to swap.
   * @returns A new `Result` with success and error swapped.
   * @example
   * ```typescript
   * const okResult = Result.ok(42);
   * const swapped = Result.swap(okResult);
   * console.log(Result.isErr(swapped)); // true
   * console.log(Result.unwrapErr(swapped)); // 42
   * ```
   */
  export const swap = <const R extends Base>(
    result: R,
  ): Result<UnwrapErr<R>, UnwrapOk<R>> =>
    isOk(result)
      ? err(unwrapOk(result))
      : ok(
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          result.value as UnwrapErr<R>,
        );

  /**
   * Converts a `Result` to an `Optional`.
   * If the `Result` is `Ok`, returns `Some` with the value.
   * If the `Result` is `Err`, returns `None`.
   * Note: This is implemented as a type-only conversion without runtime imports
   * to avoid circular dependencies.
   * @template R The input `Result.Base` type.
   * @param result The `Result` to convert.
   * @returns An object compatible with `Optional` containing the success value or representing `None`.
   * @example
   * ```typescript
   * const okResult = Result.ok(42);
   * const optional = Result.toOptional(okResult);
   * // optional can be used with Optional functions after importing Optional
   *
   * const errResult = Result.err("error");
   * const none = Result.toOptional(errResult);
   * // none represents Optional.none
   * ```
   */
  export const toOptional = <const R extends Base>(
    result: R,
  ): Optional<UnwrapOk<R>> =>
    isOk(result) ? Optional.some(unwrapOk(result)) : Optional.none;

  /**
   * Returns the `Result` if it is `Ok`, otherwise returns the alternative.
   * @template R The input `Result.Base` type.
   * @param result The `Result` to check.
   * @param alternative The alternative `Result` to return if the first is `Err`.
   * @returns The first `Result` if `Ok`, otherwise the alternative.
   * @example
   * ```typescript
   * // Regular usage
   * const primary = Result.err("error");
   * const fallback = Result.ok("default");
   * const result = Result.orElse(primary, fallback);
   * console.log(Result.unwrapOk(result)); // "default"
   *
   * // Curried usage for pipe composition
   * const fallbackTo = Result.orElse(Result.ok("fallback"));
   * const result2 = pipe(Result.err("error")).map(fallbackTo).value;
   * console.log(Result.unwrapOk(result2)); // "fallback"
   * ```
   */
  export function orElse<const R extends Base, const R2 extends Base>(
    result: R,
    alternative: R2,
  ): NarrowToOk<R> | R2;
  export function orElse<S, E, S2, E2>(
    alternative: Result<S2, E2>,
  ): (result: Result<S, E>) => Result<S, E> | Result<S2, E2>;
  export function orElse<const R extends Base, const R2 extends Base>(
    ...args:
      | readonly [result: R, alternative: R2]
      | readonly [alternative: R2]
  ): NarrowToOk<R> | R2 | ((result: Result<UnwrapOk<R>, UnwrapErr<R>>) => Result<UnwrapOk<R>, UnwrapErr<R>> | R2) {
    if (args.length === 2) {
      const [result, alternative] = args;
      return isOk(result) ? result : alternative;
    } else {
      const [alternative] = args;
      return (result: Result<UnwrapOk<R>, UnwrapErr<R>>) =>
        isOk(result) ? result : alternative;
    }
  }

  /**
   * Combines two `Result` values into a single `Result` containing a tuple.
   * If either `Result` is `Err`, returns the first `Err` encountered.
   * @template S1 The success type of the first `Result`.
   * @template E1 The error type of the first `Result`.
   * @template S2 The success type of the second `Result`.
   * @template E2 The error type of the second `Result`.
   * @param resultA The first `Result`.
   * @param resultB The second `Result`.
   * @returns A `Result` containing a tuple of both values, or the first `Err`.
   * @example
   * ```typescript
   * const a = Result.ok(1);
   * const b = Result.ok("hello");
   * const zipped = Result.zip(a, b);
   * console.log(Result.unwrapOk(zipped)); // [1, "hello"]
   *
   * const withErr = Result.zip(a, Result.err("error"));
   * console.log(Result.unwrapErr(withErr)); // "error"
   * ```
   */
  export const zip = <S1, E1, S2, E2>(
    resultA: Result<S1, E1>,
    resultB: Result<S2, E2>,
  ): Result<readonly [S1, S2], E1 | E2> =>
    isOk(resultA)
      ? isOk(resultB)
        ? ok([resultA.value, resultB.value] as const)
        : resultB
      : resultA;
}
