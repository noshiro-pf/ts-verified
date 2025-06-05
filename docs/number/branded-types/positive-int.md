[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/positive-int

# number/branded-types/positive-int

## Variables

### asPositiveInt()

> `const` **asPositiveInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

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

Defined in: [src/number/branded-types/positive-int.mts:54](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/positive-int.mts#L54)

#### Type declaration

##### add()

> **add**: (`x`, `y`) => `PositiveInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a + b`, but never less than 1

##### clamp()

> **clamp**: (`x`) => `PositiveInt`

###### Parameters

###### x

`number`

###### Returns

`PositiveInt`

##### div()

> **div**: (`x`, `y`) => `PositiveInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`PositiveInt`\>

###### Returns

`PositiveInt`

`⌊a / b⌋`, but never less than 1

##### is()

> **is**: (`a`) => `a is PositiveInt`

###### Parameters

###### a

`number`

###### Returns

`a is PositiveInt`

##### max()

> `readonly` **max**: (...`values`) => `PositiveInt` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt`, `40`\>[]

###### Returns

`PositiveInt`

##### min()

> `readonly` **min**: (...`values`) => `PositiveInt` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`PositiveInt`, `40`\>[]

###### Returns

`PositiveInt`

##### MIN_VALUE

> **MIN_VALUE**: `1`

`1`

##### mul()

> **mul**: (`x`, `y`) => `PositiveInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a * b`, but never less than 1

##### pow()

> **pow**: (`x`, `y`) => `PositiveInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a ** b`, but never less than 1

##### random()

> **random**: (`min`, `max`) => `PositiveInt`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`PositiveInt`

##### sub()

> **sub**: (`x`, `y`) => `PositiveInt`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`PositiveInt`

`a - b`, but never less than 1
