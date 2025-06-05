[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/positive-int32

# number/branded-types/positive-int32

## Variables

### asPositiveInt32()

> `const` **asPositiveInt32**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/positive-int32.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int32.mts#L54)

Casts a number to a PositiveInt32 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a PositiveInt32 type.

#### Throws

If the value is not a positive integer in [1, 2^31).

#### Example

```typescript
const x = asPositiveInt32(1000); // PositiveInt32
const y = asPositiveInt32(2147483647); // PositiveInt32
// asPositiveInt32(0); // throws TypeError
// asPositiveInt32(-1); // throws TypeError
// asPositiveInt32(2147483648); // throws TypeError
```

---

### isPositiveInt32()

> `const` **isPositiveInt32**: (`a`) => `a is PositiveInt32` = `is`

Defined in: [src/number/branded-types/positive-int32.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int32.mts#L38)

Checks if a number is a PositiveInt32 (32-bit positive signed integer in the range [1, 2^31)).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveInt32`

`true` if the value is a PositiveInt32, `false` otherwise.

---

### PositiveInt32

> `const` **PositiveInt32**: `object`

Defined in: [src/number/branded-types/positive-int32.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int32.mts#L56)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt32`

`a + b`, but clamped to `[1, 2^31)`

##### clamp()

> **clamp**: (`x`) => `PositiveInt32`

###### Parameters

###### x

`number`

###### Returns

`PositiveInt32`

##### div()

> **div**: (`x`, `y`) => `PositiveInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`PositiveInt32`\>

###### Returns

`PositiveInt32`

`⌊a / b⌋`, but clamped to `[1, 2^31)`

##### is()

> **is**: (`a`) => `a is PositiveInt32`

###### Parameters

###### a

`number`

###### Returns

`a is PositiveInt32`

##### max()

> `readonly` **max**: (...`values`) => `PositiveInt32` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt32`, `40`\>[]

###### Returns

`PositiveInt32`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^31 - 1`

##### min()

> `readonly` **min**: (...`values`) => `PositiveInt32` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt32`, `40`\>[]

###### Returns

`PositiveInt32`

##### MIN_VALUE

> **MIN_VALUE**: `1`

`1`

##### mul()

> **mul**: (`x`, `y`) => `PositiveInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt32`

`a * b`, but clamped to `[1, 2^31)`

##### pow()

> **pow**: (`x`, `y`) => `PositiveInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt32`

`a ** b`, but clamped to `[1, 2^31)`

##### random()

> **random**: (`min`, `max`) => `PositiveInt32`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`PositiveInt32`

##### sub()

> **sub**: (`x`, `y`) => `PositiveInt32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt32`

`a - b`, but clamped to `[1, 2^31)`
