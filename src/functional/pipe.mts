import { Optional } from './optional.mjs';

/**
 * Creates a new pipe object that allows for chaining operations on a value.
 *
 * This function provides a fluent interface for applying transformations to values,
 * with special support for Optional types that get additional mapOptional functionality.
 *
 * @template A The type of the initial value.
 * @param a The initial value to wrap in a pipe.
 * @returns A pipe object with chaining methods appropriate for the value type.
 *
 * @example
 * ```typescript
 * // Basic value chaining
 * const result = pipe(10)
 *   .map(x => x * 2)      // 20
 *   .map(x => x + 5)      // 25
 *   .map(x => x.toString()) // '25'
 *   .value;
 *
 * // Nullable value handling
 * const maybeNumber: number | null = getNumber();
 * const result2 = pipe(maybeNumber)
 *   .mapNullable(x => x * 2)           // Only applies if not null
 *   .mapNullable(x => `Result: ${x}`)  // Only applies if previous step succeeded
 *   .value; // 'Result: 20' or undefined
 *
 * // Optional value handling
 * const optional = Optional.some(42);
 * const result3 = pipe(optional)
 *   .mapOptional(x => x / 2)     // 21
 *   .mapOptional(x => Math.sqrt(x)) // ~4.58
 *   .value; // Optional.some(4.58...)
 *
 * // Chaining different operation types
 * const complex = pipe('hello')
 *   .map(s => s.length)          // 5
 *   .map(n => n > 3 ? n : null)  // 5
 *   .mapNullable(n => n * 10)    // 50
 *   .value; // 50 or undefined
 * ```
 */
export function pipe<const A extends Optional<unknown>>(
  a: A,
): PipeWithMapOptional<A>;

export function pipe<const A>(a: A): PipeBase<A>;

export function pipe<const A>(a: A): Pipe<A> {
  if (Optional.isOptional(a)) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return {
      value: a,
      map: (fn) => pipe(fn(a)),
      mapNullable: (fn) => pipe(fn(a)),
      mapOptional: (fn) => pipe(Optional.map(a, fn)),
    } satisfies PipeWithMapOptional<typeof a> as unknown as Pipe<A>;
  } else {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return {
      value: a,
      map: (fn) => pipe(fn(a)),
      mapNullable: (fn) => pipe(a == null ? undefined : fn(a)),
    } satisfies PipeBase<A> as Pipe<A>;
  }
}

type Pipe<A> =
  A extends Optional<unknown> ? PipeWithMapOptional<A> : PipeBase<A>;

/**
 * Base interface for pipe objects that support method chaining transformations.
 *
 * Provides core chaining functionality with map and mapNullable operations.
 * This is the foundation for all pipe objects, with Optional types getting
 * additional mapOptional functionality through PipeWithMapOptional.
 *
 * @template A The type of the value currently held by the pipe.
 */
type PipeBase<A> = Readonly<{
  /** The current value held by the pipe. */
  value: A;

  /**
   * Applies a transformation function to the current value and returns a new pipe with the result.
   *
   * This is the core transformation method that always applies the function to the current value,
   * regardless of whether it's null, undefined, or any other value.
   *
   * @template B The type of the transformed value.
   * @param fn A function that takes the current value and returns a transformed value.
   * @returns A new pipe containing the transformed value.
   *
   * @example
   * ```typescript
   * pipe(5)
   *   .map(x => x * 2)        // 10
   *   .map(x => x.toString()) // '10'
   *   .map(s => s.length)     // 2
   *   .value;
   * ```
   */
  map: <B>(fn: (a: A) => B) => PipeBase<B>;

  /**
   * Applies a transformation function to the current value only if it is not null or undefined.
   *
   * This method provides safe transformation of potentially nullable values. If the current
   * value is null or undefined, the transformation is skipped and undefined is returned.
   * Otherwise, the function is applied to the non-nullable value.
   *
   * @template B The type of the transformed value.
   * @param fn A function that takes the non-nullable current value and returns a transformed value.
   * @returns A new pipe containing the transformed value or undefined.
   *
   * @example
   * ```typescript
   * // With non-null value
   * pipe(42)
   *   .mapNullable(x => x * 2)     // 84
   *   .mapNullable(x => x > 50)    // true
   *   .value;
   *
   * // With null value
   * pipe(null as number | null)
   *   .mapNullable(x => x * 2)     // skipped, undefined
   *   .mapNullable(x => x > 50)    // skipped, undefined
   *   .value; // undefined
   *
   * // Chaining with mixed results
   * pipe(10)
   *   .map(x => x > 5 ? x : null)  // null
   *   .mapNullable(x => x * 2)     // skipped, undefined
   *   .value; // undefined
   * ```
   */
  mapNullable: <B>(fn: (a: NonNullable<A>) => B) => PipeBase<B | undefined>;
}>;

/**
 * Extended pipe interface for Optional values that includes mapOptional functionality.
 *
 * This type combines the base pipe functionality with Optional-specific operations,
 * providing a seamless chaining experience for Optional values while maintaining
 * type safety and the Optional context.
 *
 * @template A The Optional type currently held by the pipe.
 */
type PipeWithMapOptional<A extends Optional<unknown>> = MergeIntersection<
  PipeBase<A> &
    Readonly<{
      /**
       * Applies a transformation function to the value inside an Optional, if present.
       *
       * This method is only available when the pipe contains an Optional value.
       * It safely transforms the wrapped value without unwrapping the Optional,
       * maintaining the Optional context throughout the transformation chain.
       *
       * @template B The type of the transformed value.
       * @param fn A function that takes the unwrapped value from the Optional and returns a transformed value.
       * @returns A new pipe containing an Optional with the transformed value.
       *
       * @example
       * ```typescript
       * // With Some value
       * pipe(Optional.some(10))
       *   .mapOptional(x => x * 2)          // Optional.some(20)
       *   .mapOptional(x => x.toString())   // Optional.some('20')
       *   .mapOptional(s => s.length)       // Optional.some(2)
       *   .value; // Optional.some(2)
       *
       * // With None value
       * pipe(Optional.none())
       *   .mapOptional(x => x * 2)          // Optional.none() - skipped
       *   .mapOptional(x => x.toString())   // Optional.none() - skipped
       *   .value; // Optional.none()
       *
       * // Mixed with other operations
       * pipe(Optional.some(5))
       *   .mapOptional(x => x * 2)          // Optional.some(10)
       *   .map(opt => Optional.unwrap(opt)) // 10
       *   .map(x => x + 1)                  // 11
       *   .value;
       * ```
       */
      mapOptional: <B>(
        fn: (a: Optional.Unwrap<A>) => B,
      ) => PipeBase<Optional<B>>;
    }>
>;
