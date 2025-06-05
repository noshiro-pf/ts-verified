[**Documentation**](../README.md)

---

[Documentation](../README.md) / json/json

# json/json

## Variables

### Json

> `const` **Json**: `object`

Defined in: [src/json/json.mts:201](https://github.com/noshiro-pf/ts-verified/blob/main/src/json/json.mts#L201)

A collection of JSON utility functions.

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

A `Result` containing the parsed `JsonValue` on success, or an error message string on failure.

###### Examples

```typescript
const result = Json.parse('{"name": "John", "age": 30}');
if (Result.isOk(result)) {
    console.log(result.value); // { name: 'John', age: 30 }
}

const invalid = Json.parse('invalid json');
if (Result.isErr(invalid)) {
    console.log(invalid.value); // SyntaxError message
}
```

```typescript
const dateReviver = (key: string, value: unknown): unknown => {
    if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/.test(value)) {
        return new Date(value);
    }
    return value;
};

const result = Json.parseWithReviver(
    '{"date": "2023-01-01T00:00:00Z"}',
    dateReviver,
);
```

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
return-value JSON text to make it easier to read. Can be a number (up to 10) or a string.

`string` | `1` | `2` | `3` | `4` | `5` | `10` | `6` | `7` | `8` | `9`

###### Returns

[`Result`](../functional/result/README.md#result)\<`string`, `string`\>

A `Result` containing the JSON string on success, or an error message string on failure.

###### Example

```typescript
const obj = { name: 'John', age: 30 };
const result = Json.stringify(obj);
if (Result.isOk(result)) {
    console.log(result.value); // '{"name":"John","age":30}'
}

// With formatting
const formatted = Json.stringify(obj, null, 2);
if (Result.isOk(formatted)) {
    console.log(formatted.value);
    // {
    //   "name": "John",
    //   "age": 30
    // }
}

// Circular reference error
const circular: any = { a: 1 };
circular.self = circular;
const error = Json.stringify(circular);
if (Result.isErr(error)) {
    console.log(error.value); // TypeError message
}
```

##### stringifySelected()

> **stringifySelected**: (`value`, `propertiesToBeSelected?`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

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

##### stringifySortedKey()

> **stringifySortedKey**: (`value`, `space?`) => [`Result`](../functional/result/README.md#result)\<`string`, `string`\>

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
