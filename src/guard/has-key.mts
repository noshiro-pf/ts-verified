/**
 * Type guard function that checks if an object has a specific key.
 *
 * This function uses `Object.hasOwn()` to check if the given object has the specified key
 * as its own property (not inherited). It acts as a type guard, narrowing the type of the
 * object to include the specified key with an `unknown` value type.
 *
 * @template R - The type of the input object, must extend UnknownRecord
 * @template K - The type of the key to check for, must extend PropertyKey
 * @param obj - The object to check for the presence of the key
 * @param key - The key to check for in the object
 * @returns A boolean indicating whether the object has the specified key as its own property.
 *          When true, TypeScript will narrow the type to `R & Record<K, unknown>`
 *
 * @example
 * ```typescript
 * const obj = { a: 1, b: 'hello' };
 *
 * if (hasKey(obj, 'a')) {
 *   // obj is now typed as { a: 1, b: 'hello' } & Record<'a', unknown>
 *   console.log(obj.a); // TypeScript knows 'a' exists
 * }
 *
 * if (hasKey(obj, 'c')) {
 *   // This block won't execute, but if it did:
 *   // obj would be typed as { a: 1, b: 'hello' } & Record<'c', unknown>
 *   console.log(obj.c); // TypeScript would know 'c' exists
 * }
 * ```
 *
 * @example
 * ```typescript
 * // Working with dynamic keys
 * const dynamicObj: Record<string, unknown> = { x: 10, y: 20 };
 * const keyToCheck = 'x' as const;
 *
 * if (hasKey(dynamicObj, keyToCheck)) {
 *   // dynamicObj is now typed to include the specific key
 *   console.log(dynamicObj.x); // Safe access
 * }
 * ```
 */
export const hasKey = <
  const R extends UnknownRecord,
  const K extends PropertyKey,
>(
  obj: R,
  key: K,
): obj is HasKeyReturnType<R, K> => Object.hasOwn(obj, key);

/**
 * @internal
 * When R is a union type (including the case with only one element), if any element in the union
 * contains K as a key, returns a type that narrows the union to only those elements that contain K as a key.
 * If none of the elements in the union contain K as a key, returns `MutableRecord<K, unknown>`.
 * The result is made readonly.
 */
export type HasKeyReturnType<
  R extends UnknownRecord,
  K extends PropertyKey,
> = R extends R // union distribution
  ? K extends keyof R
    ? string extends keyof R
      ? MutableRecord<K, R[keyof R]> & R
      : number extends keyof R
        ? MutableRecord<K, R[keyof R]> & R
        : symbol extends keyof R
          ? MutableRecord<K, R[keyof R]> & R
          : R
    : never // omit union member that does not have key K
  : never; // dummy case for union distribution
