[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/cast-mutable

# others/cast-mutable

## Functions

### castDeepMutable()

> **castDeepMutable**\<`T`\>(`readonlyValue`): `DeepMutable`\<`T`\>

Defined in: [others/cast-mutable.mts:20](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-mutable.mts#L20)

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

---

### castMutable()

> **castMutable**\<`T`\>(`readonlyValue`): `Mutable`\<`T`\>

Defined in: [others/cast-mutable.mts:9](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-mutable.mts#L9)

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
