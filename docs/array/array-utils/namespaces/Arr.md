[**Documentation**](../../../README.md)

---

[Documentation](../../../README.md) / [array/array-utils](../README.md) / Arr

# Arr

A comprehensive, immutable utility library for array manipulations in TypeScript.
Provides a wide range of functions for array creation, validation, transformation,
reduction, slicing, set operations, and more, with a focus on type safety and
leveraging TypeScript's type inference capabilities.
All functions operate on `readonly` arrays and return new `readonly` arrays,
ensuring immutability.

## Variables

### chunk()

> `const` **chunk**: \<`N`, `A`\>(`array`, `chunkSize`) => readonly readonly `A`[][] = `partition`

Defined in: [src/array/array-utils.mts:1806](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1806)

Alias for `partition`. Splits an array into chunks of a specified size.

Partitions an array into sub-arrays of a specified size.
The last partition may be smaller if the array length is not a multiple of `chunkSize`.
Returns an empty array if chunkSize < 2.

#### Type Parameters

##### N

`N` _extends_ `WithSmallInt`\<`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `object`, `40`\>

The size of each partition (must be a number type, typically a literal for precise typing).

##### A

`A`

#### Parameters

##### array

readonly `A`[]

The input array.

##### chunkSize

`N`

The size of each partition.

#### Returns

readonly readonly `A`[][]

An array of arrays, where each inner array has up to `chunkSize` elements.

#### Example

```ts
Arr.partition([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
Arr.partition([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
Arr.partition([1, 2, 3], 5); // [[1, 2, 3]]
Arr.partition([], 2); // []
```

#### See

[partition](#partition)

---

### drop()

> `const` **drop**: \{\<`E`, `N`\>(`array`, `num`): `Skip`\<`N`, `E`\>; \<`E`\>(`array`, `num`): readonly `E`[]; \<`E`\>(`array`, `num`): readonly `E`[]; \} = `skip`

Defined in: [src/array/array-utils.mts:1788](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1788)

Alias for `skip`. Skips the first N elements of an array.

#### Call Signature

> \<`E`, `N`\>(`array`, `num`): `Skip`\<`N`, `E`\>

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

##### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to `SmallUint`.

##### Parameters

###### array

`E`

The input array.

###### num

`N`

The number of elements to skip.

##### Returns

`Skip`\<`N`, `E`\>

A new array containing the elements after skipping the first N.

##### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

#### Call Signature

> \<`E`\>(`array`, `num`): readonly `E`[]

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to skip.

##### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

##### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

#### Call Signature

> \<`E`\>(`array`, `num`): readonly `E`[]

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to skip.

##### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

##### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

#### See

[skip](#skip)

---

### equal()

> `const` **equal**: \<`E`\>(`array1`, `array2`, `equality`) => `boolean` = `eq`

Defined in: [src/array/array-utils.mts:1621](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1621)

Alias for `eq`.

Checks if two arrays are equal by performing a shallow comparison of their elements.

#### Type Parameters

##### E

`E`

The type of elements in the arrays.

#### Parameters

##### array1

readonly `E`[]

The first array.

##### array2

readonly `E`[]

The second array.

##### equality

(`a`, `b`) => `boolean`

An optional function `(a: T, b: T) => boolean` to compare elements. Defaults to `Object.is`.

#### Returns

`boolean`

`true` if the arrays have the same length and all corresponding elements are equal according to the `equality` function, `false` otherwise.

#### Example

```ts
Arr.eq([1, 2, 3], [1, 2, 3]); // true
Arr.eq([1, 2, 3], [1, 2, 4]); // false
Arr.eq([1, 2], [1, 2, 3]); // false
Arr.eq([{ a: 1 }], [{ a: 1 }]); // false (different object references)
Arr.eq([{ a: 1 }], [{ a: 1 }], (o1, o2) => o1.a === o2.a); // true
```

---

### first()

> `const` **first**: \{(`array`): [`None`](../../../functional/optional/namespaces/Optional.md#none); \<`E`, `L`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>; \<`E`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>; \<`E`\>(`array`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>; \} = `head`

Defined in: [src/array/array-utils.mts:1776](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1776)

Alias for `head`. Returns the first element of an array.

#### Call Signature

> (`array`): [`None`](../../../functional/optional/namespaces/Optional.md#none)

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Parameters

###### array

readonly \[\]

##### Returns

[`None`](../../../functional/optional/namespaces/Optional.md#none)

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

#### Call Signature

> \<`E`, `L`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Type Parameters

###### E

`E`

###### L

`L` _extends_ readonly `unknown`[]

##### Parameters

###### array

readonly \[`E`, `L`\]

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

#### Call Signature

> \<`E`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Type Parameters

###### E

`E`

##### Parameters

###### array

readonly \[`E`, `E`\]

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

#### Call Signature

> \<`E`\>(`array`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Type Parameters

###### E

`E`

##### Parameters

###### array

readonly `E`[]

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

#### See

[head](#head)

---

### length()

> `const` **length**: \{\<`Ar`\>(`array`): `IntersectBrand`\<`PositiveNumber`, `Uint32`\>; \<`Ar`\>(`array`): `Uint32`; \} = `size`

Defined in: [src/array/array-utils.mts:49](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L49)

#### Call Signature

> \<`Ar`\>(`array`): `IntersectBrand`\<`PositiveNumber`, `Uint32`\>

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

##### Type Parameters

###### Ar

`Ar` _extends_ readonly \[`unknown`, `unknown`\]

The type of the array

##### Parameters

###### array

`Ar`

The array to get the size of

##### Returns

`IntersectBrand`\<`PositiveNumber`, `Uint32`\>

The size of the array as a branded Uint32 type

##### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

#### Call Signature

> \<`Ar`\>(`array`): `Uint32`

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

##### Type Parameters

###### Ar

`Ar` _extends_ readonly `unknown`[]

The type of the array

##### Parameters

###### array

`Ar`

The array to get the size of

##### Returns

`Uint32`

The size of the array as a branded Uint32 type

##### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

---

### newArray()

> `const` **newArray**: \{\<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>; \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]; \<`V`\>(`len`, `init`): readonly `V`[]; \} = `create`

Defined in: [src/array/array-utils.mts:268](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L268)

#### Call Signature

> \<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

##### Type Parameters

###### V

`V`

The type of the initial value.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

##### Parameters

###### len

`N`

The length of the array.

###### init

`V`

The initial value.

##### Returns

`MakeTupleImpl`\<`V`, `` `${N}` ``\>

A new array.

##### Example

```ts
Arr.create(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.create(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

#### Call Signature

> \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

##### Type Parameters

###### V

`V`

The type of the initial value.

##### Parameters

###### len

`ArgArrPositive`

The length of the array.

###### init

`V`

The initial value.

##### Returns

readonly \[`V`, `V`\]

A new array.

##### Example

```ts
Arr.create(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.create(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

#### Call Signature

> \<`V`\>(`len`, `init`): readonly `V`[]

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

##### Type Parameters

###### V

`V`

The type of the initial value.

##### Parameters

###### len

`ArgArrNonNegative`

The length of the array.

###### init

`V`

The initial value.

##### Returns

readonly `V`[]

A new array.

##### Example

```ts
Arr.create(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.create(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

---

### reduce()

> `const` **reduce**: \<`E`, `P`\>(`array`, `callbackfn`, `initialValue`) => `P` = `foldl`

Defined in: [src/array/array-utils.mts:1794](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1794)

Alias for `foldl`. Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
This is an alias for `Array.prototype.reduce`.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### P

`P`

#### Parameters

##### array

readonly `E`[]

The input array.

##### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `P`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

##### initialValue

`P`

The initial value of the accumulator.

#### Returns

`P`

The single value that results from the reduction.

#### Example

```ts
Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldl(['a', 'b', 'c'], (str, char) => str + char, ''); // "abc"
```

#### See

[foldl](#foldl)

---

### reduceRight()

> `const` **reduceRight**: \<`E`, `P`\>(`array`, `callbackfn`, `initialValue`) => `P` = `foldr`

Defined in: [src/array/array-utils.mts:1800](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1800)

Alias for `foldr`. Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.

Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
This is an alias for `Array.prototype.reduceRight`.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### P

`P`

#### Parameters

##### array

readonly `E`[]

The input array.

##### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `P`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

##### initialValue

`P`

The initial value of the accumulator.

#### Returns

`P`

The single value that results from the reduction.

#### Example

```ts
Arr.foldr([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldr(['a', 'b', 'c'], (str, char) => str + char, ''); // "cba" (Note: if callback is (acc, curr) => acc + curr)
// Corrected example for typical right fold concatenation:
Arr.foldr(['a', 'b', 'c'], (char, str) => char + str, ''); // "abc" (callback (current, accumulator))
// Using the provided signature (previousValue: S, currentValue: A)
Arr.foldr(['a', 'b', 'c'], (acc, curr) => curr + acc, ''); // "abc"
Arr.foldr([1, 2, 3], (acc, curr) => curr - acc, 0); // 2 (i.e. 1-(2-(3-0)))
```

#### See

[foldr](#foldr)

---

### rest()

> `const` **rest**: \<`E`\>(`array`) => `Tail`\<`E`\> = `tail`

Defined in: [src/array/array-utils.mts:1782](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1782)

Alias for `tail`. Returns all elements of an array except the first one.

Returns all elements of an array except the first one.

#### Type Parameters

##### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

#### Parameters

##### array

`E`

The input array.

#### Returns

`Tail`\<`E`\>

A new array containing all elements except the first. The type is inferred as `List.Tail<T>`.

#### Example

```ts
Arr.tail([1, 2, 3] as const); // [2, 3]
Arr.tail([1] as const); // []
Arr.tail([]); // []
```

#### See

[tail](#tail)

## Functions

### at()

> **at**\<`E`\>(`array`, `index`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:397](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L397)

Safely accesses an array element at a given index.

#### Type Parameters

##### E

`E`

#### Parameters

##### array

readonly `E`[]

The array to access.

##### index

`ArgArr`

The index to access (can be negative for reverse indexing).

#### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Optional.Some with the element if index is valid, Optional.None otherwise.

#### Example

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

---

### butLast()

> **butLast**\<`E`\>(`array`): `ButLast`\<`E`\>

Defined in: [src/array/array-utils.mts:515](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L515)

Returns all elements of an array except the last one.

#### Type Parameters

##### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

#### Parameters

##### array

`E`

The input array.

#### Returns

`ButLast`\<`E`\>

A new array containing all elements except the last. The type is inferred as `List.ButLast<T>`.

#### Example

```ts
Arr.butLast([1, 2, 3] as const); // [1, 2]
Arr.butLast([1] as const); // []
Arr.butLast([]); // []
```

---

### concat()

> **concat**\<`E1`, `E2`\>(`array1`, `array2`): readonly \[`E1`, `E2`\]

Defined in: [src/array/array-utils.mts:1357](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1357)

Concatenates two arrays.

#### Type Parameters

##### E1

`E1` _extends_ readonly `unknown`[]

The type of the first array (can be a tuple).

##### E2

`E2` _extends_ readonly `unknown`[]

The type of the second array (can be a tuple).

#### Parameters

##### array1

`E1`

The first array.

##### array2

`E2`

The second array.

#### Returns

readonly \[`E1`, `E2`\]

A new array that is the concatenation of the two input arrays. Type is `readonly [...E1, ...E2]`.

#### Example

```ts
Arr.concat([1, 2] as const, [3, 4] as const); // [1, 2, 3, 4]
Arr.concat([], [1, 2]); // [1, 2]
Arr.concat([1, 2], []); // [1, 2]
```

---

### copy()

> **copy**\<`E`\>(`array`): `E`

Defined in: [src/array/array-utils.mts:288](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L288)

Creates a shallow copy of an array.

#### Type Parameters

##### E

`E` _extends_ readonly `unknown`[]

The type of the array, which can be a mutable or readonly array.

#### Parameters

##### array

`E`

The array to copy.

#### Returns

`E`

A new array that is a shallow copy of the input array. The readonly/mutable status of the output matches the input.

#### Example

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

---

### count()

> **count**\<`E`\>(`array`, `predicate`): `Uint32`

Defined in: [src/array/array-utils.mts:1194](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1194)

Counts the number of elements in an array that satisfy a predicate.

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The input array.

##### predicate

(`value`, `index`) => `boolean`

A function `(value: A, index: number) => boolean` to test each element for a condition.

#### Returns

`Uint32`

The number of elements that satisfy the predicate.

#### Example

```ts
Arr.count([1, 2, 3, 4], (x) => x > 2); // 2
Arr.count(['a', 'b', 'a'], (x) => x === 'a'); // 2
Arr.count([], () => true); // 0
```

---

### countBy()

> **countBy**\<`E`, `G`\>(`array`, `grouper`): [`IMap`](../../../collections/imap/README.md#imap)\<`G`, `Uint32`\>

Defined in: [src/array/array-utils.mts:1222](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1222)

Groups elements of an array by a key derived from each element and counts the elements in each group.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### G

`G` _extends_ `MapSetKeyType`

The type of the group key (must be a primitive type: `string`, `number`, `boolean`, `symbol`, `bigint`, `null`, or `undefined`).

#### Parameters

##### array

readonly `E`[]

The input array.

##### grouper

(`value`, `index`) => `G`

A function `(value: A, index: number) => G` that maps an element and its index to a group key.

#### Returns

[`IMap`](../../../collections/imap/README.md#imap)\<`G`, `Uint32`\>

An `IMap` where keys are group keys and values are the counts of elements in each group.

#### Example

```ts
Arr.countBy([1, 2, 2, 3, 1, 1], (x) => x);
// IMap { 1 => 3, 2 => 2, 3 => 1 }

Arr.countBy(['apple', 'banana', 'apple'], (x) => x);
// IMap { 'apple': 2, 'banana': 1 }
```

---

### create()

#### Call Signature

> **create**\<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>

Defined in: [src/array/array-utils.mts:249](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L249)

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

##### Type Parameters

###### V

`V`

The type of the initial value.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

##### Parameters

###### len

`N`

The length of the array.

###### init

`V`

The initial value.

##### Returns

`MakeTupleImpl`\<`V`, `` `${N}` ``\>

A new array.

##### Example

```ts
Arr.create(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.create(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

#### Call Signature

> **create**\<`V`\>(`len`, `init`): readonly \[`V`, `V`\]

Defined in: [src/array/array-utils.mts:253](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L253)

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

##### Type Parameters

###### V

`V`

The type of the initial value.

##### Parameters

###### len

`ArgArrPositive`

The length of the array.

###### init

`V`

The initial value.

##### Returns

readonly \[`V`, `V`\]

A new array.

##### Example

```ts
Arr.create(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.create(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

#### Call Signature

> **create**\<`V`\>(`len`, `init`): readonly `V`[]

Defined in: [src/array/array-utils.mts:257](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L257)

Creates a new array of the specified length, filled with the initial value.

- If `len` is a `SmallUint`, returns a tuple of the initial value.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of the initial value.
- Otherwise, returns a readonly array.

##### Type Parameters

###### V

`V`

The type of the initial value.

##### Parameters

###### len

`ArgArrNonNegative`

The length of the array.

###### init

`V`

The initial value.

##### Returns

readonly `V`[]

A new array.

##### Example

```ts
Arr.create(3, 'a'); // ['a', 'a', 'a']
const obj = { id: 1 };
const arr = Arr.create(2, obj); // [obj, obj]
arr[0] === obj; // true (shallow copy of the reference)
```

---

### eq()

> **eq**\<`E`\>(`array1`, `array2`, `equality`): `boolean`

Defined in: [src/array/array-utils.mts:1609](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1609)

Checks if two arrays are equal by performing a shallow comparison of their elements.

#### Type Parameters

##### E

`E`

The type of elements in the arrays.

#### Parameters

##### array1

readonly `E`[]

The first array.

##### array2

readonly `E`[]

The second array.

##### equality

(`a`, `b`) => `boolean`

An optional function `(a: T, b: T) => boolean` to compare elements. Defaults to `Object.is`.

#### Returns

`boolean`

`true` if the arrays have the same length and all corresponding elements are equal according to the `equality` function, `false` otherwise.

#### Example

```ts
Arr.eq([1, 2, 3], [1, 2, 3]); // true
Arr.eq([1, 2, 3], [1, 2, 4]); // false
Arr.eq([1, 2], [1, 2, 3]); // false
Arr.eq([{ a: 1 }], [{ a: 1 }]); // false (different object references)
Arr.eq([{ a: 1 }], [{ a: 1 }], (o1, o2) => o1.a === o2.a); // true
```

---

### filterNot()

> **filterNot**\<`E`\>(`array`, `predicate`): readonly `E`[]

Defined in: [src/array/array-utils.mts:1338](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1338)

Filters an array by excluding elements for which the predicate returns true.
This is the opposite of `Array.prototype.filter`.

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The input array.

##### predicate

(`a`, `index`) => `boolean`

A function `(a: A, index: number) => boolean` that returns `true` for elements to be excluded.

#### Returns

readonly `E`[]

A new array with elements for which the predicate returned `false`.

#### Example

```ts
Arr.filterNot([1, 2, 3, 4], (x) => x % 2 === 0); // [1, 3] (excludes even numbers)
Arr.filterNot(['apple', 'banana', 'avocado'], (s) => s.startsWith('a')); // ['banana']
```

---

### find()

> **find**\<`E`\>(`array`, `predicate`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:823](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L823)

Safely finds an element in an array.

#### Type Parameters

##### E

`E`

#### Parameters

##### array

readonly `E`[]

The array to search.

##### predicate

(`value`, `index`, `arr`) => `boolean`

The function to test elements.

#### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Optional.Some with the found element, Optional.None if not found.

#### Example

```typescript
const arr = [1, 2, 3, 4, 5];
const result = Arr.find(arr, (x) => x > 3);
if (Optional.isSome(result)) {
    console.log(result.value); // 4
}
```

---

### findIndex()

> **findIndex**\<`E`\>(`array`, `predicate`): [`Optional`](../../../functional/optional/README.md#optional)\<`Uint32`\>

Defined in: [src/array/array-utils.mts:852](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L852)

Finds the index of an element in an array.

#### Type Parameters

##### E

`E`

#### Parameters

##### array

readonly `E`[]

The array to search.

##### predicate

(`value`, `index`) => `boolean`

The function to test elements.

#### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`Uint32`\>

Optional.Some with the index if found, Optional.None otherwise.

#### Example

```typescript
const arr = ['a', 'b', 'c'];
const result = Arr.findIndex(arr, (x) => x === 'b');
if (Optional.isSome(result)) {
    console.log(result.value); // 1 (branded as SizeType.Arr)
}
```

---

### foldl()

> **foldl**\<`E`, `P`\>(`array`, `callbackfn`, `initialValue`): `P`

Defined in: [src/array/array-utils.mts:941](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L941)

Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.
This is an alias for `Array.prototype.reduce`.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### P

`P`

#### Parameters

##### array

readonly `E`[]

The input array.

##### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `P`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

##### initialValue

`P`

The initial value of the accumulator.

#### Returns

`P`

The single value that results from the reduction.

#### Example

```ts
Arr.foldl([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldl(['a', 'b', 'c'], (str, char) => str + char, ''); // "abc"
```

---

### foldr()

> **foldr**\<`E`, `P`\>(`array`, `callbackfn`, `initialValue`): `P`

Defined in: [src/array/array-utils.mts:975](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L975)

Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.
This is an alias for `Array.prototype.reduceRight`.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### P

`P`

#### Parameters

##### array

readonly `E`[]

The input array.

##### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `P`

A function to execute on each element in the array: `(previousValue: S, currentValue: A, currentIndex: SizeType.Arr) => S`.

##### initialValue

`P`

The initial value of the accumulator.

#### Returns

`P`

The single value that results from the reduction.

#### Example

```ts
Arr.foldr([1, 2, 3], (sum, n) => sum + n, 0); // 6
Arr.foldr(['a', 'b', 'c'], (str, char) => str + char, ''); // "cba" (Note: if callback is (acc, curr) => acc + curr)
// Corrected example for typical right fold concatenation:
Arr.foldr(['a', 'b', 'c'], (char, str) => char + str, ''); // "abc" (callback (current, accumulator))
// Using the provided signature (previousValue: S, currentValue: A)
Arr.foldr(['a', 'b', 'c'], (acc, curr) => curr + acc, ''); // "abc"
Arr.foldr([1, 2, 3], (acc, curr) => curr - acc, 0); // 2 (i.e. 1-(2-(3-0)))
```

---

### groupBy()

> **groupBy**\<`E`, `G`\>(`array`, `grouper`): [`IMap`](../../../collections/imap/README.md#imap)\<`G`, readonly `E`[]\>

Defined in: [src/array/array-utils.mts:1509](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1509)

Groups elements of an array by a key derived from each element.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### G

`G` _extends_ `MapSetKeyType`

The type of the group key (must be a primitive type).

#### Parameters

##### array

readonly `E`[]

The input array.

##### grouper

(`value`, `index`) => `G`

A function `(value: A, index: number) => G` that maps an element and its index to a group key.

#### Returns

[`IMap`](../../../collections/imap/README.md#imap)\<`G`, readonly `E`[]\>

An `IMap` where keys are group keys and values are arrays of elements belonging to that group.

#### Example

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

---

### head()

#### Call Signature

> **head**(`array`): [`None`](../../../functional/optional/namespaces/Optional.md#none)

Defined in: [src/array/array-utils.mts:420](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L420)

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Parameters

###### array

readonly \[\]

##### Returns

[`None`](../../../functional/optional/namespaces/Optional.md#none)

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

#### Call Signature

> **head**\<`E`, `L`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:421](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L421)

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Type Parameters

###### E

`E`

###### L

`L` _extends_ readonly `unknown`[]

##### Parameters

###### array

readonly \[`E`, `L`\]

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

#### Call Signature

> **head**\<`E`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:424](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L424)

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Type Parameters

###### E

`E`

##### Parameters

###### array

readonly \[`E`, `E`\]

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

#### Call Signature

> **head**\<`E`\>(`array`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:425](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L425)

Returns the first element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the first element with precise typing.

##### Type Parameters

###### E

`E`

##### Parameters

###### array

readonly `E`[]

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

##### Example

```ts
Arr.head([1, 2, 3]); // Optional.some(1)
Arr.head([]); // Optional.none
```

---

### indexIsInRange()

> **indexIsInRange**\<`E`\>(`array`, `index`): `boolean`

Defined in: [src/array/array-utils.mts:172](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L172)

Checks if an index is within the valid range of an array (i.e., `0 <= index < array.length`).

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The input array.

##### index

`ArgArrNonNegative`

The index to check.

#### Returns

`boolean`

`true` if the index is within the array bounds, `false` otherwise.

#### Example

```ts
Arr.indexIsInRange([10, 20], 0); // true
Arr.indexIsInRange([10, 20], 1); // true
Arr.indexIsInRange([10, 20], 2); // false
Arr.indexIsInRange([10, 20], -1); // false
Arr.indexIsInRange([], 0); // false
```

---

### indexOf()

> **indexOf**\<`E`\>(`array`, `searchElement`, `fromIndex?`): [`Optional`](../../../functional/optional/README.md#optional)\<`Uint32`\>

Defined in: [src/array/array-utils.mts:879](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L879)

Gets the index of a value in an array.

#### Type Parameters

##### E

`E`

#### Parameters

##### array

readonly `E`[]

The array to search.

##### searchElement

`E`

The element to search for.

##### fromIndex?

`ArgArr`

The index to start searching from.

#### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`Uint32`\>

Optional.Some with the index if found, Optional.None otherwise.

#### Example

```typescript
const arr = ['a', 'b', 'c', 'b'];
const result = Arr.indexOf(arr, 'b');
if (Optional.isSome(result)) {
    console.log(result.value); // 1 (branded as SizeType.Arr)
}
```

---

### isArray()

> **isArray**\<`E`\>(`value`): `value is E extends readonly unknown[] ? E<E> : never`

Defined in: [src/array/array-utils.mts:73](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L73)

Type guard that checks if a value is an array, excluding types that cannot be arrays.
This function refines the type by filtering out non-array types from unions.

#### Type Parameters

##### E

`E`

The input type that may or may not be an array.

#### Parameters

##### value

`E`

The value to check.

#### Returns

`value is E extends readonly unknown[] ? E<E> : never`

`true` if the value is an array, `false` otherwise.

#### Example

```ts
function processValue(value: string | number[] | null) {
    if (Arr.isArray(value)) {
        // value is now typed as number[]
        console.log(value.length);
    }
}

Arr.isArray([1, 2, 3]); // true
Arr.isArray('hello'); // false
Arr.isArray(null); // false
```

---

### isArrayAtLeastLength()

> **isArrayAtLeastLength**\<`E`, `N`\>(`array`, `len`): ``array is readonly [MakeTupleImpl<E, `${N}`, []>, E]``

Defined in: [src/array/array-utils.mts:149](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L149)

Checks if an array has at least a specific length.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### N

`N` _extends_ `ArgArrNonNegative`

The minimum expected length of the array (must be a number type).

#### Parameters

##### array

readonly `E`[]

The array to check.

##### len

`N`

The minimum expected length.

#### Returns

``array is readonly [MakeTupleImpl<E, `${N}`, []>, E]``

`true` if the array has at least the specified length, `false` otherwise.

#### Example

```ts
const arr: readonly number[] = [1, 2, 3];
if (Arr.isArrayAtLeastLength(arr, 2)) {
    // arr is now typed as readonly [number, number, ...number[]]
}
Arr.isArrayAtLeastLength([1], 2); // false
```

---

### isArrayOfLength()

> **isArrayOfLength**\<`E`, `N`\>(`array`, `len`): ``array is MakeTupleImpl<E, `${N}`, []>``

Defined in: [src/array/array-utils.mts:125](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L125)

Checks if an array has a specific length.

#### Type Parameters

##### E

`E`

The type of elements in the array.

##### N

`N` _extends_ `ArgArrNonNegative`

The expected length of the array (must be a number type).

#### Parameters

##### array

readonly `E`[]

The array to check.

##### len

`N`

The expected length.

#### Returns

``array is MakeTupleImpl<E, `${N}`, []>``

`true` if the array has the specified length, `false` otherwise.

#### Example

```ts
const arr: readonly number[] = [1, 2, 3];
if (Arr.isArrayOfLength(arr, 3)) {
    // arr is now typed as readonly [number, number, number]
}
Arr.isArrayOfLength([1, 2], 3); // false
```

---

### isEmpty()

> **isEmpty**\<`E`\>(`array`): `array is readonly []`

Defined in: [src/array/array-utils.mts:90](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L90)

Checks if an array is empty.

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The array to check.

#### Returns

`array is readonly []`

`true` if the array is empty, `false` otherwise.

#### Example

```ts
Arr.isEmpty([]); // true
Arr.isEmpty([1, 2, 3]); // false
```

---

### isNonEmpty()

> **isNonEmpty**\<`E`\>(`array`): `array is readonly [E, E]`

Defined in: [src/array/array-utils.mts:105](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L105)

Checks if an array is non-empty.

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The array to check.

#### Returns

`array is readonly [E, E]`

`true` if the array is non-empty, `false` otherwise.

#### Example

```ts
Arr.isNonEmpty([1, 2, 3]); // true
Arr.isNonEmpty([]); // false
```

---

### isSubset()

> **isSubset**\<`E1`, `E2`\>(`array1`, `array2`): `boolean`

Defined in: [src/array/array-utils.mts:1641](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1641)

Checks if the first array (`array1`) is a subset of the second array (`array2`).
An array `A` is a subset of `B` if all elements of `A` are also present in `B`.
Elements must be primitive types for `includes` to work reliably for comparison.

#### Type Parameters

##### E1

`E1` _extends_ `Primitive`

The type of elements in the first array (subset candidate), must be a primitive type.

##### E2

`E2` _extends_ `Primitive` = `E1`

The type of elements in the second array (superset candidate), must be a primitive type.

#### Parameters

##### array1

readonly `E1`[]

The first array.

##### array2

readonly `E2`[]

The second array.

#### Returns

`boolean`

`true` if `array1` is a subset of `array2`, `false` otherwise.

#### Remarks

`array1` ⊂ `array2`

#### Example

```ts
Arr.isSubset([1, 2], [1, 2, 3]); // true
Arr.isSubset([1, 2, 3], [1, 2]); // false
Arr.isSubset([], [1, 2, 3]); // true
Arr.isSubset([1, 5], [1, 2, 3]); // false
```

---

### isSuperset()

> **isSuperset**\<`E1`, `E2`\>(`array1`, `array2`): `boolean`

Defined in: [src/array/array-utils.mts:1667](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1667)

Checks if the first array (`array1`) is a superset of the second array (`array2`).
An array `A` is a superset of `B` if all elements of `B` are also present in `A`.
Elements must be primitive types.

#### Type Parameters

##### E1

`E1` _extends_ `Primitive`

The type of elements in the first array (superset candidate), must be a primitive type.

##### E2

`E2` _extends_ `Primitive` = `E1`

The type of elements in the second array (subset candidate), must be a primitive type.

#### Parameters

##### array1

readonly `E1`[]

The first array.

##### array2

readonly `E2`[]

The second array.

#### Returns

`boolean`

`true` if `array1` is a superset of `array2`, `false` otherwise.

#### Remarks

`array1` ⊃ `array2`

#### Example

```ts
Arr.isSuperset([1, 2, 3], [1, 2]); // true
Arr.isSuperset([1, 2], [1, 2, 3]); // false
Arr.isSuperset([1, 2, 3], []); // true
```

---

### join()

> **join**\<`E`\>(`array`, `separator?`): [`Result`](../../../functional/result/README.md#result)\<`string`, `Error`\>

Defined in: [src/array/array-utils.mts:1275](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1275)

Joins array elements into a string.

#### Type Parameters

##### E

`E`

#### Parameters

##### array

readonly `E`[]

The array to join.

##### separator?

`string`

The separator string.

#### Returns

[`Result`](../../../functional/result/README.md#result)\<`string`, `Error`\>

Result.Ok with the joined string, Result.Err if the operation throws.

#### Example

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

---

### last()

#### Call Signature

> **last**(`array`): [`None`](../../../functional/optional/namespaces/Optional.md#none)

Defined in: [src/array/array-utils.mts:443](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L443)

Returns the last element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

##### Parameters

###### array

readonly \[\]

##### Returns

[`None`](../../../functional/optional/namespaces/Optional.md#none)

##### Example

```ts
Arr.last([1, 2, 3]); // Optional.some(3)
Arr.last([]); // Optional.none
```

#### Call Signature

> **last**\<`E`, `L`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`L`\>

Defined in: [src/array/array-utils.mts:444](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L444)

Returns the last element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

##### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

###### L

`L`

##### Parameters

###### array

readonly \[`E`, `L`\]

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`L`\>

##### Example

```ts
Arr.last([1, 2, 3]); // Optional.some(3)
Arr.last([]); // Optional.none
```

#### Call Signature

> **last**\<`E`\>(`array`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:447](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L447)

Returns the last element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

##### Type Parameters

###### E

`E`

##### Parameters

###### array

readonly \[`E`, `E`\]

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

##### Example

```ts
Arr.last([1, 2, 3]); // Optional.some(3)
Arr.last([]); // Optional.none
```

#### Call Signature

> **last**\<`E`\>(`array`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:448](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L448)

Returns the last element of an array.

- If the array is empty, returns `Optional.none`.
- If the array is a tuple or a non-empty array, returns the last element with precise typing.

##### Type Parameters

###### E

`E`

##### Parameters

###### array

readonly `E`[]

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

##### Example

```ts
Arr.last([1, 2, 3]); // Optional.some(3)
Arr.last([]); // Optional.none
```

---

### lastIndexOf()

> **lastIndexOf**\<`E`\>(`array`, `searchElement`, `fromIndex?`): [`Optional`](../../../functional/optional/README.md#optional)\<`Uint32`\>

Defined in: [src/array/array-utils.mts:907](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L907)

Gets the last index of a value in an array.

#### Type Parameters

##### E

`E`

#### Parameters

##### array

readonly `E`[]

The array to search.

##### searchElement

`E`

The element to search for.

##### fromIndex?

`ArgArr`

The index to start searching from (searches backwards).

#### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`Uint32`\>

Optional.Some with the index if found, Optional.None otherwise.

#### Example

```typescript
const arr = ['a', 'b', 'c', 'b'];
const result = Arr.lastIndexOf(arr, 'b');
if (Optional.isSome(result)) {
    console.log(result.value); // 3 (branded as SizeType.Arr)
}
```

---

### max()

#### Call Signature

> **max**\<`E`\>(`array`, `comparator?`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1054](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1054)

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for arbitrary types.

##### Type Parameters

###### E

`E` _extends_ `number`

The type of elements in the array.

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The maximum value in the array wrapped in Optional.

##### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // Optional.some(5)
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:3})
Arr.max([]); // Optional.none
```

#### Call Signature

> **max**\<`E`\>(`array`, `comparator?`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1058](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1058)

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for arbitrary types.

##### Type Parameters

###### E

`E` _extends_ `number`

The type of elements in the array.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The maximum value in the array wrapped in Optional.

##### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // Optional.some(5)
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:3})
Arr.max([]); // Optional.none
```

#### Call Signature

> **max**\<`E`\>(`array`, `comparator`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1062](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1062)

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for arbitrary types.

##### Type Parameters

###### E

`E`

The type of elements in the array.

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The maximum value in the array wrapped in Optional.

##### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // Optional.some(5)
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:3})
Arr.max([]); // Optional.none
```

#### Call Signature

> **max**\<`E`\>(`array`, `comparator`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1066](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1066)

Finds the maximum value in an array.

- If the array is non-empty, returns the maximum value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for arbitrary types.

##### Type Parameters

###### E

`E`

The type of elements in the array.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: A, y: A) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to numeric comparison.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The maximum value in the array wrapped in Optional.

##### Example

```ts
Arr.max([3, 1, 4, 1, 5] as const); // Optional.some(5)
Arr.max([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:3})
Arr.max([]); // Optional.none
```

---

### maxBy()

#### Call Signature

> **maxBy**\<`E`\>(`array`, `comparatorValueMapper`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1150](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1150)

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The element with the maximum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // Optional.some({ name: 'Alice', age: 30 })
Arr.maxBy([], (p) => p.age); // Optional.none
```

#### Call Signature

> **maxBy**\<`E`\>(`array`, `comparatorValueMapper`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1154](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1154)

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The element with the maximum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // Optional.some({ name: 'Alice', age: 30 })
Arr.maxBy([], (p) => p.age); // Optional.none
```

#### Call Signature

> **maxBy**\<`E`, `V`\>(`array`, `comparatorValueMapper`, `comparator`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1158](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1158)

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The element with the maximum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // Optional.some({ name: 'Alice', age: 30 })
Arr.maxBy([], (p) => p.age); // Optional.none
```

#### Call Signature

> **maxBy**\<`E`, `V`\>(`array`, `comparatorValueMapper`, `comparator`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1163](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1163)

Finds the element with the maximum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the maximum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The element with the maximum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.maxBy(people, (p) => p.age); // Optional.some({ name: 'Alice', age: 30 })
Arr.maxBy([], (p) => p.age); // Optional.none
```

---

### min()

#### Call Signature

> **min**\<`E`\>(`array`, `comparator?`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1002](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1002)

Finds the minimum value in an array.

##### Type Parameters

###### E

`E` _extends_ `number`

The type of numbers in the array (must extend `number`).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The minimum value in the array wrapped in Optional.

##### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // Optional.some(1)
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:1})
Arr.min([]); // Optional.none
```

#### Call Signature

> **min**\<`E`\>(`array`, `comparator?`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1006](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1006)

Finds the minimum value in an array.

##### Type Parameters

###### E

`E` _extends_ `number`

The type of numbers in the array (must extend `number`).

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The minimum value in the array wrapped in Optional.

##### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // Optional.some(1)
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:1})
Arr.min([]); // Optional.none
```

#### Call Signature

> **min**\<`E`\>(`array`, `comparator`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1010](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1010)

Finds the minimum value in an array.

##### Type Parameters

###### E

`E`

The type of numbers in the array (must extend `number`).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The minimum value in the array wrapped in Optional.

##### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // Optional.some(1)
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:1})
Arr.min([]); // Optional.none
```

#### Call Signature

> **min**\<`E`\>(`array`, `comparator`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1014](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1014)

Finds the minimum value in an array.

##### Type Parameters

###### E

`E`

The type of numbers in the array (must extend `number`).

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function `(x: N, y: N) => number`. Should return < 0 if x is smaller, 0 if equal, > 0 if x is larger. Defaults to `x - y`.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The minimum value in the array wrapped in Optional.

##### Example

```ts
Arr.min([3, 1, 4, 1, 5] as const); // Optional.some(1)
Arr.min([{ v: 3 }, { v: 1 }], (a, b) => a.v - b.v); // Optional.some({v:1})
Arr.min([]); // Optional.none
```

---

### minBy()

#### Call Signature

> **minBy**\<`E`\>(`array`, `comparatorValueMapper`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1099](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1099)

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The element with the minimum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // Optional.some({ name: 'Bob', age: 20 })
Arr.minBy([], (p) => p.age); // Optional.none
```

#### Call Signature

> **minBy**\<`E`\>(`array`, `comparatorValueMapper`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1103](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1103)

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a value for comparison.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The element with the minimum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // Optional.some({ name: 'Bob', age: 20 })
Arr.minBy([], (p) => p.age); // Optional.none
```

#### Call Signature

> **minBy**\<`E`, `V`\>(`array`, `comparatorValueMapper`, `comparator`): [`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

Defined in: [src/array/array-utils.mts:1107](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1107)

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

##### Returns

[`Some`](../../../functional/optional/namespaces/Optional.md#some)\<`E`\>

The element with the minimum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // Optional.some({ name: 'Bob', age: 20 })
Arr.minBy([], (p) => p.age); // Optional.none
```

#### Call Signature

> **minBy**\<`E`, `V`\>(`array`, `comparatorValueMapper`, `comparator`): [`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

Defined in: [src/array/array-utils.mts:1112](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1112)

Finds the element with the minimum value according to a mapped numeric value.

- If the array is non-empty, returns the element with the minimum mapped value.
- If the array is empty, returns `Optional.none`.
- You can provide a custom comparator for the mapped values.

##### Type Parameters

###### E

`E`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

An optional custom comparator function for the mapped values.

##### Returns

[`Optional`](../../../functional/optional/README.md#optional)\<`E`\>

The element with the minimum mapped value wrapped in Optional.

##### Example

```ts
const people = [
    { name: 'Alice', age: 30 },
    { name: 'Bob', age: 20 },
] as const;
Arr.minBy(people, (p) => p.age); // Optional.some({ name: 'Bob', age: 20 })
Arr.minBy([], (p) => p.age); // Optional.none
```

---

### partition()

> **partition**\<`N`, `A`\>(`array`, `chunkSize`): readonly readonly `A`[][]

Defined in: [src/array/array-utils.mts:1382](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1382)

Partitions an array into sub-arrays of a specified size.
The last partition may be smaller if the array length is not a multiple of `chunkSize`.
Returns an empty array if chunkSize < 2.

#### Type Parameters

##### N

`N` _extends_ `WithSmallInt`\<`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `object`, `40`\>

The size of each partition (must be a number type, typically a literal for precise typing).

##### A

`A`

#### Parameters

##### array

readonly `A`[]

The input array.

##### chunkSize

`N`

The size of each partition.

#### Returns

readonly readonly `A`[][]

An array of arrays, where each inner array has up to `chunkSize` elements.

#### Example

```ts
Arr.partition([1, 2, 3, 4, 5, 6], 2); // [[1, 2], [3, 4], [5, 6]]
Arr.partition([1, 2, 3, 4, 5], 2); // [[1, 2], [3, 4], [5]]
Arr.partition([1, 2, 3], 5); // [[1, 2, 3]]
Arr.partition([], 2); // []
```

---

### range()

#### Call Signature

> **range**\<`S`, `E`\>(`start`, `end`, `step?`): `RangeList`\<`S`, `E`\>

Defined in: [src/array/array-utils.mts:350](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L350)

Creates an array of numbers within a specified range.

- If `step` is omitted or 1, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with a step of 1.
- If `step` is provided, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with the given step.
- If `start >= end` and `step > 0`, or `start <= end` and `step < 0`, returns an empty array.
- If `start` and `end` are `SmallUint` and `step` is 1 or omitted, the return type is inferred as a tuple of the precise range.

##### Type Parameters

###### S

`S` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the start value, constrained to `SmallUint`.

###### E

`E` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the end value, constrained to `SmallUint`.

##### Parameters

###### start

`S`

The start of the range (inclusive).

###### end

`E`

The end of the range (exclusive).

###### step?

`1`

The step value (default is 1). If `step` is 1, the return type is more precise.

##### Returns

`RangeList`\<`S`, `E`\>

An array of numbers in the specified range. The type is inferred as `RangeList<S, E>` if step is 1.

##### Example

```ts
Arr.range(1, 5); // [1, 2, 3, 4]
Arr.range(1, 5, 2); // [1, 3]
Arr.range(5, 1, -1); // [5, 4, 3, 2]
Arr.range(1, 1); // []
Arr.range(5, 1); // []
```

#### Call Signature

> **range**(`start`, `end`, `step?`): readonly `SafeUint`[]

Defined in: [src/array/array-utils.mts:356](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L356)

Creates an array of numbers within a specified range.

- If `step` is omitted or 1, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with a step of 1.
- If `step` is provided, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with the given step.
- If `start >= end` and `step > 0`, or `start <= end` and `step < 0`, returns an empty array.
- If `start` and `end` are `SmallUint` and `step` is 1 or omitted, the return type is inferred as a tuple of the precise range.

##### Parameters

###### start

`SafeUintWithSmallInt`

The start of the range (inclusive).

###### end

`SafeUintWithSmallInt`

The end of the range (exclusive).

###### step?

`PositiveSafeIntWithSmallInt`

The step value (default is 1). If `step` is 1, the return type is more precise.

##### Returns

readonly `SafeUint`[]

An array of numbers in the specified range. The type is inferred as `RangeList<S, E>` if step is 1.

##### Example

```ts
Arr.range(1, 5); // [1, 2, 3, 4]
Arr.range(1, 5, 2); // [1, 3]
Arr.range(5, 1, -1); // [5, 4, 3, 2]
Arr.range(1, 1); // []
Arr.range(5, 1); // []
```

#### Call Signature

> **range**(`start`, `end`, `step?`): readonly `SafeInt`[]

Defined in: [src/array/array-utils.mts:362](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L362)

Creates an array of numbers within a specified range.

- If `step` is omitted or 1, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with a step of 1.
- If `step` is provided, returns an array of numbers from `start` (inclusive) to `end` (exclusive) with the given step.
- If `start >= end` and `step > 0`, or `start <= end` and `step < 0`, returns an empty array.
- If `start` and `end` are `SmallUint` and `step` is 1 or omitted, the return type is inferred as a tuple of the precise range.

##### Parameters

###### start

`SafeIntWithSmallInt`

The start of the range (inclusive).

###### end

`SafeIntWithSmallInt`

The end of the range (exclusive).

###### step?

`NonZeroSafeIntWithSmallInt`

The step value (default is 1). If `step` is 1, the return type is more precise.

##### Returns

readonly `SafeInt`[]

An array of numbers in the specified range. The type is inferred as `RangeList<S, E>` if step is 1.

##### Example

```ts
Arr.range(1, 5); // [1, 2, 3, 4]
Arr.range(1, 5, 2); // [1, 3]
Arr.range(5, 1, -1); // [5, 4, 3, 2]
Arr.range(1, 1); // []
Arr.range(5, 1); // []
```

---

### scan()

> **scan**\<`E`, `S`\>(`array`, `reducer`, `init`): readonly \[`S`, `S`\]

Defined in: [src/array/array-utils.mts:1465](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1465)

Returns an array of successively reduced values from an array, starting with an initial value.
The first element of the result is always the `init` value.
The result array will have `array.length + 1` elements.

#### Type Parameters

##### E

`E`

##### S

`S`

The type of the accumulated values and the initial value.

#### Parameters

##### array

readonly `E`[]

The input array.

##### reducer

(`accumulator`, `currentValue`, `currentIndex`) => `S`

A function `(accumulator: S, currentValue: A, currentIndex: number) => S` that reduces the current value and the accumulated value to a new accumulated value.

##### init

`S`

The initial accumulated value.

#### Returns

readonly \[`S`, `S`\]

A non-empty array of accumulated values, starting with `init`.

#### Example

```ts
Arr.scan([1, 2, 3], (acc, curr) => acc + curr, 0); // [0, 1, 3, 6]
Arr.scan(['a', 'b', 'c'], (acc, curr) => acc + curr, '0'); // ['0', '0a', '0ab', '0abc']
Arr.scan([], (acc, curr: number) => acc + curr, 100); // [100]
```

---

### seq()

#### Call Signature

> **seq**\<`N`\>(`len`): `Seq`\<`N`\>

Defined in: [src/array/array-utils.mts:215](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L215)

Creates a sequence of numbers from 0 to `len-1`.

- If `len` is a `SmallUint`, returns a tuple of numbers.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of numbers.
- Otherwise, returns a readonly array of numbers.

##### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

##### Parameters

###### len

`N`

##### Returns

`Seq`\<`N`\>

##### Example

```ts
Arr.seq(3); // [0, 1, 2]
Arr.seq(0); // []
```

#### Call Signature

> **seq**(`len`): readonly \[`Uint32`, `Uint32`\]

Defined in: [src/array/array-utils.mts:216](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L216)

Creates a sequence of numbers from 0 to `len-1`.

- If `len` is a `SmallUint`, returns a tuple of numbers.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of numbers.
- Otherwise, returns a readonly array of numbers.

##### Parameters

###### len

`ArgArrPositive`

##### Returns

readonly \[`Uint32`, `Uint32`\]

##### Example

```ts
Arr.seq(3); // [0, 1, 2]
Arr.seq(0); // []
```

#### Call Signature

> **seq**(`len`): readonly `Uint32`[]

Defined in: [src/array/array-utils.mts:219](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L219)

Creates a sequence of numbers from 0 to `len-1`.

- If `len` is a `SmallUint`, returns a tuple of numbers.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of numbers.
- Otherwise, returns a readonly array of numbers.

##### Parameters

###### len

`ArgArrNonNegative`

##### Returns

readonly `Uint32`[]

##### Example

```ts
Arr.seq(3); // [0, 1, 2]
Arr.seq(0); // []
```

---

### setDifference()

> **setDifference**\<`E`\>(`array1`, `array2`): readonly `E`[]

Defined in: [src/array/array-utils.mts:1715](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1715)

Returns the set difference of two arrays (`array1` - `array2`).
The difference contains elements that are in `array1` but not in `array2`. Order is based on `array1`.
Elements must be primitive types.

#### Type Parameters

##### E

`E` _extends_ `Primitive`

The type of elements in the arrays (must be a primitive type).

#### Parameters

##### array1

readonly `E`[]

The first array.

##### array2

readonly `E`[]

The second array.

#### Returns

readonly `E`[]

A new array containing elements from `array1` that are not in `array2`.

#### Example

```ts
Arr.setDifference([1, 2, 3], [2, 3, 4]); // [1]
Arr.setDifference([1, 2, 3], [1, 2, 3]); // []
Arr.setDifference([1, 2], [3, 4]); // [1, 2]
```

---

### setIntersection()

> **setIntersection**\<`E1`, `E2`\>(`array1`, `array2`): readonly `E1` & `E2`[]

Defined in: [src/array/array-utils.mts:1690](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1690)

Returns the intersection of two arrays of primitive types.
The intersection contains elements that are present in both arrays. Order is based on `array1`.

#### Type Parameters

##### E1

`E1` _extends_ `Primitive`

The type of elements in the first array (must be a primitive type).

##### E2

`E2` _extends_ `Primitive` = `E1`

The type of elements in the second array (must be a primitive type).

#### Parameters

##### array1

readonly `E1`[]

The first array.

##### array2

readonly `E2`[]

The second array.

#### Returns

readonly `E1` & `E2`[]

A new array containing elements that are in both `array1` and `array2`.

#### Example

```ts
Arr.setIntersection([1, 2, 3], [2, 3, 4]); // [2, 3]
Arr.setIntersection(['a', 'b'], ['b', 'c']); // ['b']
Arr.setIntersection([1, 2], [3, 4]); // []
```

---

### size()

#### Call Signature

> **size**\<`Ar`\>(`array`): `IntersectBrand`\<`PositiveNumber`, `Uint32`\>

Defined in: [src/array/array-utils.mts:37](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L37)

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

##### Type Parameters

###### Ar

`Ar` _extends_ readonly \[`unknown`, `unknown`\]

The type of the array

##### Parameters

###### array

`Ar`

The array to get the size of

##### Returns

`IntersectBrand`\<`PositiveNumber`, `Uint32`\>

The size of the array as a branded Uint32 type

##### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

#### Call Signature

> **size**\<`Ar`\>(`array`): `Uint32`

Defined in: [src/array/array-utils.mts:40](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L40)

Returns the size (length) of an array as a branded Uint32 type.
For non-empty arrays, returns a positive number intersected with Uint32.
For potentially empty arrays, returns Uint32.

##### Type Parameters

###### Ar

`Ar` _extends_ readonly `unknown`[]

The type of the array

##### Parameters

###### array

`Ar`

The array to get the size of

##### Returns

`Uint32`

The size of the array as a branded Uint32 type

##### Example

```typescript
const arr1 = [1, 2, 3] as const;
Arr.size(arr1); // PositiveNumber & Uint32

const arr2: number[] = [1, 2, 3];
Arr.size(arr2); // Uint32

const arr3 = [] as const;
Arr.size(arr3); // Uint32
```

---

### skip()

#### Call Signature

> **skip**\<`E`, `N`\>(`array`, `num`): `Skip`\<`N`, `E`\>

Defined in: [src/array/array-utils.mts:616](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L616)

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

##### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to `SmallUint`.

##### Parameters

###### array

`E`

The input array.

###### num

`N`

The number of elements to skip.

##### Returns

`Skip`\<`N`, `E`\>

A new array containing the elements after skipping the first N.

##### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

#### Call Signature

> **skip**\<`E`\>(`array`, `num`): readonly `E`[]

Defined in: [src/array/array-utils.mts:620](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L620)

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to skip.

##### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

##### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

#### Call Signature

> **skip**\<`E`\>(`array`, `num`): readonly `E`[]

Defined in: [src/array/array-utils.mts:624](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L624)

Skips the first N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the first N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the first N elements skipped.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to skip.

##### Returns

readonly `E`[]

A new array containing the elements after skipping the first N.

##### Example

```ts
Arr.skip([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.skip([1, 2], 3); // []
Arr.skip([], 2); // []
```

---

### skipLast()

#### Call Signature

> **skipLast**\<`E`, `N`\>(`array`, `num`): `SkipLast`\<`N`, `E`\>

Defined in: [src/array/array-utils.mts:654](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L654)

Skips the last N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the last N elements skipped.

##### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to `SmallUint`.

##### Parameters

###### array

`E`

The input array.

###### num

`N`

The number of elements to skip from the end.

##### Returns

`SkipLast`\<`N`, `E`\>

A new array containing the elements after skipping the last N.

##### Example

```ts
Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.skipLast([1, 2], 3); // []
Arr.skipLast([], 2); // []
```

#### Call Signature

> **skipLast**\<`E`\>(`array`, `num`): readonly `E`[]

Defined in: [src/array/array-utils.mts:658](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L658)

Skips the last N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the last N elements skipped.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to skip from the end.

##### Returns

readonly `E`[]

A new array containing the elements after skipping the last N.

##### Example

```ts
Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.skipLast([1, 2], 3); // []
Arr.skipLast([], 2); // []
```

#### Call Signature

> **skipLast**\<`E`\>(`array`, `num`): readonly `E`[]

Defined in: [src/array/array-utils.mts:662](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L662)

Skips the last N elements of an array.

- If the array is a tuple, the return type is inferred as a tuple with the last N elements removed.
- If the array is a non-empty array and N is a positive integer, returns a readonly array (may be empty).
- Otherwise, returns a readonly array with the last N elements skipped.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to skip from the end.

##### Returns

readonly `E`[]

A new array containing the elements after skipping the last N.

##### Example

```ts
Arr.skipLast([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.skipLast([1, 2], 3); // []
Arr.skipLast([], 2); // []
```

---

### sliceClamped()

> **sliceClamped**\<`E`\>(`array`, `start`, `end`): readonly `E`[]

Defined in: [src/array/array-utils.mts:474](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L474)

Slices an array with clamped start and end indices.
Ensures that start and end indices are within the bounds of the array.
If `start` > `end` after clamping, an empty array is returned.

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The array to slice.

##### start

`ArgArr`

The start index for the slice (inclusive).

##### end

`ArgArr`

The end index for the slice (exclusive).

#### Returns

readonly `E`[]

A new array containing the sliced elements.

#### Example

```ts
const arr = [10, 20, 30, 40, 50];
Arr.sliceClamped(arr, 1, 3); // [20, 30]
Arr.sliceClamped(arr, -2, 10); // [10, 20, 30, 40, 50] (start clamped to 0, end to 5)
Arr.sliceClamped(arr, 3, 1); // [] (start clamped to 3, end to 3)
Arr.sliceClamped([], 0, 5); // []
```

---

### sortedNumSetDifference()

> **sortedNumSetDifference**\<`E`\>(`sortedList1`, `sortedList2`): readonly `E`[]

Defined in: [src/array/array-utils.mts:1735](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1735)

Returns the set difference of two sorted arrays of numbers (`sortedList1` - `sortedList2`).
This operation is more efficient for sorted arrays than the generic `setDifference`.
The resulting array is also sorted.

#### Type Parameters

##### E

`E` _extends_ `number`

The type of numbers in the arrays (must extend `number`).

#### Parameters

##### sortedList1

readonly `E`[]

The first sorted array of numbers.

##### sortedList2

readonly `E`[]

The second sorted array of numbers.

#### Returns

readonly `E`[]

A new sorted array containing numbers from `sortedList1` that are not in `sortedList2`.

#### Example

```ts
Arr.sortedNumSetDifference([1, 2, 3, 5], [2, 4, 5]); // [1, 3]
Arr.sortedNumSetDifference([1, 2, 3], [1, 2, 3]); // []
Arr.sortedNumSetDifference([1, 2], [3, 4]); // [1, 2]
```

---

### sum()

#### Call Signature

> **sum**(`array`): `Int`

Defined in: [src/array/array-utils.mts:1249](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1249)

Calculates the sum of numbers in an array.

##### Parameters

###### array

readonly `Int`[]

The input array of numbers.

##### Returns

`Int`

The sum of the numbers. Returns 0 for an empty array.

##### Example

```ts
Arr.sum([1, 2, 3]); // 6
Arr.sum([]); // 0
Arr.sum([-1, 0, 1]); // 0
```

#### Call Signature

> **sum**(`array`): `number`

Defined in: [src/array/array-utils.mts:1250](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1250)

Calculates the sum of numbers in an array.

##### Parameters

###### array

readonly `number`[]

The input array of numbers.

##### Returns

`number`

The sum of the numbers. Returns 0 for an empty array.

##### Example

```ts
Arr.sum([1, 2, 3]); // 6
Arr.sum([]); // 0
Arr.sum([-1, 0, 1]); // 0
```

---

### tail()

> **tail**\<`E`\>(`array`): `Tail`\<`E`\>

Defined in: [src/array/array-utils.mts:497](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L497)

Returns all elements of an array except the first one.

#### Type Parameters

##### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

#### Parameters

##### array

`E`

The input array.

#### Returns

`Tail`\<`E`\>

A new array containing all elements except the first. The type is inferred as `List.Tail<T>`.

#### Example

```ts
Arr.tail([1, 2, 3] as const); // [2, 3]
Arr.tail([1] as const); // []
Arr.tail([]); // []
```

---

### take()

#### Call Signature

> **take**\<`E`, `N`\>(`array`, `num`): `Take`\<`N`, `E`\>

Defined in: [src/array/array-utils.mts:540](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L540)

Takes the first N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the first N elements.
- If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
- Otherwise, returns a readonly array of up to N elements.

##### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to take, constrained to `SmallUint`.

##### Parameters

###### array

`E`

The input array.

###### num

`N`

The number of elements to take.

##### Returns

`Take`\<`N`, `E`\>

A new array containing the first N elements.

##### Example

```ts
Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.take([1, 2], 3); // [1, 2]
Arr.take([], 2); // []
```

#### Call Signature

> **take**\<`E`\>(`array`, `num`): readonly \[`E`, `E`\]

Defined in: [src/array/array-utils.mts:544](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L544)

Takes the first N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the first N elements.
- If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
- Otherwise, returns a readonly array of up to N elements.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to take.

##### Returns

readonly \[`E`, `E`\]

A new array containing the first N elements.

##### Example

```ts
Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.take([1, 2], 3); // [1, 2]
Arr.take([], 2); // []
```

#### Call Signature

> **take**\<`E`\>(`array`, `num`): readonly `E`[]

Defined in: [src/array/array-utils.mts:548](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L548)

Takes the first N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the first N elements.
- If the array is a NonEmptyArray and N is a SizeType.ArgArrPositive, returns a NonEmptyArray.
- Otherwise, returns a readonly array of up to N elements.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to take.

##### Returns

readonly `E`[]

A new array containing the first N elements.

##### Example

```ts
Arr.take([1, 2, 3, 4] as const, 2); // [1, 2]
Arr.take([1, 2], 3); // [1, 2]
Arr.take([], 2); // []
```

---

### takeLast()

#### Call Signature

> **takeLast**\<`E`, `N`\>(`array`, `num`): `TakeLast`\<`N`, `E`\>

Defined in: [src/array/array-utils.mts:578](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L578)

Takes the last N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the last N elements.
- If the array is a non-empty array and N is a positive integer, returns a non-empty array.
- Otherwise, returns a readonly array of up to N elements.

##### Type Parameters

###### E

`E` _extends_ readonly `unknown`[]

The type of the array (can be a tuple for more precise typing).

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to take, constrained to `SmallUint`.

##### Parameters

###### array

`E`

The input array.

###### num

`N`

The number of elements to take.

##### Returns

`TakeLast`\<`N`, `E`\>

A new array containing the last N elements.

##### Example

```ts
Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.takeLast([1, 2], 3); // [1, 2]
Arr.takeLast([], 2); // []
```

#### Call Signature

> **takeLast**\<`E`\>(`array`, `num`): readonly \[`E`, `E`\]

Defined in: [src/array/array-utils.mts:582](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L582)

Takes the last N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the last N elements.
- If the array is a non-empty array and N is a positive integer, returns a non-empty array.
- Otherwise, returns a readonly array of up to N elements.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### num

`ArgArrPositive`

The number of elements to take.

##### Returns

readonly \[`E`, `E`\]

A new array containing the last N elements.

##### Example

```ts
Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.takeLast([1, 2], 3); // [1, 2]
Arr.takeLast([], 2); // []
```

#### Call Signature

> **takeLast**\<`E`\>(`array`, `num`): readonly `E`[]

Defined in: [src/array/array-utils.mts:586](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L586)

Takes the last N elements from an array.

- If the array is a tuple, the return type is inferred as a tuple of the last N elements.
- If the array is a non-empty array and N is a positive integer, returns a non-empty array.
- Otherwise, returns a readonly array of up to N elements.

##### Type Parameters

###### E

`E`

The type of the array (can be a tuple for more precise typing).

##### Parameters

###### array

readonly `E`[]

The input array.

###### num

`ArgArrNonNegative`

The number of elements to take.

##### Returns

readonly `E`[]

A new array containing the last N elements.

##### Example

```ts
Arr.takeLast([1, 2, 3, 4] as const, 2); // [3, 4]
Arr.takeLast([1, 2], 3); // [1, 2]
Arr.takeLast([], 2); // []
```

---

### toFilled()

> **toFilled**\<`E`\>(`array`, `value`, `start?`, `end?`): readonly `E`[]

Defined in: [src/array/array-utils.mts:796](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L796)

Fills an array with a value (creates a new filled array).

#### Type Parameters

##### E

`E`

#### Parameters

##### array

readonly `E`[]

The array.

##### value

`E`

The value to fill with.

##### start?

`ArgArr`

The start index.

##### end?

`ArgArr`

The end index.

#### Returns

readonly `E`[]

Result.Ok with the new filled array.

#### Example

```typescript
const arr = [1, 2, 3, 4, 5];
const result = Arr.toFilled(arr, 0, 1, 4);
if (Result.isOk(result)) {
    console.log(result.value); // [1, 0, 0, 0, 5]
}
```

---

### toInserted()

> **toInserted**\<`E`\>(`array`, `index`, `newValue`): readonly `E`[]

Defined in: [src/array/array-utils.mts:716](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L716)

Returns a new array with a new value inserted at the specified index.
Index can be out of bounds (e.g., negative or greater than length), `toSpliced` handles this.

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The input array.

##### index

`ArgArrNonNegative`

The index at which to insert the new value.

##### newValue

`E`

The value to insert.

#### Returns

readonly `E`[]

A new array with the value inserted.

#### Example

```ts
Arr.toInserted([1, 2, 3], 1, 10); // [1, 10, 2, 3]
Arr.toInserted([1, 2, 3], 0, 0); // [0, 1, 2, 3]
Arr.toInserted([1, 2, 3], 3, 4); // [1, 2, 3, 4]
```

---

### toPushed()

> **toPushed**\<`E`, `V`\>(`array`, `newValue`): readonly \[`E`, `V`\]

Defined in: [src/array/array-utils.mts:753](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L753)

Returns a new array with a value added to the end.

#### Type Parameters

##### E

`E` _extends_ readonly `unknown`[]

The type of the input array (can be a tuple).

##### V

`V`

The type of the value to add.

#### Parameters

##### array

`E`

The input array.

##### newValue

`V`

The value to add.

#### Returns

readonly \[`E`, `V`\]

A new array with the value added to the end. Type is `readonly [...E, V]`.

#### Example

```ts
Arr.toPushed([1, 2] as const, 3); // [1, 2, 3]
Arr.toPushed([], 0); // [0]
```

---

### toRemoved()

> **toRemoved**\<`E`\>(`array`, `index`): readonly `E`[]

Defined in: [src/array/array-utils.mts:735](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L735)

Returns a new array with the element at the specified index removed.
If index is out of bounds, `toSpliced` handles this (usually by returning a copy).

#### Type Parameters

##### E

`E`

The type of elements in the array.

#### Parameters

##### array

readonly `E`[]

The input array.

##### index

`ArgArrNonNegative`

The index of the element to remove.

#### Returns

readonly `E`[]

A new array with the element removed.

#### Example

```ts
Arr.toRemoved([1, 2, 3], 1); // [1, 3]
Arr.toRemoved([1, 2, 3], 5); // [1, 2, 3] (index out of bounds)
```

---

### toSortedBy()

#### Call Signature

> **toSortedBy**\<`E`\>(`array`, `comparatorValueMapper`, `comparator?`): readonly `E`[]

Defined in: [src/array/array-utils.mts:1411](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1411)

Sorts an array by a value derived from its elements, using a numeric mapping.

##### Type Parameters

###### E

`E`

The type of elements in the array.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparatorValueMapper

(`value`) => `number`

A function `(value: A) => number` that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function `(x: number, y: number) => number` for the mapped numbers. Defaults to ascending sort (x - y).

##### Returns

readonly `E`[]

A new array sorted by the mapped values.

##### Example

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

#### Call Signature

> **toSortedBy**\<`E`, `V`\>(`array`, `comparatorValueMapper`, `comparator`): readonly `E`[]

Defined in: [src/array/array-utils.mts:1426](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1426)

Sorts an array by a value derived from its elements, using a custom value type and comparator.

##### Type Parameters

###### E

`E`

The type of elements in the array.

###### V

`V`

The type of the value to compare by.

##### Parameters

###### array

readonly `E`[]

The input array.

###### comparatorValueMapper

(`value`) => `V`

A function `(value: A) => B` that maps an element to a value of type `V` for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function `(x: V, y: V) => number` for values of type `V`.

##### Returns

readonly `E`[]

A new array sorted by the mapped values.

---

### toUnshifted()

> **toUnshifted**\<`E`, `V`\>(`array`, `newValue`): readonly \[`V`, `E`\]

Defined in: [src/array/array-utils.mts:773](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L773)

Returns a new array with a value added to the beginning.

#### Type Parameters

##### E

`E` _extends_ readonly `unknown`[]

The type of the input array (can be a tuple).

##### V

`V`

The type of the value to add.

#### Parameters

##### array

`E`

The input array.

##### newValue

`V`

The value to add.

#### Returns

readonly \[`V`, `E`\]

A new array with the value added to the beginning. Type is `readonly [V, ...E]`.

#### Example

```ts
Arr.toUnshifted([1, 2] as const, 0); // [0, 1, 2]
Arr.toUnshifted([], 0); // [0]
```

---

### toUpdated()

> **toUpdated**\<`E`, `U`\>(`array`, `index`, `updater`): readonly (`E` \| `U`)[]

Defined in: [src/array/array-utils.mts:691](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L691)

Returns a new array with the element at the specified index updated by a function.
If the index is out of bounds, the original array is returned (as per `Array.prototype.with` behavior for invalid indices, though it throws for non-integer indices).
This implementation ensures it doesn't throw for out-of-bounds indices but returns a copy.

#### Type Parameters

##### E

`E`

##### U

`U`

The type of the updated value.

#### Parameters

##### array

readonly `E`[]

The input array.

##### index

`ArgArrNonNegative`

The index of the element to update.

##### updater

(`prev`) => `U`

A function that takes the previous value and returns the updated value.

#### Returns

readonly (`E` \| `U`)[]

A new array with the element at the specified index updated. If index is invalid, a copy of the original array is returned.

#### Example

```ts
Arr.toUpdated([1, 2, 3], 1, (x) => x * 10); // [1, 20, 3]
Arr.toUpdated([1, 2, 3], 5, (x) => x * 10); // [1, 2, 3] (index out of bounds)
```

---

### uniq()

> **uniq**\<`P`\>(`array`): readonly `P`[]

Defined in: [src/array/array-utils.mts:1540](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1540)

Creates a new array with unique elements from the input array. Order is preserved from the first occurrence.
Uses `Set` internally for efficient uniqueness checking.

#### Type Parameters

##### P

`P` _extends_ `Primitive`

The type of elements in the array.

#### Parameters

##### array

readonly `P`[]

The input array.

#### Returns

readonly `P`[]

A new array with unique elements from the input array. Returns `[]` for an empty input.

#### Example

```ts
Arr.uniq([1, 2, 2, 3, 1, 4]); // [1, 2, 3, 4]
Arr.uniq(['a', 'b', 'a']); // ['a', 'b']
```

---

### uniqBy()

#### Call Signature

> **uniqBy**\<`E`, `P`\>(`array`, `mapFn`): readonly \[`E`, `E`\]

Defined in: [src/array/array-utils.mts:1567](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1567)

Creates a new array with unique elements from the input array, based on the values returned by `mapFn`.

- If the input is a non-empty array, returns a non-empty array.
- Otherwise, returns a readonly array.

##### Type Parameters

###### E

`E`

The type of elements in the array.

###### P

`P` _extends_ `Primitive`

The type of the mapped value (used for uniqueness comparison).

##### Parameters

###### array

readonly \[`E`, `E`\]

The input array.

###### mapFn

(`value`) => `P`

A function `(value: A) => P` to map elements to values for uniqueness comparison.

##### Returns

readonly \[`E`, `E`\]

A new array with unique elements based on the mapped values.

##### Example

```ts
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alicia' }, // Duplicate id
];
Arr.uniqBy(users, (user) => user.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

#### Call Signature

> **uniqBy**\<`E`, `P`\>(`array`, `mapFn`): readonly `E`[]

Defined in: [src/array/array-utils.mts:1571](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1571)

Creates a new array with unique elements from the input array, based on the values returned by `mapFn`.

- If the input is a non-empty array, returns a non-empty array.
- Otherwise, returns a readonly array.

##### Type Parameters

###### E

`E`

The type of elements in the array.

###### P

`P` _extends_ `Primitive`

The type of the mapped value (used for uniqueness comparison).

##### Parameters

###### array

readonly `E`[]

The input array.

###### mapFn

(`value`) => `P`

A function `(value: A) => P` to map elements to values for uniqueness comparison.

##### Returns

readonly `E`[]

A new array with unique elements based on the mapped values.

##### Example

```ts
const users = [
    { id: 1, name: 'Alice' },
    { id: 2, name: 'Bob' },
    { id: 1, name: 'Alicia' }, // Duplicate id
];
Arr.uniqBy(users, (user) => user.id); // [{ id: 1, name: 'Alice' }, { id: 2, name: 'Bob' }]
```

---

### zeros()

#### Call Signature

> **zeros**\<`N`\>(`len`): `MakeTupleImpl`\<`0`, `` `${N}` ``\>

Defined in: [src/array/array-utils.mts:195](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L195)

Creates an array of zeros with the specified length.

- If `len` is a `SmallUint`, returns a tuple of zeros of that length.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of zeros.
- Otherwise, returns a readonly array of zeros.

##### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the length, constrained to `SmallUint`.

##### Parameters

###### len

`N`

The length of the array.

##### Returns

`MakeTupleImpl`\<`0`, `` `${N}` ``\>

An array of zeros with the specified length.

##### Example

```ts
Arr.zeros(3); // [0, 0, 0]
Arr.zeros(0); // []
```

#### Call Signature

> **zeros**(`len`): readonly \[`0`, `0`\]

Defined in: [src/array/array-utils.mts:196](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L196)

Creates an array of zeros with the specified length.

- If `len` is a `SmallUint`, returns a tuple of zeros of that length.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of zeros.
- Otherwise, returns a readonly array of zeros.

##### Parameters

###### len

`ArgArrPositive`

The length of the array.

##### Returns

readonly \[`0`, `0`\]

An array of zeros with the specified length.

##### Example

```ts
Arr.zeros(3); // [0, 0, 0]
Arr.zeros(0); // []
```

#### Call Signature

> **zeros**(`len`): readonly `0`[]

Defined in: [src/array/array-utils.mts:197](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L197)

Creates an array of zeros with the specified length.

- If `len` is a `SmallUint`, returns a tuple of zeros of that length.
- If `len` is a `SizeType.ArgArrPositive`, returns a NonEmptyArray of zeros.
- Otherwise, returns a readonly array of zeros.

##### Parameters

###### len

`ArgArrNonNegative`

The length of the array.

##### Returns

readonly `0`[]

An array of zeros with the specified length.

##### Example

```ts
Arr.zeros(3); // [0, 0, 0]
Arr.zeros(0); // []
```

---

### zip()

> **zip**\<`E1`, `E2`\>(`array1`, `array2`): `Zip`\<`E1`, `E2`\>

Defined in: [src/array/array-utils.mts:1311](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1311)

Creates an array of tuples by pairing up corresponding elements from two arrays.
The resulting array has a length equal to the minimum of the two input array lengths.

#### Type Parameters

##### E1

`E1` _extends_ readonly `unknown`[]

The type of the first array.

##### E2

`E2` _extends_ readonly `unknown`[]

The type of the second array.

#### Parameters

##### array1

`E1`

The first array.

##### array2

`E2`

The second array.

#### Returns

`Zip`\<`E1`, `E2`\>

An array of tuples where each tuple contains corresponding elements from both arrays.

#### Example

```ts
Arr.zip([1, 2, 3] as const, ['a', 'b', 'c'] as const); // [[1, 'a'], [2, 'b'], [3, 'c']]
Arr.zip([1, 2], ['a', 'b', 'c']); // [[1, 'a'], [2, 'b']]
Arr.zip([1, 2, 3], ['a']); // [[1, 'a']]
Arr.zip([], ['a']); // []
```
