[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-negative-int32

# number/branded-types/non-negative-int32

## Variables

### asNonNegativeInt32()

> `const` **asNonNegativeInt32**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-negative-int32.mts:53](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-int32.mts#L53)

Casts a number to a NonNegativeInt32 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonNegativeInt32 type.

#### Throws

If the value is not a non-negative integer in [0, 2^31).

#### Example

```typescript
const x = asNonNegativeInt32(1000); // NonNegativeInt32
const y = asNonNegativeInt32(0); // NonNegativeInt32
// asNonNegativeInt32(-1); // throws TypeError
// asNonNegativeInt32(2147483648); // throws TypeError
```

---

### isNonNegativeInt32()

> `const` **isNonNegativeInt32**: (`a`) => `a is NonNegativeInt32` = `is`

Defined in: [src/number/branded-types/non-negative-int32.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-int32.mts#L38)

Checks if a number is a NonNegativeInt32 (32-bit non-negative signed integer in the range [0, 2^31)).

#### Parameters

##### a

`number`

#### Returns

`a is NonNegativeInt32`

`true` if the value is a NonNegativeInt32, `false` otherwise.

---

### NonNegativeInt32

> `const` **NonNegativeInt32**: `object`

Defined in: [src/number/branded-types/non-negative-int32.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-int32.mts#L55)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `NonNegativeInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt32`

`a + b`, but clamped to `[0, 2^31)`

##### clamp()

> **clamp**: (`x`) => `NonNegativeInt32`

###### Parameters

###### x

`number`

###### Returns

`NonNegativeInt32`

##### div()

> **div**: (`x`, `y`) => `NonNegativeInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`NonNegativeInt32`\>

###### Returns

`NonNegativeInt32`

`⌊a / b⌋`, but clamped to `[0, 2^31)`

##### is()

> **is**: (`a`) => `a is NonNegativeInt32`

###### Parameters

###### a

`number`

###### Returns

`a is NonNegativeInt32`

##### max()

> `readonly` **max**: (...`values`) => `NonNegativeInt32` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonNegativeInt32`, `40`\>[]

###### Returns

`NonNegativeInt32`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^31 - 1`

##### min()

> `readonly` **min**: (...`values`) => `NonNegativeInt32` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonNegativeInt32`, `40`\>[]

###### Returns

`NonNegativeInt32`

##### MIN_VALUE

> **MIN_VALUE**: `0`

`0`

##### mul()

> **mul**: (`x`, `y`) => `NonNegativeInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt32`

`a * b`, but clamped to `[0, 2^31)`

##### pow()

> **pow**: (`x`, `y`) => `NonNegativeInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt32`

`a ** b`, but clamped to `[0, 2^31)`

##### random()

> **random**: (`min`, `max`) => `NonNegativeInt32`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`NonNegativeInt32`

##### sub()

> **sub**: (`x`, `y`) => `NonNegativeInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt32`

`a - b`, but clamped to `[0, 2^31)`
