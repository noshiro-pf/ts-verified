[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-record

# guard/is-record

## Functions

### isRecord()

> **isRecord**(`u`): `u is UnknownRecord`

Defined in: [guard/is-record.mts:10](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-record.mts#L10)

Checks if a value is a non-null object that is not an array.
This is often used to check if a value is a plain JavaScript object (record).
Acts as a type guard, narrowing the type of `a` to `UnknownRecord`.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is UnknownRecord`

`true` if `a` is a non-null object and not an array, `false` otherwise.
