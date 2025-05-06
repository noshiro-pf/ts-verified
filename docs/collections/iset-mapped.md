[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/iset-mapped

# collections/iset-mapped

## Type Aliases

### ISetMapped\<K, KM\>

> **ISetMapped**\<`K`, `KM`\> = `Iterable`\<`K`\> & `Readonly`\<`ISetMappedInterface`\<`K`, `KM`\>\>

Defined in: [collections/iset-mapped.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L55)

#### Type Parameters

##### K

`K`

##### KM

`KM` _extends_ `SetKeyType`

## Variables

### ISetMapped

> **ISetMapped**: `object`

Defined in: [collections/iset-mapped.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L55)

#### Type declaration

##### diff()

> **diff**: \<`K`, `KM`\>(`oldSet`, `newSet`) => `Record`\<`"added"` \| `"deleted"`, [`ISetMapped`](#isetmapped)\<`K`, `KM`\>\>

###### Type Parameters

###### K

`K`

###### KM

`KM` _extends_ `SetKeyType`

###### Parameters

###### oldSet

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### newSet

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### Returns

`Record`\<`"added"` \| `"deleted"`, [`ISetMapped`](#isetmapped)\<`K`, `KM`\>\>

##### equal()

> **equal**: \<`K`, `KM`\>(`a`, `b`) => `boolean`

###### Type Parameters

###### K

`K`

###### KM

`KM` _extends_ `SetKeyType`

###### Parameters

###### a

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### b

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### Returns

`boolean`

##### intersection()

> **intersection**: \<`K`, `KM`\>(`a`, `b`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### Type Parameters

###### K

`K`

###### KM

`KM` _extends_ `SetKeyType`

###### Parameters

###### a

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### b

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### Returns

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

##### new()

> **new**: \<`K`, `KM`\>(`iterable`, `toKey`, `fromKey`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### Type Parameters

###### K

`K`

###### KM

`KM` _extends_ `SetKeyType`

###### Parameters

###### iterable

`Iterable`\<`K`\>

###### toKey

(`a`) => `KM`

###### fromKey

(`k`) => `K`

###### Returns

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

##### union()

> **union**: \<`K`, `KM`\>(`a`, `b`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### Type Parameters

###### K

`K`

###### KM

`KM` _extends_ `SetKeyType`

###### Parameters

###### a

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### b

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

###### Returns

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>
