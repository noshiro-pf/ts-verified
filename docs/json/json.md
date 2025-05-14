[**Documentation**](../README.md)

---

[Documentation](../README.md) / json/json

# json/json

## Variables

### Json

> `const` **Json**: `object`

Defined in: [json/json.mts:142](https://github.com/noshiro-pf/ts-verified/blob/main/src/json/json.mts#L142)

A collection of JSON utility functions.

#### Type declaration

##### parse()

> **parse**: (`text`, `reviver?`) => [`Result`](../functional/result/README.md#result)\<`JsonValue`, `string`\>

Converts a JavaScript Object Notation (JSON) string into an object.

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

A `Result` containing the parsed `JsonValue` on success, or an error message string on failure.

###### See

parse

##### stringify()

> **stringify**: (`value`, `replacer?`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

Converts a JavaScript value to a JavaScript Object Notation (JSON) string.

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
return-value JSON text to make it easier to read. Can be a number (up to 10) or a string.

`string` | `1` | `2` | `3` | `4` | `5` | `10` | `6` | `7` | `8` | `9`

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>

A `Result` containing the JSON string on success, or an error message string on failure.

###### See

stringify

##### stringifySelected()

> **stringifySelected**: (`value`, `propertiesToBeSelected?`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

Converts a JavaScript value to a JSON string, including only the specified properties.

Converts a JavaScript value to a JavaScript Object Notation (JSON) string,
including only the specified properties.

###### Parameters

###### value

`unknown`

A JavaScript value, usually an object or array, to be converted.

###### propertiesToBeSelected?

readonly (`string` \| `number`)[]

An array of strings and numbers that acts as an approved list
for selecting the object properties that will be stringified.

###### space?

Adds indentation, white space, and line break characters to the
return-value JSON text to make it easier to read. Can be a number (up to 10) or a string.

`string` | `1` | `2` | `3` | `4` | `5` | `10` | `6` | `7` | `8` | `9`

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>

A `Result` containing the JSON string on success, or an error message string on failure.

###### See

stringifySelected

##### stringifySortedKey()

> **stringifySortedKey**: (`value`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

Converts a JavaScript record to a JSON string with keys sorted alphabetically at all levels.

Converts a JavaScript record to a JSON string with keys sorted alphabetically at all levels.

###### Parameters

###### value

`UnknownRecord`

An `UnknownRecord` to be converted.

###### space?

Adds indentation, white space, and line break characters to the
return-value JSON text to make it easier to read. Can be a number (up to 10) or a string.

`string` | `1` | `2` | `3` | `4` | `5` | `10` | `6` | `7` | `8` | `9`

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>

A `Result` containing the JSON string with sorted keys on success, or an error message string on failure.

###### See

stringifySortedKey
