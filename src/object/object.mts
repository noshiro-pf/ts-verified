/**
 * A collection of object utility functions.
 */
export namespace Obj {
  /**
   * Performs a shallow equality check on two records.
   * It verifies that both records have the same number of entries and that for every key in the first record,
   * the corresponding value is strictly equal (`===`) to the value in the second record.
   * Note: This function assumes that the values in the records are primitives.
   *
   * @param a The first record, with string keys and primitive values.
   * @param b The second record, with string keys and primitive values.
   * @returns `true` if the records are shallowly equal, `false` otherwise.
   * @example
   * ```typescript
   * Obj.shallowEq({ x: 1, y: 2 }, { x: 1, y: 2 }); // true
   * Obj.shallowEq({ x: 1 }, { x: 1, y: 2 }); // false (different number of keys)
   * Obj.shallowEq({ x: 1 }, { x: 2 }); // false (different values)
   * Obj.shallowEq({}, {}); // true (both empty)
   * Obj.shallowEq({ a: "hello" }, { a: "hello" }); // true
   * Obj.shallowEq({ a: "hello" }, { a: "world" }); // false
   * ```
   */
  export const shallowEq = (
    a: UnknownRecord,
    b: UnknownRecord,
    eq: (x: unknown, y: unknown) => boolean = Object.is,
  ): boolean => {
    const aEntries = Object.entries(a);
    const bEntries = Object.entries(b);

    if (aEntries.length !== bEntries.length) return false;

    return aEntries.every(([k, v]) => eq(b[k], v));
  };

  /**
   * Creates a new record that contains only the specified `keys` of `record` and omits the rest.
   * Returns a new object with only the properties whose keys are included in the `keys` array.
   *
   * @template R The type of the input record.
   * @template Keys The array type of keys to pick from the record.
   * @param record The source record to pick properties from.
   * @param keys An array of keys to include in the result.
   * @returns A new record containing only the specified keys and their values.
   * @example
   * ```typescript
   * // Regular usage
   * const original = { a: 1, b: 2, c: 3, d: 4 };
   * Obj.pick(original, ['a', 'c']); // { a: 1, c: 3 }
   * Obj.pick(original, ['b']); // { b: 2 }
   * Obj.pick(original, []); // {}
   *
   * // With typed objects
   * const user = { id: 1, name: "Alice", email: "alice@example.com", age: 30 };
   * const publicUser = Obj.pick(user, ['id', 'name']); // { id: 1, name: "Alice" }
   *
   * // Curried usage for pipe composition
   * const pickIdAndName = Obj.pick(['id', 'name'] as const);
   * const result = pipe(user).map(pickIdAndName).value; // { id: 1, name: "Alice" }
   *
   * // Type safety - only valid keys are allowed
   * // Obj.pick(user, ['invalidKey']); // TypeScript error
   * ```
   */
  export function pick<
    const R extends UnknownRecord,
    const Keys extends readonly (keyof R)[],
  >(record: R, keys: Keys): Pick<R, ArrayElement<Keys>>;
  export function pick<const Keys extends readonly PropertyKey[]>(
    keys: Keys,
  ): <const R extends Record<ArrayElement<Keys>, unknown>>(
    record: R,
  ) => Pick<R, ArrayElement<Keys>>;
  export function pick<
    const R extends UnknownRecord,
    const Keys extends readonly (keyof R)[],
  >(
    ...args:
      | readonly [record: R, keys: Keys]
      | readonly [keys: readonly PropertyKey[]]
  ):
    | Pick<R, ArrayElement<Keys>>
    | ((record: R) => Pick<R, ArrayElement<Keys>>) {
    if (args.length === 2) {
      const [record, keys] = args;

      const keysSet = new Set<keyof R>(keys);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return Object.fromEntries(
        Object.entries(record).filter(([k, _v]) => keysSet.has(k)),
      ) as never;
    } else {
      const [keys] = args;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      const keysSet = new Set<keyof R>(keys as (keyof R)[]);

      return (record) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        Object.fromEntries(
          Object.entries(record).filter(([k, _v]) => keysSet.has(k)),
        ) as never;
    }
  }

