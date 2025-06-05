import { IMap } from '../collections/index.mjs';
import { expectType } from '../expect-type.mjs';
import { Optional, pipe, Result } from '../functional/index.mjs';
import { range as rangeIterator } from '../iterator/index.mjs';
import { asUint32, Num, Uint32 } from '../number/index.mjs';
import { tp } from '../others/index.mjs';

/**
 * Checks if an array is empty.
 * @template E The type of elements in the array.
 * @param list The array to check.
 * @returns `true` if the array is empty, `false` otherwise.
 * @example
 * ```ts
 * Arr.isEmpty([]); // true
 * Arr.isEmpty([1, 2, 3]); // false
 * ```
 */
const isEmpty = <E,>(list: readonly E[]): list is readonly [] =>
  list.length === 0;

/**
 * Checks if an array is non-empty.
 * @template E The type of elements in the array.
 * @param list The array to check.
 * @returns `true` if the array is non-empty, `false` otherwise.
 * @example
 * ```ts
 * Arr.isNonEmpty([1, 2, 3]); // true
 * Arr.isNonEmpty([]); // false
 * ```
 */
const isNonEmpty = <E,>(list: readonly E[]): list is NonEmptyArray<E> =>
  list.length > 0;

/**
 * Checks if an array has a specific length.
 * @template E The type of elements in the array.
 * @template N The expected length of the array (must be a number type).
 * @param array The array to check.
 * @param n The expected length.
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
const isArrayOfLength = <E, N extends SizeType.ArgArrNonNegative>(
  array: readonly E[],
  n: N,
): array is ArrayOfLength<N, E> => array.length === n;

/**
 * Checks if an array has at least a specific length.
 * @template E The type of elements in the array.
 * @template N The minimum expected length of the array (must be a number type).
 * @param array The array to check.
 * @param length The minimum expected length.
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
const isArrayAtLeastLength = <E, N extends SizeType.ArgArrNonNegative>(
  array: readonly E[],
  length: N,
): array is ArrayAtLeastLen<N, E> => array.length >= length;

/**
 * Checks if an index is within the valid range of an array (i.e., `0 <= index < list.length`).
 * @template T The type of elements in the array.
 * @param list The input array.
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
const indexIsInRange = <T,>(
  list: readonly T[],
  index: SizeType.ArgArrNonNegative,
): boolean => Num.isInRange(0, list.length)(index);

/**
 * Returns the size (length) of an array as a branded Uint32 type.
 * For non-empty arrays, returns a positive number intersected with Uint32.
 * For potentially empty arrays, returns Uint32.
 *
 * @template T The type of the array
 * @param list The array to get the size of
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
function size<T extends NonEmptyArray<unknown>>(
  list: T,
): IntersectBrand<PositiveNumber, SizeType.Arr>;
function size<T extends readonly unknown[]>(list: T): SizeType.Arr;
function size<T extends readonly unknown[]>(list: T): SizeType.Arr {
  return asUint32(list.length);
}

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
function zeros<N extends SmallUint>(len: N): ArrayOfLength<N, 0>;
function zeros(
  len: WithSmallInt<SizeType.ArgArrPositive & Uint32>,
): NonEmptyArray<0>;
function zeros(len: SizeType.ArgArrNonNegative): readonly 0[];
function zeros(len: SizeType.ArgArrNonNegative): readonly 0[] {
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
function seq<N extends SmallUint>(len: N): Seq<N>;
function seq(len: SizeType.ArgArrPositive): NonEmptyArray<SizeType.Arr>;
function seq(len: SizeType.ArgArrNonNegative): readonly SizeType.Arr[];
function seq(len: SizeType.ArgArrNonNegative): readonly SizeType.Arr[] {
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
 * Arr.newArray(3, 'a'); // ['a', 'a', 'a']
 * const obj = { id: 1 };
 * const arr = Arr.newArray(2, obj); // [obj, obj]
 * arr[0] === obj; // true (shallow copy of the reference)
 * ```
 */
function newArray<const V, N extends SmallUint>(
  len: N,
  init: V,
): ArrayOfLength<N, V>;
function newArray<const V>(
  len: SizeType.ArgArrPositive,
  init: V,
): NonEmptyArray<V>;
function newArray<const V>(
  len: SizeType.ArgArrNonNegative,
  init: V,
): readonly V[];
function newArray<const V>(
  len: SizeType.ArgArrNonNegative,
  init: V,
): readonly V[] {
  return Array.from({ length: Math.max(0, len) }, () => init);
}

