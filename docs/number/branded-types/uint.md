[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/uint

# number/branded-types/uint

## Variables

### asUint()

> `const` **asUint**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/uint.mts:52](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint.mts#L52)

Casts a number to a Uint type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a Uint type.

#### Throws

If the value is not a non-negative integer.

#### Example

```typescript
const x = asUint(5); // Uint
const y = asUint(0); // Uint
// asUint(-1); // throws TypeError
// asUint(1.5); // throws TypeError
```

---

### isUint()

> `const` **isUint**: (`a`) => `a is NonNegativeInt` = `is`

Defined in: [src/number/branded-types/uint.mts:37](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint.mts#L37)

Checks if a number is a Uint.

#### Parameters

##### a

`number`

#### Returns

`a is NonNegativeInt`

`true` if the value is a Uint, `false` otherwise.

---

### Uint

> `const` **Uint**: `object`

Defined in: [src/number/branded-types/uint.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/uint.mts#L54)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `NonNegativeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt`

`a + b`, but never less than 0

##### clamp()

> **clamp**: (`x`) => `NonNegativeInt`

###### Parameters

###### x

`number`

###### Returns

`NonNegativeInt`

##### div()

> **div**: (`x`, `y`) => `NonNegativeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`NonNegativeInt`\>

###### Returns

`NonNegativeInt`

`⌊a / b⌋`, but never less than 0

##### is()

> **is**: (`a`) => `a is NonNegativeInt`

###### Parameters

###### a

`number`

###### Returns

`a is NonNegativeInt`

##### max()

> `readonly` **max**: (...`values`) => `NonNegativeInt` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonNegativeInt`, `40`\>[]

###### Returns

`NonNegativeInt`

##### min()

> `readonly` **min**: (...`values`) => `NonNegativeInt` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`NonNegativeInt`, `40`\>[]

###### Returns

`NonNegativeInt`

##### MIN_VALUE

> **MIN_VALUE**: `0`

`0`

##### mul()

> **mul**: (`x`, `y`) => `NonNegativeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt`

`a * b`, but never less than 0

##### pow()

> **pow**: (`x`, `y`) => `NonNegativeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt`

`a ** b`, but never less than 0

##### random()

> **random**: (`min`, `max`) => `NonNegativeInt`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`NonNegativeInt`

##### sub()

> **sub**: (`x`, `y`) => `NonNegativeInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`NonNegativeInt`

`a - b`, but never less than 0
