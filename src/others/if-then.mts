/**
 * Implements the logical implication (if-then) operator.
 * Returns `true` if the antecedent is `false` or the consequent is `true`.
 *
 * @param antecedent - The condition (if part).
 * @param consequent - The result if the condition is true (then part).
 * @returns The result of the logical implication.
 */
export const ifThen = (antecedent: boolean, consequent: boolean): boolean =>
  !antecedent || consequent;
