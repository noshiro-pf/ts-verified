import { IMap } from '../collections/index.mjs';
import { expectType } from '../expect-type.mjs';
import { Optional, pipe, Result } from '../functional/index.mjs';
import { range as rangeIterator } from '../iterator/index.mjs';
import { asUint32, Num, Uint32 } from '../number/index.mjs';
import { castMutable, tp, unknownToString } from '../others/index.mjs';

/**
 * A comprehensive, immutable utility library for array manipulations in TypeScript.
 * Provides a wide range of functions for array creation, validation, transformation,
 * reduction, slicing, set operations, and more, with a focus on type safety and
 * leveraging TypeScript's type inference capabilities.
 * All functions operate on `readonly` arrays and return new `readonly` arrays,
 * ensuring immutability.
 */
export namespace Arr {
  /**
   * Returns the size (length) of an array as a branded Uint32 type.
   * For non-empty arrays, returns a positive number intersected with Uint32.
   * For potentially empty arrays, returns Uint32.
   *
   * @template Ar The type of the array
   * @param array The array to get the size of
   * @returns The size of the array as a branded Uint32 type
   * @example
   * ```typescript
   * const arr1 = [1, 2, 3] as const;
   * Arr.size(arr1); // PositiveNumber & Uint32
   *
   * const arr2: number[] = [1, 2, 3];
   * Arr.size(arr2); // Uint32
   *
   * const arr3 = [] as const;
   * Arr.size(arr3); // Uint32
   * ```
   */
  export function size<const Ar extends NonEmptyArray<unknown>>(
    array: Ar,
  ): IntersectBrand<PositiveNumber, SizeType.Arr>;
  export function size<const Ar extends readonly unknown[]>(
    array: Ar,
  ): SizeType.Arr;
  export function size<const Ar extends readonly unknown[]>(
    array: Ar,
  ): SizeType.Arr {
    return asUint32(array.length);
  }

  export const length = size;

  // type guard

  /**
   * Type guard that checks if a value is an array, excluding types that cannot be arrays.
   * This function refines the type by filtering out non-array types from unions.
   * @template E The input type that may or may not be an array.
   * @param value The value to check.
   * @returns `true` if the value is an array, `false` otherwise.
   * @example
   * ```ts
   * function processValue(value: string | number[] | null) {
   *   if (Arr.isArray(value)) {
   *     // value is now typed as number[]
   *     console.log(value.length);
   *   }
   * }
   *
   * Arr.isArray([1, 2, 3]); // true
   * Arr.isArray("hello"); // false
   * Arr.isArray(null); // false
   * ```
   */
  export const isArray = <const E,>(
    value: E,
  ): value is E extends readonly unknown[] ? E : never => Array.isArray(value);

  // validation

  /**
   * Checks if an array is empty.
   * @template E The type of elements in the array.
   * @param array The array to check.
   * @returns `true` if the array is empty, `false` otherwise.
   * @example
   * ```ts
   * Arr.isEmpty([]); // true
   * Arr.isEmpty([1, 2, 3]); // false
   * ```
   */
  export const isEmpty = <const E,>(
    array: readonly E[],
  ): array is readonly [] => array.length === 0;

  /**
   * Checks if an array is non-empty.
   * @template E The type of elements in the array.
   * @param array The array to check.
   * @returns `true` if the array is non-empty, `false` otherwise.
   * @example
   * ```ts
   * Arr.isNonEmpty([1, 2, 3]); // true
   * Arr.isNonEmpty([]); // false
   * ```
   */
  export const isNonEmpty = <const E,>(
    array: readonly E[],
  ): array is NonEmptyArray<E> => array.length > 0;

  /**
   * Checks if an array has a specific length.
   * @template E The type of elements in the array.
   * @template N The expected length of the array (must be a number type).
   * @param array The array to check.
   * @param len The expected length.
   * @returns `true` if the array has the specified length, `false` otherwise.
   * @example
   * ```ts
   * const arr: readonly number[] = [1, 2, 3];
   * if (Arr.isArrayOfLength(arr, 3)) {
   *   // arr is now typed as readonly [number, number, number]
   * }
   * Arr.isArrayOfLength([1, 2], 3); // false
   * ```
   */
  export const isArrayOfLength = <
    const E,
    const N extends SizeType.ArgArrNonNegative,
  >(
    array: readonly E[],
    len: N,
  ): array is ArrayOfLength<N, E> => array.length === len;

  /**
   * Checks if an array has at least a specific length.
   * @template E The type of elements in the array.
   * @template N The minimum expected length of the array (must be a number type).
   * @param array The array to check.
   * @param len The minimum expected length.
   * @returns `true` if the array has at least the specified length, `false` otherwise.
   * @example
   * ```ts
   * const arr: readonly number[] = [1, 2, 3];
   * if (Arr.isArrayAtLeastLength(arr, 2)) {
   *   // arr is now typed as readonly [number, number, ...number[]]
   * }
   * Arr.isArrayAtLeastLength([1], 2); // false
   * ```
   */
  export const isArrayAtLeastLength = <
    const E,
    const N extends SizeType.ArgArrNonNegative,
  >(
    array: readonly E[],
    len: N,
  ): array is ArrayAtLeastLen<N, E> => array.length >= len;

  /**
   * Checks if an index is within the valid range of an array (i.e., `0 <= index < array.length`).
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index to check.
   * @returns `true` if the index is within the array bounds, `false` otherwise.
   * @example
   * ```ts
   * Arr.indexIsInRange([10, 20], 0); // true
   * Arr.indexIsInRange([10, 20], 1); // true
   * Arr.indexIsInRange([10, 20], 2); // false
   * Arr.indexIsInRange([10, 20], -1); // false
   * Arr.indexIsInRange([], 0); // false
   * ```
   */
  export const indexIsInRange = <const E,>(
    array: readonly E[],
    index: SizeType.ArgArrNonNegative,
  ): boolean => Num.isInRange(0, array.length)(index);

  // array creation

  /**
   * Creates an array of zeros with the specified length.
   *
   * - If `len` is a `SmallUint`, returns a tuple of zeros of that length.
   * - If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of zeros.
   * - Otherwise, returns a readonly array of zeros.
   *
   * @template N The type of the length, constrained to `SmallUint`.
   * @param len The length of the array.
   * @returns An array of zeros with the specified length.
   * @example
   * ```ts
   * Arr.zeros(3); // [0, 0, 0]
   * Arr.zeros(0); // []
   * ```
   */
  export function zeros<const N extends SmallUint>(len: N): ArrayOfLength<N, 0>;
  export function zeros(len: SizeType.ArgArrPositive): NonEmptyArray<0>;
  export function zeros(len: SizeType.ArgArrNonNegative): readonly 0[];
  export function zeros(len: SizeType.ArgArrNonNegative): readonly 0[] {
    return Array.from<0>({ length: len }).fill(0);
  }

  /**
   * Creates a sequence of numbers from 0 to `len-1`.
   *
   * - If `len` is a `SmallUint`, returns a tuple of numbers.
   * - If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of numbers.
   * - Otherwise, returns a readonly array of numbers.
   *
   * @example
   * ```ts
   * Arr.seq(3); // [0, 1, 2]
   * Arr.seq(0); // []
   * ```
   */
  export function seq<const N extends SmallUint>(len: N): Seq<N>;
  export function seq(
    len: SizeType.ArgArrPositive,
  ): NonEmptyArray<SizeType.Arr>;
  export function seq(len: SizeType.ArgArrNonNegative): readonly SizeType.Arr[];
  export function seq(
    len: SizeType.ArgArrNonNegative,
  ): readonly SizeType.Arr[] {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return Array.from(
      { length: len },
      (_, i) => i,
    ) as unknown as readonly SizeType.Arr[];
  }

