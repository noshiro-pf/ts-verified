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
 * Represents a value that can either be a success ('Ok') or an error ('Err').
 * @template S The type of the success value.
 * @template E The type of the error value.
 */
export type Result<S, E> = Err_<E> | Ok_<S>;

/**
 * Namespace for `Result` type and related functions.
 * Provides a way to handle operations that can succeed or fail.
 */
export namespace Result {
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
   * If the `Result` is `Result.Err<E>`, it resolves to `never`.
   * @template R The `Result.Base` type to unwrap.
   */
  export type UnwrapOk<R extends Base> = R extends Ok<infer S> ? S : never;

  /**
   * Extracts the error value type `E` from a `Result.Err<E>`.
   * If the `Result` is `Result.Ok<S>`, it resolves to `never`.
   * @template R The `Result.Base` type to unwrap.
   */
  export type UnwrapErr<R extends Base> = R extends Err<infer E> ? E : never;

  /**
   * Narrows a `Result.Base` type to `Result.Ok<S>` if it is indeed an `Ok`.
   * If the `Result` is `Result.Err<E>`, it resolves to `never`.
   * @template R The `Result.Base` type to narrow.
   */
  export type NarrowToOk<R extends Base> = R extends Err<unknown> ? never : R;

  /**
   * Narrows a `Result.Base` type to `Result.Err<E>` if it is indeed an `Err`.
   * If the `Result` is `Result.Ok<S>`, it resolves to `never`.
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

  /** @internal Default string conversion function. */
  const toStr_ = String;

  /**
   * Checks if a `Result` is `Result.Ok`.
   * Acts as a type guard.
   * @template R The `Result.Base` type to check.
   * @param result The `Result` to check.
   * @returns `true` if the `Result` is `Result.Ok`, `false` otherwise.
   */
  export const isOk = <const R extends Base>(
    result: R,
  ): result is NarrowToOk<R> => result.type === OkTypeSymbol;

  /**
   * Checks if a `Result` is `Result.Err`.
   * Acts as a type guard.
   * @template R The `Result.Base` type to check.
   * @param result The `Result` to check.
   * @returns `true` if the `Result` is `Result.Err`, `false` otherwise.
   */
  export const isErr = <const R extends Base>(
    result: R,
  ): result is NarrowToErr<R> => result.type === ErrTypeSymbol;

  /**
   * Maps a `Result<S, E>` to `Result<S2, E>` by applying a function to a success value.
   * If the `Result` is `Result.Err`, it returns the original `Err`.
   * Otherwise, it applies `mapFn` to the success value and returns a new `Result.Ok` with the result.
   * @template R The input `Result.Base` type.
   * @template S2 The type of the success value returned by the mapping function.
   * @param result The `Result` to map.
   * @param mapFn The function to apply to the success value if it exists.
   * @returns A new `Result<S2, UnwrapErr<R>>`.
   */
  export const map = <const R extends Base, S2>(
    result: R,
    mapFn: (value: UnwrapOk<R>) => S2,
  ): Result<S2, UnwrapErr<R>> =>
    isErr(result)
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (result as Err<UnwrapErr<R>>)
      : ok(
          mapFn(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            result.value as UnwrapOk<R>,
          ),
        );

  /**
   * Maps a `Result<S, E>` to `Result<S, E2>` by applying a function to an error value.
   * If the `Result` is `Result.Ok`, it returns the original `Ok`.
   * Otherwise, it applies `mapFn` to the error value and returns a new `Result.Err` with the result.
   * @template R The input `Result.Base` type.
   * @template E2 The type of the error value returned by the mapping function.
   * @param result The `Result` to map.
   * @param mapFn The function to apply to the error value if it exists.
   * @returns A new `Result<UnwrapOk<R>, E2>`.
   */
  export const mapErr = <const R extends Base, E2>(
    result: R,
    mapFn: (error: UnwrapErr<R>) => E2,
  ): Result<UnwrapOk<R>, E2> =>
    isOk(result)
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (result as Ok<UnwrapOk<R>>)
      : err(
          mapFn(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            result.value as UnwrapErr<R>,
          ),
        );

  /**
   * Applies one of two functions depending on whether the `Result` is `Ok` or `Err`.
   * @template R The input `Result.Base` type.
   * @template S2 The type of the success value returned by `mapFn`.
   * @template E2 The type of the error value returned by `mapErrFn`.
   * @param result The `Result` to fold.
   * @param mapFn The function to apply if `result` is `Ok`.
   * @param mapErrFn The function to apply if `result` is `Err`.
   * @returns A new `Result<S2, E2>` based on the applied function.
   */
  export const fold = <const R extends Base, S2, E2>(
    result: R,
    mapFn: (value: UnwrapOk<R>) => S2,
    mapErrFn: (error: UnwrapErr<R>) => E2,
  ): Result<S2, E2> =>
    isOk(result)
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
   * Unwraps a `Result`, returning the success value or `undefined` if it's `Result.Err`.
   * @template R The `Result.Base` type to unwrap.
   * @param result The `Result` to unwrap.
   * @returns The success value if `Result.Ok`, otherwise `undefined`.
   */
  export const unwrapOk = <const R extends Base>(
    result: R,
  ): UnwrapOk<R> | undefined =>
    isErr(result)
      ? undefined
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (result.value as UnwrapOk<R>);

  /**
   * Unwraps a `Result`, returning the success value or a default value if it's `Result.Err`.
   * @template R The `Result.Base` type to unwrap.
   * @template D The type of the default value.
   * @param result The `Result` to unwrap.
   * @param defaultValue The value to return if `result` is `Result.Err`.
   * @returns The success value if `Result.Ok`, otherwise `defaultValue`.
   */
  export const unwrapOkOr = <const R extends Base, D>(
    result: R,
    defaultValue: D,
  ): D | UnwrapOk<R> =>
    isErr(result)
      ? defaultValue
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (result.value as UnwrapOk<R>);

  /**
   * Unwraps a `Result`, returning the error value or `undefined` if it's `Result.Ok`.
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
   * Unwraps a `Result`, returning the error value or a default value if it's `Result.Ok`.
   * @template R The `Result.Base` type to unwrap.
   * @template D The type of the default value.
   * @param result The `Result` to unwrap.
   * @param defaultValue The value to return if `result` is `Result.Ok`.
   * @returns The error value if `Result.Err`, otherwise `defaultValue`.
   */
  export const unwrapErrOr = <const R extends Base, D>(
    result: R,
    defaultValue: D,
  ): D | UnwrapErr<R> =>
    isErr(result)
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (result.value as UnwrapErr<R>)
      : defaultValue;

  /**
   * Returns a function that unwraps a `Result`, returning the success value.
   * Throws an error with the provided message if the `Result` is `Result.Err`.
   * @template R The `Result.Base` type to unwrap.
   * @param message The error message to throw if the `Result` is `Result.Err`.
   * @returns A function that takes a `Result` and returns its success value or throws.
   */
  export const expectToBe =
    <const R extends Base>(message: string) =>
    (result: R): UnwrapOk<R> => {
      if (isErr(result)) {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return result.value as UnwrapOk<R>;
    };

  /**
   * @internal
   * Utility type to extract the resolved value type from a Promise.
   * @template P The Promise type.
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
}
