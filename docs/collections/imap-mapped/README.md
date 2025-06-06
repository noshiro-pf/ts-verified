[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / collections/imap-mapped

# collections/imap-mapped

## Namespaces

- [IMapMapped](namespaces/IMapMapped.md)

## Type Aliases

### IMapMapped\<K, V, KM\>

> **IMapMapped**\<`K`, `V`, `KM`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `IMapMappedInterface`\<`K`, `V`, `KM`\>

Defined in: [src/collections/imap-mapped.mts:240](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap-mapped.mts#L240)

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
let map: IMapMapped<MyKey, string, string> = IMapMapped.create<
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
