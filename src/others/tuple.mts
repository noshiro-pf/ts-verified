/**
 * Creates a readonly tuple from the given arguments.
 * This function is a shorthand for creating readonly tuples with inferred literal types.
 * @template T A tuple type inferred from the arguments.
 * @param args The elements of the tuple.
 * @returns A readonly tuple containing the provided arguments.
 * @example
 * ```typescript
 * const tuple = tp(1, 'hello', true); // type: readonly [1, 'hello', true]
 * const coords = tp(10, 20); // type: readonly [10, 20]
 * const single = tp('only'); // type: readonly ['only']
 * const empty = tp(); // type: readonly []
 *
 * // Useful for creating type-safe coordinate pairs
 * const point = tp(x, y);
 * const [xCoord, yCoord] = point; // Destructuring with exact types
 *
 * // Can be used with other utilities that expect tuples
 * const pairs = [tp('a', 1), tp('b', 2), tp('c', 3)];
 * // pairs: readonly [readonly ['a', 1], readonly ['b', 2], readonly ['c', 3]]
 * ```
 */
export const tp = <const T extends readonly unknown[]>(
  ...args: T
): Readonly<T> => args;
