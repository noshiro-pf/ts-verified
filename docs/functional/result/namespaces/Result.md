[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [functional/result](../README.md) / Result

# Result

Namespace for the `Result` type and related functions.
Provides utilities to handle operations that can succeed or fail.

## Type Aliases

### Base

> **Base** = [`Result`](../README.md#result)\<`unknown`, `unknown`\>

Defined in: [src/functional/result.mts:76](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L76)

Base type for any `Result`, used for generic constraints.
Represents a `Result` with unknown success and error types.

---

### Err\<E\>

> **Err**\<`E`\> = `Err_`\<`E`\>

Defined in: [src/functional/result.mts:70](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L70)

Represents a `Result` that is an error, containing an error value.

#### Type Parameters

##### E

`E`

The type of the error value.

---

### NarrowToErr\<R\>

> **NarrowToErr**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<`unknown`\> ? `never` : `R`

Defined in: [src/functional/result.mts:104](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L104)

Narrows a `Result.Base` type to `Result.Err<E>` if it is an `Err`.
If the `Result` is `Result.Ok<S>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to narrow.

---

### NarrowToOk\<R\>

> **NarrowToOk**\<`R`\> = `R` _extends_ [`Err`](#err)\<`unknown`\> ? `never` : `R`

Defined in: [src/functional/result.mts:97](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L97)

Narrows a `Result.Base` type to `Result.Ok<S>` if it is an `Ok`.
If the `Result` is `Result.Err<E>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to narrow.

---

### Ok\<S\>

> **Ok**\<`S`\> = `Ok_`\<`S`\>

Defined in: [src/functional/result.mts:64](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L64)

Represents a `Result` that is a success, containing a value.

#### Type Parameters

##### S

`S`

The type of the success value.

---

### UnwrapErr\<R\>

> **UnwrapErr**\<`R`\> = `R` _extends_ [`Err`](#err)\<infer E\> ? `E` : `never`

Defined in: [src/functional/result.mts:90](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L90)

Extracts the error value type `E` from a `Result.Err<E>`.
If the `Result` is `Result.Ok<S>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

---

### UnwrapOk\<R\>

> **UnwrapOk**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<infer S\> ? `S` : `never`

Defined in: [src/functional/result.mts:83](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L83)

Extracts the success value type `S` from a `Result.Ok<S>`.
If the `Result` is `Result.Err<E>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

## Functions

### err()

> **err**\<`E`\>(`value`): [`Err`](#err)\<`E`\>

Defined in: [src/functional/result.mts:123](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L123)

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

[`Err`](#err)\<`E`\>

A `Result.Err<E>` containing the value.

---

### expectToBe()

> **expectToBe**\<`R`\>(`message`): (`result`) => [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [src/functional/result.mts:405](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L405)

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

#### Example

```typescript
const mustBeOk = Result.expectToBe<Result<number, string>>(
    'Operation must succeed',
);
const ok = Result.ok(42);
console.log(mustBeOk(ok)); // 42

const err = Result.err('failed');
// mustBeOk(err); // throws Error: "Operation must succeed"
```

---

### flatMap()

> **flatMap**\<`R`, `S2`, `E2`\>(`result`, `flatMapFn`): [`Result`](../README.md#result)\<`S2`, `E2` \| [`UnwrapErr`](#unwraperr)\<`R`\>\>

Defined in: [src/functional/result.mts:376](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L376)

Applies a function that returns a `Result` to the success value of a `Result`.
If the input is `Err`, returns the original `Err`.
This is the monadic bind operation for `Result`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

##### S2

`S2`

The success type of the `Result` returned by the function.

##### E2

`E2`

The error type of the `Result` returned by the function.

#### Parameters

##### result

`R`

The `Result` to flat map.

##### flatMapFn

(`value`) => [`Result`](../README.md#result)\<`S2`, `E2`\>

The function to apply that returns a `Result`.

#### Returns

[`Result`](../README.md#result)\<`S2`, `E2` \| [`UnwrapErr`](#unwraperr)\<`R`\>\>

The result of applying the function, or the original `Err`.

#### Example

```typescript
const divide = (a: number, b: number): Result<number, string> =>
    b === 0 ? Result.err('Division by zero') : Result.ok(a / b);

const result = Result.flatMap(Result.ok(10), (x) => divide(x, 2));
console.log(Result.unwrapOk(result)); // 5

const error = Result.flatMap(Result.ok(10), (x) => divide(x, 0));
console.log(Result.unwrapErr(error)); // "Division by zero"
```

---

### fold()

> **fold**\<`R`, `S2`, `E2`\>(`result`, `mapFn`, `mapErrFn`): [`Result`](../README.md#result)\<`S2`, `E2`\>

Defined in: [src/functional/result.mts:335](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L335)

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

Defined in: [src/functional/result.mts:433](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L433)

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

Defined in: [src/functional/result.mts:152](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L152)

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

`true` if the `Result` is `Result.Err`, otherwise `false`.

---

### isOk()

> **isOk**\<`R`\>(`result`): `result is NarrowToOk<R>`

Defined in: [src/functional/result.mts:141](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L141)

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

`true` if the `Result` is `Result.Ok`, otherwise `false`.

---

### isResult()

> **isResult**(`maybeOptional`): `maybeOptional is Result<unknown, unknown>`

Defined in: [src/functional/result.mts:51](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L51)

Checks if the given value is a `Result`.

#### Parameters

##### maybeOptional

`unknown`

The value to check.

#### Returns

`maybeOptional is Result<unknown, unknown>`

`true` if the value is a `Result`, otherwise `false`.

---

### map()

> **map**\<`R`, `S2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

Defined in: [src/functional/result.mts:288](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L288)

Maps a `Result<S, E>` to `Result<S2, E>` by applying a function to the success value.
If the `Result` is `Result.Err`, returns the original `Err`.

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

The function to apply to the success value if present.

#### Returns

[`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

A new `Result<S2, UnwrapErr<R>>`.

---

### mapErr()

> **mapErr**\<`R`, `E2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

Defined in: [src/functional/result.mts:311](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L311)

Maps a `Result<S, E>` to `Result<S, E2>` by applying a function to the error value.
If the `Result` is `Result.Ok`, returns the original `Ok`.

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

The function to apply to the error value if present.

#### Returns

[`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

A new `Result<UnwrapOk<R>, E2>`.

---

### ok()

> **ok**\<`S`\>(`value`): [`Ok`](#ok)\<`S`\>

Defined in: [src/functional/result.mts:112](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L112)

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

[`Ok`](#ok)\<`S`\>

A `Result.Ok<S>` containing the value.

---

### orElse()

> **orElse**\<`R`, `R2`\>(`result`, `alternative`): `R2` \| [`NarrowToOk`](#narrowtook)\<`R`\>

Defined in: [src/functional/result.mts:506](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L506)

Returns the `Result` if it is `Ok`, otherwise returns the alternative.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

##### R2

`R2` _extends_ [`Base`](#base)

#### Parameters

##### result

`R`

The `Result` to check.

##### alternative

`R2`

The alternative `Result` to return if the first is `Err`.

#### Returns

`R2` \| [`NarrowToOk`](#narrowtook)\<`R`\>

The first `Result` if `Ok`, otherwise the alternative.

#### Example

```typescript
const primary = Result.err('error');
const fallback = Result.ok('default');
const result = Result.orElse(primary, fallback);
console.log(Result.unwrapOk(result)); // "default"
```

---

### swap()

> **swap**\<`R`\>(`result`): [`Result`](../README.md#result)\<[`UnwrapErr`](#unwraperr)\<`R`\>, [`UnwrapOk`](#unwrapok)\<`R`\>\>

Defined in: [src/functional/result.mts:457](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L457)

Swaps the success and error values of a `Result`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

#### Parameters

##### result

`R`

The `Result` to swap.

#### Returns

[`Result`](../README.md#result)\<[`UnwrapErr`](#unwraperr)\<`R`\>, [`UnwrapOk`](#unwrapok)\<`R`\>\>

A new `Result` with success and error swapped.

#### Example

```typescript
const okResult = Result.ok(42);
const swapped = Result.swap(okResult);
console.log(Result.isErr(swapped)); // true
console.log(Result.unwrapErr(swapped)); // 42
```

---

### toOptional()

> **toOptional**\<`R`\>(`result`): [`Optional`](../../optional/README.md#optional)\<[`UnwrapOk`](#unwrapok)\<`R`\>\>

Defined in: [src/functional/result.mts:487](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L487)

Converts a `Result` to an `Optional`.
If the `Result` is `Ok`, returns `Some` with the value.
If the `Result` is `Err`, returns `None`.
Note: This is implemented as a type-only conversion without runtime imports
to avoid circular dependencies.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

#### Parameters

##### result

`R`

The `Result` to convert.

#### Returns

[`Optional`](../../optional/README.md#optional)\<[`UnwrapOk`](#unwrapok)\<`R`\>\>

An object compatible with `Optional` containing the success value or representing `None`.

#### Example

```typescript
const okResult = Result.ok(42);
const optional = Result.toOptional(okResult);
// optional can be used with Optional functions after importing Optional

const errResult = Result.err('error');
const none = Result.toOptional(errResult);
// none represents Optional.none
```

---

### unwrapErr()

> **unwrapErr**\<`R`\>(`result`): `undefined` \| [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [src/functional/result.mts:254](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L254)

Unwraps a `Result`, returning the error value or `undefined` if it is `Result.Ok`.

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

Defined in: [src/functional/result.mts:270](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L270)

Unwraps a `Result`, returning the error value or a default value if it is `Result.Ok`.

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

### unwrapErrThrow()

> **unwrapErrThrow**\<`R`\>(`result`, `toStr`): [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [src/functional/result.mts:232](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L232)

Unwraps a `Result`, returning the error value.
Throws an error if the `Result` is `Result.Ok`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

#### Parameters

##### result

`R`

The `Result` to unwrap.

##### toStr

(`v`) => `string`

An optional function to convert the success value to a string for the error message when the Result is unexpectedly Ok. Defaults to `String`.

#### Returns

[`UnwrapErr`](#unwraperr)\<`R`\>

The error value if `Result.Err`.

#### Throws

Error if the `Result` is `Result.Ok`.

---

### unwrapOk()

#### Call Signature

> **unwrapOk**\<`R`\>(`result`): [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [src/functional/result.mts:187](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L187)

Unwraps a `Result` that is known to be `Ok`, returning the success value.

##### Type Parameters

###### R

`R` _extends_ `Readonly`\<\{ `type`: _typeof_ `OkTypeSymbol`; `value`: `unknown`; \}\>

The `Result.Ok` type to unwrap.

##### Parameters

###### result

`R`

The `Result.Ok` to unwrap.

##### Returns

[`UnwrapOk`](#unwrapok)\<`R`\>

The success value.

#### Call Signature

> **unwrapOk**\<`R`\>(`result`): `undefined` \| [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [src/functional/result.mts:194](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L194)

Unwraps a `Result`, returning the success value or `undefined` if it is `Result.Err`.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

##### Parameters

###### result

`R`

The `Result` to unwrap.

##### Returns

`undefined` \| [`UnwrapOk`](#unwrapok)\<`R`\>

The success value if `Result.Ok`, otherwise `undefined`.

---

### unwrapOkOr()

> **unwrapOkOr**\<`R`, `D`\>(`result`, `defaultValue`): `D` \| [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [src/functional/result.mts:214](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L214)

Unwraps a `Result`, returning the success value or a default value if it is `Result.Err`.

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

Defined in: [src/functional/result.mts:165](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L165)

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

---

### zip()

> **zip**\<`S1`, `E1`, `S2`, `E2`\>(`resultA`, `resultB`): [`Result`](../README.md#result)\<readonly \[`S1`, `S2`\], `E1` \| `E2`\>

Defined in: [src/functional/result.mts:532](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L532)

Combines two `Result` values into a single `Result` containing a tuple.
If either `Result` is `Err`, returns the first `Err` encountered.

#### Type Parameters

##### S1

`S1`

The success type of the first `Result`.

##### E1

`E1`

The error type of the first `Result`.

##### S2

`S2`

The success type of the second `Result`.

##### E2

`E2`

The error type of the second `Result`.

#### Parameters

##### resultA

[`Result`](../README.md#result)\<`S1`, `E1`\>

The first `Result`.

##### resultB

[`Result`](../README.md#result)\<`S2`, `E2`\>

The second `Result`.

#### Returns

[`Result`](../README.md#result)\<readonly \[`S1`, `S2`\], `E1` \| `E2`\>

A `Result` containing a tuple of both values, or the first `Err`.

#### Example

```typescript
const a = Result.ok(1);
const b = Result.ok('hello');
const zipped = Result.zip(a, b);
console.log(Result.unwrapOk(zipped)); // [1, "hello"]

const withErr = Result.zip(a, Result.err('error'));
console.log(Result.unwrapErr(withErr)); // "error"
```
