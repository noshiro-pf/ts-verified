[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/tuple

# others/tuple

## Functions

### tp()

> **tp**\<`T`\>(...`args`): `Readonly`\<`T`\>

Defined in: [others/tuple.mts:8](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/tuple.mts#L8)

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
