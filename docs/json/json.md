[**Documentation**](../README.md)

---

[Documentation](../README.md) / json/json

# json/json

## Variables

### Json

> `const` **Json**: `object`

Defined in: [json/json.mts:113](https://github.com/noshiro-pf/ts-verified/blob/main/src/json/json.mts#L113)

#### Type declaration

##### parse()

> **parse**: (`text`, `reviver?`) => [`Result`](../functional/result/README.md#result)\<`JsonValue`, `string`\>

Converts a JavaScript Object Notation (JSON) string into an object.

###### Parameters

###### text

`string`

A valid JSON string.

###### reviver?

(`this`, `key`, `value`) => `unknown`

A function that transforms the results. This function is
called for each member of the object. If a member contains nested objects,
the nested objects are transformed before the parent object is.

###### Returns

[`Result`](../functional/result/README.md#result)\<`JsonValue`, `string`\>

##### stringify()

> **stringify**: (`value`, `replacer?`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

###### Parameters

###### value

`unknown`

A JavaScript value, usually an object or array, to be converted.

###### replacer?

(`this`, `key`, `val`) => `unknown`

A function that transforms the results.

###### space?

Adds indentation, white space, and line break characters to the
return-value JSON text to make it easier to read.

`string` | `1` | `2` | `3` | `4` | `5` | `10` | `6` | `7` | `8` | `9`

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>

##### stringifySelected()

> **stringifySelected**: (`value`, `propertiesToBeSelected?`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

###### Parameters

###### value

`unknown`

A JavaScript value, usually an object or array, to be converted.

###### propertiesToBeSelected?

readonly (`string` \| `number`)[]

###### space?

Adds indentation, white space, and line break characters to the
return-value JSON text to make it easier to read.

`string` | `1` | `2` | `3` | `4` | `5` | `10` | `6` | `7` | `8` | `9`

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>

##### stringifySortedKey()

> **stringifySortedKey**: (`value`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

###### Parameters

###### value

`UnknownRecord`

###### space?

`string` | `1` | `2` | `3` | `4` | `5` | `10` | `6` | `7` | `8` | `9`

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>
