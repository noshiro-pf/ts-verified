[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/positive-finite-number

# number/branded-types/positive-finite-number

## Variables

### asPositiveFiniteNumber()

> `const` **asPositiveFiniteNumber**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

Defined in: [src/number/branded-types/positive-finite-number.mts:87](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-finite-number.mts#L87)

Casts a number to a PositiveFiniteNumber type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a PositiveFiniteNumber type.

#### Throws

If the value is not a positive finite number.

#### Example

```typescript
const x = asPositiveFiniteNumber(5.5); // PositiveFiniteNumber
const y = asPositiveFiniteNumber(0.001); // PositiveFiniteNumber
// asPositiveFiniteNumber(0); // throws TypeError
// asPositiveFiniteNumber(-1); // throws TypeError
```

---

### isPositiveFiniteNumber()

> `const` **isPositiveFiniteNumber**: (`a`) => `a is PositiveFiniteNumber` = `is`

Defined in: [src/number/branded-types/positive-finite-number.mts:72](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-finite-number.mts#L72)

Checks if a number is a PositiveFiniteNumber (a finite number > 0).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveFiniteNumber`

`true` if the value is a PositiveFiniteNumber, `false` otherwise.

---

### PositiveFiniteNumber

> `const` **PositiveFiniteNumber**: `object`

Defined in: [src/number/branded-types/positive-finite-number.mts:89](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-finite-number.mts#L89)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveFiniteNumber`

###### Parameters

###### x

`PositiveFiniteNumber`

###### y

`PositiveFiniteNumber`

###### Returns

`PositiveFiniteNumber`

`a + b`, but greater than 0

##### ceil()

> **ceil**: (`x`) => `ToInt`\<`PositiveFiniteNumber`\>

###### Parameters

###### x

`PositiveFiniteNumber`

###### Returns

`ToInt`\<`PositiveFiniteNumber`\>

##### clamp()

> **clamp**: (`x`) => `PositiveFiniteNumber`

###### Parameters

###### x

`number`

###### Returns

`PositiveFiniteNumber`

##### div()

> **div**: (`x`, `y`) => `PositiveFiniteNumber`

###### Parameters

###### x

`PositiveFiniteNumber`

###### y

`ToNonZero`\<`PositiveFiniteNumber`\>

###### Returns

`PositiveFiniteNumber`

`a / b`, but greater than 0

##### floor()

> **floor**: (`x`) => `RemoveNonZeroBrandKey`\<`ToInt`\<`PositiveFiniteNumber`\>\>

###### Parameters

###### x

`PositiveFiniteNumber`

###### Returns

`RemoveNonZeroBrandKey`\<`ToInt`\<`PositiveFiniteNumber`\>\>

##### is()

> **is**: (`a`) => `a is PositiveFiniteNumber`

###### Parameters

###### a

`number`

###### Returns

`a is PositiveFiniteNumber`

##### max()

> `readonly` **max**: (...`values`) => `PositiveFiniteNumber` = `max_`

###### Parameters

###### values

...readonly `PositiveFiniteNumber`[]

###### Returns

`PositiveFiniteNumber`

##### min()

> `readonly` **min**: (...`values`) => `PositiveFiniteNumber` = `min_`

###### Parameters

###### values

...readonly `PositiveFiniteNumber`[]

###### Returns

`PositiveFiniteNumber`

##### MIN_VALUE

> **MIN_VALUE**: `number`

`Number.MIN_VALUE`

##### mul()

> **mul**: (`x`, `y`) => `PositiveFiniteNumber`

###### Parameters

###### x

`PositiveFiniteNumber`

###### y

`PositiveFiniteNumber`

###### Returns

`PositiveFiniteNumber`

`a * b`, but greater than 0

##### pow()

> **pow**: (`x`, `y`) => `PositiveFiniteNumber`

###### Parameters

###### x

`PositiveFiniteNumber`

###### y

`PositiveFiniteNumber`

###### Returns

`PositiveFiniteNumber`

`a ** b`, but greater than 0

##### random()

> **random**: (`min`, `max`) => `PositiveFiniteNumber`

###### Parameters

###### min

`PositiveFiniteNumber`

###### max

`PositiveFiniteNumber`

###### Returns

`PositiveFiniteNumber`

##### round()

> **round**: (`x`) => `RemoveNonZeroBrandKey`\<`ToInt`\<`PositiveFiniteNumber`\>\>

###### Parameters

###### x

`PositiveFiniteNumber`

###### Returns

`RemoveNonZeroBrandKey`\<`ToInt`\<`PositiveFiniteNumber`\>\>

##### sub()

> **sub**: (`x`, `y`) => `PositiveFiniteNumber`

###### Parameters

###### x

`PositiveFiniteNumber`

###### y

`PositiveFiniteNumber`

###### Returns

`PositiveFiniteNumber`

`a - b`, but greater than 0
