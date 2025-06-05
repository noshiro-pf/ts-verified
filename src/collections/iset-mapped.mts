/**
 * Interface for an immutable set where keys of type `K` are mapped to an underlying `MapSetKeyType` `KM`.
 * This type alias defines the structure of methods and properties for ISetMapped.
 * @template K The type of the elements in the set.
 * @template KM The type of the mapped keys (number or string).
 * @example
 * ```typescript
 * // This is a type alias describing an interface, so it's not directly instantiated.
 * // See ISetMapped.new for an example of creating an ISetMapped instance that conforms to this.
 *
 * // Example of how you might use a variable that implements this structure:
 * type MyElementType = { id: number; name: string };
 * const toKey = (el: MyElementType): string => `key_${el.id}`;
 * const fromKey = (km: string): MyElementType => {
 *   const id = parseInt(km.substring(4), 10);
 *   // In a real scenario, you might fetch the original object or reconstruct it more robustly.
 *   return { id, name: `Element ${id}` };
 * };
 *
 * declare const myMappedSet: ISetMapped<MyElementType, string>; // ISetMapped implements ISetMappedInterface
 *
 * console.log(myMappedSet.size);
 * const elementToCheck: MyElementType = { id: 1, name: "Element 1" };
 * if (myMappedSet.has(elementToCheck)) {
 *   console.log("Set contains elementToCheck");
 * }
 * const newElement: MyElementType = { id: 2, name: "Element 2" };
 * const updatedSet = myMappedSet.add(newElement);
 * ```
 */
type ISetMappedInterface<K, KM extends MapSetKeyType> = {
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
};

/**
 * Represents an immutable set where elements of type `K` are mapped to an underlying `MapSetKeyType` `KM`.
 * It is iterable and provides various methods for manipulation and querying.
 * @template K The type of the elements in the set.
 * @template KM The type of the mapped keys (number or string).
 * @example
 * ```typescript
 * type User = { id: number; username: string };
 * const userToKey = (user: User): number => user.id;
 * const keyToUser = (id: number): User => ({ id, username: `user${id}` }); // Simplified for example
 *
 * let userSet = ISetMapped.new<User, number>([], userToKey, keyToUser);
 *
 * userSet = userSet.add({ id: 1, username: "alice" });
 * userSet = userSet.add({ id: 2, username: "bob" });
 *
 * console.log(userSet.has({ id: 1, username: "alice" })); // Output: true
 * console.log(userSet.size); // Output: 2
 *
 * for (const user of userSet) {
 *   console.log(user.username);
 * }
 * // Output:
 * // alice
 * // bob
 * ```
 */
