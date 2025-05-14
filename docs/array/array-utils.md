[**Documentation**](../README.md)

---

[Documentation](../README.md) / array/array-utils

# array/array-utils

## Variables

### Arr

> `const` **Arr**: `object`

Defined in: [array/array-utils.mts:1358](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L1358)

A collection of utility functions for working with arrays.

#### Type declaration

##### butLast()

> **butLast**: \<`T`\>(`list`) => `ButLast`\<`T`\>

Returns all elements of an array except the last one.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### Parameters

###### list

`T`

The input array.

###### Returns

`ButLast`\<`T`\>

A new array containing all elements except the last.

##### chunk()

> **chunk**: \<`T`\>(`array`, `chunkSize`) => readonly readonly `T`[][]

Splits an array into chunks of a specified size.
The last chunk may be smaller if the array length is not a multiple of the chunk size.

###### Type Parameters

###### T

`T`

The type of elements in the array.

###### Parameters

###### array

readonly `T`[]

The input array.

###### chunkSize

`number`

The size of each chunk.

###### Returns

readonly readonly `T`[][]

An array of arrays, where each inner array is a chunk.

##### concat()

> **concat**: \<`T1`, `T2`\>(`list1`, `list2`) => readonly \[`T1`, `T2`\]

Concatenates two arrays.

###### Type Parameters

###### T1

`T1` _extends_ readonly `unknown`[]

The type of the first array.

###### T2

`T2` _extends_ readonly `unknown`[]

The type of the second array.

###### Parameters

###### list1

`T1`

The first array.

###### list2

`T2`

The second array.

###### Returns

readonly \[`T1`, `T2`\]

A new array that is the concatenation of the two input arrays.

##### copy()

> **copy**: \<`T`\>(`list`) => `T`

Creates a shallow copy of an array.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### Parameters

###### list

`T`

The array to copy.

###### Returns

`T`

A new array that is a shallow copy of the input array.

##### count()

> **count**: \<`A`\>(`list`, `predicate`) => `number`

Counts the number of elements in an array that satisfy a predicate.
If no predicate is provided, counts all elements.

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

A function to test each element for a condition.

###### Returns

`number`

The number of elements that satisfy the predicate.

##### countBy()

