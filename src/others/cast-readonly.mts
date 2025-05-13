/**
 * Casts a mutable type `T` to its `Readonly<T>` equivalent.
 * This is a type assertion and does not change the runtime value.
 * @template T The type of the mutable value.
 * @param mutable The mutable value to cast.
 * @returns The value cast to `Readonly<T>`.
 * @example
 * ```typescript
 * const mutableArr: number[] = [1, 2, 3];
 * const readonlyArr = castReadonly(mutableArr);
 * // readonlyArr.push(4); // Error: Property 'push' does not exist on readonly array
 *
 * const mutableObj = { x: 1, y: 2 };
 * const readonlyObj = castReadonly(mutableObj);
 * // readonlyObj.x = 5; // Error: Cannot assign to 'x' because it is readonly
 * ```
 */
export const castReadonly = <T,>(mutable: T): Readonly<T> =>
  mutable as Readonly<T>;

/**
 * Casts a mutable type `T` to its `DeepReadonly<T>` equivalent.
 * This is a type assertion and does not change the runtime value.
 * It assumes that `DeepReadonly<T>` is a defined type that recursively makes all properties readonly.
 * @template T The type of the mutable value.
 * @param mutable The mutable value to cast.
 * @returns The value cast to `DeepReadonly<T>`.
 * @example
 * ```typescript
 * const mutableNested = {
 *   a: { b: [1, 2, 3] },
 *   c: { d: { e: 'value' } }
 * };
 *
 * const readonlyNested = castDeepReadonly(mutableNested);
 * // readonlyNested.a.b.push(4); // Error: readonly at all levels
 * // readonlyNested.c.d.e = 'new'; // Error: readonly at all levels
 * // readonlyNested.a = {}; // Error: readonly at all levels
 * ```
 */
export const castDeepReadonly = <T,>(mutable: T): DeepReadonly<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  mutable as DeepReadonly<T>;
