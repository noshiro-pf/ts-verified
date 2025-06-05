[**Documentation**](../README.md)

---

[Documentation](../README.md) / array/array-utils

# array/array-utils

## Variables

### Arr

> `const` **Arr**: `object`

Defined in: [src/array/array-utils.mts:1659](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1659)

A comprehensive, immutable utility library for array manipulations in TypeScript.
Provides a wide range of functions for array creation, validation, transformation,
reduction, slicing, set operations, and more, with a focus on type safety and
leveraging TypeScript's type inference capabilities.
All functions operate on `readonly` arrays and return new `readonly` arrays,
ensuring immutability.

#### Type declaration

##### at()

> **at**: \<`T`\>(`array`, `index`) => [`Optional`](../functional/optional/README.md#optional)\<`T`\>

Safely accesses an array element at a given index.

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

The array to access.

###### index

`ArgArr`

The index to access (can be negative for reverse indexing).

###### Returns

[`Optional`](../functional/optional/README.md#optional)\<`T`\>

Optional.Some with the element if index is valid, Optional.None otherwise.

###### Example

```typescript
const arr = [1, 2, 3, 4, 5];
const result = Arr.at(arr, 2);
if (Optional.isSome(result)) {
    console.log(result.value); // 3
}

const negative = Arr.at(arr, -1);
if (Optional.isSome(negative)) {
    console.log(negative.value); // 5
}
```

##### butLast()

> **butLast**: \<`E`\>(`list`) => `ButLast`\<`E`\>

Returns all elements of an array except the last one.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

`E`

The input array.

###### Returns

`ButLast`\<`E`\>

A new array containing all elements except the last. The type is inferred as `List.ButLast<T>`.

###### Example

```ts
Arr.butLast([1, 2, 3] as const); // [1, 2]
Arr.butLast([1] as const); // []
Arr.butLast([]); // []
```

##### chunk()

> `readonly` **chunk**: \<`N`, `A`\>(`list`, `chunkSize`) => readonly readonly `A`[][] = `partition`

Alias for `partition`. Splits an array into chunks of a specified size.

Partitions an array into sub-arrays of a specified size.
The last partition may be smaller if the array length is not a multiple of `chunkSize`.
Returns an empty array if chunkSize < 2.

###### Type Parameters

###### N

`N` _extends_ `WithSmallInt`\<`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `object`, `40`\>

The size of each partition (must be a number type, typically a literal for precise typing).

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### chunkSize

`N`

The size of each partition.

###### Returns

readonly readonly `A`[][]

An array of arrays, where each inner array has up to `chunkSize` elements.

###### Example

```ts
Arr.partition([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
Arr.partition([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
Arr.partition([1, 2, 3], 5); // [[1, 2, 3]]
Arr.partition([], 2); // []
```

###### See

[partition](#partition)

##### concat()

> **concat**: \<`T1`, `T2`\>(`list1`, `list2`) => readonly \[`T1`, `T2`\]

Concatenates two arrays.

###### Type Parameters

###### T1

`T1` _extends_ readonly `unknown`[]

The type of the first array (can be a tuple).

###### T2

`T2` _extends_ readonly `unknown`[]

The type of the second array (can be a tuple).

###### Parameters

###### list1

`T1`

The first array.

###### list2

`T2`

The second array.

###### Returns

readonly \[`T1`, `T2`\]

A new array that is the concatenation of the two input arrays. Type is `readonly [...T1, ...T2]`.

###### Example

```ts
Arr.concat([1, 2] as const, [3, 4] as const); // [1, 2, 3, 4]
Arr.concat([], [1, 2]); // [1, 2]
Arr.concat([1, 2], []); // [1, 2]
```

##### copy()

> **copy**: \<`T`\>(`list`) => `T`

Creates a shallow copy of an array.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array, which can be a mutable or readonly array.

###### Parameters

###### list

`T`

The array to copy.

###### Returns

`T`

A new array that is a shallow copy of the input array. The readonly/mutable status of the output matches the input.

###### Example

```ts
const original = [1, { a: 2 }];
const copied = Arr.copy(original);
copied[0] = 10;
copied[1].a = 20;
console.log(original); // [1, { a: 20 }] (object is shallow copied)
console.log(copied); // [10, { a: 20 }]

const roOriginal = [1, 2] as const;
const roCopied = Arr.copy(roOriginal); // roCopied is readonly [1, 2]
```

##### count()

> **count**: \<`A`\>(`list`, `predicate`) => `Uint32`

Counts the number of elements in an array that satisfy a predicate.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### predicate

(`value`, `index`) => `boolean`

A function `(value: A, index: number) => boolean` to test each element for a condition.

###### Returns

`Uint32`

The number of elements that satisfy the predicate.

###### Example

```ts
Arr.count([1, 2, 3, 4], (x) => x > 2); // 2
Arr.count(['a', 'b', 'a'], (x) => x === 'a'); // 2
Arr.count([], () => true); // 0
```

##### countBy()

> **countBy**: \<`A`, `G`\>(`list`, `grouper`) => [`IMap`](../collections/imap.md#imap)\<`G`, `Uint32`\>

Groups elements of an array by a key derived from each element and counts the elements in each group.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### G

`G` _extends_ `MapSetKeyType`

The type of the group key (must be a primitive type: `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`).

###### Parameters

###### list

readonly `A`[]

The input array.

###### grouper

(`value`, `index`) => `G`

A function `(value: A, index: number) => G` that maps an element and its index to a group key.

###### Returns

[`IMap`](../collections/imap.md#imap)\<`G`, `Uint32`\>

An `IMap` where keys are group keys and values are the counts of elements in each group.

###### Example

```ts
Arr.countBy([1, 2, 2, 3, 1, 1], (x) => x);
// IMap { 1 => 3, 2 => 2, 3 => 1 }

Arr.countBy(['apple', 'banana', 'apple'], (x) => x);
// IMap { 'apple': 2, 'banana': 1 }
```

##### drop()

> `readonly` **drop**: \{\<`E`, `N`\>(`list`, `num`): `Skip`\<`N`, `E`\>; \<`E`\>(`list`, `num`): readonly `E`[]; \<`E`\>(`list`, `num`): readonly `E`[]; \} = `skip`

Alias for `skip`. Skips the first N elements of an array.

###### Call Signature

> \<`E`, `N`\>(`list`, `num`): `Skip`\<`N`, `E`\>

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to `SmallUint`.

###### Parameters

###### list

`E`

The input array.

###### num

`N`

The number of elements to skip.

###### Returns

`Skip`\<`N`, `E`\>

A new array containing the elements after skipping the first N.

###### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to skip.

###### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

###### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to skip.

###### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

###### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

###### See

[skip](#skip)

##### eq()

> **eq**: \<`T`\>(`list1`, `list2`, `equality`) => `boolean`

Checks if two arrays are equal by performing a shallow comparison of their elements.

###### Type Parameters

###### T

`T`

The type of elements in the arrays.

###### Parameters

###### list1

readonly `T`[]

The first array.

###### list2

readonly `T`[]

The second array.

###### equality

(`a`, `b`) => `boolean`

An optional function `(a: T, b: T) => boolean` to compare elements. Defaults to `Object.is`.

###### Returns

`boolean`

`true` if the arrays have the same length and all corresponding elements are equal according to the `equality` function, `false` otherwise.

###### Example

```ts
Arr.eq([1, 2, 3], [1, 2, 3]); // true
Arr.eq([1, 2, 3], [1, 2, 4]); // false
Arr.eq([1, 2], [1, 2, 3]); // false
Arr.eq([{ a: 1 }], [{ a: 1 }]); // false (different object references)
Arr.eq([{ a: 1 }], [{ a: 1 }], (o1, o2) => o1.a === o2.a); // true
```

##### filterNot()

> **filterNot**: \<`A`\>(`list`, `predicate`) => readonly `A`[]

Filters an array by excluding elements for which the predicate returns true.
This is the opposite of `Array.prototype.filter`.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### predicate

(`a`, `index`) => `boolean`

A function `(a: A, index: number) => boolean` that returns `true` for elements to be excluded.

###### Returns

readonly `A`[]

A new array with elements for which the predicate returned `false`.

###### Example

```ts
Arr.filterNot([1, 2, 3, 4], (x) => x % 2 === 0); // [1, 3] (excludes even numbers)
Arr.filterNot(['apple', 'banana', 'avocado'], (s) => s.startsWith('a')); // ['banana']
```

##### find()

> **find**: \<`T`\>(`array`, `predicate`) => [`Optional`](../functional/optional/README.md#optional)\<`T`\>

Safely finds an element in an array.

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

The array to search.

###### predicate

(`value`, `index`, `arr`) => `boolean`

The function to test elements.

###### Returns

[`Optional`](../functional/optional/README.md#optional)\<`T`\>

Optional.Some with the found element, Optional.None if not found.

###### Example

```typescript
const arr = [1, 2, 3, 4, 5];
const result = Arr.find(arr, (x) => x > 3);
if (Optional.isSome(result)) {
    console.log(result.value); // 4
}
```

##### findIndex()

> **findIndex**: \<`T`\>(`array`, `predicate`) => [`Optional`](../functional/optional/README.md#optional)\<`Uint32`\>

Finds the index of an element in an array.

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

The array to search.

###### predicate

(`value`, `index`) => `boolean`

The function to test elements.

###### Returns

[`Optional`](../functional/optional/README.md#optional)\<`Uint32`\>

Optional.Some with the index if found, Optional.None otherwise.

###### Example

```typescript
const arr = ['a', 'b', 'c'];
const result = Arr.findIndex(arr, (x) => x === 'b');
if (Optional.isSome(result)) {
    console.log(result.value); // 1 (branded as SizeType.Arr)
}
```

##### first()

> `readonly` **first**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `H`; \<`E`\>(`list`): `E`; \<`E`\>(`list`): `undefined` \| `E`; \} = `head`

Alias for `head`. Returns the first element of an array.

###### Call Signature

> (`list`): `undefined`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Parameters

###### list

readonly \[\]

###### Returns

`undefined`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

###### Call Signature

> \<`H`, `L`\>(`list`): `H`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Type Parameters

###### H

`H`

###### L

`L` _extends_ readonly `unknown`[]

###### Parameters

###### list

readonly \[`H`, `L`\]

###### Returns

`H`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

###### Call Signature

> \<`E`\>(`list`): `E`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Type Parameters

###### E

`E`

###### Parameters

###### list

readonly \[`E`, `E`\]

###### Returns

`E`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

###### Call Signature

> \<`E`\>(`list`): `undefined` \| `E`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Type Parameters

###### E

`E`

###### Parameters

###### list

readonly `E`[]

###### Returns

`undefined` \| `E`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

###### See

[head](#head)

##### foldl()

> **foldl**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
This is an alias for `Array.prototype.reduce`.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### S

`S`

The type of the accumulated value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

###### Example

```ts
Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldl(['a', 'b', 'c'], (str, char) => str + char, ''); // "abc"
```

##### foldr()

> **foldr**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
This is an alias for `Array.prototype.reduceRight`.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### S

`S`

The type of the accumulated value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

###### Example

```ts
Arr.foldr([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldr(['a', 'b', 'c'], (str, char) => str + char, ''); // "cba" (Note: if callback is (acc, curr) => acc + curr)
// Corrected example for typical right fold concatenation:
Arr.foldr(['a', 'b', 'c'], (char, str) => char + str, ''); // "abc" (callback (current, accumulator))
// Using the provided signature (previousValue: S, currentValue: A)
Arr.foldr(['a', 'b', 'c'], (acc, curr) => curr + acc, ''); // "abc"
Arr.foldr([1, 2, 3], (acc, curr) => curr - acc, 0); // 2 (i.e. 1-(2-(3-0)))
```

##### groupBy()

> **groupBy**: \<`A`, `G`\>(`list`, `grouper`) => [`IMap`](../collections/imap.md#imap)\<`G`, readonly `A`[]\>

Groups elements of an array by a key derived from each element.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### G

`G` _extends_ `MapSetKeyType`

The type of the group key (must be a primitive type).

###### Parameters

###### list

readonly `A`[]

The input array.

###### grouper

(`value`, `index`) => `G`

A function `(value: A, index: number) => G` that maps an element and its index to a group key.

###### Returns

[`IMap`](../collections/imap.md#imap)\<`G`, readonly `A`[]\>

An `IMap` where keys are group keys and values are arrays of elements belonging to that group.

###### Example

```ts
const data = [
    { type: 'fruit', name: 'apple' },
    { type: 'veg', name: 'carrot' },
    { type: 'fruit', name: 'banana' },
];
Arr.groupBy(data, (item) => item.type);
// IMap {
//   'fruit' => [{ type: 'fruit', name: 'apple' }, { type: 'fruit', name: 'banana' }],
//   'veg' => [{ type: 'veg', name: 'carrot' }]
// }
Arr.groupBy([1, 2, 3, 4], (n) => (n % 2 === 0 ? 'even' : 'odd'));
// IMap { 'odd' => [1, 3], 'even' => [2, 4] }
```

##### head()

> **head**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `H`; \<`E`\>(`list`): `E`; \<`E`\>(`list`): `undefined` \| `E`; \}

###### Call Signature

> (`list`): `undefined`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Parameters

###### list

readonly \[\]

###### Returns

`undefined`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

###### Call Signature

> \<`H`, `L`\>(`list`): `H`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Type Parameters

###### H

`H`

###### L

`L` _extends_ readonly `unknown`[]

###### Parameters

###### list

readonly \[`H`, `L`\]

###### Returns

`H`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

###### Call Signature

> \<`E`\>(`list`): `E`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Type Parameters

###### E

`E`

###### Parameters

###### list

readonly \[`E`, `E`\]

###### Returns

`E`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

###### Call Signature

> \<`E`\>(`list`): `undefined` \| `E`

Returns the first element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

###### Type Parameters

###### E

`E`

###### Parameters

###### list

readonly `E`[]

###### Returns

`undefined` \| `E`

###### Example

```ts
Arr.head([1, 2, 3]); // 1
Arr.head([]); // undefined
```

##### indexIsInRange()

> **indexIsInRange**: \<`T`\>(`list`, `index`) => `boolean`

Checks if an index is within the valid range of an array (i.e., `0 <= index < list.length`).

###### Type Parameters

###### T

`T`

The type of elements in the array.

###### Parameters

###### list

readonly `T`[]

The input array.

###### index

`ArgArrNonNegative`

The index to check.

###### Returns

`boolean`

`true` if the index is within the array bounds, `false` otherwise.

###### Example

```ts
Arr.indexIsInRange([10, 20], 0); // true
Arr.indexIsInRange([10, 20], 1); // true
Arr.indexIsInRange([10, 20], 2); // false
Arr.indexIsInRange([10, 20], -1); // false
Arr.indexIsInRange([], 0); // false
```

##### indexOf()

> **indexOf**: \<`T`\>(`array`, `searchElement`, `fromIndex?`) => [`Optional`](../functional/optional/README.md#optional)\<`Uint32`\>

Gets the index of a value in an array.

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

The array to search.

###### searchElement

`T`

The element to search for.

###### fromIndex?

`ArgArr`

The index to start searching from.

###### Returns

[`Optional`](../functional/optional/README.md#optional)\<`Uint32`\>

Optional.Some with the index if found, Optional.None otherwise.

###### Example

```typescript
const arr = ['a', 'b', 'c', 'b'];
const result = Arr.indexOf(arr, 'b');
if (Optional.isSome(result)) {
    console.log(result.value); // 1 (branded as SizeType.Arr)
}
```

##### isArrayAtLeastLength()

> **isArrayAtLeastLength**: \<`E`, `N`\>(`array`, `length`) => ``array is readonly [MakeTupleImpl<E, `${N}`, []>, E]``

Checks if an array has at least a specific length.

###### Type Parameters

###### E

`E`

The type of elements in the array.

###### N

`N` _extends_ `ArgArrNonNegative`

The minimum expected length of the array (must be a number type).

###### Parameters

###### array

readonly `E`[]

The array to check.

###### length

`N`

The minimum expected length.

###### Returns

``array is readonly [MakeTupleImpl<E, `${N}`, []>, E]``

`true` if the array has at least the specified length, `false` otherwise.

###### Example

```ts
const arr: readonly number[] = [1, 2, 3];
if (Arr.isArrayAtLeastLength(arr, 2)) {
    // arr is now typed as readonly [number, number, ...number[]]
}
Arr.isArrayAtLeastLength([1], 2); // false
```

##### isArrayOfLength()

> **isArrayOfLength**: \<`E`, `N`\>(`array`, `n`) => ``array is MakeTupleImpl<E, `${N}`, []>``

Checks if an array has a specific length.

###### Type Parameters

###### E

`E`

The type of elements in the array.

###### N

`N` _extends_ `ArgArrNonNegative`

The expected length of the array (must be a number type).

###### Parameters

###### array

readonly `E`[]

The array to check.

###### n

`N`

The expected length.

###### Returns

``array is MakeTupleImpl<E, `${N}`, []>``

`true` if the array has the specified length, `false` otherwise.

###### Example

```ts
const arr: readonly number[] = [1, 2, 3];
if (Arr.isArrayOfLength(arr, 3)) {
    // arr is now typed as readonly [number, number, number]
}
Arr.isArrayOfLength([1, 2], 3); // false
```

##### isEmpty()

> **isEmpty**: \<`E`\>(`list`) => `list is readonly []`

Checks if an array is empty.

###### Type Parameters

###### E

`E`

The type of elements in the array.

###### Parameters

###### list

readonly `E`[]

The array to check.

###### Returns

`list is readonly []`

`true` if the array is empty, `false` otherwise.

###### Example

```ts
Arr.isEmpty([]); // true
Arr.isEmpty([1, 2, 3]); // false
```

##### isNonEmpty()

> **isNonEmpty**: \<`E`\>(`list`) => `list is readonly [E, E]`

Checks if an array is non-empty.

###### Type Parameters

###### E

`E`

The type of elements in the array.

###### Parameters

###### list

readonly `E`[]

The array to check.

###### Returns

`list is readonly [E, E]`

`true` if the array is non-empty, `false` otherwise.

###### Example

```ts
Arr.isNonEmpty([1, 2, 3]); // true
Arr.isNonEmpty([]); // false
```

##### isSubset()

> **isSubset**: \<`A`, `B`\>(`list1`, `list2`) => `boolean`

Checks if the first array (`list1`) is a subset of the second array (`list2`).
An array `A` is a subset of `B` if all elements of `A` are also present in `B`.
Elements must be primitive types for `includes` to work reliably for comparison.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the first array (subset candidate), must be a primitive type.

###### B

`B` _extends_ `Primitive` = `A`

The type of elements in the second array (superset candidate), must be a primitive type.

###### Parameters

###### list1

readonly `A`[]

The first array.

###### list2

readonly `B`[]

The second array.

###### Returns

`boolean`

`true` if `list1` is a subset of `list2`, `false` otherwise.

###### Remarks

`list1` ⊂ `list2`

###### Example

```ts
Arr.isSubset([1, 2], [1, 2, 3]); // true
Arr.isSubset([1, 2, 3], [1, 2]); // false
Arr.isSubset([], [1, 2, 3]); // true
Arr.isSubset([1, 5], [1, 2, 3]); // false
```

##### isSuperset()

> **isSuperset**: \<`A`, `B`\>(`list1`, `list2`) => `boolean`

Checks if the first array (`list1`) is a superset of the second array (`list2`).
An array `A` is a superset of `B` if all elements of `B` are also present in `A`.
Elements must be primitive types.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the first array (superset candidate), must be a primitive type.

###### B

`B` _extends_ `Primitive` = `A`

The type of elements in the second array (subset candidate), must be a primitive type.

###### Parameters

###### list1

readonly `A`[]

The first array.

###### list2

readonly `B`[]

The second array.

###### Returns

`boolean`

`true` if `list1` is a superset of `list2`, `false` otherwise.

###### Remarks

`list1` ⊃ `list2`

###### Example

```ts
Arr.isSuperset([1, 2, 3], [1, 2]); // true
Arr.isSuperset([1, 2], [1, 2, 3]); // false
Arr.isSuperset([1, 2, 3], []); // true
```

##### join()

> **join**: \<`T`\>(`array`, `separator?`) => [`Result`](../functional/result/README.md#result)\<`string`, `Error`\>

Joins array elements into a string.

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

The array to join.

###### separator?

`string`

The separator string.

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `Error`\>

Result.Ok with the joined string, Result.Err if the operation throws.

###### Example

```typescript
const arr = ['Hello', 'World'];
const result = Arr.join(arr, ' ');
if (Result.isOk(result)) {
    console.log(result.value); // "Hello World"
}

// Error case: circular reference in objects with custom toString
const obj: any = {};
obj.toString = function () {
    return String(this);
};
const errorResult = Arr.join([obj], ',');
// Result.Err with Error about circular reference
```

##### last()

> **last**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `L`; \<`E`\>(`list`): `E`; \<`E`\>(`list`): `undefined` \| `E`; \}

###### Call Signature

> (`list`): `undefined`

Returns the last element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

###### Parameters

###### list

readonly \[\]

###### Returns

`undefined`

###### Example

```ts
Arr.last([1, 2, 3]); // 3
Arr.last([]); // undefined
```

###### Call Signature

> \<`H`, `L`\>(`list`): `L`

Returns the last element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

###### Type Parameters

###### H

`H` _extends_ readonly `unknown`[]

###### L

`L`

###### Parameters

###### list

readonly \[`H`, `L`\]

###### Returns

`L`

###### Example

```ts
Arr.last([1, 2, 3]); // 3
Arr.last([]); // undefined
```

###### Call Signature

> \<`E`\>(`list`): `E`

Returns the last element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

###### Type Parameters

###### E

`E`

###### Parameters

###### list

readonly \[`E`, `E`\]

###### Returns

`E`

###### Example

```ts
Arr.last([1, 2, 3]); // 3
Arr.last([]); // undefined
```

###### Call Signature

> \<`E`\>(`list`): `undefined` \| `E`

Returns the last element of an array.

- If the array is empty, returns `undefined`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

###### Type Parameters

###### E

`E`

###### Parameters

###### list

readonly `E`[]

###### Returns

`undefined` \| `E`

###### Example

```ts
Arr.last([1, 2, 3]); // 3
Arr.last([]); // undefined
```

##### lastIndexOf()

> **lastIndexOf**: \<`T`\>(`array`, `searchElement`, `fromIndex?`) => [`Optional`](../functional/optional/README.md#optional)\<`Uint32`\>

Gets the last index of a value in an array.

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

The array to search.

###### searchElement

`T`

The element to search for.

###### fromIndex?

`ArgArr`

The index to start searching from (searches backwards).

###### Returns

[`Optional`](../functional/optional/README.md#optional)\<`Uint32`\>

Optional.Some with the index if found, Optional.None otherwise.

###### Example

```typescript
const arr = ['a', 'b', 'c', 'b'];
const result = Arr.lastIndexOf(arr, 'b');
if (Optional.isSome(result)) {
    console.log(result.value); // 3 (branded as SizeType.Arr)
}
```

##### length()

> `readonly` **length**: \{\<`T`\>(`list`): `IntersectBrand`\<`PositiveNumber`, `Uint32`\>; \<`T`\>(`list`): `Uint32`; \} = `size`

###### Call Signature

> \<`T`\>(`list`): `IntersectBrand`\<`PositiveNumber`, `Uint32`\>

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

###### Type Parameters

###### T

`T` _extends_ readonly \[`unknown`, `unknown`\]

The type of the array

###### Parameters

###### list

`T`

The array to get the size of

###### Returns

`IntersectBrand`\<`PositiveNumber`, `Uint32`\>

The size of the array as a branded Uint32 type

###### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

###### Call Signature

> \<`T`\>(`list`): `Uint32`

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array

###### Parameters

###### list

`T`

The array to get the size of

###### Returns

`Uint32`

The size of the array as a branded Uint32 type

###### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

##### max()

> **max**: \{\<`N`\>(`list`, `comparator?`): `N`; \<`N`\>(`list`, `comparator?`): `undefined` \| `N`; \<`A`\>(`list`, `comparator`): `A`; \<`A`\>(`list`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `N`

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for arbitrary types.

###### Type Parameters

###### N

`N` _extends_ `number`

###### Parameters

###### list

readonly \[`N`, `N`\]

The input array.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

###### Returns

`N`

The maximum value in the array, or `undefined` if the array is empty.

###### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // 5
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:3}
```

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `undefined` \| `N`

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for arbitrary types.

###### Type Parameters

###### N

`N` _extends_ `number`

###### Parameters

###### list

readonly `N`[]

The input array.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

###### Returns

`undefined` \| `N`

The maximum value in the array, or `undefined` if the array is empty.

###### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // 5
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:3}
```

###### Call Signature

> \<`A`\>(`list`, `comparator`): `A`

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for arbitrary types.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

###### Returns

`A`

The maximum value in the array, or `undefined` if the array is empty.

###### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // 5
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:3}
```

###### Call Signature

> \<`A`\>(`list`, `comparator`): `undefined` \| `A`

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for arbitrary types.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

###### Returns

`undefined` \| `A`

The maximum value in the array, or `undefined` if the array is empty.

###### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // 5
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:3}
```

##### maxBy()

> **maxBy**: \{\<`A`\>(`list`, `comparatorValueMapper`): `A`; \<`A`\>(`list`, `comparatorValueMapper`): `undefined` \| `A`; \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `A`; \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`): `A`

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

###### Returns

`A`

The element with the maximum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // { name: 'Alice', age: 30 }
```

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`): `undefined` \| `A`

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

###### Returns

`undefined` \| `A`

The element with the maximum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // { name: 'Alice', age: 30 }
```

###### Call Signature

> \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `A`

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

###### Returns

`A`

The element with the maximum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // { name: 'Alice', age: 30 }
```

###### Call Signature

> \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

###### Returns

`undefined` \| `A`

The element with the maximum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // { name: 'Alice', age: 30 }
```

##### min()

> **min**: \{\<`N`\>(`list`, `comparator?`): `N`; \<`N`\>(`list`, `comparator?`): `undefined` \| `N`; \<`A`\>(`list`, `comparator`): `A`; \<`A`\>(`list`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `N`

Finds the minimum value in a non-empty array of numbers.

###### Type Parameters

###### N

`N` _extends_ `number`

The type of numbers in the array (must extend `number`).

###### Parameters

###### list

readonly \[`N`, `N`\]

The input non-empty array of numbers.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

###### Returns

`N`

The minimum value in the array.

###### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // 1
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:1}
```

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `undefined` \| `N`

Finds the minimum value in a non-empty array of numbers.

###### Type Parameters

###### N

`N` _extends_ `number`

The type of numbers in the array (must extend `number`).

###### Parameters

###### list

readonly `N`[]

The input non-empty array of numbers.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

###### Returns

`undefined` \| `N`

The minimum value in the array.

###### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // 1
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:1}
```

###### Call Signature

> \<`A`\>(`list`, `comparator`): `A`

Finds the minimum value in a non-empty array of numbers.

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array of numbers.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

###### Returns

`A`

The minimum value in the array.

###### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // 1
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:1}
```

###### Call Signature

> \<`A`\>(`list`, `comparator`): `undefined` \| `A`

Finds the minimum value in a non-empty array of numbers.

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

The input non-empty array of numbers.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

###### Returns

`undefined` \| `A`

The minimum value in the array.

###### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // 1
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // {v:1}
```

##### minBy()

> **minBy**: \{\<`A`\>(`list`, `comparatorValueMapper`): `A`; \<`A`\>(`list`, `comparatorValueMapper`): `undefined` \| `A`; \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `A`; \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`): `A`

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

###### Returns

`A`

The element with the minimum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // { name: 'Bob', age: 20 }
```

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`): `undefined` \| `A`

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

###### Returns

`undefined` \| `A`

The element with the minimum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // { name: 'Bob', age: 20 }
```

###### Call Signature

> \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `A`

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

###### Returns

`A`

The element with the minimum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // { name: 'Bob', age: 20 }
```

###### Call Signature

> \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `undefined`.
- You can provide a custom comparator for the mapped values.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

###### Returns

`undefined` \| `A`

The element with the minimum mapped value, or `undefined` if the array is empty.

###### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // { name: 'Bob', age: 20 }
```

##### newArray()

> **newArray**: \{\<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>; \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]; \<`V`\>(`len`, `init`): readonly `V`[]; \}

###### Call Signature

> \<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

###### Type Parameters

###### V

`V`

The type of the initial value.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### len

`N`

The length of the array.

###### init

`V`

The initial value.

###### Returns

`MakeTupleImpl`\<`V`, `` `${N}` ``\>

A new array.

###### Example

```ts
Arr.newArray(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.newArray(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

###### Call Signature

> \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

###### Type Parameters

###### V

`V`

The type of the initial value.

###### Parameters

###### len

`ArgArrPositive`

The length of the array.

###### init

`V`

The initial value.

###### Returns

readonly \[`V`, `V`\]

A new array.

###### Example

```ts
Arr.newArray(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.newArray(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

###### Call Signature

> \<`V`\>(`len`, `init`): readonly `V`[]

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

###### Type Parameters

###### V

`V`

The type of the initial value.

###### Parameters

###### len

`ArgArrNonNegative`

The length of the array.

###### init

`V`

The initial value.

###### Returns

readonly `V`[]

A new array.

###### Example

```ts
Arr.newArray(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.newArray(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

##### partition()

> **partition**: \<`N`, `A`\>(`list`, `chunkSize`) => readonly readonly `A`[][]

Partitions an array into sub-arrays of a specified size.
The last partition may be smaller if the array length is not a multiple of `chunkSize`.
Returns an empty array if chunkSize < 2.

###### Type Parameters

###### N

`N` _extends_ `WithSmallInt`\<`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `object`, `40`\>

The size of each partition (must be a number type, typically a literal for precise typing).

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### chunkSize

`N`

The size of each partition.

###### Returns

readonly readonly `A`[][]

An array of arrays, where each inner array has up to `chunkSize` elements.

###### Example

```ts
Arr.partition([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
Arr.partition([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
Arr.partition([1, 2, 3], 5); // [[1, 2, 3]]
Arr.partition([], 2); // []
```

##### range()

> **range**: \{\<`S`, `E`\>(`start`, `end`, `step?`): `RangeList`\<`S`, `E`\>; (`start`, `end`, `step?`): readonly `SafeUint`[]; (`start`, `end`, `step?`): readonly `SafeInt`[]; \}

###### Call Signature

> \<`S`, `E`\>(`start`, `end`, `step?`): `RangeList`\<`S`, `E`\>

Creates an array of numbers within a specified range.

- If `step` is omitted or 1, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with a step of 1.
- If `step` is provided, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with the given step.
- If `start >= end` and `step > 0`, or `start <= end` and `step < 0`, returns an empty array.
- If `start` and `end` are `SmallUint` and `step` is 1 or omitted, the return type is inferred as a tuple of the precise range.

###### Type Parameters

###### S

`S` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the start value, constrained to `SmallUint`.

###### E

`E` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the end value, constrained to `SmallUint`.

###### Parameters

###### start

`S`

The start of the range (inclusive).

###### end

`E`

The end of the range (exclusive).

###### step?

`1`

The step value (default is 1). If `step` is 1, the return type is more precise.

###### Returns

`RangeList`\<`S`, `E`\>

An array of numbers in the specified range. The type is inferred as `RangeList<S, E>` if step is 1.

###### Example

```ts
Arr.range(1, 5); // [1, 2, 3, 4]
Arr.range(1, 5, 2); // [1, 3]
Arr.range(5, 1, -1); // [5, 4, 3, 2]
Arr.range(1, 1); // []
Arr.range(5, 1); // []
```

###### Call Signature

> (`start`, `end`, `step?`): readonly `SafeUint`[]

Creates an array of numbers within a specified range.

- If `step` is omitted or 1, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with a step of 1.
- If `step` is provided, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with the given step.
- If `start >= end` and `step > 0`, or `start <= end` and `step < 0`, returns an empty array.
- If `start` and `end` are `SmallUint` and `step` is 1 or omitted, the return type is inferred as a tuple of the precise range.

###### Parameters

###### start

`SafeUintWithSmallInt`

The start of the range (inclusive).

###### end

`SafeUintWithSmallInt`

The end of the range (exclusive).

###### step?

`PositiveSafeIntWithSmallInt`

The step value (default is 1). If `step` is 1, the return type is more precise.

###### Returns

readonly `SafeUint`[]

An array of numbers in the specified range. The type is inferred as `RangeList<S, E>` if step is 1.

###### Example

```ts
Arr.range(1, 5); // [1, 2, 3, 4]
Arr.range(1, 5, 2); // [1, 3]
Arr.range(5, 1, -1); // [5, 4, 3, 2]
Arr.range(1, 1); // []
Arr.range(5, 1); // []
```

###### Call Signature

> (`start`, `end`, `step?`): readonly `SafeInt`[]

Creates an array of numbers within a specified range.

- If `step` is omitted or 1, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with a step of 1.
- If `step` is provided, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with the given step.
- If `start >= end` and `step > 0`, or `start <= end` and `step < 0`, returns an empty array.
- If `start` and `end` are `SmallUint` and `step` is 1 or omitted, the return type is inferred as a tuple of the precise range.

###### Parameters

###### start

`SafeIntWithSmallInt`

The start of the range (inclusive).

###### end

`SafeIntWithSmallInt`

The end of the range (exclusive).

###### step?

`NonZeroSafeIntWithSmallInt`

The step value (default is 1). If `step` is 1, the return type is more precise.

###### Returns

readonly `SafeInt`[]

An array of numbers in the specified range. The type is inferred as `RangeList<S, E>` if step is 1.

###### Example

```ts
Arr.range(1, 5); // [1, 2, 3, 4]
Arr.range(1, 5, 2); // [1, 3]
Arr.range(5, 1, -1); // [5, 4, 3, 2]
Arr.range(1, 1); // []
Arr.range(5, 1); // []
```

##### reduce()

> `readonly` **reduce**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S` = `foldl`

Alias for `foldl`. Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
This is an alias for `Array.prototype.reduce`.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### S

`S`

The type of the accumulated value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

###### Example

```ts
Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldl(['a', 'b', 'c'], (str, char) => str + char, ''); // "abc"
```

###### See

[foldl](#foldl)

##### reduceRight()

> `readonly` **reduceRight**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S` = `foldr`

Alias for `foldr`. Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.

Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
This is an alias for `Array.prototype.reduceRight`.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### S

`S`

The type of the accumulated value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

###### Example

```ts
Arr.foldr([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldr(['a', 'b', 'c'], (str, char) => str + char, ''); // "cba" (Note: if callback is (acc, curr) => acc + curr)
// Corrected example for typical right fold concatenation:
Arr.foldr(['a', 'b', 'c'], (char, str) => char + str, ''); // "abc" (callback (current, accumulator))
// Using the provided signature (previousValue: S, currentValue: A)
Arr.foldr(['a', 'b', 'c'], (acc, curr) => curr + acc, ''); // "abc"
Arr.foldr([1, 2, 3], (acc, curr) => curr - acc, 0); // 2 (i.e. 1-(2-(3-0)))
```

###### See

[foldr](#foldr)

##### rest()

> `readonly` **rest**: \<`E`\>(`list`) => `Tail`\<`E`\> = `tail`

Alias for `tail`. Returns all elements of an array except the first one.

Returns all elements of an array except the first one.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

`E`

The input array.

###### Returns

`Tail`\<`E`\>

A new array containing all elements except the first. The type is inferred as `List.Tail<T>`.

###### Example

```ts
Arr.tail([1, 2, 3] as const); // [2, 3]
Arr.tail([1] as const); // []
Arr.tail([]); // []
```

###### See

[tail](#tail)

##### scan()

> **scan**: \<`A`, `S`\>(`list`, `reducer`, `init`) => readonly \[`S`, `S`\]

Returns an array of successively reduced values from an array, starting with an initial value.
The first element of the result is always the `init` value.
The result array will have `list.length + 1` elements.

###### Type Parameters

###### A

`A`

The type of elements in the input array.

###### S

`S`

The type of the accumulated values and the initial value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### reducer

(`accumulator`, `currentValue`, `currentIndex`) => `S`

A function `(accumulator: S, currentValue: A, currentIndex: number) => S` that reduces the current value and the accumulated value to a new accumulated value.

###### init

`S`

The initial accumulated value.

###### Returns

readonly \[`S`, `S`\]

A non-empty array of accumulated values, starting with `init`.

###### Example

```ts
Arr.scan([1, 2, 3], (acc, curr) => acc + curr, 0); // [0, 1, 3, 6]
Arr.scan(['a', 'b', 'c'], (acc, curr) => acc + curr, '0'); // ['0', '0a', '0ab', '0abc']
Arr.scan([], (acc, curr: number) => acc + curr, 100); // [100]
```

##### seq()

> **seq**: \{\<`N`\>(`len`): `Seq`\<`N`\>; (`len`): readonly \[`Uint32`, `Uint32`\]; (`len`): readonly `Uint32`[]; \}

###### Call Signature

> \<`N`\>(`len`): `Seq`\<`N`\>

Creates a sequence of numbers from 0 to `len-1`.

- If `len` is a `SmallUint`, returns a tuple of numbers.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of numbers.
- Otherwise, returns a readonly array of numbers.

###### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### len

`N`

###### Returns

`Seq`\<`N`\>

###### Example

```ts
Arr.seq(3); // [0, 1, 2]
Arr.seq(0); // []
```

###### Call Signature

> (`len`): readonly \[`Uint32`, `Uint32`\]

Creates a sequence of numbers from 0 to `len-1`.

- If `len` is a `SmallUint`, returns a tuple of numbers.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of numbers.
- Otherwise, returns a readonly array of numbers.

###### Parameters

###### len

`ArgArrPositive`

###### Returns

readonly \[`Uint32`, `Uint32`\]

###### Example

```ts
Arr.seq(3); // [0, 1, 2]
Arr.seq(0); // []
```

###### Call Signature

> (`len`): readonly `Uint32`[]

Creates a sequence of numbers from 0 to `len-1`.

- If `len` is a `SmallUint`, returns a tuple of numbers.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of numbers.
- Otherwise, returns a readonly array of numbers.

###### Parameters

###### len

`ArgArrNonNegative`

###### Returns

readonly `Uint32`[]

###### Example

```ts
Arr.seq(3); // [0, 1, 2]
Arr.seq(0); // []
```

##### setDifference()

> **setDifference**: \<`A`\>(`list1`, `list2`) => readonly `A`[]

Returns the set difference of two arrays (`list1` - `list2`).
The difference contains elements that are in `list1` but not in `list2`. Order is based on `list1`.
Elements must be primitive types.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the arrays (must be a primitive type).

###### Parameters

###### list1

readonly `A`[]

The first array.

###### list2

readonly `A`[]

The second array.

###### Returns

readonly `A`[]

A new array containing elements from `list1` that are not in `list2`.

###### Example

```ts
Arr.setDifference([1, 2, 3], [2, 3, 4]); // [1]
Arr.setDifference([1, 2, 3], [1, 2, 3]); // []
Arr.setDifference([1, 2], [3, 4]); // [1, 2]
```

##### setIntersection()

> **setIntersection**: \<`A`, `B`\>(`list1`, `list2`) => readonly `A` & `B`[]

Returns the intersection of two arrays of primitive types.
The intersection contains elements that are present in both arrays. Order is based on `list1`.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the first array (must be a primitive type).

###### B

`B` _extends_ `Primitive` = `A`

The type of elements in the second array (must be a primitive type).

###### Parameters

###### list1

readonly `A`[]

The first array.

###### list2

readonly `B`[]

The second array.

###### Returns

readonly `A` & `B`[]

A new array containing elements that are in both `list1` and `list2`.

###### Example

```ts
Arr.setIntersection([1, 2, 3], [2, 3, 4]); // [2, 3]
Arr.setIntersection(['a', 'b'], ['b', 'c']); // ['b']
Arr.setIntersection([1, 2], [3, 4]); // []
```

##### size()

> **size**: \{\<`T`\>(`list`): `IntersectBrand`\<`PositiveNumber`, `Uint32`\>; \<`T`\>(`list`): `Uint32`; \}

###### Call Signature

> \<`T`\>(`list`): `IntersectBrand`\<`PositiveNumber`, `Uint32`\>

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

###### Type Parameters

###### T

`T` _extends_ readonly \[`unknown`, `unknown`\]

The type of the array

###### Parameters

###### list

`T`

The array to get the size of

###### Returns

`IntersectBrand`\<`PositiveNumber`, `Uint32`\>

The size of the array as a branded Uint32 type

###### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

###### Call Signature

> \<`T`\>(`list`): `Uint32`

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array

###### Parameters

###### list

`T`

The array to get the size of

###### Returns

`Uint32`

The size of the array as a branded Uint32 type

###### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

##### skip()

> **skip**: \{\<`E`, `N`\>(`list`, `num`): `Skip`\<`N`, `E`\>; \<`E`\>(`list`, `num`): readonly `E`[]; \<`E`\>(`list`, `num`): readonly `E`[]; \}

###### Call Signature

> \<`E`, `N`\>(`list`, `num`): `Skip`\<`N`, `E`\>

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to `SmallUint`.

###### Parameters

###### list

`E`

The input array.

###### num

`N`

The number of elements to skip.

###### Returns

`Skip`\<`N`, `E`\>

A new array containing the elements after skipping the first N.

###### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to skip.

###### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

###### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to skip.

###### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

###### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

##### skipLast()

> **skipLast**: \{\<`E`, `N`\>(`list`, `num`): `SkipLast`\<`N`, `E`\>; \<`E`\>(`list`, `num`): readonly `E`[]; \<`E`\>(`list`, `num`): readonly `E`[]; \}

###### Call Signature

> \<`E`, `N`\>(`list`, `num`): `SkipLast`\<`N`, `E`\>

Skips the last N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the last N elements skipped.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to `SmallUint`.

###### Parameters

###### list

`E`

The input array.

###### num

`N`

The number of elements to skip from the end.

###### Returns

`SkipLast`\<`N`, `E`\>

A new array containing the elements after skipping the last N.

###### Example

```ts
Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.skipLast([1, 2], 3); // []
Arr.skipLast([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Skips the last N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the last N elements skipped.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to skip from the end.

###### Returns

readonly `E`[]

A new array containing the elements after skipping the last N.

###### Example

```ts
Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.skipLast([1, 2], 3); // []
Arr.skipLast([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Skips the last N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the last N elements skipped.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to skip from the end.

###### Returns

readonly `E`[]

A new array containing the elements after skipping the last N.

###### Example

```ts
Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.skipLast([1, 2], 3); // []
Arr.skipLast([], 2); // []
```

##### sliceClamped()

> **sliceClamped**: \<`E`\>(`list`, `start`, `end`) => readonly `E`[]

Slices an array with clamped start and end indices.
Ensures that start and end indices are within the bounds of the array.
If `start` > `end` after clamping, an empty array is returned.

###### Type Parameters

###### E

`E`

The type of elements in the array.

###### Parameters

###### list

readonly `E`[]

The array to slice.

###### start

`ArgArr`

The start index for the slice (inclusive).

###### end

`ArgArr`

The end index for the slice (exclusive).

###### Returns

readonly `E`[]

A new array containing the sliced elements.

###### Example

```ts
const arr = [10, 20, 30, 40, 50];
Arr.sliceClamped(arr, 1, 3); // [20, 30]
Arr.sliceClamped(arr, -2, 10); // [10, 20, 30, 40, 50] (start clamped to 0, end to 5)
Arr.sliceClamped(arr, 3, 1); // [] (start clamped to 3, end to 3)
Arr.sliceClamped([], 0, 5); // []
```

##### sortedNumSetDifference()

> **sortedNumSetDifference**: \<`T`\>(`sortedList1`, `sortedList2`) => readonly `T`[]

Returns the set difference of two sorted arrays of numbers (`sortedList1` - `sortedList2`).
This operation is more efficient for sorted arrays than the generic `setDifference`.
The resulting array is also sorted.

###### Type Parameters

###### T

`T` _extends_ `number`

The type of numbers in the arrays (must extend `number`).

###### Parameters

###### sortedList1

readonly `T`[]

The first sorted array of numbers.

###### sortedList2

readonly `T`[]

The second sorted array of numbers.

###### Returns

readonly `T`[]

A new sorted array containing numbers from `sortedList1` that are not in `sortedList2`.

###### Example

```ts
Arr.sortedNumSetDifference([1, 2, 3, 5], [2, 4, 5]); // [1, 3]
Arr.sortedNumSetDifference([1, 2, 3], [1, 2, 3]); // []
Arr.sortedNumSetDifference([1, 2], [3, 4]); // [1, 2]
```

##### sum()

> **sum**: (`list`) => `number`

Calculates the sum of numbers in an array.

###### Parameters

###### list

readonly `number`[]

The input array of numbers.

###### Returns

`number`

The sum of the numbers. Returns 0 for an empty array.

###### Example

```ts
Arr.sum([1, 2, 3]); // 6
Arr.sum([]); // 0
Arr.sum([-1, 0, 1]); // 0
```

##### tail()

> **tail**: \<`E`\>(`list`) => `Tail`\<`E`\>

Returns all elements of an array except the first one.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

`E`

The input array.

###### Returns

`Tail`\<`E`\>

A new array containing all elements except the first. The type is inferred as `List.Tail<T>`.

###### Example

```ts
Arr.tail([1, 2, 3] as const); // [2, 3]
Arr.tail([1] as const); // []
Arr.tail([]); // []
```

##### take()

> **take**: \{\<`E`, `N`\>(`list`, `num`): `Take`\<`N`, `E`\>; \<`E`\>(`list`, `num`): readonly \[`E`, `E`\]; \<`E`\>(`list`, `num`): readonly `E`[]; \}

###### Call Signature

> \<`E`, `N`\>(`list`, `num`): `Take`\<`N`, `E`\>

Takes the first N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the first N elements.
- If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
- Otherwise, returns a readonly array of up to N elements.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to take, constrained to `SmallUint`.

###### Parameters

###### list

`E`

The input array.

###### num

`N`

The number of elements to take.

###### Returns

`Take`\<`N`, `E`\>

A new array containing the first N elements.

###### Example

```ts
Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.take([1, 2], 3); // [1, 2]
Arr.take([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly \[`E`, `E`\]

Takes the first N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the first N elements.
- If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
- Otherwise, returns a readonly array of up to N elements.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to take.

###### Returns

readonly \[`E`, `E`\]

A new array containing the first N elements.

###### Example

```ts
Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.take([1, 2], 3); // [1, 2]
Arr.take([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Takes the first N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the first N elements.
- If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
- Otherwise, returns a readonly array of up to N elements.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to take.

###### Returns

readonly `E`[]

A new array containing the first N elements.

###### Example

```ts
Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.take([1, 2], 3); // [1, 2]
Arr.take([], 2); // []
```

##### takeLast()

> **takeLast**: \{\<`E`, `N`\>(`list`, `num`): `TakeLast`\<`N`, `E`\>; \<`E`\>(`list`, `num`): readonly \[`E`, `E`\]; \<`E`\>(`list`, `num`): readonly `E`[]; \}

###### Call Signature

> \<`E`, `N`\>(`list`, `num`): `TakeLast`\<`N`, `E`\>

Takes the last N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the last N elements.
- If the array is a non-empty array and N is a positive integer, returns a non-empty array.
- Otherwise, returns a readonly array of up to N elements.

###### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to take, constrained to `SmallUint`.

###### Parameters

###### list

`E`

The input array.

###### num

`N`

The number of elements to take.

###### Returns

`TakeLast`\<`N`, `E`\>

A new array containing the last N elements.

###### Example

```ts
Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.takeLast([1, 2], 3); // [1, 2]
Arr.takeLast([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly \[`E`, `E`\]

Takes the last N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the last N elements.
- If the array is a non-empty array and N is a positive integer, returns a non-empty array.
- Otherwise, returns a readonly array of up to N elements.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to take.

###### Returns

readonly \[`E`, `E`\]

A new array containing the last N elements.

###### Example

```ts
Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.takeLast([1, 2], 3); // [1, 2]
Arr.takeLast([], 2); // []
```

###### Call Signature

> \<`E`\>(`list`, `num`): readonly `E`[]

Takes the last N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the last N elements.
- If the array is a non-empty array and N is a positive integer, returns a non-empty array.
- Otherwise, returns a readonly array of up to N elements.

###### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

###### Parameters

###### list

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to take.

###### Returns

readonly `E`[]

A new array containing the last N elements.

###### Example

```ts
Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.takeLast([1, 2], 3); // [1, 2]
Arr.takeLast([], 2); // []
```

##### toFilled()

> **toFilled**: \<`T`\>(`array`, `value`, `start?`, `end?`) => [`Result`](../functional/result/README.md#result)\<readonly `T`[], \{ `type`: `"InvalidArgument"`; \}\>

Fills an array with a value (creates a new filled array).

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

The array.

###### value

`T`

The value to fill with.

###### start?

`ArgArr`

The start index.

###### end?

`ArgArr`

The end index.

###### Returns

[`Result`](../functional/result/README.md#result)\<readonly `T`[], \{ `type`: `"InvalidArgument"`; \}\>

Result.Ok with the new filled array.

###### Example

```typescript
const arr = [1, 2, 3, 4, 5];
const result = Arr.toFilled(arr, 0, 1, 4);
if (Result.isOk(result)) {
    console.log(result.value); // [1, 0, 0, 0, 5]
}
```

##### toInserted()

> **toInserted**: \<`A`\>(`list`, `index`, `newValue`) => readonly `A`[]

Returns a new array with a new value inserted at the specified index.
Index can be out of bounds (e.g., negative or greater than length), `toSpliced` handles this.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### index

`ArgArrNonNegative`

The index at which to insert the new value.

###### newValue

`A`

The value to insert.

###### Returns

readonly `A`[]

A new array with the value inserted.

###### Example

```ts
Arr.toInserted([1, 2, 3], 1, 10); // [1, 10, 2, 3]
Arr.toInserted([1, 2, 3], 0, 0); // [0, 1, 2, 3]
Arr.toInserted([1, 2, 3], 3, 4); // [1, 2, 3, 4]
```

##### toPushed()

> **toPushed**: \<`T`, `V`\>(`list`, `value`) => readonly \[`T`, `V`\]

Returns a new array with a value added to the end.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the input array (can be a tuple).

###### V

`V`

The type of the value to add.

###### Parameters

###### list

`T`

The input array.

###### value

`V`

The value to add.

###### Returns

readonly \[`T`, `V`\]

A new array with the value added to the end. Type is `readonly [...T, V]`.

###### Example

```ts
Arr.toPushed([1, 2] as const, 3); // [1, 2, 3]
Arr.toPushed([], 0); // [0]
```

##### toRemoved()

> **toRemoved**: \<`A`\>(`list`, `index`) => readonly `A`[]

Returns a new array with the element at the specified index removed.
If index is out of bounds, `toSpliced` handles this (usually by returning a copy).

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### index

`ArgArrNonNegative`

The index of the element to remove.

###### Returns

readonly `A`[]

A new array with the element removed.

###### Example

```ts
Arr.toRemoved([1, 2, 3], 1); // [1, 3]
Arr.toRemoved([1, 2, 3], 5); // [1, 2, 3] (index out of bounds)
```

##### toSortedBy()

> **toSortedBy**: \{\<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): readonly `A`[]; \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): readonly `A`[]; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): readonly `A`[]

Sorts an array by a value derived from its elements, using a numeric mapping.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function `(value: A) => number` that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: number, y: number) => number` for the mapped numbers. Defaults to ascending sort (x - y).

###### Returns

readonly `A`[]

A new array sorted by the mapped values.

###### Example

```ts
const items = [
    { name: 'Eve', score: 70 },
    { name: 'Adam', score: 90 },
    { name: 'Bob', score: 80 },
];
Arr.toSortedBy(items, (item) => item.score);
// [{ name: 'Eve', score: 70 }, { name: 'Bob', score: 80 }, { name: 'Adam', score: 90 }]
Arr.toSortedBy(
    items,
    (item) => item.score,
    (a, b) => b - a,
); // Sort descending
// [{ name: 'Adam', score: 90 }, { name: 'Bob', score: 80 }, { name: 'Eve', score: 70 }]
```

###### Call Signature

> \<`A`, `V`\>(`list`, `comparatorValueMapper`, `comparator`): readonly `A`[]

Sorts an array by a value derived from its elements, using a custom value type and comparator.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function `(value: A) => B` that maps an element to a value of type `V` for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function `(x: V, y: V) => number` for values of type `V`.

###### Returns

readonly `A`[]

A new array sorted by the mapped values.

##### toUnshifted()

> **toUnshifted**: \<`T`, `V`\>(`list`, `value`) => readonly \[`V`, `T`\]

Returns a new array with a value added to the beginning.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the input array (can be a tuple).

###### V

`V`

The type of the value to add.

###### Parameters

###### list

`T`

The input array.

###### value

`V`

The value to add.

###### Returns

readonly \[`V`, `T`\]

A new array with the value added to the beginning. Type is `readonly [V, ...T]`.

###### Example

```ts
Arr.toUnshifted([1, 2] as const, 0); // [0, 1, 2]
Arr.toUnshifted([], 0); // [0]
```

##### toUpdated()

> **toUpdated**: \<`A`, `U`\>(`list`, `index`, `updater`) => readonly (`A` \| `U`)[]

Returns a new array with the element at the specified index updated by a function.
If the index is out of bounds, the original array is returned (as per `Array.prototype.with` behavior for invalid indices, though it throws for non-integer indices).
This implementation ensures it doesn't throw for out-of-bounds indices but returns a copy.

###### Type Parameters

###### A

`A`

The type of elements in the original array.

###### U

`U`

The type of the updated value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### index

`ArgArrNonNegative`

The index of the element to update.

###### updater

(`prev`) => `U`

A function that takes the previous value and returns the updated value.

###### Returns

readonly (`A` \| `U`)[]

A new array with the element at the specified index updated. If index is invalid, a copy of the original array is returned.

###### Example

```ts
Arr.toUpdated([1, 2, 3], 1, (x) => x * 10); // [1, 20, 3]
Arr.toUpdated([1, 2, 3], 5, (x) => x * 10); // [1, 2, 3] (index out of bounds)
```

##### uniq()

> **uniq**: \<`P`\>(`list`) => readonly `P`[]

Creates a new array with unique elements from the input list. Order is preserved from the first occurrence.
Uses `Set` internally for efficient uniqueness checking.

###### Type Parameters

###### P

`P` _extends_ `Primitive`

The type of elements in the array.

###### Parameters

###### list

readonly `P`[]

The input array.

###### Returns

readonly `P`[]

A new array with unique elements from the input list. Returns `[]` for an empty input.

###### Example

```ts
Arr.uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
Arr.uniq(['a', 'b', 'a']); // ['a', 'b']
```

##### uniqBy()

> **uniqBy**: \{\<`A`, `P`\>(`list`, `mapFn`): readonly \[`A`, `A`\]; \<`A`, `P`\>(`list`, `mapFn`): readonly `A`[]; \}

###### Call Signature

> \<`A`, `P`\>(`list`, `mapFn`): readonly \[`A`, `A`\]

Creates a new array with unique elements from the input list, based on the values returned by `mapFn`.

- If the input is a non-empty array, returns a non-empty array.
- Otherwise, returns a readonly array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### P

`P` _extends_ `Primitive`

The type of the mapped value (used for uniqueness comparison).

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### mapFn

(`value`) => `P`

A function `(value: A) => P` to map elements to values for uniqueness comparison.

###### Returns

readonly \[`A`, `A`\]

A new array with unique elements based on the mapped values.

###### Example

```ts
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alicia' }, // Duplicate id
];
Arr.uniqBy(users, (user) => user.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

###### Call Signature

> \<`A`, `P`\>(`list`, `mapFn`): readonly `A`[]

Creates a new array with unique elements from the input list, based on the values returned by `mapFn`.

- If the input is a non-empty array, returns a non-empty array.
- Otherwise, returns a readonly array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### P

`P` _extends_ `Primitive`

The type of the mapped value (used for uniqueness comparison).

###### Parameters

###### list

readonly `A`[]

The input array.

###### mapFn

(`value`) => `P`

A function `(value: A) => P` to map elements to values for uniqueness comparison.

###### Returns

readonly `A`[]

A new array with unique elements based on the mapped values.

###### Example

```ts
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alicia' }, // Duplicate id
];
Arr.uniqBy(users, (user) => user.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

##### zeros()

> **zeros**: \{\<`N`\>(`len`): `MakeTupleImpl`\<`0`, `` `${N}` ``\>; (`len`): readonly \[`0`, `0`\]; (`len`): readonly `0`[]; \}

###### Call Signature

> \<`N`\>(`len`): `MakeTupleImpl`\<`0`, `` `${N}` ``\>

Creates an array of zeros with the specified length.

- If `len` is a `SmallUint`, returns a tuple of zeros of that length.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of zeros.
- Otherwise, returns a readonly array of zeros.

###### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the length, constrained to `SmallUint`.

###### Parameters

###### len

`N`

The length of the array.

###### Returns

`MakeTupleImpl`\<`0`, `` `${N}` ``\>

An array of zeros with the specified length.

###### Example

```ts
Arr.zeros(3); // [0, 0, 0]
Arr.zeros(0); // []
```

###### Call Signature

> (`len`): readonly \[`0`, `0`\]

Creates an array of zeros with the specified length.

- If `len` is a `SmallUint`, returns a tuple of zeros of that length.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of zeros.
- Otherwise, returns a readonly array of zeros.

###### Parameters

###### len

`WithSmallInt`\<`ArgArrPositive` & `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\>\>

The length of the array.

###### Returns

readonly \[`0`, `0`\]

An array of zeros with the specified length.

###### Example

```ts
Arr.zeros(3); // [0, 0, 0]
Arr.zeros(0); // []
```

###### Call Signature

> (`len`): readonly `0`[]

Creates an array of zeros with the specified length.

- If `len` is a `SmallUint`, returns a tuple of zeros of that length.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of zeros.
- Otherwise, returns a readonly array of zeros.

###### Parameters

###### len

`ArgArrNonNegative`

The length of the array.

###### Returns

readonly `0`[]

An array of zeros with the specified length.

###### Example

```ts
Arr.zeros(3); // [0, 0, 0]
Arr.zeros(0); // []
```

##### zip()

> **zip**: \<`T1`, `T2`\>(`list1`, `list2`) => `Zip`\<`T1`, `T2`\>

Zips two arrays together, creating an array of pairs (tuples).
The resulting array will have the length of the shorter input array.

###### Type Parameters

###### T1

`T1` _extends_ readonly `unknown`[]

The type of the first array (can be a tuple).

###### T2

`T2` _extends_ readonly `unknown`[]

The type of the second array (can be a tuple).

###### Parameters

###### list1

`T1`

The first array.

###### list2

`T2`

The second array.

###### Returns

`Zip`\<`T1`, `T2`\>

A new array of pairs. The type is inferred as `List.Zip<T1, T2>`.

###### Example

```ts
Arr.zip([1, 2, 3] as const, ['a', 'b', 'c'] as const); // [[1, 'a'], [2, 'b'], [3, 'c']]
Arr.zip([1, 2], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b']]
Arr.zip([1, 2, 3], ['a']); // [[1, 'a']]
Arr.zip([], ['a']); // []
```
