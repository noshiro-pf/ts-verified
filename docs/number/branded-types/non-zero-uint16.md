[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-zero-uint16

# number/branded-types/non-zero-uint16

## Variables

### asNonZeroUint16()

> `const` **asNonZeroUint16**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-zero-uint16.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-uint16.mts#L55)

Casts a number to a NonZeroUint16 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonZeroUint16 type.

#### Throws

If the value is not a non-zero integer in [1, 2^16).

#### Example

```typescript
const x = asNonZeroUint16(1000); // NonZeroUint16
const y = asNonZeroUint16(65535); // NonZeroUint16
// asNonZeroUint16(0); // throws TypeError
// asNonZeroUint16(-1); // throws TypeError
// asNonZeroUint16(65536); // throws TypeError
```

---

### isNonZeroUint16()

> `const` **isNonZeroUint16**: (`a`) => `a is PositiveUint16` = `is`

Defined in: [src/number/branded-types/non-zero-uint16.mts:39](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-uint16.mts#L39)

Checks if a number is a NonZeroUint16 (16-bit non-zero unsigned integer in the range [1, 2^16)).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveUint16`

`true` if the value is a NonZeroUint16, `false` otherwise.

---

### NonZeroUint16

> `const` **NonZeroUint16**: `object`

Defined in: [src/number/branded-types/non-zero-uint16.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-uint16.mts#L57)

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
