[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [collections/iset-mapped](../README.md) / ISetMapped

# ISetMapped

Provides utility functions for ISetMapped.

## Functions

### create()

> **create**\<`K`, `KM`\>(`iterable`, `toKey`, `fromKey`): [`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

Defined in: [src/collections/iset-mapped.mts:265](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L265)

Creates a new ISetMapped instance.

#### Type Parameters

##### K

`K`

The type of the elements.

##### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys.

#### Parameters

##### iterable

`Iterable`\<`K`\>

An iterable of elements.

##### toKey

(`a`) => `KM`

A function to convert `K` to `KM`.

##### fromKey

(`k`) => `K`

A function to convert `KM` to `K`.

#### Returns

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

A new ISetMapped instance.

#### Example

```typescript
type Product = { sku: string; price: number };
const productToKey = (p: Product): string => p.sku;
const keyToProduct = (sku: string): Product => ({ sku, price: 0 }); // Simplified

const productSet = ISetMapped.create<Product, string>(
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

const itemSet = ISetMapped.create<Item, number>([], itemToKey, keyToItem).add({
    itemId: 101,
    description: 'Gadget',
});
console.log(itemSet.has({ itemId: 101, description: 'Gadget' })); // Output: true
```

---

### diff()

> **diff**\<`K`, `KM`\>(`oldSet`, `newSet`): `ReadonlyRecord`\<`"added"` \| `"deleted"`, [`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>\>

Defined in: [src/collections/iset-mapped.mts:346](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L346)

Computes the difference between two ISetMapped instances.

#### Type Parameters

##### K

`K`

The type of the elements.

##### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys.

#### Parameters

##### oldSet

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The original set.

##### newSet

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The new set.

#### Returns

`ReadonlyRecord`\<`"added"` \| `"deleted"`, [`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>\>

An object containing sets of added and deleted elements.

#### Example

```typescript
type Tag = { name: string };
const tagToKey = (t: Tag): string => t.name;
const keyToTag = (name: string): Tag => ({ name });

const oldTags = ISetMapped.create<Tag, string>(
    [{ name: 'typescript' }, { name: 'javascript' }],
    tagToKey,
    keyToTag,
);
const newTags = ISetMapped.create<Tag, string>(
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

---

### equal()

> **equal**\<`K`, `KM`\>(`a`, `b`): `boolean`

Defined in: [src/collections/iset-mapped.mts:308](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L308)

Checks if two ISetMapped instances are equal.
Equality is determined by having the same size and all elements being present in both sets.

#### Type Parameters

##### K

`K`

The type of the elements.

##### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys.

#### Parameters

##### a

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The first ISetMapped instance.

##### b

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The second ISetMapped instance.

#### Returns

`boolean`

`true` if the sets are equal, `false` otherwise.

#### Example

```typescript
type DataPoint = { x: number; y: number };
const pointToKey = (p: DataPoint): string => `${p.x},${p.y}`;
const keyToPoint = (s: string): DataPoint => {
    const parts = s.split(',');
    return { x: Number(parts[0]), y: Number(parts[1]) };
};

const set1 = ISetMapped.create<DataPoint, string>(
    [
        { x: 1, y: 2 },
        { x: 3, y: 4 },
    ],
    pointToKey,
    keyToPoint,
);
const set2 = ISetMapped.create<DataPoint, string>(
    [
        { x: 3, y: 4 },
        { x: 1, y: 2 },
    ], // Order doesn't matter
    pointToKey,
    keyToPoint,
);
const set3 = ISetMapped.create<DataPoint, string>(
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

---

### intersection()

> **intersection**\<`K`, `KM`\>(`a`, `b`): [`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

Defined in: [src/collections/iset-mapped.mts:382](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L382)

Computes the intersection of two ISetMapped instances.

#### Type Parameters

##### K

`K`

The type of the elements.

##### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys.

#### Parameters

##### a

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The first set.

##### b

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The second set.

#### Returns

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

A new ISetMapped instance representing the intersection.

#### Example

```typescript
type Permission = { id: string };
const permToKey = (p: Permission): string => p.id;
const keyToPerm = (id: string): Permission => ({ id });

const userPermissions = ISetMapped.create<Permission, string>(
    [{ id: 'read' }, { id: 'write' }, { id: 'delete' }],
    permToKey,
    keyToPerm,
);
const rolePermissions = ISetMapped.create<Permission, string>(
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

---

### union()

> **union**\<`K`, `KM`\>(`a`, `b`): [`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

Defined in: [src/collections/iset-mapped.mts:417](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L417)

Computes the union of two ISetMapped instances.

#### Type Parameters

##### K

`K`

The type of the elements.

##### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys.

#### Parameters

##### a

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The first set.

##### b

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

The second set.

#### Returns

[`ISetMapped`](../README.md#isetmapped)\<`K`, `KM`\>

A new ISetMapped instance representing the union.

#### Example

```typescript
type FeatureFlag = { flagName: string };
const flagToKey = (f: FeatureFlag): string => f.flagName;
const keyToFlag = (name: string): FeatureFlag => ({ flagName: name });

const setA = ISetMapped.create<FeatureFlag, string>(
    [{ flagName: 'newUI' }, { flagName: 'betaFeature' }],
    flagToKey,
    keyToFlag,
);
const setB = ISetMapped.create<FeatureFlag, string>(
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
