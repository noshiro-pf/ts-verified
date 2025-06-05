import { Optional, pipe } from '../functional/index.mjs';
import { tp } from '../others/index.mjs';

/**
 * Interface for an immutable map where keys of type `K` are mapped to an underlying `MapKeyType` `KM`.
 * This type alias defines the structure of methods and properties for IMapMapped.
 * @template K The type of the keys in the map.
 * @template V The type of the values in the map.
 * @template KM The type of the mapped keys (number or string).
 * @example
 * ```typescript
 * // This is a type alias describing an interface, so it's not directly instantiated.
 * // See IMapMapped.new for an example of creating an IMapMapped instance that conforms to this.
 *
 * // Example of how you might use a variable that implements this structure:
 * declare const myMap: IMapMapped<string, number, string>; // IMapMapped implements IMapMappedInterface
 *
 * console.log(myMap.size);
 * if (myMap.has("myKey")) {
 *   const value = myMap.get("myKey").unwrapOr(-1);
 *   console.log(value);
 * }
 * const updatedMap = myMap.set("newKey", 123);
 * ```
 */
type IMapMappedInterface<K, V, KM extends MapSetKeyType> = Readonly<{
  // Getting information

  /** The number of elements in the map. */
  size: number;

  /**
   * Checks if a key exists in the map.
   * @param key The key to check.
   * @returns `true` if the key exists, `false` otherwise.
   */
  has: (key: K) => boolean;

  /**
   * Retrieves the value associated with a key.
   * @param key The key to retrieve.
   * @returns The value associated with the key wrapped with `Optional.some`, or `Optional.none` if the key does not exist.
   */
  get: (key: K) => Optional<V>;

  // Reducing a value

  /**
   * Checks if all elements in the map satisfy a predicate.
   * @param predicate A function to test each key-value pair.
   * @returns `true` if all elements satisfy the predicate, `false` otherwise.
   */
  every: ((predicate: (value: V, key: K) => boolean) => boolean) &
    /**
     * Checks if all elements in the map satisfy a type predicate.
     * Narrows the type of values in the map if the predicate returns true for all elements.
     * @template W The narrowed type of the values.
     * @param predicate A type predicate function.
     * @returns `true` if all elements satisfy the predicate, `false` otherwise.
     */
    (<W extends V>(
      predicate: (value: V, key: K) => value is W,
    ) => this is IMapMapped<K, W, KM>);

  /**
   * Checks if at least one element in the map satisfies a predicate.
   * @param predicate A function to test each key-value pair.
   * @returns `true` if at least one element satisfies the predicate, `false` otherwise.
   */
  some: (predicate: (value: V, key: K) => boolean) => boolean;

  // Mutation
  /**
   * Deletes a key-value pair from the map.
   * @param key The key to delete.
   * @returns A new IMapMapped instance without the specified key.
   */
  delete: (key: K) => IMapMapped<K, V, KM>;

  /**
   * Sets a key-value pair in the map.
   * @param key The key to set.
   * @param value The value to associate with the key.
   * @returns A new IMapMapped instance with the specified key-value pair.
   */
  set: (key: K, value: V) => IMapMapped<K, V, KM>;

  /**
   * Updates the value associated with a key using an updater function.
   * @param key The key whose value to update.
   * @param updater A function that takes the current value and returns the new value.
   * @returns A new IMapMapped instance with the updated value.
   */
  update: (key: K, updater: (value: V) => V) => IMapMapped<K, V, KM>;

  /**
   * Applies a series of mutations to the map.
   * @param actions An array of mutation actions (delete, set, or update).
   * @returns A new IMapMapped instance with all mutations applied.
   */
  withMutations: (
    actions: readonly Readonly<
      | { type: 'delete'; key: K }
      | { type: 'set'; key: K; value: V }
      | { type: 'update'; key: K; updater: (value: V) => V }
    >[],
  ) => IMapMapped<K, V, KM>;

  // Sequence algorithms

  /**
   * Maps the values of the map to new values.
   * @template V2 The type of the new values.
   * @param mapFn A function that maps a value and key to a new value.
   * @returns A new IMapMapped instance with mapped values.
   */
  map: <V2>(mapFn: (value: V, key: K) => V2) => IMapMapped<K, V2, KM>;

  /**
   * Maps the keys of the map to new keys.
   * Note: The key type cannot be changed because `toKey` and `fromKey` would become unusable.
   * @param mapFn A function that maps a key to a new key of the same type.
   * @returns A new IMapMapped instance with mapped keys.
   */
  mapKeys: (mapFn: (key: K) => K) => IMapMapped<K, V, KM>;

  /**
   * Maps the entries (key-value pairs) of the map to new entries.
   * @template V2 The type of the new values in the entries.
   * @param mapFn A function that maps an entry to a new entry (key must remain the same type).
   * @returns A new IMapMapped instance with mapped entries.
   */
  mapEntries: <V2>(
    mapFn: (entry: readonly [K, V]) => readonly [K, V2],
  ) => IMapMapped<K, V2, KM>;

  // Side effects

  /**
   * Executes a callback function for each key-value pair in the map.
   * @param callbackfn A function to execute for each element.
   */
  forEach: (callbackfn: (value: V, key: K) => void) => void;

  // Iterators

  /**
   * Returns an iterator for the keys in the map.
   * @returns An iterable iterator of keys.
   */
  keys: () => IterableIterator<K>;

  /**
   * Returns an iterator for the values in the map.
   * @returns An iterable iterator of values.
   */
  values: () => IterableIterator<V>;

  /**
   * Returns an iterator for the entries (key-value pairs) in the map.
   * @returns An iterable iterator of entries.
   */
  entries: () => IterableIterator<readonly [K, V]>;

  // Conversion

  /**
   * Converts the keys of the map to an array.
   * @returns A readonly array of keys.
   */
  toKeysArray: () => readonly K[];

  /**
   * Converts the values of the map to an array.
   * @returns A readonly array of values.
   */
  toValuesArray: () => readonly V[];

  /**
   * Converts the entries (key-value pairs) of the map to an array.
   * @returns A readonly array of entries.
   */
  toEntriesArray: () => readonly (readonly [K, V])[];

  /**
   * Converts the map to an array of entries (key-value pairs).
   * Alias for `toEntriesArray`.
   * @returns A readonly array of entries.
   */
  toArray: () => readonly (readonly [K, V])[];

  /**
   * Returns the underlying readonly JavaScript Map.
   * @returns The raw ReadonlyMap instance.
   */
  toRawMap: () => ReadonlyMap<KM, V>;
}>;

