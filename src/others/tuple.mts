/**
 * Creates a readonly tuple from the given arguments.
 * This function is a shorthand for creating readonly tuples with inferred literal types.
 * @template T A tuple type inferred from the arguments.
 * @param args The elements of the tuple.
 * @returns A readonly tuple containing the provided arguments.
 */
export const tp = <const T extends readonly unknown[]>(
  ...args: T
): Readonly<T> => args;
