import { Optional, Result } from '../functional/index.mjs';
import { tp } from '../others/index.mjs';
import { unknownToString } from '../others/unknown-to-string.mjs';

/**
 * Interface for an immutable map.
 * This type alias defines the structure of methods and properties for IMap.
 * @template K The type of the keys in the map.
 * @template V The type of the values in the map.
 * @example
 * ```typescript
 * // This is a type alias describing an interface, so it's not directly instantiated.
 * // See IMap.new for an example of creating an IMap instance that conforms to this.
 *
 * // Example of how you might use a variable that implements this structure:
 * declare const myMap: IMap<string, number>; // IMap implements IMapInterface
 *
 * console.log(myMap.size);
 * if (myMap.has("myKey")) {
 *   const value = myMap.get("myKey").unwrapOr(-1);
 *   console.log(value);
 * }
 * const updatedMap = myMap.set("newKey", 123);
 * ```
 */
type IMapInterface<K extends MapSetKeyType, V> = Readonly<{
  // Getting information

  /** The number of elements in the map. */
  size: number;

  /**
   * Checks if a key exists in the map.
   * Allows for wider literal types for keys during checking.
   * @param key The key to check.
   * @returns `true` if the key exists, `false` otherwise.
   */
  has: (key: K | (WidenLiteral<K> & {})) => boolean;

  /**
   * Retrieves the value associated with a key.
   * @param key The key to retrieve.
   * @returns The value associated with the key wrapped with Optional.some, or `Optional.none` if the key does not exist.
   */
  get: (key: K | (WidenLiteral<K> & {})) => Optional<V>;

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
    ) => this is IMap<K, W>);

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
   * @returns A new IMap instance without the specified key.
   */
  delete: (key: K) => IMap<K, V>;

  /**
   * Sets a key-value pair in the map.
   * @param key The key to set.
   * @param value The value to associate with the key.
   * @returns A new IMap instance with the specified key-value pair.
   */
  set: (key: K, value: V) => IMap<K, V>;

  /**
   * Updates the value associated with a key using an updater function.
   * @param key The key whose value to update.
   * @param updater A function that takes the current value and returns the new value.
   * @returns A new IMap instance with the updated value.
   */
  update: (key: K, updater: (value: V) => V) => IMap<K, V>;

  /**
   * Applies a series of mutations to the map.
   * @param actions An array of mutation actions (delete, set, or update).
   * @returns A new IMap instance with all mutations applied.
   */
  withMutations: (
    actions: readonly Readonly<
      | { type: 'delete'; key: K }
      | { type: 'set'; key: K; value: V }
      | { type: 'update'; key: K; updater: (value: V) => V }
    >[],
  ) => IMap<K, V>;

  // Sequence algorithms

  /**
   * Maps the values of the map to new values.
   * @template V2 The type of the new values.
   * @param mapFn A function that maps a value and key to a new value.
   * @returns A new IMap instance with mapped values.
   */
  map: <V2>(mapFn: (value: V, key: K) => V2) => IMap<K, V2>;

  /**
   * Maps the keys of the map to new keys.
   * @template K2 The type of the new keys.
   * @param mapFn A function that maps a key to a new key.
   * @returns A new IMap instance with mapped keys and original values.
   */
  mapKeys: <K2 extends MapSetKeyType>(mapFn: (key: K) => K2) => IMap<K2, V>;

  /**
   * Maps the entries (key-value pairs) of the map to new entries.
   * @template K2 The type of the new keys in the entries.
   * @template V2 The type of the new values in the entries.
   * @param mapFn A function that maps an entry to a new entry.
   * @returns A new IMap instance with mapped entries.
   */
  mapEntries: <K2 extends MapSetKeyType, V2>(
    mapFn: (entry: readonly [K, V]) => readonly [K2, V2],
  ) => IMap<K2, V2>;

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
  toRawMap: () => ReadonlyMap<K, V>;
}>;

/**
 * Represents an immutable map.
 * It is iterable and provides various methods for manipulation and querying.
 * @template K The type of the keys in the map.
 * @template V The type of the values in the map.
 * @example
 * ```typescript
 * let map: IMap<string, number> = IMap.new<string, number>([["a", 1], ["b", 2]]);
 *
 * console.log(map.get("a").unwrapOr(-1)); // Output: 1
 * console.log(map.size); // Output: 2
 *
 * map = map.set("c", 3);
 * console.log(map.has("c")); // Output: true
 *
 * for (const [key, value] of map) {
 *   console.log(`Key: ${key}, Value: ${value}`);
 * }
 * // Output:
 * // Key: a, Value: 1
 * // Key: b, Value: 2
 * // Key: c, Value: 3
 *
 * const numberMap: IMap<number, string> = IMap.new([[1, "one"], [2, "two"]]);
 * console.log(numberMap.get(2).unwrapOr("not found")); // Output: "two"
 * ```
 */
