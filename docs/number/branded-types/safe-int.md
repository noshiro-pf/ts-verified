[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/safe-int

# number/branded-types/safe-int

## Variables

### asSafeInt()

> `const` **asSafeInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/safe-int.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-int.mts#L56)

Casts a number to a SafeInt type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a SafeInt type.

#### Throws

If the value is not a safe integer.

#### Example

```typescript
const x = asSafeInt(5); // SafeInt
const y = asSafeInt(-1000); // SafeInt
// asSafeInt(1.5); // throws TypeError
// asSafeInt(Number.MAX_SAFE_INTEGER + 1); // throws TypeError
```

---

### isSafeInt()

> `const` **isSafeInt**: (`a`) => `a is SafeInt` = `is`

Defined in: [src/number/branded-types/safe-int.mts:41](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-int.mts#L41)

Checks if a number is a SafeInt.

#### Parameters

##### a

`number`

#### Returns

`a is SafeInt`

`true` if the value is a SafeInt, `false` otherwise.

---

### SafeInt

> `const` **SafeInt**: `object`

Defined in: [src/number/branded-types/safe-int.mts:58](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-int.mts#L58)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`SafeInt`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`SafeInt`\>

##### add()

> **add**: (`x`, `y`) => `SafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a + b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### clamp()

> **clamp**: (`x`) => `SafeInt`

###### Parameters

###### x

`number`

###### Returns

`SafeInt`

##### div()

> **div**: (`x`, `y`) => `SafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`SafeInt`\>

###### Returns

`SafeInt`

`⌊a / b⌋`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### is()

> **is**: (`a`) => `a is SafeInt`

###### Parameters

###### a

`number`

###### Returns

`a is SafeInt`

##### max()

> `readonly` **max**: (...`values`) => `SafeInt` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`SafeInt`, `40`\>[]

###### Returns

`SafeInt`

##### MAX_VALUE

> **MAX_VALUE**: `SafeUint`

`Number.MAX_SAFE_INTEGER`

##### min()

> `readonly` **min**: (...`values`) => `SafeInt` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`SafeInt`, `40`\>[]

###### Returns

`SafeInt`

##### MIN_VALUE

> **MIN_VALUE**: `SafeInt`

`Number.MIN_SAFE_INTEGER`

##### mul()

> **mul**: (`x`, `y`) => `SafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a * b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### pow()

> **pow**: (`x`, `y`) => `SafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a ** b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`

##### random()

> **random**: (`min`, `max`) => `SafeInt`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`SafeInt`

##### sub()

> **sub**: (`x`, `y`) => `SafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a - b`, but clamped to `[MIN_SAFE_INTEGER, MAX_SAFE_INTEGER]`
