[**Documentation**](../README.md)

---

[Documentation](../README.md) / record/object

# record/object

## Variables

### Obj

> `const` **Obj**: `object`

Defined in: [record/object.mts:119](https://github.com/noshiro-pf/ts-verified/blob/main/src/record/object.mts#L119)

A collection of object utility functions.

#### Type declaration

##### omit()

> **omit**: \<`R`, `Keys`\>(`record`, `keys`) => `Omit`\<`R`, `ArrayElement`\<`Keys`\>\>

Creates a new record that omits the `keys` of `record` and contains the rest.

Example:

```ts
expect(omit({ a: 1, b: 2, c: 3 }, ['c'])).toStrictEqual({ a: 1, b: 2 });
```

###### Type Parameters

###### R

`R` _extends_ `UnknownRecord`

###### Keys

`Keys` _extends_ readonly keyof `R`[]

###### Parameters

###### record

`R`

###### keys

`Keys`

###### Returns

`Omit`\<`R`, `ArrayElement`\<`Keys`\>\>

##### pick()

> **pick**: \<`R`, `Keys`\>(`record`, `keys`) => `Pick`\<`R`, `ArrayElement`\<`Keys`\>\>

Creates a new record that contains the `keys` of `record` and omits the rest.

Example:

```ts
expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toStrictEqual({
    a: 1,
    b: 2,
});
```

###### Type Parameters

###### R

`R` _extends_ `UnknownRecord`

###### Keys

`Keys` _extends_ readonly keyof `R`[]

###### Parameters

###### record

`R`

###### keys

`Keys`

###### Returns

`Pick`\<`R`, `ArrayElement`\<`Keys`\>\>

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
