[**Documentation**](../README.md)

---

[Documentation](../README.md) / guard/has-key

# guard/has-key

## Functions

### hasKey()

> **hasKey**\<`R`, `K`\>(`obj`, `key`): `obj is HasKeyReturnType<R, K>`

Defined in: [src/guard/has-key.mts:43](https://github.com/noshiro-pf/ts-verified/blob/main/src/guard/has-key.mts#L43)

Type guard function that checks if an object has a specific key.

This function uses `Object.hasOwn()` to check if the given object has the specified key
as its own property (not inherited). It acts as a type guard, narrowing the type of the
object to include the specified key with an `unknown` value type.

#### Type Parameters

##### R

`R` _extends_ `UnknownRecord`

The type of the input object, must extend UnknownRecord

##### K

`K` _extends_ `PropertyKey`

The type of the key to check for, must extend PropertyKey

#### Parameters

##### obj

`R`

The object to check for the presence of the key

##### key

`K`

The key to check for in the object

#### Returns

`obj is HasKeyReturnType<R, K>`

A boolean indicating whether the object has the specified key as its own property.
When true, TypeScript will narrow the type to `R & Record<K, unknown>`

#### Examples

```typescript
const obj = { a: 1, b: 'hello' };

if (hasKey(obj, 'a')) {
    // obj is now typed as { a: 1, b: 'hello' } & Record<'a', unknown>
    console.log(obj.a); // TypeScript knows 'a' exists
}

if (hasKey(obj, 'c')) {
    // This block won't execute, but if it did:
    // obj would be typed as { a: 1, b: 'hello' } & Record<'c', unknown>
    console.log(obj.c); // TypeScript would know 'c' exists
}
```

```typescript
// Working with dynamic keys
const dynamicObj: Record<string, unknown> = { x: 10, y: 20 };
const keyToCheck = 'x' as const;

if (hasKey(dynamicObj, keyToCheck)) {
    // dynamicObj is now typed to include the specific key
    console.log(dynamicObj.x); // Safe access
}
```
