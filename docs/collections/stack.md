[**Documentation**](../README.md)

---

[Documentation](../README.md) / collections/stack

# collections/stack

## Type Aliases

### Stack\<T\>

> **Stack**\<`T`\> = `Readonly`\<\{ `isEmpty`: `boolean`; `pop`: () => [`Optional`](../functional/optional/README.md#optional)\<`T`\>; `push`: (`value`) => `void`; `size`: `SizeType.Arr`; \}\>

Defined in: [src/collections/stack.mts:28](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/stack.mts#L28)

Represents an interface for a stack with LIFO (Last-In, First-Out) behavior.
Elements are added to the top of the stack and removed from the top.

#### Type Parameters

##### T

`T`

The type of elements in the stack.

#### Example

```typescript
import { createStack, Stack } from './stack'; // Adjust import path as needed

const myStack: Stack<string> = createStack<string>();

myStack.push('first');
myStack.push('second');

console.log(myStack.size); // Output: 2

// LIFO behavior:
console.log(myStack.pop().unwrap()); // Output: "second" (last in, first out)
console.log(myStack.pop().unwrap()); // Output: "first"

console.log(myStack.isEmpty); // Output: true
```

## Functions

### createStack()

> **createStack**\<`T`\>(`initialValues?`): [`Stack`](#stack)\<`T`\>

Defined in: [src/collections/stack.mts:210](https://github.com/noshiro-pf/ts-verified/blob/main/src/collections/stack.mts#L210)

Creates a new Stack instance with LIFO (Last-In, First-Out) behavior using a high-performance dynamic array.

This implementation provides:

- **O(1) push operations** (amortized)
- **O(1) pop operations** (always)
- **Automatic resizing** when the buffer becomes full
- **Memory efficient** with garbage collection of removed elements

The dynamic array starts with an initial capacity of 8 elements and doubles in size when full.
Elements are added to and removed from the top, maintaining LIFO (Last-In, First-Out) order.

#### Type Parameters

##### T

`T`

The type of elements in the stack.

#### Parameters

##### initialValues?

readonly `T`[]

Optional initial values to populate the stack. Elements will
be popped in reverse order of how they appear in the array.

#### Returns

[`Stack`](#stack)\<`T`\>

A new Stack instance with dynamic array implementation.

#### Example

```typescript
import { createStack } from './stack'; // Adjust import path as needed

// Example 1: Basic LIFO behavior with O(1) operations
const stack = createStack<string>();
stack.push('first_in'); // O(1)
stack.push('second_in'); // O(1)
stack.push('third_in'); // O(1)

console.log(stack.pop().unwrap()); // O(1) - Output: "third_in" (last in, first out)
console.log(stack.pop().unwrap()); // O(1) - Output: "second_in"
console.log(stack.size); // O(1) - Output: 1
console.log(stack.pop().unwrap()); // O(1) - Output: "first_in"
console.log(stack.isEmpty); // O(1) - Output: true

// Example 2: High-performance stack operations
const numStack = createStack<number>();
for (let i = 0; i < 1000; i++) {
    numStack.push(i); // Each operation is O(1) amortized
}

while (!numStack.isEmpty) {
    numStack.pop(); // Each operation is O(1)
}

// Example 3: Stack with initial values
const initialStack = createStack<number>([10, 20, 30]);
console.log(initialStack.size); // Output: 3
console.log(initialStack.pop().unwrap()); // Output: 30 (last pushed, first popped)
console.log(initialStack.pop().unwrap()); // Output: 20
console.log(initialStack.pop().unwrap()); // Output: 10
```
