import { Result } from '../functional/index.mjs';
import { unknownToString } from '../others/unknown-to-string.mjs';

/**
 * Interface for an immutable set.
 * @template K The type of the elements in the set.
 */
type ISetInterface<K extends MapSetKeyType> = Readonly<{
  // Getting information

  /** The number of elements in the set. */
  size: number;

  /** Checks if the set is empty. */
  isEmpty: boolean;
  /**
   * Checks if an element exists in the set.
   * Allows for wider literal types for keys during checking.
   * @param key The element to check.
   * @returns `true` if the element exists, `false` otherwise.
   */
  has: (key: K | (WidenLiteral<K> & {})) => boolean;

  // Reducing a value

  /**
   * Checks if all elements in the set satisfy a predicate.
   * @param predicate A function to test each element.
   * @returns `true` if all elements satisfy the predicate, `false` otherwise.
   */
  every: ((predicate: (key: K) => boolean) => boolean) &
    /**
     * Checks if all elements in the set satisfy a type predicate.
     * Narrows the type of elements in the set if the predicate returns true for all elements.
     * @template L The narrowed type of the elements.
     * @param predicate A type predicate function.
     * @returns `true` if all elements satisfy the predicate, `false` otherwise.
     */
    (<L extends K>(predicate: (key: K) => key is L) => this is ISet<L>);

  /**
   * Checks if at least one element in the set satisfies a predicate.
   * @param predicate A function to test each element.
   * @returns `true` if at least one element satisfies the predicate, `false` otherwise.
   */
  some: (predicate: (key: K) => boolean) => boolean;

  // Mutation

  /**
   * Adds an element to the set.
   * @param key The element to add.
   * @returns A new ISet instance with the element added.
   */
  add: (key: K) => ISet<K>;

  /**
   * Deletes an element from the set.
   * @param key The element to delete.
   * @returns A new ISet instance without the specified element.
   */
  delete: (key: K) => ISet<K>;

  /**
   * Applies a series of mutations to the set.
   * @param actions An array of mutation actions (add or delete).
   * @returns A new ISet instance with all mutations applied.
   */
  withMutations: (
    actions: readonly Readonly<
      { type: 'add'; key: K } | { type: 'delete'; key: K }
    >[],
  ) => ISet<K>;

  // Sequence algorithms

  /**
   * Maps the elements of the set to new elements.
   * @template K2 The type of the new elements.
   * @param mapFn A function that maps an element to a new element.
   * @returns A new ISet instance with mapped elements.
   */
  map: <K2 extends MapSetKeyType>(mapFn: (key: K) => K2) => ISet<K2>;

  /**
   * Filters the elements of the set based on a type predicate.
   * Narrows the type of elements in the resulting set.
   * @template K2 The narrowed type of the elements.
   * @param predicate A type predicate function.
   * @returns A new ISet instance with elements that satisfy the type predicate.
   */
  filter: (<K2 extends K>(predicate: (key: K) => key is K2) => ISet<K2>) &
    /**
     * Filters the elements of the set based on a predicate.
     * @param predicate A function to test each element.
     * @returns A new ISet instance with elements that satisfy the predicate.
     */
    ((predicate: (key: K) => boolean) => ISet<K>);

  /**
   * Filters the elements of the set by excluding elements for which the predicate returns true.
   * @param predicate A function to test each element.
   * @returns A new ISet instance with elements for which the predicate returned `false`.
   */
  filterNot: (predicate: (key: K) => boolean) => ISet<K>;

  // Set operations
  /**
   * Checks if this set is a subset of another set.
   * @param set The other set.
   * @returns `true` if this set is a subset of the other set, `false` otherwise.
   */
  isSubsetOf: (set: ISet<WidenLiteral<K>>) => boolean;
  /**
   * Checks if this set is a superset of another set.
   * @param set The other set.
   * @returns `true` if this set is a superset of the other set, `false` otherwise.
   */
  isSupersetOf: (set: ISet<WidenLiteral<K>>) => boolean;
  /**
   * Returns a new set with elements that are in this set but not in another set.
   * @param set The other set.
   * @returns A new ISet instance representing the set difference.
   */
  subtract: (set: ISet<K>) => ISet<K>;
  /**
   * Returns a new set with elements that are common to both this set and another set.
   * @param set The other set.
   * @returns A new ISet instance representing the set intersection.
   */
  intersect: (set: ISet<K>) => ISet<K>;
  /**
   * Returns a new set with all elements from both this set and another set.
   * @template K2 The type of elements in the other set.
   * @param set The other set.
   * @returns A new ISet instance representing the set union.
   */
  union: <K2 extends MapSetKeyType>(set: ISet<K2>) => ISet<K | K2>;

  // Side effects
  /**
   * Executes a callback function for each element in the set.
   * @param callbackfn A function to execute for each element.
   */
  forEach: (callbackfn: (key: K) => void) => void;

  // Iterators
  /**
   * Returns an iterator for the elements in the set (alias for values).
   * @returns An iterable iterator of elements.
   */
  keys: () => IterableIterator<K>;
  /**
   * Returns an iterator for the elements in the set.
   * @returns An iterable iterator of elements.
   */
  values: () => IterableIterator<K>;
  /**
   * Returns an iterator for the entries (element-element pairs) in the set.
   * @returns An iterable iterator of entries.
   */
  entries: () => IterableIterator<readonly [K, K]>;

  // Conversion
  /**
   * Converts the elements of the set to an array.
   * @returns A readonly array of elements.
   */
  toArray: () => readonly K[];
  /**
   * Returns the underlying readonly JavaScript Set.
   * @returns The raw ReadonlySet instance.
   */
  toRawSet: () => ReadonlySet<K>;
}>;

