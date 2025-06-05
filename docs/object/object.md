[**Documentation**](../README.md)

---

[Documentation](../README.md) / object/object

# object/object

## Variables

### Obj

> `const` **Obj**: `object`

Defined in: [src/object/object.mts:226](https://github.com/noshiro-pf/ts-verified/blob/main/src/object/object.mts#L226)

A collection of object utility functions.

#### Type declaration

##### fromEntries()

> **fromEntries**: \<`Entries`\>(`entries`) => `IsFixedLengthList`\<`Entries`\> _extends_ `true` ? `Readonly`\<`EntriesToObjectImpl`\<\{ \}, `Entries`\>\> : `PartialIfKeyIsUnion`\<`TypeEq`\<`Entries`\[`"length"`\], `0`\> _extends_ `true` ? `never` : `TypeEq`\<`Tail`\<`Entries`\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`0`\] : `TypeEq`\<`Tail`\<`Tail`\<...\>\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`0`\] \| `Tail`\<...\>\[`0`\]\[`0`\] : `TypeEq`\<`Tail`\<...\>\[`"length"`\], `0`\> _extends_ `true` ? ...\[...\]\[`0`\] \| ...\[...\]\[`0`\] \| ...\[...\]\[`0`\] : `TypeEq`\<...\[...\], `0`\> _extends_ `true` ? ...\[...\] \| ...\[...\] \| ...\[...\] \| ...\[...\] : `TypeEq`\<..., ...\> _extends_ `true` ? ... \| ... \| ... \| ... \| ... : ... _extends_ ... ? ... : ..., `Record`\<`TypeEq`\<`Entries`\[`"length"`\], `0`\> _extends_ `true` ? `never` : `TypeEq`\<`Tail`\<`Entries`\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`0`\] : `TypeEq`\<`Tail`\<...\>\[`"length"`\], `0`\> _extends_ `true` ? ...\[...\]\[`0`\] \| ...\[...\]\[`0`\] : `TypeEq`\<...\[...\], `0`\> _extends_ `true` ? ...\[...\] \| ...\[...\] \| ...\[...\] : `TypeEq`\<..., ...\> _extends_ `true` ? ... \| ... \| ... \| ... : ... _extends_ ... ? ... : ..., `TypeEq`\<`Entries`\[`"length"`\], `0`\> _extends_ `true` ? `never` : `TypeEq`\<`Tail`\<`Entries`\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`1`\] : `TypeEq`\<`Tail`\<...\>\[`"length"`\], `0`\> _extends_ `true` ? ...\[...\]\[`1`\] \| ...\[...\]\[`1`\] : `TypeEq`\<...\[...\], `0`\> _extends_ `true` ? ...\[...\] \| ...\[...\] \| ...\[...\] : `TypeEq`\<..., ...\> _extends_ `true` ? ... \| ... \| ... \| ... : ... _extends_ ... ? ... : ...\>\>

Returns an object created by key-value entries for properties and methods

###### Type Parameters

###### Entries

`Entries` _extends_ readonly readonly \[`PropertyKey`, `unknown`\][]

###### Parameters

###### entries

`Entries`

An iterable object that contains key-value entries for properties and methods.

```ts
const entries = [
    ['x', 1],
    ['y', 3],
] as const satisfies [['x', 1], ['y', 3]];

const obj = Object.fromEntries(entries) satisfies { x: 1; y: 3 };
```

###### Returns

`IsFixedLengthList`\<`Entries`\> _extends_ `true` ? `Readonly`\<`EntriesToObjectImpl`\<\{ \}, `Entries`\>\> : `PartialIfKeyIsUnion`\<`TypeEq`\<`Entries`\[`"length"`\], `0`\> _extends_ `true` ? `never` : `TypeEq`\<`Tail`\<`Entries`\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`0`\] : `TypeEq`\<`Tail`\<`Tail`\<...\>\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`0`\] \| `Tail`\<...\>\[`0`\]\[`0`\] : `TypeEq`\<`Tail`\<...\>\[`"length"`\], `0`\> _extends_ `true` ? ...\[...\]\[`0`\] \| ...\[...\]\[`0`\] \| ...\[...\]\[`0`\] : `TypeEq`\<...\[...\], `0`\> _extends_ `true` ? ...\[...\] \| ...\[...\] \| ...\[...\] \| ...\[...\] : `TypeEq`\<..., ...\> _extends_ `true` ? ... \| ... \| ... \| ... \| ... : ... _extends_ ... ? ... : ..., `Record`\<`TypeEq`\<`Entries`\[`"length"`\], `0`\> _extends_ `true` ? `never` : `TypeEq`\<`Tail`\<`Entries`\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`0`\] : `TypeEq`\<`Tail`\<...\>\[`"length"`\], `0`\> _extends_ `true` ? ...\[...\]\[`0`\] \| ...\[...\]\[`0`\] : `TypeEq`\<...\[...\], `0`\> _extends_ `true` ? ...\[...\] \| ...\[...\] \| ...\[...\] : `TypeEq`\<..., ...\> _extends_ `true` ? ... \| ... \| ... \| ... : ... _extends_ ... ? ... : ..., `TypeEq`\<`Entries`\[`"length"`\], `0`\> _extends_ `true` ? `never` : `TypeEq`\<`Tail`\<`Entries`\>\[`"length"`\], `0`\> _extends_ `true` ? `Entries`\[`0`\]\[`1`\] : `TypeEq`\<`Tail`\<...\>\[`"length"`\], `0`\> _extends_ `true` ? ...\[...\]\[`1`\] \| ...\[...\]\[`1`\] : `TypeEq`\<...\[...\], `0`\> _extends_ `true` ? ...\[...\] \| ...\[...\] \| ...\[...\] : `TypeEq`\<..., ...\> _extends_ `true` ? ... \| ... \| ... \| ... : ... _extends_ ... ? ... : ...\>\>

