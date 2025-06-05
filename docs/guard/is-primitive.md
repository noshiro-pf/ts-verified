[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-primitive

# guard/is-primitive

## Functions

### isPrimitive()

> **isPrimitive**(`u`): `u is Primitive`

Defined in: [src/guard/is-primitive.mts:23](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-primitive.mts#L23)

Checks if a value is a primitive type.
Primitive types are: string, number, boolean, undefined, symbol, bigint.
Note: `null` is considered an object by `typeof`, so this function will return `false` for `null`.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is Primitive`

`true` if `u` is a primitive type, `false` otherwise.

#### Example

```typescript
isPrimitive('hello'); // true
isPrimitive(42); // true
isPrimitive(true); // true
isPrimitive(undefined); // true
isPrimitive(Symbol('test')); // true
isPrimitive(123n); // true
isPrimitive(null); // false (null is object)
isPrimitive({}); // false
isPrimitive([]); // false
isPrimitive(() => {}); // false
```
