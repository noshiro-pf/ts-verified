[**Documentation**](README.md)

---

[Documentation](README.md) / expect-type

# expect-type

## Functions

### expectType()

> **expectType**\<`A`, `B`\>(`_relation`): `void`

Defined in: [expect-type.mts:21](https://github.com/noshiro-pf/ts-verified/blob/main/src/expect-type.mts#L21)

Compile-time type assertion utility.
Checks the relationship between type `A` and type `B` based on the `_relation` parameter.
This function has no runtime effect and is used for static type checking.

Supported relations:

- `expectType<A, B>("=")`: Asserts that type `A` is strictly equal to type `B`.
- `expectType<A, B>("~=")`: Asserts that type `A` extends type `B`, and type `B` extends type `A` (i.e., they are mutually assignable).
- `expectType<A, B>("<=")`: Asserts that type `A` extends type `B` (i.e., `A` is a subtype of `B`).
- `expectType<A, B>(">=")`: Asserts that type `B` extends type `A` (i.e., `B` is a subtype of `A`).
- `expectType<A, B>("!<=")`: Asserts that type `A` does not extend type `B`.
- `expectType<A, B>("!>=")`: Asserts that type `B` does not extend type `A`.
- `expectType<A, B>("!=")`: Asserts that type `A` is not strictly equal to type `B`.

#### Type Parameters

##### A

`A`

The first type for comparison.

##### B

`B`

The second type for comparison.

#### Parameters

##### \_relation

`TypeEq`\<`A`, `B`\> _extends_ `true` ? `"<="` \| `"="` \| `">="` \| `"~="` : `"!="` \| `TypeExtends`\<`A`, `B`\> _extends_ `true` ? `"<="` \| `TypeExtends`\<`B`, `A`\> _extends_ `true` ? `">="` \| `"~="` : `"!>="` : `"!<="` \| `TypeExtends`\<`B`, `A`\> _extends_ `true` ? `">="` : `"!>="`

A string literal representing the expected type relationship.
TypeScript infers the valid literals based on `A` and `B`.
Must be one of: `"="`, `"~="`, `"<="`, `">="`, `"!<="`, `"!>="`, `"!="`.

#### Returns

`void`
