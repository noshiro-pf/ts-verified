[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/queue

# collections/queue

## Type Aliases

### Queue\<T\>

> **Queue**\<`T`\> = `Readonly`\<\{ `dequeue`: () => `T` \| `undefined`; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `number`; \}\>

Defined in: [collections/queue.mts:1](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L1)

#### Type Parameters

##### T

`T`

## Functions

### createQueue()

> **createQueue**\<`T`\>(): `Readonly`\<\{ `dequeue`: () => `undefined` \| `T`; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `number`; \}\>

Defined in: [collections/queue.mts:29](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L29)

#### Type Parameters

##### T

`T`

#### Returns

`Readonly`\<\{ `dequeue`: () => `undefined` \| `T`; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `number`; \}\>
