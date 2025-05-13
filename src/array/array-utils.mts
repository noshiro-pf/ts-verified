import { IMap } from '../collections/index.mjs';
import { expectType } from '../expect-type.mjs';
import { range as rangeIterator } from '../iterator/index.mjs';
import { Num } from '../num/num.mjs';
import { tp } from '../others/index.mjs';

/**
 * Checks if an array is empty.
 * @template A The type of elements in the array.
 * @param list The array to check.
 * @returns `true` if the array is empty, `false` otherwise.
 */
const isEmpty = <A,>(list: readonly A[]): list is readonly [] =>
  list.length === 0;

/**
 * Checks if an array is non-empty.
 * @template A The type of elements in the array.
 * @param list The array to check.
 * @returns `true` if the array is non-empty, `false` otherwise.
 */
const isNonEmpty = <A,>(list: readonly A[]): list is NonEmptyArray<A> =>
  list.length > 0;

/**
 * Checks if an array has a length of 1.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 1, `false` otherwise.
 */
const isArrayOfLength1 = <A,>(
  array: readonly A[],
): array is ArrayOfLength<1, A> => array.length === 1;

/**
 * Checks if an array has a length of 2.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 2, `false` otherwise.
 */
const isArrayOfLength2 = <A,>(
  array: readonly A[],
): array is ArrayOfLength<2, A> => array.length === 2;

/**
 * Checks if an array has a length of 3.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 3, `false` otherwise.
 */
const isArrayOfLength3 = <A,>(
  array: readonly A[],
): array is ArrayOfLength<3, A> => array.length === 3;

/**
 * Checks if an array has a length of 4.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 4, `false` otherwise.
 */
const isArrayOfLength4 = <A,>(
  array: readonly A[],
): array is ArrayOfLength<4, A> => array.length === 4;

/**
 * Checks if an array has a length of 5.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 5, `false` otherwise.
 */
const isArrayOfLength5 = <A,>(
  array: readonly A[],
): array is ArrayOfLength<5, A> => array.length === 5;

/**
 * Checks if an array has a length of 6.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 6, `false` otherwise.
 */
const isArrayOfLength6 = <A,>(
  array: readonly A[],
): array is ArrayOfLength<6, A> => array.length === 6;

/**
 * Checks if an array has a length of 1 or more.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 1 or more, `false` otherwise.
 */
const isArrayOfLength1OrMore = <A,>(
  array: readonly A[],
): array is ArrayAtLeastLen<1, A> => array.length >= 1;

/**
 * Checks if an array has a length of 2 or more.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 2 or more, `false` otherwise.
 */
const isArrayOfLength2OrMore = <A,>(
  array: readonly A[],
): array is ArrayAtLeastLen<2, A> => array.length >= 2;

/**
 * Checks if an array has a length of 3 or more.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 3 or more, `false` otherwise.
 */
const isArrayOfLength3OrMore = <A,>(
  array: readonly A[],
): array is ArrayAtLeastLen<3, A> => array.length >= 3;

/**
 * Checks if an array has a length of 4 or more.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 4 or more, `false` otherwise.
 */
const isArrayOfLength4OrMore = <A,>(
  array: readonly A[],
): array is ArrayAtLeastLen<4, A> => array.length >= 4;

/**
 * Checks if an array has a length of 5 or more.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 5 or more, `false` otherwise.
 */
const isArrayOfLength5OrMore = <A,>(
  array: readonly A[],
): array is ArrayAtLeastLen<5, A> => array.length >= 5;

/**
 * Checks if an array has a length of 6 or more.
 * @template A The type of elements in the array.
 * @param array The array to check.
 * @returns `true` if the array has a length of 6 or more, `false` otherwise.
 */
const isArrayOfLength6OrMore = <A,>(
  array: readonly A[],
): array is ArrayAtLeastLen<6, A> => array.length >= 6;

/**
 * Creates an array of zeros with the specified length.
 * @template N The type of the length, constrained to SmallUint.
 * @param len The length of the array.
 * @returns An array of zeros with the specified length.
 */
function zeros<N extends SmallUint>(len: N): ArrayOfLength<N, 0>;
/**
 * Creates a non-empty array of zeros with the specified length.
 * @param len The length of the array, must be a PositiveInt.
 * @returns A non-empty array of zeros with the specified length.
 */
function zeros(len: PositiveInt): NonEmptyArray<0>;
/**
 * Creates an array of zeros with the specified length.
 * @param len The length of the array.
 * @returns An array of zeros with the specified length.
 */
function zeros(len: number): readonly 0[];
function zeros(len: number): readonly 0[] {
  return Array.from<0, 0>({ length: len }, () => 0);
}

/**
 * Creates a sequence of numbers from 0 to len-1.
 * @template N The type of the length, constrained to SmallUint.
 * @param len The length of the sequence.
 * @returns A sequence of numbers.
 */
function seq<N extends SmallUint>(len: N): Seq<N>;
/**
 * Creates a non-empty sequence of numbers from 0 to len-1.
 * @param len The length of the sequence, must be a PositiveInt.
 * @returns A non-empty sequence of numbers.
 */