  /**
   * Creates a new array of the specified length, filled with the initial value.
   *
   * - If `len` is a `SmallUint`, returns a tuple of the initial value.
   * - If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
   * - Otherwise, returns a readonly array.
   *
   * @template V The type of the initial value.
   * @param len The length of the array.
   * @param init The initial value.
   * @returns A new array.
   * @example
   * ```ts
   * Arr.create(3, 'a'); // ['a', 'a', 'a']
   * const obj = { id: 1 };
   * const arr = Arr.create(2, obj); // [obj, obj]
   * arr[0] === obj; // true (shallow copy of the reference)
   * ```
   */
  export function create<const V, N extends SmallUint>(
    len: N,
    init: V,
  ): ArrayOfLength<N, V>;
  export function create<const V>(
    len: SizeType.ArgArrPositive,
    init: V,
  ): NonEmptyArray<V>;
  export function create<const V>(
    len: SizeType.ArgArrNonNegative,
    init: V,
  ): readonly V[];
  export function create<const V>(
    len: SizeType.ArgArrNonNegative,
    init: V,
  ): readonly V[] {
    return Array.from({ length: Math.max(0, len) }, () => init);
  }

  export const newArray = create;

  /**
   * Creates a shallow copy of an array.
   * @template E The type of the array, which can be a mutable or readonly array.
   * @param array The array to copy.
   * @returns A new array that is a shallow copy of the input array. The readonly/mutable status of the output matches the input.
   * @example
   * ```ts
   * const original = [1, { a: 2 }];
   * const copied = Arr.copy(original);
   * copied[0] = 10;
   * copied[1].a = 20;
   * console.log(original); // [1, { a: 20 }] (object is shallow copied)
   * console.log(copied);   // [10, { a: 20 }]
   *
   * const roOriginal = [1, 2] as const;
   * const roCopied = Arr.copy(roOriginal); // roCopied is readonly [1, 2]
   * ```
   */
  export const copy = <const E extends readonly unknown[]>(array: E): E =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    array.slice() as unknown as E;

  /**
   * @internal
   * Helper type for `range` function to represent a sequence of numbers up to N-1.
   * `LEQ[N]` would be `0 | 1 | ... | N-1`.
   */
  type LEQ = {
    readonly [N in SmallUint]: Index<N>;
  };

  /**
   * @internal
   * This type is used to avoid incorrect type calculation results for unions with `Seq`.
   * It computes the type of an array generated by `Arr.range(S, E)`.
   * If `S` or `E` is a union type, it falls back to a more general `readonly number[]` type
   * to prevent overly complex or incorrect tuple/union types.
   * Otherwise, it computes a precise tuple type like `readonly [S, S+1, ..., E-1]`.
   * @template S The start of the range (inclusive), constrained to `SmallUint`.
   * @template E The end of the range (exclusive), constrained to `SmallUint`.
   */
  type RangeList<S extends SmallUint, E extends SmallUint> =
    BoolOr<IsUnion<S>, IsUnion<E>> extends true
      ? readonly RelaxedExclude<LEQ[E], LEQ[Min<S>]>[] // Avoid incorrect type calculation for unions with Seq
      : List.Skip<S, Seq<E>>;

  expectType<RangeList<1, 5>, readonly [1, 2, 3, 4]>('=');
  expectType<RangeList<1, 2>, readonly [1]>('=');
  expectType<RangeList<1, 1>, readonly []>('=');
  expectType<RangeList<1, 1 | 3>, readonly (1 | 2)[]>('=');
  expectType<RangeList<1 | 3, 3 | 5>, readonly (1 | 2 | 3 | 4)[]>('=');
  expectType<
    RangeList<1 | 2 | 3, 5 | 6 | 7>,
    readonly (1 | 2 | 3 | 4 | 5 | 6)[]
  >('=');
  expectType<RangeList<5, 1>, readonly []>('=');

  /**
   * Creates an array of numbers within a specified range.
   *
   * - If `step` is omitted or 1, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with a step of 1.
   * - If `step` is provided, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with the given step.
   * - If `start >= end` and `step > 0`, or `start <= end` and `step < 0`, returns an empty array.
   * - If `start` and `end` are `SmallUint` and `step` is 1 or omitted, the return type is inferred as a tuple of the precise range.
   *
   * @template S The type of the start value, constrained to `SmallUint`.
   * @template E The type of the end value, constrained to `SmallUint`.
   * @param start The start of the range (inclusive).
   * @param end The end of the range (exclusive).
   * @param step The step value (default is 1). If `step` is 1, the return type is more precise.
   * @returns An array of numbers in the specified range. The type is inferred as `RangeList<S, E>` if step is 1.
   * @example
   * ```ts
   * Arr.range(1, 5); // [1, 2, 3, 4]
   * Arr.range(1, 5, 2); // [1, 3]
   * Arr.range(5, 1, -1); // [5, 4, 3, 2]
   * Arr.range(1, 1); // []
   * Arr.range(5, 1); // []
   * ```
   */
  export function range<const S extends SmallUint, const E extends SmallUint>(
    start: S,
    end: E,
    step?: 1,
  ): RangeList<S, E>;

  export function range(
    start: SafeUintWithSmallInt,
    end: SafeUintWithSmallInt,
    step?: PositiveSafeIntWithSmallInt,
  ): readonly SafeUint[];

  export function range(
    start: SafeIntWithSmallInt,
    end: SafeIntWithSmallInt,
    step?: NonZeroSafeIntWithSmallInt,
  ): readonly SafeInt[];

  export function range(
    start: SafeIntWithSmallInt,
    end: SafeIntWithSmallInt,
    step: NonZeroSafeIntWithSmallInt = 1,
  ): readonly SafeInt[] {
    return Array.from(rangeIterator(start, end, step));
  }

  // element access

  /**
   * Safely accesses an array element at a given index.
   * @param array The array to access.
   * @param index The index to access (can be negative for reverse indexing).
   * @returns Optional.Some with the element if index is valid, Optional.None otherwise.
   * @example
   * ```typescript
   * const arr = [1, 2, 3, 4, 5];
   * const result = Arr.at(arr, 2);
   * if (Optional.isSome(result)) {
   *   console.log(result.value); // 3
   * }
   *
   * const negative = Arr.at(arr, -1);
   * if (Optional.isSome(negative)) {
   *   console.log(negative.value); // 5
   * }
   * ```
   */
  export const at = <const E,>(
    array: readonly E[],
    index: SizeType.ArgArr,
  ): Optional<E> =>
    pipe(index < 0 ? array.length + index : index).map((normalizedIndex) =>
      normalizedIndex < 0 || normalizedIndex >= array.length
        ? Optional.none
        : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
          Optional.some(array[normalizedIndex]!),
    ).value;

  /**
   * Returns the first element of an array.
   *
   * - If the array is empty, returns `Optional.none`.
   * - If the array is a tuple or a non-empty array, returns the first element with precise typing.
   *
   * @example
   * ```ts
   * Arr.head([1, 2, 3]); // Optional.some(1)
   * Arr.head([]); // Optional.none
   * ```
   */
  export function head(array: readonly []): Optional.None;
  export function head<const E, const L extends readonly unknown[]>(
    array: readonly [E, ...L],
  ): Optional.Some<E>;
  export function head<const E>(array: NonEmptyArray<E>): Optional.Some<E>;
  export function head<const E>(array: readonly E[]): Optional<E>;
  export function head<const E>(array: readonly E[]): Optional<E> {
    const element = array.at(0);
    return element === undefined ? Optional.none : Optional.some(element);
  }

