[**Documentation**](../README.md)

---

[Documentation](../README.md) / functional/match

# functional/match

## Functions

### match()

#### Call Signature

> **match**\<`Case`, `V`\>(`target`, `cases`): `IsLiteralTypeImpl`\<`Case`\> _extends_ `true` ? `V` : `undefined` \| `V`

Defined in: [functional/match.mts:24](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/match.mts#L24)

##### Type Parameters

###### Case

`Case` _extends_ `PropertyKey`

###### V

`V`

##### Parameters

###### target

`Case`

###### cases

`Record`\<`Case`, `V`\>

##### Returns

`IsLiteralTypeImpl`\<`Case`\> _extends_ `true` ? `V` : `undefined` \| `V`

#### Call Signature

> **match**\<`Case`, `V`, `CaseSub`\>(`target`, `cases`): `V`

Defined in: [functional/match.mts:29](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/match.mts#L29)

##### Type Parameters

###### Case

`Case` _extends_ `PropertyKey`

###### V

`V`

###### CaseSub

`CaseSub` _extends_ `PropertyKey`

##### Parameters

###### target

`Case`

###### cases

`Record`\<`CaseSub`, `V`\>

##### Returns

`V`

---

### strictMatch()

> **strictMatch**\<`Case`, `R`\>(`target`, `cases`): `R`\[`Case`\]

Defined in: [functional/match.mts:16](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/match.mts#L16)

#### Type Parameters

##### Case

`Case` _extends_ `string`

##### R

`R` _extends_ `Record`\<`Case`, `unknown`\>

#### Parameters

##### target

`Case`

##### cases

`StrictPropertyCheck`\<`R`, `Case`\>

#### Returns

`R`\[`Case`\]
