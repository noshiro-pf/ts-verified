[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-zero-uint32

# number/branded-types/non-zero-uint32

## Variables

### asNonZeroUint32()

> `const` **asNonZeroUint32**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-zero-uint32.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-uint32.mts#L55)

Casts a number to a NonZeroUint32 type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonZeroUint32 type.

#### Throws

If the value is not a non-zero integer in [1, 2^32).

#### Example

```typescript
const x = asNonZeroUint32(1000); // NonZeroUint32
const y = asNonZeroUint32(4294967295); // NonZeroUint32
// asNonZeroUint32(0); // throws TypeError
// asNonZeroUint32(-1); // throws TypeError
// asNonZeroUint32(4294967296); // throws TypeError
```

---

### isNonZeroUint32()

> `const` **isNonZeroUint32**: (`a`) => `a is PositiveUint32` = `is`

Defined in: [src/number/branded-types/non-zero-uint32.mts:39](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-uint32.mts#L39)

Checks if a number is a NonZeroUint32 (32-bit non-zero unsigned integer in the range [1, 2^32)).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveUint32`

`true` if the value is a NonZeroUint32, `false` otherwise.

---

### NonZeroUint32

> `const` **NonZeroUint32**: `object`

Defined in: [src/number/branded-types/non-zero-uint32.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-uint32.mts#L57)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveUint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint32`

`a + b`, but clamped to `[1, 2^32)`

##### clamp()

> **clamp**: (`x`) => `PositiveUint32`

###### Parameters

###### x

`number`

###### Returns

`PositiveUint32`

##### div()

> **div**: (`x`, `y`) => `PositiveUint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`PositiveUint32`\>

###### Returns

`PositiveUint32`

`⌊a / b⌋`, but clamped to `[1, 2^32)`

##### is()

> **is**: (`a`) => `a is PositiveUint32`

###### Parameters

###### a

`number`

###### Returns

`a is PositiveUint32`

##### max()

> `readonly` **max**: (...`values`) => `PositiveUint32` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveUint32`, `40`\>[]

###### Returns

`PositiveUint32`

##### MAX_VALUE

> **MAX_VALUE**: `number`

`2^32 - 1`

##### min()

> `readonly` **min**: (...`values`) => `PositiveUint32` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveUint32`, `40`\>[]

###### Returns

`PositiveUint32`

##### MIN_VALUE

> **MIN_VALUE**: `1`

`1`

##### mul()

> **mul**: (`x`, `y`) => `PositiveUint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint32`

`a * b`, but clamped to `[1, 2^32)`

##### pow()

> **pow**: (`x`, `y`) => `PositiveUint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint32`

`a ** b`, but clamped to `[1, 2^32)`

##### random()

> **random**: (`min`, `max`) => `PositiveUint32`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`PositiveUint32`

##### sub()

> **sub**: (`x`, `y`) => `PositiveUint32`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveUint32`

`a - b`, but clamped to `[1, 2^32)`
