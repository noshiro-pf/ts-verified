/**
 * Applies a function to a value if the value is not `null` or `undefined`.
 * If the value is `null` or `undefined`, it returns `undefined`.
 * Similar to Optional.map() but works with nullable values directly.
 *
 * @template A The type of the input value.
 * @template B The type of the value returned by the function `fn`.
 * @param value The value to potentially transform. It can be of type `A`, `null`, or `undefined`.
 * @param fn A function that takes a non-nullable value of type `A` and returns a value of type `B`.
 * @returns The result of applying `fn` to `value` if `value` is not `null` or `undefined`; otherwise, `undefined`.
 * @example
 * ```typescript
 * mapNullable("hello", s => s.toUpperCase()); // "HELLO"
 * mapNullable(null, s => s.toUpperCase()); // undefined
 * mapNullable(undefined, s => s.toUpperCase()); // undefined
 *
 * const user: { name?: string } = getUserData();
 * const uppercaseName = mapNullable(user.name, name => name.toUpperCase());
 * // uppercaseName is string | undefined
 *
 * // Chaining with other nullable operations
 * const result = mapNullable(getValue(), x => x * 2);
 * const finalResult = mapNullable(result, x => x.toString());
 * ```
 */
export const mapNullable = <A, B>(
  value: A | null | undefined,
  fn: (v: A) => B,
): B | undefined => (value == null ? undefined : fn(value));