export type ISetMapped<K, KM extends MapSetKeyType> = Iterable<K> &
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
   * @example
   * ```typescript
   * type Product = { sku: string; price: number };
   * const productToKey = (p: Product): string => p.sku;
   * const keyToProduct = (sku: string): Product => ({ sku, price: 0 }); // Simplified
   *
   * const productSet = ISetMapped.new<Product, string>(
   *   [{ sku: "ABC", price: 10 }, { sku: "DEF", price: 20 }],
   *   productToKey,
   *   keyToProduct
   * );
   * console.log(productSet.size); // Output: 2
   * console.log(productSet.has({ sku: "ABC", price: 10 })); // Output: true
   *
   * // Example with number keys
   * type Item = { itemId: number; description: string };
   * const itemToKey = (i: Item): number => i.itemId;
   * const keyToItem = (id: number): Item => ({ itemId: id, description: "..." });
   *
   * const itemSet = ISetMapped.new<Item, number>(
   *   [],
   *   itemToKey,
   *   keyToItem
   * ).add({ itemId: 101, description: "Gadget" });
   * console.log(itemSet.has({ itemId: 101, description: "Gadget" })); // Output: true
   * ```
   */
  new: <K, KM extends MapSetKeyType>(
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
   * @example
   * ```typescript
   * type DataPoint = { x: number; y: number };
   * const pointToKey = (p: DataPoint): string => `${p.x},${p.y}`;
   * const keyToPoint = (s: string): DataPoint => {
   *   const parts = s.split(',');
   *   return { x: Number(parts[0]), y: Number(parts[1]) };
   * };
   *
   * const set1 = ISetMapped.new<DataPoint, string>(
   *   [{ x: 1, y: 2 }, { x: 3, y: 4 }],
   *   pointToKey,
   *   keyToPoint
   * );
   * const set2 = ISetMapped.new<DataPoint, string>(
   *   [{ x: 3, y: 4 }, { x: 1, y: 2 }], // Order doesn't matter
   *   pointToKey,
   *   keyToPoint
   * );
   * const set3 = ISetMapped.new<DataPoint, string>(
   *   [{ x: 1, y: 2 }, { x: 5, y: 6 }],
   *   pointToKey,
   *   keyToPoint
   * );
   *
   * console.log(ISetMapped.equal(set1, set2)); // Output: true
   * console.log(ISetMapped.equal(set1, set3)); // Output: false
   * ```
   */
  equal: <K, KM extends MapSetKeyType>(
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
   * @example
   * ```typescript
   * type Tag = { name: string };
   * const tagToKey = (t: Tag): string => t.name;
   * const keyToTag = (name: string): Tag => ({ name });
   *
   * const oldTags = ISetMapped.new<Tag, string>(
   *   [{ name: "typescript" }, { name: "javascript" }],
   *   tagToKey,
   *   keyToTag
   * );
   * const newTags = ISetMapped.new<Tag, string>(
   *   [{ name: "javascript" }, { name: "react" }, { name: "nextjs" }],
   *   tagToKey,
   *   keyToTag
   * );
   *
   * const diffResult = ISetMapped.diff(oldTags, newTags);
   *
   * console.log("Deleted tags:", diffResult.deleted.toArray().map(t => t.name));
   * // Output: Deleted tags: ["typescript"]
   *
   * console.log("Added tags:", diffResult.added.toArray().map(t => t.name));
   * // Output: Added tags: ["react", "nextjs"]
   * ```
   */
  diff: <K, KM extends MapSetKeyType>(
    oldSet: ISetMapped<K, KM>,
    newSet: ISetMapped<K, KM>,
  ): ReadonlyRecord<'added' | 'deleted', ISetMapped<K, KM>> => ({
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
   * @example
   * ```typescript
   * type Permission = { id: string };
   * const permToKey = (p: Permission): string => p.id;
   * const keyToPerm = (id: string): Permission => ({ id });
   *
   * const userPermissions = ISetMapped.new<Permission, string>(
   *   [{ id: "read" }, { id: "write" }, { id: "delete" }],
   *   permToKey,
   *   keyToPerm
   * );
   * const rolePermissions = ISetMapped.new<Permission, string>(
   *   [{ id: "read" }, { id: "comment" }, { id: "write" }],
   *   permToKey,
   *   keyToPerm
   * );
   *
   * const commonPermissions = ISetMapped.intersection(userPermissions, rolePermissions);
   * console.log(commonPermissions.toArray().map(p => p.id)); // Output: ["read", "write"]
   * ```
   */
  intersection: <K, KM extends MapSetKeyType>(
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
   * @example
   * ```typescript
   * type FeatureFlag = { flagName: string };
   * const flagToKey = (f: FeatureFlag): string => f.flagName;
   * const keyToFlag = (name: string): FeatureFlag => ({ flagName: name });
   *
   * const setA = ISetMapped.new<FeatureFlag, string>(
   *   [{ flagName: "newUI" }, { flagName: "betaFeature" }],
   *   flagToKey,
   *   keyToFlag
   * );
   * const setB = ISetMapped.new<FeatureFlag, string>(
   *   [{ flagName: "betaFeature" }, { flagName: "darkMode" }],
   *   flagToKey,
   *   keyToFlag
   * );
   *
   * const combinedFlags = ISetMapped.union(setA, setB);
   * // The order might vary as sets are unordered internally.
   * console.log(combinedFlags.toArray().map(f => f.flagName).sort());
   * // Output: ["betaFeature", "darkMode", "newUI"]
   * ```
   */
  union: <K, KM extends MapSetKeyType>(
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
class ISetMappedClass<K, KM extends MapSetKeyType>
  implements ISetMapped<K, KM>, Iterable<K>
{
  readonly #set: ReadonlySet<KM>;
  readonly #toKey: (a: K) => KM;
  readonly #fromKey: (k: KM) => K;
  readonly #showNotFoundMessage: boolean;

  /**
   * Constructs an ISetMappedClass instance.
   * @param iterable An iterable of elements.
   * @param toKey A function to convert `K` to `KM`.
   * @param fromKey A function to convert `KM` to `K`.
   * @param showNotFoundMessage Whether to show a detailed message when an element is not found during has() operations. Defaults to false.
   */
  constructor(
    iterable: Iterable<K>,
    toKey: (a: K) => KM,
    fromKey: (k: KM) => K,
    showNotFoundMessage: boolean = false,
  ) {
    this.#set = new Set(Array.from(iterable, toKey));
    this.#toKey = toKey;
    this.#fromKey = fromKey;
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
      if (this.#showNotFoundMessage) {
        console.warn(`ISetMapped.delete: key not found: ${this.#toKey(key)}`);
      }
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
   * @inheritdoc
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
    for (const km of this.#set.keys()) {
      // JavaScript Set's values() is an alias for keys()
      yield this.#fromKey(km);
    }
  }

  /** @inheritdoc */
  *entries(): IterableIterator<readonly [K, K]> {
    for (const km of this.#set.keys()) {
      // JavaScript Set's entries() yields [value, value]
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
