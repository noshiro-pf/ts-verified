[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-zero-int

# number/branded-types/non-zero-int

## Variables

### asNonZeroInt()

> `const` **asNonZeroInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-zero-int.mts:52](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int.mts#L52)

Casts a number to a NonZeroInt type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonZeroInt type.

#### Throws

If the value is not a non-zero integer.

#### Example

```typescript
const x = asNonZeroInt(5); // NonZeroInt
const y = asNonZeroInt(-3); // NonZeroInt
// asNonZeroInt(0); // throws TypeError
// asNonZeroInt(1.5); // throws TypeError
```

---

### isNonZeroInt()

> `const` **isNonZeroInt**: (`a`) => `a is NonZeroInt` = `is`

Defined in: [src/number/branded-types/non-zero-int.mts:37](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int.mts#L37)

Checks if a number is a NonZeroInt.

#### Parameters

##### a

`number`

#### Returns

`a is NonZeroInt`

`true` if the value is a NonZeroInt, `false` otherwise.

---

### NonZeroInt

> `const` **NonZeroInt**: `object`

Defined in: [src/number/branded-types/non-zero-int.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int.mts#L54)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`NonZeroInt`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`NonZeroInt`\>

##### add()

> **add**: (`x`, `y`) => `NonZeroInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt`

`a + b`

##### div()

> **div**: (`x`, `y`) => `NonZeroInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`NonZeroInt`\>

###### Returns

`NonZeroInt`

`⌊a / b⌋`

##### is()

> **is**: (`a`) => `a is NonZeroInt`

###### Parameters

###### a

`number`

###### Returns

`a is NonZeroInt`

##### max()

> `readonly` **max**: (...`values`) => `NonZeroInt` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroInt`, `40`\>[]

###### Returns

`NonZeroInt`

##### min()

> `readonly` **min**: (...`values`) => `NonZeroInt` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroInt`, `40`\>[]

###### Returns

`NonZeroInt`

##### mul()

> **mul**: (`x`, `y`) => `NonZeroInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt`

`a * b`

##### pow()

> **pow**: (`x`, `y`) => `NonZeroInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt`

`a ** b`

##### random()

> **random**: (`min`, `max`) => `NonZeroInt`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`NonZeroInt`

##### sub()

> **sub**: (`x`, `y`) => `NonZeroInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt`

`a - b`
