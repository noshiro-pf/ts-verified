/**
 * Casts a mutable type `T` to its `Readonly<T>` equivalent.
 * This is a type assertion and does not change the runtime value.
 * @template T The type of the mutable value.
 * @param mutable The mutable value to cast.
 * @returns The value cast to `Readonly<T>`.
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
 */
export const castDeepReadonly = <T,>(mutable: T): DeepReadonly<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  mutable as DeepReadonly<T>;
