[**Documentation**](../../README.md)

---

[Documentation](../../README.md) / collections/iset-mapped

# collections/iset-mapped

## Namespaces

- [ISetMapped](namespaces/ISetMapped.md)

## Type Aliases

### ISetMapped\<K, KM\>

> **ISetMapped**\<`K`, `KM`\> = `Iterable`\<`K`\> & `Readonly`\<`ISetMappedInterface`\<`K`, `KM`\>\>

Defined in: [src/collections/iset-mapped.mts:223](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/iset-mapped.mts#L223)

Represents an immutable set where elements of type `K` are mapped to an underlying `MapSetKeyType` `KM`.
It is iterable and provides various methods for manipulation and querying.

#### Type Parameters

##### K

`K`

The type of the elements in the set.

##### KM

`KM` _extends_ `MapSetKeyType`

The type of the mapped keys (number or string).

#### Example

```typescript
type User = { id: number; username: string };
const userToKey = (user: User): number => user.id;
const keyToUser = (id: number): User => ({ id, username: `user${id}` }); // Simplified for example

let userSet = ISetMapped.create<User, number>([], userToKey, keyToUser);

userSet = userSet.add({ id: 1, username: 'alice' });
userSet = userSet.add({ id: 2, username: 'bob' });

console.log(userSet.has({ id: 1, username: 'alice' })); // Output: true
console.log(userSet.size); // Output: 2

for (const user of userSet) {
    console.log(user.username);
}
// Output:
// alice
// bob
```
