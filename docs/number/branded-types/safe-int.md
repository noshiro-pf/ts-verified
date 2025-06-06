[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/safe-int

# number/branded-types/safe-int

## Variables

### asSafeInt()

> `const` **asSafeInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castType`

Defined in: [src/number/branded-types/safe-int.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-int.mts#L56)

Casts a number to a SafeInt type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as a SafeInt type.

#### Throws

If the value is not a safe integer.

#### Example

```typescript
const x = asSafeInt(5); // SafeInt
const y = asSafeInt(-1000); // SafeInt
// asSafeInt(1.5); // throws TypeError
// asSafeInt(Number.MAX_SAFE_INTEGER + 1); // throws TypeError
```

---

### isSafeInt()

> `const` **isSafeInt**: (`a`) => `a is SafeInt` = `is`

Defined in: [src/number/branded-types/safe-int.mts:41](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-int.mts#L41)

Checks if a number is a SafeInt.

#### Parameters

##### a

`number`

#### Returns

`a is SafeInt`

`true` if the value is a SafeInt, `false` otherwise.

---

### SafeInt

> `const` **SafeInt**: `object`

Defined in: [src/number/branded-types/safe-int.mts:85](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/safe-int.mts#L85)

Namespace providing type-safe arithmetic operations for safe integers.

All operations automatically clamp results to the safe integer range [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER].
This ensures that all arithmetic maintains IEEE 754 precision guarantees, preventing precision loss
that can occur with very large integers in JavaScript.

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`SafeInt`\>

Returns the absolute value of a safe integer.

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`SafeInt`\>

The absolute value as a SafeInt, clamped to safe range.

##### add()

> **add**: (`x`, `y`) => `SafeInt`

Adds two SafeInt values.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a + b` clamped to safe integer range as a SafeInt.

##### clamp()

> **clamp**: (`x`) => `SafeInt`

Clamps a number to the safe integer range.

###### Parameters

###### x

`number`

###### Returns

`SafeInt`

The value clamped to [MIN_SAFE_INTEGER, MAX_SAFE_INTEGER] as a SafeInt.

##### div()

> **div**: (`x`, `y`) => `SafeInt`

Divides one SafeInt by another using floor division.

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`SafeInt`\>

###### Returns

`SafeInt`

`⌊a / b⌋` clamped to safe integer range as a SafeInt.

##### is()

> **is**: (`a`) => `a is SafeInt`

Type guard to check if a value is a SafeInt.

###### Parameters

###### a

`number`

###### Returns

`a is SafeInt`

`true` if the value is a safe integer, `false` otherwise.

##### max()

> `readonly` **max**: (...`values`) => `SafeInt` = `max_`

Returns the larger of two SafeInt values.

###### Parameters

###### values

...readonly `WithSmallInt`\<`SafeInt`, `40`\>[]

###### Returns

`SafeInt`

The maximum value as a SafeInt.

##### MAX_VALUE

> `readonly` **MAX_VALUE**: `SafeUint`

The maximum safe integer value (2^53 - 1).

##### min()

> `readonly` **min**: (...`values`) => `SafeInt` = `min_`

Returns the smaller of two SafeInt values.

###### Parameters

###### values

...readonly `WithSmallInt`\<`SafeInt`, `40`\>[]

###### Returns

`SafeInt`

The minimum value as a SafeInt.

##### MIN_VALUE

> `readonly` **MIN_VALUE**: `SafeInt`

The minimum safe integer value (-(2^53 - 1)).

##### mul()

> **mul**: (`x`, `y`) => `SafeInt`

Multiplies two SafeInt values.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a * b` clamped to safe integer range as a SafeInt.

##### pow()

> **pow**: (`x`, `y`) => `SafeInt`

Raises a SafeInt to the power of another SafeInt.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a ** b` clamped to safe integer range as a SafeInt.

##### random()

> **random**: (`min`, `max`) => `SafeInt`

Generates a random SafeInt value within the safe integer range.

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`SafeInt`

A random SafeInt between MIN_SAFE_INTEGER and MAX_SAFE_INTEGER.

##### sub()

> **sub**: (`x`, `y`) => `SafeInt`

Subtracts one SafeInt from another.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`SafeInt`

`a - b` clamped to safe integer range as a SafeInt.

#### Example

````typescript
const a = asSafeInt(9007199254740000);  // Near MAX_SAFE_INTEGER
const b = asSafeInt(1000);

// Arithmetic operations with automatic clamping
const sum = SafeInt.add(a, b);          // SafeInt (clamped to MAX_SAFE_INTEGER)
const diff = SafeInt.sub(a, b);         // SafeInt (9007199254739000)
const product = SafeInt.mul(a, b);      // SafeInt (clamped to MAX_SAFE_INTEGER)

// Range operations
const clamped = SafeInt.clamp(1e20);        // SafeInt (MAX_SAFE_INTEGER)
const minimum = SafeInt.min(a, b);          // SafeInt (1000)
const maximum = SafeInt.max(a, b);          // SafeInt (a)

// Utility operations
const absolute = SafeInt.abs(asSafeInt(-1000)); // SafeInt (1000)
const random = SafeInt.random();                // SafeInt (random safe integer)
```castType
````