/**
 * Represents an immutable set.
 * It is iterable and provides various methods for manipulation and querying.
 * @template K The type of the elements in the set.
 */
export type ISet<K extends MapSetKeyType> = Iterable<K> & ISetInterface<K>;

/**
 * Provides utility functions for ISet.
 */
export const ISet = {
  /**
   * Creates a new ISet instance.
   * @template K The type of the elements.
   * @param iterable An iterable of elements.
   * @returns A new ISet instance.
   * @example
   * ```typescript
   * // Create from array
   * const set1 = ISet.new([1, 2, 3, 3]); // ISet with elements: 1, 2, 3
   *
   * // Create from another Set
   * const set2 = ISet.new(new Set(['a', 'b', 'c']));
   *
   * // Create empty set
   * const emptySet = ISet.new<string>([]);
   *
   * // Chain operations
   * const result = ISet.new([1, 2, 3])
   *   .add(4)
   *   .delete(2)
   *   .filter(x => x > 1); // ISet with elements: 3, 4
   * ```
   */
  new: <K extends MapSetKeyType>(iterable: Iterable<K>): ISet<K> =>
    new ISetClass<K>(iterable),

  /**
   * Checks if two ISet instances are equal.
   * Equality is determined by having the same size and all elements being present in both sets.
   * @template K The type of the elements.
   * @param a The first ISet instance.
   * @param b The second ISet instance.
   * @returns `true` if the sets are equal, `false` otherwise.
   * @example
   * ```typescript
   * const set1 = ISet.new([1, 2, 3]);
   * const set2 = ISet.new([3, 2, 1]);
   * const set3 = ISet.new([1, 2, 3, 4]);
   *
   * ISet.equal(set1, set2); // true (same elements, different order)
   * ISet.equal(set1, set3); // false (different sizes)
   * ```
   */
  equal: <K extends MapSetKeyType>(a: ISet<K>, b: ISet<K>): boolean => {
    if (a.size !== b.size) return false;

    return a.every((e) => b.has(e));
  },

  /**
   * Computes the difference between two ISet instances.
   * @template K The type of the elements.
   * @param oldSet The original set.
   * @param newSet The new set.
   * @returns An object containing sets of added and deleted elements.
   * @example
   * ```typescript
   * const oldSet = ISet.new([1, 2, 3]);
   * const newSet = ISet.new([2, 3, 4, 5]);
   *
   * const diff = ISet.diff(oldSet, newSet);
   * // diff.deleted contains: 1
   * // diff.added contains: 4, 5
   * ```
   */
  diff: <K extends MapSetKeyType>(
    oldSet: ISet<K>,
    newSet: ISet<K>,
  ): ReadonlyRecord<'added' | 'deleted', ISet<K>> => ({
    deleted: oldSet.subtract(newSet),
    added: newSet.subtract(oldSet),
  }),

  /**
   * Computes the intersection of two ISet instances.
   * @template K The type of the elements.
   * @param a The first set.
   * @param b The second set.
   * @returns A new ISet instance representing the intersection.
   * @example
   * ```typescript
   * const set1 = ISet.new([1, 2, 3, 4]);
   * const set2 = ISet.new([3, 4, 5, 6]);
   *
   * const intersection = ISet.intersection(set1, set2);
   * // intersection contains: 3, 4
   * ```
   */
  intersection: <K extends MapSetKeyType>(a: ISet<K>, b: ISet<K>): ISet<K> =>
    a.intersect(b),

  /**
   * Computes the union of two ISet instances.
   * @template K1 The type of elements in the first set.
   * @template K2 The type of elements in the second set.
   * @param a The first set.
   * @param b The second set.
   * @returns A new ISet instance representing the union.
   * @example
   * ```typescript
   * const set1 = ISet.new([1, 2, 3]);
   * const set2 = ISet.new([3, 4, 5]);
   *
   * const union = ISet.union(set1, set2);
   * // union contains: 1, 2, 3, 4, 5
   * ```
   */
  union: <K1 extends MapSetKeyType, K2 extends MapSetKeyType>(
    a: ISet<K1>,
    b: ISet<K2>,
  ): ISet<K1 | K2> => a.union(b),
} as const;

/**
 * Class implementation for ISet.
 * @template K The type of the elements.
 * @implements ISet
 * @implements Iterable
 */
