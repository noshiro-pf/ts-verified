import { isRecord } from '../guard/index.mjs';

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
 * Namespace for the {@link Optional} type and related functions.
 * Provides utilities to handle values that might be absent, similar to Option types in other languages.
 */
export namespace Optional {
  /**
   * Checks if the given value is an {@link Optional}.
   * @param maybeOptional The value to check.
   * @returns `true` if the value is an {@link Optional}, otherwise `false`.
   */
  export const isOptional = (
    maybeOptional: unknown,
  ): maybeOptional is Optional<unknown> =>
    isRecord(maybeOptional) &&
    Object.hasOwn(maybeOptional, 'type') &&
    ((maybeOptional['type'] === SomeTypeSymbol &&
      Object.hasOwn(maybeOptional, 'value')) ||
      maybeOptional['type'] === NoneTypeSymbol);

  /**
   * Represents an {@link Optional} that contains a value.
   * @template S The type of the contained value.
   */
  export type Some<S> = Some_<S>;

  /**
   * Represents an {@link Optional} that does not contain a value (is empty).
   */
  export type None = None_;

  /**
   * Base type for any {@link Optional}, used for generic constraints.
   * Represents an {@link Optional} with an unknown value type.
   */
  export type Base = Optional<unknown>;

  /**
   * Extracts the value type `S` from an {@link Optional.Some}<S>.
   * If the {@link Optional} is {@link Optional.None}, resolves to `never`.
   * @template M The {@link Optional.Base} type to unwrap.
   */
  export type Unwrap<M extends Base> = M extends Some<infer S> ? S : never;

  /**
   * Narrows an {@link Optional.Base} type to {@link Optional.Some}<S> if it is a {@link Optional.Some}.
   * If the {@link Optional} is {@link Optional.None}, resolves to `never`.
   * @template M The {@link Optional.Base} type to narrow.
   */
  export type NarrowToSome<M extends Base> = M extends None ? never : M;

  /**
   * Narrows an {@link Optional.Base} type to {@link Optional.None} if it is a {@link Optional.None}.
   * If the {@link Optional} is {@link Optional.Some}<S>, resolves to `never`.
   * @template M The {@link Optional.Base} type to narrow.
   */
  export type NarrowToNone<M extends Base> =
    M extends Some<unknown> ? never : M;

  /**
   * Creates an {@link Optional.Some} containing the given value.
   * @template S The type of the value.
   * @param value The value to wrap in an {@link Optional.Some}.
   * @returns An {@link Optional.Some}<S> containing the value.
   */
  export const some = <const S,>(value: S): Some<S> => ({
    type: SomeTypeSymbol,
    value,
  });

  /**
   * The singleton instance representing {@link Optional.None} (an empty Optional).
   */
  export const none: None = { type: NoneTypeSymbol } as const;

  /**
   * Checks if an {@link Optional} is {@link Optional.Some}.
   * Acts as a type guard.
   * @template M The {@link Optional.Base} type to check.
   * @param optional The {@link Optional} to check.
   * @returns `true` if the {@link Optional} is {@link Optional.Some}, `false` otherwise.
   */
  export const isSome = <const M extends Base>(
    optional: M,
  ): optional is NarrowToSome<M> => optional.type === SomeTypeSymbol;

  /**
   * Checks if an {@link Optional} is {@link Optional.None}.
   * Acts as a type guard.
   * @template M The {@link Optional.Base} type to check.
   * @param optional The {@link Optional} to check.
   * @returns `true` if the {@link Optional} is {@link Optional.None}, `false` otherwise.
   */
  export const isNone = <const M extends Base>(
    optional: M,
  ): optional is NarrowToNone<M> => optional.type === NoneTypeSymbol;

  /**
   * Maps an {@link Optional}<S> to {@link Optional}<S2> by applying a function to a contained value.
   * If the {@link Optional} is {@link Optional.None}, it returns {@link Optional.none}.
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
