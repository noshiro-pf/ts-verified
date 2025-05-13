/**
 * Casts a readonly type `T` to its `Mutable<T>` equivalent.
 * This is a type assertion and does not change the runtime value.
 * It assumes that `Mutable<T>` is a defined type that removes `readonly` modifiers.
 * @template T The type of the readonly value.
 * @param readonlyValue The readonly value to cast.
 * @returns The value cast to `Mutable<T>`.
 * @example
 * ```typescript
 * const readonlyArr: readonly number[] = [1, 2, 3];
 * const mutableArr = castMutable(readonlyArr);
 * mutableArr.push(4); // Now allowed
 *
 * const readonlyObj: { readonly x: number } = { x: 1 };
 * const mutableObj = castMutable(readonlyObj);
 * mutableObj.x = 2; // Now allowed
 * ```
 */
export const castMutable = <T,>(readonlyValue: T): Mutable<T> =>
  readonlyValue as Mutable<T>;

/**
 * Casts a readonly type `T` to its `DeepMutable<T>` equivalent.
 * This is a type assertion and does not change the runtime value.
 * It assumes that `DeepMutable<T>` is a defined type that recursively removes `readonly` modifiers from all properties.
 * @template T The type of the readonly value.
 * @param readonlyValue The readonly value to cast.
 * @returns The value cast to `DeepMutable<T>`.
 * @example
 * ```typescript
 * const readonlyNested: {
 *   readonly a: { readonly b: readonly number[] }
 * } = { a: { b: [1, 2, 3] } };
 *
 * const mutableNested = castDeepMutable(readonlyNested);
 * mutableNested.a.b.push(4); // Now allowed at all levels
 * mutableNested.a = { b: [5, 6] }; // Now allowed
 * ```
 */
export const castDeepMutable = <T,>(readonlyValue: T): DeepMutable<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  readonlyValue as DeepMutable<T>;
