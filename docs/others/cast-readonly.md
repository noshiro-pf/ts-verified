[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/cast-readonly

# others/cast-readonly

## Functions

### castDeepReadonly()

> **castDeepReadonly**\<`T`\>(`mutable`): `DeepReadonly`\<`T`\>

Defined in: [src/others/cast-readonly.mts:41](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-readonly.mts#L41)

Casts a mutable type `T` to its `DeepReadonly<T>` equivalent.
This is a type assertion and does not change the runtime value.
It assumes that `DeepReadonly<T>` is a defined type that recursively makes all properties readonly.

#### Type Parameters

##### T

`T`

The type of the mutable value.

#### Parameters

##### mutable

`T`

The mutable value to cast.

#### Returns

`DeepReadonly`\<`T`\>

The value cast to `DeepReadonly<T>`.

#### Example

```typescript
const mutableNested = {
    a: { b: [1, 2, 3] },
    c: { d: { e: 'value' } },
};

const readonlyNested = castDeepReadonly(mutableNested);
// readonlyNested.a.b.push(4); // Error: readonly at all levels
// readonlyNested.c.d.e = 'new'; // Error: readonly at all levels
// readonlyNested.a = {}; // Error: readonly at all levels
```

---

### castReadonly()

> **castReadonly**\<`T`\>(`mutable`): `Readonly`\<`T`\>

Defined in: [src/others/cast-readonly.mts:18](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-readonly.mts#L18)

Casts a mutable type `T` to its `Readonly<T>` equivalent.
This is a type assertion and does not change the runtime value.

#### Type Parameters

##### T

`T`

The type of the mutable value.

#### Parameters

##### mutable

`T`

The mutable value to cast.

#### Returns

`Readonly`\<`T`\>

The value cast to `Readonly<T>`.

#### Example

```typescript
const mutableArr: number[] = [1, 2, 3];
const readonlyArr = castReadonly(mutableArr);
// readonlyArr.push(4); // Error: Property 'push' does not exist on readonly array

const mutableObj = { x: 1, y: 2 };
const readonlyObj = castReadonly(mutableObj);
// readonlyObj.x = 5; // Error: Cannot assign to 'x' because it is readonly
```
