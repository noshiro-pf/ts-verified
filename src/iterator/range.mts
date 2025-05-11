/**
 * @param start
 * @param end
 * @param step Default value is 1
 * @throws Will throw an error if the argument is not safe integer.
 */
export function* range(
  start: number,
  end: number,
  step: number = 1,
): Generator<number, void, unknown> {
  for (
    let mut_i: number = start;
    step > 0 ? mut_i < end : mut_i > end;
    mut_i += step
  ) {
    yield mut_i;
  }
}