  /**
   * Returns the last element of an array.
   *
   * - If the array is empty, returns `Optional.none`.
   * - If the array is a tuple or a non-empty array, returns the last element with precise typing.
   *
   * @example
   * ```ts
   * Arr.last([1, 2, 3]); // Optional.some(3)
   * Arr.last([]); // Optional.none
   * ```
   */
  export function last(array: readonly []): Optional.None;
  export function last<const E extends readonly unknown[], const L>(
    array: readonly [...E, L],
  ): Optional.Some<L>;
  export function last<const E>(array: NonEmptyArray<E>): Optional.Some<E>;
  export function last<const E>(array: readonly E[]): Optional<E>;
  export function last<const E>(array: readonly E[]): Optional<E> {
    const element = array.at(-1);
    return element === undefined ? Optional.none : Optional.some(element);
  }

  // slicing

  /**
   * Slices an array with clamped start and end indices.
   * Ensures that start and end indices are within the bounds of the array.
   * If `start` > `end` after clamping, an empty array is returned.
   * @template E The type of elements in the array.
   * @param array The array to slice.
   * @param start The start index for the slice (inclusive).
   * @param end The end index for the slice (exclusive).
   * @returns A new array containing the sliced elements.
   * @example
   * ```ts
   * const arr = [10, 20, 30, 40, 50];
   * Arr.sliceClamped(arr, 1, 3); // [20, 30]
   * Arr.sliceClamped(arr, -2, 10); // [10, 20, 30, 40, 50] (start clamped to 0, end to 5)
   * Arr.sliceClamped(arr, 3, 1); // [] (start clamped to 3, end to 3)
   * Arr.sliceClamped([], 0, 5); // []
   * ```
   */
  export const sliceClamped = <const E,>(
    array: readonly E[],
    start: SizeType.ArgArr,
    end: SizeType.ArgArr,
  ): readonly E[] => {
    const startClamped = Num.clamp(0, array.length)(start);
    // Ensure endClamped is not less than startClamped.
    const endClamped = Num.clamp(startClamped, array.length)(end);
    return array.slice(startClamped, endClamped);
  };

  /**
   * Returns all elements of an array except the first one.
   * @template E The type of the array (can be a tuple for more precise typing).
   * @param array The input array.
   * @returns A new array containing all elements except the first. The type is inferred as `List.Tail<T>`.
   * @example
   * ```ts
   * Arr.tail([1, 2, 3] as const); // [2, 3]
   * Arr.tail([1] as const); // []
   * Arr.tail([]); // []
   * ```
   */
  export const tail = <const E extends readonly unknown[]>(
    array: E,
  ): List.Tail<E> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    array.slice(1) as unknown as List.Tail<E>;

  /**
   * Returns all elements of an array except the last one.
   * @template E The type of the array (can be a tuple for more precise typing).
   * @param array The input array.
   * @returns A new array containing all elements except the last. The type is inferred as `List.ButLast<T>`.
   * @example
   * ```ts
   * Arr.butLast([1, 2, 3] as const); // [1, 2]
   * Arr.butLast([1] as const); // []
   * Arr.butLast([]); // []
   * ```
   */
  export const butLast = <const E extends readonly unknown[]>(
    array: E,
  ): List.ButLast<E> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    (isEmpty(array) ? [] : array.slice(0, -1)) as unknown as List.ButLast<E>;

  /**
   * Takes the first N elements from an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple of the first N elements.
   * - If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
   * - Otherwise, returns a readonly array of up to N elements.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to take, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to take.
   * @returns A new array containing the first N elements.
   * @example
   * ```ts
   * Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
   * Arr.take([1, 2], 3); // [1, 2]
   * Arr.take([], 2); // []
   * ```
   */
  export function take<const E extends readonly unknown[], N extends SmallUint>(
    array: E,
    num: N,
  ): List.Take<N, E>;
  export function take<const E>(
    array: NonEmptyArray<E>,
    num: SizeType.ArgArrPositive,
  ): NonEmptyArray<E>;
  export function take<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[];
  export function take<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[] {
    return sliceClamped(array, 0, num);
  }

  /**
   * Takes the last N elements from an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple of the last N elements.
   * - If the array is a non-empty array and N is a positive integer, returns a non-empty array.
   * - Otherwise, returns a readonly array of up to N elements.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to take, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to take.
   * @returns A new array containing the last N elements.
   * @example
   * ```ts
   * Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
   * Arr.takeLast([1, 2], 3); // [1, 2]
   * Arr.takeLast([], 2); // []
   * ```
   */
  export function takeLast<
    const E extends readonly unknown[],
    N extends SmallUint,
  >(array: E, num: N): List.TakeLast<N, E>;
  export function takeLast<const E>(
    array: NonEmptyArray<E>,
    num: SizeType.ArgArrPositive,
  ): NonEmptyArray<E>;
  export function takeLast<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[];
  export function takeLast<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[] {
    return sliceClamped(array, Uint32.sub(size(array), num), size(array));
  }

  /**
   * Skips the first N elements of an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
   * - If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
   * - Otherwise, returns a readonly array with the first N elements skipped.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to skip, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to skip.
   * @returns A new array containing the elements after skipping the first N.
   * @example
   * ```ts
   * Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
   * Arr.skip([1, 2], 3); // []
   * Arr.skip([], 2); // []
   * ```
   */
  export function skip<const E extends readonly unknown[], N extends SmallUint>(
    array: E,
    num: N,
  ): List.Skip<N, E>;
  export function skip<const E>(
    array: NonEmptyArray<E>,
    num: SizeType.ArgArrPositive,
  ): readonly E[];
  export function skip<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[];
  export function skip<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[] {
    return sliceClamped(array, num, size(array));
  }

  /**
   * Skips the last N elements of an array.
   *
   * - If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
   * - If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
   * - Otherwise, returns a readonly array with the last N elements skipped.
   *
   * @template E The type of the array (can be a tuple for more precise typing).
   * @template N The number of elements to skip, constrained to `SmallUint`.
   * @param array The input array.
   * @param num The number of elements to skip from the end.
   * @returns A new array containing the elements after skipping the last N.
   * @example
   * ```ts
   * Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
   * Arr.skipLast([1, 2], 3); // []
   * Arr.skipLast([], 2); // []
   * ```
   */
  export function skipLast<
    const E extends readonly unknown[],
    N extends SmallUint,
  >(array: E, num: N): List.SkipLast<N, E>;
  export function skipLast<const E>(
    array: NonEmptyArray<E>,
    num: SizeType.ArgArrPositive,
  ): readonly E[];
  export function skipLast<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[];
  export function skipLast<const E>(
    array: readonly E[],
    num: SizeType.ArgArrNonNegative,
  ): readonly E[] {
    return sliceClamped(array, 0, Uint32.sub(size(array), num));
  }

  // modification (returns new array)

  /**
   * Returns a new array with the element at the specified index updated by a function.
   * If the index is out of bounds, the original array is returned (as per `Array.prototype.with` behavior for invalid indices, though it throws for non-integer indices).
   * This implementation ensures it doesn't throw for out-of-bounds indices but returns a copy.
   * @template A The type of elements in the original array.
   * @template U The type of the updated value.
   * @param array The input array.
   * @param index The index of the element to update.
   * @param updater A function that takes the previous value and returns the updated value.
   * @returns A new array with the element at the specified index updated. If index is invalid, a copy of the original array is returned.
   * @example
   * ```ts
   * Arr.toUpdated([1, 2, 3], 1, (x) => x * 10); // [1, 20, 3]
   * Arr.toUpdated([1, 2, 3], 5, (x) => x * 10); // [1, 2, 3] (index out of bounds)
   * ```
   */
  export const toUpdated = <const E, const U>(
    array: readonly E[],
    index: SizeType.ArgArrNonNegative,
    updater: (prev: E) => U,
  ): readonly (E | U)[] =>
    index < 0 || index >= array.length
      ? array // Return a copy if index is out of bounds
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        (array as readonly (E | U)[]).with(index, updater(array[index]!));

