export const castReadonly = <T,>(mutable: T): Readonly<T> =>
  mutable as Readonly<T>;

export const castDeepReadonly = <T,>(mutable: T): DeepReadonly<T> =>
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  mutable as DeepReadonly<T>;
