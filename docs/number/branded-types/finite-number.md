[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/finite-number

# number/branded-types/finite-number

## Variables

### asFiniteNumber()

> `const` **asFiniteNumber**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/finite-number.mts:70](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/finite-number.mts#L70)

Casts a number to a FiniteNumber type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a FiniteNumber type.

#### Throws

If the value is not a finite number (NaN or Infinity).

#### Example

```typescript
const x = asFiniteNumber(5.5); // FiniteNumber
const y = asFiniteNumber(-10); // FiniteNumber
// asFiniteNumber(Infinity); // throws TypeError
// asFiniteNumber(NaN); // throws TypeError
```

---

### FiniteNumber

> `const` **FiniteNumber**: `object`

Defined in: [src/number/branded-types/finite-number.mts:76](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/finite-number.mts#L76)

Utility functions for working with FiniteNumber branded types.
Provides type-safe operations that ensure results remain finite numbers.

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`FiniteNumber`\>

###### Parameters

###### x

`FiniteNumber`

###### Returns

`ToNonNegative`\<`FiniteNumber`\>

##### add()

> **add**: (`x`, `y`) => `FiniteNumber`

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a + b`

##### ceil()

> **ceil**: (`x`) => `ToInt`\<`FiniteNumber`\>

###### Parameters

###### x

`FiniteNumber`

###### Returns

`ToInt`\<`FiniteNumber`\>

##### div()

> **div**: (`x`, `y`) => `FiniteNumber`

###### Parameters

###### x

`FiniteNumber`

###### y

`ToNonZero`\<`FiniteNumber`\>

###### Returns

`FiniteNumber`

`a / b`

##### floor()

> **floor**: (`x`) => `ToInt`\<`FiniteNumber`\>

###### Parameters

###### x

`FiniteNumber`

###### Returns

`ToInt`\<`FiniteNumber`\>

##### is()

> **is**: (`a`) => `a is FiniteNumber`

###### Parameters

###### a

`number`

###### Returns

`a is FiniteNumber`

##### max()

> `readonly` **max**: (...`values`) => `FiniteNumber` = `max_`

###### Parameters

###### values

...readonly `FiniteNumber`[]

###### Returns

`FiniteNumber`

##### min()

> `readonly` **min**: (...`values`) => `FiniteNumber` = `min_`

###### Parameters

###### values

...readonly `FiniteNumber`[]

###### Returns

`FiniteNumber`

##### mul()

> **mul**: (`x`, `y`) => `FiniteNumber`

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a * b`

##### pow()

> **pow**: (`x`, `y`) => `FiniteNumber`

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a ** b`

##### random()

> **random**: (`min`, `max`) => `FiniteNumber`

###### Parameters

###### min

`FiniteNumber`

###### max

`FiniteNumber`

###### Returns

`FiniteNumber`

##### round()

> **round**: (`x`) => `ToInt`\<`FiniteNumber`\>

###### Parameters

###### x

`FiniteNumber`

###### Returns

`ToInt`\<`FiniteNumber`\>

##### sub()

> **sub**: (`x`, `y`) => `FiniteNumber`

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a - b`

---

### isFiniteNumber()

> `const` **isFiniteNumber**: (`a`) => `a is FiniteNumber` = `is`

Defined in: [src/number/branded-types/finite-number.mts:55](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/finite-number.mts#L55)

Checks if a number is a FiniteNumber.

#### Parameters

##### a

`number`

#### Returns

`a is FiniteNumber`

`true` if the value is a FiniteNumber, `false` otherwise.
