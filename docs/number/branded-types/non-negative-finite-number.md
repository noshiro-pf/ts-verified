[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-negative-finite-number

# number/branded-types/non-negative-finite-number

## Variables

### asNonNegativeFiniteNumber()

> `const` **asNonNegativeFiniteNumber**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-negative-finite-number.mts:73](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-finite-number.mts#L73)

Casts a number to a NonNegativeFiniteNumber type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonNegativeFiniteNumber type.

#### Throws

If the value is not a non-negative finite number.

#### Example

```typescript
const x = asNonNegativeFiniteNumber(5.5); // NonNegativeFiniteNumber
const y = asNonNegativeFiniteNumber(0); // NonNegativeFiniteNumber
// asNonNegativeFiniteNumber(-1); // throws TypeError
// asNonNegativeFiniteNumber(Infinity); // throws TypeError
```

---

### isNonNegativeFiniteNumber()

> `const` **isNonNegativeFiniteNumber**: (`a`) => `a is NonNegativeFiniteNumber` = `is`

Defined in: [src/number/branded-types/non-negative-finite-number.mts:58](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-finite-number.mts#L58)

Checks if a number is a NonNegativeFiniteNumber (a finite number >= 0).

#### Parameters

##### a

`number`

#### Returns

`a is NonNegativeFiniteNumber`

`true` if the value is a NonNegativeFiniteNumber, `false` otherwise.

---

### NonNegativeFiniteNumber

> `const` **NonNegativeFiniteNumber**: `object`

Defined in: [src/number/branded-types/non-negative-finite-number.mts:75](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-negative-finite-number.mts#L75)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `NonNegativeFiniteNumber`

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### y

`NonNegativeFiniteNumber`

###### Returns

`NonNegativeFiniteNumber`

`a + b`, but never less than 0

##### ceil()

> **ceil**: (`x`) => `ToInt`\<`NonNegativeFiniteNumber`\>

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### Returns

`ToInt`\<`NonNegativeFiniteNumber`\>

##### clamp()

> **clamp**: (`x`) => `NonNegativeFiniteNumber`

###### Parameters

###### x

`number`

###### Returns

`NonNegativeFiniteNumber`

##### div()

> **div**: (`x`, `y`) => `NonNegativeFiniteNumber`

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### y

`ToNonZero`\<`NonNegativeFiniteNumber`\>

###### Returns

`NonNegativeFiniteNumber`

`a / b`, but never less than 0

##### floor()

> **floor**: (`x`) => `ToInt`\<`NonNegativeFiniteNumber`\>

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### Returns

`ToInt`\<`NonNegativeFiniteNumber`\>

##### is()

> **is**: (`a`) => `a is NonNegativeFiniteNumber`

###### Parameters

###### a

`number`

###### Returns

`a is NonNegativeFiniteNumber`

##### max()

> `readonly` **max**: (...`values`) => `NonNegativeFiniteNumber` = `max_`

###### Parameters

###### values

...readonly `NonNegativeFiniteNumber`[]

###### Returns

`NonNegativeFiniteNumber`

##### min()

> `readonly` **min**: (...`values`) => `NonNegativeFiniteNumber` = `min_`

###### Parameters

###### values

...readonly `NonNegativeFiniteNumber`[]

###### Returns

`NonNegativeFiniteNumber`

##### MIN_VALUE

> **MIN_VALUE**: `0`

`0`

##### mul()

> **mul**: (`x`, `y`) => `NonNegativeFiniteNumber`

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### y

`NonNegativeFiniteNumber`

###### Returns

`NonNegativeFiniteNumber`

`a * b`, but never less than 0

##### pow()

> **pow**: (`x`, `y`) => `NonNegativeFiniteNumber`

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### y

`NonNegativeFiniteNumber`

###### Returns

`NonNegativeFiniteNumber`

`a ** b`, but never less than 0

##### random()

> **random**: (`min`, `max`) => `NonNegativeFiniteNumber`

###### Parameters

###### min

`NonNegativeFiniteNumber`

###### max

`NonNegativeFiniteNumber`

###### Returns

`NonNegativeFiniteNumber`

##### round()

> **round**: (`x`) => `ToInt`\<`NonNegativeFiniteNumber`\>

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### Returns

`ToInt`\<`NonNegativeFiniteNumber`\>

##### sub()

> **sub**: (`x`, `y`) => `NonNegativeFiniteNumber`

###### Parameters

###### x

`NonNegativeFiniteNumber`

###### y

`NonNegativeFiniteNumber`

###### Returns

`NonNegativeFiniteNumber`

`a - b`, but never less than 0
