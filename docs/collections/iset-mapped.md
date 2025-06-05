[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/iset-mapped

# collections/iset-mapped

## Type Aliases

### ISetMapped\<K, KM\>

> **ISetMapped**\<`K`, `KM`\> = `Iterable`\<`K`\> & `Readonly`\<`ISetMappedInterface`\<`K`, `KM`\>\>

Defined in: [src/collections/iset-mapped.mts:219](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L219)

Represents an immutable set where elements of type `K` are mapped to an underlying `MapSetKeyType` `KM`.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K`

The type of the elements in the set.

##### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys (number or string).

#### Example

```typescript
type User = { id: number; username: string };
const userToKey = (user: User): number => user.id;
const keyToUser = (id: number): User => ({ id, username: `user${id}` }); // Simplified for example

let userSet = ISetMapped.new<User, number>([], userToKey, keyToUser);

userSet = userSet.add({ id: 1, username: 'alice' });
userSet = userSet.add({ id: 2, username: 'bob' });

console.log(userSet.has({ id: 1, username: 'alice' })); // Output: true
console.log(userSet.size); // Output: 2

for (const user of userSet) {
    console.log(user.username);
}
// Output:
// alice
// bob
```

## Variables

### ISetMapped

> **ISetMapped**: `object`

Defined in: [src/collections/iset-mapped.mts:219](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L219)

Provides utility functions for ISetMapped.

#### Type declaration

##### diff()

> **diff**: \<`K`, `KM`\>(`oldSet`, `newSet`) => `ReadonlyRecord`\<`"added"` \| `"deleted"`, [`ISetMapped`](#isetmapped)\<`K`, `KM`\>\>

Computes the difference between two ISetMapped instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys.

###### Parameters

###### oldSet

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The original set.

###### newSet

[`ISetMapped`](#isetmapped)\<`K`, `KM`\>

The new set.

###### Returns

`ReadonlyRecord`\<`"added"` \| `"deleted"`, [`ISetMapped`](#isetmapped)\<`K`, `KM`\>\>

An object containing sets of added and deleted elements.

###### Example

```typescript
type Tag = { name: string };
const tagToKey = (t: Tag): string => t.name;
const keyToTag = (name: string): Tag => ({ name });

const oldTags = ISetMapped.new<Tag, string>(
    [{ name: 'typescript' }, { name: 'javascript' }],
    tagToKey,
    keyToTag,
);
const newTags = ISetMapped.new<Tag, string>(
    [{ name: 'javascript' }, { name: 'react' }, { name: 'nextjs' }],
    tagToKey,
    keyToTag,
);

const diffResult = ISetMapped.diff(oldTags, newTags);

console.log(
    'Deleted tags:',
    diffResult.deleted.toArray().map((t) => t.name),
);
// Output: Deleted tags: ["typescript"]

console.log(
    'Added tags:',
    diffResult.added.toArray().map((t) => t.name),
);
// Output: Added tags: ["react", "nextjs"]
```

##### equal()

> **equal**: \<`K`, `KM`\>(`a`, `b`) => `boolean`

Checks if two ISetMapped instances are equal.
Equality is determined by having the same size and all elements being present in both sets.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `MapSetKeyType`

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

###### Example

```typescript
type DataPoint = { x: number; y: number };
const pointToKey = (p: DataPoint): string => `${p.x},${p.y}`;
const keyToPoint = (s: string): DataPoint => {
    const parts = s.split(',');
    return { x: Number(parts[0]), y: Number(parts[1]) };
};

const set1 = ISetMapped.new<DataPoint, string>(
    [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
    ],
    pointToKey,
    keyToPoint,
);
const set2 = ISetMapped.new<DataPoint, string>(
    [
        { x: 3, y: 4 },
        { x: 1, y: 2 },
    ], // Order doesn't matter
    pointToKey,
    keyToPoint,
);
const set3 = ISetMapped.new<DataPoint, string>(
    [
        { x: 1, y: 2 },
        { x: 5, y: 6 },
    ],
    pointToKey,
    keyToPoint,
);

console.log(ISetMapped.equal(set1, set2)); // Output: true
console.log(ISetMapped.equal(set1, set3)); // Output: false
```

##### intersection()

> **intersection**: \<`K`, `KM`\>(`a`, `b`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

Computes the intersection of two ISetMapped instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `MapSetKeyType`

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

###### Example

```typescript
type Permission = { id: string };
const permToKey = (p: Permission): string => p.id;
const keyToPerm = (id: string): Permission => ({ id });

const userPermissions = ISetMapped.new<Permission, string>(
    [{ id: 'read' }, { id: 'write' }, { id: 'delete' }],
    permToKey,
    keyToPerm,
);
const rolePermissions = ISetMapped.new<Permission, string>(
    [{ id: 'read' }, { id: 'comment' }, { id: 'write' }],
    permToKey,
    keyToPerm,
);

const commonPermissions = ISetMapped.intersection(
    userPermissions,
    rolePermissions,
);
console.log(commonPermissions.toArray().map((p) => p.id)); // Output: ["read", "write"]
```

##### new()

> **new**: \<`K`, `KM`\>(`iterable`, `toKey`, `fromKey`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

Creates a new ISetMapped instance.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `MapSetKeyType`

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

###### Example

```typescript
type Product = { sku: string; price: number };
const productToKey = (p: Product): string => p.sku;
const keyToProduct = (sku: string): Product => ({ sku, price: 0 }); // Simplified

const productSet = ISetMapped.new<Product, string>(
    [
        { sku: 'ABC', price: 10 },
        { sku: 'DEF', price: 20 },
    ],
    productToKey,
    keyToProduct,
);
console.log(productSet.size); // Output: 2
console.log(productSet.has({ sku: 'ABC', price: 10 })); // Output: true

// Example with number keys
type Item = { itemId: number; description: string };
const itemToKey = (i: Item): number => i.itemId;
const keyToItem = (id: number): Item => ({ itemId: id, description: '...' });

const itemSet = ISetMapped.new<Item, number>([], itemToKey, keyToItem).add({
    itemId: 101,
    description: 'Gadget',
});
console.log(itemSet.has({ itemId: 101, description: 'Gadget' })); // Output: true
```

##### union()

> **union**: \<`K`, `KM`\>(`a`, `b`) => [`ISetMapped`](#isetmapped)\<`K`, `KM`\>

Computes the union of two ISetMapped instances.

###### Type Parameters

###### K

`K`

The type of the elements.

###### KM

`KM` _extends_ `MapSetKeyType`

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

###### Example

```typescript
type FeatureFlag = { flagName: string };
const flagToKey = (f: FeatureFlag): string => f.flagName;
const keyToFlag = (name: string): FeatureFlag => ({ flagName: name });

const setA = ISetMapped.new<FeatureFlag, string>(
    [{ flagName: 'newUI' }, { flagName: 'betaFeature' }],
    flagToKey,
    keyToFlag,
);
const setB = ISetMapped.new<FeatureFlag, string>(
    [{ flagName: 'betaFeature' }, { flagName: 'darkMode' }],
    flagToKey,
    keyToFlag,
);

const combinedFlags = ISetMapped.union(setA, setB);
// The order might vary as sets are unordered internally.
console.log(
    combinedFlags
        .toArray()
        .map((f) => f.flagName)
        .sort(),
);
// Output: ["betaFeature", "darkMode", "newUI"]
```
