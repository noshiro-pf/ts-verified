[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [functional/optional](../README.md) / Optional

# Optional

Namespace for `Optional` type and related functions.
Provides a way to handle values that might be absent, similar to Option types in other languages.

## Type Aliases

### Base

> **Base** = [`Optional`](../README.md#optional)\<`unknown`\>

Defined in: [functional/optional.mts:52](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L52)

Base type for any `Optional`, used for generic constraints.
Represents an `Optional` with an unknown value type.

---

### NarrowToNone\<M\>

> **NarrowToNone**\<`M`\> = `M` _extends_ [`Some`](#some)\<`unknown`\> ? `never` : `M`

Defined in: [functional/optional.mts:73](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L73)

Narrows an `Optional.Base` type to `Optional.None` if it is indeed a `None`.
If the `Optional` is `Optional.Some<S>`, it resolves to `never`.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to narrow.

---

### NarrowToSome\<M\>

> **NarrowToSome**\<`M`\> = `M` _extends_ [`None`](#none) ? `never` : `M`

Defined in: [functional/optional.mts:66](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L66)

Narrows an `Optional.Base` type to `Optional.Some<S>` if it is indeed a `Some`.
If the `Optional` is `Optional.None`, it resolves to `never`.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to narrow.

---

### None

> **None** = `None_`

Defined in: [functional/optional.mts:46](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L46)

Represents an `Optional` that does not contain a value (is empty).

---

### Some\<S\>

> **Some**\<`S`\> = `Some_`\<`S`\>

Defined in: [functional/optional.mts:42](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L42)

Represents an `Optional` that contains a value.

#### Type Parameters

##### S

`S`

The type of the contained value.

---

### Unwrap\<M\>

> **Unwrap**\<`M`\> = `M` _extends_ [`Some`](#some)\<infer S\> ? `S` : `never`

Defined in: [functional/optional.mts:59](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L59)

Extracts the value type `S` from an `Optional.Some<S>`.
If the `Optional` is `Optional.None`, it resolves to `never`.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

## Variables

### none

> `const` **none**: [`None`](#none)

Defined in: [functional/optional.mts:90](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L90)

Represents an `Optional.None` (empty Optional).

## Functions

### expectToBe()

> **expectToBe**\<`M`\>(`message`): (`optional`) => [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/optional.mts:193](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L193)

Returns a function that unwraps an `Optional`, returning the contained value.
Throws an error with the provided message if the `Optional` is `Optional.None`.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

#### Parameters

##### message

`string`

The error message to throw if the `Optional` is `Optional.None`.

#### Returns

A function that takes an `Optional` and returns its contained value or throws.

> (`optional`): [`Unwrap`](#unwrap)\<`M`\>

##### Parameters

###### optional

`M`

##### Returns

[`Unwrap`](#unwrap)\<`M`\>

---

### isNone()

> **isNone**\<`M`\>(`optional`): `optional is NarrowToNone<M>`

Defined in: [functional/optional.mts:110](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L110)

Checks if an `Optional` is `Optional.None`.
Acts as a type guard.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to check.

#### Parameters

##### optional

`M`

The `Optional` to check.

#### Returns

`optional is NarrowToNone<M>`

`true` if the `Optional` is `Optional.None`, `false` otherwise.

---

### isSome()

> **isSome**\<`M`\>(`optional`): `optional is NarrowToSome<M>`

Defined in: [functional/optional.mts:99](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L99)

Checks if an `Optional` is `Optional.Some`.
Acts as a type guard.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to check.

#### Parameters

##### optional

`M`

The `Optional` to check.

#### Returns

`optional is NarrowToSome<M>`

`true` if the `Optional` is `Optional.Some`, `false` otherwise.

---

### map()

> **map**\<`M`, `S2`\>(`optional`, `mapFn`): [`Optional`](../README.md#optional)\<`S2`\>

Defined in: [functional/optional.mts:124](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L124)

Maps an `Optional<S>` to `Optional<S2>` by applying a function to a contained value.
If the `Optional` is `Optional.None`, it returns `Optional.None`.
Otherwise, it applies the `mapFn` to the value in `Optional.Some` and returns a new `Optional.Some` with the result.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The input `Optional.Base` type.

##### S2

`S2`

The type of the value returned by the mapping function.

#### Parameters

##### optional

`M`

The `Optional` to map.

##### mapFn

(`value`) => `S2`

The function to apply to the value if it exists.

#### Returns

[`Optional`](../README.md#optional)\<`S2`\>

A new `Optional<S2>` resulting from the mapping, or `Optional.None` if the input was `Optional.None`.

---

### some()

> **some**\<`S`\>(`value`): `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S`; \}\>

Defined in: [functional/optional.mts:82](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L82)

Creates an `Optional.Some` containing the given value.

#### Type Parameters

##### S

`S`

The type of the value.

#### Parameters

##### value

`S`

The value to wrap in an `Optional.Some`.

#### Returns

`Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S`; \}\>

An `Optional.Some<S>` containing the value.

---

### unwrap()

> **unwrap**\<`M`\>(`optional`): `undefined` \| [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/optional.mts:160](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L160)

Unwraps an `Optional`, returning the contained value or `undefined` if it's `Optional.None`.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

#### Parameters

##### optional

`M`

The `Optional` to unwrap.

#### Returns

`undefined` \| [`Unwrap`](#unwrap)\<`M`\>

The contained value if `Optional.Some`, otherwise `undefined`.

---

### unwrapOr()

> **unwrapOr**\<`M`, `D`\>(`optional`, `defaultValue`): `D` \| [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/optional.mts:176](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L176)

Unwraps an `Optional`, returning the contained value or a default value if it's `Optional.None`.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

##### D

`D`

The type of the default value.

#### Parameters

##### optional

`M`

The `Optional` to unwrap.

##### defaultValue

`D`

The value to return if `optional` is `Optional.None`.

#### Returns

`D` \| [`Unwrap`](#unwrap)\<`M`\>

The contained value if `Optional.Some`, otherwise `defaultValue`.

---

### unwrapThrow()

> **unwrapThrow**\<`M`\>(`optional`): [`Unwrap`](#unwrap)\<`M`\>

Defined in: [functional/optional.mts:145](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L145)

Unwraps an `Optional`, returning the contained value.
Throws an error if the `Optional` is `Optional.None`.

#### Type Parameters

##### M

`M` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

#### Parameters

##### optional

`M`

The `Optional` to unwrap.

#### Returns

[`Unwrap`](#unwrap)\<`M`\>

The contained value if `Optional.Some`.

#### Throws

Error if the `Optional` is `Optional.None`.
