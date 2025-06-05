[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-zero-int16

# number/branded-types/non-zero-int16

## Variables

### asNonZeroInt16()

> `const` **asNonZeroInt16**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-zero-int16.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int16.mts#L55)

Casts a number to a NonZeroInt16 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonZeroInt16 type.

#### Throws

If the value is not a non-zero integer in [-2^15, 2^15).

#### Example

```typescript
const x = asNonZeroInt16(1000); // NonZeroInt16
const y = asNonZeroInt16(-1000); // NonZeroInt16
// asNonZeroInt16(0); // throws TypeError
// asNonZeroInt16(32768); // throws TypeError
```

---

### isNonZeroInt16()

> `const` **isNonZeroInt16**: (`a`) => `a is NonZeroInt16` = `is`

Defined in: [src/number/branded-types/non-zero-int16.mts:40](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int16.mts#L40)

Checks if a number is a NonZeroInt16 (16-bit non-zero signed integer in the range [-2^15, 2^15) excluding 0).

#### Parameters

##### a

`number`

#### Returns

`a is NonZeroInt16`

`true` if the value is a NonZeroInt16, `false` otherwise.

---

### NonZeroInt16

> `const` **NonZeroInt16**: `object`

Defined in: [src/number/branded-types/non-zero-int16.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int16.mts#L57)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`NonZeroInt16`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`NonZeroInt16`\>

##### add()

> **add**: (`x`, `y`) => `NonZeroInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt16`

`a + b`, but clamped to `[-2^15, 2^15)`

##### clamp()

> **clamp**: (`x`) => `NonZeroInt16`

###### Parameters

###### x

`number`

###### Returns

`NonZeroInt16`

##### div()

> **div**: (`x`, `y`) => `NonZeroInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`NonZeroInt16`\>

###### Returns

`NonZeroInt16`

`⌊a / b⌋`, but clamped to `[-2^15, 2^15)`

##### is()

> **is**: (`a`) => `a is NonZeroInt16`

###### Parameters

###### a

`number`

###### Returns

`a is NonZeroInt16`

##### max()

> `readonly` **max**: (...`values`) => `NonZeroInt16` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroInt16`, `40`\>[]

###### Returns

`NonZeroInt16`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^15 - 1`

##### min()

> `readonly` **min**: (...`values`) => `NonZeroInt16` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroInt16`, `40`\>[]

###### Returns

`NonZeroInt16`

##### MIN_VALUE

> **MIN_VALUE**: `number`

`-2^15`

##### mul()

> **mul**: (`x`, `y`) => `NonZeroInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt16`

`a * b`, but clamped to `[-2^15, 2^15)`

##### pow()

> **pow**: (`x`, `y`) => `NonZeroInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt16`

`a ** b`, but clamped to `[-2^15, 2^15)`

##### random()

> **random**: (`min`, `max`) => `NonZeroInt16`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`NonZeroInt16`

##### sub()

> **sub**: (`x`, `y`) => `NonZeroInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt16`

`a - b`, but clamped to `[-2^15, 2^15)`