function seq(len: PositiveInt): NonEmptyArray<number>;
/**
 * Creates a sequence of numbers from 0 to len-1.
 * @param len The length of the sequence.
 * @returns A sequence of numbers.
 */
function seq(len: number): readonly number[];
function seq(len: number): readonly number[] {
  return Array.from({ length: len }, (_, i) => i);
}

/**
 * Creates a new array of the specified length, filled with the initial value.
 * @template V The type of the initial value.
 * @template N The type of the length, constrained to SmallUint.
 * @param len The length of the array.
 * @param init The initial value.
 * @returns A new array.
 */
function newArray<V, N extends SmallUint>(len: N, init: V): ArrayOfLength<N, V>;
/**
 * Creates a new non-empty array of the specified length, filled with the initial value.
 * @template V The type of the initial value.
 * @param len The length of the array, must be a PositiveInt.
 * @param init The initial value.
 * @returns A new non-empty array.
 */
function newArray<V>(len: PositiveInt, init: V): NonEmptyArray<V>;
/**
 * Creates a new array of the specified length, filled with the initial value.
 * @template V The type of the initial value.
 * @param len The length of the array.
 * @param init The initial value.
 * @returns A new array.
 */
function newArray<V>(len: number, init: V): readonly V[];
function newArray<V>(len: number, init: V): readonly V[] {
  return Array.from({ length: len }, () => init);
}

type LEQ = {
  readonly [N in SmallUint]: Index<N>;
};

/**
 * @internal
 * This type is used to avoid incorrect type calculation results for unions with `Seq`.
 */
type RangeList<S extends SmallUint, E extends SmallUint> =
  BoolOr<IsUnion<S>, IsUnion<E>> extends true
    ? readonly RelaxedExclude<LEQ[E], LEQ[Min<S>]>[] // Avoid incorrect type calculation for unions with Seq
    : List.Skip<S, Seq<E>>;

if (import.meta.vitest !== undefined) {
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

  test('dummy', () => {
    expect(0).toBe(0);
  });
}

/**
 * Creates an array of numbers within a specified range.
 * @template S The type of the start value, constrained to SmallUint.
 * @template E The type of the end value, constrained to SmallUint.
 * @param start The start of the range (inclusive).
 * @param end The end of the range (exclusive).
 * @param step The step value (default is 1).
 * @returns An array of numbers in the specified range.
 */
function range<S extends SmallUint, E extends SmallUint>(
  start: S,
  end: E,
  step?: 1,
): RangeList<S, E>;
/**
 * Creates an array of numbers within a specified range.
 * @param start The start of the range (inclusive).
 * @param end The end of the range (exclusive).
 * @param step The step value.
 * @returns An array of numbers in the specified range.
 */
function range(start: number, end: number, step?: number): readonly number[];
/**
 * Creates an array of numbers within a specified range.
 * @param start The start of the range (inclusive).
 * @param end The end of the range (exclusive).
 * @param step The step value (default is 1).
 * @returns An array of numbers in the specified range.
 */
function range(
  start: number,
  end: number,
  step: number = 1,
): readonly number[] {
  return Array.from(rangeIterator(start, end, step));
}

/**
 * Creates a shallow copy of an array.
 * @template T The type of the array.
 * @param list The array to copy.
 * @returns A new array that is a shallow copy of the input array.
 */
const copy = <T extends readonly unknown[]>(list: T): T =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.slice() as unknown as T;

/**
 * Slices an array with clamped start and end indices.
 * Ensures that start and end indices are within the bounds of the array.
 * @template T The type of elements in the array.
 * @param list The array to slice.
 * @param start The start index for the slice.
 * @param end The end index for the slice.
 * @returns A new array containing the sliced elements.
 */
const sliceClamped = <T,>(
  list: readonly T[],
  start: number,
  end: number,
): readonly T[] => {
  const startClamped = Num.clamp(0, list.length)(start);

  const endClamped = Num.clamp(startClamped, list.length)(end);

  return list.slice(startClamped, endClamped);
};

/**
 * Returns the first element of an array.
 * @param list The input array.
 * @returns The first element of the array, or `undefined` if the array is empty.
 */
function head(list: readonly []): undefined;
/**
 * Returns the first element of a non-empty array.
 * @template H The type of the head element.
 * @template L The type of the rest of the elements.
 * @param list The input non-empty array.
 * @returns The first element of the array.
 */
function head<H, L extends readonly unknown[]>(list: readonly [H, ...L]): H;
/**
 * Returns the first element of a non-empty array.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @returns The first element of the array.
 */
function head<A>(list: NonEmptyArray<A>): A;
/**
 * Returns the first element of an array.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @returns The first element of the array, or `undefined` if the array is empty.
 */
function head<A>(list: readonly A[]): A | undefined;
function head<A>(list: readonly A[]): A | undefined {
  return list.at(0);
}

/**
 * Alias for `head`. Returns the first element of an array.
 * @param list The input array.
 * @returns The first element of the array, or `undefined` if the array is empty.
 */
const first = head;

/**
 * Returns the last element of an array.
 * @param list The input array.
 * @returns The last element of the array, or `undefined` if the array is empty.
 */
