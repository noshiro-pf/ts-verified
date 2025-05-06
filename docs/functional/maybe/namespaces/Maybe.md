[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [functional/maybe](../README.md) / Maybe

# Maybe

## Type Aliases

### Base

> **Base** = [`Maybe`](../README.md#maybe)\<`unknown`\>

Defined in: [functional/maybe.mts:19](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L19)

---

### NarrowToNone\<M\>

> **NarrowToNone**\<`M`\> = `M` _extends_ [`Some`](#some)\<`unknown`\> ? `never` : `M`

Defined in: [functional/maybe.mts:25](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L25)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

---

### NarrowToSome\<M\>

> **NarrowToSome**\<`M`\> = `M` _extends_ [`None`](#none) ? `never` : `M`

Defined in: [functional/maybe.mts:23](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L23)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

---

### None

> **None** = `None_`

Defined in: [functional/maybe.mts:17](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L17)

---

### Some\<S\>

> **Some**\<`S`\> = `Some_`\<`S`\>

Defined in: [functional/maybe.mts:16](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L16)

#### Type Parameters

##### S

`S`

---

### Unwrap\<M\>

> **Unwrap**\<`M`\> = `M` _extends_ [`Some`](#some)\<infer S\> ? `S` : `never`

Defined in: [functional/maybe.mts:21](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L21)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

## Variables

### none

> `const` **none**: [`None`](#none)

Defined in: [functional/maybe.mts:33](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L33)

## Functions

### expectToBe()

> **expectToBe**\<`M`\>(`message`): (`maybe`) => [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/maybe.mts:83](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L83)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

#### Parameters

##### message

`string`

#### Returns

> (`maybe`): [`Unwrap`](#unwrap)\<`M`\>

##### Parameters

###### maybe

`M`

##### Returns

[`Unwrap`](#unwrap)\<`M`\>

---

### isNone()

> **isNone**\<`M`\>(`maybe`): `maybe is NarrowToNone<M>`

Defined in: [functional/maybe.mts:39](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L39)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

#### Parameters

##### maybe

`M`

#### Returns

`maybe is NarrowToNone<M>`

---

### isSome()

> **isSome**\<`M`\>(`maybe`): `maybe is NarrowToSome<M>`

Defined in: [functional/maybe.mts:35](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L35)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

#### Parameters

##### maybe

`M`

#### Returns

`maybe is NarrowToSome<M>`

---

### map()

> **map**\<`M`, `S2`\>(`maybe`, `mapFn`): [`Maybe`](../README.md#maybe)\<`S2`\>

Defined in: [functional/maybe.mts:43](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L43)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

##### S2

`S2`

#### Parameters

##### maybe

`M`

##### mapFn

(`value`) => `S2`

#### Returns

[`Maybe`](../README.md#maybe)\<`S2`\>

---

### some()

> **some**\<`S`\>(`value`): `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S`; \}\>

Defined in: [functional/maybe.mts:28](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L28)

#### Type Parameters

##### S

`S`

#### Parameters

##### value

`S`

#### Returns

`Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S`; \}\>

---

### unwrap()

> **unwrap**\<`M`\>(`maybe`): `undefined` \| [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/maybe.mts:65](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L65)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

#### Parameters

##### maybe

`M`

#### Returns

`undefined` \| [`Unwrap`](#unwrap)\<`M`\>

---

### unwrapOr()

> **unwrapOr**\<`M`, `D`\>(`maybe`, `defaultValue`): `D` \| [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/maybe.mts:73](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L73)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

##### D

`D`

#### Parameters

##### maybe

`M`

##### defaultValue

`D`

#### Returns

`D` \| [`Unwrap`](#unwrap)\<`M`\>

---

### unwrapThrow()

> **unwrapThrow**\<`M`\>(`maybe`): [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/maybe.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/maybe.mts#L56)

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

#### Parameters

##### maybe

`M`

#### Returns

[`Unwrap`](#unwrap)\<`M`\>