/**
 * Creates a shallow copy of an array.
 * @template T The type of the array, which can be a mutable or readonly array.
 * @param list The array to copy.
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
const copy = <const T extends readonly unknown[]>(list: T): T =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.slice() as unknown as T;

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
expectType<RangeList<1 | 2 | 3, 5 | 6 | 7>, readonly (1 | 2 | 3 | 4 | 5 | 6)[]>(
  '=',
);
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
function range<S extends SmallUint, E extends SmallUint>(
  start: S,
  end: E,
  step?: 1,
): RangeList<S, E>;

function range(
  start: SafeUintWithSmallInt,
  end: SafeUintWithSmallInt,
  step?: PositiveSafeIntWithSmallInt,
): readonly SafeUint[];

function range(
  start: SafeIntWithSmallInt,
  end: SafeIntWithSmallInt,
  step?: NonZeroSafeIntWithSmallInt,
): readonly SafeInt[];

function range(
  start: SafeIntWithSmallInt,
  end: SafeIntWithSmallInt,
  step: NonZeroSafeIntWithSmallInt = 1,
): readonly SafeInt[] {
  return Array.from(rangeIterator(start, end, step));
}

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
const at = <T,>(array: readonly T[], index: SizeType.ArgArr): Optional<T> =>
  pipe(index < 0 ? array.length + index : index).map((normalizedIndex) =>
    normalizedIndex < 0 || normalizedIndex >= array.length
      ? Optional.none
      : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
        Optional.some(array[normalizedIndex]!),
  ).value;

/**
 * Returns the first element of an array.
 *
 * - If the array is empty, returns `undefined`.
 * - If the array is a tuple or a non-empty array, returns the first element with precise typing.
 *
 * @example
 * ```ts
 * Arr.head([1, 2, 3]); // 1
 * Arr.head([]); // undefined
 * ```
 */
function head(list: readonly []): undefined;
function head<const H, const L extends readonly unknown[]>(
  list: readonly [H, ...L],
): H;
function head<const E>(list: NonEmptyArray<E>): E;
function head<const E>(list: readonly E[]): E | undefined;
function head<const E>(list: readonly E[]): E | undefined {
  return list.at(0);
}

/**
 * Returns the last element of an array.
 *
 * - If the array is empty, returns `undefined`.
 * - If the array is a tuple or a non-empty array, returns the last element with precise typing.
 *
 * @example
 * ```ts
 * Arr.last([1, 2, 3]); // 3
 * Arr.last([]); // undefined
 * ```
 */
function last(list: readonly []): undefined;
function last<const H extends readonly unknown[], const L>(
  list: readonly [...H, L],
): L;
function last<const E>(list: NonEmptyArray<E>): E;
function last<const E>(list: readonly E[]): E | undefined;
function last<const E>(list: readonly E[]): E | undefined {
  return list.at(-1);
}

/**
 * Slices an array with clamped start and end indices.
 * Ensures that start and end indices are within the bounds of the array.
 * If `start` > `end` after clamping, an empty array is returned.
 * @template E The type of elements in the array.
 * @param list The array to slice.
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
const sliceClamped = <E,>(
  list: readonly E[],
  start: SizeType.ArgArr,
  end: SizeType.ArgArr,
): readonly E[] => {
  const startClamped = Num.clamp(0, list.length)(start);
  // Ensure endClamped is not less than startClamped.
  const endClamped = Num.clamp(startClamped, list.length)(end);
  return list.slice(startClamped, endClamped);
};

/**
 * Returns all elements of an array except the first one.
 * @template E The type of the array (can be a tuple for more precise typing).
 * @param list The input array.
 * @returns A new array containing all elements except the first. The type is inferred as `List.Tail<T>`.
 * @example
 * ```ts
 * Arr.tail([1, 2, 3] as const); // [2, 3]
 * Arr.tail([1] as const); // []
 * Arr.tail([]); // []
 * ```
 */
const tail = <const E extends readonly unknown[]>(list: E): List.Tail<E> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.slice(1) as unknown as List.Tail<E>;

/**
 * Returns all elements of an array except the last one.
 * @template E The type of the array (can be a tuple for more precise typing).
 * @param list The input array.
 * @returns A new array containing all elements except the last. The type is inferred as `List.ButLast<T>`.
 * @example
 * ```ts
 * Arr.butLast([1, 2, 3] as const); // [1, 2]
 * Arr.butLast([1] as const); // []
 * Arr.butLast([]); // []
 * ```
 */
const butLast = <const E extends readonly unknown[]>(
  list: E,
): List.ButLast<E> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  (isEmpty(list) ? [] : list.slice(0, -1)) as unknown as List.ButLast<E>;

/**
 * Takes the first N elements from an array.
 *
 * - If the array is a tuple, the return type is inferred as a tuple of the first N elements.
 * - If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
 * - Otherwise, returns a readonly array of up to N elements.
 *
 * @template E The type of the array (can be a tuple for more precise typing).
 * @template N The number of elements to take, constrained to `SmallUint`.
 * @param list The input array.
 * @param num The number of elements to take.
 * @returns A new array containing the first N elements.
 * @example
 * ```ts
 * Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
 * Arr.take([1, 2], 3); // [1, 2]
 * Arr.take([], 2); // []
 * ```
 */