function last(list: readonly []): undefined;
/**
 * Returns the last element of a non-empty array.
 * @template H The type of the initial elements.
 * @template L The type of the last element.
 * @param list The input non-empty array.
 * @returns The last element of the array.
 */
function last<H extends readonly unknown[], L>(list: readonly [...H, L]): L;
/**
 * Returns the last element of a non-empty array.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @returns The last element of the array.
 */
function last<A>(list: NonEmptyArray<A>): A;
/**
 * Returns the last element of an array.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @returns The last element of the array, or `undefined` if the array is empty.
 */
function last<A>(list: readonly A[]): A | undefined;
function last<A>(list: readonly A[]): A | undefined {
  return list.at(-1);
}

/**
 * Returns all elements of an array except the first one.
 * @template T The type of the array.
 * @param list The input array.
 * @returns A new array containing all elements except the first.
 */
const tail = <T extends readonly unknown[]>(list: T): List.Tail<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.slice(1) as unknown as List.Tail<T>;

/**
 * Alias for `tail`. Returns all elements of an array except the first one.
 * @template T The type of the array.
 * @param list The input array.
 * @returns A new array containing all elements except the first.
 */
const rest = tail;
/**
 * Alias for `tail`. Returns all elements of an array except the first one.
 * @template T The type of the array.
 * @param list The input array.
 * @returns A new array containing all elements except the first.
 */
const shift = tail;

/**
 * Returns all elements of an array except the last one.
 * @template T The type of the array.
 * @param list The input array.
 * @returns A new array containing all elements except the last.
 */
const butLast = <T extends readonly unknown[]>(list: T): List.ButLast<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  (isEmpty(list) ? [] : list.slice(0, -1)) as unknown as List.ButLast<T>;

/**
 * Takes the first N elements from an array.
 * @template T The type of the array.
 * @template N The number of elements to take, constrained to SmallUint.
 * @param list The input array.
 * @param num The number of elements to take.
 * @returns A new array containing the first N elements.
 */
function take<T extends readonly unknown[], N extends SmallUint>(
  list: T,
  num: N,
): List.Take<N, T>;
/**
 * Takes the first N elements from a non-empty array.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param num The number of elements to take, must be a PositiveInt.
 * @returns A new non-empty array containing the first N elements.
 */
function take<A>(list: NonEmptyArray<A>, num: PositiveInt): NonEmptyArray<A>;
/**
 * Takes the first N elements from an array.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param num The number of elements to take.
 * @returns A new array containing the first N elements.
 */
function take<A>(list: readonly A[], num: number): readonly A[];
function take<A>(list: readonly A[], num: number): readonly A[] {
  return sliceClamped(list, 0, num);
}

/**
 * Takes the last N elements from an array.
 * @template T The type of the array.
 * @template N The number of elements to take, constrained to SmallUint.
 * @param list The input array.
 * @param num The number of elements to take.
 * @returns A new array containing the last N elements.
 */
function takeLast<T extends readonly unknown[], N extends SmallUint>(
  list: T,
  num: N,
): List.TakeLast<N, T>;
/**
 * Takes the last N elements from a non-empty array.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param num The number of elements to take, must be a PositiveInt.
 * @returns A new non-empty array containing the last N elements.
 */
function takeLast<A>(
  list: NonEmptyArray<A>,
  num: PositiveInt,
): NonEmptyArray<A>;
/**
 * Takes the last N elements from an array.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param num The number of elements to take.
 * @returns A new array containing the last N elements.
 */
function takeLast<A>(list: readonly A[], num: number): readonly A[];
function takeLast<A>(list: readonly A[], num: number): readonly A[] {
  return sliceClamped(list, list.length - num, list.length);
}

/**
 * Skips the first N elements of an array.
 * @template T The type of the array.
 * @template N The number of elements to skip, constrained to SmallUint.
 * @param list The input array.
 * @param num The number of elements to skip.
 * @returns A new array containing the elements after skipping the first N.
 */
function skip<T extends readonly unknown[], N extends SmallUint>(
  list: T,
  num: N,
): List.Skip<N, T>;
/**
 * Skips the first N elements of a non-empty array.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param num The number of elements to skip, must be a PositiveInt.
 * @returns A new non-empty array containing the elements after skipping the first N.
 */
function skip<A>(list: NonEmptyArray<A>, num: PositiveInt): NonEmptyArray<A>;
/**
 * Skips the first N elements of an array.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param num The number of elements to skip.
 * @returns A new array containing the elements after skipping the first N.
 */
function skip<A>(list: readonly A[], num: number): readonly A[];
function skip<A>(list: readonly A[], num: number): readonly A[] {
  return sliceClamped(list, num, list.length);
}

/**
 * Skips the last N elements of an array.
 * @template T The type of the array.
 * @template N The number of elements to skip, constrained to SmallUint.
 * @param list The input array.
 * @param num The number of elements to skip from the end.
 * @returns A new array containing the elements after skipping the last N.
 */
function skipLast<T extends readonly unknown[], N extends SmallUint>(
  list: T,
  num: N,
): List.SkipLast<N, T>;
/**
 * Skips the last N elements of a non-empty array.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param num The number of elements to skip from the end, must be a PositiveInt.
 * @returns A new non-empty array containing the elements after skipping the last N.
 */
