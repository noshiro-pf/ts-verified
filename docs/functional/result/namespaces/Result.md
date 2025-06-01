[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [functional/result](../README.md) / Result

# Result

## Type Aliases

### Base

> **Base** = [`Result`](../README.md#result)\<`unknown`, `unknown`\>

Defined in: [functional/result.mts:20](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L20)

---

### Err\<E\>

> **Err**\<`E`\> = `Err_`\<`E`\>

Defined in: [functional/result.mts:18](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L18)

#### Type Parameters

##### E

`E`

---

### NarrowToErr\<R\>

> **NarrowToErr**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<`unknown`\> ? `never` : `R`

Defined in: [functional/result.mts:28](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L28)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

---

### NarrowToOk\<R\>

> **NarrowToOk**\<`R`\> = `R` _extends_ [`Err`](#err)\<`unknown`\> ? `never` : `R`

Defined in: [functional/result.mts:26](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L26)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

---

### Ok\<S\>

> **Ok**\<`S`\> = `Ok_`\<`S`\>

Defined in: [functional/result.mts:17](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L17)

#### Type Parameters

##### S

`S`

---

### UnwrapErr\<R\>

> **UnwrapErr**\<`R`\> = `R` _extends_ [`Err`](#err)\<infer E\> ? `E` : `never`

Defined in: [functional/result.mts:24](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L24)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

---

### UnwrapOk\<R\>

> **UnwrapOk**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<infer S\> ? `S` : `never`

Defined in: [functional/result.mts:22](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L22)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

## Functions

### err()

> **err**\<`E`\>(`value`): [`Err`](#err)\<`E`\>

Defined in: [functional/result.mts:35](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L35)

#### Type Parameters

##### E

`E`

#### Parameters

##### value

`E`

#### Returns

[`Err`](#err)\<`E`\>

---

### expectToBe()

> **expectToBe**\<`R`\>(`message`): (`result`) => [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:148](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L148)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

#### Parameters

##### message

`string`

#### Returns

> (`result`): [`UnwrapOk`](#unwrapok)\<`R`\>

##### Parameters

###### result

`R`

##### Returns

[`UnwrapOk`](#unwrapok)\<`R`\>

---

### fold()

> **fold**\<`R`, `S2`, `E2`\>(`result`, `mapFn`, `mapErrFn`): [`Result`](../README.md#result)\<`S2`, `E2`\>

Defined in: [functional/result.mts:78](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L78)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

##### S2

`S2`

##### E2

`E2`

#### Parameters

##### result

`R`

##### mapFn

(`value`) => `S2`

##### mapErrFn

(`error`) => `E2`

#### Returns

[`Result`](../README.md#result)\<`S2`, `E2`\>

---

### fromPromise()

> **fromPromise**\<`P`\>(`promise`): `Promise`\<[`Result`](../README.md#result)\<`UnwrapPromise`\<`P`\>, `unknown`\>\>

Defined in: [functional/result.mts:160](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L160)

#### Type Parameters

##### P

`P` _extends_ `Promise`\<`unknown`\>

#### Parameters

##### promise

`P`

#### Returns

`Promise`\<[`Result`](../README.md#result)\<`UnwrapPromise`\<`P`\>, `unknown`\>\>

---

### isErr()

> **isErr**\<`R`\>(`result`): `result is NarrowToErr<R>`

Defined in: [functional/result.mts:46](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L46)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

#### Parameters

##### result

`R`

#### Returns

`result is NarrowToErr<R>`

---

### isOk()

> **isOk**\<`R`\>(`result`): `result is NarrowToOk<R>`

Defined in: [functional/result.mts:42](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L42)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

#### Parameters

##### result

`R`

#### Returns

`result is NarrowToOk<R>`

---

### map()

> **map**\<`R`, `S2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

Defined in: [functional/result.mts:50](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L50)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

##### S2

`S2`

#### Parameters

##### result

`R`

##### mapFn

(`value`) => `S2`

#### Returns

[`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

---

### mapErr()

> **mapErr**\<`R`, `E2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

Defined in: [functional/result.mts:64](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L64)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

##### E2

`E2`

#### Parameters

##### result

`R`

##### mapFn

(`error`) => `E2`

#### Returns

[`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

---

### ok()

> **ok**\<`S`\>(`value`): [`Ok`](#ok)\<`S`\>

Defined in: [functional/result.mts:30](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L30)

#### Type Parameters

##### S

`S`

#### Parameters

##### value

`S`

#### Returns

[`Ok`](#ok)\<`S`\>

---

### unwrapErr()

> **unwrapErr**\<`R`\>(`result`): `undefined` \| [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [functional/result.mts:130](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L130)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

#### Parameters

##### result

`R`

#### Returns

`undefined` \| [`UnwrapErr`](#unwraperr)\<`R`\>

---

### unwrapErrOr()

> **unwrapErrOr**\<`R`, `D`\>(`result`, `defaultValue`): `D` \| [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [functional/result.mts:138](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L138)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

##### D

`D`

#### Parameters

##### result

`R`

##### defaultValue

`D`

#### Returns

`D` \| [`UnwrapErr`](#unwraperr)\<`R`\>

---

### unwrapOk()

> **unwrapOk**\<`R`\>(`result`): `undefined` \| [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:113](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L113)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

#### Parameters

##### result

`R`

#### Returns

`undefined` \| [`UnwrapOk`](#unwrapok)\<`R`\>

---

### unwrapOkOr()

> **unwrapOkOr**\<`R`, `D`\>(`result`, `defaultValue`): `D` \| [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:121](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L121)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

##### D

`D`

#### Parameters

##### result

`R`

##### defaultValue

`D`

#### Returns

`D` \| [`UnwrapOk`](#unwrapok)\<`R`\>

---

### unwrapThrow()

> **unwrapThrow**\<`R`\>(`result`, `toStr`): [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:97](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L97)

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

#### Parameters

##### result

`R`

##### toStr

(`e`) => `string`

#### Returns

[`UnwrapOk`](#unwrapok)\<`R`\>
