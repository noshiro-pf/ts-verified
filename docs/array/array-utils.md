[**Documentation**](../README.md)

---

[Documentation](../README.md) / array/array-utils

# array/array-utils

## Variables

### Arr

> `const` **Arr**: `object`

Defined in: [array/array-utils.mts:630](https://github.com/noshiro-pf/ts-verified/blob/main/src/array/array-utils.mts#L630)

#### Type declaration

##### butLast()

> **butLast**: \<`T`\>(`list`) => `ButLast`\<`T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### list

`T`

###### Returns

`ButLast`\<`T`\>

##### chunk()

> **chunk**: \<`T`\>(`array`, `chunkSize`) => readonly readonly `T`[][]

###### Type Parameters

###### T

`T`

###### Parameters

###### array

readonly `T`[]

###### chunkSize

`number`

###### Returns

readonly readonly `T`[][]

##### concat()

> **concat**: \<`T1`, `T2`\>(`list1`, `list2`) => readonly \[`T1`, `T2`\]

###### Type Parameters

###### T1

`T1` _extends_ readonly `unknown`[]

###### T2

`T2` _extends_ readonly `unknown`[]

###### Parameters

###### list1

`T1`

###### list2

`T2`

###### Returns

readonly \[`T1`, `T2`\]

##### copy()

> **copy**: \<`T`\>(`list`) => `T`

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### list

`T`

###### Returns

`T`

##### count()

> **count**: \<`A`\>(`list`, `predicate`) => `number`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### predicate

(`value`, `index`) => `boolean`

###### Returns

`number`

##### countBy()

> **countBy**: \<`A`, `G`\>(`list`, `grouper`) => [`IMap`](../collections/imap.md#imap)\<`G`, `number`\>

###### Type Parameters

###### A

`A`

###### G

`G` _extends_ `Primitive`

###### Parameters

###### list

readonly `A`[]

###### grouper

(`value`, `index`) => `G`

###### Returns

[`IMap`](../collections/imap.md#imap)\<`G`, `number`\>

##### eq()

> **eq**: \<`T`\>(`list1`, `list2`) => `boolean`

###### Type Parameters

###### T

`T`

###### Parameters

###### list1

readonly `T`[]

###### list2

readonly `T`[]

###### Returns

`boolean`

##### filterNot()

> **filterNot**: \<`A`\>(`list`, `predicate`) => readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### predicate

(`a`, `index`) => `boolean`

###### Returns

readonly `A`[]

##### first()

> **first**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `H`; \<`A`\>(`list`): `A`; \<`A`\>(`list`): `undefined` \| `A`; \}

###### Call Signature

> (`list`): `undefined`

###### Parameters

###### list

readonly \[\]

###### Returns

`undefined`

###### Call Signature

> \<`H`, `L`\>(`list`): `H`

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

###### Call Signature

> \<`A`\>(`list`): `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### Returns

`A`

###### Call Signature

> \<`A`\>(`list`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### Returns

`undefined` \| `A`

##### flatMap()

> **flatMap**: \<`A`, `M`\>(`list`, `mapper`) => readonly `M`[]

###### Type Parameters

###### A

`A`

###### M

`M`

###### Parameters

###### list

readonly `A`[]

###### mapper

(`value`, `key`) => readonly `M`[]

###### Returns

readonly `M`[]

##### foldl()

> **foldl**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

###### Type Parameters

###### A

`A`

###### S

`S`

###### Parameters

###### list

readonly `A`[]

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

###### initialValue

`S`

###### Returns

`S`

##### foldr()

> **foldr**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

###### Type Parameters

###### A

`A`

###### S

`S`

###### Parameters

###### list

readonly `A`[]

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

###### initialValue

`S`

###### Returns

`S`

##### groupBy()

> **groupBy**: \<`A`, `G`\>(`list`, `grouper`) => [`IMap`](../collections/imap.md#imap)\<`G`, readonly `A`[]\>

###### Type Parameters

###### A

`A`

###### G

`G` _extends_ `Primitive`

###### Parameters

###### list

readonly `A`[]

###### grouper

(`value`, `index`) => `G`

###### Returns

[`IMap`](../collections/imap.md#imap)\<`G`, readonly `A`[]\>

##### head()

> **head**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `H`; \<`A`\>(`list`): `A`; \<`A`\>(`list`): `undefined` \| `A`; \}

###### Call Signature

> (`list`): `undefined`

###### Parameters

###### list

readonly \[\]

###### Returns

`undefined`

###### Call Signature

> \<`H`, `L`\>(`list`): `H`

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

###### Call Signature

> \<`A`\>(`list`): `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### Returns

`A`

###### Call Signature

> \<`A`\>(`list`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### Returns

`undefined` \| `A`

##### indexIsInRange()

> **indexIsInRange**: \<`T`\>(`list`, `index`) => `boolean`

###### Type Parameters

###### T

`T`

###### Parameters

###### list

readonly `T`[]

###### index

`number`

###### Returns

`boolean`

##### inserted()

> **inserted**: \<`A`\>(`list`, `index`, `newValue`) => readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### index

`number`

###### newValue

`A`

###### Returns

readonly `A`[]

##### isArrayOfLength1()

> **isArrayOfLength1**: \<`A`\>(`array`) => `array is readonly [A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A]`

##### isArrayOfLength1OrMore()

> **isArrayOfLength1OrMore**: \<`A`\>(`array`) => `array is readonly [A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A]`

##### isArrayOfLength2()

> **isArrayOfLength2**: \<`A`\>(`array`) => `array is readonly [A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A]`

##### isArrayOfLength2OrMore()

> **isArrayOfLength2OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A]`

##### isArrayOfLength3()

> **isArrayOfLength3**: \<`A`\>(`array`) => `array is readonly [A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A]`

##### isArrayOfLength3OrMore()

> **isArrayOfLength3OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A, A]`

##### isArrayOfLength4()

> **isArrayOfLength4**: \<`A`\>(`array`) => `array is readonly [A, A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A, A]`

##### isArrayOfLength4OrMore()

> **isArrayOfLength4OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A, A, A]`

##### isArrayOfLength5()

> **isArrayOfLength5**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A, A, A]`

##### isArrayOfLength5OrMore()

> **isArrayOfLength5OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A, A, A, A]`

##### isArrayOfLength6()

> **isArrayOfLength6**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A, A, A, A]`

##### isArrayOfLength6OrMore()

> **isArrayOfLength6OrMore**: \<`A`\>(`array`) => `array is readonly [A, A, A, A, A, A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### array

readonly `A`[]

###### Returns

`array is readonly [A, A, A, A, A, A, A]`

##### isEmpty()

> **isEmpty**: \<`A`\>(`list`) => `list is readonly []`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### Returns

`list is readonly []`

##### isNonEmpty()

> **isNonEmpty**: \<`A`\>(`list`) => `list is readonly [A, A]`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### Returns

`list is readonly [A, A]`

##### isSubset()

> **isSubset**: \<`A`, `B`\>(`list1`, `list2`) => `boolean`

###### Type Parameters

###### A

`A` _extends_ `Primitive`

###### B

`B` _extends_ `Primitive` = `A`

###### Parameters

###### list1

readonly `A`[]

###### list2

readonly `B`[]

###### Returns

`boolean`

`list1` ⊂ `list2`

##### isSuperset()

> **isSuperset**: \<`A`, `B`\>(`list1`, `list2`) => `boolean`

###### Type Parameters

###### A

`A` _extends_ `Primitive`

###### B

`B` _extends_ `Primitive` = `A`

###### Parameters

###### list1

readonly `A`[]

###### list2

readonly `B`[]

###### Returns

`boolean`

`list1` ⊃ `list2`

##### last()

> **last**: \{(`list`): `undefined`; \<`H`, `L`\>(`list`): `L`; \<`A`\>(`list`): `A`; \<`A`\>(`list`): `undefined` \| `A`; \}

###### Call Signature

> (`list`): `undefined`

###### Parameters

###### list

readonly \[\]

###### Returns

`undefined`

###### Call Signature

> \<`H`, `L`\>(`list`): `L`

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

###### Call Signature

> \<`A`\>(`list`): `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### Returns

`A`

###### Call Signature

> \<`A`\>(`list`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### Returns

`undefined` \| `A`

##### max()

> **max**: \{\<`N`\>(`list`, `comparator?`): `N`; \<`N`\>(`list`, `comparator?`): `undefined` \| `N`; \<`A`\>(`list`, `comparator`): `A`; \<`A`\>(`list`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `N`

###### Type Parameters

###### N

`N` _extends_ `number`

###### Parameters

###### list

readonly \[`N`, `N`\]

###### comparator?

(`x`, `y`) => `number`

###### Returns

`N`

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `undefined` \| `N`

###### Type Parameters

###### N

`N` _extends_ `number`

###### Parameters

###### list

readonly `N`[]

###### comparator?

(`x`, `y`) => `number`

###### Returns

`undefined` \| `N`

###### Call Signature

> \<`A`\>(`list`, `comparator`): `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### comparator

(`x`, `y`) => `number`

###### Returns

`A`

###### Call Signature

> \<`A`\>(`list`, `comparator`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### comparator

(`x`, `y`) => `number`

###### Returns

`undefined` \| `A`

##### maxBy()

> **maxBy**: \{\<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`; \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### comparatorValueMapper

(`value`) => `number`

###### comparator?

(`x`, `y`) => `number`

###### Returns

`A`

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### comparatorValueMapper

(`value`) => `number`

###### comparator?

(`x`, `y`) => `number`

###### Returns

`undefined` \| `A`

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### comparatorValueMapper

(`value`) => `B`

###### comparator

(`x`, `y`) => `number`

###### Returns

`A`

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly `A`[]

###### comparatorValueMapper

(`value`) => `B`

###### comparator

(`x`, `y`) => `number`

###### Returns

`undefined` \| `A`

##### min()

> **min**: \{\<`N`\>(`list`, `comparator?`): `N`; \<`N`\>(`list`, `comparator?`): `undefined` \| `N`; \<`A`\>(`list`, `comparator`): `A`; \<`A`\>(`list`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `N`

###### Type Parameters

###### N

`N` _extends_ `number`

###### Parameters

###### list

readonly \[`N`, `N`\]

###### comparator?

(`x`, `y`) => `number`

###### Returns

`N`

###### Call Signature

> \<`N`\>(`list`, `comparator?`): `undefined` \| `N`

###### Type Parameters

###### N

`N` _extends_ `number`

###### Parameters

###### list

readonly `N`[]

###### comparator?

(`x`, `y`) => `number`

###### Returns

`undefined` \| `N`

###### Call Signature

> \<`A`\>(`list`, `comparator`): `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### comparator

(`x`, `y`) => `number`

###### Returns

`A`

###### Call Signature

> \<`A`\>(`list`, `comparator`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### comparator

(`x`, `y`) => `number`

###### Returns

`undefined` \| `A`

##### minBy()

> **minBy**: \{\<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`; \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### comparatorValueMapper

(`value`) => `number`

###### comparator?

(`x`, `y`) => `number`

###### Returns

`A`

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### comparatorValueMapper

(`value`) => `number`

###### comparator?

(`x`, `y`) => `number`

###### Returns

`undefined` \| `A`

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `A`

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### comparatorValueMapper

(`value`) => `B`

###### comparator

(`x`, `y`) => `number`

###### Returns

`A`

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): `undefined` \| `A`

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly `A`[]

###### comparatorValueMapper

(`value`) => `B`

###### comparator

(`x`, `y`) => `number`

###### Returns

`undefined` \| `A`

##### newArray()

> **newArray**: \{\<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>; \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]; \<`V`\>(`len`, `init`): readonly `V`[]; \}

###### Call Signature

> \<`V`, `N`\>(`len`, `init`): `MakeTupleImpl`\<`V`, `` `${N}` ``\>

###### Type Parameters

###### V

`V`

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### len

`N`

###### init

`V`

###### Returns

`MakeTupleImpl`\<`V`, `` `${N}` ``\>

###### Call Signature

> \<`V`\>(`len`, `init`): readonly \[`V`, `V`\]

###### Type Parameters

###### V

`V`

###### Parameters

###### len

`PositiveInt`

###### init

`V`

###### Returns

readonly \[`V`, `V`\]

###### Call Signature

> \<`V`\>(`len`, `init`): readonly `V`[]

###### Type Parameters

###### V

`V`

###### Parameters

###### len

`number`

###### init

`V`

###### Returns

readonly `V`[]

##### partition()

> **partition**: \<`N`, `A`\>(`list`, `n`) => readonly `MakeTupleImpl`\<`A`, `` `${N}` ``, \[\]\>[]

###### Type Parameters

###### N

`N` _extends_ `number`

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### n

`N`

###### Returns

readonly `MakeTupleImpl`\<`A`, `` `${N}` ``, \[\]\>[]

##### pop()

> **pop**: \<`T`\>(`list`) => `ButLast`\<`T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### list

`T`

###### Returns

`ButLast`\<`T`\>

##### pushed()

> **pushed**: \<`T`, `V`\>(`list`, `value`) => readonly \[`T`, `V`\]

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### V

`V` = `T`

###### Parameters

###### list

`T`

###### value

`V`

###### Returns

readonly \[`T`, `V`\]

##### range()

> **range**: \{\<`S`, `E`\>(`start`, `end`, `step?`): `RangeList`\<`S`, `E`\>; (`start`, `end`, `step?`): readonly `number`[]; (`start`, `end`, `step?`): readonly `number`[]; \}

###### Call Signature

> \<`S`, `E`\>(`start`, `end`, `step?`): `RangeList`\<`S`, `E`\>

###### Type Parameters

###### S

`S` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### E

`E` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### start

`S`

###### end

`E`

###### step?

`1`

###### Returns

`RangeList`\<`S`, `E`\>

###### Call Signature

> (`start`, `end`, `step?`): readonly `number`[]

###### Parameters

###### start

`number`

###### end

`number`

###### step?

`number`

###### Returns

readonly `number`[]

###### Call Signature

> (`start`, `end`, `step?`): readonly `number`[]

###### Parameters

###### start

`number`

###### end

`number`

###### step?

`number`

###### Returns

readonly `number`[]

##### reduce()

> **reduce**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

###### Type Parameters

###### A

`A`

###### S

`S`

###### Parameters

###### list

readonly `A`[]

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

###### initialValue

`S`

###### Returns

`S`

##### reduceRight()

> **reduceRight**: \<`A`, `S`\>(`list`, `callbackfn`, `initialValue`) => `S`

###### Type Parameters

###### A

`A`

###### S

`S`

###### Parameters

###### list

readonly `A`[]

###### callbackfn

(`previousValue`, `currentValue`, `currentIndex`) => `S`

###### initialValue

`S`

###### Returns

`S`

##### removed()

> **removed**: \<`A`\>(`list`, `index`) => readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### index

`number`

###### Returns

readonly `A`[]

##### rest()

> **rest**: \<`T`\>(`list`) => `Tail`\<`T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### list

`T`

###### Returns

`Tail`\<`T`\>

##### scan()

> **scan**: \<`A`, `B`\>(`list`, `reducer`, `init`) => readonly \[`B`, `B`\]

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly \[`A`, `A`\] | readonly `A`[]

###### reducer

`Reducer`\<`B`, `A`\>

###### init

`B`

###### Returns

readonly \[`B`, `B`\]

##### seq()

> **seq**: \{\<`N`\>(`len`): `SeqImpl`\<`MakeTupleImpl`\<`unknown`, `` `${N}` ``, \[\]\>\>; (`len`): readonly \[`number`, `number`\]; (`len`): readonly `number`[]; \}

###### Call Signature

> \<`N`\>(`len`): `SeqImpl`\<`MakeTupleImpl`\<`unknown`, `` `${N}` ``, \[\]\>\>

###### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### len

`N`

###### Returns

`SeqImpl`\<`MakeTupleImpl`\<`unknown`, `` `${N}` ``, \[\]\>\>

###### Call Signature

> (`len`): readonly \[`number`, `number`\]

###### Parameters

###### len

`PositiveInt`

###### Returns

readonly \[`number`, `number`\]

###### Call Signature

> (`len`): readonly `number`[]

###### Parameters

###### len

`number`

###### Returns

readonly `number`[]

##### set()

> **set**: \<`A`, `U`\>(`list`, `index`, `newValue`) => readonly (`A` \| `U`)[]

###### Type Parameters

###### A

`A`

###### U

`U`

###### Parameters

###### list

readonly `A`[]

###### index

`number`

###### newValue

`U`

###### Returns

readonly (`A` \| `U`)[]

##### setDifference()

> **setDifference**: \<`A`\>(`list1`, `list2`) => readonly `A`[]

###### Type Parameters

###### A

`A` _extends_ `Primitive`

###### Parameters

###### list1

readonly `A`[]

###### list2

readonly `A`[]

###### Returns

readonly `A`[]

##### setIntersection()

> **setIntersection**: \<`A`, `B`\>(`list1`, `list2`) => readonly `A` & `B`[]

###### Type Parameters

###### A

`A` _extends_ `Primitive`

###### B

`B` _extends_ `Primitive` = `A`

###### Parameters

###### list1

readonly `A`[]

###### list2

readonly `B`[]

###### Returns

readonly `A` & `B`[]

##### shift()

> **shift**: \<`T`\>(`list`) => `Tail`\<`T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### list

`T`

###### Returns

`Tail`\<`T`\>

##### skip()

> **skip**: \{\<`T`, `N`\>(`list`, `num`): `Skip`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `Skip`\<`N`, `T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### list

`T`

###### num

`N`

###### Returns

`Skip`\<`N`, `T`\>

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### num

`PositiveInt`

###### Returns

readonly \[`A`, `A`\]

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### num

`number`

###### Returns

readonly `A`[]

##### skipLast()

> **skipLast**: \{\<`T`, `N`\>(`list`, `num`): `SkipLast`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `SkipLast`\<`N`, `T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### list

`T`

###### num

`N`

###### Returns

`SkipLast`\<`N`, `T`\>

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### num

`PositiveInt`

###### Returns

readonly \[`A`, `A`\]

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### num

`number`

###### Returns

readonly `A`[]

##### sliceClamped()

> **sliceClamped**: \<`T`\>(`list`, `start`, `end`) => readonly `T`[]

###### Type Parameters

###### T

`T`

###### Parameters

###### list

readonly `T`[]

###### start

`number`

###### end

`number`

###### Returns

readonly `T`[]

##### sortedBy()

> **sortedBy**: \{\<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): readonly `A`[]; \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): readonly `A`[]; \}

###### Call Signature

> \<`A`\>(`list`, `comparatorValueMapper`, `comparator?`): readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### comparatorValueMapper

(`value`) => `number`

###### comparator?

(`x`, `y`) => `number`

###### Returns

readonly `A`[]

###### Call Signature

> \<`A`, `B`\>(`list`, `comparatorValueMapper`, `comparator`): readonly `A`[]

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly `A`[]

###### comparatorValueMapper

(`value`) => `B`

###### comparator

(`x`, `y`) => `number`

###### Returns

readonly `A`[]

##### sortedNumSetDifference()

> **sortedNumSetDifference**: \<`T`\>(`sortedList1`, `sortedList2`) => readonly `T`[]

###### Type Parameters

###### T

`T` _extends_ `number`

###### Parameters

###### sortedList1

readonly `T`[]

###### sortedList2

readonly `T`[]

###### Returns

readonly `T`[]

##### sum()

> **sum**: (`list`) => `number`

###### Parameters

###### list

readonly `number`[]

###### Returns

`number`

##### tail()

> **tail**: \<`T`\>(`list`) => `Tail`\<`T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### Parameters

###### list

`T`

###### Returns

`Tail`\<`T`\>

##### take()

> **take**: \{\<`T`, `N`\>(`list`, `num`): `Take`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `Take`\<`N`, `T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### list

`T`

###### num

`N`

###### Returns

`Take`\<`N`, `T`\>

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### num

`PositiveInt`

###### Returns

readonly \[`A`, `A`\]

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### num

`number`

###### Returns

readonly `A`[]

##### takeLast()

> **takeLast**: \{\<`T`, `N`\>(`list`, `num`): `TakeLast`\<`N`, `T`\>; \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]; \<`A`\>(`list`, `num`): readonly `A`[]; \}

###### Call Signature

> \<`T`, `N`\>(`list`, `num`): `TakeLast`\<`N`, `T`\>

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### list

`T`

###### num

`N`

###### Returns

`TakeLast`\<`N`, `T`\>

###### Call Signature

> \<`A`\>(`list`, `num`): readonly \[`A`, `A`\]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

###### num

`PositiveInt`

###### Returns

readonly \[`A`, `A`\]

###### Call Signature

> \<`A`\>(`list`, `num`): readonly `A`[]

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

###### num

`number`

###### Returns

readonly `A`[]

##### uniq()

> **uniq**: \{\<`A`\>(`list`): readonly \[`A`, `A`\]; \<`A`\>(`list`): readonly `A`[]; \}

###### Call Signature

> \<`A`\>(`list`): readonly \[`A`, `A`\]

Copy and return unique list

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly \[`A`, `A`\]

Target list

###### Returns

readonly \[`A`, `A`\]

###### Call Signature

> \<`A`\>(`list`): readonly `A`[]

Copy and return unique list

###### Type Parameters

###### A

`A`

###### Parameters

###### list

readonly `A`[]

Target list

###### Returns

readonly `A`[]

##### uniqBy()

> **uniqBy**: \{\<`A`, `B`\>(`list`, `mapFn`): readonly \[`A`, `A`\]; \<`A`, `B`\>(`list`, `mapFn`): readonly `A`[]; \}

###### Call Signature

> \<`A`, `B`\>(`list`, `mapFn`): readonly \[`A`, `A`\]

Copy and return unique list

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly \[`A`, `A`\]

Target list

###### mapFn

(`value`) => `B`

Perform identity check after mapping by the map function

###### Returns

readonly \[`A`, `A`\]

###### Call Signature

> \<`A`, `B`\>(`list`, `mapFn`): readonly `A`[]

Copy and return unique list

###### Type Parameters

###### A

`A`

###### B

`B`

###### Parameters

###### list

readonly `A`[]

Target list

###### mapFn

(`value`) => `B`

Perform identity check after mapping by the map function

###### Returns

readonly `A`[]

##### unshifted()

> **unshifted**: \<`T`, `V`\>(`list`, `value`) => readonly \[`V`, `T`\]

###### Type Parameters

###### T

`T` _extends_ readonly `unknown`[]

###### V

`V` = `T`

###### Parameters

###### list

`T`

###### value

`V`

###### Returns

readonly \[`V`, `T`\]

##### update()

> **update**: \<`A`, `U`\>(`list`, `index`, `updater`) => readonly (`A` \| `U`)[]

###### Type Parameters

###### A

`A`

###### U

`U`

###### Parameters

###### list

readonly `A`[]

###### index

`number`

###### updater

(`prev`) => `U`

###### Returns

readonly (`A` \| `U`)[]

##### zeros()

> **zeros**: \{\<`N`\>(`len`): `MakeTupleImpl`\<`0`, `` `${N}` ``\>; (`len`): readonly \[`0`, `0`\]; (`len`): readonly `0`[]; \}

###### Call Signature

> \<`N`\>(`len`): `MakeTupleImpl`\<`0`, `` `${N}` ``\>

###### Type Parameters

###### N

`N` _extends_ `0` \| `1` \| `2` \| `3` \| `4` \| `5` \| `6` \| `7` \| `8` \| `9` \| `10` \| `11` \| `12` \| `13` \| `14` \| `15` \| `16` \| `17` \| `18` \| `19` \| `20` \| `21` \| `22` \| `23` \| `24` \| `25` \| `26` \| `27` \| `28` \| `29` \| `30` \| `31` \| `32` \| `33` \| `34` \| `35` \| `36` \| `37` \| `38` \| `39`

###### Parameters

###### len

`N`

###### Returns

`MakeTupleImpl`\<`0`, `` `${N}` ``\>

###### Call Signature

> (`len`): readonly \[`0`, `0`\]

###### Parameters

###### len

`PositiveInt`

###### Returns

readonly \[`0`, `0`\]

###### Call Signature

> (`len`): readonly `0`[]

###### Parameters

###### len

`number`

###### Returns

readonly `0`[]

##### zip()

> **zip**: \<`T1`, `T2`\>(`list1`, `list2`) => `Zip`\<`T1`, `T2`\>

###### Type Parameters

###### T1

`T1` _extends_ readonly `unknown`[]

###### T2

`T2` _extends_ readonly `unknown`[]

###### Parameters

###### list1

`T1`

###### list2

`T2`

###### Returns

`Zip`\<`T1`, `T2`\>
