[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/finite-number

# number/branded-types/finite-number

## Variables

### asFiniteNumber()

> `const` **asFiniteNumber**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castType`

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

Defined in: [src/number/branded-types/finite-number.mts:108](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/finite-number.mts#L108)

Utility functions for working with FiniteNumber branded types.
Provides type-safe operations that ensure results remain finite numbers (not NaN or Infinity).
All operations preserve the finite property of the input values.

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`FiniteNumber`\>

Returns the absolute value of a finite number.

###### Parameters

###### x

`FiniteNumber`

The finite number to get the absolute value of

###### Returns

`ToNonNegative`\<`FiniteNumber`\>

The absolute value as a FiniteNumber

###### Example

```typescript
FiniteNumber.abs(asFiniteNumber(-5.5)); // FiniteNumber (5.5)
FiniteNumber.abs(asFiniteNumber(3.2)); // FiniteNumber (3.2)
```

##### add()

> **add**: (`x`, `y`) => `FiniteNumber`

Adds two finite numbers.

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a + b` as a FiniteNumber

###### Example

```typescript
FiniteNumber.add(asFiniteNumber(5.5), asFiniteNumber(3.2)); // FiniteNumber (8.7)
```

##### ceil()

> **ceil**: (`x`) => `ToInt`\<`FiniteNumber`\>

Returns the smallest integer greater than or equal to the given finite number.

###### Parameters

###### x

`FiniteNumber`

The finite number to ceil

###### Returns

`ToInt`\<`FiniteNumber`\>

The ceiling value as an Int

###### Example

```typescript
FiniteNumber.ceil(asFiniteNumber(5.2)); // Int (6)
FiniteNumber.ceil(asFiniteNumber(-5.8)); // Int (-5)
```

##### div()

> **div**: (`x`, `y`) => `FiniteNumber`

Divides two finite numbers.

###### Parameters

###### x

`FiniteNumber`

###### y

`ToNonZero`\<`FiniteNumber`\>

###### Returns

`FiniteNumber`

`a / b` as a FiniteNumber

###### Example

```typescript
FiniteNumber.div(asFiniteNumber(11), asFiniteNumber(2)); // FiniteNumber (5.5)
```

##### floor()

> **floor**: (`x`) => `ToInt`\<`FiniteNumber`\>

Returns the largest integer less than or equal to the given finite number.

###### Parameters

###### x

`FiniteNumber`

The finite number to floor

###### Returns

`ToInt`\<`FiniteNumber`\>

The floor value as an Int

###### Example

```typescript
FiniteNumber.floor(asFiniteNumber(5.8)); // Int (5)
FiniteNumber.floor(asFiniteNumber(-5.2)); // Int (-6)
```

##### is()

> **is**: (`a`) => `a is FiniteNumber`

Type guard that checks if a value is a finite number (not NaN or Infinity).

###### Parameters

###### a

`number`

###### Returns

`a is FiniteNumber`

`true` if the value is finite, `false` otherwise

##### max()

> `readonly` **max**: (...`values`) => `FiniteNumber` = `max_`

Returns the maximum of multiple finite numbers.

###### Parameters

###### values

...readonly `FiniteNumber`[]

The finite numbers to compare

###### Returns

`FiniteNumber`

The largest value as a FiniteNumber

##### min()

> `readonly` **min**: (...`values`) => `FiniteNumber` = `min_`

Returns the minimum of multiple finite numbers.

###### Parameters

###### values

...readonly `FiniteNumber`[]

The finite numbers to compare

###### Returns

`FiniteNumber`

The smallest value as a FiniteNumber

##### mul()

> **mul**: (`x`, `y`) => `FiniteNumber`

Multiplies two finite numbers.

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a * b` as a FiniteNumber

###### Example

```typescript
FiniteNumber.mul(asFiniteNumber(5.5), asFiniteNumber(2)); // FiniteNumber (11)
```

##### pow()

> **pow**: (`x`, `y`) => `FiniteNumber`

Raises a finite number to a power.

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a ** b` as a FiniteNumber

###### Example

```typescript
FiniteNumber.pow(asFiniteNumber(2.5), asFiniteNumber(3)); // FiniteNumber (15.625)
```

##### random()

> **random**: (`min`, `max`) => `FiniteNumber`

Generates a random finite number.

###### Parameters

###### min

`FiniteNumber`

###### max

`FiniteNumber`

###### Returns

`FiniteNumber`

A random FiniteNumber value

##### round()

> **round**: (`x`) => `ToInt`\<`FiniteNumber`\>

Rounds a finite number to the nearest integer.

###### Parameters

###### x

`FiniteNumber`

The finite number to round

###### Returns

`ToInt`\<`FiniteNumber`\>

The rounded value as an Int

###### Example

```typescript
FiniteNumber.round(asFiniteNumber(5.4)); // Int (5)
FiniteNumber.round(asFiniteNumber(5.6)); // Int (6)
FiniteNumber.round(asFiniteNumber(5.5)); // Int (6)
```

##### sub()

> **sub**: (`x`, `y`) => `FiniteNumber`

Subtracts two finite numbers.

###### Parameters

###### x

`FiniteNumber`

###### y

`FiniteNumber`

###### Returns

`FiniteNumber`

`a - b` as a FiniteNumber

###### Example

```typescript
FiniteNumber.sub(asFiniteNumber(8.7), asFiniteNumber(3.2)); // FiniteNumber (5.5)
```

#### Example

```typescript
// Type checking
FiniteNumber.is(5.5); // true
FiniteNumber.is(Infinity); // false
FiniteNumber.is(NaN); // false

// Arithmetic operations
const a = asFiniteNumber(10.5);
const b = asFiniteNumber(3.2);

FiniteNumber.add(a, b); // FiniteNumber (13.7)
FiniteNumber.sub(a, b); // FiniteNumber (7.3)
FiniteNumber.mul(a, b); // FiniteNumber (33.6)
FiniteNumber.div(a, b); // FiniteNumber (3.28125)
FiniteNumber.pow(a, b); // FiniteNumber (a^b)

// Utility functions
FiniteNumber.abs(asFiniteNumber(-5.5)); // FiniteNumber (5.5)
FiniteNumber.min(a, b); // FiniteNumber (3.2)
FiniteNumber.max(a, b); // FiniteNumber (10.5)

// Rounding operations (return Int)
FiniteNumber.floor(asFiniteNumber(5.8)); // Int (5)
FiniteNumber.ceil(asFiniteNumber(5.2)); // Int (6)
FiniteNumber.round(asFiniteNumber(5.4)); // Int (5)
FiniteNumber.round(asFiniteNumber(5.6)); // Int (6)

FiniteNumber.random(); // Random FiniteNumber
```

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
