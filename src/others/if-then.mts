/**
 * Implements the logical implication (if-then) operator.
 * Returns `true` if the antecedent is `false` or the consequent is `true`.
 * In logical terms: `antecedent → consequent` is equivalent to `¬antecedent ∨ consequent`.
 *
 * @param antecedent - The condition (if part).
 * @param consequent - The result if the condition is true (then part).
 * @returns The result of the logical implication.
 * @example
 * ```typescript
 * ifThen(true, true);   // true  (if true then true = true)
 * ifThen(true, false);  // false (if true then false = false)
 * ifThen(false, true);  // true  (if false then true = true - vacuously true)
 * ifThen(false, false); // true  (if false then false = true - vacuously true)
 *
 * // Practical usage
 * const hasPermission = true;
 * const actionAllowed = false;
 * const isValid = ifThen(hasPermission, actionAllowed); // false
 *
 * // Used in validation logic
 * const isRequired = true;
 * const hasValue = Boolean(userInput);
 * const isValidInput = ifThen(isRequired, hasValue); // true only if not required OR has value
 * ```
 */
export const ifThen = (antecedent: boolean, consequent: boolean): boolean =>
  !antecedent || consequent;