/**
 * Represents an immutable map where keys of type `K` are mapped to an underlying `MapKeyType` `KM`.
 * It is iterable and provides various methods for manipulation and querying.
 * @template K The type of the keys in the map.
 * @template V The type of the values in the map.
 * @template KM The type of the mapped keys (number or string).
 * @example
 * ```typescript
 * // Define a custom key type and its mapping functions
 * type MyKey = { id: number; category: string };
 * const toKey = (key: MyKey): string => `${key.category}_${key.id}`;
 * const fromKey = (km: string): MyKey => {
 *   const [category, idStr] = km.split('_');
 *   return { id: Number(idStr), category };
 * };
 *
 * // Create an IMapMapped instance
 * let map: IMapMapped<MyKey, string, string> = IMapMapped.new<MyKey, string, string>(
 *   [],
 *   toKey,
 *   fromKey
 * );
 *
 * const key1: MyKey = { id: 1, category: "A" };
 * const key2: MyKey = { id: 2, category: "B" };
 *
 * map = map.set(key1, "Value for A1");
 * map = map.set(key2, "Value for B2");
 *
 * console.log(map.get(key1).unwrapOr("Not found")); // Output: Value for A1
 * console.log(map.size); // Output: 2
 *
 * for (const [key, value] of map) {
 *   console.log(`Key: ${toKey(key)}, Value: ${value}`);
 * }
 * // Output:
 * // Key: A_1, Value: Value for A1
 * // Key: B_2, Value: Value for B2
 * ```
 */