> **countBy**: \<`A`, `G`\>(`list`, `grouper`) => [`IMap`](../collections/imap.md#imap)\<`G`, `number`\>

Groups elements of an array by a key derived from each element and counts the elements in each group.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### G

`G` _extends_ `Primitive`

The type of the group key (must be a primitive type).

###### Parameters

###### list

readonly `A`[]

The input array.

###### grouper

(`value`, `index`) => `G`

A function that maps an element and its index to a group key.

###### Returns

[`IMap`](../collections/imap.md#imap)\<`G`, `number`\>

An IMap where keys are group keys and values are the counts of elements in each group.

##### eq()

> **eq**: \<`T`\>(`list1`, `list2`) => `boolean`

Checks if two arrays are equal (shallow comparison of elements).

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

###### Returns

`boolean`

`true` if the arrays have the same length and all corresponding elements are strictly equal, `false` otherwise.

##### filterNot()

> **filterNot**: \<`A`\>(`list`, `predicate`) => readonly `A`[]

Filters an array by excluding elements for which the predicate returns true.

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

A function that returns `true` for elements to be excluded.

###### Returns

readonly `A`[]

A new array with elements for which the predicate returned `false`.

##### first()

> **first**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `H`; \<`A`\>(`list`): `A`; \<`A`\>(`list`): `undefined` \| `A`; \}

###### Call Signature

> (`list`): `undefined`

Returns the first element of an array.

###### Parameters

###### list

readonly \[\]

The input array.

###### Returns

`undefined`

The first element of the array, or `undefined` if the array is empty.

###### Call Signature

> \<`H`, `L`\>(`list`): `H`

Returns the first element of a non-empty array.

###### Type Parameters

###### H

`H`

The type of the head element.

###### L

`L` _extends_ readonly `unknown`[]

The type of the rest of the elements.

###### Parameters

###### list

readonly \[`H`, `L`\]

The input non-empty array.

###### Returns

`H`

The first element of the array.

###### Call Signature

> \<`A`\>(`list`): `A`

Returns the first element of a non-empty array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### Returns

`A`

The first element of the array.

###### Call Signature

> \<`A`\>(`list`): `undefined` \| `A`

Returns the first element of an array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### Returns

`undefined` \| `A`

The first element of the array, or `undefined` if the array is empty.

##### flatMap()

> **flatMap**: \<`A`, `M`\>(`list`, `mapper`) => readonly `M`[]

Maps each element of an array to a new array and flattens the result.

###### Type Parameters

###### A

`A`

The type of elements in the input array.

###### M

`M`

The type of elements in the output array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### mapper

(`value`, `key`) => readonly `M`[]

A function that maps an element and its index to a new array.

###### Returns

readonly `M`[]

A new array with the results of the mapping and flattening.

##### foldl()

> **foldl**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

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

A function to execute on each element in the array.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

##### foldr()

> **foldr**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.

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

A function to execute on each element in the array.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

##### groupBy()

> **groupBy**: \<`A`, `G`\>(`list`, `grouper`) => [`IMap`](../collections/imap.md#imap)\<`G`, readonly `A`[]\>

Groups elements of an array by a key derived from each element.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### G

`G` _extends_ `Primitive`

The type of the group key (must be a primitive type).

###### Parameters

###### list

readonly `A`[]

The input array.

###### grouper

(`value`, `index`) => `G`

A function that maps an element and its index to a group key.

###### Returns

[`IMap`](../collections/imap.md#imap)\<`G`, readonly `A`[]\>

An IMap where keys are group keys and values are arrays of elements belonging to that group.

##### head()

> **head**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `H`; \<`A`\>(`list`): `A`; \<`A`\>(`list`): `undefined` \| `A`; \}

###### Call Signature

> (`list`): `undefined`

Returns the first element of an array.

###### Parameters

###### list

readonly \[\]

The input array.

###### Returns

`undefined`

The first element of the array, or `undefined` if the array is empty.

###### Call Signature

> \<`H`, `L`\>(`list`): `H`

Returns the first element of a non-empty array.

###### Type Parameters

###### H

`H`

The type of the head element.

###### L

`L` _extends_ readonly `unknown`[]

The type of the rest of the elements.

###### Parameters

###### list

readonly \[`H`, `L`\]

The input non-empty array.

###### Returns

`H`

The first element of the array.

###### Call Signature

> \<`A`\>(`list`): `A`

Returns the first element of a non-empty array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### Returns

`A`

The first element of the array.

###### Call Signature

> \<`A`\>(`list`): `undefined` \| `A`

Returns the first element of an array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### Returns

`undefined` \| `A`

The first element of the array, or `undefined` if the array is empty.

##### indexIsInRange()

> **indexIsInRange**: \<`T`\>(`list`, `index`) => `boolean`

Checks if an index is within the valid range of an array.

###### Type Parameters

###### T

`T`

The type of elements in the array.

###### Parameters

###### list

readonly `T`[]

The input array.

###### index

`number`

The index to check.

###### Returns

`boolean`

`true` if the index is within the array bounds, `false` otherwise.

##### inserted()

> **inserted**: \<`A`\>(`list`, `index`, `newValue`) => readonly `A`[]

Returns a new array with a new value inserted at the specified index.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### index

`number`

The index at which to insert the new value.

###### newValue

`A`

The value to insert.

###### Returns

readonly `A`[]

A new array with the value inserted.

##### isArrayOfLength1()

> **isArrayOfLength1**: \<`A`\>(`array`) => `array is readonly [A]`

Checks if an array has a length of 1.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A]`

`true` if the array has a length of 1, `false` otherwise.

##### isArrayOfLength1OrMore()

> **isArrayOfLength1OrMore**: \<`A`\>(`array`) => `array is readonly [A, A]`

Checks if an array has a length of 1 or more.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A]`

`true` if the array has a length of 1 or more, `false` otherwise.

##### isArrayOfLength2()

> **isArrayOfLength2**: \<`A`\>(`array`) => `array is readonly [A, A]`

Checks if an array has a length of 2.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A]`

`true` if the array has a length of 2, `false` otherwise.

##### isArrayOfLength2OrMore()

> **isArrayOfLength2OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A]`

Checks if an array has a length of 2 or more.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A]`

`true` if the array has a length of 2 or more, `false` otherwise.

##### isArrayOfLength3()

> **isArrayOfLength3**: \<`A`\>(`array`) => `array is readonly [A, A, A]`

Checks if an array has a length of 3.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A]`

