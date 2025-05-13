[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/uint32

# number/branded-types/uint32

## Variables

### asUint32()

> `const` **asUint32**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/uint32.mts:53](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint32.mts#L53)

Casts a number to a Uint32 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a Uint32 type.

#### Throws

If the value is not a non-negative integer less than 2^32.

#### Example

```typescript
const x = asUint32(1000000); // Uint32
const y = asUint32(0); // Uint32
// asUint32(-1); // throws TypeError
// asUint32(5000000000); // throws TypeError
```

---

### isUint32()

> `const` **isUint32**: (`a`) => `a is Uint32` = `is`

Defined in: [src/number/branded-types/uint32.mts:38](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint32.mts#L38)

Checks if a number is a Uint32 (32-bit unsigned integer in the range [0, 2^32)).

#### Parameters

##### a

`number`

#### Returns

`a is Uint32`

`true` if the value is a Uint32, `false` otherwise.

---

### Uint32

> `const` **Uint32**: `object`

Defined in: [src/number/branded-types/uint32.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint32.mts#L55)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `Uint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint32`

`a + b`, but clamped to `[0, 2^32)`

##### clamp()

> **clamp**: (`x`) => `Uint32`

###### Parameters

###### x

`number`

###### Returns

`Uint32`

##### div()

> **div**: (`x`, `y`) => `Uint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`Uint32`\>

###### Returns

`Uint32`

`⌊a / b⌋`, but clamped to `[0, 2^32)`

##### is()

> **is**: (`a`) => `a is Uint32`

###### Parameters

###### a

`number`

###### Returns

`a is Uint32`

##### max()

> `readonly` **max**: (...`values`) => `Uint32` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Uint32`, `40`\>[]

###### Returns

`Uint32`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^32 - 1`

##### min()

> `readonly` **min**: (...`values`) => `Uint32` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Uint32`, `40`\>[]

###### Returns

`Uint32`

##### MIN_VALUE

> **MIN_VALUE**: `0`

`0`

##### mul()

> **mul**: (`x`, `y`) => `Uint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint32`

`a * b`, but clamped to `[0, 2^32)`

##### pow()

> **pow**: (`x`, `y`) => `Uint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint32`

`a ** b`, but clamped to `[0, 2^32)`

##### random()

> **random**: (`min`, `max`) => `Uint32`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`Uint32`

##### sub()

> **sub**: (`x`, `y`) => `Uint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Uint32`

`a - b`, but clamped to `[0, 2^32)`
