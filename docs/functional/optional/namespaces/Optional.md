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

> **NarrowToNone**\<`O`\> = `O` _extends_ [`Some`](#some)\<`unknown`\> ? `never` : `O`

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

Defined in: [src/functional/optional.mts:126](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L126)

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

> **expectToBe**\<`O`\>(`message`): (`optional`) => [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:341](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L341)

Returns a function that unwraps an `Optional`, returning the contained value.
Throws an error with the provided message if the `Optional` is `Optional.None`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

#### Parameters

##### message

`string`

The error message to throw if the `Optional` is `Optional.None`.

#### Returns

A function that takes an `Optional` and returns its contained value or throws.

> (`optional`): [`Unwrap`](#unwrap)\<`O`\>

##### Parameters

###### optional

`O`

##### Returns

[`Unwrap`](#unwrap)\<`O`\>

#### Example

```typescript
const getValue = Optional.expectToBe<Optional<number>>('Value must exist');
const some = Optional.some(42);
console.log(getValue(some)); // 42

const none = Optional.none;
// getValue(none); // throws Error: "Value must exist"
```

---

### filter()

> **filter**\<`O`\>(`optional`, `predicate`): [`Optional`](../README.md#optional)\<[`Unwrap`](#unwrap)\<`O`\>\>

Defined in: [src/functional/optional.mts:314](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L314)

Filters an `Optional` based on a predicate.
If the `Optional` is `Some` and the predicate returns true, returns the original `Optional`.
Otherwise returns `None`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

#### Parameters

##### optional

`O`

The `Optional` to filter.

##### predicate

(`value`) => `boolean`

The predicate function.

#### Returns

[`Optional`](../README.md#optional)\<[`Unwrap`](#unwrap)\<`O`\>\>

The filtered `Optional`.

#### Example

```typescript
const someEven = Optional.some(4);
const filtered = Optional.filter(someEven, (x) => x % 2 === 0);
console.log(Optional.unwrap(filtered)); // 4

const someOdd = Optional.some(5);
const filteredOdd = Optional.filter(someOdd, (x) => x % 2 === 0);
console.log(Optional.isNone(filteredOdd)); // true
```

---

### flatMap()

> **flatMap**\<`O`, `S2`\>(`optional`, `flatMapFn`): [`Optional`](../README.md#optional)\<`S2`\>

Defined in: [src/functional/optional.mts:290](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L290)

Applies a function that returns an `Optional` to the value in an `Optional.Some`.
If the input is `Optional.None`, returns `Optional.None`.
This is the monadic bind operation for `Optional`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

##### S2

`S2`

The value type of the `Optional` returned by the function.

#### Parameters

##### optional

`O`

The `Optional` to flat map.

##### flatMapFn

(`value`) => [`Optional`](../README.md#optional)\<`S2`\>

The function to apply that returns an `Optional`.

#### Returns

[`Optional`](../README.md#optional)\<`S2`\>

The result of applying the function, or `Optional.None`.

#### Example

```typescript
const parseNumber = (s: string): Optional<number> => {
    const n = Number(s);
    return isNaN(n) ? Optional.none : Optional.some(n);
};

const result = Optional.flatMap(Optional.some('42'), parseNumber);
console.log(Optional.unwrap(result)); // 42

const invalid = Optional.flatMap(Optional.some('abc'), parseNumber);
console.log(Optional.isNone(invalid)); // true
```

---

### fromNullable()

> **fromNullable**\<`T`\>(`value`): [`Optional`](../README.md#optional)\<`NonNullable`\<`T`\>\>

Defined in: [src/functional/optional.mts:393](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L393)

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

Defined in: [src/functional/optional.mts:146](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L146)

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

Defined in: [src/functional/optional.mts:135](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L135)

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

> **map**\<`O`, `S2`\>(`optional`, `mapFn`): [`Optional`](../README.md#optional)\<`S2`\>

Defined in: [src/functional/optional.mts:260](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L260)

Maps an [Optional](../README.md#optional)<S> to [Optional](../README.md#optional)<S2> by applying a function to a contained value.
If the [Optional](../README.md#optional) is [Optional.None](#none), it returns [Optional.none](#none-1).
Otherwise, it applies the `mapFn` to the value in `Optional.Some` and returns a new `Optional.Some` with the result.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

##### S2

`S2`

The type of the value returned by the mapping function.

#### Parameters

##### optional

`O`

The `Optional` to map.

##### mapFn

(`value`) => `S2`

The function to apply to the value if it exists.

#### Returns

[`Optional`](../README.md#optional)\<`S2`\>

A new `Optional<S2>` resulting from the mapping, or `Optional.None` if the input was `Optional.None`.

#### Example

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
```

---

### orElse()

> **orElse**\<`O`, `O2`\>(`optional`, `alternative`): `O` \| `O2`

Defined in: [src/functional/optional.mts:228](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L228)

Returns the `Optional` if it is `Some`, otherwise returns the alternative.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The input `Optional.Base` type.

##### O2

`O2` _extends_ [`Base`](#base)

#### Parameters

##### optional

`O`

The `Optional` to check.

##### alternative

`O2`

The alternative `Optional` to return if the first is `None`.

#### Returns

`O` \| `O2`

The first `Optional` if `Some`, otherwise the alternative.

#### Example

```typescript
const primary = Optional.none;
const fallback = Optional.some('default');
const result = Optional.orElse(primary, fallback);
console.log(Optional.unwrap(result)); // "default"
```

---

### some()

> **some**\<`S`\>(`value`): [`Some`](#some)\<`S`\>

Defined in: [src/functional/optional.mts:110](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L110)

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

Defined in: [src/functional/optional.mts:411](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L411)

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

> **unwrap**\<`O`\>(`optional`): [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:181](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L181)

Unwraps an `Optional`, returning the contained value or `undefined` if it's `Optional.None`.

#### Type Parameters

##### O

`O` _extends_ `Readonly`\<\{ `type`: _typeof_ `SomeTypeSymbol`; `value`: `unknown`; \}\>

The `Optional.Some` type to unwrap.

#### Parameters

##### optional

`O`

The `Optional.Some` to unwrap.

#### Returns

[`Unwrap`](#unwrap)\<`O`\>

The contained value if `Optional.Some`, otherwise `undefined`.

#### Template

The `Optional.Base` type to unwrap.

#### Param

The `Optional` to unwrap.

---

### unwrapOr()

> **unwrapOr**\<`O`, `D`\>(`optional`, `defaultValue`): `D` \| [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:205](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L205)

Unwraps an `Optional`, returning the contained value or a default value if it's `Optional.None`.

#### Type Parameters

##### O

`O` _extends_ [`Base`](#base)

The `Optional.Base` type to unwrap.

##### D

`D`

The type of the default value.

#### Parameters

##### optional

`O`

The `Optional` to unwrap.

##### defaultValue

`D`

The value to return if `optional` is `Optional.None`.

#### Returns

`D` \| [`Unwrap`](#unwrap)\<`O`\>

The contained value if `Optional.Some`, otherwise `defaultValue`.

---

### unwrapThrow()

> **unwrapThrow**\<`O`\>(`optional`): [`Unwrap`](#unwrap)\<`O`\>

Defined in: [src/functional/optional.mts:166](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L166)

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

Defined in: [src/functional/optional.mts:369](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/optional.mts#L369)

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
