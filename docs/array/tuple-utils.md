[**Documentation**](../README.md)

---

[Documentation](../README.md) / array/tuple-utils

# array/tuple-utils

## Variables

### Tpl

> `const` **Tpl**: `object`

Defined in: [src/array/tuple-utils.mts:295](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/tuple-utils.mts#L295)

A collection of tuple utility functions.
Provides type-safe operations for working with tuples (fixed-length arrays).

#### Type declaration

##### findIndex()

> **findIndex**: \<`T`\>(`tpl`, `predicate`) => `-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

Finds the index of the first element in a tuple that satisfies the predicate.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### tpl

`T`

The input tuple.

###### predicate

(`value`, `index`) => `boolean`

A function to test each element for a condition.

###### Returns

`-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

The index of the first element that satisfies the predicate, or -1 if no such element is found.

###### Example

```typescript
const tpl = [1, 2, 3, 4] as const;
Tpl.findIndex(tpl, (x) => x > 2); // 2
Tpl.findIndex(tpl, (x) => x > 10); // -1
```

##### indexOf()

> **indexOf**: \<`T`\>(`tpl`, `searchElement`, `fromIndex?`) => `-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

Returns the first index at which a given element can be found in the tuple.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### tpl

`T`

The input tuple.

###### searchElement

`T`\[`number`\]

Element to locate in the tuple.

###### fromIndex?

`MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

The index to start the search at. If omitted, search starts from the beginning.

###### Returns

`-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

The first index of the element in the tuple; -1 if not found.

###### Example

```typescript
const tpl = ['a', 'b', 'c', 'b'] as const;
Tpl.indexOf(tpl, 'b'); // 1
Tpl.indexOf(tpl, 'b', 2); // 3
Tpl.indexOf(tpl, 'd'); // -1
```

##### lastIndexOf()

> **lastIndexOf**: \<`T`\>(`tpl`, `searchElement`, `fromIndex?`) => `-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

Returns the last index at which a given element can be found in the tuple.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### tpl

`T`

The input tuple.

###### searchElement

`T`\[`number`\]

Element to locate in the tuple.

###### fromIndex?

`MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

The index to start searching backwards from. If omitted, search starts from the end.

###### Returns

`-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

The last index of the element in the tuple; -1 if not found.

###### Example

```typescript
const tpl = ['a', 'b', 'c', 'b'] as const;
Tpl.lastIndexOf(tpl, 'b'); // 3
Tpl.lastIndexOf(tpl, 'b', 2); // 1
Tpl.lastIndexOf(tpl, 'd'); // -1
```

##### length()

> `readonly` **length**: \<`T`\>(`list`) => `Length`\<`T`\> = `size`

Returns the length of a tuple.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### list

`T`

The input tuple.

###### Returns

`Length`\<`T`\>

The length of the tuple.

###### Example

```typescript
const tpl = [1, 2, 3] as const;
Tpl.size(tpl); // 3
```

##### map()

> **map**: \<`T`, `B`\>(`tpl`, `mapFn`) => \{ readonly \[K in string \| number \| symbol\]: B \}

Creates a new tuple with the results of calling a provided function on every element in the calling tuple.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the input tuple.

###### B

`B`

The type of the elements in the new tuple.

###### Parameters

###### tpl

`T`

The input tuple.

###### mapFn

(`a`, `index`) => `B`

Function that produces an element of the new tuple.

###### Returns

\{ readonly \[K in string \| number \| symbol\]: B \}

A new tuple with each element being the result of the callback function.

###### Example

```typescript
const tpl = [1, 2, 3] as const;
Tpl.map(tpl, (x) => x * 2); // [2, 4, 6]
Tpl.map(tpl, (x, i) => `${i}:${x}`); // ['0:1', '1:2', '2:3']
```

##### set()

> **set**: \<`T`, `N`\>(`tpl`, `index`, `newValue`) => \{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}

Returns a new tuple with the element at the specified index replaced by a new value.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the input tuple.

###### N

`N`

The type of the new value.

###### Parameters

###### tpl

`T`

The input tuple.

###### index

`IndexOfTupleImpl`\<`MakeTupleImpl`\<`0`, `` `${Length<T>}` ``, \[\]\>\>

The index of the element to replace.

###### newValue

`N`

The new value.

###### Returns

\{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}

A new tuple with the element at the specified index replaced.

###### Example

```typescript
const tpl = ['a', 'b', 'c'] as const;
Tpl.set(tpl, 1, 'B'); // ['a', 'B', 'c']
```

##### size()

> **size**: \<`T`\>(`list`) => `Length`\<`T`\>

Returns the length of a tuple.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### list

`T`

The input tuple.

###### Returns

`Length`\<`T`\>

The length of the tuple.

###### Example

```typescript
const tpl = [1, 2, 3] as const;
Tpl.size(tpl); // 3
```

##### toReversed()

> **toReversed**: \<`T`\>(`tpl`) => `ReverseImpl`\<`T`\>

Reverses a tuple.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### tpl

`T`

The input tuple.

###### Returns

`ReverseImpl`\<`T`\>

A new tuple with elements in reverse order.

###### Example

```typescript
const tpl = [1, 2, 3] as const;
Tpl.toReversed(tpl); // [3, 2, 1]
```

##### toSorted()

> **toSorted**: \{\<`T`\>(`tpl`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \<`T`\>(`tpl`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \}

###### Call Signature

> \<`T`\>(`tpl`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

Sorts a tuple of numbers in ascending order.

###### Type Parameters

###### T

`T` _extends_ readonly `number`[]

The type of the tuple, constrained to readonly numbers.

###### Parameters

###### tpl

`T`

The input tuple of numbers.

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

A new tuple with elements sorted in ascending order.

###### Example

```typescript
const tpl = [3, 1, 4, 1, 5] as const;
Tpl.toSorted(tpl); // [1, 1, 3, 4, 5]
```

###### Call Signature

> \<`T`\>(`tpl`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

Sorts a tuple using a custom comparator function.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### tpl

`T`

The input tuple.

###### comparator

(`x`, `y`) => `number`

A function that defines the sort order.

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

A new tuple with elements sorted according to the comparator.

###### Example

```typescript
const tpl = ['apple', 'banana', 'cherry'] as const;
Tpl.toSorted(tpl, (a, b) => a.length - b.length); // ['apple', 'banana', 'cherry']
```

##### toSortedBy()

> **toSortedBy**: \{\<`T`\>(`tpl`, `comparatorValueMapper`, `comparator?`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \<`T`, `B`\>(`tpl`, `comparatorValueMapper`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \}

###### Call Signature

> \<`T`\>(`tpl`, `comparatorValueMapper`, `comparator?`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

Sorts a tuple by a value derived from its elements.
The derived values are numbers, and an optional number comparator can be provided.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### Parameters

###### tpl

`T`

The input tuple.

###### comparatorValueMapper

(`value`) => `number`

A function that maps an element to a number for comparison.

###### comparator?

(`x`, `y`) => `number`

An optional custom comparator function for the mapped numbers.

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

A new tuple sorted by the mapped values.

###### Example

```typescript
const tpl = [{ age: 30 }, { age: 20 }, { age: 25 }] as const;
Tpl.toSortedBy(tpl, (item) => item.age); // [{age: 20}, {age: 25}, {age: 30}]
```

###### Call Signature

> \<`T`, `B`\>(`tpl`, `comparatorValueMapper`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

Sorts a tuple by a value derived from its elements using a custom comparator.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the tuple.

###### B

`B`

The type of the derived value.

###### Parameters

###### tpl

`T`

The input tuple.

###### comparatorValueMapper

(`value`) => `B`

A function that maps an element to a value for comparison.

###### comparator

(`x`, `y`) => `number`

A custom comparator function for the mapped values.

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

A new tuple sorted by the mapped values.

###### Example

```typescript
const tpl = [{ name: 'Alice' }, { name: 'Bob' }, { name: 'Charlie' }] as const;
Tpl.toSortedBy(
    tpl,
    (item) => item.name,
    (a, b) => a.localeCompare(b),
);
// [{name: 'Alice'}, {name: 'Bob'}, {name: 'Charlie'}]
```

##### toUpdated()

> **toUpdated**: \<`T`, `N`\>(`tpl`, `index`, `updater`) => \{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}

Returns a new tuple with the element at the specified index updated by a function.

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

The type of the input tuple.

###### N

`N`

The type of the updated value.

###### Parameters

###### tpl

`T`

The input tuple.

###### index

The index of the element to update.

`ArgArrNonNegative` | IndexOfTupleImpl\<MakeTupleImpl\<0, \`$\{Length\<T\>\}\`, \[\]\>, keyof MakeTupleImpl\<0, \`$\{Length\<T\>\}\`, \[\]\>\> & (0 \| ... 38 more ... \| 39)

###### updater

(`prev`) => `N`

A function that takes the previous value and returns the updated value.

###### Returns

\{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}

A new tuple with the element at the specified index updated.

###### Example

```typescript
const tpl = [1, 2, 3] as const;
Tpl.toUpdated(tpl, 1, (x) => x * 10); // [1, 20, 3]
```
