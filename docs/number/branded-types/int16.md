[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/int16

# number/branded-types/int16

## Variables

### asInt16()

> `const` **asInt16**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/int16.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int16.mts#L54)

Casts a number to an Int16 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as an Int16 type.

#### Throws

If the value is not an integer in [-2^15, 2^15).

#### Example

```typescript
const x = asInt16(1000); // Int16
const y = asInt16(-5000); // Int16
// asInt16(50000); // throws TypeError
// asInt16(1.5); // throws TypeError
```

---

### Int16

> `const` **Int16**: `object`

Defined in: [src/number/branded-types/int16.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int16.mts#L56)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`Int16`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`Int16`\>

##### add()

> **add**: (`x`, `y`) => `Int16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int16`

`a + b`, but clamped to `[-2^15, 2^15)`

##### clamp()

> **clamp**: (`x`) => `Int16`

###### Parameters

###### x

`number`

###### Returns

`Int16`

##### div()

> **div**: (`x`, `y`) => `Int16`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`Int16`\>

###### Returns

`Int16`

`⌊a / b⌋`, but clamped to `[-2^15, 2^15)`

##### is()

> **is**: (`a`) => `a is Int16`

###### Parameters

###### a

`number`

###### Returns

`a is Int16`

##### max()

> `readonly` **max**: (...`values`) => `Int16` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int16`, `40`\>[]

###### Returns

`Int16`

##### MAX_VALUE

> **MAX_VALUE**: `number`

2^15 - 1`

##### min()

> `readonly` **min**: (...`values`) => `Int16` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int16`, `40`\>[]

###### Returns

`Int16`

##### MIN_VALUE

> **MIN_VALUE**: `number`

-2^15`

##### mul()

> **mul**: (`x`, `y`) => `Int16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int16`

`a * b`, but clamped to `[-2^15, 2^15)`

##### pow()

> **pow**: (`x`, `y`) => `Int16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int16`

`a ** b`, but clamped to `[-2^15, 2^15)`

##### random()

> **random**: (`min`, `max`) => `Int16`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`Int16`

##### sub()

> **sub**: (`x`, `y`) => `Int16`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int16`

`a - b`, but clamped to `[-2^15, 2^15)`

---

### isInt16()

> `const` **isInt16**: (`a`) => `a is Int16` = `is`

Defined in: [src/number/branded-types/int16.mts:39](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int16.mts#L39)

Checks if a number is an Int16 (16-bit signed integer in the range [-2^15, 2^15)).

#### Parameters

##### a

`number`

#### Returns

`a is Int16`

`true` if the value is an Int16, `false` otherwise.
