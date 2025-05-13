/**
 * Casts a readonly type `T` to its `Mutable<T>` equivalent.
 * This is a type assertion and does not change the runtime value.
 * It assumes that `Mutable<T>` is a defined type that removes `readonly` modifiers.
 * @template T The type of the readonly value.
 * @param readonlyValue The readonly value to cast.
 * @returns The value cast to `Mutable<T>`.
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
 */
export const castDeepMutable = <T,>(readonlyValue: T): DeepMutable<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  readonlyValue as DeepMutable<T>;
