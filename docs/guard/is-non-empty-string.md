[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-non-empty-string

# guard/is-non-empty-string

## Functions

### isNonEmptyString()

> **isNonEmptyString**\<`S`\>(`s`): `s is RelaxedExclude<NonNullable<S>, "">`

Defined in: [src/guard/is-non-empty-string.mts:23](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-non-empty-string.mts#L23)

Checks if a value is a non-empty string.
Acts as a type guard, narrowing the type of `s` to a non-empty string.

#### Type Parameters

##### S

`S` _extends_ `undefined` \| `null` \| `string`

The type of the input string, which can be `string`, `null`, or `undefined`.

#### Parameters

##### s

`S`

The value to check.

#### Returns

`s is RelaxedExclude<NonNullable<S>, "">`

`true` if `s` is a string and not empty, `false` otherwise.

#### Example

```typescript
isNonEmptyString('hello'); // true
isNonEmptyString(' '); // true (whitespace is considered non-empty)
isNonEmptyString(''); // false
isNonEmptyString(null); // false
isNonEmptyString(undefined); // false

// Type guard usage
const value: string | null = getValue();
if (isNonEmptyString(value)) {
    // value is now typed as non-empty string
    console.log(value.charAt(0)); // safe to access
}
```
