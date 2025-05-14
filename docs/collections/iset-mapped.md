[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/iset-mapped

# collections/iset-mapped

## Type Aliases

### ISetMapped\<K, KM\>

> **ISetMapped**\<`K`, `KM`\> = `Iterable`\<`K`\> & `Readonly`\<`ISetMappedInterface`\<`K`, `KM`\>\>

Defined in: [collections/iset-mapped.mts:178](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L178)

Represents an immutable set where elements of type `K` are mapped to an underlying `SetKeyType` `KM`.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K`

The type of the elements in the set.

##### KM

`KM` _extends_ `SetKeyType`

The type of the mapped keys (number or string).

## Variables

### ISetMapped

> **ISetMapped**: `object`

Defined in: [collections/iset-mapped.mts:178](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L178)

Provides utility functions for ISetMapped.

#### Type declaration

##### diff()

> **diff**: \<`K`, `KM`\>(`oldSet`, `newSet`) => `Record`\<`"added"` \| `"deleted"`, [`ISetMapped`](#isetmapped)\<`K`, `KM`\>\>

Computes the difference between two ISetMapped instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `SetKeyType`

The type of the mapped keys.

###### Parameters

###### oldSet

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The original set.

###### newSet

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The new set.

###### Returns

`Record`\<`"added"` \| `"deleted"`, [`ISetMapped`](#isetmapped)\<`K`, `KM`\>\>

An object containing sets of added and deleted elements.

##### equal()

> **equal**: \<`K`, `KM`\>(`a`, `b`) => `boolean`

Checks if two ISetMapped instances are equal.
Equality is determined by having the same size and all elements being present in both sets.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `SetKeyType`

The type of the mapped keys.

###### Parameters

###### a

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The first ISetMapped instance.

###### b

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The second ISetMapped instance.

###### Returns

`boolean`

`true` if the sets are equal, `false` otherwise.

##### intersection()

> **intersection**: \<`K`, `KM`\>(`a`, `b`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

Computes the intersection of two ISetMapped instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `SetKeyType`

The type of the mapped keys.

###### Parameters

###### a

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The first set.

###### b

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The second set.

###### Returns

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

A new ISetMapped instance representing the intersection.

##### new()

> **new**: \<`K`, `KM`\>(`iterable`, `toKey`, `fromKey`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

Creates a new ISetMapped instance.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `SetKeyType`

The type of the mapped keys.

###### Parameters

###### iterable

`Iterable`\<`K`\>

An iterable of elements.

###### toKey

(`a`) => `KM`

A function to convert `K` to `KM`.

###### fromKey

(`k`) => `K`

A function to convert `KM` to `K`.

###### Returns

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

A new ISetMapped instance.

##### union()

> **union**: \<`K`, `KM`\>(`a`, `b`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

Computes the union of two ISetMapped instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `SetKeyType`

The type of the mapped keys.

###### Parameters

###### a

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The first set.

###### b

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The second set.

###### Returns

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

A new ISetMapped instance representing the union.
