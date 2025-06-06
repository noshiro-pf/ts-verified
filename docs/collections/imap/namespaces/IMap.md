[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [collections/imap](../README.md) / IMap

# IMap

Provides utility functions for IMap.

## Functions

### create()

> **create**\<`K`, `V`\>(`iterable`): [`IMap`](../README.md#imap)\<`K`, `V`\>

Defined in: [src/collections/imap.mts:259](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L259)

Creates a new IMap instance.

#### Type Parameters

##### K

`K` _extends_ `MapSetKeyType`

The type of the keys.

##### V

`V`

The type of the values.

#### Parameters

##### iterable

`Iterable`\<readonly \[`K`, `V`\]\>

An iterable of key-value pairs.

#### Returns

[`IMap`](../README.md#imap)\<`K`, `V`\>

A new IMap instance.

#### Example

```typescript
const mapFromStringPairs = IMap.create<string, number>([
    ['one', 1],
    ['two', 2],
]);
console.log(mapFromStringPairs.get('one').unwrap()); // Output: 1

const mapFromNumberPairs = IMap.create<number, string>([
    [10, 'ten'],
    [20, 'twenty'],
]);
console.log(mapFromNumberPairs.get(20).unwrap()); // Output: "twenty"

// Can also be created from another Map or IMap
const existingJsMap = new Map([
    ['a', 100],
    ['b', 200],
]);
const iMapFromJsMap = IMap.create(existingJsMap);
console.log(iMapFromJsMap.get('b').unwrap()); // Output: 200

const anotherIMap = IMap.create<string, boolean>([['active', true]]);
const iMapFromIMap = IMap.create(anotherIMap);
console.log(iMapFromIMap.get('active').unwrap()); // Output: true
```

---

### equal()

> **equal**\<`K`, `V`\>(`a`, `b`): `boolean`

Defined in: [src/collections/imap.mts:289](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L289)

Checks if two IMap instances are equal.
Equality is determined by having the same size and all key-value pairs being equal.

#### Type Parameters

##### K

`K` _extends_ `MapSetKeyType`

The type of the keys.

##### V

`V`

The type of the values.

#### Parameters

##### a

[`IMap`](../README.md#imap)\<`K`, `V`\>

The first IMap instance.

##### b

[`IMap`](../README.md#imap)\<`K`, `V`\>

The second IMap instance.

#### Returns

`boolean`

`true` if the maps are equal, `false` otherwise.

#### Example

```typescript
const map1 = IMap.create<string, number>([
    ['a', 1],
    ['b', 2],
]);
const map2 = IMap.create<string, number>([
    ['a', 1],
    ['b', 2],
]);
const map3 = IMap.create<string, number>([
    ['a', 1],
    ['c', 3],
]);
const map4 = IMap.create<string, number>([
    ['a', 1],
    ['b', 99],
]);
const map5 = IMap.create<string, number>([
    ['b', 2],
    ['a', 1],
]); // Order doesn't matter for equality

console.log(IMap.equal(map1, map2)); // Output: true
console.log(IMap.equal(map1, map3)); // Output: false (different keys/values)
console.log(IMap.equal(map1, map4)); // Output: false (different value for key "b")
console.log(IMap.equal(map1, map5)); // Output: true

const mapNum1 = IMap.create<number, string>([
    [1, 'x'],
    [2, 'y'],
]);
const mapNum2 = IMap.create<number, string>([
    [2, 'y'],
    [1, 'x'],
]);
console.log(IMap.equal(mapNum1, mapNum2)); // Output: true
```
