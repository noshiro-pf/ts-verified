[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/map-optional

# others/map-optional

## Functions

### mapOptional()

> **mapOptional**\<`A`, `B`\>(`value`, `fn`): `undefined` \| `B`

Defined in: [others/map-optional.mts:1](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/map-optional.mts#L1)

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### value

`undefined` | `null` | `A`

##### fn

(`v`) => `B`

#### Returns

`undefined` \| `B`

---

### mapOptionalC()

> **mapOptionalC**\<`A`, `B`\>(`fn`): (`value`) => `undefined` \| `B`

Defined in: [others/map-optional.mts:7](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/map-optional.mts#L7)

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### fn

(`v`) => `B`

#### Returns

> (`value`): `undefined` \| `B`

##### Parameters

###### value

`undefined` | `null` | `A`

##### Returns

`undefined` \| `B`
