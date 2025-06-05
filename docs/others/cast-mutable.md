[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/cast-mutable

# others/cast-mutable

## Functions

### castDeepMutable()

> **castDeepMutable**\<`T`\>(`readonlyValue`): `DeepMutable`\<`T`\>

Defined in: [src/others/cast-mutable.mts:40](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-mutable.mts#L40)

Casts a readonly type `T` to its `DeepMutable<T>` equivalent.
This is a type assertion and does not change the runtime value.
It assumes that `DeepMutable<T>` is a defined type that recursively removes `readonly` modifiers from all properties.

#### Type Parameters

##### T

`T`

The type of the readonly value.

#### Parameters

##### readonlyValue

`T`

The readonly value to cast.

#### Returns

`DeepMutable`\<`T`\>

The value cast to `DeepMutable<T>`.

#### Example

```typescript
const readonlyNested: {
    readonly a: { readonly b: readonly number[] };
} = { a: { b: [1, 2, 3] } };

const mutableNested = castDeepMutable(readonlyNested);
mutableNested.a.b.push(4); // Now allowed at all levels
mutableNested.a = { b: [5, 6] }; // Now allowed
```

---

### castMutable()

> **castMutable**\<`T`\>(`readonlyValue`): `Mutable`\<`T`\>

Defined in: [src/others/cast-mutable.mts:19](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-mutable.mts#L19)

Casts a readonly type `T` to its `Mutable<T>` equivalent.
This is a type assertion and does not change the runtime value.
It assumes that `Mutable<T>` is a defined type that removes `readonly` modifiers.

#### Type Parameters

##### T

`T`

The type of the readonly value.

#### Parameters

##### readonlyValue

`T`

The readonly value to cast.

#### Returns

`Mutable`\<`T`\>

The value cast to `Mutable<T>`.

#### Example

```typescript
const readonlyArr: readonly number[] = [1, 2, 3];
const mutableArr = castMutable(readonlyArr);
mutableArr.push(4); // Now allowed

const readonlyObj: { readonly x: number } = { x: 1 };
const mutableObj = castMutable(readonlyObj);
mutableObj.x = 2; // Now allowed
```
