[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/imap-mapped

# collections/imap-mapped

## Type Aliases

### IMapMapped\<K, V, KM\>

> **IMapMapped**\<`K`, `V`, `KM`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `Readonly`\<`IMapMappedInterface`\<`K`, `V`, `KM`\>\>

Defined in: [collections/imap-mapped.mts:183](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap-mapped.mts#L183)

Represents an immutable map where keys of type `K` are mapped to an underlying `MapKeyType` `KM`.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K`

The type of the keys in the map.

##### V

`V`

The type of the values in the map.

##### KM

`KM` _extends_ `MapKeyType`

The type of the mapped keys (number or string).

## Variables

### IMapMapped

> **IMapMapped**: `object`

Defined in: [collections/imap-mapped.mts:183](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap-mapped.mts#L183)

Provides utility functions for IMapMapped.

#### Type declaration

##### equal()

> **equal**: \<`K`, `V`, `KM`\>(`a`, `b`) => `boolean`

Checks if two IMapMapped instances are equal.
Equality is determined by having the same size and all key-value pairs being equal.

###### Type Parameters

###### K

`K`

The type of the keys.

###### V

`V`

The type of the values.

###### KM

`KM` _extends_ `MapKeyType`

The type of the mapped keys.

###### Parameters

###### a

[`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>

The first IMapMapped instance.

###### b

[`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>

The second IMapMapped instance.

###### Returns

`boolean`

`true` if the maps are equal, `false` otherwise.

##### new()

> **new**: \<`K`, `V`, `KM`\>(`iterable`, `toKey`, `fromKey`) => [`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>

Creates a new IMapMapped instance.

###### Type Parameters

###### K

`K`

The type of the keys.

###### V

`V`

The type of the values.

###### KM

`KM` _extends_ `MapKeyType`

The type of the mapped keys.

###### Parameters

###### iterable

`Iterable`\<readonly \[`K`, `V`\]\>

An iterable of key-value pairs.

###### toKey

(`a`) => `KM`

A function to convert `K` to `KM`.

###### fromKey

(`k`) => `K`

A function to convert `KM` to `K`.

###### Returns

[`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>

A new IMapMapped instance.
