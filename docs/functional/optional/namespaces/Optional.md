[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [functional/optional](../README.md) / Optional

# Optional

Namespace for the [Optional](../README.md#optional) type and related functions.
Provides utilities to handle values that might be absent, similar to Option types in other languages.

## Type Aliases

### Base

> **Base** = [`Optional`](../README.md#optional)\<`unknown`\>

Defined in: [src/functional/optional.mts:71](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L71)

Base type for any [Optional](../README.md#optional), used for generic constraints.
Represents an [Optional](../README.md#optional) with an unknown value type.

---

### NarrowToNone\<O\>

> **NarrowToNone**\<`O`\> = `O` _extends_ [`None`](#none) ? `O` : `never`

Defined in: [src/functional/optional.mts:92](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L92)

Narrows an [Optional.Base](#base) type to [Optional.None](#none) if it is a [Optional.None](#none).
If the [Optional](../README.md#optional) is [Optional.Some](#some)<S>, resolves to `never`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The [Optional.Base](#base) type to narrow.

---

### NarrowToSome\<O\>

> **NarrowToSome**\<`O`\> = `O` _extends_ [`None`](#none) ? `never` : `O`

Defined in: [src/functional/optional.mts:85](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L85)

Narrows an [Optional.Base](#base) type to [Optional.Some](#some)<S> if it is a [Optional.Some](#some).
If the [Optional](../README.md#optional) is [Optional.None](#none), resolves to `never`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The [Optional.Base](#base) type to narrow.

---

### None

> **None** = `None_`

Defined in: [src/functional/optional.mts:65](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L65)

Represents an [Optional](../README.md#optional) that does not contain a value (is empty).

---

### Some\<S\>

> **Some**\<`S`\> = `Some_`\<`S`\>

Defined in: [src/functional/optional.mts:60](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L60)

Represents an [Optional](../README.md#optional) that contains a value.

#### Type Parameters

##### S

`S`

The type of the contained value.

---

### Unwrap\<O\>

> **Unwrap**\<`O`\> = `O` _extends_ [`Some`](#some)\<infer S\> ? `S` : `never`

Defined in: [src/functional/optional.mts:78](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L78)

Extracts the value type `S` from an [Optional.Some](#some)<S>.
If the [Optional](../README.md#optional) is [Optional.None](#none), resolves to `never`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The [Optional.Base](#base) type to unwrap.

## Variables

### none

> `const` **none**: [`None`](#none)

Defined in: [src/functional/optional.mts:125](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L125)

The singleton instance representing [Optional.None](#none) (an empty Optional).

#### Example

```typescript
const emptyValue = Optional.none;

console.log(Optional.isNone(emptyValue)); // true
console.log(Optional.unwrap(emptyValue)); // undefined
console.log(Optional.unwrapOr(emptyValue, 'default')); // "default"
```

## Functions

### expectToBe()

#### Call Signature

> **expectToBe**\<`O`\>(`optional`, `message`): [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:468](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L468)

Unwraps an `Optional`, returning the contained value or throwing an error with the provided message.

##### Type Parameters

###### O

`O` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

##### Parameters

###### optional

`O`

The `Optional` to unwrap.

###### message

`string`

The error message to throw if the `Optional` is `Optional.None`.

##### Returns

[`Unwrap`](#unwrap)\<`O`\>

The contained value if `Optional.Some`.

##### Throws

Error with the provided message if the `Optional` is `Optional.None`.

##### Example

```typescript
// Regular usage
const some = Optional.some(42);
const value = Optional.expectToBe(some, 'Value must exist');
console.log(value); // 42

// Curried usage for pipe composition
const getValue = Optional.expectToBe('Value must exist');
const value2 = pipe(Optional.some(42)).map(getValue).value;
console.log(value2); // 42
```

#### Call Signature

> **expectToBe**\<`S`\>(`message`): (`optional`) => `S`

Defined in: [src/functional/optional.mts:473](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L473)

Unwraps an `Optional`, returning the contained value or throwing an error with the provided message.

##### Type Parameters

###### S

`S`

##### Parameters

###### message

`string`

The error message to throw if the `Optional` is `Optional.None`.

##### Returns

The contained value if `Optional.Some`.

> (`optional`): `S`

###### Parameters

###### optional

[`Optional`](../README.md#optional)\<`S`\>

###### Returns

`S`

##### Throws

Error with the provided message if the `Optional` is `Optional.None`.

##### Example

```typescript
// Regular usage
const some = Optional.some(42);
const value = Optional.expectToBe(some, 'Value must exist');
console.log(value); // 42

// Curried usage for pipe composition
const getValue = Optional.expectToBe('Value must exist');
const value2 = pipe(Optional.some(42)).map(getValue).value;
console.log(value2); // 42
```

---

### filter()

#### Call Signature

> **filter**\<`O`\>(`optional`, `predicate`): [`Optional`](../README.md#optional)\<[`Unwrap`](#unwrap)\<`O`\>\>

Defined in: [src/functional/optional.mts:414](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L414)

Filters an `Optional` based on a predicate.
If the `Optional` is `Some` and the predicate returns true, returns the original `Optional`.
Otherwise returns `None`.

##### Type Parameters

###### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

##### Parameters

###### optional

`O`

The `Optional` to filter.

###### predicate

(`value`) => `boolean`

The predicate function.

##### Returns

[`Optional`](../README.md#optional)\<[`Unwrap`](#unwrap)\<`O`\>\>

The filtered `Optional`.

##### Example

```typescript
// Regular usage
const someEven = Optional.some(4);
const filtered = Optional.filter(someEven, (x) => x % 2 === 0);
console.log(Optional.unwrap(filtered)); // 4

// Curried usage for pipe composition
const evenFilter = Optional.filter((x: number) => x % 2 === 0);
const result = pipe(Optional.some(4)).map(evenFilter).value;
console.log(Optional.unwrap(result)); // 4
```

#### Call Signature

> **filter**\<`S`\>(`predicate`): (`optional`) => [`Optional`](../README.md#optional)\<`S`\>

Defined in: [src/functional/optional.mts:419](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L419)

Filters an `Optional` based on a predicate.
If the `Optional` is `Some` and the predicate returns true, returns the original `Optional`.
Otherwise returns `None`.

##### Type Parameters

###### S

`S`

##### Parameters

###### predicate

(`value`) => `boolean`

The predicate function.

##### Returns

The filtered `Optional`.

> (`optional`): [`Optional`](../README.md#optional)\<`S`\>

###### Parameters

###### optional

[`Optional`](../README.md#optional)\<`S`\>

###### Returns

[`Optional`](../README.md#optional)\<`S`\>

##### Example

```typescript
// Regular usage
const someEven = Optional.some(4);
const filtered = Optional.filter(someEven, (x) => x % 2 === 0);
console.log(Optional.unwrap(filtered)); // 4

// Curried usage for pipe composition
const evenFilter = Optional.filter((x: number) => x % 2 === 0);
const result = pipe(Optional.some(4)).map(evenFilter).value;
console.log(Optional.unwrap(result)); // 4
```

---

### flatMap()

#### Call Signature

> **flatMap**\<`O`, `S2`\>(`optional`, `flatMapFn`): [`Optional`](../README.md#optional)\<`S2`\>

Defined in: [src/functional/optional.mts:371](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L371)

Applies a function that returns an `Optional` to the value in an `Optional.Some`.
If the input is `Optional.None`, returns `Optional.None`.
This is the monadic bind operation for `Optional`.

##### Type Parameters

###### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

###### S2

`S2`

The value type of the `Optional` returned by the function.

##### Parameters

###### optional

`O`

The `Optional` to flat map.

###### flatMapFn

(`value`) => [`Optional`](../README.md#optional)\<`S2`\>

The function to apply that returns an `Optional`.

##### Returns

[`Optional`](../README.md#optional)\<`S2`\>

The result of applying the function, or `Optional.None`.

##### Example

```typescript
// Regular usage
const parseNumber = (s: string): Optional<number> => {
    const n = Number(s);
    return isNaN(n) ? Optional.none : Optional.some(n);
};

const result = Optional.flatMap(Optional.some('42'), parseNumber);
console.log(Optional.unwrap(result)); // 42

// Curried usage for pipe composition
const parser = Optional.flatMap(parseNumber);
const result2 = pipe(Optional.some('42')).map(parser).value;
console.log(Optional.unwrap(result2)); // 42
```

#### Call Signature

> **flatMap**\<`S`, `S2`\>(`flatMapFn`): (`optional`) => [`Optional`](../README.md#optional)\<`S2`\>

Defined in: [src/functional/optional.mts:375](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L375)

Applies a function that returns an `Optional` to the value in an `Optional.Some`.
If the input is `Optional.None`, returns `Optional.None`.
This is the monadic bind operation for `Optional`.

##### Type Parameters

###### S

`S`

###### S2

`S2`

The value type of the `Optional` returned by the function.

##### Parameters

###### flatMapFn

(`value`) => [`Optional`](../README.md#optional)\<`S2`\>

The function to apply that returns an `Optional`.

##### Returns

The result of applying the function, or `Optional.None`.

> (`optional`): [`Optional`](../README.md#optional)\<`S2`\>

###### Parameters

###### optional

[`Optional`](../README.md#optional)\<`S`\>

###### Returns

[`Optional`](../README.md#optional)\<`S2`\>

##### Example

```typescript
// Regular usage
const parseNumber = (s: string): Optional<number> => {
    const n = Number(s);
    return isNaN(n) ? Optional.none : Optional.some(n);
};

const result = Optional.flatMap(Optional.some('42'), parseNumber);
console.log(Optional.unwrap(result)); // 42

// Curried usage for pipe composition
const parser = Optional.flatMap(parseNumber);
const result2 = pipe(Optional.some('42')).map(parser).value;
console.log(Optional.unwrap(result2)); // 42
```

---

### fromNullable()

> **fromNullable**\<`T`\>(`value`): [`Optional`](../README.md#optional)\<`NonNullable`\<`T`\>\>

Defined in: [src/functional/optional.mts:540](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L540)

Converts a nullable value to an `Optional`.

#### Type Parameters

##### T

`T`

The type of the nullable value.

#### Parameters

##### value

The nullable value to convert.

`undefined` | `null` | `T`

#### Returns

[`Optional`](../README.md#optional)\<`NonNullable`\<`T`\>\>

`Optional.Some` if the value is not null or undefined, otherwise `Optional.None`.

#### Example

```typescript
const value: string | null = 'hello';
const optional = Optional.fromNullable(value);
console.log(Optional.unwrap(optional)); // "hello"

const nullValue: string | null = null;
const noneOptional = Optional.fromNullable(nullValue);
console.log(Optional.isNone(noneOptional)); // true
```

---

### isNone()

> **isNone**\<`O`\>(`optional`): `optional is NarrowToNone<O>`

Defined in: [src/functional/optional.mts:145](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L145)

Checks if an [Optional](../README.md#optional) is [Optional.None](#none).
Acts as a type guard.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The [Optional.Base](#base) type to check.

#### Parameters

##### optional

`O`

The [Optional](../README.md#optional) to check.

#### Returns

`optional is NarrowToNone<O>`

`true` if the [Optional](../README.md#optional) is [Optional.None](#none), `false` otherwise.

---

### isOptional()

> **isOptional**(`maybeOptional`): `maybeOptional is Optional<unknown>`

Defined in: [src/functional/optional.mts:47](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L47)

Checks if the given value is an [Optional](../README.md#optional).

#### Parameters

##### maybeOptional

`unknown`

The value to check.

#### Returns

`maybeOptional is Optional<unknown>`

`true` if the value is an [Optional](../README.md#optional), otherwise `false`.

---

### isSome()

> **isSome**\<`O`\>(`optional`): `optional is NarrowToSome<O>`

Defined in: [src/functional/optional.mts:134](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L134)

Checks if an [Optional](../README.md#optional) is [Optional.Some](#some).
Acts as a type guard.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The [Optional.Base](#base) type to check.

#### Parameters

##### optional

`O`

The [Optional](../README.md#optional) to check.

#### Returns

`optional is NarrowToSome<O>`

`true` if the [Optional](../README.md#optional) is [Optional.Some](#some), `false` otherwise.

---

### map()

#### Call Signature

> **map**\<`O`, `S2`\>(`optional`, `mapFn`): [`Optional`](../README.md#optional)\<`S2`\>

Defined in: [src/functional/optional.mts:319](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L319)

Maps an [Optional](../README.md#optional)<S> to [Optional](../README.md#optional)<S2> by applying a function to a contained value.
If the [Optional](../README.md#optional) is [Optional.None](#none), it returns [Optional.none](#none-1).
Otherwise, it applies the `mapFn` to the value in `Optional.Some` and returns a new `Optional.Some` with the result.

##### Type Parameters

###### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

###### S2

`S2`

The type of the value returned by the mapping function.

##### Parameters

###### optional

`O`

The `Optional` to map.

###### mapFn

(`value`) => `S2`

The function to apply to the value if it exists.

##### Returns

[`Optional`](../README.md#optional)\<`S2`\>

A new `Optional<S2>` resulting from the mapping, or `Optional.None` if the input was `Optional.None`.

##### Example

```typescript
const someNumber = Optional.some(5);
const mapped = Optional.map(someNumber, (x) => x * 2);
console.log(Optional.unwrap(mapped)); // 10

const noneValue = Optional.none;
const mappedNone = Optional.map(noneValue, (x) => x * 2);
console.log(Optional.isNone(mappedNone)); // true

// Chaining maps
const result = Optional.map(
    Optional.map(Optional.some('hello'), (s) => s.toUpperCase()),
    (s) => s.length,
);
console.log(Optional.unwrap(result)); // 5

// Curried version for use with pipe
const doubler = Optional.map((x: number) => x * 2);
const result2 = pipe(Optional.some(5)).map(doubler).value;
console.log(Optional.unwrap(result2)); // 10
```

#### Call Signature

> **map**\<`S`, `S2`\>(`mapFn`): (`optional`) => [`Optional`](../README.md#optional)\<`S2`\>

Defined in: [src/functional/optional.mts:324](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L324)

Maps an [Optional](../README.md#optional)<S> to [Optional](../README.md#optional)<S2> by applying a function to a contained value.
If the [Optional](../README.md#optional) is [Optional.None](#none), it returns [Optional.none](#none-1).
Otherwise, it applies the `mapFn` to the value in `Optional.Some` and returns a new `Optional.Some` with the result.

##### Type Parameters

###### S

`S`

###### S2

`S2`

The type of the value returned by the mapping function.

##### Parameters

###### mapFn

(`value`) => `S2`

The function to apply to the value if it exists.

##### Returns

A new `Optional<S2>` resulting from the mapping, or `Optional.None` if the input was `Optional.None`.

> (`optional`): [`Optional`](../README.md#optional)\<`S2`\>

###### Parameters

###### optional

[`Optional`](../README.md#optional)\<`S`\>

###### Returns

[`Optional`](../README.md#optional)\<`S2`\>

##### Example

```typescript
const someNumber = Optional.some(5);
const mapped = Optional.map(someNumber, (x) => x * 2);
console.log(Optional.unwrap(mapped)); // 10

const noneValue = Optional.none;
const mappedNone = Optional.map(noneValue, (x) => x * 2);
console.log(Optional.isNone(mappedNone)); // true

// Chaining maps
const result = Optional.map(
    Optional.map(Optional.some('hello'), (s) => s.toUpperCase()),
    (s) => s.length,
);
console.log(Optional.unwrap(result)); // 5

// Curried version for use with pipe
const doubler = Optional.map((x: number) => x * 2);
const result2 = pipe(Optional.some(5)).map(doubler).value;
console.log(Optional.unwrap(result2)); // 10
```

---

### orElse()

#### Call Signature

> **orElse**\<`O`, `O2`\>(`optional`, `alternative`): `O` \| `O2`

Defined in: [src/functional/optional.mts:263](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L263)

Returns the `Optional` if it is `Some`, otherwise returns the alternative.

##### Type Parameters

###### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

###### O2

`O2` _extends_ [`Base`](#base)

##### Parameters

###### optional

`O`

The `Optional` to check.

###### alternative

`O2`

The alternative `Optional` to return if the first is `None`.

##### Returns

`O` \| `O2`

The first `Optional` if `Some`, otherwise the alternative.

##### Example

```typescript
// Regular usage
const primary = Optional.none;
const fallback = Optional.some('default');
const result = Optional.orElse(primary, fallback);
console.log(Optional.unwrap(result)); // "default"

// Curried usage for pipe composition
const fallbackTo = Optional.orElse(Optional.some('fallback'));
const result2 = pipe(Optional.none).map(fallbackTo).value;
console.log(Optional.unwrap(result2)); // "fallback"
```

#### Call Signature

> **orElse**\<`S`, `S2`\>(`alternative`): (`optional`) => `Readonly`\<\{ `type`: _typeof_ `NoneTypeSymbol`; \}\> \| `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S2`; \}\> \| `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S`; \}\>

Defined in: [src/functional/optional.mts:268](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L268)

Returns the `Optional` if it is `Some`, otherwise returns the alternative.

##### Type Parameters

###### S

`S`

###### S2

`S2`

##### Parameters

###### alternative

[`Optional`](../README.md#optional)\<`S2`\>

The alternative `Optional` to return if the first is `None`.

##### Returns

The first `Optional` if `Some`, otherwise the alternative.

> (`optional`): `Readonly`\<\{ `type`: _typeof_ `NoneTypeSymbol`; \}\> \| `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S2`; \}\> \| `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S`; \}\>

###### Parameters

###### optional

[`Optional`](../README.md#optional)\<`S`\>

###### Returns

`Readonly`\<\{ `type`: _typeof_ `NoneTypeSymbol`; \}\> \| `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S2`; \}\> \| `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `S`; \}\>

##### Example

```typescript
// Regular usage
const primary = Optional.none;
const fallback = Optional.some('default');
const result = Optional.orElse(primary, fallback);
console.log(Optional.unwrap(result)); // "default"

// Curried usage for pipe composition
const fallbackTo = Optional.orElse(Optional.some('fallback'));
const result2 = pipe(Optional.none).map(fallbackTo).value;
console.log(Optional.unwrap(result2)); // "fallback"
```

---

### some()

> **some**\<`S`\>(`value`): [`Some`](#some)\<`S`\>

Defined in: [src/functional/optional.mts:109](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L109)

Creates an [Optional.Some](#some) containing the given value.

#### Type Parameters

##### S

`S`

The type of the value.

#### Parameters

##### value

`S`

The value to wrap in an [Optional.Some](#some).

#### Returns

[`Some`](#some)\<`S`\>

An [Optional.Some](#some)<S> containing the value.

#### Example

```typescript
const someValue = Optional.some(42);
const someString = Optional.some('hello');
const someObject = Optional.some({ name: 'Alice', age: 30 });

console.log(Optional.isSome(someValue)); // true
console.log(Optional.unwrap(someValue)); // 42
```

---

### toNullable()

> **toNullable**\<`O`\>(`optional`): `undefined` \| [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:558](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L558)

Converts an `Optional` to a nullable value.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The `Optional.Base` type to convert.

#### Parameters

##### optional

`O`

The `Optional` to convert.

#### Returns

`undefined` \| [`Unwrap`](#unwrap)\<`O`\>

The contained value if `Some`, otherwise `undefined`.

#### Example

```typescript
const some = Optional.some(42);
console.log(Optional.toNullable(some)); // 42

const none = Optional.none;
console.log(Optional.toNullable(none)); // null
```

---

### unwrap()

#### Call Signature

> **unwrap**\<`O`\>(`optional`): [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:180](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L180)

Unwraps an `Optional` that is known to be `Some`, returning the contained value.

##### Type Parameters

###### O

`O` _extends_ `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `unknown`; \}\>

The `Optional.Some` type to unwrap.

##### Parameters

###### optional

`O`

The `Optional.Some` to unwrap.

##### Returns

[`Unwrap`](#unwrap)\<`O`\>

The contained value.

#### Call Signature

> **unwrap**\<`O`\>(`optional`): `undefined` \| [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:187](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L187)

Unwraps an `Optional`, returning the contained value or `undefined` if it's `Optional.None`.

##### Type Parameters

###### O

`O` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

##### Parameters

###### optional

`O`

The `Optional` to unwrap.

##### Returns

`undefined` \| [`Unwrap`](#unwrap)\<`O`\>

The contained value if `Optional.Some`, otherwise `undefined`.

---

### unwrapOr()

#### Call Signature

> **unwrapOr**\<`O`, `D`\>(`optional`, `defaultValue`): `D` \| [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:216](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L216)

Unwraps an `Optional`, returning the contained value or a default value if it's `Optional.None`.

##### Type Parameters

###### O

`O` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

###### D

`D`

The type of the default value.

##### Parameters

###### optional

`O`

The `Optional` to unwrap.

###### defaultValue

`D`

The value to return if `optional` is `Optional.None`.

##### Returns

`D` \| [`Unwrap`](#unwrap)\<`O`\>

The contained value if `Optional.Some`, otherwise `defaultValue`.

##### Example

```typescript
// Regular usage
const some = Optional.some(42);
const value = Optional.unwrapOr(some, 0);
console.log(value); // 42

// Curried usage for pipe composition
const unwrapWithDefault = Optional.unwrapOr(0);
const value2 = pipe(Optional.none).map(unwrapWithDefault).value;
console.log(value2); // 0
```

#### Call Signature

> **unwrapOr**\<`S`, `D`\>(`defaultValue`): (`optional`) => `S` \| `D`

Defined in: [src/functional/optional.mts:221](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L221)

Unwraps an `Optional`, returning the contained value or a default value if it's `Optional.None`.

##### Type Parameters

###### S

`S`

###### D

`D`

The type of the default value.

##### Parameters

###### defaultValue

`D`

The value to return if `optional` is `Optional.None`.

##### Returns

The contained value if `Optional.Some`, otherwise `defaultValue`.

> (`optional`): `S` \| `D`

###### Parameters

###### optional

[`Optional`](../README.md#optional)\<`S`\>

###### Returns

`S` \| `D`

##### Example

```typescript
// Regular usage
const some = Optional.some(42);
const value = Optional.unwrapOr(some, 0);
console.log(value); // 42

// Curried usage for pipe composition
const unwrapWithDefault = Optional.unwrapOr(0);
const value2 = pipe(Optional.none).map(unwrapWithDefault).value;
console.log(value2); // 0
```

---

### unwrapThrow()

> **unwrapThrow**\<`O`\>(`optional`): [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:165](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L165)

Unwraps an `Optional`, returning the contained value.
Throws an error if the `Optional` is `Optional.None`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

#### Parameters

##### optional

`O`

The `Optional` to unwrap.

#### Returns

[`Unwrap`](#unwrap)\<`O`\>

The contained value if `Optional.Some`.

#### Throws

Error if the `Optional` is `Optional.None`.

#### Example

```typescript
const some = Optional.some(42);
console.log(Optional.unwrapThrow(some)); // 42

const none = Optional.none;
// Optional.unwrapThrow(none); // throws Error
```

---

### zip()

> **zip**\<`A`, `B`\>(`optionalA`, `optionalB`): [`Optional`](../README.md#optional)\<readonly \[`A`, `B`\]\>

Defined in: [src/functional/optional.mts:516](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L516)

Combines two `Optional` values into a single `Optional` containing a tuple.
If either `Optional` is `None`, returns `None`.

#### Type Parameters

##### A

`A`

The value type of the first `Optional`.

##### B

`B`

The value type of the second `Optional`.

#### Parameters

##### optionalA

[`Optional`](../README.md#optional)\<`A`\>

The first `Optional`.

##### optionalB

[`Optional`](../README.md#optional)\<`B`\>

The second `Optional`.

#### Returns

[`Optional`](../README.md#optional)\<readonly \[`A`, `B`\]\>

An `Optional` containing a tuple of both values, or `None`.

#### Example

```typescript
const a = Optional.some(1);
const b = Optional.some('hello');
const zipped = Optional.zip(a, b);
console.log(Optional.unwrap(zipped)); // [1, "hello"]

const withNone = Optional.zip(a, Optional.none);
console.log(Optional.isNone(withNone)); // true
```
