[**Documentation**](../README.md)

---

[Documentation](../README.md) / functional/pipe

# functional/pipe

## Functions

### pipe()

> **pipe**\<`A`\>(`a`): `Pipe`\<`A`\>

Defined in: [src/functional/pipe.mts:12](https://github.com/noshiro-pf/ts-verified/blob/main/src/functional/pipe.mts#L12)

Creates a new Pipe object, which allows for chaining operations on a value.

#### Type Parameters

##### A

`A`

The type of the initial value.

#### Parameters

##### a

`A`

The initial value.

#### Returns

`Pipe`\<`A`\>

A Pipe object containing the initial value and chain methods.

#### Example

```ts
pipe(1).map((x) => x + 1).value; // 2
```
