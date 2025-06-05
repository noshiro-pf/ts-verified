[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/imap

# collections/imap

## Type Aliases

### IMap\<K, V\>

> **IMap**\<`K`, `V`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `IMapInterface`\<`K`, `V`\>

Defined in: [src/collections/imap.mts:227](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L227)

Represents an immutable map.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K` _extends_ `MapSetKeyType`

The type of the keys in the map.

##### V

`V`

The type of the values in the map.

#### Example

```typescript
let map: IMap<string, number> = IMap.new<string, number>([
    ['a', 1],
    ['b', 2],
]);

console.log(map.get('a').unwrapOr(-1)); // Output: 1
console.log(map.size); // Output: 2

map = map.set('c', 3);
console.log(map.has('c')); // Output: true

for (const [key, value] of map) {
    console.log(`Key: ${key}, Value: ${value}`);
}
// Output:
// Key: a, Value: 1
// Key: b, Value: 2
// Key: c, Value: 3

const numberMap: IMap<number, string> = IMap.new([
    [1, 'one'],
    [2, 'two'],
]);
console.log(numberMap.get(2).unwrapOr('not found')); // Output: "two"
```

## Variables

### IMap

> **IMap**: `object`

Defined in: [src/collections/imap.mts:227](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L227)

Provides utility functions for IMap.

#### Type declaration

##### equal()

> **equal**: \<`K`, `V`\>(`a`, `b`) => `boolean`

Checks if two IMap instances are equal.
Equality is determined by having the same size and all key-value pairs being equal.

###### Type Parameters

###### K

`K` _extends_ `MapSetKeyType`

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

###### Example

```typescript
const map1 = IMap.new<string, number>([
    ['a', 1],
    ['b', 2],
]);
const map2 = IMap.new<string, number>([
    ['a', 1],
    ['b', 2],
]);
const map3 = IMap.new<string, number>([
    ['a', 1],
    ['c', 3],
]);
const map4 = IMap.new<string, number>([
    ['a', 1],
    ['b', 99],
]);
const map5 = IMap.new<string, number>([
    ['b', 2],
    ['a', 1],
]); // Order doesn't matter for equality

console.log(IMap.equal(map1, map2)); // Output: true
console.log(IMap.equal(map1, map3)); // Output: false (different keys/values)
console.log(IMap.equal(map1, map4)); // Output: false (different value for key "b")
console.log(IMap.equal(map1, map5)); // Output: true

const mapNum1 = IMap.new<number, string>([
    [1, 'x'],
    [2, 'y'],
]);
const mapNum2 = IMap.new<number, string>([
    [2, 'y'],
    [1, 'x'],
]);
console.log(IMap.equal(mapNum1, mapNum2)); // Output: true
```

##### new()

> **new**: \<`K`, `V`\>(`iterable`) => [`IMap`](#imap)\<`K`, `V`\>

Creates a new IMap instance.

###### Type Parameters

###### K

`K` _extends_ `MapSetKeyType`

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

###### Example

```typescript
const mapFromStringPairs = IMap.new<string, number>([
    ['one', 1],
    ['two', 2],
]);
console.log(mapFromStringPairs.get('one').unwrap()); // Output: 1

const mapFromNumberPairs = IMap.new<number, string>([
    [10, 'ten'],
    [20, 'twenty'],
]);
console.log(mapFromNumberPairs.get(20).unwrap()); // Output: "twenty"

// Can also be created from another Map or IMap
const existingJsMap = new Map([
    ['a', 100],
    ['b', 200],
]);
const iMapFromJsMap = IMap.new(existingJsMap);
console.log(iMapFromJsMap.get('b').unwrap()); // Output: 200

const anotherIMap = IMap.new<string, boolean>([['active', true]]);
const iMapFromIMap = IMap.new(anotherIMap);
console.log(iMapFromIMap.get('active').unwrap()); // Output: true
```
