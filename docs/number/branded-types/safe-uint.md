[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/safe-uint

# number/branded-types/safe-uint

## Variables

### asSafeUint()

> `const` **asSafeUint**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/safe-uint.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-uint.mts#L54)

Casts a number to a SafeUint type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a SafeUint type.

#### Throws

If the value is not a non-negative safe integer.

#### Example

```typescript
const x = asSafeUint(5); // SafeUint
const y = asSafeUint(0); // SafeUint
// asSafeUint(-1); // throws TypeError
// asSafeUint(1.5); // throws TypeError
```

---

### isSafeUint()

> `const` **isSafeUint**: (`a`) => `a is SafeUint` = `is`

Defined in: [src/number/branded-types/safe-uint.mts:39](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-uint.mts#L39)

Checks if a number is a SafeUint.

#### Parameters

##### a

`number`

#### Returns

`a is SafeUint`

`true` if the value is a SafeUint, `false` otherwise.

---

### SafeUint

> `const` **SafeUint**: `object`

Defined in: [src/number/branded-types/safe-uint.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-uint.mts#L56)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `SafeUint`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeUint`

`a + b`, but clamped to `[0, MAX_SAFE_INTEGER]`

##### clamp()

> **clamp**: (`x`) => `SafeUint`

###### Parameters

###### x

`number`

###### Returns

`SafeUint`

##### div()

> **div**: (`x`, `y`) => `SafeUint`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`SafeUint`\>

###### Returns

`SafeUint`

`⌊a / b⌋`, but clamped to `[0, MAX_SAFE_INTEGER]`

##### is()

> **is**: (`a`) => `a is SafeUint`

###### Parameters

###### a

`number`

###### Returns

`a is SafeUint`

##### max()

> `readonly` **max**: (...`values`) => `SafeUint` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`SafeUint`, `40`\>[]

###### Returns

`SafeUint`

##### MAX_VALUE

> **MAX_VALUE**: `SafeUint`

`Number.MAX_SAFE_INTEGER`

##### min()

> `readonly` **min**: (...`values`) => `SafeUint` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`SafeUint`, `40`\>[]

###### Returns

`SafeUint`

##### MIN_VALUE

> **MIN_VALUE**: `0`

`0`

##### mul()

> **mul**: (`x`, `y`) => `SafeUint`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeUint`

`a * b`, but clamped to `[0, MAX_SAFE_INTEGER]`

##### pow()

> **pow**: (`x`, `y`) => `SafeUint`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeUint`

`a ** b`, but clamped to `[0, MAX_SAFE_INTEGER]`

##### random()

> **random**: (`min`, `max`) => `SafeUint`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`SafeUint`

##### sub()

> **sub**: (`x`, `y`) => `SafeUint`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeUint`

`a - b`, but clamped to `[0, MAX_SAFE_INTEGER]`
