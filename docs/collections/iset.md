[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/iset

# collections/iset

## Type Aliases

### ISet\<K\>

> **ISet**\<`K`\> = `Iterable`\<`K`\> & `ISetInterface`\<`K`\>

Defined in: [src/collections/iset.mts:182](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset.mts#L182)

Represents an immutable set.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K` _extends_ `MapSetKeyType`

The type of the elements in the set.

## Variables

### ISet

> **ISet**: `object`

Defined in: [src/collections/iset.mts:182](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset.mts#L182)

Provides utility functions for ISet.

#### Type declaration

##### diff()

> `readonly` **diff**: \<`K`\>(`oldSet`, `newSet`) => `ReadonlyRecord`\<`"added"` \| `"deleted"`, [`ISet`](#iset)\<`K`\>\>

Computes the difference between two ISet instances.

###### Type Parameters

###### K

`K` _extends_ `MapSetKeyType`

The type of the elements.

###### Parameters

###### oldSet

[`ISet`](#iset)\<`K`\>

The original set.

###### newSet

[`ISet`](#iset)\<`K`\>

The new set.

###### Returns

`ReadonlyRecord`\<`"added"` \| `"deleted"`, [`ISet`](#iset)\<`K`\>\>

An object containing sets of added and deleted elements.

###### Example

```typescript
const oldSet = ISet.new([1, 2, 3]);
const newSet = ISet.new([2, 3, 4, 5]);

const diff = ISet.diff(oldSet, newSet);
// diff.deleted contains: 1
// diff.added contains: 4, 5
```

##### equal()

> `readonly` **equal**: \<`K`\>(`a`, `b`) => `boolean`

Checks if two ISet instances are equal.
Equality is determined by having the same size and all elements being present in both sets.

###### Type Parameters

###### K

`K` _extends_ `MapSetKeyType`

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

###### Example

```typescript
const set1 = ISet.new([1, 2, 3]);
const set2 = ISet.new([3, 2, 1]);
const set3 = ISet.new([1, 2, 3, 4]);

ISet.equal(set1, set2); // true (same elements, different order)
ISet.equal(set1, set3); // false (different sizes)
```

##### intersection()

> `readonly` **intersection**: \<`K`\>(`a`, `b`) => [`ISet`](#iset)\<`K`\>

Computes the intersection of two ISet instances.

###### Type Parameters

###### K

`K` _extends_ `MapSetKeyType`

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

###### Example

```typescript
const set1 = ISet.new([1, 2, 3, 4]);
const set2 = ISet.new([3, 4, 5, 6]);

const intersection = ISet.intersection(set1, set2);
// intersection contains: 3, 4
```

##### new()

> `readonly` **new**: \<`K`\>(`iterable`) => [`ISet`](#iset)\<`K`\>

Creates a new ISet instance.

###### Type Parameters

###### K

`K` _extends_ `MapSetKeyType`

The type of the elements.

###### Parameters

###### iterable

`Iterable`\<`K`\>

An iterable of elements.

###### Returns

[`ISet`](#iset)\<`K`\>

A new ISet instance.

###### Example

```typescript
// Create from array
const set1 = ISet.new([1, 2, 3, 3]); // ISet with elements: 1, 2, 3

// Create from another Set
const set2 = ISet.new(new Set(['a', 'b', 'c']));

// Create empty set
const emptySet = ISet.new<string>([]);

// Chain operations
const result = ISet.new([1, 2, 3])
    .add(4)
    .delete(2)
    .filter((x) => x > 1); // ISet with elements: 3, 4
```

##### union()

> `readonly` **union**: \<`K1`, `K2`\>(`a`, `b`) => [`ISet`](#iset)\<`K1` \| `K2`\>

Computes the union of two ISet instances.

###### Type Parameters

###### K1

`K1` _extends_ `MapSetKeyType`

The type of elements in the first set.

###### K2

`K2` _extends_ `MapSetKeyType`

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

###### Example

```typescript
const set1 = ISet.new([1, 2, 3]);
const set2 = ISet.new([3, 4, 5]);

const union = ISet.union(set1, set2);
// union contains: 1, 2, 3, 4, 5
```
