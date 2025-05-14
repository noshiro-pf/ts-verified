[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/queue

# collections/queue

## Type Aliases

### Queue\<T\>

> **Queue**\<`T`\> = `Readonly`\<\{ `dequeue`: () => `T` \| `undefined`; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `number`; \}\>

Defined in: [collections/queue.mts:5](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L5)

Represents a read-only interface for a queue (FIFO - First-In, First-Out).

#### Type Parameters

##### T

`T`

The type of elements in the queue.

## Functions

### createQueue()

> **createQueue**\<`T`\>(): `Readonly`\<\{ `dequeue`: () => `undefined` \| `T`; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `number`; \}\>

Defined in: [collections/queue.mts:72](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L72)

Creates a new Queue instance.

#### Type Parameters

##### T

`T`

The type of elements in the queue.

#### Returns

`Readonly`\<\{ `dequeue`: () => `undefined` \| `T`; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `number`; \}\>

A new Queue instance.
