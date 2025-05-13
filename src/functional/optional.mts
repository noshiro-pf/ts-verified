/** @internal Symbol to identify the 'Some' variant of Optional. */
const SomeTypeSymbol: unique symbol = Symbol('Optional.some');
/** @internal Symbol to identify the 'None' variant of Optional. */
const NoneTypeSymbol: unique symbol = Symbol('Optional.none');

/**
 * @internal
 * Represents the 'Some' variant of an Optional, containing a value.
 * @template S The type of the contained value.
 */
type Some_<S> = Readonly<{
  /** Discriminant property for the 'Some' type. */
  type: typeof SomeTypeSymbol;
  /** The contained value. */
  value: S;
}>;

/**
 * @internal
 * Represents the 'None' variant of an Optional, indicating the absence of a value.
 */
type None_ = Readonly<{
  /** Discriminant property for the 'None' type. */
  type: typeof NoneTypeSymbol;
}>;

/**
 * Represents an optional value that can either be 'Some' (containing a value) or 'None' (empty).
 * @template S The type of the value that might be present.
 */
export type Optional<S> = None_ | Some_<S>;

/**
 * Namespace for `Optional` type and related functions.
 * Provides a way to handle values that might be absent, similar to Option types in other languages.
 */
export namespace Optional {
  /**
   * Represents an `Optional` that contains a value.
   * @template S The type of the contained value.
   */
  export type Some<S> = Some_<S>;
  /**
   * Represents an `Optional` that does not contain a value (is empty).
   */
  export type None = None_;

  /**
   * Base type for any `Optional`, used for generic constraints.
   * Represents an `Optional` with an unknown value type.
   */
  export type Base = Optional<unknown>;

  /**
   * Extracts the value type `S` from an `Optional.Some<S>`.
   * If the `Optional` is `Optional.None`, it resolves to `never`.
   * @template M The `Optional.Base` type to unwrap.
   */
  export type Unwrap<M extends Base> = M extends Some<infer S> ? S : never;

  /**
   * Narrows an `Optional.Base` type to `Optional.Some<S>` if it is indeed a `Some`.
   * If the `Optional` is `Optional.None`, it resolves to `never`.
   * @template M The `Optional.Base` type to narrow.
   */
  export type NarrowToSome<M extends Base> = M extends None ? never : M;

  /**
   * Narrows an `Optional.Base` type to `Optional.None` if it is indeed a `None`.
   * If the `Optional` is `Optional.Some<S>`, it resolves to `never`.
   * @template M The `Optional.Base` type to narrow.
   */
  export type NarrowToNone<M extends Base> =
    M extends Some<unknown> ? never : M;

  /**
   * Creates an `Optional.Some` containing the given value.
   * @template S The type of the value.
   * @param value The value to wrap in an `Optional.Some`.
   * @returns An `Optional.Some<S>` containing the value.
   */
  export const some = <const S,>(value: S): Some<S> => ({
    type: SomeTypeSymbol,
    value,
  });

  /**
   * Represents an `Optional.None` (empty Optional).
   */
  export const none: None = { type: NoneTypeSymbol } as const;

  /**
   * Checks if an `Optional` is `Optional.Some`.
   * Acts as a type guard.
   * @template M The `Optional.Base` type to check.
   * @param optional The `Optional` to check.
   * @returns `true` if the `Optional` is `Optional.Some`, `false` otherwise.
   */
  export const isSome = <const M extends Base>(
    optional: M,
  ): optional is NarrowToSome<M> => optional.type === SomeTypeSymbol;

  /**
   * Checks if an `Optional` is `Optional.None`.
   * Acts as a type guard.
   * @template M The `Optional.Base` type to check.
   * @param optional The `Optional` to check.
   * @returns `true` if the `Optional` is `Optional.None`, `false` otherwise.
   */
  export const isNone = <const M extends Base>(
    optional: M,
  ): optional is NarrowToNone<M> => optional.type === NoneTypeSymbol;

  /**
   * Maps an `Optional<S>` to `Optional<S2>` by applying a function to a contained value.
   * If the `Optional` is `Optional.None`, it returns `Optional.None`.
   * Otherwise, it applies the `mapFn` to the value in `Optional.Some` and returns a new `Optional.Some` with the result.
   * @template M The input `Optional.Base` type.
   * @template S2 The type of the value returned by the mapping function.
   * @param optional The `Optional` to map.
   * @param mapFn The function to apply to the value if it exists.
   * @returns A new `Optional<S2>` resulting from the mapping, or `Optional.None` if the input was `Optional.None`.
   */
  export const map = <const M extends Base, S2>(
    optional: M,
    mapFn: (value: Unwrap<M>) => S2,
  ): Optional<S2> =>
    isNone(optional)
      ? none
      : some(
          mapFn(
            // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
            (optional as NarrowToSome<M>).value as Unwrap<M>,
          ),
        );

  /**
   * Unwraps an `Optional`, returning the contained value.
   * Throws an error if the `Optional` is `Optional.None`.
   * @template M The `Optional.Base` type to unwrap.
   * @param optional The `Optional` to unwrap.
   * @returns The contained value if `Optional.Some`.
   * @throws Error if the `Optional` is `Optional.None`.
   */
  export const unwrapThrow = <const M extends Base>(optional: M): Unwrap<M> => {
    if (isNone(optional)) {
      throw new Error('`unwrapThrow()` has failed because it is `None`');
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return (optional as NarrowToSome<M>).value as Unwrap<M>;
  };

  /**
   * Unwraps an `Optional`, returning the contained value or `undefined` if it's `Optional.None`.
   * @template M The `Optional.Base` type to unwrap.
   * @param optional The `Optional` to unwrap.
   * @returns The contained value if `Optional.Some`, otherwise `undefined`.
   */
  export const unwrap = <const M extends Base>(
    optional: M,
  ): Unwrap<M> | undefined =>
    isNone(optional)
      ? undefined
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        ((optional as NarrowToSome<M>).value as Unwrap<M>);

  /**
   * Unwraps an `Optional`, returning the contained value or a default value if it's `Optional.None`.
   * @template M The `Optional.Base` type to unwrap.
   * @template D The type of the default value.
   * @param optional The `Optional` to unwrap.
   * @param defaultValue The value to return if `optional` is `Optional.None`.
   * @returns The contained value if `Optional.Some`, otherwise `defaultValue`.
   */
  export const unwrapOr = <const M extends Base, D>(
    optional: M,
    defaultValue: D,
  ): D | Unwrap<M> =>
    isNone(optional)
      ? defaultValue
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        ((optional as NarrowToSome<M>).value as Unwrap<M>);

  /**
   * Returns a function that unwraps an `Optional`, returning the contained value.
   * Throws an error with the provided message if the `Optional` is `Optional.None`.
   * @template M The `Optional.Base` type to unwrap.
   * @param message The error message to throw if the `Optional` is `Optional.None`.
   * @returns A function that takes an `Optional` and returns its contained value or throws.
   */
  export const expectToBe =
    <const M extends Base>(message: string) =>
    (optional: M): Unwrap<M> => {
      if (isNone(optional)) {
        throw new Error(message);
      }
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return (optional as NarrowToSome<M>).value as Unwrap<M>;
    };
}