`true` if the array has a length of 3, `false` otherwise.

##### isArrayOfLength3OrMore()

> **isArrayOfLength3OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A]`

Checks if an array has a length of 3 or more.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A, A]`

`true` if the array has a length of 3 or more, `false` otherwise.

##### isArrayOfLength4()

> **isArrayOfLength4**: \<`A`\>(`array`) => `array is readonly [A, A, A, A]`

Checks if an array has a length of 4.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A, A]`

`true` if the array has a length of 4, `false` otherwise.

##### isArrayOfLength4OrMore()

> **isArrayOfLength4OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A]`

Checks if an array has a length of 4 or more.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A, A, A]`

`true` if the array has a length of 4 or more, `false` otherwise.

##### isArrayOfLength5()

> **isArrayOfLength5**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A]`

Checks if an array has a length of 5.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A, A, A]`

`true` if the array has a length of 5, `false` otherwise.

##### isArrayOfLength5OrMore()

> **isArrayOfLength5OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A, A]`

Checks if an array has a length of 5 or more.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A, A, A, A]`

`true` if the array has a length of 5 or more, `false` otherwise.

##### isArrayOfLength6()

> **isArrayOfLength6**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A, A]`

Checks if an array has a length of 6.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A, A, A, A]`

`true` if the array has a length of 6, `false` otherwise.

##### isArrayOfLength6OrMore()

> **isArrayOfLength6OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A, A, A]`

Checks if an array has a length of 6 or more.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### array

readonly `A`[]

The array to check.

###### Returns

`array is readonly [A, A, A, A, A, A, A]`

`true` if the array has a length of 6 or more, `false` otherwise.

##### isEmpty()

> **isEmpty**: \<`A`\>(`list`) => `list is readonly []`

Checks if an array is empty.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The array to check.

###### Returns

`list is readonly []`

`true` if the array is empty, `false` otherwise.

##### isNonEmpty()

> **isNonEmpty**: \<`A`\>(`list`) => `list is readonly [A, A]`

Checks if an array is non-empty.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The array to check.

###### Returns

`list is readonly [A, A]`

`true` if the array is non-empty, `false` otherwise.

##### isSubset()

> **isSubset**: \<`A`, `B`\>(`list1`, `list2`) => `boolean`

Checks if the first array is a subset of the second array.
Elements must be primitive types.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the first array (subset candidate).

###### B

`B` _extends_ `Primitive` = `A`

The type of elements in the second array (superset candidate).

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

##### isSuperset()

> **isSuperset**: \<`A`, `B`\>(`list1`, `list2`) => `boolean`

Checks if the first array is a superset of the second array.
Elements must be primitive types.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the first array (superset candidate).

###### B

`B` _extends_ `Primitive` = `A`

The type of elements in the second array (subset candidate).

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

##### last()

> **last**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `L`; \<`A`\>(`list`): `A`; \<`A`\>(`list`): `undefined` \| `A`; \}

###### Call Signature

> (`list`): `undefined`

Returns the last element of an array.

###### Parameters

###### list

readonly \[\]

The input array.

###### Returns

`undefined`

The last element of the array, or `undefined` if the array is empty.

###### Call Signature

> \<`H`, `L`\>(`list`): `L`

Returns the last element of a non-empty array.

###### Type Parameters

###### H

`H` _extends_ readonly `unknown`[]

The type of the initial elements.

###### L

`L`

The type of the last element.

###### Parameters

###### list

readonly \[`H`, `L`\]

The input non-empty array.

###### Returns

`L`

The last element of the array.

###### Call Signature

> \<`A`\>(`list`): `A`

Returns the last element of a non-empty array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### Returns

`A`

The last element of the array.

###### Call Signature

> \<`A`\>(`list`): `undefined` \| `A`

Returns the last element of an array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### Returns

`undefined` \| `A`

The last element of the array, or `undefined` if the array is empty.

##### max()

