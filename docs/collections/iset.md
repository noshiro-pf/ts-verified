[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/iset

# collections/iset

## Type Aliases

### ISet\<K\>

> **ISet**\<`K`\> = `Iterable`\<`K`\> & `Readonly`\<`ISetInterface`\<`K`\>\>

Defined in: [collections/iset.mts:179](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset.mts#L179)

Represents an immutable set.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K`

The type of the elements in the set.

## Variables

### ISet

> **ISet**: `object`

Defined in: [collections/iset.mts:179](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset.mts#L179)

Provides utility functions for ISet.

#### Type declaration

##### diff()

> `readonly` **diff**: \<`K`\>(`oldSet`, `newSet`) => `Record`\<`"added"` \| `"deleted"`, [`ISet`](#iset)\<`K`\>\>

Computes the difference between two ISet instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### Parameters

###### oldSet

[`ISet`](#iset)\<`K`\>

The original set.

###### newSet

[`ISet`](#iset)\<`K`\>

The new set.

###### Returns

`Record`\<`"added"` \| `"deleted"`, [`ISet`](#iset)\<`K`\>\>

An object containing sets of added and deleted elements.

##### equal()

> `readonly` **equal**: \<`K`\>(`a`, `b`) => `boolean`

Checks if two ISet instances are equal.
Equality is determined by having the same size and all elements being present in both sets.

###### Type Parameters

###### K

`K`

The type of the elements.

###### Parameters

###### a

[`ISet`](#iset)\<`K`\>

The first ISet instance.

###### b

[`ISet`](#iset)\<`K`\>

The second ISet instance.

###### Returns

`boolean`

`true` if the sets are equal, `false` otherwise.

##### intersection()

> `readonly` **intersection**: \<`K`\>(`a`, `b`) => [`ISet`](#iset)\<`K`\>

Computes the intersection of two ISet instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### Parameters

###### a

[`ISet`](#iset)\<`K`\>

The first set.

###### b

[`ISet`](#iset)\<`K`\>

The second set.

###### Returns

[`ISet`](#iset)\<`K`\>

A new ISet instance representing the intersection.

##### new()

> `readonly` **new**: \<`K`\>(`iterable`) => [`ISet`](#iset)\<`K`\>

Creates a new ISet instance.

###### Type Parameters

###### K

`K`

The type of the elements.

###### Parameters

###### iterable

`Iterable`\<`K`\>

An iterable of elements.

###### Returns

[`ISet`](#iset)\<`K`\>

A new ISet instance.

##### union()

> `readonly` **union**: \<`K1`, `K2`\>(`a`, `b`) => [`ISet`](#iset)\<`K1` \| `K2`\>

Computes the union of two ISet instances.

###### Type Parameters

###### K1

`K1`

The type of elements in the first set.

###### K2

`K2`

The type of elements in the second set.

###### Parameters

###### a

[`ISet`](#iset)\<`K1`\>

The first set.

###### b

[`ISet`](#iset)\<`K2`\>

The second set.

###### Returns

[`ISet`](#iset)\<`K1` \| `K2`\>

A new ISet instance representing the union.
