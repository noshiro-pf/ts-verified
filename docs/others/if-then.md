[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/if-then

# others/if-then

## Functions

### ifThen()

> **ifThen**(`antecedent`, `consequent`): `boolean`

Defined in: [src/others/if-then.mts:27](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/if-then.mts#L27)

Implements the logical implication (if-then) operator.
Returns `true` if the antecedent is `false` or the consequent is `true`.
In logical terms: `antecedent → consequent` is equivalent to `¬antecedent ∨ consequent`.

#### Parameters

##### antecedent

`boolean`

The condition (if part).

##### consequent

`boolean`

The result if the condition is true (then part).

#### Returns

`boolean`

The result of the logical implication.

#### Example

```typescript
ifThen(true, true); // true  (if true then true = true)
ifThen(true, false); // false (if true then false = false)
ifThen(false, true); // true  (if false then true = true - vacuously true)
ifThen(false, false); // true  (if false then false = true - vacuously true)

// Practical usage
const hasPermission = true;
const actionAllowed = false;
const isValid = ifThen(hasPermission, actionAllowed); // false

// Used in validation logic
const isRequired = true;
const hasValue = Boolean(userInput);
const isValidInput = ifThen(isRequired, hasValue); // true only if not required OR has value
```