function skipLast<A>(
  list: NonEmptyArray<A>,
  num: PositiveInt,
): NonEmptyArray<A>;
/**
 * Skips the last N elements of an array.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param num The number of elements to skip from the end.
 * @returns A new array containing the elements after skipping the last N.
 */
function skipLast<A>(list: readonly A[], num: number): readonly A[];
function skipLast<A>(list: readonly A[], num: number): readonly A[] {
  return sliceClamped(list, 0, list.length - num);
}

/**
 * Alias for `butLast`. Returns all elements of an array except the last one.
 * @template T The type of the array.
 * @param list The input array.
 * @returns A new array containing all elements except the last.
 */
const pop = butLast;

/**
 * Maps each element of an array to a new array and flattens the result.
 * @template A The type of elements in the input array.
 * @template M The type of elements in the output array.
 * @param list The input array.
 * @param mapper A function that maps an element and its index to a new array.
 * @returns A new array with the results of the mapping and flattening.
 */
const flatMap = <A, M>(
  list: readonly A[],
  mapper: (value: A, key: number) => readonly M[],
): readonly M[] => list.flatMap(mapper);

// TODO: add an overload of NonEmpty case
/**
 * Zips two arrays together, creating an array of pairs.
 * The resulting array will have the length of the shorter input array.
 * @template T1 The type of the first array.
 * @template T2 The type of the second array.
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array of pairs.
 */
const zip = <T1 extends readonly unknown[], T2 extends readonly unknown[]>(
  list1: T1,
  list2: T2,
): List.Zip<T1, T2> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  seq(Math.min(list1.length, list2.length)).map((i) =>
    tp(list1[i], list2[i]),
  ) as unknown as List.Zip<T1, T2>;

/**
 * Filters an array by excluding elements for which the predicate returns true.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param predicate A function that returns `true` for elements to be excluded.
 * @returns A new array with elements for which the predicate returned `false`.
 */
const filterNot = <A,>(
  list: readonly A[],
  predicate: (a: A, index: number) => boolean,
): readonly A[] => list.filter((a, i) => !predicate(a, i));

/**
 * Returns a new array with the element at the specified index replaced by a new value.
 * @template A The type of elements in the original array.
 * @template U The type of the new value.
 * @param list The input array.
 * @param index The index of the element to replace.
 * @param newValue The new value.
 * @returns A new array with the element at the specified index replaced.
 */
const set = <A, U>(
  list: readonly A[],
  index: number,
  newValue: U,
): readonly (A | U)[] => (list as readonly (A | U)[]).with(index, newValue);

/**
 * Returns a new array with the element at the specified index updated by a function.
 * @template A The type of elements in the original array.
 * @template U The type of the updated value.
 * @param list The input array.
 * @param index The index of the element to update.
 * @param updater A function that takes the previous value and returns the updated value.
 * @returns A new array with the element at the specified index updated.
 */
const update = <A, U>(
  list: readonly A[],
  index: number,
  updater: (prev: A) => U,
): readonly (A | U)[] =>
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  (list as readonly (A | U)[]).with(index, updater(list[index]!));

/**
 * Returns a new array with a new value inserted at the specified index.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param index The index at which to insert the new value.
 * @param newValue The value to insert.
 * @returns A new array with the value inserted.
 */
const inserted = <A,>(
  list: readonly A[],
  index: number,
  newValue: A,
): readonly A[] => list.toSpliced(index, 0, newValue);

/**
 * Returns a new array with the element at the specified index removed.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param index The index of the element to remove.
 * @returns A new array with the element removed.
 */
const removed = <A,>(list: readonly A[], index: number): readonly A[] =>
  list.toSpliced(index, 1);

/**
 * Returns a new array with a value added to the end.
 * @template T The type of the input array.
 * @template V The type of the value to add.
 * @param list The input array.
 * @param value The value to add.
 * @returns A new array with the value added to the end.
 */
const pushed = <T extends readonly unknown[], V = T>(
  list: T,
  value: V,
): readonly [...T, V] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.toSpliced(list.length, 0, value) as unknown as readonly [...T, V];

/**
 * Returns a new array with a value added to the beginning.
 * @template T The type of the input array.
 * @template V The type of the value to add.
 * @param list The input array.
 * @param value The value to add.
 * @returns A new array with the value added to the beginning.
 */
const unshifted = <T extends readonly unknown[], V = T>(
  list: T,
  value: V,
): readonly [V, ...T] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list.toSpliced(0, 0, value) as unknown as readonly [V, ...T];

/**
 * Concatenates two arrays.
 * @template T1 The type of the first array.
 * @template T2 The type of the second array.
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array that is the concatenation of the two input arrays.
 */
const concat = <T1 extends readonly unknown[], T2 extends readonly unknown[]>(
  list1: T1,
  list2: T2,
): readonly [...T1, ...T2] => [...list1, ...list2];

/**
 * Partitions an array into sub-arrays of a specified size.
 * @template N The size of each partition (must be a number type).
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param n The size of each partition.
 * @returns An array of arrays, where each inner array has length N.
 */
