[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/map-nullable

# others/map-nullable

## Functions

### mapNullable()

> **mapNullable**\<`A`, `B`\>(`value`, `fn`): `undefined` \| `B`

Defined in: [src/others/map-nullable.mts:26](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/map-nullable.mts#L26)

Applies a function to a value if the value is not `null` or `undefined`.
If the value is `null` or `undefined`, it returns `undefined`.
Similar to Optional.map() but works with nullable values directly.

#### Type Parameters

##### A

`A`

The type of the input value.

##### B

`B`

The type of the value returned by the function `fn`.

#### Parameters

##### value

The value to potentially transform. It can be of type `A`, `null`, or `undefined`.

`undefined` | `null` | `A`

##### fn

(`v`) => `B`

A function that takes a non-nullable value of type `A` and returns a value of type `B`.

#### Returns

`undefined` \| `B`

The result of applying `fn` to `value` if `value` is not `null` or `undefined`; otherwise, `undefined`.

#### Example

```typescript
mapNullable('hello', (s) => s.toUpperCase()); // "HELLO"
mapNullable(null, (s) => s.toUpperCase()); // undefined
mapNullable(undefined, (s) => s.toUpperCase()); // undefined

const user: { name?: string } = getUserData();
const uppercaseName = mapNullable(user.name, (name) => name.toUpperCase());
// uppercaseName is string | undefined

// Chaining with other nullable operations
const result = mapNullable(getValue(), (x) => x * 2);
const finalResult = mapNullable(result, (x) => x.toString());
```
