[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-record

# guard/is-record

## Functions

### isRecord()

> **isRecord**(`u`): `u is UnknownRecord`

Defined in: [src/guard/is-record.mts:22](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-record.mts#L22)

Checks if a value is a non-null object that is not an array.
This is often used to check if a value is a plain JavaScript object (record).
Acts as a type guard, narrowing the type of `u` to `UnknownRecord`.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is UnknownRecord`

`true` if `u` is a non-null object and not an array, `false` otherwise.

#### Example

```typescript
const value: unknown = { name: 'John', age: 30 };
if (isRecord(value)) {
    // value is now typed as UnknownRecord
    console.log(Object.keys(value)); // ['name', 'age']
}

isRecord(null); // false
isRecord([]); // false
isRecord({}); // true
```
