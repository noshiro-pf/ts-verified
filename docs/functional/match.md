[**Documentation**](../README.md)

---

[Documentation](../README.md) / functional/match

# functional/match

## Functions

### match()

Implementation of the `match` function.
It checks if the `target` key exists in the `cases` object.
If it exists, the corresponding value is returned; otherwise, `undefined` is returned.

#### Template

The type of the target case (a PropertyKey).

#### Template

The type of the values in the `cases` object.

#### Template

A subtype of `Case`, representing the actual keys present in `cases`.

#### Param

The specific case to match.

#### Param

An object mapping cases to their corresponding values.

#### Call Signature

> **match**\<`Case`, `V`\>(`target`, `cases`): `IsLiteralTypeImpl`\<`Case`\> _extends_ `true` ? `V` : `undefined` \| `V`

Defined in: [functional/match.mts:60](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/match.mts#L60)

Matches a `target` case against a set of `cases` and returns the corresponding value.
If the `target` case is a literal type, it's assumed to be present in `cases`,
and the return type is `V`. Otherwise, the return type is `V | undefined`
as the key might not be present.

##### Type Parameters

###### Case

`Case` _extends_ `PropertyKey`

The type of the target case (a PropertyKey).

###### V

`V`

The type of the values in the `cases` object.

##### Parameters

###### target

`Case`

The specific case to match.

###### cases

`Record`\<`Case`, `V`\>

An object mapping cases to their corresponding values.

##### Returns

`IsLiteralTypeImpl`\<`Case`\> _extends_ `true` ? `V` : `undefined` \| `V`

The value associated with the `target` case, or `undefined` if not found.

##### Template

The type of the target case (a PropertyKey).

##### Template

The type of the values in the `cases` object.

##### Template

A subtype of `Case`, representing the actual keys present in `cases`.

##### Param

The specific case to match.

##### Param

An object mapping cases to their corresponding values.

#### Call Signature

> **match**\<`Case`, `V`, `CaseSub`\>(`target`, `cases`): `V`

Defined in: [functional/match.mts:76](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/match.mts#L76)

Matches a `target` case against a subset of `cases` and returns the corresponding value.
This overload is used when `cases` is a record with a subset of keys from `Case`.
It assumes the `target` will be one of the keys in `CaseSub`.

##### Type Parameters

###### Case

`Case` _extends_ `PropertyKey`

The general type of the target case (a PropertyKey).

###### V

`V`

The type of the values in the `cases` object.

###### CaseSub

`CaseSub` _extends_ `PropertyKey`

A subtype of `Case`, representing the actual keys present in `cases`.

##### Parameters

###### target

`Case`

The specific case to match.

###### cases

`Record`\<`CaseSub`, `V`\>

An object mapping a subset of cases (`CaseSub`) to their corresponding values.

##### Returns

`V`

The value associated with the `target` case, or `undefined` if not found.

##### Template

The type of the target case (a PropertyKey).

##### Template

The type of the values in the `cases` object.

##### Template

A subtype of `Case`, representing the actual keys present in `cases`.

##### Param

The specific case to match.

##### Param

An object mapping cases to their corresponding values.

---

### strictMatch()

> **strictMatch**\<`Case`, `R`\>(`target`, `cases`): `R`\[`Case`\]

Defined in: [functional/match.mts:40](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/match.mts#L40)

A strict version of `match` that ensures the `cases` object only contains keys
present in the `Case` union type.
It returns the value corresponding to the `target` case.

#### Type Parameters

##### Case

`Case` _extends_ `string`

A union of string literal types representing the possible cases.

##### R

`R` _extends_ `Record`\<`Case`, `unknown`\>

A record where keys are from `Case` and values are of any type.

#### Parameters

##### target

`Case`

The specific case to match.

##### cases

`StrictPropertyCheck`\<`R`, `Case`\>

An object mapping cases to their corresponding values.
This object must strictly conform to the `Case` type for its keys.

#### Returns

`R`\[`Case`\]

The value associated with the `target` case in the `cases` object.