export type IMap<K extends MapSetKeyType, V> = Iterable<readonly [K, V]> &
  IMapInterface<K, V>;

/**
 * Provides utility functions for IMap.
 */
export const IMap = {
  /**
   * Creates a new IMap instance.
   * @template K The type of the keys.
   * @template V The type of the values.
   * @param iterable An iterable of key-value pairs.
   * @returns A new IMap instance.
   * @example
   * ```typescript
   * const mapFromStringPairs = IMap.new<string, number>([["one", 1], ["two", 2]]);
   * console.log(mapFromStringPairs.get("one").unwrap()); // Output: 1
   *
   * const mapFromNumberPairs = IMap.new<number, string>([[10, "ten"], [20, "twenty"]]);
   * console.log(mapFromNumberPairs.get(20).unwrap()); // Output: "twenty"
   *
   * // Can also be created from another Map or IMap
   * const existingJsMap = new Map([["a", 100], ["b", 200]]);
   * const iMapFromJsMap = IMap.new(existingJsMap);
   * console.log(iMapFromJsMap.get("b").unwrap()); // Output: 200
   *
   * const anotherIMap = IMap.new<string, boolean>([["active", true]]);
   * const iMapFromIMap = IMap.new(anotherIMap);
   * console.log(iMapFromIMap.get("active").unwrap()); // Output: true
   * ```
   */
  new: <K extends MapSetKeyType, V>(
    iterable: Iterable<readonly [K, V]>,
  ): IMap<K, V> => new IMapClass<K, V>(iterable),

  /**
   * Checks if two IMap instances are equal.
   * Equality is determined by having the same size and all key-value pairs being equal.
   * @template K The type of the keys.
   * @template V The type of the values.
   * @param a The first IMap instance.
   * @param b The second IMap instance.
   * @returns `true` if the maps are equal, `false` otherwise.
   * @example
   * ```typescript
   * const map1 = IMap.new<string, number>([["a", 1], ["b", 2]]);
   * const map2 = IMap.new<string, number>([["a", 1], ["b", 2]]);
   * const map3 = IMap.new<string, number>([["a", 1], ["c", 3]]);
   * const map4 = IMap.new<string, number>([["a", 1], ["b", 99]]);
   * const map5 = IMap.new<string, number>([["b", 2], ["a", 1]]); // Order doesn't matter for equality
   *
   * console.log(IMap.equal(map1, map2)); // Output: true
   * console.log(IMap.equal(map1, map3)); // Output: false (different keys/values)
   * console.log(IMap.equal(map1, map4)); // Output: false (different value for key "b")
   * console.log(IMap.equal(map1, map5)); // Output: true
   *
   * const mapNum1 = IMap.new<number, string>([[1, "x"], [2, "y"]]);
   * const mapNum2 = IMap.new<number, string>([[2, "y"], [1, "x"]]);
   * console.log(IMap.equal(mapNum1, mapNum2)); // Output: true
   * ```
   */
  equal: <K extends MapSetKeyType, V>(a: IMap<K, V>, b: IMap<K, V>): boolean =>
    a.size === b.size && a.every((v, k) => b.get(k) === v),
};

/**
 * Class implementation for IMap.
 * @template K The type of the keys.
 * @template V The type of the values.
 * @implements IMap
 * @implements Iterable
 */
