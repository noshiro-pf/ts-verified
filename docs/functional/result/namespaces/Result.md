[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [functional/result](../README.md) / Result

# Result

Namespace for `Result` type and related functions.
Provides a way to handle operations that can succeed or fail.

## Type Aliases

### Base

> **Base** = [`Result`](../README.md#result)\<`unknown`, `unknown`\>

Defined in: [functional/result.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L57)

Base type for any `Result`, used for generic constraints.
Represents a `Result` with unknown success and error types.

---

### Err\<E\>

> **Err**\<`E`\> = `Err_`\<`E`\>

Defined in: [functional/result.mts:51](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L51)

Represents a `Result` that is an error, containing an error value.

#### Type Parameters

##### E

`E`

The type of the error value.

---

### NarrowToErr\<R\>

> **NarrowToErr**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<`unknown`\> ? `never` : `R`

Defined in: [functional/result.mts:85](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L85)

Narrows a `Result.Base` type to `Result.Err<E>` if it is indeed an `Err`.
If the `Result` is `Result.Ok<S>`, it resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to narrow.

---

### NarrowToOk\<R\>

> **NarrowToOk**\<`R`\> = `R` _extends_ [`Err`](#err)\<`unknown`\> ? `never` : `R`

Defined in: [functional/result.mts:78](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L78)

Narrows a `Result.Base` type to `Result.Ok<S>` if it is indeed an `Ok`.
If the `Result` is `Result.Err<E>`, it resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to narrow.

---

### Ok\<S\>

> **Ok**\<`S`\> = `Ok_`\<`S`\>

Defined in: [functional/result.mts:46](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L46)

Represents a `Result` that is a success, containing a value.

#### Type Parameters

##### S

`S`

The type of the success value.

---

### UnwrapErr\<R\>

> **UnwrapErr**\<`R`\> = `R` _extends_ [`Err`](#err)\<infer E\> ? `E` : `never`

Defined in: [functional/result.mts:71](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L71)

Extracts the error value type `E` from a `Result.Err<E>`.
If the `Result` is `Result.Ok<S>`, it resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

---

### UnwrapOk\<R\>

> **UnwrapOk**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<infer S\> ? `S` : `never`

Defined in: [functional/result.mts:64](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L64)

Extracts the success value type `S` from a `Result.Ok<S>`.
If the `Result` is `Result.Err<E>`, it resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

## Functions

### err()

> **err**\<`E`\>(`value`): `Readonly`\<\{ `type`: _typeof_ `ErrTypeSymbol`; `value`: `E`; \}\>

Defined in: [functional/result.mts:104](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L104)

Creates a `Result.Err` containing the given error value.

#### Type Parameters

##### E

`E`

The type of the error value.

#### Parameters

##### value

`E`

The error value.

#### Returns

`Readonly`\<\{ `type`: _typeof_ `ErrTypeSymbol`; `value`: `E`; \}\>

A `Result.Err<E>` containing the value.

---

### expectToBe()

> **expectToBe**\<`R`\>(`message`): (`result`) => [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:306](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L306)

Returns a function that unwraps a `Result`, returning the success value.
Throws an error with the provided message if the `Result` is `Result.Err`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

#### Parameters

##### message

`string`

The error message to throw if the `Result` is `Result.Err`.

#### Returns

A function that takes a `Result` and returns its success value or throws.

> (`result`): [`UnwrapOk`](#unwrapok)\<`R`\>

##### Parameters

###### result

`R`

##### Returns

[`UnwrapOk`](#unwrapok)\<`R`\>

---

### fold()

> **fold**\<`R`, `S2`, `E2`\>(`result`, `mapFn`, `mapErrFn`): [`Result`](../README.md#result)\<`S2`, `E2`\>

Defined in: [functional/result.mts:192](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L192)

Applies one of two functions depending on whether the `Result` is `Ok` or `Err`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

##### S2

`S2`

The type of the success value returned by `mapFn`.

##### E2

`E2`

The type of the error value returned by `mapErrFn`.

#### Parameters

##### result

`R`

The `Result` to fold.

##### mapFn

(`value`) => `S2`

The function to apply if `result` is `Ok`.

##### mapErrFn

(`error`) => `E2`

The function to apply if `result` is `Err`.

#### Returns

[`Result`](../README.md#result)\<`S2`, `E2`\>

A new `Result<S2, E2>` based on the applied function.

---

### fromPromise()

> **fromPromise**\<`P`\>(`promise`): `Promise`\<[`Result`](../README.md#result)\<`UnwrapPromise`\<`P`\>, `unknown`\>\>

Defined in: [functional/result.mts:331](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L331)

Converts a Promise into a Promise that resolves to a `Result`.
If the input Promise resolves, the `Result` will be `Ok` with the resolved value.
If the input Promise rejects, the `Result` will be `Err` with the rejection reason.

#### Type Parameters

##### P

`P` _extends_ `Promise`\<`unknown`\>

The type of the input Promise.

#### Parameters

##### promise

`P`

The Promise to convert.

#### Returns

`Promise`\<[`Result`](../README.md#result)\<`UnwrapPromise`\<`P`\>, `unknown`\>\>

A Promise that resolves to `Result<UnwrapPromise<P>, unknown>`.

---

### isErr()

> **isErr**\<`R`\>(`result`): `result is NarrowToErr<R>`

Defined in: [functional/result.mts:130](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L130)

Checks if a `Result` is `Result.Err`.
Acts as a type guard.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to check.

#### Parameters

##### result

`R`

The `Result` to check.

#### Returns

`result is NarrowToErr<R>`

`true` if the `Result` is `Result.Err`, `false` otherwise.

---

### isOk()

> **isOk**\<`R`\>(`result`): `result is NarrowToOk<R>`

Defined in: [functional/result.mts:119](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L119)

Checks if a `Result` is `Result.Ok`.
Acts as a type guard.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to check.

#### Parameters

##### result

`R`

The `Result` to check.

#### Returns

`result is NarrowToOk<R>`

`true` if the `Result` is `Result.Ok`, `false` otherwise.

---

### map()

> **map**\<`R`, `S2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

Defined in: [functional/result.mts:144](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L144)

Maps a `Result<S, E>` to `Result<S2, E>` by applying a function to a success value.
If the `Result` is `Result.Err`, it returns the original `Err`.
Otherwise, it applies `mapFn` to the success value and returns a new `Result.Ok` with the result.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

##### S2

`S2`

The type of the success value returned by the mapping function.

#### Parameters

##### result

`R`

The `Result` to map.

##### mapFn

(`value`) => `S2`

The function to apply to the success value if it exists.

#### Returns

[`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

A new `Result<S2, UnwrapErr<R>>`.

---

### mapErr()

> **mapErr**\<`R`, `E2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

Defined in: [functional/result.mts:168](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L168)

Maps a `Result<S, E>` to `Result<S, E2>` by applying a function to an error value.
If the `Result` is `Result.Ok`, it returns the original `Ok`.
Otherwise, it applies `mapFn` to the error value and returns a new `Result.Err` with the result.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

##### E2

`E2`

The type of the error value returned by the mapping function.

#### Parameters

##### result

`R`

The `Result` to map.

##### mapFn

(`error`) => `E2`

The function to apply to the error value if it exists.

#### Returns

[`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

A new `Result<UnwrapOk<R>, E2>`.

---

### ok()

> **ok**\<`S`\>(`value`): `Readonly`\<\{ `type`: _typeof_ `OkTypeSymbol`; `value`: `S`; \}\>

Defined in: [functional/result.mts:93](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L93)

Creates a `Result.Ok` containing the given success value.

#### Type Parameters

##### S

`S`

The type of the success value.

#### Parameters

##### value

`S`

The success value.

#### Returns

`Readonly`\<\{ `type`: _typeof_ `OkTypeSymbol`; `value`: `S`; \}\>

A `Result.Ok<S>` containing the value.

---

### unwrapErr()

> **unwrapErr**\<`R`\>(`result`): `undefined` \| [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [functional/result.mts:273](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L273)

Unwraps a `Result`, returning the error value or `undefined` if it's `Result.Ok`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

#### Parameters

##### result

`R`

The `Result` to unwrap.

#### Returns

`undefined` \| [`UnwrapErr`](#unwraperr)\<`R`\>

The error value if `Result.Err`, otherwise `undefined`.

---

### unwrapErrOr()

> **unwrapErrOr**\<`R`, `D`\>(`result`, `defaultValue`): `D` \| [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [functional/result.mts:289](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L289)

Unwraps a `Result`, returning the error value or a default value if it's `Result.Ok`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

##### D

`D`

The type of the default value.

#### Parameters

##### result

`R`

The `Result` to unwrap.

##### defaultValue

`D`

The value to return if `result` is `Result.Ok`.

#### Returns

`D` \| [`UnwrapErr`](#unwraperr)\<`R`\>

The error value if `Result.Err`, otherwise `defaultValue`.

---

### unwrapOk()

> **unwrapOk**\<`R`\>(`result`): `undefined` \| [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:242](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L242)

Unwraps a `Result`, returning the success value or `undefined` if it's `Result.Err`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

#### Parameters

##### result

`R`

The `Result` to unwrap.

#### Returns

`undefined` \| [`UnwrapOk`](#unwrapok)\<`R`\>

The success value if `Result.Ok`, otherwise `undefined`.

---

### unwrapOkOr()

> **unwrapOkOr**\<`R`, `D`\>(`result`, `defaultValue`): `D` \| [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:258](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L258)

Unwraps a `Result`, returning the success value or a default value if it's `Result.Err`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

##### D

`D`

The type of the default value.

#### Parameters

##### result

`R`

The `Result` to unwrap.

##### defaultValue

`D`

The value to return if `result` is `Result.Err`.

#### Returns

`D` \| [`UnwrapOk`](#unwrapok)\<`R`\>

The success value if `Result.Ok`, otherwise `defaultValue`.

---

### unwrapThrow()

> **unwrapThrow**\<`R`\>(`result`, `toStr`): [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [functional/result.mts:220](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L220)

Unwraps a `Result`, returning the success value.
Throws an error if the `Result` is `Result.Err`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

#### Parameters

##### result

`R`

The `Result` to unwrap.

##### toStr

(`e`) => `string`

An optional function to convert the error value to a string for the error message. Defaults to `String`.

#### Returns

[`UnwrapOk`](#unwrapok)\<`R`\>

The success value if `Result.Ok`.

#### Throws

Error if the `Result` is `Result.Err`.