  /**
   * Creates a new record that omits the specified `keys` of `record` and contains the rest.
   * Returns a new object with all properties except those whose keys are included in the `keys` array.
   *
   * @template R The type of the input record.
   * @template Keys The array type of keys to omit from the record.
   * @param record The source record to omit properties from.
   * @param keys An array of keys to exclude from the result.
   * @returns A new record containing all properties except the specified keys.
   * @example
   * ```typescript
   * // Regular usage
   * const original = { a: 1, b: 2, c: 3, d: 4 };
   * Obj.omit(original, ['a', 'c']); // { b: 2, d: 4 }
   * Obj.omit(original, ['b']); // { a: 1, c: 3, d: 4 }
   * Obj.omit(original, []); // { a: 1, b: 2, c: 3, d: 4 } (no keys omitted)
   *
   * // With typed objects
   * const user = { id: 1, name: "Alice", email: "alice@example.com", password: "secret" };
   * const safeUser = Obj.omit(user, ['password']); // { id: 1, name: "Alice", email: "alice@example.com" }
   *
   * // Curried usage for pipe composition
   * const omitSensitive = Obj.omit(['password', 'email'] as const);
   * const result = pipe(user).map(omitSensitive).value; // { id: 1, name: "Alice" }
   *
   * // Type safety - only valid keys are allowed
   * // Obj.omit(user, ['invalidKey']); // TypeScript error
   * ```
   */
  export function omit<
    const R extends UnknownRecord,
    const Keys extends readonly (keyof R)[],
  >(record: R, keys: Keys): Omit<R, ArrayElement<Keys>>;
  export function omit<const Keys extends readonly PropertyKey[]>(
    keys: Keys,
  ): <const R extends Record<ArrayElement<Keys>, unknown>>(
    record: R,
  ) => Omit<R, ArrayElement<Keys>>;
  export function omit<
    const R extends UnknownRecord,
    const Keys extends readonly (keyof R)[],
  >(
    ...args:
      | readonly [record: R, keys: Keys]
      | readonly [keys: readonly PropertyKey[]]
  ):
    | Omit<R, ArrayElement<Keys>>
    | ((record: R) => Omit<R, ArrayElement<Keys>>) {
    if (args.length === 2) {
      const [record, keys] = args;

      const keysSet = new Set<keyof R>(keys);

      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      return Object.fromEntries(
        Object.entries(record).filter(([k, _v]) => !keysSet.has(k)),
      ) as never;
    } else {
      const [keys] = args;

      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
      const keysSet = new Set<keyof R>(keys as (keyof R)[]);

      return (record) =>
        // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
        Object.fromEntries(
          Object.entries(record).filter(([k, _v]) => !keysSet.has(k)),
        ) as never;
    }
  }

  /**
   * Returns an object created by key-value entries for properties and methods
   *
   * @param entries An iterable object that contains key-value entries for properties and methods.
   * ```ts
   * const entries = [
   *   ['x', 1],
   *   ['y', 3],
   * ] as const satisfies [['x', 1], ['y', 3]];
   *
   * const obj = Object.fromEntries(entries) satisfies { x: 1; y: 3 };
   * ```
   *
   * @note When `entries` is a tuple type, the type reflects the key-value combinations.
   * Otherwise, when `K` is a union type, since `entries` may not cover all union members,
   * `Partial` is applied to prevent the return type of `fromEntries` from incorrectly
   * including all union elements.
   */
  export const fromEntries = <
    const Entries extends readonly (readonly [PropertyKey, unknown])[],
  >(
    entries: Entries,
  ): IsFixedLengthList<Entries> extends true
    ? TsVerifiedInternals.EntriesToObject<Entries>
    : TsVerifiedInternals.PartialIfKeyIsUnion<
        TsVerifiedInternals.KeysOfEntries<Entries>,
        Record<
          TsVerifiedInternals.KeysOfEntries<Entries>,
          TsVerifiedInternals.ValuesOfEntries<Entries>
        >
      > =>
    // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    Object.fromEntries(entries) as never;

  /**
   * @internal
   * Internal type utilities for the Obj module.
   */
  declare namespace TsVerifiedInternals {
    type RecursionLimit = 20;

    /**
     * - `[['x', 1], ['y', 3]]` -> `{ x: 1, y: 3 }`
     */
    export type EntriesToObject<
      Entries extends readonly (readonly [PropertyKey, unknown])[],
      // eslint-disable-next-line @typescript-eslint/no-empty-object-type
    > = Readonly<EntriesToObjectImpl<{}, Entries>>;

    /** @internal */
    type EntriesToObjectImpl<
      R,
      Entries extends readonly (readonly [PropertyKey, unknown])[],
    > =
      TypeEq<Entries['length'], 0> extends true
        ? R
        : EntriesToObjectImpl<
            R & Readonly<Record<Entries[0][0], Entries[0][1]>>,
            List.Tail<Entries>
          >;

    /**
     * - `['x' | 'y' | 'z', number][]]` -> `'x' | 'y' | 'z'`
     * - `[['a' | 'b' | 'c', number], ...['x' | 'y' | 'z', number][]]` -> `'a' | 'b' |
     *   'c' | 'x' | 'y' | 'z'`
     *
     * @note To handle the second example above, recursion needs to be performed on infinite-length Entries,
     * but since the timing to stop cannot be determined, a recursion limit is set.
     */
    export type KeysOfEntries<
      Entries extends readonly (readonly [PropertyKey, unknown])[],
    > = KeysOfEntriesImpl<never, Entries, RecursionLimit>;

    type KeysOfEntriesImpl<
      K,
      Entries extends readonly (readonly [PropertyKey, unknown])[],
      RemainingNumRecursions extends number,
    > =
      TypeEq<RemainingNumRecursions, 0> extends true
        ? K
        : TypeEq<Entries['length'], 0> extends true
          ? K
          : KeysOfEntriesImpl<
              K | Entries[0][0],
              List.Tail<Entries>,
              Decrement<RemainingNumRecursions>
            >;

    export type ValuesOfEntries<
      Entries extends readonly (readonly [PropertyKey, unknown])[],
    > = ValuesOfEntriesImpl<never, Entries, RecursionLimit>;

    type ValuesOfEntriesImpl<
      K,
      Entries extends readonly (readonly [PropertyKey, unknown])[],
      RemainingNumRecursions extends number,
    > =
      TypeEq<RemainingNumRecursions, 0> extends true
        ? K
        : TypeEq<Entries['length'], 0> extends true
          ? K
          : ValuesOfEntriesImpl<
              K | Entries[0][1],
              List.Tail<Entries>,
              Decrement<RemainingNumRecursions>
            >;

    export type PartialIfKeyIsUnion<K, T> =
      IsUnion<K> extends true ? Partial<T> : T;
  }
}
