[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/positive-int

# number/branded-types/positive-int

## Variables

### asPositiveInt()

> `const` **asPositiveInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castType`

Defined in: [src/number/branded-types/positive-int.mts:52](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int.mts#L52)

Casts a number to a PositiveInt type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a PositiveInt type.

#### Throws

If the value is not a positive integer.

#### Example

```typescript
const x = asPositiveInt(5); // PositiveInt
const y = asPositiveInt(100); // PositiveInt
// asPositiveInt(0); // throws TypeError
// asPositiveInt(-1); // throws TypeError
```

---

### isPositiveInt()

> `const` **isPositiveInt**: (`a`) => `a is PositiveInt` = `is`

Defined in: [src/number/branded-types/positive-int.mts:37](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int.mts#L37)

Checks if a number is a PositiveInt (a positive integer >= 1).

#### Parameters

##### a

`number`

#### Returns

`a is PositiveInt`

`true` if the value is a PositiveInt, `false` otherwise.

---

### PositiveInt

> `const` **PositiveInt**: `object`

Defined in: [src/number/branded-types/positive-int.mts:87](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int.mts#L87)

Utility functions for working with PositiveInt (positive integer) branded types.
Provides type-safe operations that ensure results remain positive integers (>= 1).
All arithmetic operations are clamped to maintain the positive constraint.

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveInt`

Adds two positive integers, ensuring the result is never less than 1.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a + b` as a PositiveInt, but never less than 1

###### Example

```typescript
PositiveInt.add(asPositiveInt(5), asPositiveInt(3)); // PositiveInt (8)
```

##### clamp()

> **clamp**: (`x`) => `PositiveInt`

Clamps a positive integer to be within the specified range.

###### Parameters

###### x

`number`

###### Returns

`PositiveInt`

The clamped value as a PositiveInt

###### Example

```typescript
PositiveInt.clamp(asPositiveInt(15), asPositiveInt(5), asPositiveInt(10)); // PositiveInt (10)
PositiveInt.clamp(asPositiveInt(2), asPositiveInt(5), asPositiveInt(10)); // PositiveInt (5)
```

##### div()

> **div**: (`x`, `y`) => `PositiveInt`

Divides two positive integers using floor division, ensuring the result is never less than 1.

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`PositiveInt`\>

###### Returns

`PositiveInt`

`⌊a / b⌋` as a PositiveInt, but never less than 1 (clamped)

###### Example

```typescript
PositiveInt.div(asPositiveInt(10), asPositiveInt(3)); // PositiveInt (3)
PositiveInt.div(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (1) - clamped
```

##### is()

> **is**: (`a`) => `a is PositiveInt`

Type guard that checks if a value is a positive integer (>= 1).

###### Parameters

###### a

`number`

###### Returns

`a is PositiveInt`

`true` if the value is a positive integer, `false` otherwise

##### max()

> `readonly` **max**: (...`values`) => `PositiveInt` = `max_`

Returns the maximum of two positive integers.

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt`, `40`\>[]

###### Returns

`PositiveInt`

The larger value as a PositiveInt

##### min()

> `readonly` **min**: (...`values`) => `PositiveInt` = `min_`

Returns the minimum of two positive integers.

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt`, `40`\>[]

###### Returns

`PositiveInt`

The smaller value as a PositiveInt

##### MIN_VALUE

> `readonly` **MIN_VALUE**: `1`

The minimum value for a PositiveInt.

##### mul()

> **mul**: (`x`, `y`) => `PositiveInt`

Multiplies two positive integers, ensuring the result is never less than 1.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a * b` as a PositiveInt, but never less than 1

###### Example

```typescript
PositiveInt.mul(asPositiveInt(4), asPositiveInt(3)); // PositiveInt (12)
```

##### pow()

> **pow**: (`x`, `y`) => `PositiveInt`

Raises a positive integer to a power, ensuring the result is never less than 1.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a ** b` as a PositiveInt, but never less than 1

###### Example

```typescript
PositiveInt.pow(asPositiveInt(2), asPositiveInt(3)); // PositiveInt (8)
```

##### random()

> **random**: (`min`, `max`) => `PositiveInt`

Generates a random positive integer.

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`PositiveInt`

A random PositiveInt value

##### sub()

> **sub**: (`x`, `y`) => `PositiveInt`

Subtracts two positive integers, ensuring the result is never less than 1.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a - b` as a PositiveInt, but never less than 1 (clamped)

###### Example

```typescript
PositiveInt.sub(asPositiveInt(8), asPositiveInt(3)); // PositiveInt (5)
PositiveInt.sub(asPositiveInt(3), asPositiveInt(8)); // PositiveInt (1) - clamped
```

#### Example

```typescript
// Type checking
PositiveInt.is(5); // true
PositiveInt.is(0); // false
PositiveInt.is(-1); // false

// Using MIN_VALUE
console.log(PositiveInt.MIN_VALUE); // 1

// Arithmetic operations (all results clamped to >= 1)
const a = asPositiveInt(10);
const b = asPositiveInt(3);

PositiveInt.add(a, b); // PositiveInt (13)
PositiveInt.sub(a, b); // PositiveInt (7)
PositiveInt.sub(b, a); // PositiveInt (1) - clamped
PositiveInt.mul(a, b); // PositiveInt (30)
PositiveInt.div(a, b); // PositiveInt (3)
PositiveInt.pow(a, b); // PositiveInt (1000)

// Utility functions
PositiveInt.min(a, b); // PositiveInt (3)
PositiveInt.max(a, b); // PositiveInt (10)
PositiveInt.clamp(asPositiveInt(15), asPositiveInt(5), asPositiveInt(10)); // PositiveInt (10)
PositiveInt.random(); // Random PositiveInt
```
