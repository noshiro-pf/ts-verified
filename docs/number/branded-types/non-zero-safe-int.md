[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-zero-safe-int

# number/branded-types/non-zero-safe-int

## Variables

### asNonZeroSafeInt()

> `const` **asNonZeroSafeInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-zero-safe-int.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-safe-int.mts#L57)

Casts a number to a NonZeroSafeInt type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonZeroSafeInt type.

#### Throws

If the value is not a non-zero safe integer.

#### Example

```typescript
const x = asNonZeroSafeInt(5); // NonZeroSafeInt
const y = asNonZeroSafeInt(-1000); // NonZeroSafeInt
// asNonZeroSafeInt(0); // throws TypeError
// asNonZeroSafeInt(1.5); // throws TypeError
```

---

### isNonZeroSafeInt()

> `const` **isNonZeroSafeInt**: (`a`) => `a is NonZeroSafeInt` = `is`

Defined in: [src/number/branded-types/non-zero-safe-int.mts:42](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-safe-int.mts#L42)

Checks if a number is a NonZeroSafeInt (a non-zero safe integer in the range [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER] excluding 0).

#### Parameters

##### a

`number`

#### Returns

`a is NonZeroSafeInt`

`true` if the value is a NonZeroSafeInt, `false` otherwise.

---

### NonZeroSafeInt

> `const` **NonZeroSafeInt**: `object`

Defined in: [src/number/branded-types/non-zero-safe-int.mts:59](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-safe-int.mts#L59)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`NonZeroSafeInt`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`NonZeroSafeInt`\>

##### add()

> **add**: (`x`, `y`) => `NonZeroSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroSafeInt`

`a + b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### clamp()

> **clamp**: (`x`) => `NonZeroSafeInt`

###### Parameters

###### x

`number`

###### Returns

`NonZeroSafeInt`

##### div()

> **div**: (`x`, `y`) => `NonZeroSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`NonZeroSafeInt`\>

###### Returns

`NonZeroSafeInt`

`⌊a / b⌋`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### is()

> **is**: (`a`) => `a is NonZeroSafeInt`

###### Parameters

###### a

`number`

###### Returns

`a is NonZeroSafeInt`

##### max()

> `readonly` **max**: (...`values`) => `NonZeroSafeInt` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroSafeInt`, `40`\>[]

###### Returns

`NonZeroSafeInt`

##### MAX_VALUE

> **MAX_VALUE**: `SafeUint`

`Number.MAX_SAFE_INTEGER`

##### min()

> `readonly` **min**: (...`values`) => `NonZeroSafeInt` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonZeroSafeInt`, `40`\>[]

###### Returns

`NonZeroSafeInt`

##### MIN_VALUE

> **MIN_VALUE**: `SafeInt`

`Number.MIN_SAFE_INTEGER`

##### mul()

> **mul**: (`x`, `y`) => `NonZeroSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroSafeInt`

`a * b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### pow()

> **pow**: (`x`, `y`) => `NonZeroSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroSafeInt`

`a ** b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### random()

> **random**: (`min`, `max`) => `NonZeroSafeInt`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`NonZeroSafeInt`

##### sub()

> **sub**: (`x`, `y`) => `NonZeroSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonZeroSafeInt`

`a - b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`