class ISetClass<K extends MapSetKeyType> implements ISet<K>, Iterable<K> {
  readonly #set: ReadonlySet<K>;
  readonly #showNotFoundMessage: boolean;

  /**
   * Constructs an ISetClass instance.
   * @param iterable An iterable of elements.
   * @param showNotFoundMessage Whether to show a detailed message when an element is not found during has() operations. Defaults to false.
   */
  constructor(iterable: Iterable<K>, showNotFoundMessage: boolean = false) {
    this.#set = new Set(iterable);
    this.#showNotFoundMessage = showNotFoundMessage;
  }

  /** @inheritdoc */
  get size(): number {
    return this.#set.size;
  }

  /** @inheritdoc */
  get isEmpty(): boolean {
    return this.size === 0;
  }

  /** @inheritdoc */
  has(key: K | (WidenLiteral<K> & {})): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return this.#set.has(key as K);
  }

  /** @inheritdoc */
  every<L extends K>(predicate: (key: K) => key is L): this is ISet<L>;

  /** @inheritdoc */
  every(predicate: (key: K) => boolean): boolean;

  /** @inheritdoc */
  every(predicate: (key: K) => boolean): boolean {
    for (const key of this.values()) {
      if (!predicate(key)) return false;
    }

    return true;
  }

  /** @inheritdoc */
  some(predicate: (key: K) => boolean): boolean {
    for (const key of this.values()) {
      if (predicate(key)) return true;
    }

    return false;
  }

  /** @inheritdoc */
  add(key: K): ISet<K> {
    if (this.has(key)) return this;

    return ISet.new([...this.#set, key]);
  }

  /** @inheritdoc */
  delete(key: K): ISet<K> {
    if (!this.has(key)) {
      if (this.#showNotFoundMessage) {
        const keyStr = unknownToString(key);
        console.warn(
          `ISet.delete: key not found: ${Result.isOk(keyStr) ? keyStr.value : '<error converting key to string>'}`,
        );
      }
      return this;
    }

    return ISet.new(Array.from(this.#set).filter((k) => !Object.is(k, key)));
  }

  /** @inheritdoc */
  withMutations(
    actions: readonly Readonly<
      { type: 'add'; key: K } | { type: 'delete'; key: K }
    >[],
  ): ISet<K> {
    const mut_result = new Set<K>(this.#set);

    for (const action of actions) {
      switch (action.type) {
        case 'delete':
          mut_result.delete(action.key);
          break;

        case 'add':
          mut_result.add(action.key);
          break;
      }
    }

    return ISet.new(mut_result);
  }

  /** @inheritdoc */
  map<K2 extends MapSetKeyType>(mapFn: (key: K) => K2): ISet<K2> {
    return ISet.new(this.toArray().map(mapFn));
  }

  /** @inheritdoc */
  filter<K2 extends K>(predicate: (key: K) => key is K2): ISet<K2>;

  /** @inheritdoc */
  filter(predicate: (key: K) => boolean): ISet<K>;

  /** @inheritdoc */
  filter(predicate: (key: K) => boolean): ISet<K> {
    return ISet.new(this.toArray().filter(predicate));
  }

  /** @inheritdoc */
  filterNot(predicate: (key: K) => boolean): ISet<K> {
    return ISet.new(this.toArray().filter((e) => !predicate(e)));
  }

  /** @inheritdoc */
  forEach(callbackfn: (key: K) => void): void {
    for (const v of this.#set.values()) {
      callbackfn(v);
    }
  }

  /** @inheritdoc */
  isSubsetOf(set: ISet<WidenLiteral<K>>): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return this.every((k) => set.has(k as WidenLiteral<K>));
  }

  /** @inheritdoc */
  isSupersetOf(set: ISet<WidenLiteral<K>>): boolean {
    return set.every((k) => this.has(k));
  }

  /** @inheritdoc */
  subtract(set: ISet<K>): ISet<K> {
    return ISet.new(this.toArray().filter((k) => !set.has(k)));
  }

  /** @inheritdoc */
  intersect(set: ISet<K>): ISet<K> {
    return ISet.new(this.toArray().filter((k) => set.has(k)));
  }

  /** @inheritdoc */
  union<K2 extends MapSetKeyType>(set: ISet<K2>): ISet<K | K2> {
    return ISet.new([...this, ...set]);
  }

  /**
   * @inheritdoc
   */
  [Symbol.iterator](): Iterator<K> {
    return this.#set[Symbol.iterator]();
  }

  /** @inheritdoc */
  keys(): IterableIterator<K> {
    return this.#set.keys();
  }

  /** @inheritdoc */
  values(): IterableIterator<K> {
    return this.#set.values();
  }

  /** @inheritdoc */
  entries(): IterableIterator<readonly [K, K]> {
    return this.#set.entries();
  }

  /** @inheritdoc */
  toArray(): readonly K[] {
    return Array.from(this.values());
  }

  /** @inheritdoc */
  toRawSet(): ReadonlySet<K> {
    return this.#set;
  }
}