const partition = <N extends number, A>(
  list: readonly A[],
  n: N,
): readonly ArrayOfLength<N, A>[] =>
  seq(list.length / n).map(
    (i) =>
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      list.slice(n * i, n * (i + 1)) as ArrayOfLength<N, A>,
  );

/**
 * Sorts an array by a value derived from its elements.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a number for comparison.
 * @param comparator An optional custom comparator function for the mapped numbers.
 * @returns A new array sorted by the mapped values.
 */
function sortedBy<A>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => number,
  comparator?: (x: number, y: number) => number,
): readonly A[];
/**
 * Sorts an array by a value derived from its elements.
 * @template A The type of elements in the array.
 * @template B The type of the value to compare by.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a value of type B for comparison.
 * @param comparator A custom comparator function for values of type B.
 * @returns A new array sorted by the mapped values.
 */
function sortedBy<A, B>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => B,
  comparator: (x: B, y: B) => number,
): readonly A[];
function sortedBy<A, B>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => B,
  comparator?: (x: B, y: B) => number,
): readonly A[] {
  return list.toSorted((x, y) =>
    comparator === undefined
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (comparatorValueMapper(x) as number) -
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (comparatorValueMapper(y) as number)
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

/**
 * Finds the minimum value in a non-empty array of numbers.
 * @template N The type of numbers in the array.
 * @param list The input non-empty array of numbers.
 * @param comparator An optional custom comparator function.
 * @returns The minimum value in the array.
 */
function min<N extends number>(
  list: NonEmptyArray<N>,
  comparator?: (x: N, y: N) => number,
): N;
/**
 * Finds the minimum value in an array of numbers.
 * @template N The type of numbers in the array.
 * @param list The input array of numbers.
 * @param comparator An optional custom comparator function.
 * @returns The minimum value in the array, or `undefined` if the array is empty.
 */
function min<N extends number>(
  list: readonly N[],
  comparator?: (x: N, y: N) => number,
): N | undefined;
/**
 * Finds the minimum value in a non-empty array using a custom comparator.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param comparator A custom comparator function.
 * @returns The minimum value in the array.
 */
function min<A>(list: NonEmptyArray<A>, comparator: (x: A, y: A) => number): A;
/**
 * Finds the minimum value in an array using a custom comparator.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param comparator A custom comparator function.
 * @returns The minimum value in the array, or `undefined` if the array is empty.
 */
function min<A>(
  list: readonly A[],
  comparator: (x: A, y: A) => number,
): A | undefined;
function min<A>(
  list: readonly A[],
  comparator?: (x: A, y: A) => number,
): A | undefined {
  const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));

  return isNonEmpty(list)
    ? list.reduce((mx, curr) => (cmp(mx, curr) < 0 ? mx : curr), list[0])
    : undefined;
}

/**
 * Finds the maximum value in a non-empty array of numbers.
 * @template N The type of numbers in the array.
 * @param list The input non-empty array of numbers.
 * @param comparator An optional custom comparator function.
 * @returns The maximum value in the array.
 */
function max<N extends number>(
  list: NonEmptyArray<N>,
  comparator?: (x: N, y: N) => number,
): N;
/**
 * Finds the maximum value in an array of numbers.
 * @template N The type of numbers in the array.
 * @param list The input array of numbers.
 * @param comparator An optional custom comparator function.
 * @returns The maximum value in the array, or `undefined` if the array is empty.
 */
function max<N extends number>(
  list: readonly N[],
  comparator?: (x: N, y: N) => number,
): N | undefined;
/**
 * Finds the maximum value in a non-empty array using a custom comparator.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param comparator A custom comparator function.
 * @returns The maximum value in the array.
 */
function max<A>(list: NonEmptyArray<A>, comparator: (x: A, y: A) => number): A;
/**
 * Finds the maximum value in an array using a custom comparator.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param comparator A custom comparator function.
 * @returns The maximum value in the array, or `undefined` if the array is empty.
 */
function max<A>(
  list: readonly A[],
  comparator: (x: A, y: A) => number,
): A | undefined;
function max<A>(
  list: readonly A[],
  comparator?: (x: A, y: A) => number,
): A | undefined {
  const cmp = comparator ?? ((x, y) => Num.from(x) - Num.from(y));

  return min(list, (x, y) => -cmp(x, y));
}

/**
 * Finds the element with the minimum value according to a mapped numeric value.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param comparatorValueMapper A function that maps an element to a number for comparison.
 * @param comparator An optional custom comparator function for the mapped numbers.
 * @returns The element with the minimum mapped value.
 */
function minBy<A>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => number,
  comparator?: (x: number, y: number) => number,
): A;
/**
 * Finds the element with the minimum value according to a mapped numeric value.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a number for comparison.
 * @param comparator An optional custom comparator function for the mapped numbers.
 * @returns The element with the minimum mapped value, or `undefined` if the array is empty.
 */
function minBy<A>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => number,
  comparator?: (x: number, y: number) => number,
): A | undefined;
/**
 * Finds the element with the minimum value according to a mapped value and a custom comparator.
 * @template A The type of elements in the array.
 * @template B The type of the value to compare by.
 * @param list The input non-empty array.
 * @param comparatorValueMapper A function that maps an element to a value of type B for comparison.
 * @param comparator A custom comparator function for values of type B.
 * @returns The element with the minimum mapped value.
 */
