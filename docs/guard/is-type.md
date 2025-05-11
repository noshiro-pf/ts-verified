[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/is-type

# guard/is-type

## Functions

### isBigint()

> **isBigint**(`a`): `a is bigint`

Defined in: [guard/is-type.mts:16](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L16)

#### Parameters

##### a

`unknown`

#### Returns

`a is bigint`

---

### isBoolean()

> **isBoolean**(`a`): `a is boolean`

Defined in: [guard/is-type.mts:6](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L6)

#### Parameters

##### a

`unknown`

#### Returns

`a is boolean`

---

### isNonNullish()

> **isNonNullish**\<`T`\>(`a`): `a is NonNullable<T>`

Defined in: [guard/is-type.mts:37](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L37)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`

#### Returns

`a is NonNullable<T>`

---

### isNotBigint()

> **isNotBigint**\<`T`\>(`a`): `a is RelaxedExclude<T, bigint>`

Defined in: [guard/is-type.mts:18](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L18)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`

#### Returns

`a is RelaxedExclude<T, bigint>`

---

### isNotBoolean()

> **isNotBoolean**\<`T`\>(`a`): `a is RelaxedExclude<T, boolean>`

Defined in: [guard/is-type.mts:8](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L8)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`

#### Returns

`a is RelaxedExclude<T, boolean>`

---

### isNotNull()

> **isNotNull**\<`T`\>(`a`): `a is T`

Defined in: [guard/is-type.mts:33](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L33)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`null` | `T`

#### Returns

`a is T`

---

### isNotNumber()

> **isNotNumber**\<`T`\>(`a`): `a is RelaxedExclude<T, number>`

Defined in: [guard/is-type.mts:13](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L13)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`

#### Returns

`a is RelaxedExclude<T, number>`

---

### isNotString()

> **isNotString**\<`T`\>(`a`): `a is RelaxedExclude<T, string>`

Defined in: [guard/is-type.mts:23](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L23)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`

#### Returns

`a is RelaxedExclude<T, string>`

---

### isNotSymbol()

> **isNotSymbol**\<`T`\>(`a`): `a is RelaxedExclude<T, symbol>`

Defined in: [guard/is-type.mts:28](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L28)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`

#### Returns

`a is RelaxedExclude<T, symbol>`

---

### isNotUndefined()

> **isNotUndefined**\<`T`\>(`a`): `a is RelaxedExclude<T, undefined>`

Defined in: [guard/is-type.mts:3](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L3)

#### Type Parameters

##### T

`T`

#### Parameters

##### a

`T`

#### Returns

`a is RelaxedExclude<T, undefined>`

---

### isNull()

> **isNull**(`a`): `a is null`

Defined in: [guard/is-type.mts:31](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L31)

#### Parameters

##### a

`unknown`

#### Returns

`a is null`

---

### isNullish()

> **isNullish**(`a`): a is undefined \| null

Defined in: [guard/is-type.mts:35](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L35)

#### Parameters

##### a

`unknown`

#### Returns

a is undefined \| null

---

### isNumber()

> **isNumber**(`a`): `a is number`

Defined in: [guard/is-type.mts:11](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L11)

#### Parameters

##### a

`unknown`

#### Returns

`a is number`

---

### isString()

> **isString**(`a`): `a is string`

Defined in: [guard/is-type.mts:21](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L21)

#### Parameters

##### a

`unknown`

#### Returns

`a is string`

---

### isSymbol()

> **isSymbol**(`a`): `a is symbol`

Defined in: [guard/is-type.mts:26](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L26)

#### Parameters

##### a

`unknown`

#### Returns

`a is symbol`

---

### isUndefined()

> **isUndefined**(`a`): `a is undefined`

Defined in: [guard/is-type.mts:1](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/is-type.mts#L1)

#### Parameters

##### a

`unknown`

#### Returns

`a is undefined`