class IMapClass<K extends MapSetKeyType, V>
  implements IMap<K, V>, Iterable<readonly [K, V]>
{
  readonly #map: ReadonlyMap<K, V>;
  readonly #showNotFoundMessage: boolean;

  /**
   * Constructs an IMapClass instance.
   * @param iterable An iterable of key-value pairs.
   * @param showNotFoundMessage Whether to show a detailed message when a key is not found during get() operations. Defaults to false.
   */
  constructor(
    iterable: Iterable<readonly [K, V]>,
    showNotFoundMessage: boolean = false,
  ) {
    this.#map = new Map(iterable);
    this.#showNotFoundMessage = showNotFoundMessage;
  }

  /** @inheritdoc */
  get size(): number {
    return this.#map.size;
  }

  /** @inheritdoc */
  has(key: K | (WidenLiteral<K> & {})): boolean {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    return this.#map.has(key as K);
  }

  /** @inheritdoc */
  get(key: K | (WidenLiteral<K> & {})): Optional<V> {
    if (!this.has(key)) return Optional.none;
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion, @typescript-eslint/no-non-null-assertion
    return Optional.some(this.#map.get(key as K)!);
  }

  /** @inheritdoc */
  every<W extends V>(
    predicate: (value: V, key: K) => value is W,
  ): this is IMap<K, W>;
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
  delete(key: K): IMap<K, V> {
    if (!this.has(key)) {
      if (this.#showNotFoundMessage) {
        const keyStr = unknownToString(key);
        console.warn(
          `IMap.delete: key not found: ${Result.isOk(keyStr) ? keyStr.value : '<error converting key to string>'}`,
        );
      }
      return this;
    }

    return IMap.new(Array.from(this.#map).filter(([k]) => !Object.is(k, key)));
  }

  /** @inheritdoc */
  set(key: K, value: V): IMap<K, V> {
    if (value === this.get(key)) return this; // has no changes
    if (!this.has(key)) {
      return IMap.new([...this.#map, tp(key, value)]);
    } else {
      return IMap.new(
        Array.from(this.#map, ([k, v]) => tp(k, Object.is(k, key) ? value : v)),
      );
    }
  }

  /** @inheritdoc */
  update(key: K, updater: (value: V) => V): IMap<K, V> {
    const curr = this.get(key);

    if (Optional.isNone(curr)) {
      if (this.#showNotFoundMessage) {
        const keyStr = unknownToString(key);
        console.warn(
          `IMap.update: key not found: ${Result.isOk(keyStr) ? keyStr.value : '<error converting key to string>'}`,
        );
      }
      return this;
    }

    return IMap.new(
      Array.from(this.#map, ([k, v]) =>
        tp(k, Object.is(k, key) ? updater(curr.value) : v),
      ),
    );
  }

  /** @inheritdoc */
  withMutations(
    actions: readonly Readonly<
      | { type: 'delete'; key: K }
      | { type: 'set'; key: K; value: V }
      | { type: 'update'; key: K; updater: (value: V) => V }
    >[],
  ): IMap<K, V> {
    const mut_result = new Map<K, V>(this.#map);

    for (const action of actions) {
      switch (action.type) {
        case 'delete':
          mut_result.delete(action.key);
          break;

        case 'set':
          mut_result.set(action.key, action.value);
          break;

        case 'update': {
          const { key } = action;

          const curr = mut_result.get(key);

          if (!mut_result.has(key) || curr === undefined) {
            if (this.#showNotFoundMessage) {
              const keyStr = unknownToString(key);
              console.warn(
                `IMap.withMutations: key not found: ${Result.isOk(keyStr) ? keyStr.value : '<error converting key to string>'}`,
              );
            }
            break;
          }

          mut_result.set(key, action.updater(curr));

          break;
        }
      }
    }

    return IMap.new(mut_result);
  }

  /** @inheritdoc */
  map<V2>(mapFn: (value: V, key: K) => V2): IMap<K, V2> {
    return IMap.new(this.toArray().map(([k, v]) => tp(k, mapFn(v, k))));
  }

  /** @inheritdoc */
  mapKeys<K2 extends MapSetKeyType>(mapFn: (key: K) => K2): IMap<K2, V> {
    return IMap.new(this.toArray().map(([k, v]) => tp(mapFn(k), v)));
  }

  /** @inheritdoc */
  mapEntries<K2 extends MapSetKeyType, V2>(
    mapFn: (entry: readonly [K, V]) => readonly [K2, V2],
  ): IMap<K2, V2> {
    return IMap.new(this.toArray().map(mapFn));
  }

  /** @inheritdoc */
  forEach(callbackfn: (value: V, key: K) => void): void {
    for (const [key, value] of this.#map.entries()) {
      callbackfn(value, key);
    }
  }

  /**
   * @inheritdoc
   */
  [Symbol.iterator](): Iterator<readonly [K, V]> {
    return this.#map[Symbol.iterator]();
  }

  /** @inheritdoc */
  keys(): IterableIterator<K> {
    return this.#map.keys();
  }

  /** @inheritdoc */
  values(): IterableIterator<V> {
    return this.#map.values();
  }

  /** @inheritdoc */
  entries(): IterableIterator<readonly [K, V]> {
    return this.#map.entries();
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
  toRawMap(): ReadonlyMap<K, V> {
    return this.#map;
  }
}