function minBy<A, B>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => B,
  comparator: (x: B, y: B) => number,
): A;
/**
 * Finds the element with the minimum value according to a mapped value and a custom comparator.
 * @template A The type of elements in the array.
 * @template B The type of the value to compare by.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a value of type B for comparison.
 * @param comparator A custom comparator function for values of type B.
 * @returns The element with the minimum mapped value, or `undefined` if the array is empty.
 */
function minBy<A, B>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => B,
  comparator: (x: B, y: B) => number,
): A | undefined;
function minBy<A, B>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => B,
  comparator?: (x: B, y: B) => number,
): A | undefined {
  return min(list, (x, y) =>
    comparator === undefined
      ? Num.from(comparatorValueMapper(x)) - Num.from(comparatorValueMapper(y))
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

/**
 * Finds the element with the maximum value according to a mapped numeric value.
 * @template A The type of elements in the array.
 * @param list The input non-empty array.
 * @param comparatorValueMapper A function that maps an element to a number for comparison.
 * @param comparator An optional custom comparator function for the mapped numbers.
 * @returns The element with the maximum mapped value.
 */
function maxBy<A>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => number,
  comparator?: (x: number, y: number) => number,
): A;
/**
 * Finds the element with the maximum value according to a mapped numeric value.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a number for comparison.
 * @param comparator An optional custom comparator function for the mapped numbers.
 * @returns The element with the maximum mapped value, or `undefined` if the array is empty.
 */
function maxBy<A>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => number,
  comparator?: (x: number, y: number) => number,
): A | undefined;
/**
 * Finds the element with the maximum value according to a mapped value and a custom comparator.
 * @template A The type of elements in the array.
 * @template B The type of the value to compare by.
 * @param list The input non-empty array.
 * @param comparatorValueMapper A function that maps an element to a value of type B for comparison.
 * @param comparator A custom comparator function for values of type B.
 * @returns The element with the maximum mapped value.
 */
function maxBy<A, B>(
  list: NonEmptyArray<A>,
  comparatorValueMapper: (value: A) => B,
  comparator: (x: B, y: B) => number,
): A;
/**
 * Finds the element with the maximum value according to a mapped value and a custom comparator.
 * @template A The type of elements in the array.
 * @template B The type of the value to compare by.
 * @param list The input array.
 * @param comparatorValueMapper A function that maps an element to a value of type B for comparison.
 * @param comparator A custom comparator function for values of type B.
 * @returns The element with the maximum mapped value, or `undefined` if the array is empty.
 */
