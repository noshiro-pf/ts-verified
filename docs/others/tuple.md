[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/tuple

# others/tuple

## Functions

### tp()

> **tp**\<`T`\>(...`args`): `Readonly`\<`T`\>

Defined in: [src/others/tuple.mts:23](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/tuple.mts#L23)

Creates a readonly tuple from the given arguments.
This function is a shorthand for creating readonly tuples with inferred literal types.

#### Type Parameters

##### T

`T` _extends_ readonly `unknown`[]

A tuple type inferred from the arguments.

#### Parameters

##### args

...`T`

The elements of the tuple.

#### Returns

`Readonly`\<`T`\>

A readonly tuple containing the provided arguments.

#### Example

```typescript
const tuple = tp(1, 'hello', true); // type: readonly [1, 'hello', true]
const coords = tp(10, 20); // type: readonly [10, 20]
const single = tp('only'); // type: readonly ['only']
const empty = tp(); // type: readonly []

// Useful for creating type-safe coordinate pairs
const point = tp(x, y);
const [xCoord, yCoord] = point; // Destructuring with exact types

// Can be used with other utilities that expect tuples
const pairs = [tp('a', 1), tp('b', 2), tp('c', 3)];
// pairs: readonly [readonly ['a', 1], readonly ['b', 2], readonly ['c', 3]]
```
