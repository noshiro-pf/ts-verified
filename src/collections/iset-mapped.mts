/**
 * Represents the type of keys that can be used in a standard JavaScript Set for mapped keys.
 */
type SetKeyType = number | string;


/**
 * Interface for an immutable set where keys of type `K` are mapped to an underlying `SetKeyType` `KM`.
 * @template K The type of the elements in the set.
 * @template KM The type of the mapped keys (number or string).
 */
type ISetMappedInterface<K, KM extends SetKeyType> = {
  /**
   * Creates a new ISetMapped instance.
   * @param iterable An iterable of elements.
   * @param toKey A function that converts an element of type `K` to `KM`.
   * @param fromKey A function that converts a mapped key of type `KM` back to `K`.
   */
  new (iterable: Iterable<K>, toKey: (a: K) => KM, fromKey: (k: KM) => K): void;

  // Getting information
  /** The number of elements in the set. */
  size: number;
  /** Checks if the set is empty. */
  isEmpty: boolean;
  /**
   * Checks if an element exists in the set.
   * @param key The element to check.
   * @returns `true` if the element exists, `false` otherwise.
   */
  has: (key: K) => boolean;

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
    (<L extends K>(
      predicate: (key: K) => key is L,
    ) => this is ISetMapped<L, KM>);
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
   * @returns A new ISetMapped instance with the element added.
   */
  add: (key: K) => ISetMapped<K, KM>;
  /**
   * Deletes an element from the set.
   * @param key The element to delete.
   * @returns A new ISetMapped instance without the specified element.
   */
  delete: (key: K) => ISetMapped<K, KM>;
  /**
   * Applies a series of mutations to the set.
   * @param actions An array of mutation actions (add or delete).
   * @returns A new ISetMapped instance with all mutations applied.
   */
  withMutations: (
    actions: readonly Readonly<
      { type: 'add'; key: K } | { type: 'delete'; key: K }
    >[],
  ) => ISetMapped<K, KM>;

  // Sequence algorithms
  /**
   * Maps the elements of the set to new elements.
   * Note: The element type `K` cannot be changed because `toKey` and `fromKey` would become unusable if the mapped type `KM` changes.
   * @param mapFn A function that maps an element to a new element of the same type `K`.
   * @returns A new ISetMapped instance with mapped elements.
   */
  map: (mapFn: (key: K) => K) => ISetMapped<K, KM>;

  /**
   * Filters the elements of the set based on a predicate.
   * @param predicate A function to test each element.
   * @returns A new ISetMapped instance with elements that satisfy the predicate.
   */
  filter: (predicate: (value: K) => boolean) => ISetMapped<K, KM>;

  /**
   * Filters the elements of the set by excluding elements for which the predicate returns true.
   * @param predicate A function to test each element.
   * @returns A new ISetMapped instance with elements for which the predicate returned `false`.
   */
  filterNot: (predicate: (key: K) => boolean) => ISetMapped<K, KM>;

  // Side effects
  /**
   * Executes a callback function for each element in the set.
   * @param callbackfn A function to execute for each element.
   */
  forEach: (callbackfn: (key: K) => void) => void;

  // Comparison
  /**
   * Checks if this set is a subset of another set.
   * @param set The other set.
   * @returns `true` if this set is a subset of the other set, `false` otherwise.
   */
  isSubsetOf: (set: ISetMapped<K, KM>) => boolean;
  /**
   * Checks if this set is a superset of another set.
   * @param set The other set.
   * @returns `true` if this set is a superset of the other set, `false` otherwise.
   */
  isSupersetOf: (set: ISetMapped<K, KM>) => boolean;
  /**
   * Returns a new set with elements that are in this set but not in another set.
   * @param set The other set.
   * @returns A new ISetMapped instance representing the set difference.
   */
  subtract: (set: ISetMapped<K, KM>) => ISetMapped<K, KM>;
  /**
   * Returns a new set with elements that are common to both this set and another set.
   * @param set The other set.
   * @returns A new ISetMapped instance representing the set intersection.
   */
  intersect: (set: ISetMapped<K, KM>) => ISetMapped<K, KM>;
  /**
   * Returns a new set with all elements from both this set and another set.
   * @param set The other set.
   * @returns A new ISetMapped instance representing the set union.
   */
  union: (set: ISetMapped<K, KM>) => ISetMapped<K, KM>;

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
   * Returns the underlying readonly JavaScript Set of mapped keys.
   * @returns The raw ReadonlySet instance.
   */
  toRawSet: () => ReadonlySet<KM>;
}

