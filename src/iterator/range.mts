/**
 * Generates a sequence of numbers within a specified range.
 * @param start The starting number of the sequence.
 * @param end The end number of the sequence. The sequence does not include this number.
 * @param step The increment or decrement value. Defaults to 1.
 * @yields Numbers in the specified range.
 * @throws Will throw an error if `step` is 0, or if `start`, `end`, or `step` are not SafeInteger.
 */
export function* range(
  start: number,
  end: number,
  step: number = 1,
): Generator<number, void, unknown> {
  if (
    !Number.isSafeInteger(start) ||
    !Number.isSafeInteger(end) ||
    !Number.isSafeInteger(step)
  ) {
    throw new Error(
      'Arguments `start`, `end`, and `step` must be SafeInteger.',
    );
  }
  if (step === 0) {
    throw new Error('Argument `step` cannot be 0.');
  }

  for (
    let mut_i: number = start;
    step > 0 ? mut_i < end : mut_i > end;
    mut_i += step
  ) {
    yield mut_i;
  }
}