> **max**: \{\<`N`\>(`list`, `comparator?`): `N`; \<`N`\>(`list`, `comparator?`): `undefined` \| `N`; \<`A`\>(`list`, `comparator`): `A`; \<`A`\>(`list`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `N`

Finds the maximum value in a non-empty array of numbers.

###### Type Parameters

###### N

`N` _extends_ `number`

The type of numbers in the array.

###### Parameters

###### list

readonly \[`N`, `N`\]

The input non-empty array of numbers.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function.

###### Returns

`N`

The maximum value in the array.

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `undefined` \| `N`

Finds the maximum value in an array of numbers.

###### Type Parameters

###### N

`N` _extends_ `number`

The type of numbers in the array.

###### Parameters

###### list

readonly `N`[]

The input array of numbers.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function.

###### Returns

`undefined` \| `N`

The maximum value in the array, or `undefined` if the array is empty.

###### Call Signature

> \<`A`\>(`list`, `comparator`): `A`

Finds the maximum value in a non-empty array using a custom comparator.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### comparator

(`x`, `y`) => `number`

A custom comparator function.

###### Returns

`A`

The maximum value in the array.

###### Call Signature

> \<`A`\>(`list`, `comparator`): `undefined` \| `A`

Finds the maximum value in an array using a custom comparator.

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

A custom comparator function.

###### Returns

`undefined` \| `A`

The maximum value in the array, or `undefined` if the array is empty.

##### maxBy()

> **maxBy**: \{\<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`; \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`

Finds the element with the maximum value according to a mapped numeric value.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function for the mapped numbers.

###### Returns

`A`

The element with the maximum mapped value.

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`

Finds the element with the maximum value according to a mapped numeric value.

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

A function that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function for the mapped numbers.

###### Returns

`undefined` \| `A`

The element with the maximum mapped value, or `undefined` if the array is empty.

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`

Finds the element with the maximum value according to a mapped value and a custom comparator.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### B

`B`

The type of the value to compare by.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### comparatorValueMapper

(`value`) => `B`

A function that maps an element to a value of type B for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function for values of type B.

###### Returns

`A`

The element with the maximum mapped value.

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`

Finds the element with the maximum value according to a mapped value and a custom comparator.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### B

`B`

The type of the value to compare by.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `B`

A function that maps an element to a value of type B for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function for values of type B.

###### Returns

`undefined` \| `A`

The element with the maximum mapped value, or `undefined` if the array is empty.

##### min()

> **min**: \{\<`N`\>(`list`, `comparator?`): `N`; \<`N`\>(`list`, `comparator?`): `undefined` \| `N`; \<`A`\>(`list`, `comparator`): `A`; \<`A`\>(`list`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `N`

Finds the minimum value in a non-empty array of numbers.

###### Type Parameters

###### N

`N` _extends_ `number`

The type of numbers in the array.

###### Parameters

###### list

readonly \[`N`, `N`\]

The input non-empty array of numbers.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function.

###### Returns

`N`

The minimum value in the array.

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `undefined` \| `N`

Finds the minimum value in an array of numbers.

###### Type Parameters

###### N

`N` _extends_ `number`

The type of numbers in the array.

###### Parameters

###### list

readonly `N`[]

The input array of numbers.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function.

###### Returns

`undefined` \| `N`

The minimum value in the array, or `undefined` if the array is empty.

###### Call Signature

> \<`A`\>(`list`, `comparator`): `A`

Finds the minimum value in a non-empty array using a custom comparator.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### comparator

(`x`, `y`) => `number`

A custom comparator function.

###### Returns

`A`

The minimum value in the array.

###### Call Signature

> \<`A`\>(`list`, `comparator`): `undefined` \| `A`

Finds the minimum value in an array using a custom comparator.

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

A custom comparator function.

###### Returns

`undefined` \| `A`

The minimum value in the array, or `undefined` if the array is empty.

##### minBy()

> **minBy**: \{\<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`; \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`

Finds the element with the minimum value according to a mapped numeric value.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function for the mapped numbers.

###### Returns

`A`

The element with the minimum mapped value.

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`

Finds the element with the minimum value according to a mapped numeric value.

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

A function that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function for the mapped numbers.

###### Returns

`undefined` \| `A`

The element with the minimum mapped value, or `undefined` if the array is empty.

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`

Finds the element with the minimum value according to a mapped value and a custom comparator.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### B

`B`

The type of the value to compare by.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### comparatorValueMapper

(`value`) => `B`

A function that maps an element to a value of type B for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function for values of type B.

###### Returns

`A`

The element with the minimum mapped value.

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`

Finds the element with the minimum value according to a mapped value and a custom comparator.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### B

`B`

The type of the value to compare by.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `B`

A function that maps an element to a value of type B for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function for values of type B.

###### Returns

`undefined` \| `A`

The element with the minimum mapped value, or `undefined` if the array is empty.

##### newArray()

> **newArray**: \{\<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>; \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]; \<`V`\>(`len`, `init`): readonly `V`[]; \}

###### Call Signature

> \<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>

Creates a new array of the specified length, filled with the initial value.

###### Type Parameters

###### V

`V`

The type of the initial value.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the length, constrained to SmallUint.

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

###### Call Signature

> \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]

Creates a new non-empty array of the specified length, filled with the initial value.

###### Type Parameters

###### V

`V`

The type of the initial value.

###### Parameters

###### len

`PositiveInt`

The length of the array, must be a PositiveInt.

###### init

`V`

The initial value.

###### Returns

readonly \[`V`, `V`\]

A new non-empty array.

###### Call Signature

> \<`V`\>(`len`, `init`): readonly `V`[]

Creates a new array of the specified length, filled with the initial value.

###### Type Parameters

###### V

`V`

The type of the initial value.

###### Parameters

###### len

`number`

The length of the array.

###### init

`V`

The initial value.

###### Returns

readonly `V`[]

A new array.

##### partition()

> **partition**: \<`N`, `A`\>(`list`, `n`) => readonly `MakeTupleImpl`\<`A`, `` `${N}` ``, \[\]\>[]

Partitions an array into sub-arrays of a specified size.

###### Type Parameters

###### N

`N` _extends_ `number`

The size of each partition (must be a number type).

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### n

`N`

The size of each partition.

###### Returns

readonly `MakeTupleImpl`\<`A`, `` `${N}` ``, \[\]\>[]

An array of arrays, where each inner array has length N.

##### pop()

> **pop**: \<`T`\>(`list`) => `ButLast`\<`T`\>

Returns all elements of an array except the last one.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### Parameters

###### list

`T`

The input array.

###### Returns

`ButLast`\<`T`\>

A new array containing all elements except the last.

##### pushed()

> **pushed**: \<`T`, `V`\>(`list`, `value`) => readonly \[`T`, `V`\]

Returns a new array with a value added to the end.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the input array.

###### V

`V` = `T`

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

A new array with the value added to the end.

##### range()

> **range**: \{\<`S`, `E`\>(`start`, `end`, `step?`): `RangeList`\<`S`, `E`\>; (`start`, `end`, `step?`): readonly `number`[]; \}

###### Call Signature

> \<`S`, `E`\>(`start`, `end`, `step?`): `RangeList`\<`S`, `E`\>

Creates an array of numbers within a specified range.

###### Type Parameters

###### S

`S` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the start value, constrained to SmallUint.

###### E

`E` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the end value, constrained to SmallUint.

###### Parameters

###### start

`S`

The start of the range (inclusive).

###### end

`E`

The end of the range (exclusive).

###### step?

`1`

The step value (default is 1).

###### Returns

`RangeList`\<`S`, `E`\>

An array of numbers in the specified range.

###### Call Signature

> (`start`, `end`, `step?`): readonly `number`[]

Creates an array of numbers within a specified range.

###### Parameters

###### start

`number`

The start of the range (inclusive).

###### end

`number`

The end of the range (exclusive).

###### step?

`number`

The step value.

###### Returns

readonly `number`[]

An array of numbers in the specified range.

##### reduce()

> **reduce**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

Applies a function against an accumulator and each element in the array (from left to right) to reduce it to a single value.

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

A function to execute on each element in the array.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

##### reduceRight()

> **reduceRight**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

Applies a function against an accumulator and each element in the array (from right to left) to reduce it to a single value.

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

A function to execute on each element in the array.

###### initialValue

`S`

The initial value of the accumulator.

###### Returns

`S`

The single value that results from the reduction.

##### removed()

> **removed**: \<`A`\>(`list`, `index`) => readonly `A`[]

Returns a new array with the element at the specified index removed.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### index

`number`

The index of the element to remove.

###### Returns

readonly `A`[]

A new array with the element removed.

##### rest()

> **rest**: \<`T`\>(`list`) => `Tail`\<`T`\>

Returns all elements of an array except the first one.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### Parameters

###### list

`T`

The input array.

###### Returns

`Tail`\<`T`\>

A new array containing all elements except the first.

##### scan()

> **scan**: \<`A`, `B`\>(`list`, `reducer`, `init`) => readonly \[`B`, `B`\]

Returns an array of successively reduced values from an array.
The first element of the result is the initial value.

###### Type Parameters

###### A

`A`

The type of elements in the input array.

###### B

`B`

The type of the accumulated values.

###### Parameters

###### list

The input array.

readonly \[`A`, `A`\] | readonly `A`[]

###### reducer

`Reducer`\<`B`, `A`\>

A function that reduces the current value and the accumulated value to a new accumulated value.

###### init

`B`

The initial accumulated value.

###### Returns

readonly \[`B`, `B`\]

A non-empty array of accumulated values.

##### seq()

> **seq**: \{\<`N`\>(`len`): `SeqImpl`\<`MakeTupleImpl`\<`unknown`, `` `${N}` ``, \[\]\>\>; (`len`): readonly \[`number`, `number`\]; (`len`): readonly `number`[]; \}

###### Call Signature

> \<`N`\>(`len`): `SeqImpl`\<`MakeTupleImpl`\<`unknown`, `` `${N}` ``, \[\]\>\>

Creates a sequence of numbers from 0 to len-1.

###### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the length, constrained to SmallUint.

###### Parameters

###### len

`N`

The length of the sequence.

###### Returns

`SeqImpl`\<`MakeTupleImpl`\<`unknown`, `` `${N}` ``, \[\]\>\>

A sequence of numbers.

###### Call Signature

> (`len`): readonly \[`number`, `number`\]

Creates a non-empty sequence of numbers from 0 to len-1.

###### Parameters

###### len

`PositiveInt`

The length of the sequence, must be a PositiveInt.

###### Returns

readonly \[`number`, `number`\]

A non-empty sequence of numbers.

###### Call Signature

> (`len`): readonly `number`[]

Creates a sequence of numbers from 0 to len-1.

###### Parameters

###### len

`number`

The length of the sequence.

###### Returns

readonly `number`[]

A sequence of numbers.

##### set()

> **set**: \<`A`, `U`\>(`list`, `index`, `newValue`) => readonly (`A` \| `U`)[]

Returns a new array with the element at the specified index replaced by a new value.

###### Type Parameters

###### A

`A`

The type of elements in the original array.

###### U

`U`

The type of the new value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### index

`number`

The index of the element to replace.

###### newValue

`U`

The new value.

###### Returns

readonly (`A` \| `U`)[]

A new array with the element at the specified index replaced.

##### setDifference()

> **setDifference**: \<`A`\>(`list1`, `list2`) => readonly `A`[]

Returns the set difference of two arrays (elements in the first array but not in the second).
Elements must be primitive types.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the arrays.

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

##### setIntersection()

> **setIntersection**: \<`A`, `B`\>(`list1`, `list2`) => readonly `A` & `B`[]

Returns the intersection of two arrays of primitive types.

###### Type Parameters

###### A

`A` _extends_ `Primitive`

The type of elements in the first array.

###### B

`B` _extends_ `Primitive` = `A`

The type of elements in the second array.

###### Parameters

###### list1

readonly `A`[]

The first array.

###### list2

readonly `B`[]

The second array.

###### Returns

readonly `A` & `B`[]

A new array containing elements present in both input arrays.

##### shift()

> **shift**: \<`T`\>(`list`) => `Tail`\<`T`\>

Returns all elements of an array except the first one.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### Parameters

###### list

`T`

The input array.

###### Returns

`Tail`\<`T`\>

A new array containing all elements except the first.

##### skip()

> **skip**: \{\<`T`, `N`\>(`list`, `num`): `Skip`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `Skip`\<`N`, `T`\>

Skips the first N elements of an array.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to SmallUint.

###### Parameters

###### list

`T`

The input array.

###### num

`N`

The number of elements to skip.

###### Returns

`Skip`\<`N`, `T`\>

A new array containing the elements after skipping the first N.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

Skips the first N elements of a non-empty array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### num

`PositiveInt`

The number of elements to skip, must be a PositiveInt.

###### Returns

readonly \[`A`, `A`\]

A new non-empty array containing the elements after skipping the first N.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

Skips the first N elements of an array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### num

`number`

The number of elements to skip.

###### Returns

readonly `A`[]

A new array containing the elements after skipping the first N.

##### skipLast()

> **skipLast**: \{\<`T`, `N`\>(`list`, `num`): `SkipLast`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `SkipLast`\<`N`, `T`\>

Skips the last N elements of an array.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to skip, constrained to SmallUint.

###### Parameters

###### list

`T`

The input array.

###### num

`N`

The number of elements to skip from the end.

###### Returns

`SkipLast`\<`N`, `T`\>

A new array containing the elements after skipping the last N.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

Skips the last N elements of a non-empty array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### num

`PositiveInt`

The number of elements to skip from the end, must be a PositiveInt.

###### Returns

readonly \[`A`, `A`\]

A new non-empty array containing the elements after skipping the last N.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

Skips the last N elements of an array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### num

`number`

The number of elements to skip from the end.

###### Returns

readonly `A`[]

A new array containing the elements after skipping the last N.

##### sliceClamped()

> **sliceClamped**: \<`T`\>(`list`, `start`, `end`) => readonly `T`[]

Slices an array with clamped start and end indices.
Ensures that start and end indices are within the bounds of the array.

###### Type Parameters

###### T

`T`

The type of elements in the array.

###### Parameters

###### list

readonly `T`[]

The array to slice.

###### start

`number`

The start index for the slice.

###### end

`number`

The end index for the slice.

###### Returns

readonly `T`[]

A new array containing the sliced elements.

##### sortedBy()

> **sortedBy**: \{\<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): readonly `A`[]; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): readonly `A`[]; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): readonly `A`[]

Sorts an array by a value derived from its elements.

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

A function that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function for the mapped numbers.

###### Returns

readonly `A`[]

A new array sorted by the mapped values.

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): readonly `A`[]

