[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/queue

# collections/queue

## Type Aliases

### Queue\<T\>

> **Queue**\<`T`\> = `Readonly`\<\{ `dequeue`: () => [`Optional`](../functional/optional/README.md#optional)\<`T`\>; `enqueue`: (`value`) => `void`; `isEmpty`: `boolean`; `size`: `SizeType.Arr`; \}\>

Defined in: [src/collections/queue.mts:28](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L28)

Represents an interface for a queue with FIFO (First-In, First-Out) behavior.
Elements are added to the back of the queue and removed from the front.

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

// FIFO behavior:
console.log(myQueue.dequeue().unwrap()); // Output: "hello" (first in, first out)
console.log(myQueue.dequeue().unwrap()); // Output: "world"

console.log(myQueue.isEmpty); // Output: true
```

## Functions

### createQueue()

> **createQueue**\<`T`\>(`initialValues?`): [`Queue`](#queue)\<`T`\>

Defined in: [src/collections/queue.mts:223](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/queue.mts#L223)

Creates a new Queue instance with FIFO (First-In, First-Out) behavior using a high-performance circular buffer.

This implementation provides:

- **O(1) enqueue operations** (amortized)
- **O(1) dequeue operations** (always)
- **Automatic resizing** when the buffer becomes full
- **Memory efficient** with garbage collection of removed elements

The circular buffer starts with an initial capacity of 8 elements and doubles in size when full.
Elements are added to the back and removed from the front, maintaining the order in which they were added.

#### Type Parameters

##### T

`T`

The type of elements in the queue.

#### Parameters

##### initialValues?

readonly `T`[]

Optional initial values to populate the queue. Elements will
be dequeued in the same order they appear in the array.

#### Returns

[`Queue`](#queue)\<`T`\>

A new Queue instance with circular buffer implementation.

#### Example

```typescript
import { createQueue } from './queue'; // Adjust import path as needed

// Example 1: Basic FIFO behavior with O(1) operations
const queue = createQueue<string>();
queue.enqueue('first_in'); // O(1)
queue.enqueue('second_in'); // O(1)
queue.enqueue('third_in'); // O(1)

console.log(queue.dequeue().unwrap()); // O(1) - Output: "first_in"
console.log(queue.dequeue().unwrap()); // O(1) - Output: "second_in"
console.log(queue.size); // O(1) - Output: 1
console.log(queue.dequeue().unwrap()); // O(1) - Output: "third_in"
console.log(queue.isEmpty); // O(1) - Output: true

// Example 2: High-performance queue operations
const numQueue = createQueue<number>();
for (let i = 0; i < 1000; i++) {
    numQueue.enqueue(i); // Each operation is O(1) amortized
}

while (!numQueue.isEmpty) {
    numQueue.dequeue(); // Each operation is O(1)
}

// Example 3: Queue with initial values
const initialQueue = createQueue<number>([10, 20, 30]);
console.log(initialQueue.size); // Output: 3
console.log(initialQueue.dequeue().unwrap()); // Output: 10
console.log(initialQueue.dequeue().unwrap()); // Output: 20
console.log(initialQueue.dequeue().unwrap()); // Output: 30
```
