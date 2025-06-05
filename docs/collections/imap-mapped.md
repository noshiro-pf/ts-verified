[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/imap-mapped

# collections/imap-mapped

## Type Aliases

### IMapMapped\<K, V, KM\>

> **IMapMapped**\<`K`, `V`, `KM`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `IMapMappedInterface`\<`K`, `V`, `KM`\>

Defined in: [src/collections/imap-mapped.mts:239](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap-mapped.mts#L239)

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

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys (number or string).

#### Example

```typescript
// Define a custom key type and its mapping functions
type MyKey = { id: number; category: string };
const toKey = (key: MyKey): string => `${key.category}_${key.id}`;
const fromKey = (km: string): MyKey => {
    const [category, idStr] = km.split('_');
    return { id: Number(idStr), category };
};

// Create an IMapMapped instance
let map: IMapMapped<MyKey, string, string> = IMapMapped.new<
    MyKey,
    string,
    string
>([], toKey, fromKey);

const key1: MyKey = { id: 1, category: 'A' };
const key2: MyKey = { id: 2, category: 'B' };

map = map.set(key1, 'Value for A1');
map = map.set(key2, 'Value for B2');

console.log(map.get(key1).unwrapOr('Not found')); // Output: Value for A1
console.log(map.size); // Output: 2

for (const [key, value] of map) {
    console.log(`Key: ${toKey(key)}, Value: ${value}`);
}
// Output:
// Key: A_1, Value: Value for A1
// Key: B_2, Value: Value for B2
```

## Variables

### IMapMapped

> **IMapMapped**: `object`

Defined in: [src/collections/imap-mapped.mts:239](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap-mapped.mts#L239)

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

`KM` _extends_ `MapSetKeyType`

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

###### Example

```typescript
const toKey = (s: string) => s;
const fromKey = (s: string) => s;

const map1 = IMapMapped.new<string, number, string>(
    [
        ['a', 1],
        ['b', 2],
    ],
    toKey,
    fromKey,
);
const map2 = IMapMapped.new<string, number, string>(
    [
        ['a', 1],
        ['b', 2],
    ],
    toKey,
    fromKey,
);
const map3 = IMapMapped.new<string, number, string>(
    [
        ['a', 1],
        ['c', 3],
    ],
    toKey,
    fromKey,
);
const map4 = IMapMapped.new<string, number, string>(
    [
        ['a', 1],
        ['b', 99],
    ],
    toKey,
    fromKey,
);

console.log(IMapMapped.equal(map1, map2)); // Output: true
console.log(IMapMapped.equal(map1, map3)); // Output: false (different keys/values)
console.log(IMapMapped.equal(map1, map4)); // Output: false (different value for key "b")

// Example with custom key type
type MyObjKey = { id: number };
const toObjKey = (k: MyObjKey): string => `id_${k.id}`;
const fromObjKey = (s: string): MyObjKey => ({ id: Number(s.substring(3)) });

const mapObj1 = IMapMapped.new<MyObjKey, string, string>(
    [[{ id: 1 }, 'val1']],
    toObjKey,
    fromObjKey,
);
const mapObj2 = IMapMapped.new<MyObjKey, string, string>(
    [[{ id: 1 }, 'val1']],
    toObjKey,
    fromObjKey,
);
console.log(IMapMapped.equal(mapObj1, mapObj2)); // Output: true
```

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

`KM` _extends_ `MapSetKeyType`

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

###### Example

```typescript
type ComplexKey = { partA: string; partB: number };
const complexKeyToString = (ck: ComplexKey): string =>
    `${ck.partA}-${ck.partB}`;
const stringToComplexKey = (s: string): ComplexKey => {
    const [partA, partBStr] = s.split('-');
    return { partA, partB: Number(partBStr) };
};

const initialData: Array<[ComplexKey, boolean]> = [
    [{ partA: 'item', partB: 1 }, true],
    [{ partA: 'item', partB: 2 }, false],
];

const myMappedMap = IMapMapped.new<ComplexKey, boolean, string>(
    initialData,
    complexKeyToString,
    stringToComplexKey,
);

console.log(myMappedMap.size); // Output: 2
console.log(myMappedMap.get({ partA: 'item', partB: 1 }).unwrap()); // Output: true

const mapWithSimpleKeys = IMapMapped.new<string, number, string>(
    [
        ['a', 1],
        ['b', 2],
    ],
    (s) => s, // identity for string keys
    (s) => s, // identity for string keys
);
console.log(mapWithSimpleKeys.get('b').unwrap()); // Output: 2
```