Sorts an array by a value derived from its elements.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### B

`B`

The type of the value to compare by.

###### Parameters

###### list

readonly `A`[]

The input array.

###### comparatorValueMapper

(`value`) => `B`

A function that maps an element to a value of type B for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function for values of type B.

###### Returns

readonly `A`[]

A new array sorted by the mapped values.

##### sortedNumSetDifference()

> **sortedNumSetDifference**: \<`T`\>(`sortedList1`, `sortedList2`) => readonly `T`[]

Returns the set difference of two sorted arrays of numbers.
This operation is more efficient for sorted arrays.

###### Type Parameters

###### T

`T` _extends_ `number`

The type of numbers in the arrays.

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

##### sum()

> **sum**: (`list`) => `number`

Calculates the sum of numbers in an array.

###### Parameters

###### list

readonly `number`[]

The input array of numbers.

###### Returns

`number`

The sum of the numbers.

##### tail()

> **tail**: \<`T`\>(`list`) => `Tail`\<`T`\>

Returns all elements of an array except the first one.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### Parameters

###### list

`T`

The input array.

###### Returns

`Tail`\<`T`\>

A new array containing all elements except the first.

##### take()

> **take**: \{\<`T`, `N`\>(`list`, `num`): `Take`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `Take`\<`N`, `T`\>

Takes the first N elements from an array.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to take, constrained to SmallUint.

###### Parameters

###### list

`T`

The input array.

###### num

`N`

The number of elements to take.

###### Returns

`Take`\<`N`, `T`\>

A new array containing the first N elements.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

Takes the first N elements from a non-empty array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### num

`PositiveInt`

The number of elements to take, must be a PositiveInt.

###### Returns

readonly \[`A`, `A`\]

A new non-empty array containing the first N elements.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

Takes the first N elements from an array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### num

`number`

The number of elements to take.

###### Returns

readonly `A`[]

A new array containing the first N elements.

##### takeLast()

> **takeLast**: \{\<`T`, `N`\>(`list`, `num`): `TakeLast`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `TakeLast`\<`N`, `T`\>

Takes the last N elements from an array.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the array.

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The number of elements to take, constrained to SmallUint.

###### Parameters

###### list

`T`

The input array.

###### num

`N`

The number of elements to take.

###### Returns

`TakeLast`\<`N`, `T`\>

A new array containing the last N elements.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

Takes the last N elements from a non-empty array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input non-empty array.

###### num

`PositiveInt`

The number of elements to take, must be a PositiveInt.

###### Returns

readonly \[`A`, `A`\]

A new non-empty array containing the last N elements.

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

Takes the last N elements from an array.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### num

`number`

The number of elements to take.

###### Returns

readonly `A`[]

A new array containing the last N elements.

##### uniq()

> **uniq**: \{\<`A`\>(`list`): readonly \[`A`, `A`\]; \<`A`\>(`list`): readonly `A`[]; \}

###### Call Signature

> \<`A`\>(`list`): readonly \[`A`, `A`\]

Creates a new array with unique elements from the input list.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### Returns

readonly \[`A`, `A`\]

A new array with unique elements from the input list.

###### Call Signature

> \<`A`\>(`list`): readonly `A`[]

Creates a new array with unique elements from the input list.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### Parameters

###### list

readonly `A`[]

The input array.

###### Returns

readonly `A`[]

A new array with unique elements from the input list.

##### uniqBy()

> **uniqBy**: \{\<`A`, `B`\>(`list`, `mapFn`): readonly \[`A`, `A`\]; \<`A`, `B`\>(`list`, `mapFn`): readonly `A`[]; \}

###### Call Signature

> \<`A`, `B`\>(`list`, `mapFn`): readonly \[`A`, `A`\]

Creates a new array with unique elements from the input list, based on the values returned by `mapFn`.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### B

`B`

The type of the mapped value.

###### Parameters

###### list

readonly \[`A`, `A`\]

The input array.

###### mapFn

(`value`) => `B`

A function to map elements to values for uniqueness comparison.

###### Returns

readonly \[`A`, `A`\]

A new array with unique elements.

###### Call Signature

> \<`A`, `B`\>(`list`, `mapFn`): readonly `A`[]

Creates a new array with unique elements from the input list, based on the values returned by `mapFn`.

###### Type Parameters

###### A

`A`

The type of elements in the array.

###### B

`B`

The type of the mapped value.

###### Parameters

###### list

readonly `A`[]

The input array.

###### mapFn

(`value`) => `B`

A function to map elements to values for uniqueness comparison.

###### Returns

readonly `A`[]

A new array with unique elements.

##### unshifted()

> **unshifted**: \<`T`, `V`\>(`list`, `value`) => readonly \[`V`, `T`\]

Returns a new array with a value added to the beginning.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the input array.

###### V

`V` = `T`

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

A new array with the value added to the beginning.

##### update()

> **update**: \<`A`, `U`\>(`list`, `index`, `updater`) => readonly (`A` \| `U`)[]

Returns a new array with the element at the specified index updated by a function.

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

`number`

The index of the element to update.

###### updater

(`prev`) => `U`

A function that takes the previous value and returns the updated value.

###### Returns

readonly (`A` \| `U`)[]

A new array with the element at the specified index updated.

##### zeros()

> **zeros**: \{\<`N`\>(`len`): `MakeTupleImpl`\<`0`, `` `${N}` ``\>; (`len`): readonly \[`0`, `0`\]; (`len`): readonly `0`[]; \}

###### Call Signature

> \<`N`\>(`len`): `MakeTupleImpl`\<`0`, `` `${N}` ``\>

Creates an array of zeros with the specified length.

###### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

The type of the length, constrained to SmallUint.

###### Parameters

###### len

`N`

The length of the array.

###### Returns

`MakeTupleImpl`\<`0`, `` `${N}` ``\>

An array of zeros with the specified length.

###### Call Signature

> (`len`): readonly \[`0`, `0`\]

Creates a non-empty array of zeros with the specified length.

###### Parameters

###### len

`PositiveInt`

The length of the array, must be a PositiveInt.

###### Returns

readonly \[`0`, `0`\]

A non-empty array of zeros with the specified length.

###### Call Signature

> (`len`): readonly `0`[]

Creates an array of zeros with the specified length.

###### Parameters

###### len

`number`

The length of the array.

###### Returns

readonly `0`[]

An array of zeros with the specified length.

##### zip()

> **zip**: \<`T1`, `T2`\>(`list1`, `list2`) => `Zip`\<`T1`, `T2`\>

Zips two arrays together, creating an array of pairs.
The resulting array will have the length of the shorter input array.

###### Type Parameters

###### T1

`T1` _extends_ readonly `unknown`[]

The type of the first array.

###### T2

`T2` _extends_ readonly `unknown`[]

The type of the second array.

###### Parameters

###### list1

`T1`

The first array.

###### list2

`T2`

The second array.

###### Returns

`Zip`\<`T1`, `T2`\>

A new array of pairs.