function maxBy<A, B>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => B,
  comparator: (x: B, y: B) => number,
): A | undefined;
function maxBy<A, B>(
  list: readonly A[],
  comparatorValueMapper: (value: A) => B,
  comparator?: (x: B, y: B) => number,
): A | undefined {
  return max(list, (x, y) =>
    comparator === undefined
      ? Num.from(comparatorValueMapper(x)) - Num.from(comparatorValueMapper(y))
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

/**
 * Calculates the sum of numbers in an array.
 * @param list The input array of numbers.
 * @returns The sum of the numbers.
 */
const sum = (list: readonly number[]): number =>
  list.reduce((prev, curr) => prev + curr, 0);

/**
 * Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
 * @template A The type of elements in the array.
 * @template S The type of the accumulated value.
 * @param list The input array.
 * @param callbackfn A function to execute on each element in the array.
 * @param initialValue The initial value of the accumulator.
 * @returns The single value that results from the reduction.
 */
const foldl = <A, S>(
  list: readonly A[],
  callbackfn: (previousValue: S, currentValue: A, currentIndex: number) => S,
  initialValue: S,
): S => list.reduce(callbackfn, initialValue);

/**
 * Alias for `foldl`. Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
 * @template A The type of elements in the array.
 * @template S The type of the accumulated value.
 * @param list The input array.
 * @param callbackfn A function to execute on each element in the array.
 * @param initialValue The initial value of the accumulator.
 * @returns The single value that results from the reduction.
 */
const reduce = foldl;

/**
 * Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
 * @template A The type of elements in the array.
 * @template S The type of the accumulated value.
 * @param list The input array.
 * @param callbackfn A function to execute on each element in the array.
 * @param initialValue The initial value of the accumulator.
 * @returns The single value that results from the reduction.
 */
const foldr = <A, S>(
  list: readonly A[],
  callbackfn: (previousValue: S, currentValue: A, currentIndex: number) => S,
  initialValue: S,
): S => list.reduceRight(callbackfn, initialValue);

/**
 * Alias for `foldr`. Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
 * @template A The type of elements in the array.
 * @template S The type of the accumulated value.
 * @param list The input array.
 * @param callbackfn A function to execute on each element in the array.
 * @param initialValue The initial value of the accumulator.
 * @returns The single value that results from the reduction.
 */
const reduceRight = foldr;

/**
 * Returns an array of successively reduced values from an array.
 * The first element of the result is the initial value.
 * @template A The type of elements in the input array.
 * @template B The type of the accumulated values.
 * @param list The input array.
 * @param reducer A function that reduces the current value and the accumulated value to a new accumulated value.
 * @param init The initial accumulated value.
 * @returns A non-empty array of accumulated values.
 */
const scan = <A, B>(
  list: NonEmptyArray<A> | readonly A[],
  reducer: Reducer<B, A>,
  init: B,
): NonEmptyArray<B> => {
  const mut_result: B[] = Array.from({ length: list.length + 1 }, () => init);

  let mut_acc = init;

  for (const [index, value] of list.entries()) {
    mut_acc = reducer(mut_acc, value);
    mut_result[index + 1] = mut_acc;
  }

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return mut_result as MutableNonEmptyArray<B>;
};

/**
 * Counts the number of elements in an array that satisfy a predicate.
 * If no predicate is provided, counts all elements.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @param predicate A function to test each element for a condition.
 * @returns The number of elements that satisfy the predicate.
 */
const count = <A,>(
  list: readonly A[],
  predicate: (value: A, index: number) => boolean = () => true,
): number =>
  list.reduce<number>(
    (acc, curr, index) => (predicate(curr, index) ? acc + 1 : acc),
    0,
  );

/**
 * Groups elements of an array by a key derived from each element and counts the elements in each group.
 * @template A The type of elements in the array.
 * @template G The type of the group key (must be a primitive type).
 * @param list The input array.
 * @param grouper A function that maps an element and its index to a group key.
 * @returns An IMap where keys are group keys and values are the counts of elements in each group.
 */
const countBy = <A, G extends Primitive>(
  list: readonly A[],
  grouper: (value: A, index: number) => G,
): IMap<G, number> => {
  const mut_groups = new Map<G, number>();

  for (const [index, e] of list.entries()) {
    const key = grouper(e, index);
    const curr = mut_groups.get(key) ?? 0;

    mut_groups.set(key, curr + 1);
  }

  return IMap.new(mut_groups);
};

/**
 * Groups elements of an array by a key derived from each element.
 * @template A The type of elements in the array.
 * @template G The type of the group key (must be a primitive type).
 * @param list The input array.
 * @param grouper A function that maps an element and its index to a group key.
 * @returns An IMap where keys are group keys and values are arrays of elements belonging to that group.
 */
const groupBy = <A, G extends Primitive>(
  list: readonly A[],
  grouper: (value: A, index: number) => G,
): IMap<G, readonly A[]> => {
  const mut_groups = new Map<G, A[]>();

  for (const [index, e] of list.entries()) {
    const key = grouper(e, index);

    if (mut_groups.has(key)) {
      const mut_g = mut_groups.get(key);

      mut_g?.push(e);
    } else {
      mut_groups.set(key, [e]);
    }
  }

  return IMap.new<G, readonly A[]>(mut_groups);
};

/**
 * Creates a new array with unique elements from the input list.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @returns A new array with unique elements from the input list.
 */
function uniq<A>(list: NonEmptyArray<A>): NonEmptyArray<A>;
/**
 * Creates a new array with unique elements from the input list.
 * @template A The type of elements in the array.
 * @param list The input array.
 * @returns A new array with unique elements from the input list.
 */
function uniq<A>(list: readonly A[]): readonly A[];
function uniq<A>(list: readonly A[]): readonly A[] {
  return Array.from(new Set(list));
}

/**
 * Creates a new array with unique elements from the input list, based on the values returned by `mapFn`.
 * @template A The type of elements in the array.
 * @template B The type of the mapped value.
 * @param list The input array.
 * @param mapFn A function to map elements to values for uniqueness comparison.
 * @returns A new array with unique elements.
 */
function uniqBy<A, B>(
  list: NonEmptyArray<A>,
  mapFn: (value: A) => B,
): NonEmptyArray<A>;
function uniqBy<A, B>(list: readonly A[], mapFn: (value: A) => B): readonly A[];
function uniqBy<A, B>(
  list: readonly A[],
  mapFn: (value: A) => B,
): readonly A[] {
  const mut_mappedValues = new Set<B>();

  return list.filter((val) => {
    const mappedValue = mapFn(val);

    if (mut_mappedValues.has(mappedValue)) return false;
    mut_mappedValues.add(mappedValue);

    return true;
  });
}

/**
 * Checks if an index is within the valid range of an array.
 * @template T The type of elements in the array.
 * @param list The input array.
 * @param index The index to check.
 * @returns `true` if the index is within the array bounds, `false` otherwise.
 */
const indexIsInRange = <T,>(list: readonly T[], index: number): boolean =>
  Num.isInRange(0, list.length)(index);

/**
 * Checks if two arrays are equal (shallow comparison of elements).
 * @template T The type of elements in the arrays.
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns `true` if the arrays have the same length and all corresponding elements are strictly equal, `false` otherwise.
 */
const eq = <T,>(list1: readonly T[], list2: readonly T[]): boolean =>
  list1.length === list2.length && list1.every((v, i) => v === list2[i]);

/**
 * Checks if the first array is a subset of the second array.
 * Elements must be primitive types.
 * @template A The type of elements in the first array (subset candidate).
 * @template B The type of elements in the second array (superset candidate).
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns `true` if `list1` is a subset of `list2`, `false` otherwise.
 * @remarks `list1` ⊂ `list2`
 */
const isSubset = <A extends Primitive, B extends Primitive = A>(
  list1: readonly A[],
  list2: readonly B[],
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
): boolean => list1.every((a) => list2.includes(a as A & B));

/**
 * Checks if the first array is a superset of the second array.
 * Elements must be primitive types.
 * @template A The type of elements in the first array (superset candidate).
 * @template B The type of elements in the second array (subset candidate).
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns `true` if `list1` is a superset of `list2`, `false` otherwise.
 * @remarks `list1` ⊃ `list2`
 */
const isSuperset = <A extends Primitive, B extends Primitive = A>(
  list1: readonly A[],
  list2: readonly B[],
): boolean => isSubset(list2, list1);

/**
 * Returns the intersection of two arrays of primitive types.
 * @template A The type of elements in the first array.
 * @template B The type of elements in the second array.
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array containing elements present in both input arrays.
 */
const setIntersection = <A extends Primitive, B extends Primitive = A>(
  list1: readonly A[],
  list2: readonly B[],
): readonly (A & B)[] =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  list1.filter((e) => list2.includes(e as A & B)) as (A & B)[];

/**
 * Returns the set difference of two arrays (elements in the first array but not in the second).
 * Elements must be primitive types.
 * @template A The type of elements in the arrays.
 * @param list1 The first array.
 * @param list2 The second array.
 * @returns A new array containing elements from `list1` that are not in `list2`.
 */
const setDifference = <A extends Primitive>(
  list1: readonly A[],
  list2: readonly A[],
): readonly A[] => list1.filter((e) => !list2.includes(e));

/**
 * Returns the set difference of two sorted arrays of numbers.
 * This operation is more efficient for sorted arrays.
 * @template T The type of numbers in the arrays.
 * @param sortedList1 The first sorted array of numbers.
 * @param sortedList2 The second sorted array of numbers.
 * @returns A new sorted array containing numbers from `sortedList1` that are not in `sortedList2`.
 */
const sortedNumSetDifference = <T extends number>(
  sortedList1: readonly T[],
  sortedList2: readonly T[],
): readonly T[] => {
  const mut_result: T[] = [];
  let mut_it1 = 0; // iterator for sortedArray1
  let mut_it2 = 0; // iterator for sortedArray2
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let mut_val1: T = sortedList1[mut_it1]!;
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
  let mut_val2: T = sortedList2[mut_it2]!;

  while (mut_it1 < sortedList1.length && mut_it2 < sortedList2.length) {
    if (mut_val1 === mut_val2) {
      mut_it1 += 1;
      mut_it2 += 1;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mut_val1 = sortedList1[mut_it1]!;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mut_val2 = sortedList2[mut_it2]!;
    } else if (mut_val1 < mut_val2) {
      mut_result.push(mut_val1);
      mut_it1 += 1;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mut_val1 = sortedList1[mut_it1]!;
    } else {
      mut_it2 += 1;
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      mut_val2 = sortedList2[mut_it2]!;
    }
  }
  for (; mut_it1 < sortedList1.length; mut_it1 += 1) {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    mut_result.push(sortedList1[mut_it1]!);
  }

  return mut_result;
};

/**
 * Splits an array into chunks of a specified size.
 * The last chunk may be smaller if the array length is not a multiple of the chunk size.
 * @template T The type of elements in the array.
 * @param array The input array.
 * @param chunkSize The size of each chunk.
 * @returns An array of arrays, where each inner array is a chunk.
 */
const chunk = <T,>(
  array: readonly T[],
  chunkSize: number,
): readonly (readonly T[])[] => {
  const mut_chunk: (readonly T[])[] = [];

  for (let mut_i = 0; mut_i < array.length; mut_i += chunkSize) {
    mut_chunk.push(array.slice(mut_i, mut_i + chunkSize));
  }

  return mut_chunk;
};

/**
 * A collection of utility functions for working with arrays.
 */
export const Arr = {
  isEmpty,
  isNonEmpty,
  isArrayOfLength1,
  isArrayOfLength2,
  isArrayOfLength3,
  isArrayOfLength4,
  isArrayOfLength5,
  isArrayOfLength6,
  isArrayOfLength1OrMore,
  isArrayOfLength2OrMore,
  isArrayOfLength3OrMore,
  isArrayOfLength4OrMore,
  isArrayOfLength5OrMore,
  isArrayOfLength6OrMore,
  range,
  copy,
  sliceClamped,
  first,
  tail,
  rest,
  shift,
  butLast,
  take,
  takeLast,
  skip,
  skipLast,
  pop,
  flatMap,
  zip,
  filterNot,
  set,
  update,
  inserted,
  removed,
  pushed,
  unshifted,
  concat,
  partition,
  zeros,
  seq,
  newArray,
  head,
  last,
  sortedBy,
  min,
  max,
  minBy,
  maxBy,
  sum,
  foldl,
  reduce,
  foldr,
  reduceRight,
  scan,
  count,
  countBy,
  groupBy,
  uniq,
  uniqBy,
  indexIsInRange,
  eq,
  isSubset,
  isSuperset,
  setIntersection,
  setDifference,
  sortedNumSetDifference,
  chunk,
} as const;
