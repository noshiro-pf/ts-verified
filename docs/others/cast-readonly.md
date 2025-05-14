[**Documentation**](../README.md)

---

[Documentation](../README.md) / others/cast-readonly

# others/cast-readonly

## Functions

### castDeepReadonly()

> **castDeepReadonly**\<`T`\>(`mutable`): `DeepReadonly`\<`T`\>

Defined in: [others/cast-readonly.mts:19](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-readonly.mts#L19)

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

---

### castReadonly()

> **castReadonly**\<`T`\>(`mutable`): `Readonly`\<`T`\>

Defined in: [others/cast-readonly.mts:8](https://github.com/noshiro-pf/ts-verified/blob/main/src/others/cast-readonly.mts#L8)

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