###### Note

When `entries` is a tuple type, the type reflects the key-value combinations.
Otherwise, when `K` is a union type, since `entries` may not cover all union members,
`Partial` is applied to prevent the return type of `fromEntries` from incorrectly
including all union elements.

##### omit()

> **omit**: \<`R`, `Keys`\>(`record`, `keys`) => `Omit`\<`R`, `ArrayElement`\<`Keys`\>\>

Creates a new record that omits the specified `keys` of `record` and contains the rest.
Returns a new object with all properties except those whose keys are included in the `keys` array.

###### Type Parameters

###### R

`R` _extends_ `UnknownRecord`

The type of the input record.

###### Keys

`Keys` _extends_ readonly keyof `R`[]

The array type of keys to omit from the record.

###### Parameters

###### record

`R`

The source record to omit properties from.

###### keys

`Keys`

An array of keys to exclude from the result.

###### Returns

`Omit`\<`R`, `ArrayElement`\<`Keys`\>\>

A new record containing all properties except the specified keys.

###### Example

```typescript
const original = { a: 1, b: 2, c: 3, d: 4 };

Obj.omit(original, ['a', 'c']); // { b: 2, d: 4 }
Obj.omit(original, ['b']); // { a: 1, c: 3, d: 4 }
Obj.omit(original, []); // { a: 1, b: 2, c: 3, d: 4 } (no keys omitted)

// With typed objects
const user = {
    id: 1,
    name: 'Alice',
    email: 'alice@example.com',
    password: 'secret',
};
const safeUser = Obj.omit(user, ['password']); // { id: 1, name: "Alice", email: "alice@example.com" }

// Remove multiple sensitive fields
const publicData = Obj.omit(user, ['password', 'email']); // { id: 1, name: "Alice" }

// Type safety - only valid keys are allowed
// Obj.omit(user, ['invalidKey']); // TypeScript error
```

##### pick()

> **pick**: \<`R`, `Keys`\>(`record`, `keys`) => `Pick`\<`R`, `ArrayElement`\<`Keys`\>\>

Creates a new record that contains only the specified `keys` of `record` and omits the rest.
Returns a new object with only the properties whose keys are included in the `keys` array.

###### Type Parameters

###### R

`R` _extends_ `UnknownRecord`

The type of the input record.

###### Keys

`Keys` _extends_ readonly keyof `R`[]

The array type of keys to pick from the record.

###### Parameters

###### record

`R`

The source record to pick properties from.

###### keys

`Keys`

An array of keys to include in the result.

###### Returns

`Pick`\<`R`, `ArrayElement`\<`Keys`\>\>

A new record containing only the specified keys and their values.

###### Example

```typescript
const original = { a: 1, b: 2, c: 3, d: 4 };

Obj.pick(original, ['a', 'c']); // { a: 1, c: 3 }
Obj.pick(original, ['b']); // { b: 2 }
Obj.pick(original, []); // {}

// With typed objects
const user = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 };
const publicUser = Obj.pick(user, ['id', 'name']); // { id: 1, name: "Alice" }

// Type safety - only valid keys are allowed
// Obj.pick(user, ['invalidKey']); // TypeScript error
```

##### shallowEq()

> **shallowEq**: (`a`, `b`) => `boolean`

Performs a shallow equality check on two records.
It verifies that both records have the same number of entries and that for every key in the first record,
the corresponding value is strictly equal (`===`) to the value in the second record.
Note: This function assumes that the values in the records are primitives.

###### Parameters

###### a

`ReadonlyRecord`\<`string`, `Primitive`\>

The first record, with string keys and primitive values.

###### b

`ReadonlyRecord`\<`string`, `Primitive`\>

The second record, with string keys and primitive values.

###### Returns

`boolean`

`true` if the records are shallowly equal, `false` otherwise.

###### Example

```typescript
Obj.shallowEq({ x: 1, y: 2 }, { x: 1, y: 2 }); // true
Obj.shallowEq({ x: 1 }, { x: 1, y: 2 }); // false (different number of keys)
Obj.shallowEq({ x: 1 }, { x: 2 }); // false (different values)
Obj.shallowEq({}, {}); // true (both empty)
Obj.shallowEq({ a: 'hello' }, { a: 'hello' }); // true
Obj.shallowEq({ a: 'hello' }, { a: 'world' }); // false
```