/**
 * Represents an immutable set where elements of type `K` are mapped to an underlying `SetKeyType` `KM`.
 * It is iterable and provides various methods for manipulation and querying.
 * @template K The type of the elements in the set.
 * @template KM The type of the mapped keys (number or string).
 */
export type ISetMapped<K, KM extends SetKeyType> = Iterable<K> &
  Readonly<ISetMappedInterface<K, KM>>;

/**
 * Provides utility functions for ISetMapped.
 */
export const ISetMapped = {
  /**
   * Creates a new ISetMapped instance.
   * @template K The type of the elements.
   * @template KM The type of the mapped keys.
   * @param iterable An iterable of elements.
   * @param toKey A function to convert `K` to `KM`.
   * @param fromKey A function to convert `KM` to `K`.
   * @returns A new ISetMapped instance.
   */
  new: <K, KM extends SetKeyType>(
    iterable: Iterable<K>,
    toKey: (a: K) => KM,
    fromKey: (k: KM) => K,
  ): ISetMapped<K, KM> => new ISetMappedClass<K, KM>(iterable, toKey, fromKey),

  /**
   * Checks if two ISetMapped instances are equal.
   * Equality is determined by having the same size and all elements being present in both sets.
   * @template K The type of the elements.
   * @template KM The type of the mapped keys.
   * @param a The first ISetMapped instance.
   * @param b The second ISetMapped instance.
   * @returns `true` if the sets are equal, `false` otherwise.
   */
  equal: <K, KM extends SetKeyType>(
    a: ISetMapped<K, KM>,
    b: ISetMapped<K, KM>,
  ): boolean => {
    if (a.size !== b.size) return false;

    return a.every((e) => b.has(e));
  },

  /**
   * Computes the difference between two ISetMapped instances.
   * @template K The type of the elements.
   * @template KM The type of the mapped keys.
   * @param oldSet The original set.
   * @param newSet The new set.
   * @returns An object containing sets of added and deleted elements.
   */
  diff: <K, KM extends SetKeyType>(
    oldSet: ISetMapped<K, KM>,
    newSet: ISetMapped<K, KM>,
  ): Record<'added' | 'deleted', ISetMapped<K, KM>> => ({
    deleted: oldSet.subtract(newSet),
    added: newSet.subtract(oldSet),
  }),

  /**
   * Computes the intersection of two ISetMapped instances.
   * @template K The type of the elements.
   * @template KM The type of the mapped keys.
   * @param a The first set.
   * @param b The second set.
   * @returns A new ISetMapped instance representing the intersection.
   */
  intersection: <K, KM extends SetKeyType>(
    a: ISetMapped<K, KM>,
    b: ISetMapped<K, KM>,
  ): ISetMapped<K, KM> => a.intersect(b),

  /**
   * Computes the union of two ISetMapped instances.
   * @template K The type of the elements.
   * @template KM The type of the mapped keys.
   * @param a The first set.
   * @param b The second set.
   * @returns A new ISetMapped instance representing the union.
   */
  union: <K, KM extends SetKeyType>(
    a: ISetMapped<K, KM>,
    b: ISetMapped<K, KM>,
  ): ISetMapped<K, KM> => a.union(b),
};

/**
 * Class implementation for ISetMapped.
 * @template K The type of the elements.
 * @template KM The type of the mapped keys.
 * @implements ISetMapped
 * @implements Iterable
 */
