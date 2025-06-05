[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/positive-int16

# number/branded-types/positive-int16

## Variables

### asPositiveInt16()

> `const` **asPositiveInt16**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/positive-int16.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int16.mts#L54)

Casts a number to a PositiveInt16 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a PositiveInt16 type.

#### Throws

If the value is not a positive integer in [1, 2^15).

#### Example

```typescript
const x = asPositiveInt16(1000); // PositiveInt16
const y = asPositiveInt16(32767); // PositiveInt16
// asPositiveInt16(0); // throws TypeError
// asPositiveInt16(-1); // throws TypeError
// asPositiveInt16(32768); // throws TypeError
```

---

### isPositiveInt16()

> `const` **isPositiveInt16**: (`a`) => `a is PositiveInt16` = `is`

Defined in: [src/number/branded-types/positive-int16.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int16.mts#L38)

Checks if a number is a PositiveInt16 (16-bit positive signed integer in the range [1, 2^15)).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveInt16`

`true` if the value is a PositiveInt16, `false` otherwise.

---

### PositiveInt16

> `const` **PositiveInt16**: `object`

Defined in: [src/number/branded-types/positive-int16.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int16.mts#L56)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt16`

`a + b`, but clamped to `[1, 2^15)`

##### clamp()

> **clamp**: (`x`) => `PositiveInt16`

###### Parameters

###### x

`number`

###### Returns

`PositiveInt16`

##### div()

> **div**: (`x`, `y`) => `PositiveInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`PositiveInt16`\>

###### Returns

`PositiveInt16`

`⌊a / b⌋`, but clamped to `[1, 2^15)`

##### is()

> **is**: (`a`) => `a is PositiveInt16`

###### Parameters

###### a

`number`

###### Returns

`a is PositiveInt16`

##### max()

> `readonly` **max**: (...`values`) => `PositiveInt16` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt16`, `40`\>[]

###### Returns

`PositiveInt16`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^15 - 1`

##### min()

> `readonly` **min**: (...`values`) => `PositiveInt16` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt16`, `40`\>[]

###### Returns

`PositiveInt16`

##### MIN_VALUE

> **MIN_VALUE**: `1`

`1`

##### mul()

> **mul**: (`x`, `y`) => `PositiveInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt16`

`a * b`, but clamped to `[1, 2^15)`

##### pow()

> **pow**: (`x`, `y`) => `PositiveInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt16`

`a ** b`, but clamped to `[1, 2^15)`

##### random()

> **random**: (`min`, `max`) => `PositiveInt16`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`PositiveInt16`

##### sub()

> **sub**: (`x`, `y`) => `PositiveInt16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt16`

`a - b`, but clamped to `[1, 2^15)`