  /**
   * Returns a new array with a new value inserted at the specified index.
   * Index can be out of bounds (e.g., negative or greater than length), `toSpliced` handles this.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index at which to insert the new value.
   * @param newValue The value to insert.
   * @returns A new array with the value inserted.
   * @example
   * ```ts
   * Arr.toInserted([1, 2, 3], 1, 10); // [1, 10, 2, 3]
   * Arr.toInserted([1, 2, 3], 0, 0); // [0, 1, 2, 3]
   * Arr.toInserted([1, 2, 3], 3, 4); // [1, 2, 3, 4]
   * ```
   */
  export const toInserted = <const E,>(
    array: readonly E[],
    index: SizeType.ArgArrNonNegative,
    newValue: E,
  ): readonly E[] => array.toSpliced(index, 0, newValue);

  /**
   * Returns a new array with the element at the specified index removed.
   * If index is out of bounds, `toSpliced` handles this (usually by returning a copy).
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param index The index of the element to remove.
   * @returns A new array with the element removed.
   * @example
   * ```ts
   * Arr.toRemoved([1, 2, 3], 1); // [1, 3]
   * Arr.toRemoved([1, 2, 3], 5); // [1, 2, 3] (index out of bounds)
   * ```
   */
  export const toRemoved = <const E,>(
    array: readonly E[],
    index: SizeType.ArgArrNonNegative,
  ): readonly E[] => array.toSpliced(index, 1);

  /**
   * Returns a new array with a value added to the end.
   * @template E The type of the input array (can be a tuple).
   * @template V The type of the value to add.
   * @param array The input array.
   * @param newValue The value to add.
   * @returns A new array with the value added to the end. Type is `readonly [...E, V]`.
   * @example
   * ```ts
   * Arr.toPushed([1, 2] as const, 3); // [1, 2, 3]
   * Arr.toPushed([], 0); // [0]
   * ```
   */
  export const toPushed = <const E extends readonly unknown[], const V>(
    array: E,
    newValue: V,
  ): readonly [...E, V] =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    array.toSpliced(array.length, 0, newValue) as unknown as readonly [...E, V];

  /**
   * Returns a new array with a value added to the beginning.
   * @template E The type of the input array (can be a tuple).
   * @template V The type of the value to add.
   * @param array The input array.
   * @param newValue The value to add.
   * @returns A new array with the value added to the beginning. Type is `readonly [V, ...E]`.
   * @example
   * ```ts
   * Arr.toUnshifted([1, 2] as const, 0); // [0, 1, 2]
   * Arr.toUnshifted([], 0); // [0]
   * ```
   */
  export const toUnshifted = <const E extends readonly unknown[], const V>(
    array: E,
    newValue: V,
  ): readonly [V, ...E] =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    array.toSpliced(0, 0, newValue) as unknown as readonly [V, ...E];

  /**
   * Fills an array with a value (creates a new filled array).
   * @param array The array.
   * @param value The value to fill with.
   * @param start The start index.
   * @param end The end index.
   * @returns Result.Ok with the new filled array.
   * @example
   * ```typescript
   * const arr = [1, 2, 3, 4, 5];
   * const result = Arr.toFilled(arr, 0, 1, 4);
   * if (Result.isOk(result)) {
   *   console.log(result.value); // [1, 0, 0, 0, 5]
   * }
   * ```
   */
  export const toFilled = <const E,>(
    array: readonly E[],
    value: E,
    start?: SizeType.ArgArr,
    end?: SizeType.ArgArr,
  ): readonly E[] => {
    const cp = castMutable(copy(array));
    cp.fill(value, start, end);
    return cp;
  };

  // searching

  /**
   * Safely finds an element in an array.
   * @param array The array to search.
   * @param predicate The function to test elements.
   * @returns Optional.Some with the found element, Optional.None if not found.
   * @example
   * ```typescript
   * const arr = [1, 2, 3, 4, 5];
   * const result = Arr.find(arr, x => x > 3);
   * if (Optional.isSome(result)) {
   *   console.log(result.value); // 4
   * }
   * ```
   */
  export const find = <const E,>(
    array: readonly E[],
    predicate: (value: E, index: SizeType.Arr, arr: readonly E[]) => boolean,
  ): Optional<E> => {
    const foundIndex = array.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      predicate as (value: E, index: number, arr: readonly E[]) => boolean,
    );