class ISetMappedClass<K, KM extends SetKeyType>
  implements ISetMapped<K, KM>, Iterable<K>
{
  readonly #set: ReadonlySet<KM>;
  readonly #toKey: (a: K) => KM;
  readonly #fromKey: (k: KM) => K;

  /**
   * Constructs an ISetMappedClass instance.
   * @param iterable An iterable of elements.
   * @param toKey A function to convert `K` to `KM`.
   * @param fromKey A function to convert `KM` to `K`.
   */
  constructor(
    iterable: Iterable<K>,
    toKey: (a: K) => KM,
    fromKey: (k: KM) => K,
  ) {
    this.#set = new Set(Array.from(iterable, toKey));
    this.#toKey = toKey;
    this.#fromKey = fromKey;
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
  has(key: K): boolean {
    return this.#set.has(this.#toKey(key));
  }

  /** @inheritdoc */
  every<L extends K>(
    predicate: (key: K) => key is L,
  ): this is ISetMapped<L, KM>;
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
  add(key: K): ISetMapped<K, KM> {
    if (this.has(key)) return this;

    return ISetMapped.new(
      [...this.#set, this.#toKey(key)].map(this.#fromKey),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  delete(key: K): ISetMapped<K, KM> {
    if (!this.has(key)) {
      console.warn(`ISetMapped.delete: key not found: ${this.#toKey(key)}`);
      return this;
    }
    const keyMapped = this.#toKey(key);

    return ISetMapped.new(
      Array.from(this.#set)
        .filter((k) => !Object.is(k, keyMapped))
        .map(this.#fromKey),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  withMutations(
    actions: readonly Readonly<
      { type: 'add'; key: K } | { type: 'delete'; key: K }
    >[],
  ): ISetMapped<K, KM> {
    const mut_result = new Set<KM>(this.#set);

    for (const action of actions) {
      const key = this.#toKey(action.key);

      switch (action.type) {
        case 'delete':
          mut_result.delete(key);
          break;

        case 'add':
          mut_result.add(key);
          break;
      }
    }

    return ISetMapped.new<K, KM>(
      Array.from(mut_result, this.#fromKey),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  map(mapFn: (key: K) => K): ISetMapped<K, KM> {
    return ISetMapped.new(
      this.toArray().map(mapFn),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  filter(predicate: (key: K) => boolean): ISetMapped<K, KM> {
    return ISetMapped.new(
      this.toArray().filter(predicate),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  filterNot(predicate: (key: K) => boolean): ISetMapped<K, KM> {
    return ISetMapped.new(
      this.toArray().filter((k) => !predicate(k)),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  forEach(callbackfn: (key: K) => void): void {
    for (const km of this.#set) {
      callbackfn(this.#fromKey(km));
    }
  }

  /** @inheritdoc */
  isSubsetOf(set: ISetMapped<K, KM>): boolean {
    return this.every((k) => set.has(k));
  }

  /** @inheritdoc */
  isSupersetOf(set: ISetMapped<K, KM>): boolean {
    return set.every((k) => this.has(k));
  }

  /** @inheritdoc */
  subtract(set: ISetMapped<K, KM>): ISetMapped<K, KM> {
    return ISetMapped.new(
      this.toArray().filter((k) => !set.has(k)),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  intersect(set: ISetMapped<K, KM>): ISetMapped<K, KM> {
    return ISetMapped.new(
      this.toArray().filter((k) => set.has(k)),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  union(set: ISetMapped<K, KM>): ISetMapped<K, KM> {
    return ISetMapped.new(
      [...this.values(), ...set.values()],
      this.#toKey,
      this.#fromKey,
    );
  }

  /**
   * Returns an iterator for the elements in the set.
   * Implements the `Iterable` interface.
   * @returns An iterator of elements.
   */
  *[Symbol.iterator](): Iterator<K> {
    for (const k of this.keys()) {
      yield k;
    }
  }

  /** @inheritdoc */
  *keys(): IterableIterator<K> {
    for (const km of this.#set.keys()) {
      yield this.#fromKey(km);
    }
  }

  /** @inheritdoc */
  *values(): IterableIterator<K> {
    for (const km of this.#set.keys()) { // JavaScript Set's values() is an alias for keys()
      yield this.#fromKey(km);
    }
  }

  /** @inheritdoc */
  *entries(): IterableIterator<readonly [K, K]> {
    for (const km of this.#set.keys()) { // JavaScript Set's entries() yields [value, value]
      const a = this.#fromKey(km);
      yield [a, a];
    }
  }

  /** @inheritdoc */
  toArray(): readonly K[] {
    return Array.from(this.values());
  }

  /** @inheritdoc */
  toRawSet(): ReadonlySet<KM> {
    return this.#set;
  }
}
