/**
 * Applies a function to a value if the value is not `null` or `undefined`.
 * If the value is `null` or `undefined`, it returns `undefined`.
 * Similar to Optional.map() but works with nullable values directly.
 *
 * @template A The type of the input value.
 * @template B The type of the value returned by the function `fn`.
 * @param value The value to potentially transform. It can be of type `A`, `null`, or `undefined`.
 * @param mapFn A function that takes a non-nullable value of type `A` and returns a value of type `B`.
 * @returns The result of applying `mapFn` to `value` if `value` is not `null` or `undefined`; otherwise, `undefined`.
 * @example
 * ```typescript
 * // Regular usage
 * mapNullable("hello", s => s.toUpperCase()); // "HELLO"
 * mapNullable(null, s => s.toUpperCase()); // undefined
 * mapNullable(undefined, s => s.toUpperCase()); // undefined
 *
 * const user: { name?: string } = getUserData();
 * const uppercaseName = mapNullable(user.name, name => name.toUpperCase());
 * // uppercaseName is string | undefined
 *
 * // Curried usage for pipe composition
 * const toUpperCase = mapNullable((s: string) => s.toUpperCase());
 * const result1 = toUpperCase("hello"); // "HELLO"
 * const result2 = toUpperCase(null); // undefined
 *
 * // Chaining with pipe
 * const processName = pipe("john")
 *   .map(mapNullable((s: string) => s.toUpperCase()))
 *   .map(mapNullable((s: string) => `Hello, ${s}!`))
 *   .value; // "Hello, JOHN!"
 *
 * // Handling nullable chains
 * const result = mapNullable(getValue(), x => x * 2);
 * const finalResult = mapNullable(result, x => x.toString());
 * ```
 */
export function mapNullable<const A, const B>(
  value: A | null | undefined,
  mapFn: (v: A) => B,
): B | undefined;
export function mapNullable<const A, const B>(
  mapFn: (v: A) => B,
): (value: A | null | undefined) => B | undefined;
export function mapNullable<const A, const B>(
  ...args:
    | readonly [value: A | null | undefined, mapFn: (v: A) => B]
    | readonly [mapFn: (v: A) => B]
): (B | undefined) | ((value: A | null | undefined) => B | undefined) {
  if (args.length === 2) {
    const [value, mapFn] = args;
    return value == null ? undefined : mapFn(value);
  } else {
    const [mapFn] = args;
    return (value) => (value == null ? undefined : mapFn(value));
  }
}
