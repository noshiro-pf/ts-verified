[**Documentation**](../README.md)

---

[Documentation](../README.md) / functional/pipe

# functional/pipe

## Functions

### pipe()

#### Call Signature

> **pipe**\<`A`\>(`a`): `PipeWithMapOptional`\<`A`\>

Defined in: [src/functional/pipe.mts:44](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/pipe.mts#L44)

Creates a new pipe object that allows for chaining operations on a value.

This function provides a fluent interface for applying transformations to values,
with special support for Optional types that get additional mapOptional functionality.

##### Type Parameters

###### A

`A` _extends_ [`Optional`](optional/README.md#optional)\<`unknown`\>

The type of the initial value.

##### Parameters

###### a

`A`

The initial value to wrap in a pipe.

##### Returns

`PipeWithMapOptional`\<`A`\>

A pipe object with chaining methods appropriate for the value type.

##### Example

```typescript
// Basic value chaining
const result = pipe(10)
    .map((x) => x * 2) // 20
    .map((x) => x + 5) // 25
    .map((x) => x.toString()).value; // '25'

// Nullable value handling
const maybeNumber: number | null = getNumber();
const result2 = pipe(maybeNumber)
    .mapNullable((x) => x * 2) // Only applies if not null
    .mapNullable((x) => `Result: ${x}`).value; // Only applies if previous step succeeded // 'Result: 20' or undefined

// Optional value handling
const optional = Optional.some(42);
const result3 = pipe(optional)
    .mapOptional((x) => x / 2) // 21
    .mapOptional((x) => Math.sqrt(x)).value; // ~4.58 // Optional.some(4.58...)

// Chaining different operation types
const complex = pipe('hello')
    .map((s) => s.length) // 5
    .map((n) => (n > 3 ? n : null)) // 5
    .mapNullable((n) => n * 10).value; // 50 // 50 or undefined
```

#### Call Signature

> **pipe**\<`A`\>(`a`): `PipeBase`\<`A`\>

Defined in: [src/functional/pipe.mts:48](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/pipe.mts#L48)

Creates a new pipe object that allows for chaining operations on a value.

This function provides a fluent interface for applying transformations to values,
with special support for Optional types that get additional mapOptional functionality.

##### Type Parameters

###### A

`A`

The type of the initial value.

##### Parameters

###### a

`A`

The initial value to wrap in a pipe.

##### Returns

`PipeBase`\<`A`\>

A pipe object with chaining methods appropriate for the value type.

##### Example

```typescript
// Basic value chaining
const result = pipe(10)
    .map((x) => x * 2) // 20
    .map((x) => x + 5) // 25
    .map((x) => x.toString()).value; // '25'

// Nullable value handling
const maybeNumber: number | null = getNumber();
const result2 = pipe(maybeNumber)
    .mapNullable((x) => x * 2) // Only applies if not null
    .mapNullable((x) => `Result: ${x}`).value; // Only applies if previous step succeeded // 'Result: 20' or undefined

// Optional value handling
const optional = Optional.some(42);
const result3 = pipe(optional)
    .mapOptional((x) => x / 2) // 21
    .mapOptional((x) => Math.sqrt(x)).value; // ~4.58 // Optional.some(4.58...)

// Chaining different operation types
const complex = pipe('hello')
    .map((s) => s.length) // 5
    .map((n) => (n > 3 ? n : null)) // 5
    .mapNullable((n) => n * 10).value; // 50 // 50 or undefined
```
