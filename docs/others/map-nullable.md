[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/map-nullable

# others/map-nullable

## Functions

### mapNullable()

#### Call Signature

> **mapNullable**\<`A`, `B`\>(`value`, `mapFn`): `undefined` \| `B`

Defined in: [src/others/map-nullable.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/map-nullable.mts#L38)

Applies a function to a value if the value is not `null` or `undefined`.
If the value is `null` or `undefined`, it returns `undefined`.
Similar to Optional.map() but works with nullable values directly.

##### Type Parameters

###### A

`A`

The type of the input value.

###### B

`B`

The type of the value returned by the function `fn`.

##### Parameters

###### value

The value to potentially transform. It can be of type `A`, `null`, or `undefined`.

`undefined` | `null` | `A`

###### mapFn

(`v`) => `B`

A function that takes a non-nullable value of type `A` and returns a value of type `B`.

##### Returns

`undefined` \| `B`

The result of applying `mapFn` to `value` if `value` is not `null` or `undefined`; otherwise, `undefined`.

##### Example

```typescript
// Regular usage
mapNullable('hello', (s) => s.toUpperCase()); // "HELLO"
mapNullable(null, (s) => s.toUpperCase()); // undefined
mapNullable(undefined, (s) => s.toUpperCase()); // undefined

const user: { name?: string } = getUserData();
const uppercaseName = mapNullable(user.name, (name) => name.toUpperCase());
// uppercaseName is string | undefined

// Curried usage for pipe composition
const toUpperCase = mapNullable((s: string) => s.toUpperCase());
const result1 = toUpperCase('hello'); // "HELLO"
const result2 = toUpperCase(null); // undefined

// Chaining with pipe
const processName = pipe('john')
    .map(mapNullable((s: string) => s.toUpperCase()))
    .map(mapNullable((s: string) => `Hello, ${s}!`)).value; // "Hello, JOHN!"

// Handling nullable chains
const result = mapNullable(getValue(), (x) => x * 2);
const finalResult = mapNullable(result, (x) => x.toString());
```

#### Call Signature

> **mapNullable**\<`A`, `B`\>(`mapFn`): (`value`) => `undefined` \| `B`

Defined in: [src/others/map-nullable.mts:42](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/map-nullable.mts#L42)

Applies a function to a value if the value is not `null` or `undefined`.
If the value is `null` or `undefined`, it returns `undefined`.
Similar to Optional.map() but works with nullable values directly.

##### Type Parameters

###### A

`A`

The type of the input value.

###### B

`B`

The type of the value returned by the function `fn`.

##### Parameters

###### mapFn

(`v`) => `B`

A function that takes a non-nullable value of type `A` and returns a value of type `B`.

##### Returns

The result of applying `mapFn` to `value` if `value` is not `null` or `undefined`; otherwise, `undefined`.

> (`value`): `undefined` \| `B`

###### Parameters

###### value

`undefined` | `null` | `A`

###### Returns

`undefined` \| `B`

##### Example

```typescript
// Regular usage
mapNullable('hello', (s) => s.toUpperCase()); // "HELLO"
mapNullable(null, (s) => s.toUpperCase()); // undefined
mapNullable(undefined, (s) => s.toUpperCase()); // undefined

const user: { name?: string } = getUserData();
const uppercaseName = mapNullable(user.name, (name) => name.toUpperCase());
// uppercaseName is string | undefined

// Curried usage for pipe composition
const toUpperCase = mapNullable((s: string) => s.toUpperCase());
const result1 = toUpperCase('hello'); // "HELLO"
const result2 = toUpperCase(null); // undefined

// Chaining with pipe
const processName = pipe('john')
    .map(mapNullable((s: string) => s.toUpperCase()))
    .map(mapNullable((s: string) => `Hello, ${s}!`)).value; // "Hello, JOHN!"

// Handling nullable chains
const result = mapNullable(getValue(), (x) => x * 2);
const finalResult = mapNullable(result, (x) => x.toString());
```
