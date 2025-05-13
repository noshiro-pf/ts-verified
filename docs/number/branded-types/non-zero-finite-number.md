[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/non-zero-finite-number

# number/branded-types/non-zero-finite-number

## Variables

### asNonZeroFiniteNumber()

> `const` **asNonZeroFiniteNumber**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/non-zero-finite-number.mts:82](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-finite-number.mts#L82)

Casts a number to a NonZeroFiniteNumber type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a NonZeroFiniteNumber type.

#### Throws

If the value is not a non-zero finite number.

#### Example

```typescript
const x = asNonZeroFiniteNumber(5.5); // NonZeroFiniteNumber
const y = asNonZeroFiniteNumber(-3.2); // NonZeroFiniteNumber
// asNonZeroFiniteNumber(0); // throws TypeError
// asNonZeroFiniteNumber(Infinity); // throws TypeError
```

---

### isNonZeroFiniteNumber()

> `const` **isNonZeroFiniteNumber**: (`a`) => `a is NonZeroFiniteNumber` = `is`

Defined in: [src/number/branded-types/non-zero-finite-number.mts:67](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-finite-number.mts#L67)

Checks if a number is a NonZeroFiniteNumber (a finite number that is not 0).

#### Parameters

##### a

`number`

#### Returns

`a is NonZeroFiniteNumber`

`true` if the value is a NonZeroFiniteNumber, `false` otherwise.

---

### NonZeroFiniteNumber

> `const` **NonZeroFiniteNumber**: `object`

Defined in: [src/number/branded-types/non-zero-finite-number.mts:84](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/non-zero-finite-number.mts#L84)

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`NonZeroFiniteNumber`\>

###### Parameters

###### x

`NonZeroFiniteNumber`

###### Returns

`ToNonNegative`\<`NonZeroFiniteNumber`\>

##### add()

> **add**: (`x`, `y`) => `NonZeroFiniteNumber`

###### Parameters

###### x

`NonZeroFiniteNumber`

###### y

`NonZeroFiniteNumber`

###### Returns

`NonZeroFiniteNumber`

`a + b`

##### ceil()

> **ceil**: (`x`) => `ToInt`\<`NonZeroFiniteNumber`\>

###### Parameters

###### x

`NonZeroFiniteNumber`

###### Returns

`ToInt`\<`NonZeroFiniteNumber`\>

##### div()

> **div**: (`x`, `y`) => `NonZeroFiniteNumber`

###### Parameters

###### x

`NonZeroFiniteNumber`

###### y

`ToNonZero`\<`NonZeroFiniteNumber`\>

###### Returns

`NonZeroFiniteNumber`

`a / b`

##### floor()

> **floor**: (`x`) => `ToInt`\<`NonZeroFiniteNumber`\>

###### Parameters

###### x

`NonZeroFiniteNumber`

###### Returns

`ToInt`\<`NonZeroFiniteNumber`\>

##### is()

> **is**: (`a`) => `a is NonZeroFiniteNumber`

###### Parameters

###### a

`number`

###### Returns

`a is NonZeroFiniteNumber`

##### max()

> `readonly` **max**: (...`values`) => `NonZeroFiniteNumber` = `max_`

###### Parameters

###### values

...readonly `NonZeroFiniteNumber`[]

###### Returns

`NonZeroFiniteNumber`

##### min()

> `readonly` **min**: (...`values`) => `NonZeroFiniteNumber` = `min_`

###### Parameters

###### values

...readonly `NonZeroFiniteNumber`[]

###### Returns

`NonZeroFiniteNumber`

##### mul()

> **mul**: (`x`, `y`) => `NonZeroFiniteNumber`

###### Parameters

###### x

`NonZeroFiniteNumber`

###### y

`NonZeroFiniteNumber`

###### Returns

`NonZeroFiniteNumber`

`a * b`

##### pow()

> **pow**: (`x`, `y`) => `NonZeroFiniteNumber`

###### Parameters

###### x

`NonZeroFiniteNumber`

###### y

`NonZeroFiniteNumber`

###### Returns

`NonZeroFiniteNumber`

`a ** b`

##### random()

> **random**: (`min`, `max`) => `NonZeroFiniteNumber`

###### Parameters

###### min

`NonZeroFiniteNumber`

###### max

`NonZeroFiniteNumber`

###### Returns

`NonZeroFiniteNumber`

##### round()

> **round**: (`x`) => `ToInt`\<`NonZeroFiniteNumber`\>

###### Parameters

###### x

`NonZeroFiniteNumber`

###### Returns

`ToInt`\<`NonZeroFiniteNumber`\>

##### sub()

> **sub**: (`x`, `y`) => `NonZeroFiniteNumber`

###### Parameters

###### x

`NonZeroFiniteNumber`

###### y

`NonZeroFiniteNumber`

###### Returns

`NonZeroFiniteNumber`

`a - b`
