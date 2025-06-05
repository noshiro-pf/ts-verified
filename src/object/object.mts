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
const shallowEq = (
  a: ReadonlyRecord<string, Primitive>,
  b: ReadonlyRecord<string, Primitive>,
): boolean => {
  const aEntries = Object.entries(a);
  const bEntries = Object.entries(b);

  if (aEntries.length !== bEntries.length) return false;

  return aEntries.every(([k, v]) => b[k] === v);
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
 * const original = { a: 1, b: 2, c: 3, d: 4 };
 *
 * Obj.pick(original, ['a', 'c']); // { a: 1, c: 3 }
 * Obj.pick(original, ['b']); // { b: 2 }
 * Obj.pick(original, []); // {}
 *
 * // With typed objects
 * const user = { id: 1, name: "Alice", email: "alice@example.com", age: 30 };
 * const publicUser = Obj.pick(user, ['id', 'name']); // { id: 1, name: "Alice" }
 *
 * // Type safety - only valid keys are allowed
 * // Obj.pick(user, ['invalidKey']); // TypeScript error
 * ```
 */
const pick = <
  const R extends UnknownRecord,
  const Keys extends readonly (keyof R)[],
>(
  record: R,
  keys: Keys,
): Pick<R, ArrayElement<Keys>> => {
  const keysSet = new Set<keyof R>(keys);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return Object.fromEntries(
    Object.entries(record).filter(([k, _v]) => keysSet.has(k)),
  ) as never;
};

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
 * const original = { a: 1, b: 2, c: 3, d: 4 };
 *
 * Obj.omit(original, ['a', 'c']); // { b: 2, d: 4 }
 * Obj.omit(original, ['b']); // { a: 1, c: 3, d: 4 }
 * Obj.omit(original, []); // { a: 1, b: 2, c: 3, d: 4 } (no keys omitted)
 *
 * // With typed objects
 * const user = { id: 1, name: "Alice", email: "alice@example.com", password: "secret" };
 * const safeUser = Obj.omit(user, ['password']); // { id: 1, name: "Alice", email: "alice@example.com" }
 *
 * // Remove multiple sensitive fields
 * const publicData = Obj.omit(user, ['password', 'email']); // { id: 1, name: "Alice" }
 *
 * // Type safety - only valid keys are allowed
 * // Obj.omit(user, ['invalidKey']); // TypeScript error
 * ```
 */
const omit = <
  const R extends UnknownRecord,
  const Keys extends readonly (keyof R)[],
>(
  record: R,
  keys: Keys,
): Omit<R, ArrayElement<Keys>> => {
  const keysSet = new Set<keyof R>(keys);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return Object.fromEntries(
    Object.entries(record).filter(([k, _v]) => !keysSet.has(k)),
  ) as never;
};

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
const fromEntries = <
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
      // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
    > => Object.fromEntries(entries) as never;

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
   * @note 上の2個目の例に対応するためには、無限長の Entries に対しても再帰を回す必要があるが、
   * 止めるタイミングを決められないので再帰制限を設けている。
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

/**
 * A collection of object utility functions.
 */
export const Obj = {
  shallowEq,
  pick,
  omit,
  fromEntries,
} as const;
