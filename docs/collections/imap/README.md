[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / collections/imap

# collections/imap

## Namespaces

- [IMap](namespaces/IMap.md)

## Type Aliases

### IMap\<K, V\>

> **IMap**\<`K`, `V`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `IMapInterface`\<`K`, `V`\>

Defined in: [src/collections/imap.mts:228](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L228)

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
let map: IMap<string, number> = IMap.create<string, number>([
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

const numberMap: IMap<number, string> = IMap.create([
    [1, 'one'],
    [2, 'two'],
]);
console.log(numberMap.get(2).unwrapOr('not found')); // Output: "two"
```
