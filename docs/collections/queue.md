[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/queue

# collections/queue

## Type Aliases

### Queue\<T\>

> **Queue**\<`T`\> = `Readonly`\<\{ `dequeue`: () => [`Optional`](../functional/optional/README.md#optional)\<`T`\>; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `number`; \}\>

Defined in: [src/collections/queue.mts:27](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L27)

Represents an interface for a queue, ideally FIFO (First-In, First-Out).
Note: The default `createQueue` implementation currently exhibits LIFO (Last-In, First-Out) behavior.
The examples illustrate usage based on the interface contract, but actual behavior
with `createQueue` will be LIFO until its implementation is aligned.

#### Type Parameters

##### T

`T`

The type of elements in the queue.

#### Example

```typescript
import { createQueue, Queue } from './queue'; // Adjust import path as needed

const myQueue: Queue<string> = createQueue<string>();

myQueue.enqueue('hello');
myQueue.enqueue('world');

console.log(myQueue.size); // Output: 2

// With current LIFO implementation of createQueue:
console.log(myQueue.dequeue().unwrap()); // Output: "world"
console.log(myQueue.dequeue().unwrap()); // Output: "hello"

console.log(myQueue.isEmpty); // Output: true
```

## Functions

### createQueue()

> **createQueue**\<`T`\>(`initialValues?`): [`Queue`](#queue)\<`T`\>

Defined in: [src/collections/queue.mts:164](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L164)

Creates a new Queue instance.
The `Queue<T>` type definition describes a FIFO (First-In, First-Out) contract.
However, this `createQueue` function provides an implementation that currently
behaves as a LIFO (Last-In, First-Out) stack due to its use of `unshift` for `enqueue`
and `pop` for `dequeue`.
The examples below demonstrate this current LIFO behavior.

#### Type Parameters

##### T

`T`

The type of elements in the queue.

#### Parameters

##### initialValues?

readonly `T`[]

Optional initial values to populate the queue. The order of elements
during dequeue will be the reverse of their order in `initialValues`
if no other operations are performed, due to LIFO behavior.

#### Returns

[`Queue`](#queue)\<`T`\>

A new Queue instance.

#### Example

```typescript
import { createQueue } from './queue'; // Adjust import path as needed

// Example 1: Basic LIFO behavior
const lifoQueue = createQueue<string>();
lifoQueue.enqueue('first_in'); // Internal: ["first_in"]
lifoQueue.enqueue('second_in'); // Internal: ["second_in", "first_in"]
lifoQueue.enqueue('third_in'); // Internal: ["third_in", "second_in", "first_in"]

console.log(lifoQueue.dequeue().unwrap()); // Output: "third_in" (last one in)
console.log(lifoQueue.dequeue().unwrap()); // Output: "second_in"
console.log(lifoQueue.size); // Output: 1
console.log(lifoQueue.dequeue().unwrap()); // Output: "first_in"
console.log(lifoQueue.isEmpty); // Output: true

// Example 2: Queue with initial values
// initialValues: [10, 20, 30]
// Internal data after constructor: [10, 20, 30]
const numQueue = createQueue<number>([10, 20, 30]);
console.log(numQueue.size); // Output: 3

// Dequeue behavior with initial values (LIFO - pops from end)
console.log(numQueue.dequeue().unwrap()); // Output: 30
console.log(numQueue.dequeue().unwrap()); // Output: 20

numQueue.enqueue(40); // Internal: [40, 10] (unshift to front, remaining [10])
console.log(numQueue.dequeue().unwrap()); // Output: 10 (pop from end)
console.log(numQueue.dequeue().unwrap()); // Output: 40 (pop from end)
console.log(numQueue.isEmpty); // Output: true
```
