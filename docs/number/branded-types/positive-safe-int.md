[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/positive-safe-int

# number/branded-types/positive-safe-int

## Variables

### asPositiveSafeInt()

> `const` **asPositiveSafeInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/positive-safe-int.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-safe-int.mts#L54)

Casts a number to a PositiveSafeInt type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a PositiveSafeInt type.

#### Throws

If the value is not a positive safe integer.

#### Example

```typescript
const x = asPositiveSafeInt(5); // PositiveSafeInt
const y = asPositiveSafeInt(1000); // PositiveSafeInt
// asPositiveSafeInt(0); // throws TypeError
// asPositiveSafeInt(-1); // throws TypeError
```

---

### isPositiveSafeInt()

> `const` **isPositiveSafeInt**: (`a`) => `a is PositiveSafeInt` = `is`

Defined in: [src/number/branded-types/positive-safe-int.mts:39](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-safe-int.mts#L39)

Checks if a number is a PositiveSafeInt (a positive safe integer in the range [1, MAX_SAFE_INTEGER]).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveSafeInt`

`true` if the value is a PositiveSafeInt, `false` otherwise.

---

### PositiveSafeInt

> `const` **PositiveSafeInt**: `object`

Defined in: [src/number/branded-types/positive-safe-int.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-safe-int.mts#L56)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveSafeInt`

`a + b`, but clamped to `[1, MAX_SAFE_INTEGER]`

##### clamp()

> **clamp**: (`x`) => `PositiveSafeInt`

###### Parameters

###### x

`number`

###### Returns

`PositiveSafeInt`

##### div()

> **div**: (`x`, `y`) => `PositiveSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`PositiveSafeInt`\>

###### Returns

`PositiveSafeInt`

`⌊a / b⌋`, but clamped to `[1, MAX_SAFE_INTEGER]`

##### is()

> **is**: (`a`) => `a is PositiveSafeInt`

###### Parameters

###### a

`number`

###### Returns

`a is PositiveSafeInt`

##### max()

> `readonly` **max**: (...`values`) => `PositiveSafeInt` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveSafeInt`, `40`\>[]

###### Returns

`PositiveSafeInt`

##### MAX_VALUE

> **MAX_VALUE**: `SafeUint`

`Number.MAX_SAFE_INTEGER`

##### min()

> `readonly` **min**: (...`values`) => `PositiveSafeInt` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveSafeInt`, `40`\>[]

###### Returns

`PositiveSafeInt`

##### MIN_VALUE

> **MIN_VALUE**: `1`

`1`

##### mul()

> **mul**: (`x`, `y`) => `PositiveSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveSafeInt`

`a * b`, but clamped to `[1, MAX_SAFE_INTEGER]`

##### pow()

> **pow**: (`x`, `y`) => `PositiveSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveSafeInt`

`a ** b`, but clamped to `[1, MAX_SAFE_INTEGER]`

##### random()

> **random**: (`min`, `max`) => `PositiveSafeInt`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`PositiveSafeInt`

##### sub()

> **sub**: (`x`, `y`) => `PositiveSafeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveSafeInt`

`a - b`, but clamped to `[1, MAX_SAFE_INTEGER]`