export type IMapMapped<K, V, KM extends MapSetKeyType> = Iterable<
  readonly [K, V]
> &
  IMapMappedInterface<K, V, KM>;

/**
 * Provides utility functions for IMapMapped.
 */
export const IMapMapped = {
  /**
   * Creates a new IMapMapped instance.
   * @template K The type of the keys.
   * @template V The type of the values.
   * @template KM The type of the mapped keys.
   * @param iterable An iterable of key-value pairs.
   * @param toKey A function to convert `K` to `KM`.
   * @param fromKey A function to convert `KM` to `K`.
   * @returns A new IMapMapped instance.
   * @example
   * ```typescript
   * type ComplexKey = { partA: string; partB: number };
   * const complexKeyToString = (ck: ComplexKey): string => `${ck.partA}-${ck.partB}`;
   * const stringToComplexKey = (s: string): ComplexKey => {
   *   const [partA, partBStr] = s.split('-');
   *   return { partA, partB: Number(partBStr) };
   * };
   *
   * const initialData: Array<[ComplexKey, boolean]> = [
   *   [{ partA: "item", partB: 1 }, true],
   *   [{ partA: "item", partB: 2 }, false],
   * ];
   *
   * const myMappedMap = IMapMapped.new<ComplexKey, boolean, string>(
   *   initialData,
   *   complexKeyToString,
   *   stringToComplexKey
   * );
   *
   * console.log(myMappedMap.size); // Output: 2
   * console.log(myMappedMap.get({ partA: "item", partB: 1 }).unwrap()); // Output: true
   *
   * const mapWithSimpleKeys = IMapMapped.new<string, number, string>(
   *   [["a", 1], ["b", 2]],
   *   (s) => s, // identity for string keys
   *   (s) => s  // identity for string keys
   * );
   * console.log(mapWithSimpleKeys.get("b").unwrap()); // Output: 2
   * ```
   */
  new: <K, V, KM extends MapSetKeyType>(
    iterable: Iterable<readonly [K, V]>,
    toKey: (a: K) => KM,
    fromKey: (k: KM) => K,
  ): IMapMapped<K, V, KM> =>
    new IMapMappedClass<K, V, KM>(iterable, toKey, fromKey),

  /**
   * Checks if two IMapMapped instances are equal.
   * Equality is determined by having the same size and all key-value pairs being equal.
   * @template K The type of the keys.
   * @template V The type of the values.
   * @template KM The type of the mapped keys.
   * @param a The first IMapMapped instance.
   * @param b The second IMapMapped instance.
   * @returns `true` if the maps are equal, `false` otherwise.
   * @example
   * ```typescript
   * const toKey = (s: string) => s;
   * const fromKey = (s: string) => s;
   *
   * const map1 = IMapMapped.new<string, number, string>([["a", 1], ["b", 2]], toKey, fromKey);
   * const map2 = IMapMapped.new<string, number, string>([["a", 1], ["b", 2]], toKey, fromKey);
   * const map3 = IMapMapped.new<string, number, string>([["a", 1], ["c", 3]], toKey, fromKey);
   * const map4 = IMapMapped.new<string, number, string>([["a", 1], ["b", 99]], toKey, fromKey);
   *
   * console.log(IMapMapped.equal(map1, map2)); // Output: true
   * console.log(IMapMapped.equal(map1, map3)); // Output: false (different keys/values)
   * console.log(IMapMapped.equal(map1, map4)); // Output: false (different value for key "b")
   *
   * // Example with custom key type
   * type MyObjKey = { id: number };
   * const toObjKey = (k: MyObjKey): string => `id_${k.id}`;
   * const fromObjKey = (s: string): MyObjKey => ({ id: Number(s.substring(3)) });
   *
   * const mapObj1 = IMapMapped.new<MyObjKey, string, string>(
   *   [[{ id: 1 }, "val1"]],
   *   toObjKey,
   *   fromObjKey
   * );
   * const mapObj2 = IMapMapped.new<MyObjKey, string, string>(
   *   [[{ id: 1 }, "val1"]],
   *   toObjKey,
   *   fromObjKey
   * );
   * console.log(IMapMapped.equal(mapObj1, mapObj2)); // Output: true
   * ```
   */
  equal: <K, V, KM extends MapSetKeyType>(
    a: IMapMapped<K, V, KM>,
    b: IMapMapped<K, V, KM>,
  ): boolean => a.size === b.size && a.every((v, k) => b.get(k) === v),
};

