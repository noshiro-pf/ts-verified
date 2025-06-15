[**Documentation**](README.md)

---

# Collections Guide

The collections module provides immutable data structures that maintain safety and performance through functional programming patterns. All collections are immutable - operations return new instances without modifying the original.

## Quick Examples

```typescript
import { IMap, ISet, createQueue, createStack } from 'ts-verified';

// Immutable Map operations
const map = IMap.from([
    ['a', 1],
    ['b', 2],
]);
const newMap = map.set('c', 3); // Original map unchanged
const value = map.get('a'); // Optional.some(1)

// Immutable Set operations
const set = ISet.from([1, 2, 3]);
const newSet = set.add(4); // Original set unchanged
const hasValue = set.has(2); // true

// Queue (FIFO) operations
const queue = createQueue<string>();
queue.enqueue('first');
queue.enqueue('second');
const item = queue.dequeue(); // Optional.some('first')

// Stack (LIFO) operations
const stack = createStack<number>();
stack.push(1);
stack.push(2);
const top = stack.pop(); // Optional.some(2)
```

## Key Features

- **Immutability**: All operations preserve original collections
- **Type Safety**: Full TypeScript integration with proper generics
- **Performance**: Optimized implementations with proper time complexity
- **Functional Interface**: Chainable operations and pure functions

## Available Collections

### IMap - Immutable Map

Type-safe immutable map implementation:

- **Creation**: `empty()`, `from()`, `of()`
- **Access**: `get()`, `has()`, `size`
- **Modification**: `set()`, `delete()`, `clear()`
- **Iteration**: `keys()`, `values()`, `entries()`
- **Transformation**: `map()`, `filter()`, `merge()`

### ISet - Immutable Set

Type-safe immutable set implementation:

- **Creation**: `empty()`, `from()`, `of()`
- **Access**: `has()`, `size`, `isEmpty`
- **Modification**: `add()`, `delete()`, `clear()`
- **Operations**: `union()`, `intersection()`, `difference()`
- **Iteration**: `values()`, `forEach()`

### Queue - FIFO Queue

First-In-First-Out queue with O(1) operations:

- **Creation**: `createQueue()` with optional initial values
- **Operations**: `enqueue()`, `dequeue()` - both O(1)
- **Properties**: `size`, `isEmpty`
- **Implementation**: Circular buffer for optimal performance

### Stack - LIFO Stack

Last-In-First-Out stack implementation:

- **Creation**: `createStack()` with optional initial values
- **Operations**: `push()`, `pop()` - both O(1)
- **Access**: `peek()` to view top without removing
- **Properties**: `size`, `isEmpty`

### IMapMapped - Mapped Immutable Map

Map with automatic key transformation:

- **Key Mapping**: Automatically transforms keys using provided function
- **Type Safety**: Maintains type relationships between original and mapped keys
- **All IMap Features**: Inherits all standard IMap functionality

### ISetMapped - Mapped Immutable Set

Set with automatic value transformation:

- **Value Mapping**: Automatically transforms values using provided function
- **Type Safety**: Maintains type relationships between original and mapped values
- **All ISet Features**: Inherits all standard ISet functionality

## Common Patterns

### Building Collections Incrementally

```typescript
const map = IMap.empty<string, number>().set('a', 1).set('b', 2).set('c', 3);

const set = ISet.empty<number>().add(1).add(2).add(3);
```

### Working with Optional Values

```typescript
const map = IMap.from([['key', 'value']]);
const value = map.get('key'); // Optional<string>

if (value.isSome()) {
    console.log(value.unwrap()); // "value"
}

// Or use map/flatMap
const upperValue = value.map((s) => s.toUpperCase()); // Optional<string>
```

### High-Performance Queue Operations

```typescript
const queue = createQueue<Task>();

// Producer
for (const task of tasks) {
    queue.enqueue(task); // O(1) amortized
}

// Consumer
while (!queue.isEmpty) {
    const task = queue.dequeue(); // O(1) always
    if (task.isSome()) {
        processTask(task.unwrap());
    }
}
```

### Set Operations

```typescript
const set1 = ISet.from([1, 2, 3]);
const set2 = ISet.from([3, 4, 5]);

const union = set1.union(set2); // {1, 2, 3, 4, 5}
const intersection = set1.intersection(set2); // {3}
const difference = set1.difference(set2); // {1, 2}
```

## Performance Considerations

### When to Use Each Collection

**Use IMap when:**

- You need immutable state management
- Implementing undo/redo functionality
- Working with Redux or similar patterns
- Time-travel debugging is important

**Use native Map when:**

- High-frequency updates (>1000 ops/sec)
- Working with very large datasets (>100k items)
- Memory usage is critical
- Immutability is not required