function take<const E extends readonly unknown[], N extends SmallUint>(
  list: E,
  num: N,
): List.Take<N, E>;
function take<const E>(
  list: NonEmptyArray<E>,
  num: SizeType.ArgArrPositive,
): NonEmptyArray<E>;
function take<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[];
function take<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[] {
  return sliceClamped(list, 0, num);
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
 * @param list The input array.
 * @param num The number of elements to take.
 * @returns A new array containing the last N elements.
 * @example
 * ```ts
 * Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
 * Arr.takeLast([1, 2], 3); // [1, 2]
 * Arr.takeLast([], 2); // []
 * ```
 */
function takeLast<const E extends readonly unknown[], N extends SmallUint>(
  list: E,
  num: N,
): List.TakeLast<N, E>;
function takeLast<const E>(
  list: NonEmptyArray<E>,
  num: SizeType.ArgArrPositive,
): NonEmptyArray<E>;
function takeLast<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[];
function takeLast<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[] {
  return sliceClamped(list, Uint32.sub(size(list), num), size(list));
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
 * @param list The input array.
 * @param num The number of elements to skip.
 * @returns A new array containing the elements after skipping the first N.
 * @example
 * ```ts
 * Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
 * Arr.skip([1, 2], 3); // []
 * Arr.skip([], 2); // []
 * ```
 */
function skip<const E extends readonly unknown[], N extends SmallUint>(
  list: E,
  num: N,
): List.Skip<N, E>;
function skip<const E>(
  list: NonEmptyArray<E>,
  num: SizeType.ArgArrPositive,
): readonly E[];
function skip<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[];
function skip<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[] {
  return sliceClamped(list, num, size(list));
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
 * @param list The input array.
 * @param num The number of elements to skip from the end.
 * @returns A new array containing the elements after skipping the last N.
 * @example
 * ```ts
 * Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
 * Arr.skipLast([1, 2], 3); // []
 * Arr.skipLast([], 2); // []
 * ```
 */
function skipLast<const E extends readonly unknown[], N extends SmallUint>(
  list: E,
  num: N,
): List.SkipLast<N, E>;
function skipLast<const E>(
  list: NonEmptyArray<E>,
  num: SizeType.ArgArrPositive,
): readonly E[];
function skipLast<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[];
function skipLast<const E>(
  list: readonly E[],
  num: SizeType.ArgArrNonNegative,
): readonly E[] {
  return sliceClamped(list, 0, Uint32.sub(size(list), num));
}

/**
 * Returns a new array with the element at the specified index updated by a function.
 * If the index is out of bounds, the original array is returned (as per `Array.prototype.with` behavior for invalid indices, though it throws for non-integer indices).
 * This implementation ensures it doesn't throw for out-of-bounds indices but returns a copy.
 * @template A The type of elements in the original array.
 * @template U The type of the updated value.
 * @param list The input array.
 * @param index The index of the element to update.
 * @param updater A function that takes the previous value and returns the updated value.
 * @returns A new array with the element at the specified index updated. If index is invalid, a copy of the original array is returned.
 * @example
 * ```ts
 * Arr.toUpdated([1, 2, 3], 1, (x) => x * 10); // [1, 20, 3]
 * Arr.toUpdated([1, 2, 3], 5, (x) => x * 10); // [1, 2, 3] (index out of bounds)
 * ```
 */
const toUpdated = <A, U>(
  list: readonly A[],
  index: SizeType.ArgArrNonNegative,
  updater: (prev: A) => U,
): readonly (A | U)[] =>
  index < 0 || index >= list.length
    ? list // Return a copy if index is out of bounds
    : // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      (list as readonly (A | U)[]).with(index, updater(list[index]!));

/**
 * Returns a new array with a new value inserted at the specified index.
 * Index can be out of bounds (e.g., negative or greater than length), `toSpliced` handles this.
 * @template A The type of elements in the array.
 * @param list The input array.
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
const toInserted = <A,>(
  list: readonly A[],
  index: SizeType.ArgArrNonNegative,
  newValue: A,
): readonly A[] => list.toSpliced(index, 0, newValue);

/**
 * Returns a new array with the element at the specified index removed.
 * If index is out of bounds, `toSpliced` handles this (usually by returning a copy).
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param index The index of the element to remove.
 * @returns A new array with the element removed.
 * @example
 * ```ts
 * Arr.toRemoved([1, 2, 3], 1); // [1, 3]
 * Arr.toRemoved([1, 2, 3], 5); // [1, 2, 3] (index out of bounds)
 * ```
 */
const toRemoved = <A,>(
  list: readonly A[],
  index: SizeType.ArgArrNonNegative,
): readonly A[] => list.toSpliced(index, 1);

/**
 * Returns a new array with a value added to the end.
 * @template T The type of the input array (can be a tuple).
 * @template V The type of the value to add.
 * @param list The input array.
 * @param value The value to add.
 * @returns A new array with the value added to the end. Type is `readonly [...T, V]`.
 * @example
 * ```ts
 * Arr.toPushed([1, 2] as const, 3); // [1, 2, 3]
 * Arr.toPushed([], 0); // [0]
 * ```
 */
const toPushed = <const T extends readonly unknown[], const V>(
  list: T,
  value: V,
): readonly [...T, V] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.toSpliced(list.length, 0, value) as unknown as readonly [...T, V];

/**
 * Returns a new array with a value added to the beginning.
 * @template T The type of the input array (can be a tuple).
 * @template V The type of the value to add.
 * @param list The input array.
 * @param value The value to add.
 * @returns A new array with the value added to the beginning. Type is `readonly [V, ...T]`.
 * @example
 * ```ts
 * Arr.toUnshifted([1, 2] as const, 0); // [0, 1, 2]
 * Arr.toUnshifted([], 0); // [0]
 * ```
 */
const toUnshifted = <const T extends readonly unknown[], const V>(
  list: T,
  value: V,
): readonly [V, ...T] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.toSpliced(0, 0, value) as unknown as readonly [V, ...T];

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
const toFilled = <T,>(
  array: readonly T[],
  value: T,
  start?: SizeType.ArgArr,
  end?: SizeType.ArgArr,
): Result<readonly T[], { readonly type: 'InvalidArgument' }> => {
  if (start !== undefined && !Number.isInteger(start)) {
    return Result.err({ type: 'InvalidArgument' } as const);
  }
  if (end !== undefined && !Number.isInteger(end)) {
    return Result.err({ type: 'InvalidArgument' } as const);
  }

  const cp = [...array];
  cp.fill(value, start, end);
  return Result.ok(cp);
};

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
const find = <T,>(
  array: readonly T[],
  predicate: (value: T, index: SizeType.Arr, arr: readonly T[]) => boolean,
): Optional<T> => {
  const foundIndex = array.findIndex(
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    predicate as (value: T, index: number, arr: readonly T[]) => boolean,
  );

  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  return foundIndex === -1 ? Optional.none : Optional.some(array[foundIndex]!);
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
const findIndex = <T,>(
  array: readonly T[],
  predicate: (value: T, index: SizeType.Arr) => boolean,
): Optional<SizeType.Arr> =>
  pipe(
    array.findIndex(
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      predicate as (value: T, index: number) => boolean,
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
const indexOf = <T,>(
  array: readonly T[],
  searchElement: T,
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
const lastIndexOf = <T,>(
  array: readonly T[],
  searchElement: T,
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

/**
 * Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
 * This is an alias for `Array.prototype.reduce`.
 * @template A The type of elements in the array.
 * @template S The type of the accumulated value.
 * @param list The input array.
 * @param callbackfn A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.
 * @param initialValue The initial value of the accumulator.
 * @returns The single value that results from the reduction.
 * @example
 * ```ts
 * Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
 * Arr.foldl(['a', 'b', 'c'], (str, char) => str + char, ''); // "abc"
 * ```
 */
const foldl = <A, S>(
  list: readonly A[],
  callbackfn: (
    previousValue: S,
    currentValue: A,
    currentIndex: SizeType.Arr,
  ) => S,
  initialValue: S,
): S =>
  list.reduce<S>(
    (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
    initialValue,
  );

/**
 * Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
 * This is an alias for `Array.prototype.reduceRight`.
 * @template A The type of elements in the array.
 * @template S The type of the accumulated value.
 * @param list The input array.
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
const foldr = <A, S>(
  list: readonly A[],
  callbackfn: (
    previousValue: S,
    currentValue: A,
    currentIndex: SizeType.Arr,
  ) => S,
  initialValue: S,
): S =>
  list.reduceRight(
    (prev, curr, index) => callbackfn(prev, curr, asUint32(index)),
    initialValue,
  );

/**
 * Finds the minimum value in a non-empty array of numbers.
 * @template N The type of numbers in the array (must extend `number`).
 * @param list The input non-empty array of numbers.
 * @param comparator An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.
 * @returns The minimum value in the array.
 * @example
 * ```ts
 * Arr.min([3, 1, 4, 1, 5] as const); // 1
 * Arr.min([{v:3}, {v:1}], (a,b) => a.v - b.v) // {v:1}
 * ```
 */
function min<N extends number>(
  list: NonEmptyArray<N>,
  comparator?: (x: N, y: N) => number,
): N;
function min<N extends number>(
  list: readonly N[],
  comparator?: (x: N, y: N) => number,
): N | undefined;
function min<A>(list: NonEmptyArray<A>, comparator: (x: A, y: A) => number): A;
function min<A>(
  list: readonly A[],
  comparator: (x: A, y: A) => number,
): A | undefined;
function min<A>(
  list: readonly A[],
  comparator?: (x: A, y: A) => number,
): A | undefined {
  const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));

  if (!isNonEmpty(list)) {
    return undefined;
  }
  // Reduce requires the accumulator to be of the same type as elements or a supertype.
  // Here, list[0] ensures the accumulator starts with an element from the array.
  return list.reduce(
    (currentMin, curr) => (cmp(curr, currentMin) < 0 ? curr : currentMin),
    list[0],
  );
}

/**
 * Finds the maximum value in an array.
 *
 * - If the array is non-empty, returns the maximum value.
 * - If the array is empty, returns `undefined`.
 * - You can provide a custom comparator for arbitrary types.
 *
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param comparator An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.
 * @returns The maximum value in the array, or `undefined` if the array is empty.
 * @example
 * ```ts
 * Arr.max([3, 1, 4, 1, 5] as const); // 5
 * Arr.max([{v:3}, {v:1}], (a,b) => a.v - b.v) // {v:3}
 * ```
 */
function max<N extends number>(
  list: NonEmptyArray<N>,
  comparator?: (x: N, y: N) => number,
): N;
function max<N extends number>(
  list: readonly N[],
  comparator?: (x: N, y: N) => number,
): N | undefined;
function max<A>(list: NonEmptyArray<A>, comparator: (x: A, y: A) => number): A;
function max<A>(
  list: readonly A[],
  comparator: (x: A, y: A) => number,
): A | undefined;
function max<A>(
  list: readonly A[],
  comparator?: (x: A, y: A) => number,
): A | undefined {
  const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));
  // Find max by finding min with an inverted comparator
  return min(list, (x, y) => -cmp(x, y));
}

/**
 * Finds the element with the minimum value according to a mapped numeric value.
 *
 * - If the array is non-empty, returns the element with the minimum mapped value.
 * - If the array is empty, returns `undefined`.
 * - You can provide a custom comparator for the mapped values.
 *
 * @template A The type of elements in the array.
 * @template V The type of the value to compare by.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a value for comparison.
 * @param comparator An optional custom comparator function for the mapped values.
 * @returns The element with the minimum mapped value, or `undefined` if the array is empty.
 * @example
 * ```ts
 * const people = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }] as const;
 * Arr.minBy(people, p => p.age); // { name: 'Bob', age: 20 }
 * ```
 */
function minBy<A>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => number,
): A;
function minBy<A>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => number,
): A | undefined;
function minBy<A, V>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => V,
  comparator: (x: V, y: V) => number,
): A;
function minBy<A, V>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => V,
  comparator: (x: V, y: V) => number,
): A | undefined;
function minBy<A, V>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => V,
  comparator?: (x: V, y: V) => number,
): A | undefined {
  return min(list, (x, y) =>
    comparator === undefined
      ? Num.from(comparatorValueMapper(x)) - Num.from(comparatorValueMapper(y))
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

/**
 * Finds the element with the maximum value according to a mapped numeric value.
 *
 * - If the array is non-empty, returns the element with the maximum mapped value.
 * - If the array is empty, returns `undefined`.
 * - You can provide a custom comparator for the mapped values.
 *
 * @template A The type of elements in the array.
 * @template V The type of the value to compare by.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a value for comparison.
 * @param comparator An optional custom comparator function for the mapped values.
 * @returns The element with the maximum mapped value, or `undefined` if the array is empty.
 * @example
 * ```ts
 * const people = [{ name: 'Alice', age: 30 }, { name: 'Bob', age: 20 }] as const;
 * Arr.maxBy(people, p => p.age); // { name: 'Alice', age: 30 }
 * ```
 */
function maxBy<A>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => number,
): A;
function maxBy<A>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => number,
): A | undefined;
function maxBy<A, V>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => V,
  comparator: (x: V, y: V) => number,
): A;
function maxBy<A, V>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => V,
  comparator: (x: V, y: V) => number,
): A | undefined;
function maxBy<A, V>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => V,
  comparator?: (x: V, y: V) => number,
): A | undefined {
  return max(list, (x, y) =>
    comparator === undefined
      ? Num.from(comparatorValueMapper(x)) - Num.from(comparatorValueMapper(y))
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

/**
 * Counts the number of elements in an array that satisfy a predicate.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param predicate A function `(value: A, index: number) => boolean` to test each element for a condition.
 * @returns The number of elements that satisfy the predicate.
 * @example
 * ```ts
 * Arr.count([1, 2, 3, 4], (x) => x > 2); // 2
 * Arr.count(['a', 'b', 'a'], (x) => x === 'a'); // 2
 * Arr.count([], () => true); // 0
 * ```
 */
const count = <A,>(
  list: readonly A[],
  predicate: (value: A, index: SizeType.Arr) => boolean,
): SizeType.Arr =>
  asUint32(
    list.reduce<number>(
      (acc, curr, index) => (predicate(curr, asUint32(index)) ? acc + 1 : acc),
      0,
    ),
  );

/**
 * Groups elements of an array by a key derived from each element and counts the elements in each group.
 * @template A The type of elements in the array.
 * @template G The type of the group key (must be a primitive type: `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`).
 * @param list The input array.
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
const countBy = <A, G extends MapSetKeyType>(
  list: readonly A[],
  grouper: (value: A, index: SizeType.Arr) => G,
): IMap<G, SizeType.Arr> => {
  const mut_groups = new Map<G, SizeType.Arr>();

  for (const [index, e] of list.entries()) {
    const key = grouper(e, asUint32(index));
    const curr = mut_groups.get(key) ?? 0;

    mut_groups.set(key, asUint32(curr + 1));
  }

  return IMap.new(mut_groups);
};

/**
 * Calculates the sum of numbers in an array.
 * @param list The input array of numbers.
 * @returns The sum of the numbers. Returns 0 for an empty array.
 * @example
 * ```ts
 * Arr.sum([1, 2, 3]); // 6
 * Arr.sum([]); // 0
 * Arr.sum([-1, 0, 1]); // 0
 * ```
 */
const sum = (list: readonly number[]): number =>
  list.reduce((prev, curr) => prev + curr, 0);

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
const join = <T,>(
  array: readonly T[],
  separator?: string,
): Result<string, Error> => {
  try {
    const result = array.join(separator);
    return Result.ok(result);
  } catch (error) {
    return Result.err(
      error instanceof Error ? error : new Error(String(error)),
    );
  }
};

// TODO: add an overload of NonEmpty case for zip to return NonEmptyArray of tuples if both inputs are NonEmpty
/**
 * Zips two arrays together, creating an array of pairs (tuples).
 * The resulting array will have the length of the shorter input array.
 * @template T1 The type of the first array (can be a tuple).
 * @template T2 The type of the second array (can be a tuple).
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array of pairs. The type is inferred as `List.Zip<T1, T2>`.
 * @example
 * ```ts
 * Arr.zip([1, 2, 3] as const, ['a', 'b', 'c'] as const); // [[1, 'a'], [2, 'b'], [3, 'c']]
 * Arr.zip([1, 2], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b']]
 * Arr.zip([1, 2, 3], ['a']); // [[1, 'a']]
 * Arr.zip([], ['a']); // []
 * ```
 */
const zip = <T1 extends readonly unknown[], T2 extends readonly unknown[]>(
  list1: T1,
  list2: T2,
): List.Zip<T1, T2> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  seq(Uint32.min(size(list1), size(list2))).map((i) =>
    // Non-null assertion is safe here because `i` is always within bounds of both arrays up to the length of the shorter one.
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    tp(list1[i]!, list2[i]!),
  ) as unknown as List.Zip<T1, T2>;

/**
 * Filters an array by excluding elements for which the predicate returns true.
 * This is the opposite of `Array.prototype.filter`.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param predicate A function `(a: A, index: number) => boolean` that returns `true` for elements to be excluded.
 * @returns A new array with elements for which the predicate returned `false`.
 * @example
 * ```ts
 * Arr.filterNot([1, 2, 3, 4], (x) => x % 2 === 0); // [1, 3] (excludes even numbers)
 * Arr.filterNot(['apple', 'banana', 'avocado'], (s) => s.startsWith('a')); // ['banana']
 * ```
 */
const filterNot = <A,>(
  list: readonly A[],
  predicate: (a: A, index: SizeType.Arr) => boolean,
): readonly A[] => list.filter((a, i) => !predicate(a, asUint32(i)));

/**
 * Concatenates two arrays.
 * @template T1 The type of the first array (can be a tuple).
 * @template T2 The type of the second array (can be a tuple).
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array that is the concatenation of the two input arrays. Type is `readonly [...T1, ...T2]`.
 * @example
 * ```ts
 * Arr.concat([1, 2] as const, [3, 4] as const); // [1, 2, 3, 4]
 * Arr.concat([], [1, 2]); // [1, 2]
 * Arr.concat([1, 2], []); // [1, 2]
 * ```
 */
const concat = <
  const T1 extends readonly unknown[],
  const T2 extends readonly unknown[],
>(
  list1: T1,
  list2: T2,
): readonly [...T1, ...T2] => [...list1, ...list2];

/**
 * Partitions an array into sub-arrays of a specified size.
 * The last partition may be smaller if the array length is not a multiple of `chunkSize`.
 * Returns an empty array if chunkSize < 2.
 * @template N The size of each partition (must be a number type, typically a literal for precise typing).
 * @template A The type of elements in the array.
 * @param list The input array.
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
const partition = <N extends WithSmallInt<PositiveInt & SizeType.Arr>, A>(
  list: readonly A[],
  chunkSize: N,
): readonly (readonly A[])[] =>
  chunkSize < 2
    ? []
    : seq(asUint32(Math.ceil(list.length / chunkSize))).map((i) =>
        list.slice(chunkSize * i, chunkSize * (i + 1)),
      );

/**
 * Sorts an array by a value derived from its elements, using a numeric mapping.
 * @template A The type of elements in the array.
 * @param list The input array.
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
function toSortedBy<A>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => number,
  comparator?: (x: number, y: number) => number,
): readonly A[];

/**
 * Sorts an array by a value derived from its elements, using a custom value type and comparator.
 * @template A The type of elements in the array.
 * @template V The type of the value to compare by.
 * @param list The input array.
 * @param comparatorValueMapper A function `(value: A) => B` that maps an element to a value of type `V` for comparison.
 * @param comparator A custom comparator function `(x: V, y: V) => number` for values of type `V`.
 * @returns A new array sorted by the mapped values.
 */
function toSortedBy<A, V>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => V,
  comparator: (x: V, y: V) => number,
): readonly A[];
function toSortedBy<A, V>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => V,
  comparator?: (x: V, y: V) => number,
): readonly A[] {
  return list.toSorted((x, y) =>
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
 * The result array will have `list.length + 1` elements.
 * @template A The type of elements in the input array.
 * @template S The type of the accumulated values and the initial value.
 * @param list The input array.
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
const scan = <A, S>(
  list: readonly A[],
  reducer: (accumulator: S, currentValue: A, currentIndex: SizeType.Arr) => S,
  init: S,
): NonEmptyArray<S> => {
  const mut_result: S[] = Array.from({ length: list.length + 1 }, () => init);

  let mut_acc = init;

  for (const [index, value] of list.entries()) {
    mut_acc = reducer(mut_acc, value, asUint32(index));
    mut_result[index + 1] = mut_acc;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return mut_result as MutableNonEmptyArray<S>; // Ensure NonEmptyArray contract
};

/**
 * Groups elements of an array by a key derived from each element.
 * @template A The type of elements in the array.
 * @template G The type of the group key (must be a primitive type).
 * @param list The input array.
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
const groupBy = <A, G extends MapSetKeyType>(
  list: readonly A[],
  grouper: (value: A, index: SizeType.Arr) => G,
): IMap<G, readonly A[]> => {
  const mut_groups = new Map<G, A[]>(); // Store mutable arrays internally

  for (const [index, e] of list.entries()) {
    const key = grouper(e, asUint32(index)); // Ensure index is treated as SizeType.Arr
    const mut_group = mut_groups.get(key);
    if (mut_group !== undefined) {
      mut_group.push(e);
    } else {
      mut_groups.set(key, [e]);
    }
  }
  // Cast to IMap<G, readonly A[]> for the public interface
  return IMap.new<G, readonly A[]>(mut_groups);
};

/**
 * Creates a new array with unique elements from the input list. Order is preserved from the first occurrence.
 * Uses `Set` internally for efficient uniqueness checking.
 * @template P The type of elements in the array.
 * @param list The input array.
 * @returns A new array with unique elements from the input list. Returns `[]` for an empty input.
 * @example
 * ```ts
 * Arr.uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
 * Arr.uniq(['a', 'b', 'a']); // ['a', 'b']
 * ```
 */
function uniq<P extends Primitive>(list: readonly P[]): readonly P[] {
  return Array.from(new Set(list));
}

/**
 * Creates a new array with unique elements from the input list, based on the values returned by `mapFn`.
 *
 * - If the input is a non-empty array, returns a non-empty array.
 * - Otherwise, returns a readonly array.
 *
 * @template A The type of elements in the array.
 * @template P The type of the mapped value (used for uniqueness comparison).
 * @param list The input array.
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
function uniqBy<A, P extends Primitive>(
  list: NonEmptyArray<A>,
  mapFn: (value: A) => P,
): NonEmptyArray<A>;
function uniqBy<A, P extends Primitive>(
  list: readonly A[],
  mapFn: (value: A) => P,
): readonly A[];
function uniqBy<A, P extends Primitive>(
  list: readonly A[],
  mapFn: (value: A) => P,
): readonly A[] {
  const mut_mappedValues = new Set<P>();

  return list.filter((val) => {
    const mappedValue = mapFn(val);

    if (mut_mappedValues.has(mappedValue)) return false;
    mut_mappedValues.add(mappedValue);

    return true;
  });
}

/**
 * Checks if two arrays are equal by performing a shallow comparison of their elements.
 * @template T The type of elements in the arrays.
 * @param list1 The first array.
 * @param list2 The second array.
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
const eq = <T,>(
  list1: readonly T[],
  list2: readonly T[],
  equality: (a: T, b: T) => boolean = Object.is,
): boolean =>
  list1.length === list2.length &&
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  list1.every((v, i) => equality(v, list2[i]!));

/**
 * Checks if the first array (`list1`) is a subset of the second array (`list2`).
 * An array `A` is a subset of `B` if all elements of `A` are also present in `B`.
 * Elements must be primitive types for `includes` to work reliably for comparison.
 * @template A The type of elements in the first array (subset candidate), must be a primitive type.
 * @template B The type of elements in the second array (superset candidate), must be a primitive type.
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns `true` if `list1` is a subset of `list2`, `false` otherwise.
 * @remarks `list1` ⊂ `list2`
 * @example
 * ```ts
 * Arr.isSubset([1, 2], [1, 2, 3]); // true
 * Arr.isSubset([1, 2, 3], [1, 2]); // false
 * Arr.isSubset([], [1, 2, 3]); // true
 * Arr.isSubset([1, 5], [1, 2, 3]); // false
 * ```
 */
const isSubset = <A extends Primitive, B extends Primitive = A>(
  list1: readonly A[],
  list2: readonly B[],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
): boolean => list1.every((a) => list2.includes(a as A & B));

/**
 * Checks if the first array (`list1`) is a superset of the second array (`list2`).
 * An array `A` is a superset of `B` if all elements of `B` are also present in `A`.
 * Elements must be primitive types.
 * @template A The type of elements in the first array (superset candidate), must be a primitive type.
 * @template B The type of elements in the second array (subset candidate), must be a primitive type.
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns `true` if `list1` is a superset of `list2`, `false` otherwise.
 * @remarks `list1` ⊃ `list2`
 * @example
 * ```ts
 * Arr.isSuperset([1, 2, 3], [1, 2]); // true
 * Arr.isSuperset([1, 2], [1, 2, 3]); // false
 * Arr.isSuperset([1, 2, 3], []); // true
 * ```
 */
const isSuperset = <A extends Primitive, B extends Primitive = A>(
  list1: readonly A[],
  list2: readonly B[],
): boolean => isSubset(list2, list1);

/**
 * Returns the intersection of two arrays of primitive types.
 * The intersection contains elements that are present in both arrays. Order is based on `list1`.
 * @template A The type of elements in the first array (must be a primitive type).
 * @template B The type of elements in the second array (must be a primitive type).
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array containing elements that are in both `list1` and `list2`.
 * @example
 * ```ts
 * Arr.setIntersection([1, 2, 3], [2, 3, 4]); // [2, 3]
 * Arr.setIntersection(['a', 'b'], ['b', 'c']); // ['b']
 * Arr.setIntersection([1, 2], [3, 4]); // []
 * ```
 */
const setIntersection = <A extends Primitive, B extends Primitive = A>(
  list1: readonly A[],
  list2: readonly B[],
): readonly (A & B)[] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list1.filter((e) => list2.includes(e as A & B)) as (A & B)[];

/**
 * Returns the set difference of two arrays (`list1` - `list2`).
 * The difference contains elements that are in `list1` but not in `list2`. Order is based on `list1`.
 * Elements must be primitive types.
 * @template A The type of elements in the arrays (must be a primitive type).
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array containing elements from `list1` that are not in `list2`.
 * @example
 * ```ts
 * Arr.setDifference([1, 2, 3], [2, 3, 4]); // [1]
 * Arr.setDifference([1, 2, 3], [1, 2, 3]); // []
 * Arr.setDifference([1, 2], [3, 4]); // [1, 2]
 * ```
 */
const setDifference = <A extends Primitive>(
  list1: readonly A[],
  list2: readonly A[],
): readonly A[] => list1.filter((e) => !list2.includes(e));

/**
 * Returns the set difference of two sorted arrays of numbers (`sortedList1` - `sortedList2`).
 * This operation is more efficient for sorted arrays than the generic `setDifference`.
 * The resulting array is also sorted.
 * @template T The type of numbers in the arrays (must extend `number`).
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
const sortedNumSetDifference = <T extends number>(
  sortedList1: readonly T[],
  sortedList2: readonly T[],
): readonly T[] => {
  const mut_result: T[] = [];
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

/**
 * A comprehensive, immutable utility library for array manipulations in TypeScript.
 * Provides a wide range of functions for array creation, validation, transformation,
 * reduction, slicing, set operations, and more, with a focus on type safety and
 * leveraging TypeScript's type inference capabilities.
 * All functions operate on `readonly` arrays and return new `readonly` arrays,
 * ensuring immutability.
 */
export const Arr = {
  length: size,
  size,

  // validation
  isEmpty,
  isNonEmpty,
  isArrayOfLength,
  isArrayAtLeastLength,
  indexIsInRange,

  // array creation
  zeros,
  seq,
  newArray,
  copy,
  range,

  // element access
  at,
  head,
  last,

  // slicing
  sliceClamped,
  tail,
  butLast,
  take,
  takeLast,
  skip,
  skipLast,

  // modification (returns new array)
  toUpdated,
  toInserted,
  toRemoved,
  toPushed,
  toUnshifted,
  toFilled,

  // searching
  find,
  findIndex,
  indexOf,
  lastIndexOf,

  // reducing value
  foldl,
  foldr,
  min,
  max,
  minBy,
  maxBy,
  count,
  countBy,
  sum,
  join,

  // transformation
  zip,
  filterNot,
  concat,
  partition,
  toSortedBy,
  scan,
  groupBy,
  uniq,
  uniqBy,

  // set operations & equality
  eq,
  isSubset,
  isSuperset,
  setIntersection,
  setDifference,
  sortedNumSetDifference,

  // aliases

  /**
   * Alias for `head`. Returns the first element of an array.
   * @see {@link head}
   */
  first: head,

  /**
   * Alias for `tail`. Returns all elements of an array except the first one.
   * @see {@link tail}
   */
  rest: tail,

  /**
   * Alias for `skip`. Skips the first N elements of an array.
   * @see {@link skip}
   */
  drop: skip,

  /**
   * Alias for `foldl`. Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
   * @see {@link foldl}
   */
  reduce: foldl,

  /**
   * Alias for `foldr`. Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
   * @see {@link foldr}
   */
  reduceRight: foldr,

  /**
   * Alias for `partition`. Splits an array into chunks of a specified size.
   * @see {@link partition}
   */
  chunk: partition,
} as const;
