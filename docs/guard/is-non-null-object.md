[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-non-null-object

# guard/is-non-null-object

## Functions

### isNonNullObject()

> **isNonNullObject**(`u`): `u is object`

Defined in: [src/guard/is-non-null-object.mts:20](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-non-null-object.mts#L20)

Checks if a value is a non-null object.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is object`

`true` if `u` is an object and not `null`, `false` otherwise.

#### Example

```typescript
isNonNullObject({}); // true
isNonNullObject([]); // true (arrays are objects)
isNonNullObject(new Date()); // true
isNonNullObject(/regex/); // true
isNonNullObject(null); // false
isNonNullObject(undefined); // false
isNonNullObject('string'); // false
isNonNullObject(42); // false
isNonNullObject(() => {}); // false (functions are not objects in this context)
```
