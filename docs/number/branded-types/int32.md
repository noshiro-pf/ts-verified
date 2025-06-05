[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/int32

# number/branded-types/int32

## Variables

### asInt32()

> `const` **asInt32**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/int32.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int32.mts#L54)

Casts a number to an Int32 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as an Int32 type.

#### Throws

If the value is not an integer in [-2^31, 2^31).

#### Example

```typescript
const x = asInt32(100000); // Int32
const y = asInt32(-500000); // Int32
// asInt32(3000000000); // throws TypeError
// asInt32(1.5); // throws TypeError
```

---

### Int32

> `const` **Int32**: `object`

Defined in: [src/number/branded-types/int32.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int32.mts#L56)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`Int32`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`Int32`\>

##### add()

> **add**: (`x`, `y`) => `Int32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int32`

`a + b`, but clamped to `[-2^31, 2^31)`

##### clamp()

> **clamp**: (`x`) => `Int32`

###### Parameters

###### x

`number`

###### Returns

`Int32`

##### div()

> **div**: (`x`, `y`) => `Int32`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`Int32`\>

###### Returns

`Int32`

`⌊a / b⌋`, but clamped to `[-2^31, 2^31)`

##### is()

> **is**: (`a`) => `a is Int32`

###### Parameters

###### a

`number`

###### Returns

`a is Int32`

##### max()

> `readonly` **max**: (...`values`) => `Int32` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int32`, `40`\>[]

###### Returns

`Int32`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^31 - 1`

##### min()

> `readonly` **min**: (...`values`) => `Int32` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int32`, `40`\>[]

###### Returns

`Int32`

##### MIN_VALUE

> **MIN_VALUE**: `number`

`-2^31`

##### mul()

> **mul**: (`x`, `y`) => `Int32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int32`

`a * b`, but clamped to `[-2^31, 2^31)`

##### pow()

> **pow**: (`x`, `y`) => `Int32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int32`

`a ** b`, but clamped to `[-2^31, 2^31)`

##### random()

> **random**: (`min`, `max`) => `Int32`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`Int32`

##### sub()

> **sub**: (`x`, `y`) => `Int32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int32`

`a - b`, but clamped to `[-2^31, 2^31)`

---

### isInt32()

> `const` **isInt32**: (`a`) => `a is Int32` = `is`

Defined in: [src/number/branded-types/int32.mts:39](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int32.mts#L39)

Checks if a number is an Int32 (32-bit signed integer in the range [-2^31, 2^31)).

#### Parameters

##### a

`number`

#### Returns

`a is Int32`

`true` if the value is an Int32, `false` otherwise.
