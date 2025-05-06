[**Documentation**](README.md)

---

[Documentation](README.md) / expect-type

# expect-type

## Functions

### expectType()

> **expectType**\<`A`, `B`\>(`_relation`): `void`

Defined in: [expect-type.mts:12](https://github.com/noshiro-pf/ts-verified/blob/main/src/expect-type.mts#L12)

- `expectType<A, B>("=")` passes if `A` is equal to `B`.
- `expectType<A, B>("~=")` passes if `A` extends `B` and `B` extends `A`.
- `expectType<A, B>("<=")` passes if `A` extends `B`.
- `expectType<A, B>(">=")` passes if `B` extends `A`.
- `expectType<A, B>("!<=")` passes if `A` doesn't extend `B`.
- `expectType<A, B>("!>=")` passes if `B` doesn't extend `A`.
- `expectType<A, B>("!=")` passes if `A` is not equal to `B`.

#### Type Parameters

##### A

`A`

##### B

`B`

#### Parameters

##### \_relation

`TypeEq`\<`A`, `B`\> _extends_ `true` ? `"<="` \| `"="` \| `">="` \| `"~="` : `"!="` \| `TypeExtends`\<`A`, `B`\> _extends_ `true` ? `"<="` \| `TypeExtends`\<`B`, `A`\> _extends_ `true` ? `">="` \| `"~="` : `"!>="` : `"!<="` \| `TypeExtends`\<`B`, `A`\> _extends_ `true` ? `">="` : `"!>="`

`"=" | "~=" | "<=" | ">=" | "!<=" | "!>=" | "!="`

#### Returns

`void`
