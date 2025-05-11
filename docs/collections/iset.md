[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/iset

# collections/iset

## Type Aliases

### ISet\<K\>

> **ISet**\<`K`\> = `Iterable`\<`K`\> & `Readonly`\<`ISetInterface`\<`K`\>\>

Defined in: [collections/iset.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset.mts#L54)

#### Type Parameters

##### K

`K`

## Variables

### ISet

> **ISet**: `object`

Defined in: [collections/iset.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset.mts#L54)

#### Type declaration

##### diff()

> `readonly` **diff**: \<`K`\>(`oldSet`, `newSet`) => `Record`\<`"added"` \| `"deleted"`, [`ISet`](#iset)\<`K`\>\>

###### Type Parameters

###### K

`K`

###### Parameters

###### oldSet

[`ISet`](#iset)\<`K`\>

###### newSet

[`ISet`](#iset)\<`K`\>

###### Returns

`Record`\<`"added"` \| `"deleted"`, [`ISet`](#iset)\<`K`\>\>

##### equal()

> `readonly` **equal**: \<`K`\>(`a`, `b`) => `boolean`

###### Type Parameters

###### K

`K`

###### Parameters

###### a

[`ISet`](#iset)\<`K`\>

###### b

[`ISet`](#iset)\<`K`\>

###### Returns

`boolean`

##### intersection()

> `readonly` **intersection**: \<`K`\>(`a`, `b`) => [`ISet`](#iset)\<`K`\>

###### Type Parameters

###### K

`K`

###### Parameters

###### a

[`ISet`](#iset)\<`K`\>

###### b

[`ISet`](#iset)\<`K`\>

###### Returns

[`ISet`](#iset)\<`K`\>

##### new()

> `readonly` **new**: \<`K`\>(`iterable`) => [`ISet`](#iset)\<`K`\>

###### Type Parameters

###### K

`K`

###### Parameters

###### iterable

`Iterable`\<`K`\>

###### Returns

[`ISet`](#iset)\<`K`\>

##### union()

> `readonly` **union**: \<`K1`, `K2`\>(`a`, `b`) => [`ISet`](#iset)\<`K1` \| `K2`\>

###### Type Parameters

###### K1

`K1`

###### K2

`K2`

###### Parameters

###### a

[`ISet`](#iset)\<`K1`\>

###### b

[`ISet`](#iset)\<`K2`\>

###### Returns

[`ISet`](#iset)\<`K1` \| `K2`\>
