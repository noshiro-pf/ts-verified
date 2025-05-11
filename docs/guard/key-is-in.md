[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/key-is-in

# guard/key-is-in

## Functions

### keyIsIn()

> **keyIsIn**\<`K`, `R`\>(`key`, `obj`): `key is K & keyof R`

Defined in: [guard/key-is-in.mts:2](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/key-is-in.mts#L2)

内部的には `Object.hasOwn` と同じ動作だが、 object ではなく key についての型ガード関数になっている。

#### Type Parameters

##### K

`K` _extends_ `PropertyKey`

##### R

`R` _extends_ `UnknownRecord`

#### Parameters

##### key

`K`

##### obj

`R`

#### Returns

`key is K & keyof R`
