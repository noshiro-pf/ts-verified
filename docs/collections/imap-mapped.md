[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/imap-mapped

# collections/imap-mapped

## Type Aliases

### IMapMapped\<K, V, KM\>

> **IMapMapped**\<`K`, `V`, `KM`\> = `Iterable`\<readonly \[`K`, `V`\]\> & `Readonly`\<`IMapMappedInterface`\<`K`, `V`, `KM`\>\>

Defined in: [collections/imap-mapped.mts:58](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap-mapped.mts#L58)

#### Type Parameters

##### K

`K`

##### V

`V`

##### KM

`KM` _extends_ `MapKeyType`

## Variables

### IMapMapped

> **IMapMapped**: `object`

Defined in: [collections/imap-mapped.mts:58](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/imap-mapped.mts#L58)

#### Type declaration

##### equal()

> **equal**: \<`K`, `V`, `KM`\>(`a`, `b`) => `boolean`

###### Type Parameters

###### K

`K`

###### V

`V`

###### KM

`KM` _extends_ `MapKeyType`

###### Parameters

###### a

[`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>

###### b

[`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>

###### Returns

`boolean`

##### new()

> **new**: \<`K`, `V`, `KM`\>(`iterable`, `toKey`, `fromKey`) => [`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>

###### Type Parameters

###### K

`K`

###### V

`V`

###### KM

`KM` _extends_ `MapKeyType`

###### Parameters

###### iterable

`Iterable`\<readonly \[`K`, `V`\]\>

###### toKey

(`a`) => `KM`

###### fromKey

(`k`) => `K`

###### Returns

[`IMapMapped`](#imapmapped)\<`K`, `V`, `KM`\>
