[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/positive-uint16

# number/branded-types/positive-uint16

## Variables

### asPositiveUint16()

> `const` **asPositiveUint16**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/positive-uint16.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-uint16.mts#L54)

Casts a number to a PositiveUint16 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a PositiveUint16 type.

#### Throws

If the value is not a positive integer in [1, 2^16).

#### Example

```typescript
const x = asPositiveUint16(1000); // PositiveUint16
const y = asPositiveUint16(65535); // PositiveUint16
// asPositiveUint16(0); // throws TypeError
// asPositiveUint16(-1); // throws TypeError
// asPositiveUint16(65536); // throws TypeError
```

---

### isPositiveUint16()

> `const` **isPositiveUint16**: (`a`) => `a is PositiveUint16` = `is`

Defined in: [src/number/branded-types/positive-uint16.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-uint16.mts#L38)

Checks if a number is a PositiveUint16 (16-bit positive unsigned integer in the range [1, 2^16)).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveUint16`

`true` if the value is a PositiveUint16, `false` otherwise.

---

### PositiveUint16

> `const` **PositiveUint16**: `object`

Defined in: [src/number/branded-types/positive-uint16.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-uint16.mts#L56)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveUint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint16`

`a + b`, but clamped to `[1, 2^16)`

##### clamp()

> **clamp**: (`x`) => `PositiveUint16`

###### Parameters

###### x

`number`

###### Returns

`PositiveUint16`

##### div()

> **div**: (`x`, `y`) => `PositiveUint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`PositiveUint16`\>

###### Returns

`PositiveUint16`

`⌊a / b⌋`, but clamped to `[1, 2^16)`

##### is()

> **is**: (`a`) => `a is PositiveUint16`

###### Parameters

###### a

`number`

###### Returns

`a is PositiveUint16`

##### max()

> `readonly` **max**: (...`values`) => `PositiveUint16` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveUint16`, `40`\>[]

###### Returns

`PositiveUint16`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^16 - 1`

##### min()

> `readonly` **min**: (...`values`) => `PositiveUint16` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveUint16`, `40`\>[]

###### Returns

`PositiveUint16`

##### MIN_VALUE

> **MIN_VALUE**: `1`

`1`

##### mul()

> **mul**: (`x`, `y`) => `PositiveUint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint16`

`a * b`, but clamped to `[1, 2^16)`

##### pow()

> **pow**: (`x`, `y`) => `PositiveUint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint16`

`a ** b`, but clamped to `[1, 2^16)`

##### random()

> **random**: (`min`, `max`) => `PositiveUint16`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`PositiveUint16`

##### sub()

> **sub**: (`x`, `y`) => `PositiveUint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint16`

`a - b`, but clamped to `[1, 2^16)`
