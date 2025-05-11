[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/imap

# collections/imap

## Type Aliases

### IMap\<K, V\>

> **IMap**\<`K`, `V`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `Readonly`\<`IMapInterface`\<`K`, `V`\>\>

Defined in: [collections/imap.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L57)

#### Type Parameters

##### K

`K`

##### V

`V`

## Variables

### IMap

> **IMap**: `object`

Defined in: [collections/imap.mts:57](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap.mts#L57)

#### Type declaration

##### equal()

> **equal**: \<`K`, `V`\>(`a`, `b`) => `boolean`

###### Type Parameters

###### K

`K`

###### V

`V`

###### Parameters

###### a

[`IMap`](#imap)\<`K`, `V`\>

###### b

[`IMap`](#imap)\<`K`, `V`\>

###### Returns

`boolean`

##### new()

> **new**: \<`K`, `V`\>(`iterable`) => [`IMap`](#imap)\<`K`, `V`\>

###### Type Parameters

###### K

`K`

###### V

`V`

###### Parameters

###### iterable

`Iterable`\<readonly \[`K`, `V`\]\>

###### Returns

[`IMap`](#imap)\<`K`, `V`\>
