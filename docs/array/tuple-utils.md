[**Documentation**](../README.md)

---

[Documentation](../README.md) / array/tuple-utils

# array/tuple-utils

## Variables

### Tpl

> `const` **Tpl**: `object`

Defined in: [array/tuple-utils.mts:121](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/tuple-utils.mts#L121)

#### Type declaration

##### findIndex()

> **findIndex**: \<`T`\>(`tpl`, `predicate`) => `-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### tpl

`T`

###### predicate

(`value`, `index`) => `boolean`

###### Returns

`-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

##### indexOf()

> **indexOf**: \<`T`\>(`tpl`, `searchElement`, `fromIndex?`) => `-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### tpl

`T`

###### searchElement

`T`\[`number`\]

###### fromIndex?

`MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

###### Returns

`-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

##### lastIndexOf()

> **lastIndexOf**: \<`T`\>(`tpl`, `searchElement`, `fromIndex?`) => `-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### tpl

`T`

###### searchElement

`T`\[`number`\]

###### fromIndex?

`MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

###### Returns

`-1` \| `MapNumberToArraySearchResult`\<`IndexOfTupleImpl`\<`T`, keyof `T`\>\>

##### length()

> **length**: \<`T`\>(`list`) => `Length`\<`T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### list

`T`

###### Returns

`Length`\<`T`\>

##### map()

> **map**: \<`T`, `B`\>(`tpl`, `mapFn`) => \{ readonly \[K in string \| number \| symbol\]: B \}

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### B

`B`

###### Parameters

###### tpl

`T`

###### mapFn

(`a`, `index`) => `B`

###### Returns

\{ readonly \[K in string \| number \| symbol\]: B \}

##### reversed()

> **reversed**: \<`T`\>(`tpl`) => `ReverseImpl`\<`T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### tpl

`T`

###### Returns

`ReverseImpl`\<`T`\>

##### set()

> **set**: \<`T`, `N`\>(`tpl`, `index`, `newValue`) => \{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### N

`N`

###### Parameters

###### tpl

`T`

###### index

`IndexOfTupleImpl`\<`MakeTupleImpl`\<`0`, `` `${Length<T>}` ``, \[\]\>\>

###### newValue

`N`

###### Returns

\{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}

##### sorted()

> **sorted**: \{\<`T`\>(`tpl`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \<`T`\>(`tpl`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \}

###### Call Signature

> \<`T`\>(`tpl`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

###### Type Parameters

###### T

`T` _extends_ readonly `number`[]

###### Parameters

###### tpl

`T`

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

###### Call Signature

> \<`T`\>(`tpl`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### tpl

`T`

###### comparator

(`x`, `y`) => `number`

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

##### sortedBy()

> **sortedBy**: \{\<`T`\>(`tpl`, `comparatorValueMapper`, `comparator?`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \<`T`, `B`\>(`tpl`, `comparatorValueMapper`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}; \}

###### Call Signature

> \<`T`\>(`tpl`, `comparatorValueMapper`, `comparator?`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### tpl

`T`

###### comparatorValueMapper

(`value`) => `number`

###### comparator?

(`x`, `y`) => `number`

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

###### Call Signature

> \<`T`, `B`\>(`tpl`, `comparatorValueMapper`, `comparator`): \{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### B

`B`

###### Parameters

###### tpl

`T`

###### comparatorValueMapper

(`value`) => `B`

###### comparator

(`x`, `y`) => `number`

###### Returns

\{ readonly \[K in string \| number \| symbol\]: T\[number\] \}

##### update()

> **update**: \<`T`, `N`\>(`tpl`, `index`, `updater`) => \{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### N

`N`

###### Parameters

###### tpl

`T`

###### index

`number` | IndexOfTupleImpl\<MakeTupleImpl\<0, \`$\{Length\<T\>\}\`, \[\]\>, keyof MakeTupleImpl\<0, \`$\{Length\<T\>\}\`, \[\]\>\> & (0 \| ... 38 more ... \| 39)

###### updater

(`prev`) => `N`

###### Returns

\{ readonly \[K in string \| number \| symbol\]: N \| T\[K\<K\>\] \}
