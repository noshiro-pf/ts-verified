import { SafeInt, asSafeInt } from '../number/index.mjs';

/**
 * Generates a sequence of numbers within a specified range using a generator.
 *
 * The generator yields numbers from `start` (inclusive) to `end` (exclusive)
 * with the specified `step` increment/decrement.
 *
 * @param start The starting number of the sequence (inclusive).
 * @param end The end number of the sequence (exclusive). The sequence does not include this number.
 * @param step The increment or decrement value. Defaults to 1. Must be non-zero.
 * @returns A generator that yields numbers in the specified range.
 * @example
 * ```typescript
 * // Basic ascending range
 * for (const n of range(0, 5)) {
 *   console.log(n); // 0, 1, 2, 3, 4
 * }
 *
 * // Range with custom step
 * for (const n of range(0, 10, 2)) {
 *   console.log(n); // 0, 2, 4, 6, 8
 * }
 *
 * // Descending range
 * for (const n of range(5, 0, -1)) {
 *   console.log(n); // 5, 4, 3, 2, 1
 * }
 *
 * // Convert to array
 * const arr = Array.from(range(1, 4)); // [1, 2, 3]
 *
 * // Empty range (start >= end with positive step)
 * Array.from(range(5, 5)); // []
 * Array.from(range(5, 3)); // []
 * ```
 */
export function range(
  start: SafeUintWithSmallInt,
  end: SafeUintWithSmallInt,
  step?: PositiveSafeIntWithSmallInt,
): Generator<SafeUint, void, unknown>;
export function range(
  start: SafeIntWithSmallInt,
  end: SafeIntWithSmallInt,
  step?: NonZeroSafeIntWithSmallInt,
): Generator<SafeInt, void, unknown>;
export function* range(
  start: SafeIntWithSmallInt,
  end: SafeIntWithSmallInt,
  step: NonZeroSafeIntWithSmallInt = 1,
): Generator<SafeInt, void, unknown> {
  for (
    let mut_i: SafeInt = asSafeInt(start);
    step > 0 ? mut_i < end : mut_i > end;
    mut_i = SafeInt.add(mut_i, step)
  ) {
    yield mut_i;
  }
}