/**
 * Class implementation for IMapMapped.
 * @template K The type of the keys.
 * @template V The type of the values.
 * @template KM The type of the mapped keys.
 * @implements IMapMapped
 * @implements Iterable
 */
class IMapMappedClass<K, V, KM extends MapSetKeyType>
  implements IMapMapped<K, V, KM>, Iterable<readonly [K, V]>
{
  readonly #map: ReadonlyMap<KM, V>;
  readonly #toKey: (a: K) => KM;
  readonly #fromKey: (k: KM) => K;
  readonly #showNotFoundMessage: boolean;

  /**
   * Constructs an IMapMappedClass instance.
   * @param iterable An iterable of key-value pairs.
   * @param toKey A function to convert `K` to `KM`.
   * @param fromKey A function to convert `KM` to `K`.
   * @param showNotFoundMessage Whether to show a detailed message when a key is not found during get() operations. Defaults to false.
   */
  constructor(
    iterable: Iterable<readonly [K, V]>,
    toKey: (a: K) => KM,
    fromKey: (k: KM) => K,
    showNotFoundMessage: boolean = false,
  ) {
    this.#map = new Map(Array.from(iterable, ([k, v]) => [toKey(k), v]));
    this.#toKey = toKey;
    this.#fromKey = fromKey;
    this.#showNotFoundMessage = showNotFoundMessage;
  }

  /** @inheritdoc */
  get size(): number {
    return this.#map.size;
  }

  /** @inheritdoc */
  has(key: K): boolean {
    return this.#map.has(this.#toKey(key));
  }

  /** @inheritdoc */
  get(key: K): Optional<V> {
    if (!this.has(key)) return Optional.none;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Optional.some(this.#map.get(this.#toKey(key))!);
  }

  /** @inheritdoc */
  every<W extends V>(
    predicate: (value: V, key: K) => value is W,
  ): this is IMapMapped<K, W, KM>;
  /** @inheritdoc */
  every(predicate: (value: V, key: K) => boolean): boolean;
  /** @inheritdoc */
  every(predicate: (value: V, key: K) => boolean): boolean {
    for (const [k, v] of this.entries()) {
      if (!predicate(v, k)) return false;
    }

    return true;
  }

  /** @inheritdoc */
  some(predicate: (value: V, key: K) => boolean): boolean {
    for (const [k, v] of this.entries()) {
      if (predicate(v, k)) return true;
    }

    return false;
  }

  /** @inheritdoc */
  delete(key: K): IMapMapped<K, V, KM> {
    if (!this.has(key)) {
      if (this.#showNotFoundMessage) {
        console.warn(`IMapMapped.delete: key not found: ${this.#toKey(key)}`);
      }
      return this;
    }
    const keyMapped = this.#toKey(key);

    return IMapMapped.new(
      Array.from(this.#map)
        .filter(([km]) => !Object.is(km, keyMapped))
        .map(([km, v]) => tp(this.#fromKey(km), v)),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  set(key: K, value: V): IMapMapped<K, V, KM> {
    if (value === this.get(key)) return this; // has no changes
    const keyMapped = this.#toKey(key);

    if (!this.has(key)) {
      return IMapMapped.new(
        [...this.#map, tp(keyMapped, value)].map(([km, v]) =>
          tp(this.#fromKey(km), v),
        ),
        this.#toKey,
        this.#fromKey,
      );
    } else {
      return IMapMapped.new(
        Array.from(this.#map, ([km, v]) =>
          tp(this.#fromKey(km), Object.is(km, keyMapped) ? value : v),
        ),
        this.#toKey,
        this.#fromKey,
      );
    }
  }

  /** @inheritdoc */
  update(key: K, updater: (value: V) => V): IMapMapped<K, V, KM> {
    const curr = this.get(key);

    if (Optional.isNone(curr)) {
      if (this.#showNotFoundMessage) {
        console.warn(`IMapMapped.update: key not found: ${this.#toKey(key)}`);
      }
      return this;
    }

    const keyMapped = this.#toKey(key);

    return IMapMapped.new(
      Array.from(
        this.#map.entries(),
        (keyValue) =>
          pipe(keyValue)
            .map(([km, v]) =>
              tp(km, Object.is(km, keyMapped) ? updater(curr.value) : v),
            )
            .map(([km, v]) => tp(this.#fromKey(km), v)).value,
      ),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  withMutations(
    actions: readonly Readonly<
      | { type: 'delete'; key: K }
      | { type: 'set'; key: K; value: V }
      | { type: 'update'; key: K; updater: (value: V) => V }
    >[],
  ): IMapMapped<K, V, KM> {
    const mut_result = new Map<KM, V>(this.#map);

    for (const action of actions) {
      const key = this.#toKey(action.key);

      switch (action.type) {
        case 'delete':
          mut_result.delete(key);
          break;

        case 'set':
          mut_result.set(key, action.value);
          break;

        case 'update': {
          const curr = mut_result.get(key);

          if (!mut_result.has(key) || curr === undefined) {
            if (this.#showNotFoundMessage) {
              console.warn(
                `IMapMapped.withMutations::update: key not found: ${key}`,
              );
            }
            break;
          }

          mut_result.set(key, action.updater(curr));

          break;
        }
      }
    }

    return IMapMapped.new<K, V, KM>(
      Array.from(mut_result, ([k, v]) => [this.#fromKey(k), v]),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  map<V2>(mapFn: (value: V, key: K) => V2): IMapMapped<K, V2, KM> {
    return IMapMapped.new(
      this.toArray().map(([k, v]) => tp(k, mapFn(v, k))),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  mapKeys(mapFn: (key: K) => K): IMapMapped<K, V, KM> {
    return IMapMapped.new(
      this.toArray().map(([k, v]) => tp(mapFn(k), v)),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  mapEntries<V2>(
    mapFn: (entry: readonly [K, V]) => readonly [K, V2],
  ): IMapMapped<K, V2, KM> {
    return IMapMapped.new(
      this.toArray().map(mapFn),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  forEach(callbackfn: (value: V, key: K) => void): void {
    for (const [km, value] of this.#map.entries()) {
      callbackfn(value, this.#fromKey(km));
    }
  }

  /**
   * @inheritdoc
   */
  *[Symbol.iterator](): Iterator<readonly [K, V]> {
    for (const e of this.entries()) {
      yield e;
    }
  }

  /** @inheritdoc */
  *keys(): IterableIterator<K> {
    for (const km of this.#map.keys()) {
      yield this.#fromKey(km);
    }
  }

  /** @inheritdoc */
  *values(): IterableIterator<V> {
    for (const v of this.#map.values()) {
      yield v;
    }
  }

  /** @inheritdoc */
  *entries(): IterableIterator<readonly [K, V]> {
    for (const [km, v] of this.#map.entries()) {
      yield [this.#fromKey(km), v];
    }
  }

  /** @inheritdoc */
  toKeysArray(): readonly K[] {
    return Array.from(this.keys());
  }

  /** @inheritdoc */
  toValuesArray(): readonly V[] {
    return Array.from(this.values());
  }

  /** @inheritdoc */
  toEntriesArray(): readonly (readonly [K, V])[] {
    return Array.from(this.entries());
  }

  /** @inheritdoc */
  toArray(): readonly (readonly [K, V])[] {
    return Array.from(this.entries());
  }

  /** @inheritdoc */
  toRawMap(): ReadonlyMap<KM, V> {
    return this.#map;
  }
}
