[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-negative-int16

# number/branded-types/non-negative-int16

## Variables

### asNonNegativeInt16()

> `const` **asNonNegativeInt16**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-negative-int16.mts:53](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-int16.mts#L53)

Casts a number to a NonNegativeInt16 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonNegativeInt16 type.

#### Throws

If the value is not a non-negative integer in [0, 2^15).

#### Example

```typescript
const x = asNonNegativeInt16(1000); // NonNegativeInt16
const y = asNonNegativeInt16(0); // NonNegativeInt16
// asNonNegativeInt16(-1); // throws TypeError
// asNonNegativeInt16(32768); // throws TypeError
```

---

### isNonNegativeInt16()

> `const` **isNonNegativeInt16**: (`a`) => `a is NonNegativeInt16` = `is`

Defined in: [src/number/branded-types/non-negative-int16.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-int16.mts#L38)

Checks if a number is a NonNegativeInt16 (16-bit non-negative signed integer in the range [0, 2^15)).

#### Parameters

##### a

`number`

#### Returns

`a is NonNegativeInt16`

`true` if the value is a NonNegativeInt16, `false` otherwise.

---

### NonNegativeInt16

> `const` **NonNegativeInt16**: `object`

Defined in: [src/number/branded-types/non-negative-int16.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-int16.mts#L55)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `NonNegativeInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt16`

`a + b`, but clamped to `[0, 2^15)`

##### clamp()

> **clamp**: (`x`) => `NonNegativeInt16`

###### Parameters

###### x

`number`

###### Returns

`NonNegativeInt16`

##### div()

> **div**: (`x`, `y`) => `NonNegativeInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`NonNegativeInt16`\>

###### Returns

`NonNegativeInt16`

`⌊a / b⌋`, but clamped to `[0, 2^15)`

##### is()

> **is**: (`a`) => `a is NonNegativeInt16`

###### Parameters

###### a

`number`

###### Returns

`a is NonNegativeInt16`

##### max()

> `readonly` **max**: (...`values`) => `NonNegativeInt16` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonNegativeInt16`, `40`\>[]

###### Returns

`NonNegativeInt16`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^15 - 1`

##### min()

> `readonly` **min**: (...`values`) => `NonNegativeInt16` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonNegativeInt16`, `40`\>[]

###### Returns

`NonNegativeInt16`

##### MIN_VALUE

> **MIN_VALUE**: `0`

`0`

##### mul()

> **mul**: (`x`, `y`) => `NonNegativeInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt16`

`a * b`, but clamped to `[0, 2^15)`

##### pow()

> **pow**: (`x`, `y`) => `NonNegativeInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt16`

`a ** b`, but clamped to `[0, 2^15)`

##### random()

> **random**: (`min`, `max`) => `NonNegativeInt16`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`NonNegativeInt16`

##### sub()

> **sub**: (`x`, `y`) => `NonNegativeInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt16`

`a - b`, but clamped to `[0, 2^15)`
