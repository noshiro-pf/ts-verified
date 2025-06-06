import { isRecord } from '../guard/index.mjs';
import { pipe } from './pipe.mjs';

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
   * @template O The {@link Optional.Base} type to unwrap.
   */
  export type Unwrap<O extends Base> = O extends Some<infer S> ? S : never;

  /**
   * Narrows an {@link Optional.Base} type to {@link Optional.Some}<S> if it is a {@link Optional.Some}.
   * If the {@link Optional} is {@link Optional.None}, resolves to `never`.
   * @template O The {@link Optional.Base} type to narrow.
   */
  export type NarrowToSome<O extends Base> = O extends None ? never : O;

  /**
   * Narrows an {@link Optional.Base} type to {@link Optional.None} if it is a {@link Optional.None}.
   * If the {@link Optional} is {@link Optional.Some}<S>, resolves to `never`.
   * @template O The {@link Optional.Base} type to narrow.
   */
  export type NarrowToNone<O extends Base> = O extends None ? O : never;

  /**
   * Creates an {@link Optional.Some} containing the given value.
   * @template S The type of the value.
   * @param value The value to wrap in an {@link Optional.Some}.
   * @returns An {@link Optional.Some}<S> containing the value.
   * @example
   * ```typescript
   * const someValue = Optional.some(42);
   * const someString = Optional.some("hello");
   * const someObject = Optional.some({ name: "Alice", age: 30 });
   *
   * console.log(Optional.isSome(someValue)); // true
   * console.log(Optional.unwrap(someValue)); // 42
   * ```
   */
  export const some = <S,>(value: S): Some<S> => ({
    type: SomeTypeSymbol,
    value,
  });

  /**
   * The singleton instance representing {@link Optional.None} (an empty Optional).
   * @example
   * ```typescript
   * const emptyValue = Optional.none;
   *
   * console.log(Optional.isNone(emptyValue)); // true
   * console.log(Optional.unwrap(emptyValue)); // undefined
   * console.log(Optional.unwrapOr(emptyValue, "default")); // "default"
   * ```
   */
  export const none: None = { type: NoneTypeSymbol } as const;

  /**
   * Checks if an {@link Optional} is {@link Optional.Some}.
   * Acts as a type guard.
   * @template O The {@link Optional.Base} type to check.
   * @param optional The {@link Optional} to check.
   * @returns `true` if the {@link Optional} is {@link Optional.Some}, `false` otherwise.
   */
  export const isSome = <O extends Base>(
    optional: O,
  ): optional is NarrowToSome<O> => optional.type === SomeTypeSymbol;

  /**
   * Checks if an {@link Optional} is {@link Optional.None}.
   * Acts as a type guard.
   * @template O The {@link Optional.Base} type to check.
   * @param optional The {@link Optional} to check.
   * @returns `true` if the {@link Optional} is {@link Optional.None}, `false` otherwise.
   */
  export const isNone = <O extends Base>(
    optional: O,
  ): optional is NarrowToNone<O> => optional.type === NoneTypeSymbol;

  /**
   * Unwraps an `Optional`, returning the contained value.
   * Throws an error if the `Optional` is `Optional.None`.
   * @template O The `Optional.Base` type to unwrap.
   * @param optional The `Optional` to unwrap.
   * @returns The contained value if `Optional.Some`.
   * @throws {Error} Error if the `Optional` is `Optional.None`.
   * @example
   * ```typescript
   * const some = Optional.some(42);
   * console.log(Optional.unwrapThrow(some)); // 42
   *
   * const none = Optional.none;
   * // Optional.unwrapThrow(none); // throws Error
   * ```
   */
  export const unwrapThrow = <O extends Base>(optional: O): Unwrap<O> => {
    if (isSome(optional)) {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return optional.value as Unwrap<O>;
    }

    throw new Error('`unwrapThrow()` has failed because it is `None`');
  };

  /**
   * Unwraps an `Optional` that is known to be `Some`, returning the contained value.
   * @template O The `Optional.Some` type to unwrap.
   * @param optional The `Optional.Some` to unwrap.
   * @returns The contained value.
   */
  export function unwrap<O extends Some<unknown>>(optional: O): Unwrap<O>;
  /**
   * Unwraps an `Optional`, returning the contained value or `undefined` if it's `Optional.None`.
   * @template O The `Optional.Base` type to unwrap.
   * @param optional The `Optional` to unwrap.
   * @returns The contained value if `Optional.Some`, otherwise `undefined`.
   */
  export function unwrap<O extends Base>(optional: O): Unwrap<O> | undefined;

  export function unwrap<O extends Base>(optional: O): Unwrap<O> | undefined {
    return isNone(optional)
      ? undefined
      : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        ((optional as NarrowToSome<O>).value as Unwrap<O>);
  }

  /**
   * Unwraps an `Optional`, returning the contained value or a default value if it's `Optional.None`.
   * @template O The `Optional.Base` type to unwrap.
   * @template D The type of the default value.
   * @param optional The `Optional` to unwrap.
   * @param defaultValue The value to return if `optional` is `Optional.None`.
   * @returns The contained value if `Optional.Some`, otherwise `defaultValue`.
   * @example
   * ```typescript
   * // Regular usage
   * const some = Optional.some(42);
   * const value = Optional.unwrapOr(some, 0);
   * console.log(value); // 42
   *
   * // Curried usage for pipe composition
   * const unwrapWithDefault = Optional.unwrapOr(0);
   * const value2 = pipe(Optional.none).map(unwrapWithDefault).value;
   * console.log(value2); // 0
   * ```
   */
  export function unwrapOr<O extends Base, D>(
    optional: O,
    defaultValue: D,
  ): D | Unwrap<O>;

  export function unwrapOr<S, D>(
    defaultValue: D,
  ): (optional: Optional<S>) => D | S;

  export function unwrapOr<O extends Base, D>(
    ...args:
      | readonly [optional: O, defaultValue: D]
      | readonly [defaultValue: D]
  ): D | Unwrap<O> | ((optional: Optional<Unwrap<O>>) => D | Unwrap<O>) {
    if (args.length === 2) {
      const [optional, defaultValue] = args;
      return isNone(optional)
        ? defaultValue
        : // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          ((optional as NarrowToSome<O>).value as Unwrap<O>);
    } else {
      const [defaultValue] = args;
      return (optional: Optional<Unwrap<O>>) =>
        isNone(optional) ? defaultValue : unwrap(optional);
    }
  }

  /**
   * Returns the `Optional` if it is `Some`, otherwise returns the alternative.
   * @template O The input `Optional.Base` type.
   * @param optional The `Optional` to check.
   * @param alternative The alternative `Optional` to return if the first is `None`.
   * @returns The first `Optional` if `Some`, otherwise the alternative.
   * @example
   * ```typescript
   * // Regular usage
   * const primary = Optional.none;
   * const fallback = Optional.some("default");
   * const result = Optional.orElse(primary, fallback);
   * console.log(Optional.unwrap(result)); // "default"
   *
   * // Curried usage for pipe composition
   * const fallbackTo = Optional.orElse(Optional.some("fallback"));
   * const result2 = pipe(Optional.none).map(fallbackTo).value;
   * console.log(Optional.unwrap(result2)); // "fallback"
   * ```
   */
  export function orElse<O extends Base, const O2 extends Base>(
    optional: O,
    alternative: O2,
  ): O | O2;

  export function orElse<S, S2>(
    alternative: Optional<S2>,
  ): (optional: Optional<S>) => Optional<S> | Optional<S2>;

  export function orElse<O extends Base, const O2 extends Base>(
    ...args:
      | readonly [optional: O, alternative: O2]
      | readonly [alternative: O2]
  ): O | O2 | ((optional: Optional<Unwrap<O>>) => Optional<Unwrap<O>> | O2) {
    if (args.length === 2) {
      const [optional, alternative] = args;
      return isNone(optional) ? alternative : optional;
    } else {
      const [alternative] = args;
      return (optional: Optional<Unwrap<O>>) =>
        isNone(optional) ? alternative : optional;
    }
  }

  /**
   * Maps an {@link Optional}<S> to {@link Optional}<S2> by applying a function to a contained value.
   * If the {@link Optional} is {@link Optional.None}, it returns {@link Optional.none}.
   * Otherwise, it applies the `mapFn` to the value in `Optional.Some` and returns a new `Optional.Some` with the result.
   * @template O The input `Optional.Base` type.
   * @template S2 The type of the value returned by the mapping function.
   * @param optional The `Optional` to map.
   * @param mapFn The function to apply to the value if it exists.
   * @returns A new `Optional<S2>` resulting from the mapping, or `Optional.None` if the input was `Optional.None`.
   * @example
   * ```typescript
   * const someNumber = Optional.some(5);
   * const mapped = Optional.map(someNumber, x => x * 2);
   * console.log(Optional.unwrap(mapped)); // 10
   *
   * const noneValue = Optional.none;
   * const mappedNone = Optional.map(noneValue, x => x * 2);
   * console.log(Optional.isNone(mappedNone)); // true
   *
   * // Chaining maps
   * const result = Optional.map(
   *   Optional.map(Optional.some("hello"), s => s.toUpperCase()),
   *   s => s.length
   * );
   * console.log(Optional.unwrap(result)); // 5
   *
   * // Curried version for use with pipe
   * const doubler = Optional.map((x: number) => x * 2);
   * const result2 = pipe(Optional.some(5)).map(doubler).value;
   * console.log(Optional.unwrap(result2)); // 10
   * ```
   */
  export function map<O extends Base, S2>(
    optional: O,
    mapFn: (value: Unwrap<O>) => S2,
  ): Optional<S2>;

  export function map<S, S2>(
    mapFn: (value: S) => S2,
  ): (optional: Optional<S>) => Optional<S2>;

  export function map<O extends Base, S2>(
    ...args:
      | readonly [optional: O, mapFn: (value: Unwrap<O>) => S2]
      | readonly [mapFn: (value: Unwrap<O>) => S2]
  ): Optional<S2> | ((optional: Optional<Unwrap<O>>) => Optional<S2>) {
    if (args.length === 2) {
      const [optional, mapFn] = args;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      return isSome(optional) ? some(mapFn(unwrap(optional)!)) : none;
    } else {
      const [mapFn] = args;
      return (optional: Optional<Unwrap<O>>) =>
        // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        isSome(optional) ? some(mapFn(unwrap(optional)!)) : none;
    }
  }

  /**
   * Applies a function that returns an `Optional` to the value in an `Optional.Some`.
   * If the input is `Optional.None`, returns `Optional.None`.
   * This is the monadic bind operation for `Optional`.
   * @template O The input `Optional.Base` type.
   * @template S2 The value type of the `Optional` returned by the function.
   * @param optional The `Optional` to flat map.
   * @param flatMapFn The function to apply that returns an `Optional`.
   * @returns The result of applying the function, or `Optional.None`.
   * @example
   * ```typescript
   * // Regular usage
   * const parseNumber = (s: string): Optional<number> => {
   *   const n = Number(s);
   *   return isNaN(n) ? Optional.none : Optional.some(n);
   * };
   *
   * const result = Optional.flatMap(Optional.some("42"), parseNumber);
   * console.log(Optional.unwrap(result)); // 42
   *
   * // Curried usage for pipe composition
   * const parser = Optional.flatMap(parseNumber);
   * const result2 = pipe(Optional.some("42")).map(parser).value;
   * console.log(Optional.unwrap(result2)); // 42
   * ```
   */
  export function flatMap<O extends Base, S2>(
    optional: O,
    flatMapFn: (value: Unwrap<O>) => Optional<S2>,
  ): Optional<S2>;
  export function flatMap<S, S2>(
    flatMapFn: (value: S) => Optional<S2>,
  ): (optional: Optional<S>) => Optional<S2>;
  export function flatMap<O extends Base, S2>(
    ...args:
      | readonly [optional: O, flatMapFn: (value: Unwrap<O>) => Optional<S2>]
      | readonly [flatMapFn: (value: Unwrap<O>) => Optional<S2>]
  ): Optional<S2> | ((optional: Optional<Unwrap<O>>) => Optional<S2>) {
    if (args.length === 2) {
      const [optional, flatMapFn] = args;
      return isSome(optional) ? flatMapFn(unwrap(optional)) : none;
    } else {
      const [flatMapFn] = args;
      return (optional: Optional<Unwrap<O>>) =>
        isSome(optional) ? flatMapFn(unwrap(optional)) : none;
    }
  }

  /**
   * Filters an `Optional` based on a predicate.
   * If the `Optional` is `Some` and the predicate returns true, returns the original `Optional`.
   * Otherwise returns `None`.
   * @template O The input `Optional.Base` type.
   * @param optional The `Optional` to filter.
   * @param predicate The predicate function.
   * @returns The filtered `Optional`.
   * @example
   * ```typescript
   * // Regular usage
   * const someEven = Optional.some(4);
   * const filtered = Optional.filter(someEven, x => x % 2 === 0);
   * console.log(Optional.unwrap(filtered)); // 4
   *
   * // Curried usage for pipe composition
   * const evenFilter = Optional.filter((x: number) => x % 2 === 0);
   * const result = pipe(Optional.some(4)).map(evenFilter).value;
   * console.log(Optional.unwrap(result)); // 4
   * ```
   */
  export function filter<O extends Base>(
    optional: O,
    predicate: (value: Unwrap<O>) => boolean,
  ): Optional<Unwrap<O>>;

  export function filter<S>(
    predicate: (value: S) => boolean,
  ): (optional: Optional<S>) => Optional<S>;

  export function filter<O extends Base>(
    ...args:
      | readonly [optional: O, predicate: (value: Unwrap<O>) => boolean]
      | readonly [predicate: (value: Unwrap<O>) => boolean]
  ):
    | Optional<Unwrap<O>>
    | ((optional: Optional<Unwrap<O>>) => Optional<Unwrap<O>>) {
    if (args.length === 2) {
      const [optional, predicate] = args;
      return isSome(optional)
        ? pipe(unwrap(optional)).map((value) =>
            predicate(value) ? some(value) : none,
          ).value
        : none;
    } else {
      const [predicate] = args;
      return (optional: Optional<Unwrap<O>>) =>
        isSome(optional)
          ? pipe(unwrap(optional)).map((value) =>
              predicate(value) ? some(value) : none,
            ).value
          : none;
    }
  }

  /**
   * Unwraps an `Optional`, returning the contained value or throwing an error with the provided message.
   * @template O The `Optional.Base` type to unwrap.
   * @param optional The `Optional` to unwrap.
   * @param message The error message to throw if the `Optional` is `Optional.None`.
   * @returns The contained value if `Optional.Some`.
   * @throws Error with the provided message if the `Optional` is `Optional.None`.
   * @example
   * ```typescript
   * // Regular usage
   * const some = Optional.some(42);
   * const value = Optional.expectToBe(some, "Value must exist");
   * console.log(value); // 42
   *
   * // Curried usage for pipe composition
   * const getValue = Optional.expectToBe("Value must exist");
   * const value2 = pipe(Optional.some(42)).map(getValue).value;
   * console.log(value2); // 42
   * ```
   */
  export function expectToBe<O extends Base>(
    optional: O,
    message: string,
  ): Unwrap<O>;

  export function expectToBe<S>(message: string): (optional: Optional<S>) => S;

  export function expectToBe<O extends Base>(
    ...args:
      | readonly [optional: O, message: string]
      | readonly [message: string]
  ): Unwrap<O> | ((optional: Optional<Unwrap<O>>) => Unwrap<O>) {
    if (args.length === 2) {
      const [optional, message] = args;
      if (isSome(optional)) {
        return unwrap(optional);
      }
      throw new Error(message);
    } else {
      const [message] = args;
      return (optional: Optional<Unwrap<O>>): Unwrap<O> => {
        if (isSome(optional)) {
          return unwrap(optional);
        }
        throw new Error(message);
      };
    }
  }

  /**
   * Combines two `Optional` values into a single `Optional` containing a tuple.
   * If either `Optional` is `None`, returns `None`.
   * @template A The value type of the first `Optional`.
   * @template B The value type of the second `Optional`.
   * @param optionalA The first `Optional`.
   * @param optionalB The second `Optional`.
   * @returns An `Optional` containing a tuple of both values, or `None`.
   * @example
   * ```typescript
   * const a = Optional.some(1);
   * const b = Optional.some("hello");
   * const zipped = Optional.zip(a, b);
   * console.log(Optional.unwrap(zipped)); // [1, "hello"]
   *
   * const withNone = Optional.zip(a, Optional.none);
   * console.log(Optional.isNone(withNone)); // true
   * ```
   */
  export const zip = <A, const B>(
    optionalA: Optional<A>,
    optionalB: Optional<B>,
  ): Optional<readonly [A, B]> =>
    isSome(optionalA) && isSome(optionalB)
      ? some([optionalA.value, optionalB.value] as const)
      : none;

  /**
   * Converts a nullable value to an `Optional`.
   * @template T The type of the nullable value.
   * @param value The nullable value to convert.
   * @returns `Optional.Some` if the value is not null or undefined, otherwise `Optional.None`.
   * @example
   * ```typescript
   * const value: string | null = "hello";
   * const optional = Optional.fromNullable(value);
   * console.log(Optional.unwrap(optional)); // "hello"
   *
   * const nullValue: string | null = null;
   * const noneOptional = Optional.fromNullable(nullValue);
   * console.log(Optional.isNone(noneOptional)); // true
   * ```
   */
  export const fromNullable = <T,>(
    value: T | null | undefined,
  ): Optional<NonNullable<T>> => (value == null ? none : some(value));

  /**
   * Converts an `Optional` to a nullable value.
   * @template O The `Optional.Base` type to convert.
   * @param optional The `Optional` to convert.
   * @returns The contained value if `Some`, otherwise `undefined`.
   * @example
   * ```typescript
   * const some = Optional.some(42);
   * console.log(Optional.toNullable(some)); // 42
   *
   * const none = Optional.none;
   * console.log(Optional.toNullable(none)); // null
   * ```
   */
  export const toNullable = <O extends Base>(
    optional: O,
  ): Unwrap<O> | undefined => (isSome(optional) ? unwrap(optional) : undefined);
}
