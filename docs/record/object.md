[**Documentation**](../README.md)

---

[Documentation](../README.md) / record/object

# record/object

## Variables

### Obj

> `const` **Obj**: `object`

Defined in: [record/object.mts:106](https://github.com/noshiro-pf/ts-verified/blob/main/src/record/object.mts#L106)

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

###### Parameters

###### a

`ReadonlyRecord`\<`string`, `Primitive`\>

###### b

`ReadonlyRecord`\<`string`, `Primitive`\>

###### Returns

`boolean`
