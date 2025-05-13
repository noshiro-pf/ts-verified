[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/key-is-in

# guard/key-is-in

## Functions

### keyIsIn()

> **keyIsIn**\<`K`, `R`\>(`key`, `obj`): `key is K & keyof R`

Defined in: [src/guard/key-is-in.mts:30](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/key-is-in.mts#L30)

Checks if a key exists as an own property in an object.
Internally, it behaves the same as `Object.hasOwn`, but it's a type guard function for the key, not the object.
This narrows the type of `key` to be a key of `obj`.

#### Type Parameters

##### K

`K` _extends_ `PropertyKey`

The type of the key.

##### R

`R` _extends_ `UnknownRecord`

The type of the record (object).

#### Parameters

##### key

`K`

The key to check for.

##### obj

`R`

The object to check within.

#### Returns

`key is K & keyof R`

`true` if `key` is an own property of `obj`, `false` otherwise.

#### Example

```typescript
const obj = { a: 1, b: 2, c: 3 };
const key: string = 'b';

if (keyIsIn(key, obj)) {
    // key is now typed as 'a' | 'b' | 'c'
    const value = obj[key]; // type-safe access
    console.log(value); // 2
}

// Works with unknown keys
const unknownKey = 'd';
if (keyIsIn(unknownKey, obj)) {
    // This block won't execute
} else {
    console.log('Key not found');
}
```
