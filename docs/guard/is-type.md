[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-type

# guard/is-type

## Functions

### isBigint()

> **isBigint**(`u`): `u is bigint`

Defined in: [src/guard/is-type.mts:61](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L61)

Checks if a value is a bigint.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is bigint`

`true` if `u` is a bigint, `false` otherwise.

---

### isBoolean()

> **isBoolean**(`u`): `u is boolean`

Defined in: [src/guard/is-type.mts:25](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L25)

Checks if a value is a boolean.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is boolean`

`true` if `u` is a boolean, `false` otherwise.

---

### isNonNullish()

> **isNonNullish**\<`T`\>(`u`): `u is NonNullable<T>`

Defined in: [src/guard/is-type.mts:141](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L141)

Checks if a value is not `null` or `undefined`.
Acts as a type guard, narrowing `u` to its non-nullable type.

#### Type Parameters

##### T

`T`

The type of the input value.

#### Parameters

##### u

`T`

The value to check.

#### Returns

`u is NonNullable<T>`

`true` if `u` is not `null` and not `undefined`, `false` otherwise.

---

### isNotBigint()

> **isNotBigint**\<`T`\>(`u`): `u is RelaxedExclude<T, bigint>`

Defined in: [src/guard/is-type.mts:70](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L70)

Checks if a value is not a bigint.
Acts as a type guard, excluding `bigint` from the type of `u`.

#### Type Parameters

##### T

`T`

The type of the input value.

#### Parameters

##### u

`T`

The value to check.

#### Returns

`u is RelaxedExclude<T, bigint>`

`true` if `u` is not a bigint, `false` otherwise.

---

### isNotBoolean()

> **isNotBoolean**\<`T`\>(`u`): `u is RelaxedExclude<T, boolean>`

Defined in: [src/guard/is-type.mts:34](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L34)

Checks if a value is not a boolean.
Acts as a type guard, excluding `boolean` from the type of `u`.

#### Type Parameters

##### T

`T`

The type of the input value.

#### Parameters

##### u

`T`

The value to check.

#### Returns

`u is RelaxedExclude<T, boolean>`

`true` if `u` is not a boolean, `false` otherwise.

---

### isNotNull()

> **isNotNull**\<`T`\>(`u`): `u is T`

Defined in: [src/guard/is-type.mts:124](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L124)

Checks if a value is not `null`.
Acts as a type guard, excluding `null` from the type of `u`.

#### Type Parameters

##### T

`T`

The type of the input value (which could be `null`).

#### Parameters

##### u

The value to check.

`null` | `T`

#### Returns

`u is T`

`true` if `u` is not `null`, `false` otherwise.

---

### isNotNumber()

> **isNotNumber**\<`T`\>(`u`): `u is RelaxedExclude<T, number>`

Defined in: [src/guard/is-type.mts:52](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L52)

Checks if a value is not a number.
Acts as a type guard, excluding `number` from the type of `u`.

#### Type Parameters

##### T

`T`

The type of the input value.

#### Parameters

##### u

`T`

The value to check.

#### Returns

`u is RelaxedExclude<T, number>`

`true` if `u` is not a number, `false` otherwise.

---

### isNotString()

> **isNotString**\<`T`\>(`u`): `u is RelaxedExclude<T, string>`

Defined in: [src/guard/is-type.mts:88](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L88)

Checks if a value is not a string.
Acts as a type guard, excluding `string` from the type of `u`.

#### Type Parameters

##### T

`T`

The type of the input value.

#### Parameters

##### u

`T`

The value to check.

#### Returns

`u is RelaxedExclude<T, string>`

`true` if `u` is not a string, `false` otherwise.

---

### isNotSymbol()

> **isNotSymbol**\<`T`\>(`u`): `u is RelaxedExclude<T, symbol>`

Defined in: [src/guard/is-type.mts:106](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L106)

Checks if a value is not a symbol.
Acts as a type guard, excluding `symbol` from the type of `u`.

#### Type Parameters

##### T

`T`

The type of the input value.

#### Parameters

##### u

`T`

The value to check.

#### Returns

`u is RelaxedExclude<T, symbol>`

`true` if `u` is not a symbol, `false` otherwise.

---

### isNotUndefined()

> **isNotUndefined**\<`T`\>(`u`): `u is RelaxedExclude<T, undefined>`

Defined in: [src/guard/is-type.mts:16](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L16)

Checks if a value is not `undefined`.
Acts as a type guard, excluding `undefined` from the type of `u`.

#### Type Parameters

##### T

`T`

The type of the input value.

#### Parameters

##### u

`T`

The value to check.

#### Returns

`u is RelaxedExclude<T, undefined>`

`true` if `u` is not `undefined`, `false` otherwise.

---

### isNull()

> **isNull**(`u`): `u is null`

Defined in: [src/guard/is-type.mts:115](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L115)

Checks if a value is `null`.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is null`

`true` if `u` is `null`, `false` otherwise.

---

### isNullish()

> **isNullish**(`u`): u is undefined \| null

Defined in: [src/guard/is-type.mts:132](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L132)

Checks if a value is `null` or `undefined`.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

u is undefined \| null

`true` if `u` is `null` or `undefined`, `false` otherwise.

---

### isNumber()

> **isNumber**(`u`): `u is number`

Defined in: [src/guard/is-type.mts:43](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L43)

Checks if a value is a number.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is number`

`true` if `u` is a number, `false` otherwise.

---

### isString()

> **isString**(`u`): `u is string`

Defined in: [src/guard/is-type.mts:79](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L79)

Checks if a value is a string.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is string`

`true` if `u` is a string, `false` otherwise.

---

### isSymbol()

> **isSymbol**(`u`): `u is symbol`

Defined in: [src/guard/is-type.mts:97](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L97)

Checks if a value is a symbol.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is symbol`

`true` if `u` is a symbol, `false` otherwise.

---

### isUndefined()

> **isUndefined**(`u`): `u is undefined`

Defined in: [src/guard/is-type.mts:7](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L7)

Checks if a value is `undefined`.
Acts as a type guard.

#### Parameters

##### u

`unknown`

The value to check.

#### Returns

`u is undefined`

`true` if `u` is `undefined`, `false` otherwise.
