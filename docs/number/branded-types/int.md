[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/int

# number/branded-types/int

## Variables

### asInt()

> `const` **asInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castType`

Defined in: [src/number/branded-types/int.mts:50](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int.mts#L50)

Casts a number to an Int type.

#### Type Parameters

##### N

`N` _extends_ `number`

#### Parameters

##### x

`N`

#### Returns

`number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N`

The value as an Int type.

#### Throws

If the value is not an integer.

#### Example

```typescript
const x = asInt(5); // Int
const y = asInt(-10); // Int
// asInt(5.5); // throws TypeError
```

---

### Int

> `const` **Int**: `object`

Defined in: [src/number/branded-types/int.mts:79](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int.mts#L79)

Utility functions for working with Int (integer) branded types.
Provides type-safe operations that ensure results remain integers.

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`Int`\>

Returns the absolute value of an integer.

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`Int`\>

The absolute value as an Int

###### Example

```typescript
Int.abs(asInt(-5)); // Int (5)
Int.abs(asInt(3)); // Int (3)
```

##### add()

> **add**: (`x`, `y`) => `Int`

Adds two integers.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a + b` as an Int

###### Example

```typescript
Int.add(asInt(5), asInt(3)); // Int (8)
```

##### div()

> **div**: (`x`, `y`) => `Int`

Divides two integers using floor division.

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`Int`\>

###### Returns

`Int`

`⌊a / b⌋` as an Int

###### Example

```typescript
Int.div(asInt(10), asInt(3)); // Int (3) - floor division
Int.div(asInt(9), asInt(3)); // Int (3)
```

##### is()

> **is**: (`a`) => `a is Int`

Type guard that checks if a value is an integer.

###### Parameters

###### a

`number`

###### Returns

`a is Int`

`true` if the value is an integer, `false` otherwise

##### max()

> `readonly` **max**: (...`values`) => `Int` = `max_`

Returns the maximum of two integers.

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int`, `40`\>[]

###### Returns

`Int`

The larger value as an Int

##### min()

> `readonly` **min**: (...`values`) => `Int` = `min_`

Returns the minimum of two integers.

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int`, `40`\>[]

###### Returns

`Int`

The smaller value as an Int

##### mul()

> **mul**: (`x`, `y`) => `Int`

Multiplies two integers.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a * b` as an Int

###### Example

```typescript
Int.mul(asInt(4), asInt(3)); // Int (12)
```

##### pow()

> **pow**: (`x`, `y`) => `Int`

Raises an integer to a power.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a ** b` as an Int

###### Example

```typescript
Int.pow(asInt(2), asInt(3)); // Int (8)
```

##### random()

> **random**: (`min`, `max`) => `Int`

Generates a random integer.

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`Int`

A random Int value

##### sub()

> **sub**: (`x`, `y`) => `Int`

Subtracts two integers.

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a - b` as an Int

###### Example

```typescript
Int.sub(asInt(8), asInt(3)); // Int (5)
```

#### Example

```typescript
// Type checking
Int.is(5); // true
Int.is(5.5); // false

// Arithmetic operations
const a = asInt(10);
const b = asInt(3);

Int.add(a, b); // Int (13)
Int.sub(a, b); // Int (7)
Int.mul(a, b); // Int (30)
Int.div(a, b); // Int (3) - floor division
Int.pow(a, b); // Int (1000)

// Utility functions
Int.abs(asInt(-5)); // Int (5)
Int.min(a, b); // Int (3)
Int.max(a, b); // Int (10)
Int.random(); // Random Int
```

---

### isInt()

> `const` **isInt**: (`a`) => `a is Int` = `is`

Defined in: [src/number/branded-types/int.mts:36](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int.mts#L36)

Checks if a number is an Int.

#### Parameters

##### a

`number`

#### Returns

`a is Int`

`true` if the value is an Int, `false` otherwise.