    return foundIndex === -1
      ? Optional.none
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Optional.some(array[foundIndex]!);
  };

  /**
   * Finds the index of an element in an array.
   * @param array The array to search.
   * @param predicate The function to test elements.
   * @returns Optional.Some with the index if found, Optional.None otherwise.
   * @example
   * ```typescript
   * const arr = ['a', 'b', 'c'];
   * const result = Arr.findIndex(arr, x => x === 'b');
   * if (Optional.isSome(result)) {
   *   console.log(result.value); // 1 (branded as SizeType.Arr)
   * }
   * ```
   */
  export const findIndex = <const E,>(
    array: readonly E[],
    predicate: (value: E, index: SizeType.Arr) => boolean,
  ): Optional<SizeType.Arr> =>
    pipe(
      array.findIndex(
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        predicate as (value: E, index: number) => boolean,
      ),
    ).map((idx) => (idx >= 0 ? Optional.some(asUint32(idx)) : Optional.none))
      .value;

  /**
   * Gets the index of a value in an array.
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @param fromIndex The index to start searching from.
   * @returns Optional.Some with the index if found, Optional.None otherwise.
   * @example
   * ```typescript
   * const arr = ['a', 'b', 'c', 'b'];
   * const result = Arr.indexOf(arr, 'b');
   * if (Optional.isSome(result)) {
   *   console.log(result.value); // 1 (branded as SizeType.Arr)
   * }
   * ```
   */
  export const indexOf = <const E,>(
    array: readonly E[],
    searchElement: E,
    fromIndex?: SizeType.ArgArr,
  ): Optional<SizeType.Arr> => {
    if (fromIndex !== undefined && !Number.isInteger(fromIndex)) {
      return Optional.none;
    }

    const index = array.indexOf(searchElement, fromIndex);
    return index >= 0 ? Optional.some(asUint32(index)) : Optional.none;
  };

  /**
   * Gets the last index of a value in an array.
   * @param array The array to search.
   * @param searchElement The element to search for.
   * @param fromIndex The index to start searching from (searches backwards).
   * @returns Optional.Some with the index if found, Optional.None otherwise.
   * @example
   * ```typescript
   * const arr = ['a', 'b', 'c', 'b'];
   * const result = Arr.lastIndexOf(arr, 'b');
   * if (Optional.isSome(result)) {
   *   console.log(result.value); // 3 (branded as SizeType.Arr)
   * }
   * ```
   */
  export const lastIndexOf = <const E,>(
    array: readonly E[],
    searchElement: E,
    fromIndex?: SizeType.ArgArr,
  ): Optional<SizeType.Arr> => {
    if (fromIndex !== undefined && !Number.isInteger(fromIndex)) {
      return Optional.none;
    }

    const index =
      fromIndex === undefined
        ? array.lastIndexOf(searchElement)
        : array.lastIndexOf(searchElement, fromIndex);

    return index >= 0 ? Optional.some(asUint32(index)) : Optional.none;
  };

  // reducing value

  /**
   * Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
   * This is an alias for `Array.prototype.reduce`.
   * @template E The type of elements in the array.
   * @template S The type of the accumulated value.
   * @param array The input array.
   * @param callbackfn A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
   * @param initialValue The initial value of the accumulator.
   * @returns The single value that results from the reduction.
   * @example
   * ```ts
   * Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
   * Arr.foldl(['a', 'b', 'c'], (str, char) => str + char, ''); // "abc"
   * ```
   */
  export const foldl = <const E, P>(
    array: readonly E[],
    callbackfn: (
      previousValue: P,
      currentValue: E,
      currentIndex: SizeType.Arr,
    ) => P,
    initialValue: P,
  ): P =>
    array.reduce<P>(
      (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
      initialValue,
    );

  /**
   * Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
   * This is an alias for `Array.prototype.reduceRight`.
   * @template E The type of elements in the array.
   * @template S The type of the accumulated value.
   * @param array The input array.
   * @param callbackfn A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
   * @param initialValue The initial value of the accumulator.
   * @returns The single value that results from the reduction.
   * @example
   * ```ts
   * Arr.foldr([1, 2, 3], (sum, n) => sum + n, 0); // 6
   * Arr.foldr(['a', 'b', 'c'], (str, char) => str + char, ''); // "cba" (Note: if callback is (acc, curr) => acc + curr)
   * // Corrected example for typical right fold concatenation:
   * Arr.foldr(['a', 'b', 'c'], (char, str) => char + str, ''); // "abc" (callback (current, accumulator))
   * // Using the provided signature (previousValue: S, currentValue: A)
   * Arr.foldr(['a', 'b', 'c'], (acc, curr) => curr + acc, ''); // "abc"
   * Arr.foldr([1, 2, 3], (acc, curr) => curr - acc, 0); // 2 (i.e. 1-(2-(3-0)))
   * ```
   */
  export const foldr = <const E, P>(
    array: readonly E[],
    callbackfn: (
      previousValue: P,
      currentValue: E,
      currentIndex: SizeType.Arr,
    ) => P,
    initialValue: P,
  ): P =>
    array.reduceRight(
      (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
      initialValue,
    );

  /**
   * Finds the minimum value in an array.
   * @template E The type of numbers in the array (must extend `number`).
   * @param array The input array.
   * @param comparator An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.
   * @returns The minimum value in the array wrapped in Optional.
   * @example
   * ```ts
   * Arr.min([3, 1, 4, 1, 5] as const); // Optional.some(1)
   * Arr.min([{v:3}, {v:1}], (a,b) => a.v - b.v) // Optional.some({v:1})
   * Arr.min([]); // Optional.none
   * ```
   */
  export function min<const E extends number>(
    array: NonEmptyArray<E>,
    comparator?: (x: E, y: E) => number,
  ): Optional.Some<E>;
  export function min<const E extends number>(
    array: readonly E[],
    comparator?: (x: E, y: E) => number,
  ): Optional<E>;
  export function min<const E>(
    array: NonEmptyArray<E>,
    comparator: (x: E, y: E) => number,
  ): Optional.Some<E>;
  export function min<const E>(
    array: readonly E[],
    comparator: (x: E, y: E) => number,
  ): Optional<E>;
  export function min<const E>(
    array: readonly E[],
    comparator?: (x: E, y: E) => number,
  ): Optional<E> {
    const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));

    if (!isNonEmpty(array)) {
      return Optional.none;
    }
    // Reduce requires the accumulator to be of the same type as elements or a supertype.
    // Here, array[0] ensures the accumulator starts with an element from the array.
    const result = array.reduce(
      (currentMin, curr) => (cmp(curr, currentMin) < 0 ? curr : currentMin),
      array[0],
    );
    return Optional.some(result);
  }

  /**
   * Finds the maximum value in an array.
   *
   * - If the array is non-empty, returns the maximum value.
   * - If the array is empty, returns `Optional.none`.
   * - You can provide a custom comparator for arbitrary types.
   *
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param comparator An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.
   * @returns The maximum value in the array wrapped in Optional.
   * @example
   * ```ts
   * Arr.max([3, 1, 4, 1, 5] as const); // Optional.some(5)
   * Arr.max([{v:3}, {v:1}], (a,b) => a.v - b.v) // Optional.some({v:3})
   * Arr.max([]); // Optional.none
   * ```
   */
  export function max<const E extends number>(
    array: NonEmptyArray<E>,
    comparator?: (x: E, y: E) => number,
  ): Optional.Some<E>;
  export function max<const E extends number>(
    array: readonly E[],
    comparator?: (x: E, y: E) => number,
  ): Optional<E>;
  export function max<const E>(
    array: NonEmptyArray<E>,
    comparator: (x: E, y: E) => number,
  ): Optional.Some<E>;
  export function max<const E>(
    array: readonly E[],
    comparator: (x: E, y: E) => number,
  ): Optional<E>;
  export function max<const E>(
    array: readonly E[],
    comparator?: (x: E, y: E) => number,
  ): Optional<E> {
    const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));
    // Find max by finding min with an inverted comparator
    return min(array, (x, y) => -cmp(x, y));
  }

  /**
   * Finds the element with the minimum value according to a mapped numeric value.
   *
   * - If the array is non-empty, returns the element with the minimum mapped value.
   * - If the array is empty, returns `Optional.none`.
   * - You can provide a custom comparator for the mapped values.
   *
   * @template E The type of elements in the array.
   * @template V The type of the value to compare by.
   * @param array The input array.
   * @param comparatorValueMapper A function that maps an element to a value for comparison.
   * @param comparator An optional custom comparator function for the mapped values.
   * @returns The element with the minimum mapped value wrapped in Optional.
   * @example
   * ```ts
   * const people = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }] as const;
   * Arr.minBy(people, p => p.age); // Optional.some({ name: 'Bob', age: 20 })
   * Arr.minBy([], p => p.age); // Optional.none
   * ```
   */
  export function minBy<const E>(
    array: NonEmptyArray<E>,
    comparatorValueMapper: (value: E) => number,
  ): Optional.Some<E>;
  export function minBy<const E>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => number,
  ): Optional<E>;
  export function minBy<const E, const V>(
    array: NonEmptyArray<E>,
    comparatorValueMapper: (value: E) => V,
    comparator: (x: V, y: V) => number,
  ): Optional.Some<E>;
  export function minBy<const E, const V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator: (x: V, y: V) => number,
  ): Optional<E>;
  export function minBy<E, V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator?: (x: V, y: V) => number,
  ): Optional<E> {
    return min(array, (x, y) =>
      comparator === undefined
        ? Num.from(comparatorValueMapper(x)) -
          Num.from(comparatorValueMapper(y))
        : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
    );
  }

  /**
   * Finds the element with the maximum value according to a mapped numeric value.
   *
   * - If the array is non-empty, returns the element with the maximum mapped value.
   * - If the array is empty, returns `Optional.none`.
   * - You can provide a custom comparator for the mapped values.
   *
   * @template E The type of elements in the array.
   * @template V The type of the value to compare by.
   * @param array The input array.
   * @param comparatorValueMapper A function that maps an element to a value for comparison.
   * @param comparator An optional custom comparator function for the mapped values.
   * @returns The element with the maximum mapped value wrapped in Optional.
   * @example
   * ```ts
   * const people = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }] as const;
   * Arr.maxBy(people, p => p.age); // Optional.some({ name: 'Alice', age: 30 })
   * Arr.maxBy([], p => p.age); // Optional.none
   * ```
   */
  export function maxBy<const E>(
    array: NonEmptyArray<E>,
    comparatorValueMapper: (value: E) => number,
  ): Optional.Some<E>;
  export function maxBy<E>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => number,
  ): Optional<E>;
  export function maxBy<E, V>(
    array: NonEmptyArray<E>,
    comparatorValueMapper: (value: E) => V,
    comparator: (x: V, y: V) => number,
  ): Optional.Some<E>;
  export function maxBy<E, V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator: (x: V, y: V) => number,
  ): Optional<E>;
  export function maxBy<E, V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator?: (x: V, y: V) => number,
  ): Optional<E> {
    return max(array, (x, y) =>
      comparator === undefined
        ? Num.from(comparatorValueMapper(x)) -
          Num.from(comparatorValueMapper(y))
        : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
    );
  }

  /**
   * Counts the number of elements in an array that satisfy a predicate.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param predicate A function `(value: A, index: number) => boolean` to test each element for a condition.
   * @returns The number of elements that satisfy the predicate.
   * @example
   * ```ts
   * Arr.count([1, 2, 3, 4], (x) => x > 2); // 2
   * Arr.count(['a', 'b', 'a'], (x) => x === 'a'); // 2
   * Arr.count([], () => true); // 0
   * ```
   */
  export const count = <const E,>(
    array: readonly E[],
    predicate: (value: E, index: SizeType.Arr) => boolean,
  ): SizeType.Arr =>
    asUint32(
      array.reduce<number>(
        (acc, curr, index) =>
          predicate(curr, asUint32(index)) ? acc + 1 : acc,
        0,
      ),
    );

  /**
   * Groups elements of an array by a key derived from each element and counts the elements in each group.
   * @template E The type of elements in the array.
   * @template G The type of the group key (must be a primitive type: `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`).
   * @param array The input array.
   * @param grouper A function `(value: A, index: number) => G` that maps an element and its index to a group key.
   * @returns An `IMap` where keys are group keys and values are the counts of elements in each group.
   * @example
   * ```ts
   * Arr.countBy([1, 2, 2, 3, 1, 1], (x) => x);
   * // IMap { 1 => 3, 2 => 2, 3 => 1 }
   *
   * Arr.countBy(['apple', 'banana', 'apple'], (x) => x);
   * // IMap { 'apple': 2, 'banana': 1 }
   * ```
   */
  export const countBy = <const E, const G extends MapSetKeyType>(
    array: readonly E[],
    grouper: (value: E, index: SizeType.Arr) => G,
  ): IMap<G, SizeType.Arr> => {
    const mut_groups = new Map<G, SizeType.Arr>();

    for (const [index, e] of array.entries()) {
      const key = grouper(e, asUint32(index));
      const curr = mut_groups.get(key) ?? 0;

      mut_groups.set(key, asUint32(curr + 1));
    }

    return IMap.create(mut_groups);
  };

  /**
   * Calculates the sum of numbers in an array.
   * @param array The input array of numbers.
   * @returns The sum of the numbers. Returns 0 for an empty array.
   * @example
   * ```ts
   * Arr.sum([1, 2, 3]); // 6
   * Arr.sum([]); // 0
   * Arr.sum([-1, 0, 1]); // 0
   * ```
   */
  export function sum(array: readonly Int[]): Int;
  export function sum(array: readonly number[]): number;
  export function sum(array: readonly number[]): number {
    return array.reduce((prev, curr) => prev + curr, 0);
  }

  /**
   * Joins array elements into a string.
   * @param array The array to join.
   * @param separator The separator string.
   * @returns Result.Ok with the joined string, Result.Err if the operation throws.
   * @example
   * ```typescript
   * const arr = ['Hello', 'World'];
   * const result = Arr.join(arr, ' ');
   * if (Result.isOk(result)) {
   *   console.log(result.value); // "Hello World"
   * }
   *
   * // Error case: circular reference in objects with custom toString
   * const obj: any = {};
   * obj.toString = function() { return String(this); };
   * const errorResult = Arr.join([obj], ',');
   * // Result.Err with Error about circular reference
   * ```
   */
  export const join = <const E,>(
    array: readonly E[],
    separator?: string,
  ): Result<string, Error> => {
    try {
      const result = array.join(separator);
      return Result.ok(result);
    } catch (error) {
      return Result.err(
        error instanceof Error
          ? error
          : pipe(unknownToString(error))
              .map(Result.unwrapOkOr('Failed to join array'))
              .map((e) => new Error(e)).value,
      );
    }
  };

  // transformation

  /**
   * Creates an array of tuples by pairing up corresponding elements from two arrays.
   * The resulting array has a length equal to the minimum of the two input array lengths.
   * @template E1 The type of the first array.
   * @template E2 The type of the second array.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns An array of tuples where each tuple contains corresponding elements from both arrays.
   * @example
   * ```ts
   * Arr.zip([1, 2, 3] as const, ['a', 'b', 'c'] as const); // [[1, 'a'], [2, 'b'], [3, 'c']]
   * Arr.zip([1, 2], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b']]
   * Arr.zip([1, 2, 3], ['a']); // [[1, 'a']]
   * Arr.zip([], ['a']); // []
   * ```
   */
  export const zip = <
    const E1 extends readonly unknown[],
    const E2 extends readonly unknown[],
  >(
    array1: E1,
    array2: E2,
  ): List.Zip<E1, E2> =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    seq(Uint32.min(size(array1), size(array2))).map((i) =>
      // Non-null assertion is safe here because `i` is always within bounds of both arrays up to the length of the shorter one.
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      tp(array1[i]!, array2[i]!),
    ) as unknown as List.Zip<E1, E2>;

  /**
   * Filters an array by excluding elements for which the predicate returns true.
   * This is the opposite of `Array.prototype.filter`.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param predicate A function `(a: A, index: number) => boolean` that returns `true` for elements to be excluded.
   * @returns A new array with elements for which the predicate returned `false`.
   * @example
   * ```ts
   * Arr.filterNot([1, 2, 3, 4], (x) => x % 2 === 0); // [1, 3] (excludes even numbers)
   * Arr.filterNot(['apple', 'banana', 'avocado'], (s) => s.startsWith('a')); // ['banana']
   * ```
   */
  export const filterNot = <const E,>(
    array: readonly E[],
    predicate: (a: E, index: SizeType.Arr) => boolean,
  ): readonly E[] => array.filter((a, i) => !predicate(a, asUint32(i)));

  /**
   * Concatenates two arrays.
   * @template E1 The type of the first array (can be a tuple).
   * @template E2 The type of the second array (can be a tuple).
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array that is the concatenation of the two input arrays. Type is `readonly [...E1, ...E2]`.
   * @example
   * ```ts
   * Arr.concat([1, 2] as const, [3, 4] as const); // [1, 2, 3, 4]
   * Arr.concat([], [1, 2]); // [1, 2]
   * Arr.concat([1, 2], []); // [1, 2]
   * ```
   */
  export const concat = <
    const E1 extends readonly unknown[],
    const E2 extends readonly unknown[],
  >(
    array1: E1,
    array2: E2,
  ): readonly [...E1, ...E2] => [...array1, ...array2];

  /**
   * Partitions an array into sub-arrays of a specified size.
   * The last partition may be smaller if the array length is not a multiple of `chunkSize`.
   * Returns an empty array if chunkSize < 2.
   * @template N The size of each partition (must be a number type, typically a literal for precise typing).
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param chunkSize The size of each partition.
   * @returns An array of arrays, where each inner array has up to `chunkSize` elements.
   * @example
   * ```ts
   * Arr.partition([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
   * Arr.partition([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
   * Arr.partition([1, 2, 3], 5); // [[1, 2, 3]]
   * Arr.partition([], 2); // []
   * ```
   */
  export const partition = <
    const N extends WithSmallInt<PositiveInt & SizeType.Arr>,
    const A,
  >(
    array: readonly A[],
    chunkSize: N,
  ): readonly (readonly A[])[] =>
    chunkSize < 2
      ? []
      : seq(asUint32(Math.ceil(array.length / chunkSize))).map((i) =>
          array.slice(chunkSize * i, chunkSize * (i + 1)),
        );

  /**
   * Sorts an array by a value derived from its elements, using a numeric mapping.
   * @template E The type of elements in the array.
   * @param array The input array.
   * @param comparatorValueMapper A function `(value: A) => number` that maps an element to a number for comparison.
   * @param comparator An optional custom comparator function `(x: number, y: number) => number` for the mapped numbers. Defaults to ascending sort (x - y).
   * @returns A new array sorted by the mapped values.
   * @example
   * ```ts
   * const items = [{ name: 'Eve', score: 70 }, { name: 'Adam', score: 90 }, { name: 'Bob', score: 80 }];
   * Arr.toSortedBy(items, item => item.score);
   * // [{ name: 'Eve', score: 70 }, { name: 'Bob', score: 80 }, { name: 'Adam', score: 90 }]
   * Arr.toSortedBy(items, item => item.score, (a, b) => b - a); // Sort descending
   * // [{ name: 'Adam', score: 90 }, { name: 'Bob', score: 80 }, { name: 'Eve', score: 70 }]
   * ```
   */
  export function toSortedBy<const E>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => number,
    comparator?: (x: number, y: number) => number,
  ): readonly E[];

  /**
   * Sorts an array by a value derived from its elements, using a custom value type and comparator.
   * @template E The type of elements in the array.
   * @template V The type of the value to compare by.
   * @param array The input array.
   * @param comparatorValueMapper A function `(value: A) => B` that maps an element to a value of type `V` for comparison.
   * @param comparator A custom comparator function `(x: V, y: V) => number` for values of type `V`.
   * @returns A new array sorted by the mapped values.
   */
  export function toSortedBy<const E, const V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator: (x: V, y: V) => number,
  ): readonly E[];
  export function toSortedBy<const E, const V>(
    array: readonly E[],
    comparatorValueMapper: (value: E) => V,
    comparator?: (x: V, y: V) => number,
  ): readonly E[] {
    return array.toSorted((x, y) =>
      comparator === undefined
        ? // This branch assumes B is number if comparator is undefined.
          // The overloads should handle this, but explicit cast might be needed if B is not number.
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          (comparatorValueMapper(x) as number) -
          // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
          (comparatorValueMapper(y) as number)
        : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
    );
  }

  /**
   * Returns an array of successively reduced values from an array, starting with an initial value.
   * The first element of the result is always the `init` value.
   * The result array will have `array.length + 1` elements.
   * @template A The type of elements in the input array.
   * @template S The type of the accumulated values and the initial value.
   * @param array The input array.
   * @param reducer A function `(accumulator: S, currentValue: A, currentIndex: number) => S` that reduces the current value and the accumulated value to a new accumulated value.
   * @param init The initial accumulated value.
   * @returns A non-empty array of accumulated values, starting with `init`.
   * @example
   * ```ts
   * Arr.scan([1, 2, 3], (acc, curr) => acc + curr, 0); // [0, 1, 3, 6]
   * Arr.scan(['a', 'b', 'c'], (acc, curr) => acc + curr, '0'); // ['0', '0a', '0ab', '0abc']
   * Arr.scan([], (acc, curr: number) => acc + curr, 100); // [100]
   * ```
   */
  export const scan = <const E, S>(
    array: readonly E[],
    reducer: (accumulator: S, currentValue: E, currentIndex: SizeType.Arr) => S,
    init: S,
  ): NonEmptyArray<S> => {
    const mut_result: S[] = Array.from(
      { length: array.length + 1 },
      () => init,
    );

    let mut_acc = init;

    for (const [index, value] of array.entries()) {
      mut_acc = reducer(mut_acc, value, asUint32(index));
      mut_result[index + 1] = mut_acc;
    }

    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return mut_result as MutableNonEmptyArray<S>; // Ensure NonEmptyArray contract
  };

  /**
   * Groups elements of an array by a key derived from each element.
   * @template E The type of elements in the array.
   * @template G The type of the group key (must be a primitive type).
   * @param array The input array.
   * @param grouper A function `(value: A, index: number) => G` that maps an element and its index to a group key.
   * @returns An `IMap` where keys are group keys and values are arrays of elements belonging to that group.
   * @example
   * ```ts
   * const data = [
   *   { type: 'fruit', name: 'apple' },
   *   { type: 'veg', name: 'carrot' },
   *   { type: 'fruit', name: 'banana' },
   * ];
   * Arr.groupBy(data, item => item.type);
   * // IMap {
   * //   'fruit' => [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
   * //   'veg' => [{ type: 'veg', name: 'carrot' }]
   * // }
   * Arr.groupBy([1, 2, 3, 4], n => n % 2 === 0 ? 'even' : 'odd');
   * // IMap { 'odd' => [1, 3], 'even' => [2, 4] }
   * ```
   */
  export const groupBy = <const E, const G extends MapSetKeyType>(
    array: readonly E[],
    grouper: (value: E, index: SizeType.Arr) => G,
  ): IMap<G, readonly E[]> => {
    const mut_groups = new Map<G, E[]>(); // Store mutable arrays internally

    for (const [index, e] of array.entries()) {
      const key = grouper(e, asUint32(index)); // Ensure index is treated as SizeType.Arr
      const mut_group = mut_groups.get(key);
      if (mut_group !== undefined) {
        mut_group.push(e);
      } else {
        mut_groups.set(key, [e]);
      }
    }
    // Cast to IMap<G, readonly A[]> for the public interface
    return IMap.create<G, readonly E[]>(mut_groups);
  };

  /**
   * Creates a new array with unique elements from the input array. Order is preserved from the first occurrence.
   * Uses `Set` internally for efficient uniqueness checking.
   * @template P The type of elements in the array.
   * @param array The input array.
   * @returns A new array with unique elements from the input array. Returns `[]` for an empty input.
   * @example
   * ```ts
   * Arr.uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
   * Arr.uniq(['a', 'b', 'a']); // ['a', 'b']
   * ```
   */
  export function uniq<const P extends Primitive>(
    array: readonly P[],
  ): readonly P[] {
    return Array.from(new Set(array));
  }

  /**
   * Creates a new array with unique elements from the input array, based on the values returned by `mapFn`.
   *
   * - If the input is a non-empty array, returns a non-empty array.
   * - Otherwise, returns a readonly array.
   *
   * @template E The type of elements in the array.
   * @template P The type of the mapped value (used for uniqueness comparison).
   * @param array The input array.
   * @param mapFn A function `(value: A) => P` to map elements to values for uniqueness comparison.
   * @returns A new array with unique elements based on the mapped values.
   * @example
   * ```ts
   * const users = [
   *   { id: 1, name: 'Alice' },
   *   { id: 2, name: 'Bob' },
   *   { id: 1, name: 'Alicia' }, // Duplicate id
   * ];
   * Arr.uniqBy(users, user => user.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
   * ```
   */
  export function uniqBy<const E, const P extends Primitive>(
    array: NonEmptyArray<E>,
    mapFn: (value: E) => P,
  ): NonEmptyArray<E>;
  export function uniqBy<const E, const P extends Primitive>(
    array: readonly E[],
    mapFn: (value: E) => P,
  ): readonly E[];
  export function uniqBy<const E, const P extends Primitive>(
    array: readonly E[],
    mapFn: (value: E) => P,
  ): readonly E[] {
    const mut_mappedValues = new Set<P>();

    return array.filter((val) => {
      const mappedValue = mapFn(val);

      if (mut_mappedValues.has(mappedValue)) return false;
      mut_mappedValues.add(mappedValue);

      return true;
    });
  }

  // set operations & equality

  /**
   * Checks if two arrays are equal by performing a shallow comparison of their elements.
   * @template E The type of elements in the arrays.
   * @param array1 The first array.
   * @param array2 The second array.
   * @param equality An optional function `(a: T, b: T) => boolean` to compare elements. Defaults to `Object.is`.
   * @returns `true` if the arrays have the same length and all corresponding elements are equal according to the `equality` function, `false` otherwise.
   * @example
   * ```ts
   * Arr.eq([1, 2, 3], [1, 2, 3]); // true
   * Arr.eq([1, 2, 3], [1, 2, 4]); // false
   * Arr.eq([1, 2], [1, 2, 3]); // false
   * Arr.eq([{a:1}], [{a:1}]); // false (different object references)
   * Arr.eq([{a:1}], [{a:1}], (o1, o2) => o1.a === o2.a); // true
   * ```
   */
  export const eq = <const E,>(
    array1: readonly E[],
    array2: readonly E[],
    equality: (a: E, b: E) => boolean = Object.is,
  ): boolean =>
    array1.length === array2.length &&
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    array1.every((v, i) => equality(v, array2[i]!));

  /**
   * Alias for `eq`.
   */
  export const equal = eq;

  /**
   * Checks if the first array (`array1`) is a subset of the second array (`array2`).
   * An array `A` is a subset of `B` if all elements of `A` are also present in `B`.
   * Elements must be primitive types for `includes` to work reliably for comparison.
   * @template E1 The type of elements in the first array (subset candidate), must be a primitive type.
   * @template E2 The type of elements in the second array (superset candidate), must be a primitive type.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns `true` if `array1` is a subset of `array2`, `false` otherwise.
   * @remarks `array1` ⊂ `array2`
   * @example
   * ```ts
   * Arr.isSubset([1, 2], [1, 2, 3]); // true
   * Arr.isSubset([1, 2, 3], [1, 2]); // false
   * Arr.isSubset([], [1, 2, 3]); // true
   * Arr.isSubset([1, 5], [1, 2, 3]); // false
   * ```
   */
  export const isSubset = <
    const E1 extends Primitive,
    const E2 extends Primitive = E1,
  >(
    array1: readonly E1[],
    array2: readonly E2[],
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  ): boolean => array1.every((a) => array2.includes(a as E1 & E2));

  /**
   * Checks if the first array (`array1`) is a superset of the second array (`array2`).
   * An array `A` is a superset of `B` if all elements of `B` are also present in `A`.
   * Elements must be primitive types.
   * @template E1 The type of elements in the first array (superset candidate), must be a primitive type.
   * @template E2 The type of elements in the second array (subset candidate), must be a primitive type.
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns `true` if `array1` is a superset of `array2`, `false` otherwise.
   * @remarks `array1` ⊃ `array2`
   * @example
   * ```ts
   * Arr.isSuperset([1, 2, 3], [1, 2]); // true
   * Arr.isSuperset([1, 2], [1, 2, 3]); // false
   * Arr.isSuperset([1, 2, 3], []); // true
   * ```
   */
  export const isSuperset = <
    const E1 extends Primitive,
    const E2 extends Primitive = E1,
  >(
    array1: readonly E1[],
    array2: readonly E2[],
  ): boolean => isSubset(array2, array1);

  /**
   * Returns the intersection of two arrays of primitive types.
   * The intersection contains elements that are present in both arrays. Order is based on `array1`.
   * @template E1 The type of elements in the first array (must be a primitive type).
   * @template E2 The type of elements in the second array (must be a primitive type).
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array containing elements that are in both `array1` and `array2`.
   * @example
   * ```ts
   * Arr.setIntersection([1, 2, 3], [2, 3, 4]); // [2, 3]
   * Arr.setIntersection(['a', 'b'], ['b', 'c']); // ['b']
   * Arr.setIntersection([1, 2], [3, 4]); // []
   * ```
   */
  export const setIntersection = <
    const E1 extends Primitive,
    const E2 extends Primitive = E1,
  >(
    array1: readonly E1[],
    array2: readonly E2[],
  ): readonly (E1 & E2)[] =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    array1.filter((e) => array2.includes(e as E1 & E2)) as (E1 & E2)[];

  /**
   * Returns the set difference of two arrays (`array1` - `array2`).
   * The difference contains elements that are in `array1` but not in `array2`. Order is based on `array1`.
   * Elements must be primitive types.
   * @template E The type of elements in the arrays (must be a primitive type).
   * @param array1 The first array.
   * @param array2 The second array.
   * @returns A new array containing elements from `array1` that are not in `array2`.
   * @example
   * ```ts
   * Arr.setDifference([1, 2, 3], [2, 3, 4]); // [1]
   * Arr.setDifference([1, 2, 3], [1, 2, 3]); // []
   * Arr.setDifference([1, 2], [3, 4]); // [1, 2]
   * ```
   */
  export const setDifference = <const E extends Primitive>(
    array1: readonly E[],
    array2: readonly E[],
  ): readonly E[] => array1.filter((e) => !array2.includes(e));

  /**
   * Returns the set difference of two sorted arrays of numbers (`sortedList1` - `sortedList2`).
   * This operation is more efficient for sorted arrays than the generic `setDifference`.
   * The resulting array is also sorted.
   * @template E The type of numbers in the arrays (must extend `number`).
   * @param sortedList1 The first sorted array of numbers.
   * @param sortedList2 The second sorted array of numbers.
   * @returns A new sorted array containing numbers from `sortedList1` that are not in `sortedList2`.
   * @example
   * ```ts
   * Arr.sortedNumSetDifference([1, 2, 3, 5], [2, 4, 5]); // [1, 3]
   * Arr.sortedNumSetDifference([1, 2, 3], [1, 2, 3]); // []
   * Arr.sortedNumSetDifference([1, 2], [3, 4]); // [1, 2]
   * ```
   */
  export const sortedNumSetDifference = <const E extends number>(
    sortedList1: readonly E[],
    sortedList2: readonly E[],
  ): readonly E[] => {
    const mut_result: E[] = [];
    let mut_it1 = 0; // iterator for sortedList1
    let mut_it2 = 0; // iterator for sortedList2

    while (mut_it1 < sortedList1.length && mut_it2 < sortedList2.length) {
      // Non-null assertions are safe due to loop condition
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const val1 = sortedList1[mut_it1]!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const val2 = sortedList2[mut_it2]!;

      if (val1 === val2) {
        mut_it1 += 1;
        mut_it2 += 1;
      } else if (val1 < val2) {
        mut_result.push(val1);
        mut_it1 += 1;
      } else {
        // val1 > val2
        mut_it2 += 1;
      }
    }
    // Add remaining elements from sortedList1
    for (; mut_it1 < sortedList1.length; mut_it1 += 1) {
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mut_result.push(sortedList1[mut_it1]!);
    }

    return mut_result;
  };

  // aliases

  /**
   * Alias for `head`. Returns the first element of an array.
   * @see {@link head}
   */
  export const first = head;

  /**
   * Alias for `tail`. Returns all elements of an array except the first one.
   * @see {@link tail}
   */
  export const rest = tail;

  /**
   * Alias for `skip`. Skips the first N elements of an array.
   * @see {@link skip}
   */
  export const drop = skip;

  /**
   * Alias for `foldl`. Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
   * @see {@link foldl}
   */
  export const reduce = foldl;

  /**
   * Alias for `foldr`. Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
   * @see {@link foldr}
   */
  export const reduceRight = foldr;

  /**
   * Alias for `partition`. Splits an array into chunks of a specified size.
   * @see {@link partition}
   */
  export const chunk = partition;
}
