/**
 * Returns the length of a tuple.
 * @template T The type of the tuple.
 * @param list The input tuple.
 * @returns The length of the tuple.
 */
function length<const T extends readonly unknown[]>(list: T): Length<T> {
  return list.length;
}

/**
 * Reverses a tuple.
 * @template T The type of the tuple.
 * @param tpl The input tuple.
 * @returns A new tuple with elements in reverse order.
 */
const reversed = <const T extends readonly unknown[]>(
  tpl: T,
): Tuple.Reverse<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-unsafe-return
  tpl.toReversed() as Tuple.Reverse<T>;

/**
 * Helper type to refine the result of array search methods.
 * If T is exactly `number`, it remains `number`. Otherwise, T is returned.
 * This is used to prevent overly specific number literal types when the search might not find an element.
 * @template T The type to map.
 */
type MapNumberToArraySearchResult<T> = T extends number
  ? TypeEq<T, number> extends true
    ? number // If T is the general number type, keep it as number
    : T // Otherwise (e.g., a number literal), keep the specific type
  : T;

/**
 * Refines the `IndexOfTuple` type using `MapNumberToArraySearchResult`.
 * This helps in providing a more accurate type for indices found in a tuple.
 * @template T The tuple type.
 */
type IndexOfTupleRefined<T extends readonly unknown[]> =
  MapNumberToArraySearchResult<IndexOfTuple<T>>;

/**
 * Finds the index of the first element in a tuple that satisfies the predicate.
 * @template T The type of the tuple.
 * @param tpl The input tuple.
 * @param predicate A function to test each element for a condition.
 * @returns The index of the first element that satisfies the predicate, or -1 if no such element is found.
 */
const findIndex = <const T extends readonly unknown[]>(
  tpl: T,
  predicate: (value: T[number], index: number) => boolean,
): IndexOfTupleRefined<T> | -1 =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  tpl.findIndex(predicate as (value: T[number], index: number) => boolean) as
    | IndexOfTupleRefined<T>
    | -1;

/**
 * Returns the first index at which a given element can be found in the tuple.
 * @template T The type of the tuple.
 * @param tpl The input tuple.
 * @param searchElement Element to locate in the tuple.
 * @param fromIndex The index to start the search at. If omitted, search starts from the beginning.
 * @returns The first index of the element in the tuple; -1 if not found.
 */
const indexOf = <const T extends readonly unknown[]>(
  tpl: T,
  searchElement: T[number],
  fromIndex?: IndexOfTupleRefined<T>,
): IndexOfTupleRefined<T> | -1 =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  tpl.indexOf(searchElement, fromIndex) as
    | MapNumberToArraySearchResult<IndexOfTuple<T>>
    | -1;

/**
 * Returns the last index at which a given element can be found in the tuple.
 * @template T The type of the tuple.
 * @param tpl The input tuple.
 * @param searchElement Element to locate in the tuple.
 * @param fromIndex The index to start searching backwards from. If omitted, search starts from the end.
 * @returns The last index of the element in the tuple; -1 if not found.
 */
const lastIndexOf = <const T extends readonly unknown[]>(
  tpl: T,
  searchElement: T[number],
  fromIndex?: IndexOfTupleRefined<T>,
): IndexOfTupleRefined<T> | -1 =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  tpl.lastIndexOf(searchElement, fromIndex) as IndexOfTupleRefined<T>;

/**
 * Creates a new tuple with the results of calling a provided function on every element in the calling tuple.
 * @template T The type of the input tuple.
 * @template B The type of the elements in the new tuple.
 * @param tpl The input tuple.
 * @param mapFn Function that produces an element of the new tuple.
 * @returns A new tuple with each element being the result of the callback function.
 */
const map = <const T extends readonly unknown[], const B>(
  tpl: T,
  mapFn: (a: T[number], index: number) => B,
): { readonly [K in keyof T]: B } =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  tpl.map(mapFn as (a: unknown, index: number) => B) as {
    readonly [K in keyof T]: B;
  };

