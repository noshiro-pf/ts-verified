[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / number/branded-types/int

# number/branded-types/int

## Variables

### asInt()

> `const` **asInt**: \<`N`\>(`x`) => `number` & `object` & `Readonly`\<\{ `TSTypeForgeInternals--edd2f9ce-7ca5-45b0-9d1a-bd61b9b5d9c3`: `unknown`; \}\> & `N` = `castTo`

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

Defined in: [src/number/branded-types/int.mts:56](https://github.com/noshiro-pf/ts-verified/blob/main/src/number/branded-types/int.mts#L56)

Utility functions for working with Int (integer) branded types.
Provides type-safe operations that ensure results remain integers.

#### Type declaration

##### abs()

> **abs**: (`x`) => `ToNonNegative`\<`Int`\>

###### Parameters

###### x

`WithSmallInt`

###### Returns

`ToNonNegative`\<`Int`\>

##### add()

> **add**: (`x`, `y`) => `Int`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a + b`

##### div()

> **div**: (`x`, `y`) => `Int`

###### Parameters

###### x

`WithSmallInt`

###### y

`ToNonZeroIntWithSmallInt`\<`Int`\>

###### Returns

`Int`

`⌊a / b⌋`

##### is()

> **is**: (`a`) => `a is Int`

###### Parameters

###### a

`number`

###### Returns

`a is Int`

##### max()

> `readonly` **max**: (...`values`) => `Int` = `max_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int`, `40`\>[]

###### Returns

`Int`

##### min()

> `readonly` **min**: (...`values`) => `Int` = `min_`

###### Parameters

###### values

...readonly `WithSmallInt`\<`Int`, `40`\>[]

###### Returns

`Int`

##### mul()

> **mul**: (`x`, `y`) => `Int`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a * b`

##### pow()

> **pow**: (`x`, `y`) => `Int`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a ** b`

##### random()

> **random**: (`min`, `max`) => `Int`

###### Parameters

###### min

`WithSmallInt`

###### max

`WithSmallInt`

###### Returns

`Int`

##### sub()

> **sub**: (`x`, `y`) => `Int`

###### Parameters

###### x

`WithSmallInt`

###### y

`WithSmallInt`

###### Returns

`Int`

`a - b`

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
