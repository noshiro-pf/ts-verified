[**Documentation**](../README.md)

---

[Documentation](../README.md) / functional/pipe

# functional/pipe

## Functions

### pipe()

> **pipe**\<`A`\>(`a`): `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `B`; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `undefined` \| `B`; \}\>; `value`: `B`; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `B`; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `undefined` \| `B`; \}\>; `value`: `undefined` \| `B`; \}\>; `value`: `A`; \}\>

Defined in: [functional/pipe.mts:9](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/pipe.mts#L9)

Creates a new `Pipe` object, which allows for chaining operations on a value.

#### Type Parameters

##### A

`A`

The type of the initial value.

#### Parameters

##### a

`A`

The initial value.

#### Returns

`Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `B`; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `undefined` \| `B`; \}\>; `value`: `B`; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `B`; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `mapNullable`: \<`B`\>(`fn`) => `Readonly`\<\{ `map`: ...; `mapNullable`: ...; `value`: ...; \}\>; `value`: `undefined` \| `B`; \}\>; `value`: `undefined` \| `B`; \}\>; `value`: `A`; \}\>

A `Pipe<A>` object containing the initial value and chain methods.
