[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/imap

# collections/imap

## Type Aliases

### IMap\<K, V\>

> **IMap**\<`K`, `V`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `Readonly`\<`IMapInterface`\<`K`, `V`\>\>

Defined in: [collections/imap.mts:182](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L182)

Represents an immutable map.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K`

The type of the keys in the map.

##### V

`V`

The type of the values in the map.

## Variables

### IMap

> **IMap**: `object`

Defined in: [collections/imap.mts:182](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L182)

Provides utility functions for IMap.

#### Type declaration

##### equal()

> **equal**: \<`K`, `V`\>(`a`, `b`) => `boolean`

Checks if two IMap instances are equal.
Equality is determined by having the same size and all key-value pairs being equal.

###### Type Parameters

###### K

`K`

The type of the keys.

###### V

`V`

The type of the values.

###### Parameters

###### a

[`IMap`](#imap)\<`K`, `V`\>

The first IMap instance.

###### b

[`IMap`](#imap)\<`K`, `V`\>

The second IMap instance.

###### Returns

`boolean`

`true` if the maps are equal, `false` otherwise.

##### new()

> **new**: \<`K`, `V`\>(`iterable`) => [`IMap`](#imap)\<`K`, `V`\>

Creates a new IMap instance.

###### Type Parameters

###### K

`K`

The type of the keys.

###### V

`V`

The type of the values.

###### Parameters

###### iterable

`Iterable`\<readonly \[`K`, `V`\]\>

An iterable of key-value pairs.

###### Returns

[`IMap`](#imap)\<`K`, `V`\>

A new IMap instance.
