[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [functional/result](../README.md) / Result

# Result

Namespace for the `Result` type and related functions.
Provides utilities to handle operations that can succeed or fail.

## Type Aliases

### Base

> **Base** = [`Result`](../README.md#result)\<`unknown`, `unknown`\>

Defined in: [src/functional/result.mts:77](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L77)

Base type for any `Result`, used for generic constraints.
Represents a `Result` with unknown success and error types.

---

### Err\<E\>

> **Err**\<`E`\> = `Err_`\<`E`\>

Defined in: [src/functional/result.mts:71](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L71)

Represents a `Result` that is an error, containing an error value.

#### Type Parameters

##### E

`E`

The type of the error value.

---

### NarrowToErr\<R\>

> **NarrowToErr**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<`unknown`\> ? `never` : `R`

Defined in: [src/functional/result.mts:105](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L105)

Narrows a `Result.Base` type to `Result.Err<E>` if it is an `Err`.
If the `Result` is `Result.Ok<S>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to narrow.

---

### NarrowToOk\<R\>

> **NarrowToOk**\<`R`\> = `R` _extends_ [`Err`](#err)\<`unknown`\> ? `never` : `R`

Defined in: [src/functional/result.mts:98](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L98)

Narrows a `Result.Base` type to `Result.Ok<S>` if it is an `Ok`.
If the `Result` is `Result.Err<E>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to narrow.

---

### Ok\<S\>

> **Ok**\<`S`\> = `Ok_`\<`S`\>

Defined in: [src/functional/result.mts:65](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L65)

Represents a `Result` that is a success, containing a value.

#### Type Parameters

##### S

`S`

The type of the success value.

---

### UnwrapErr\<R\>

> **UnwrapErr**\<`R`\> = `R` _extends_ [`Err`](#err)\<infer E\> ? `E` : `never`

Defined in: [src/functional/result.mts:91](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L91)

Extracts the error value type `E` from a `Result.Err<E>`.
If the `Result` is `Result.Ok<S>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

---

### UnwrapOk\<R\>

> **UnwrapOk**\<`R`\> = `R` _extends_ [`Ok`](#ok)\<infer S\> ? `S` : `never`

Defined in: [src/functional/result.mts:84](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L84)

Extracts the success value type `S` from a `Result.Ok<S>`.
If the `Result` is `Result.Err<E>`, resolves to `never`.

#### Type Parameters

##### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

## Functions

### err()

> **err**\<`E`\>(`value`): [`Err`](#err)\<`E`\>

Defined in: [src/functional/result.mts:124](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L124)

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

#### Call Signature

> **expectToBe**\<`R`\>(`result`, `message`): [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [src/functional/result.mts:580](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L580)

Unwraps a `Result`, returning the success value or throwing an error with the provided message.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

##### Parameters

###### result

`R`

The `Result` to unwrap.

###### message

`string`

The error message to throw if the `Result` is `Result.Err`.

##### Returns

[`UnwrapOk`](#unwrapok)\<`R`\>

The success value if `Result.Ok`.

##### Throws

Error with the provided message if the `Result` is `Result.Err`.

##### Example

```typescript
// Regular usage
const result = Result.ok(42);
const value = Result.expectToBe(result, 'Operation must succeed');
console.log(value); // 42

// Curried usage for pipe composition
const mustBeOk = Result.expectToBe('Operation must succeed');
const value2 = pipe(Result.ok(42)).map(mustBeOk).value;
console.log(value2); // 42
```

#### Call Signature

> **expectToBe**\<`S`\>(`message`): \<`E`\>(`result`) => `S`

Defined in: [src/functional/result.mts:584](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L584)

Unwraps a `Result`, returning the success value or throwing an error with the provided message.

##### Type Parameters

###### S

`S`

##### Parameters

###### message

`string`

The error message to throw if the `Result` is `Result.Err`.

##### Returns

The success value if `Result.Ok`.

> \<`E`\>(`result`): `S`

###### Type Parameters

###### E

`E`

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

`S`

##### Throws

Error with the provided message if the `Result` is `Result.Err`.

##### Example

```typescript
// Regular usage
const result = Result.ok(42);
const value = Result.expectToBe(result, 'Operation must succeed');
console.log(value); // 42

// Curried usage for pipe composition
const mustBeOk = Result.expectToBe('Operation must succeed');
const value2 = pipe(Result.ok(42)).map(mustBeOk).value;
console.log(value2); // 42
```

---

### flatMap()

#### Call Signature

> **flatMap**\<`R`, `S2`, `E2`\>(`result`, `flatMapFn`): [`Result`](../README.md#result)\<`S2`, `E2` \| [`UnwrapErr`](#unwraperr)\<`R`\>\>

Defined in: [src/functional/result.mts:530](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L530)

Applies a function that returns a `Result` to the success value of a `Result`.
If the input is `Err`, returns the original `Err`.
This is the monadic bind operation for `Result`.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

###### S2

`S2`

The success type of the `Result` returned by the function.

###### E2

`E2`

The error type of the `Result` returned by the function.

##### Parameters

###### result

`R`

The `Result` to flat map.

###### flatMapFn

(`value`) => [`Result`](../README.md#result)\<`S2`, `E2`\>

The function to apply that returns a `Result`.

##### Returns

[`Result`](../README.md#result)\<`S2`, `E2` \| [`UnwrapErr`](#unwraperr)\<`R`\>\>

The result of applying the function, or the original `Err`.

##### Example

```typescript
// Regular usage
const divide = (a: number, b: number): Result<number, string> =>
    b === 0 ? Result.err('Division by zero') : Result.ok(a / b);

const result = Result.flatMap(Result.ok(10), (x) => divide(x, 2));
console.log(Result.unwrapOk(result)); // 5

// Curried usage for pipe composition
const divideBy2 = Result.flatMap((x: number) => divide(x, 2));
const result2 = pipe(Result.ok(10)).map(divideBy2).value;
console.log(Result.unwrapOk(result2)); // 5
```

#### Call Signature

> **flatMap**\<`S`, `S2`, `E2`\>(`flatMapFn`): \<`E`\>(`result`) => [`Result`](../README.md#result)\<`S2`, `E2` \| `E`\>

Defined in: [src/functional/result.mts:534](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L534)

Applies a function that returns a `Result` to the success value of a `Result`.
If the input is `Err`, returns the original `Err`.
This is the monadic bind operation for `Result`.

##### Type Parameters

###### S

`S`

###### S2

`S2`

The success type of the `Result` returned by the function.

###### E2

`E2`

The error type of the `Result` returned by the function.

##### Parameters

###### flatMapFn

(`value`) => [`Result`](../README.md#result)\<`S2`, `E2`\>

The function to apply that returns a `Result`.

##### Returns

The result of applying the function, or the original `Err`.

> \<`E`\>(`result`): [`Result`](../README.md#result)\<`S2`, `E2` \| `E`\>

###### Type Parameters

###### E

`E`

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

[`Result`](../README.md#result)\<`S2`, `E2` \| `E`\>

##### Example

```typescript
// Regular usage
const divide = (a: number, b: number): Result<number, string> =>
    b === 0 ? Result.err('Division by zero') : Result.ok(a / b);

const result = Result.flatMap(Result.ok(10), (x) => divide(x, 2));
console.log(Result.unwrapOk(result)); // 5

// Curried usage for pipe composition
const divideBy2 = Result.flatMap((x: number) => divide(x, 2));
const result2 = pipe(Result.ok(10)).map(divideBy2).value;
console.log(Result.unwrapOk(result2)); // 5
```

---

### fold()

#### Call Signature

> **fold**\<`R`, `S2`, `E2`\>(`result`, `mapFn`, `mapErrFn`): [`Result`](../README.md#result)\<`S2`, `E2`\>

Defined in: [src/functional/result.mts:460](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L460)

Applies one of two functions depending on whether the `Result` is `Ok` or `Err`.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

###### S2

`S2`

The type of the success value returned by `mapFn`.

###### E2

`E2`

The type of the error value returned by `mapErrFn`.

##### Parameters

###### result

`R`

The `Result` to fold.

###### mapFn

(`value`) => `S2`

The function to apply if `result` is `Ok`.

###### mapErrFn

(`error`) => `E2`

The function to apply if `result` is `Err`.

##### Returns

[`Result`](../README.md#result)\<`S2`, `E2`\>

A new `Result<S2, E2>` based on the applied function.

##### Example

```typescript
// Regular usage
const result = Result.ok(42);
const folded = Result.fold(
    result,
    (x) => x * 2,
    () => 0,
);
console.log(Result.unwrapOk(folded)); // 84

// Curried usage for pipe composition
const folder = Result.fold(
    (x: number) => x * 2,
    () => 0,
);
const result2 = pipe(Result.ok(42)).map(folder).value;
console.log(Result.unwrapOk(result2)); // 84
```

#### Call Signature

> **fold**\<`S`, `E`, `S2`, `E2`\>(`mapFn`, `mapErrFn`): (`result`) => [`Result`](../README.md#result)\<`S2`, `E2`\>

Defined in: [src/functional/result.mts:465](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L465)

Applies one of two functions depending on whether the `Result` is `Ok` or `Err`.

##### Type Parameters

###### S

`S`

###### E

`E`

###### S2

`S2`

The type of the success value returned by `mapFn`.

###### E2

`E2`

The type of the error value returned by `mapErrFn`.

##### Parameters

###### mapFn

(`value`) => `S2`

The function to apply if `result` is `Ok`.

###### mapErrFn

(`error`) => `E2`

The function to apply if `result` is `Err`.

##### Returns

A new `Result<S2, E2>` based on the applied function.

> (`result`): [`Result`](../README.md#result)\<`S2`, `E2`\>

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

[`Result`](../README.md#result)\<`S2`, `E2`\>

##### Example

```typescript
// Regular usage
const result = Result.ok(42);
const folded = Result.fold(
    result,
    (x) => x * 2,
    () => 0,
);
console.log(Result.unwrapOk(folded)); // 84

// Curried usage for pipe composition
const folder = Result.fold(
    (x: number) => x * 2,
    () => 0,
);
const result2 = pipe(Result.ok(42)).map(folder).value;
console.log(Result.unwrapOk(result2)); // 84
```

---

### fromPromise()

> **fromPromise**\<`P`\>(`promise`): `Promise`\<[`Result`](../README.md#result)\<`UnwrapPromise`\<`P`\>, `unknown`\>\>

Defined in: [src/functional/result.mts:627](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L627)

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

### fromThrowable()

> **fromThrowable**\<`T`\>(`fn`): [`Result`](../README.md#result)\<`T`, `Error`\>

Defined in: [src/functional/result.mts:669](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L669)

Wraps a function that may throw an exception in a `Result`.
If the function executes successfully, returns `Result.Ok` with the result.
If the function throws, returns `Result.Err` with the caught error.

#### Type Parameters

##### T

`T`

The return type of the function.

#### Parameters

##### fn

() => `T`

The function to execute that may throw.

#### Returns

[`Result`](../README.md#result)\<`T`, `Error`\>

A `Result<T, Error>` containing either the successful result or the caught error.

#### Example

```typescript
// Wrapping JSON.parse which can throw
const parseJson = (text: string) =>
    Result.fromThrowable(() => JSON.parse(text));

const validJson = parseJson('{"valid": true}');
console.log(Result.isOk(validJson)); // true

const invalidJson = parseJson('{invalid json}');
console.log(Result.isErr(invalidJson)); // true

// Using with number conversion
const parseNumber = (str: string) =>
    Result.fromThrowable(() => {
        const num = Number(str);
        if (Number.isNaN(num)) throw new Error('Not a number');
        return num;
    });

const result = parseNumber('42').unwrapOr(0); // 42
const fallback = parseNumber('abc').unwrapOr(0); // 0
```

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

Defined in: [src/functional/result.mts:142](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L142)

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

Defined in: [src/functional/result.mts:52](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L52)

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

#### Call Signature

> **map**\<`R`, `S2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

Defined in: [src/functional/result.mts:353](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L353)

Maps a `Result<S, E>` to `Result<S2, E>` by applying a function to the success value.
If the `Result` is `Result.Err`, returns the original `Err`.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

###### S2

`S2`

The type of the success value returned by the mapping function.

##### Parameters

###### result

`R`

The `Result` to map.

###### mapFn

(`value`) => `S2`

The function to apply to the success value if present.

##### Returns

[`Result`](../README.md#result)\<`S2`, [`UnwrapErr`](#unwraperr)\<`R`\>\>

A new `Result<S2, UnwrapErr<R>>`.

##### Example

```typescript
// Regular usage
const result = Result.ok(5);
const mapped = Result.map(result, (x) => x * 2);
console.log(Result.unwrap(mapped)); // 10

// Curried version for use with pipe
const doubler = Result.map((x: number) => x * 2);
const result2 = pipe(Result.ok(5)).map(doubler).value;
console.log(Result.unwrap(result2)); // 10
```

#### Call Signature

> **map**\<`S`, `S2`\>(`mapFn`): \<`E`\>(`result`) => [`Result`](../README.md#result)\<`S2`, `E`\>

Defined in: [src/functional/result.mts:357](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L357)

Maps a `Result<S, E>` to `Result<S2, E>` by applying a function to the success value.
If the `Result` is `Result.Err`, returns the original `Err`.

##### Type Parameters

###### S

`S`

###### S2

`S2`

The type of the success value returned by the mapping function.

##### Parameters

###### mapFn

(`value`) => `S2`

The function to apply to the success value if present.

##### Returns

A new `Result<S2, UnwrapErr<R>>`.

> \<`E`\>(`result`): [`Result`](../README.md#result)\<`S2`, `E`\>

###### Type Parameters

###### E

`E`

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

[`Result`](../README.md#result)\<`S2`, `E`\>

##### Example

```typescript
// Regular usage
const result = Result.ok(5);
const mapped = Result.map(result, (x) => x * 2);
console.log(Result.unwrap(mapped)); // 10

// Curried version for use with pipe
const doubler = Result.map((x: number) => x * 2);
const result2 = pipe(Result.ok(5)).map(doubler).value;
console.log(Result.unwrap(result2)); // 10
```

---

### mapErr()

#### Call Signature

> **mapErr**\<`R`, `E2`\>(`result`, `mapFn`): [`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

Defined in: [src/functional/result.mts:406](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L406)

Maps a `Result<S, E>` to `Result<S, E2>` by applying a function to the error value.
If the `Result` is `Result.Ok`, returns the original `Ok`.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

###### E2

`E2`

The type of the error value returned by the mapping function.

##### Parameters

###### result

`R`

The `Result` to map.

###### mapFn

(`error`) => `E2`

The function to apply to the error value if present.

##### Returns

[`Result`](../README.md#result)\<[`UnwrapOk`](#unwrapok)\<`R`\>, `E2`\>

A new `Result<UnwrapOk<R>, E2>`.

##### Example

```typescript
// Regular usage
const result = Result.err('error');
const mapped = Result.mapErr(result, (e) => e.toUpperCase());
console.log(Result.unwrapErr(mapped)); // "ERROR"

// Curried usage for pipe composition
const errorUppercase = Result.mapErr((e: string) => e.toUpperCase());
const result2 = pipe(Result.err('error')).map(errorUppercase).value;
console.log(Result.unwrapErr(result2)); // "ERROR"
```

#### Call Signature

> **mapErr**\<`E`, `E2`\>(`mapFn`): \<`S`\>(`result`) => [`Result`](../README.md#result)\<`S`, `E2`\>

Defined in: [src/functional/result.mts:410](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L410)

Maps a `Result<S, E>` to `Result<S, E2>` by applying a function to the error value.
If the `Result` is `Result.Ok`, returns the original `Ok`.

##### Type Parameters

###### E

`E`

###### E2

`E2`

The type of the error value returned by the mapping function.

##### Parameters

###### mapFn

(`error`) => `E2`

The function to apply to the error value if present.

##### Returns

A new `Result<UnwrapOk<R>, E2>`.

> \<`S`\>(`result`): [`Result`](../README.md#result)\<`S`, `E2`\>

###### Type Parameters

###### S

`S`

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

[`Result`](../README.md#result)\<`S`, `E2`\>

##### Example

```typescript
// Regular usage
const result = Result.err('error');
const mapped = Result.mapErr(result, (e) => e.toUpperCase());
console.log(Result.unwrapErr(mapped)); // "ERROR"

// Curried usage for pipe composition
const errorUppercase = Result.mapErr((e: string) => e.toUpperCase());
const result2 = pipe(Result.err('error')).map(errorUppercase).value;
console.log(Result.unwrapErr(result2)); // "ERROR"
```

---

### ok()

> **ok**\<`S`\>(`value`): [`Ok`](#ok)\<`S`\>

Defined in: [src/functional/result.mts:113](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L113)

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

#### Call Signature

> **orElse**\<`R`, `R2`\>(`result`, `alternative`): `R2` \| [`NarrowToOk`](#narrowtook)\<`R`\>

Defined in: [src/functional/result.mts:753](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L753)

Returns the `Result` if it is `Ok`, otherwise returns the alternative.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The input `Result.Base` type.

###### R2

`R2` _extends_ [`Base`](#base)

##### Parameters

###### result

`R`

The `Result` to check.

###### alternative

`R2`

The alternative `Result` to return if the first is `Err`.

##### Returns

`R2` \| [`NarrowToOk`](#narrowtook)\<`R`\>

The first `Result` if `Ok`, otherwise the alternative.

##### Example

```typescript
// Regular usage
const primary = Result.err('error');
const fallback = Result.ok('default');
const result = Result.orElse(primary, fallback);
console.log(Result.unwrapOk(result)); // "default"

// Curried usage for pipe composition
const fallbackTo = Result.orElse(Result.ok('fallback'));
const result2 = pipe(Result.err('error')).map(fallbackTo).value;
console.log(Result.unwrapOk(result2)); // "fallback"
```

#### Call Signature

> **orElse**\<`S`, `E`, `S2`, `E2`\>(`alternative`): (`result`) => [`Result`](../README.md#result)\<`S2`, `E2`\> \| [`Result`](../README.md#result)\<`S`, `E`\>

Defined in: [src/functional/result.mts:757](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L757)

Returns the `Result` if it is `Ok`, otherwise returns the alternative.

##### Type Parameters

###### S

`S`

###### E

`E`

###### S2

`S2`

###### E2

`E2`

##### Parameters

###### alternative

[`Result`](../README.md#result)\<`S2`, `E2`\>

The alternative `Result` to return if the first is `Err`.

##### Returns

The first `Result` if `Ok`, otherwise the alternative.

> (`result`): [`Result`](../README.md#result)\<`S2`, `E2`\> \| [`Result`](../README.md#result)\<`S`, `E`\>

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

[`Result`](../README.md#result)\<`S2`, `E2`\> \| [`Result`](../README.md#result)\<`S`, `E`\>

##### Example

```typescript
// Regular usage
const primary = Result.err('error');
const fallback = Result.ok('default');
const result = Result.orElse(primary, fallback);
console.log(Result.unwrapOk(result)); // "default"

// Curried usage for pipe composition
const fallbackTo = Result.orElse(Result.ok('fallback'));
const result2 = pipe(Result.err('error')).map(fallbackTo).value;
console.log(Result.unwrapOk(result2)); // "fallback"
```

---

### swap()

> **swap**\<`R`\>(`result`): [`Result`](../README.md#result)\<[`UnwrapErr`](#unwraperr)\<`R`\>, [`UnwrapOk`](#unwrapok)\<`R`\>\>

Defined in: [src/functional/result.mts:698](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L698)

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

Defined in: [src/functional/result.mts:728](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L728)

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

Defined in: [src/functional/result.mts:278](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L278)

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

#### Call Signature

> **unwrapErrOr**\<`R`, `D`\>(`result`, `defaultValue`): `D` \| [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [src/functional/result.mts:306](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L306)

Unwraps a `Result`, returning the error value or a default value if it is `Result.Ok`.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

###### D

`D`

The type of the default value.

##### Parameters

###### result

`R`

The `Result` to unwrap.

###### defaultValue

`D`

The value to return if `result` is `Result.Ok`.

##### Returns

`D` \| [`UnwrapErr`](#unwraperr)\<`R`\>

The error value if `Result.Err`, otherwise `defaultValue`.

##### Example

```typescript
// Regular usage
const result = Result.err('failed');
const error = Result.unwrapErrOr(result, 'default');
console.log(error); // "failed"

// Curried usage for pipe composition
const unwrapErrorWithDefault = Result.unwrapErrOr('unknown error');
const error2 = pipe(Result.ok(42)).map(unwrapErrorWithDefault).value;
console.log(error2); // "unknown error"
```

#### Call Signature

> **unwrapErrOr**\<`E`, `D`\>(`defaultValue`): \<`S`\>(`result`) => `E` \| `D`

Defined in: [src/functional/result.mts:310](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L310)

Unwraps a `Result`, returning the error value or a default value if it is `Result.Ok`.

##### Type Parameters

###### E

`E`

###### D

`D`

The type of the default value.

##### Parameters

###### defaultValue

`D`

The value to return if `result` is `Result.Ok`.

##### Returns

The error value if `Result.Err`, otherwise `defaultValue`.

> \<`S`\>(`result`): `E` \| `D`

###### Type Parameters

###### S

`S`

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

`E` \| `D`

##### Example

```typescript
// Regular usage
const result = Result.err('failed');
const error = Result.unwrapErrOr(result, 'default');
console.log(error); // "failed"

// Curried usage for pipe composition
const unwrapErrorWithDefault = Result.unwrapErrOr('unknown error');
const error2 = pipe(Result.ok(42)).map(unwrapErrorWithDefault).value;
console.log(error2); // "unknown error"
```

---

### unwrapErrThrow()

> **unwrapErrThrow**\<`R`\>(`result`, `toStr`): [`UnwrapErr`](#unwraperr)\<`R`\>

Defined in: [src/functional/result.mts:256](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L256)

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

Defined in: [src/functional/result.mts:186](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L186)

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

Defined in: [src/functional/result.mts:193](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L193)

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

#### Call Signature

> **unwrapOkOr**\<`R`, `D`\>(`result`, `defaultValue`): `D` \| [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [src/functional/result.mts:221](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L221)

Unwraps a `Result`, returning the success value or a default value if it is `Result.Err`.

##### Type Parameters

###### R

`R` _extends_ [`Base`](#base)

The `Result.Base` type to unwrap.

###### D

`D`

The type of the default value.

##### Parameters

###### result

`R`

The `Result` to unwrap.

###### defaultValue

`D`

The value to return if `result` is `Result.Err`.

##### Returns

`D` \| [`UnwrapOk`](#unwrapok)\<`R`\>

The success value if `Result.Ok`, otherwise `defaultValue`.

##### Example

```typescript
// Regular usage
const result = Result.ok(42);
const value = Result.unwrapOkOr(result, 0);
console.log(value); // 42

// Curried usage for pipe composition
const unwrapWithDefault = Result.unwrapOkOr(0);
const value2 = pipe(Result.err('error')).map(unwrapWithDefault).value;
console.log(value2); // 0
```

#### Call Signature

> **unwrapOkOr**\<`S`, `D`\>(`defaultValue`): \<`E`\>(`result`) => `S` \| `D`

Defined in: [src/functional/result.mts:225](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L225)

Unwraps a `Result`, returning the success value or a default value if it is `Result.Err`.

##### Type Parameters

###### S

`S`

###### D

`D`

The type of the default value.

##### Parameters

###### defaultValue

`D`

The value to return if `result` is `Result.Err`.

##### Returns

The success value if `Result.Ok`, otherwise `defaultValue`.

> \<`E`\>(`result`): `S` \| `D`

###### Type Parameters

###### E

`E`

###### Parameters

###### result

[`Result`](../README.md#result)\<`S`, `E`\>

###### Returns

`S` \| `D`

##### Example

```typescript
// Regular usage
const result = Result.ok(42);
const value = Result.unwrapOkOr(result, 0);
console.log(value); // 42

// Curried usage for pipe composition
const unwrapWithDefault = Result.unwrapOkOr(0);
const value2 = pipe(Result.err('error')).map(unwrapWithDefault).value;
console.log(value2); // 0
```

---

### unwrapThrow()

> **unwrapThrow**\<`R`\>(`result`, `toStr`): [`UnwrapOk`](#unwrapok)\<`R`\>

Defined in: [src/functional/result.mts:164](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L164)

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

Defined in: [src/functional/result.mts:799](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/result.mts#L799)

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
