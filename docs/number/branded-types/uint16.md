[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/uint16

# number/branded-types/uint16

## Variables

### asUint16()

> `const` **asUint16**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/uint16.mts:53](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint16.mts#L53)

Casts a number to a Uint16 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a Uint16 type.

#### Throws

If the value is not a non-negative integer less than 2^16.

#### Example

```typescript
const x = asUint16(1000); // Uint16
const y = asUint16(0); // Uint16
// asUint16(-1); // throws TypeError
// asUint16(70000); // throws TypeError
```

---

### isUint16()

> `const` **isUint16**: (`a`) => `a is Uint16` = `is`

Defined in: [src/number/branded-types/uint16.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint16.mts#L38)

Checks if a number is a Uint16 (16-bit unsigned integer in the range [0, 2^16)).

#### Parameters

##### a

`number`

#### Returns

`a is Uint16`

`true` if the value is a Uint16, `false` otherwise.

---

### Uint16

> `const` **Uint16**: `object`

Defined in: [src/number/branded-types/uint16.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint16.mts#L55)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `Uint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint16`

`a + b`, but clamped to `[0, 2^16)`

##### clamp()

> **clamp**: (`x`) => `Uint16`

###### Parameters

###### x

`number`

###### Returns

`Uint16`

##### div()

> **div**: (`x`, `y`) => `Uint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`Uint16`\>

###### Returns

`Uint16`

`⌊a / b⌋`, but clamped to `[0, 2^16)`

##### is()

> **is**: (`a`) => `a is Uint16`

###### Parameters

###### a

`number`

###### Returns

`a is Uint16`

##### max()

> `readonly` **max**: (...`values`) => `Uint16` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Uint16`, `40`\>[]

###### Returns

`Uint16`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^16 - 1`

##### min()

> `readonly` **min**: (...`values`) => `Uint16` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Uint16`, `40`\>[]

###### Returns

`Uint16`

##### MIN_VALUE

> **MIN_VALUE**: `0`

`0`

##### mul()

> **mul**: (`x`, `y`) => `Uint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint16`

`a * b`, but clamped to `[0, 2^16)`

##### pow()

> **pow**: (`x`, `y`) => `Uint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint16`

`a ** b`, but clamped to `[0, 2^16)`

##### random()

> **random**: (`min`, `max`) => `Uint16`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`Uint16`

##### sub()

> **sub**: (`x`, `y`) => `Uint16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint16`

`a - b`, but clamped to `[0, 2^16)`
