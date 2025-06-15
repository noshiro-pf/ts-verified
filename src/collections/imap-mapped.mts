import { Optional, pipe } from '../functional/index.mjs';
import { asUint32 } from '../number/index.mjs';
import { tp } from '../others/index.mjs';

/**
 * Interface for an immutable map with custom key mapping and O(1) lookup performance.
 *
 * IMapMapped allows you to use complex objects as keys by providing transformation functions
 * that convert between your custom key type `K` and a primitive `MapSetKeyType` `KM` that can
 * be efficiently stored in JavaScript's native Map. This enables high-performance operations
 * on maps with complex keys while maintaining type safety and immutability.
 *
 * **Key Features:**
 * - **Custom Key Types**: Use any type as keys by providing `toKey`/`fromKey` functions
 * - **O(1) Performance**: Maintains O(1) average-case performance for core operations
 * - **Immutable**: All operations return new instances, preserving immutability
 * - **Type Safe**: Full TypeScript support with generic key/value types
 *
 * **Performance Characteristics:**
 * - get/has/delete: O(1) average case (plus key transformation overhead)
 * - set: O(1) average case (plus key transformation overhead)
 * - map/filter operations: O(n)
 * - Iteration: O(n) (plus key transformation overhead)
 *
 * @template K The type of the custom keys in the map.
 * @template V The type of the values in the map.
 * @template KM The type of the mapped primitive keys (string, number, etc.).
 *
 * @example
 * ```typescript
 * // Example with complex object keys
 * type UserId = { department: string; employeeId: number };
 *
 * // Define transformation functions
 * const userIdToKey = (id: UserId): string => `${id.department}:${id.employeeId}`;
 * const keyToUserId = (key: string): UserId => {
 *   const [department, employeeId] = key.split(':');
 *   return { department, employeeId: Number(employeeId) };
 * };
 *
 * declare const userMap: IMapMapped<UserId, UserProfile, string>;
 *
 * // All operations work with the complex key type
 * const userId: UserId = { department: "engineering", employeeId: 123 };
 * const hasUser = userMap.has(userId);                    // O(1)
 * const profile = userMap.get(userId).unwrapOr(defaultProfile); // O(1)
 * const updated = userMap.set(userId, newProfile);        // O(1) - returns new IMapMapped
 * ```
 */
