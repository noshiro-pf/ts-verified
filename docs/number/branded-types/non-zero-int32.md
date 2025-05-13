[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-zero-int32

# number/branded-types/non-zero-int32

## Variables

### asNonZeroInt32()

> `const` **asNonZeroInt32**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-zero-int32.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int32.mts#L55)

Casts a number to a NonZeroInt32 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonZeroInt32 type.

#### Throws

If the value is not a non-zero integer in [-2^31, 2^31).

#### Example

```typescript
const x = asNonZeroInt32(1000); // NonZeroInt32
const y = asNonZeroInt32(-1000); // NonZeroInt32
// asNonZeroInt32(0); // throws TypeError
// asNonZeroInt32(2147483648); // throws TypeError
```

---

### isNonZeroInt32()

> `const` **isNonZeroInt32**: (`a`) => `a is NonZeroInt32` = `is`

Defined in: [src/number/branded-types/non-zero-int32.mts:40](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int32.mts#L40)

Checks if a number is a NonZeroInt32 (32-bit non-zero signed integer in the range [-2^31, 2^31) excluding 0).

#### Parameters

##### a

`number`

#### Returns

`a is NonZeroInt32`

`true` if the value is a NonZeroInt32, `false` otherwise.

---

### NonZeroInt32

> `const` **NonZeroInt32**: `object`

Defined in: [src/number/branded-types/non-zero-int32.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-int32.mts#L57)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`NonZeroInt32`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`NonZeroInt32`\>

##### add()

> **add**: (`x`, `y`) => `NonZeroInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt32`

`a + b`, but clamped to `[-2^31, 2^31)`

##### clamp()

> **clamp**: (`x`) => `NonZeroInt32`

###### Parameters

###### x

`number`

###### Returns

`NonZeroInt32`

##### div()

> **div**: (`x`, `y`) => `NonZeroInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`NonZeroInt32`\>

###### Returns

`NonZeroInt32`

`⌊a / b⌋`, but clamped to `[-2^31, 2^31)`

##### is()

> **is**: (`a`) => `a is NonZeroInt32`

###### Parameters

###### a

`number`

###### Returns

`a is NonZeroInt32`

##### max()

> `readonly` **max**: (...`values`) => `NonZeroInt32` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroInt32`, `40`\>[]

###### Returns

`NonZeroInt32`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^31 - 1`

##### min()

> `readonly` **min**: (...`values`) => `NonZeroInt32` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroInt32`, `40`\>[]

###### Returns

`NonZeroInt32`

##### MIN_VALUE

> **MIN_VALUE**: `number`

`-2^31`

##### mul()

> **mul**: (`x`, `y`) => `NonZeroInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt32`

`a * b`, but clamped to `[-2^31, 2^31)`

##### pow()

> **pow**: (`x`, `y`) => `NonZeroInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt32`

`a ** b`, but clamped to `[-2^31, 2^31)`

##### random()

> **random**: (`min`, `max`) => `NonZeroInt32`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`NonZeroInt32`

##### sub()

> **sub**: (`x`, `y`) => `NonZeroInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroInt32`

`a - b`, but clamped to `[-2^31, 2^31)`
