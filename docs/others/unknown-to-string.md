[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/unknown-to-string

# others/unknown-to-string

## Functions

### unknownToString()

> **unknownToString**(`value`, `options?`): [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

Defined in: [src/others/unknown-to-string.mts:32](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/unknown-to-string.mts#L32)

Converts an unknown value to its string representation.

#### Parameters

##### value

`unknown`

The unknown value to convert.

##### options?

`Partial`\<`Readonly`\<\{ `prettyPrintObject`: `boolean`; \}\>\>

Optional parameters.

#### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>

A Result containing the string representation of the unknown value, or an error message if JSON.stringify fails (e.g., circular references).

#### Example

```typescript
const result = unknownToString('hello');
if (Result.isOk(result)) {
    console.log(result.value); // 'hello'
}

const result2 = unknownToString({ a: 1, b: 2 });
if (Result.isOk(result2)) {
    console.log(result2.value); // '{"a":1,"b":2}'
}

// Circular reference example
const circular: any = { a: 1 };
circular.self = circular;
const result3 = unknownToString(circular);
if (Result.isErr(result3)) {
    console.log(result3.value); // Error message about circular reference
}
```