type IMapMappedInterface<K, V, KM extends MapSetKeyType> = Readonly<{
  // Getting information

  /** The number of elements in the map. */
  size: SizeType.Arr;

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
 * Represents an immutable map with custom key transformation and high-performance operations.
 *
 * IMapMapped is a specialized persistent data structure that enables using complex objects as map keys
 * while maintaining the performance benefits of JavaScript's native Map. It achieves this by requiring
 * bidirectional transformation functions that convert between your custom key type and a primitive type
 * that can be efficiently stored and compared.
 *
 * **Key Features:**
 * - **Complex Keys**: Use objects, arrays, or any custom type as map keys
 * - **High Performance**: O(1) operations through efficient key transformation
 * - **Immutable**: All mutation operations return new instances
 * - **Type Safe**: Full TypeScript support with compile-time key/value type checking
 * - **Bidirectional**: Maintains ability to reconstruct original keys from mapped keys
 *
 * **Use Cases:**
 * - Maps with composite keys (e.g., coordinates, user IDs with metadata)
 * - Caching with complex cache keys
 * - State management where entities have multi-part identifiers
 * - Performance-critical maps with non-primitive keys
 *
 * @template K The type of the custom keys in the map.
 * @template V The type of the values in the map.
 * @template KM The type of the mapped primitive keys (string, number, etc.).
 *
 * @example
 * ```typescript
 * // Example: Product catalog with composite keys
 * type ProductKey = { brand: string; model: string; year: number };
 * type Product = { name: string; price: number; inStock: boolean };
 *
 * // Define bidirectional transformation functions
 * const productKeyToString = (key: ProductKey): string =>
 *   `${key.brand}|${key.model}|${key.year}`;
 *
 * const stringToProductKey = (str: string): ProductKey => {
 *   const [brand, model, yearStr] = str.split('|');
 *   return { brand, model, year: Number(yearStr) };
 * };
 *
 * // Create a map with complex keys
 * let catalog = IMapMapped.create<ProductKey, Product, string>(
 *   [],
 *   productKeyToString,
 *   stringToProductKey
 * );
 *
 * // Use complex objects as keys naturally
 * const toyotaCamry2023: ProductKey = { brand: "Toyota", model: "Camry", year: 2023 };
 * const hondaAccord2022: ProductKey = { brand: "Honda", model: "Accord", year: 2022 };
 *
 * catalog = catalog
 *   .set(toyotaCamry2023, { name: "Toyota Camry 2023", price: 28000, inStock: true })
 *   .set(hondaAccord2022, { name: "Honda Accord 2022", price: 26500, inStock: false });
 *
 * // All operations work with the original key type
 * console.log(catalog.get(toyotaCamry2023).unwrapOr(notFound).name);
 * // Output: "Toyota Camry 2023"
 *
 * console.log(catalog.has(hondaAccord2022)); // Output: true
 * console.log(catalog.size); // Output: 2
 *
 * // Iteration preserves original key types
 * for (const [productKey, product] of catalog) {
 *   console.log(`${productKey.brand} ${productKey.model} (${productKey.year}): $${product.price}`);
 * }
 * // Output:
 * // Toyota Camry (2023): $28000
 * // Honda Accord (2022): $26500
 *
 * // Functional transformations work seamlessly
 * const discountedCatalog = catalog.map((product, key) => ({
 *   ...product,
 *   price: Math.round(product.price * 0.9) // 10% discount
 * }));
 * ```
 */
export type IMapMapped<K, V, KM extends MapSetKeyType> = Iterable<
  readonly [K, V]
> &
  IMapMappedInterface<K, V, KM>;

/**
 * Provides utility functions for IMapMapped.
 */
export namespace IMapMapped {
  /**
   * Creates a new IMapMapped instance with custom key transformation functions.
   *
   * This factory function creates an immutable map that can use complex objects as keys
   * by providing bidirectional transformation functions. The `toKey` function converts
   * your custom key type to a primitive type that can be efficiently stored, while
   * `fromKey` reconstructs the original key type for iteration and access.
   *
   * **Performance:** O(n) where n is the number of entries in the iterable.
   *
   * @template K The type of the custom keys.
   * @template V The type of the values.
   * @template KM The type of the mapped primitive keys.
   * @param iterable An iterable of key-value pairs using the custom key type.
   * @param toKey A function that converts a custom key `K` to a primitive key `KM`.
   *              This function must be deterministic and produce unique values for unique keys.
   * @param fromKey A function that converts a primitive key `KM` back to the custom key `K`.
   *                This should be the inverse of `toKey`.
   * @returns A new IMapMapped instance containing all entries from the iterable.
   *
   * @example
   * ```typescript
   * // Example 1: Geographic coordinates as keys
   * type Coordinate = { lat: number; lng: number };
   * type LocationInfo = { name: string; population: number };
   *
   * const coordToString = (coord: Coordinate): string => `${coord.lat},${coord.lng}`;
   * const stringToCoord = (str: string): Coordinate => {
   *   const [lat, lng] = str.split(',').map(Number);
   *   return { lat, lng };
   * };
   *
   * const locationMap = IMapMapped.create<Coordinate, LocationInfo, string>(
   *   [
   *     [{ lat: 40.7128, lng: -74.0060 }, { name: "New York", population: 8000000 }],
   *     [{ lat: 34.0522, lng: -118.2437 }, { name: "Los Angeles", population: 4000000 }]
   *   ],
   *   coordToString,
   *   stringToCoord
   * );
   *
   * const nyCoord = { lat: 40.7128, lng: -74.0060 };
   * console.log(locationMap.get(nyCoord).unwrap().name); // Output: "New York"
   *
   * // Example 2: Multi-part business keys
   * type OrderId = { customerId: string; year: number; orderNumber: number };
   *
   * const orderIdToKey = (id: OrderId): string =>
   *   `${id.customerId}:${id.year}:${id.orderNumber}`;
   *
   * const keyToOrderId = (key: string): OrderId => {
   *   const [customerId, yearStr, orderNumStr] = key.split(':');
   *   return {
   *     customerId,
   *     year: Number(yearStr),
   *     orderNumber: Number(orderNumStr)
   *   };
   * };
   *
   * const orderMap = IMapMapped.create<OrderId, Order, string>(
   *   [],
   *   orderIdToKey,
   *   keyToOrderId
   * );
   *
   * // Example 3: Simple case with string keys (identity transformation)
   * const simpleMap = IMapMapped.create<string, number, string>(
   *   [["key1", 100], ["key2", 200]],
   *   (s) => s,  // identity function
   *   (s) => s   // identity function
   * );
   *
   * // Example 4: From existing data structures
   * const existingEntries = new Map([
   *   [{ id: 1, type: "user" }, { name: "Alice", active: true }],
   *   [{ id: 2, type: "user" }, { name: "Bob", active: false }]
   * ]);
   *
   * type EntityKey = { id: number; type: string };
   * const entityKeyToString = (key: EntityKey): string => `${key.type}_${key.id}`;
   * const stringToEntityKey = (str: string): EntityKey => {
   *   const [type, idStr] = str.split('_');
   *   return { type, id: Number(idStr) };
   * };
   *
   * const entityMap = IMapMapped.create<EntityKey, Entity, string>(
   *   existingEntries,
   *   entityKeyToString,
   *   stringToEntityKey
   * );
   * ```
   */
  export const create = <K, V, KM extends MapSetKeyType>(
    iterable: Iterable<readonly [K, V]>,
    toKey: (a: K) => KM,
    fromKey: (k: KM) => K,
  ): IMapMapped<K, V, KM> =>
    new IMapMappedClass<K, V, KM>(iterable, toKey, fromKey);

  /**
   * Checks if two IMapMapped instances are structurally equal.
   *
   * Two IMapMapped instances are considered equal if they have the same size and contain
   * exactly the same key-value pairs. The comparison is performed on the underlying mapped
   * keys and values, so the transformation functions themselves don't need to be identical.
   * Values are compared using JavaScript's `===` operator.
   *
   * **Performance:** O(n) where n is the size of the smaller map.
   *
   * @template K The type of the custom keys.
   * @template V The type of the values.
   * @template KM The type of the mapped primitive keys.
   * @param a The first IMapMapped instance to compare.
   * @param b The second IMapMapped instance to compare.
   * @returns `true` if the maps contain exactly the same key-value pairs, `false` otherwise.
   *
   * @example
   * ```typescript
   * // Example with coordinate keys
   * type Point = { x: number; y: number };
   * const pointToString = (p: Point): string => `${p.x},${p.y}`;
   * const stringToPoint = (s: string): Point => {
   *   const [x, y] = s.split(',').map(Number);
   *   return { x, y };
   * };
   *
   * const map1 = IMapMapped.create<Point, string, string>(
   *   [[{ x: 1, y: 2 }, "point1"], [{ x: 3, y: 4 }, "point2"]],
   *   pointToString,
   *   stringToPoint
   * );
   *
   * const map2 = IMapMapped.create<Point, string, string>(
   *   [[{ x: 1, y: 2 }, "point1"], [{ x: 3, y: 4 }, "point2"]], // Same content
   *   pointToString,
   *   stringToPoint
   * );
   *
   * const map3 = IMapMapped.create<Point, string, string>(
   *   [[{ x: 1, y: 2 }, "point1"], [{ x: 3, y: 4 }, "different"]], // Different value
   *   pointToString,
   *   stringToPoint
   * );
   *
   * console.log(IMapMapped.equal(map1, map2)); // true
   * console.log(IMapMapped.equal(map1, map3)); // false (different value)
   *
   * // Order doesn't matter for equality
   * const map4 = IMapMapped.create<Point, string, string>(
   *   [[{ x: 3, y: 4 }, "point2"], [{ x: 1, y: 2 }, "point1"]], // Different order
   *   pointToString,
   *   stringToPoint
   * );
   *
   * console.log(IMapMapped.equal(map1, map4)); // true
   *
   * // Different transformation functions but same logical content
   * const alternativePointToString = (p: Point): string => `(${p.x},${p.y})`; // Different format
   * const alternativeStringToPoint = (s: string): Point => {
   *   const match = s.match(/\((\d+),(\d+)\)/);
   *   return { x: Number(match![1]), y: Number(match![2]) };
   * };
   *
   * const map5 = IMapMapped.create<Point, string, string>(
   *   [[{ x: 1, y: 2 }, "point1"], [{ x: 3, y: 4 }, "point2"]],
   *   alternativePointToString,
   *   alternativeStringToPoint
   * );
   *
   * // This would be false because the underlying mapped keys are different
   * // even though the logical content is the same
   * console.log(IMapMapped.equal(map1, map5)); // false
   *
   * // Empty maps
   * const empty1 = IMapMapped.create<Point, string, string>([], pointToString, stringToPoint);
   * const empty2 = IMapMapped.create<Point, string, string>([], pointToString, stringToPoint);
   * console.log(IMapMapped.equal(empty1, empty2)); // true
   * ```
   */
  export const equal = <K, V, KM extends MapSetKeyType>(
    a: IMapMapped<K, V, KM>,
    b: IMapMapped<K, V, KM>,
  ): boolean => a.size === b.size && a.every((v, k) => b.get(k) === v);
}

/**
 * Internal class implementation for IMapMapped providing immutable map operations with key transformation.
 *
 * This class implements the IMapMapped interface by maintaining a JavaScript Map with primitive keys
 * internally while exposing an API that works with custom key types. The transformation between
 * custom and primitive keys is handled transparently through the provided `toKey` and `fromKey` functions.
 *
 * **Implementation Details:**
 * - Uses ReadonlyMap<KM, V> internally where KM is the primitive key type
 * - Stores transformation functions for bidirectional key conversion
 * - Implements copy-on-write semantics for efficiency
 * - Provides optional debug messaging for development
 *
 * @template K The type of the custom keys.
 * @template V The type of the values.
 * @template KM The type of the mapped primitive keys.
 * @implements IMapMapped
 * @implements Iterable
 * @internal This class should not be used directly. Use IMapMapped.create() instead.
 */
class IMapMappedClass<K, V, KM extends MapSetKeyType>
  implements IMapMapped<K, V, KM>, Iterable<readonly [K, V]>
{
  readonly #map: ReadonlyMap<KM, V>;
  readonly #toKey: (a: K) => KM;
  readonly #fromKey: (k: KM) => K;
  readonly #showNotFoundMessage: boolean;

  /**
   * Constructs an IMapMappedClass instance with custom key transformation.
   *
   * @param iterable An iterable of key-value pairs using the custom key type K.
   * @param toKey A function that converts a custom key K to a primitive key KM.
   *              Must be deterministic and produce unique values for unique keys.
   * @param fromKey A function that converts a primitive key KM back to the custom key K.
   *                Should be the inverse of the toKey function.
   * @param showNotFoundMessage Whether to log warning messages when operations
   *                           are performed on non-existent keys. Useful for debugging.
   *                           Defaults to false for production use.
   * @internal Use IMapMapped.create() instead of calling this constructor directly.
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
  get size(): SizeType.Arr {
    return asUint32(this.#map.size);
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
        console.warn(
          `IMapMapped.delete: key not found: ${String(this.#toKey(key))}`,
        );
      }
      return this;
    }
    const keyMapped = this.#toKey(key);

    return IMapMapped.create(
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
      return IMapMapped.create(
        [...this.#map, tp(keyMapped, value)].map(([km, v]) =>
          tp(this.#fromKey(km), v),
        ),
        this.#toKey,
        this.#fromKey,
      );
    } else {
      return IMapMapped.create(
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
        console.warn(
          `IMapMapped.update: key not found: ${String(this.#toKey(key))}`,
        );
      }
      return this;
    }

    const keyMapped = this.#toKey(key);

    return IMapMapped.create(
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
                `IMapMapped.withMutations::update: key not found: ${String(key)}`,
              );
            }
            break;
          }

          mut_result.set(key, action.updater(curr));

          break;
        }
      }
    }

    return IMapMapped.create<K, V, KM>(
      Array.from(mut_result, ([k, v]) => [this.#fromKey(k), v]),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  map<V2>(mapFn: (value: V, key: K) => V2): IMapMapped<K, V2, KM> {
    return IMapMapped.create(
      this.toArray().map(([k, v]) => tp(k, mapFn(v, k))),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  mapKeys(mapFn: (key: K) => K): IMapMapped<K, V, KM> {
    return IMapMapped.create(
      this.toArray().map(([k, v]) => tp(mapFn(k), v)),
      this.#toKey,
      this.#fromKey,
    );
  }

  /** @inheritdoc */
  mapEntries<V2>(
    mapFn: (entry: readonly [K, V]) => readonly [K, V2],
  ): IMapMapped<K, V2, KM> {
    return IMapMapped.create(
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
