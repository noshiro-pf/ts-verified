[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-primitive

# guard/is-primitive

## Functions

### isPrimitive()

> **isPrimitive**(`u`): `boolean`

Defined in: [guard/is-primitive.mts:8](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-primitive.mts#L8)

Checks if a value is a primitive type.
Primitive types are: string, number, boolean, undefined, symbol, bigint.
Note: `null` is considered an object by `typeof`, so this function will return `false` for `null`.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`boolean`

`true` if `a` is a primitive type, `false` otherwise.