/**
 * Returns a new tuple with the element at the specified index replaced by a new value.
 * @template T The type of the input tuple.
 * @template N The type of the new value.
 * @param tpl The input tuple.
 * @param index The index of the element to replace.
 * @param newValue The new value.
 * @returns A new tuple with the element at the specified index replaced.
 */
const set = <const T extends readonly unknown[], const N>(
  tpl: T,
  index: Index<Length<T>>,
  newValue: N,
): { readonly [K in keyof T]: N | T[K] } =>
  map(tpl, (a, i) => (i === index ? newValue : a)) as {
    readonly [K in keyof T]: N | T[K];
  };

// TODO: improve type
/**
 * Returns a new tuple with the element at the specified index updated by a function.
 * @template T The type of the input tuple.
 * @template N The type of the updated value.
 * @param tpl The input tuple.
 * @param index The index of the element to update.
 * @param updater A function that takes the previous value and returns the updated value.
 * @returns A new tuple with the element at the specified index updated.
 */
const update = <const T extends readonly unknown[], const N>(
  tpl: T,
  index: number | (Index<Length<T>> & SmallUint),
  updater: (prev: T[number]) => N,
): { readonly [K in keyof T]: N | T[K] } =>
  map(tpl, (a, i) => (i === index ? updater(a) : a)) as {
    readonly [K in keyof T]: N | T[K];
  };

/**
 * Sorts a tuple of numbers in ascending order.
 * @template T The type of the tuple, constrained to readonly numbers.
 * @param tpl The input tuple of numbers.
 * @returns A new tuple with elements sorted in ascending order.
 */
function sorted<const T extends readonly number[]>(
  tpl: T,
): { readonly [K in keyof T]: T[number] };
/**
 * Sorts a tuple using a custom comparator function.
 * @template T The type of the tuple.
 * @param tpl The input tuple.
 * @param comparator A function that defines the sort order.
 * @returns A new tuple with elements sorted according to the comparator.
 */
function sorted<const T extends readonly unknown[]>(
  tpl: T,
  // eslint-disable-next-line @typescript-eslint/unified-signatures
  comparator: (x: T[number], y: T[number]) => number,
): { readonly [K in keyof T]: T[number] };
function sorted<const T extends readonly unknown[]>(
  tpl: T,
  comparator?: (x: T[number], y: T[number]) => number,
): { readonly [K in keyof T]: T[number] } {
  const cmp = comparator ?? ((x, y) => Number(x) - Number(y));

  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return tpl.toSorted(cmp) as {
    readonly [K in keyof T]: T[number];
  };
}

/**
 * Sorts a tuple by a value derived from its elements.
 * The derived values are numbers, and an optional number comparator can be provided.
 * @template T The type of the tuple.
 * @param tpl The input tuple.
 * @param comparatorValueMapper A function that maps an element to a number for comparison.
 * @param comparator An optional custom comparator function for the mapped numbers.
 * @returns A new tuple sorted by the mapped values.
 */
function sortedBy<const T extends readonly unknown[]>(
  tpl: T,
  comparatorValueMapper: (value: T[number]) => number,
  comparator?: (x: number, y: number) => number,
): { readonly [K in keyof T]: T[number] };

function sortedBy<const T extends readonly unknown[], const B>(
  tpl: T,
  comparatorValueMapper: (value: T[number]) => B,
  comparator: (x: B, y: B) => number,
): { readonly [K in keyof T]: T[number] };
function sortedBy<const T extends readonly unknown[], const B>(
  tpl: T,
  comparatorValueMapper: (value: T[number]) => B,
  comparator?: (x: B, y: B) => number,
): { readonly [K in keyof T]: T[number] } {
  return sorted(tpl, (x, y) =>
    comparator === undefined
      ? // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (comparatorValueMapper(x) as number) -
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        (comparatorValueMapper(y) as number)
      : comparator(comparatorValueMapper(x), comparatorValueMapper(y)),
  );
}

export const Tpl = {
  length,
  reversed,
  findIndex,
  indexOf,
  lastIndexOf,
  map,
  set,
  update,
  sorted,
  sortedBy,
} as const;
