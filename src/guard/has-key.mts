/**
 * Type guard function that checks if an object has a specific key as its own property.
 *
 * This function uses `Object.hasOwn()` to check if the given object has the specified key
 * as its own property (not inherited). It acts as a type guard that narrows the type of the
 * object to guarantee the key exists, enabling type-safe property access.
 *
 * **Type Narrowing Behavior:**
 * - When the guard returns `true`, TypeScript narrows the object type to include the checked key
 * - For union types, only union members that contain the key are preserved
 * - The key's value type is preserved from the original object type when possible
 *
 * @template R - The type of the input object, must extend UnknownRecord
 * @template K - The type of the key to check for, must extend PropertyKey (string | number | symbol)
 * @param obj - The object to check for the presence of the key
 * @param key - The key to check for in the object
 * @returns `true` if the object has the specified key as its own property, `false` otherwise.
 *          When `true`, TypeScript narrows the object type to guarantee the key exists.
 *
 * @example
 * Basic usage with known object structure:
 * ```typescript
 * const obj = { a: 1, b: 'hello' };
 *
 * if (hasKey(obj, 'a')) {
 *   // obj is narrowed to guarantee 'a' exists
 *   console.log(obj.a); // TypeScript knows 'a' exists and is type number
 *   // No need for optional chaining or undefined checks
 * }
 *
 * if (hasKey(obj, 'c')) {
 *   // This block won't execute at runtime
 *   console.log(obj.c); // But TypeScript would know 'c' exists if it did
 * }
 * ```
 *
 * @example
 * Working with dynamic objects and unknown keys:
 * ```typescript
 * const dynamicObj: Record<string, unknown> = { x: 10, y: 20 };
 * const userInput: string = getUserInput();
 *
 * if (hasKey(dynamicObj, userInput)) {
 *   // Safe to access the dynamic key
 *   const value = dynamicObj[userInput]; // Type: unknown
 *   console.log(`Value for ${userInput}:`, value);
 * } else {
 *   console.log(`Key '${userInput}' not found`);
 * }
 * ```
 *
 * @example
 * Type narrowing with union types:
 * ```typescript
 * type UserPreferences =
 *   | { theme: 'dark'; notifications: boolean }
 *   | { theme: 'light' }
 *   | { autoSave: true; interval: number };
 *
 * const preferences: UserPreferences = getPreferences();
 *
 * if (hasKey(preferences, 'theme')) {
 *   // preferences is narrowed to the first two union members
 *   console.log(preferences.theme); // 'dark' | 'light'
 * }
 *
 * if (hasKey(preferences, 'autoSave')) {
 *   // preferences is narrowed to the third union member
 *   console.log(preferences.interval); // number (we know this exists)
 * }
 * ```
 *
 * @example
 * Combining with other type guards for progressive narrowing:
 * ```typescript
 * const data: unknown = parseApiResponse();
 *
 * if (isRecord(data) && hasKey(data, 'user')) {
 *   // data is now Record<string, unknown> with guaranteed 'user' key
 *   const user = data.user;
 *
 *   if (isRecord(user) && hasKey(user, 'name')) {
 *     // Safely access nested properties
 *     console.log('User name:', user.name);
 *   }
 * }
 * ```
 *
 * @see {@link keyIsIn} - Similar function that narrows the key type instead of the object type
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
 * If none of the elements in the union contain K as a key, returns `ReadonlyRecord<K, unknown>`.
 * The result is made readonly.
 */
export type HasKeyReturnType<
  R extends UnknownRecord,
  K extends PropertyKey,
> = R extends R // union distribution
  ? K extends keyof R
    ? string extends keyof R
      ? ReadonlyRecord<K, R[keyof R]> & R
      : number extends keyof R
        ? ReadonlyRecord<K, R[keyof R]> & R
        : symbol extends keyof R
          ? ReadonlyRecord<K, R[keyof R]> & R
          : R
    : never // omit union member that does not have key K
  : never; // dummy case for union distribution
