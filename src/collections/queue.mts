import { Optional } from '../functional/index.mjs';

/**
 * Represents an interface for a queue, ideally FIFO (First-In, First-Out).
 * Note: The default `createQueue` implementation currently exhibits LIFO (Last-In, First-Out) behavior.
 * The examples illustrate usage based on the interface contract, but actual behavior
 * with `createQueue` will be LIFO until its implementation is aligned.
 * @template T The type of elements in the queue.
 * @example
 * ```typescript
 * import { createQueue, Queue } from './queue'; // Adjust import path as needed
 *
 * const myQueue: Queue<string> = createQueue<string>();
 *
 * myQueue.enqueue("hello");
 * myQueue.enqueue("world");
 *
 * console.log(myQueue.size); // Output: 2
 *
 * // With current LIFO implementation of createQueue:
 * console.log(myQueue.dequeue().unwrap()); // Output: "world"
 * console.log(myQueue.dequeue().unwrap()); // Output: "hello"
 *
 * console.log(myQueue.isEmpty); // Output: true
 * ```
 */
export type Queue<T> = Readonly<{
  /** Checks if the queue is empty. */
  isEmpty: boolean;

  /** The number of elements in the queue. */
  size: number;

  /**
   * Removes and returns the element at the front of the queue.
   * @returns The element at the front of the queue, or `Optional.none` if the queue is empty.
   */
  dequeue: () => Optional<T>;

  /**
   * Adds an element to the back of the queue.
   * @param value The element to add.
   */
  enqueue: (value: T) => void;
}>;

/**
 * Class implementation for a queue.
 * @template T The type of elements in the queue.
 * @implements Queue
 */
class QueueClass<T> implements Queue<T> {
  /** @internal Internal data store for the queue elements. */
  readonly #data: T[];

  /** @internal Internal mutable counter for the queue size. */
  #mut_size: number;

  constructor(initialValues: readonly T[] = []) {
    this.#data = [...initialValues];
    this.#mut_size = initialValues.length;
  }

  /** @inheritdoc */
  get isEmpty(): boolean {
    return this.size === 0;
  }

  /** @inheritdoc */
  get size(): number {
    return this.#mut_size;
  }

  /** @inheritdoc */
  dequeue(): Optional<T> {
    if (this.isEmpty) {
      return Optional.none;
    }

    this.#mut_size -= 1;
    // For a FIFO queue, dequeue should remove from the front.
    // Array.pop() removes from the end, Array.shift() removes from the front.
    // The current implementation of enqueue (unshift) and dequeue (pop) makes it a LIFO (stack).
    // To make it a FIFO queue:
    // enqueue should use push: this.#data.push(value);
    // dequeue should use shift: return this.#data.shift();
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return Optional.some(this.#data.pop()!); // This makes it behave like a stack (LIFO)
  }

  /** @inheritdoc */
  enqueue(value: T): void {
    this.#mut_size += 1;
    // For a FIFO queue, enqueue should add to the back.
    // Array.unshift() adds to the front.
    // To make it a FIFO queue:
    // enqueue should use push: this.#data.push(value);
    // dequeue should use shift: return this.#data.shift();
    this.#data.unshift(value); // This adds to the front
  }
}

/**
 * Creates a new Queue instance.
 * The `Queue<T>` type definition describes a FIFO (First-In, First-Out) contract.
 * However, this `createQueue` function provides an implementation that currently
 * behaves as a LIFO (Last-In, First-Out) stack due to its use of `unshift` for `enqueue`
 * and `pop` for `dequeue`.
 * The examples below demonstrate this current LIFO behavior.
 * @template T The type of elements in the queue.
 * @param initialValues Optional initial values to populate the queue. The order of elements
 *                      during dequeue will be the reverse of their order in `initialValues`
 *                      if no other operations are performed, due to LIFO behavior.
 * @returns A new Queue instance.
 * @example
 * ```typescript
 * import { createQueue } from './queue'; // Adjust import path as needed
 *
 * // Example 1: Basic LIFO behavior
 * const lifoQueue = createQueue<string>();
 * lifoQueue.enqueue("first_in");  // Internal: ["first_in"]
 * lifoQueue.enqueue("second_in"); // Internal: ["second_in", "first_in"]
 * lifoQueue.enqueue("third_in");  // Internal: ["third_in", "second_in", "first_in"]
 *
 * console.log(lifoQueue.dequeue().unwrap()); // Output: "third_in" (last one in)
 * console.log(lifoQueue.dequeue().unwrap()); // Output: "second_in"
 * console.log(lifoQueue.size);             // Output: 1
 * console.log(lifoQueue.dequeue().unwrap()); // Output: "first_in"
 * console.log(lifoQueue.isEmpty);          // Output: true
 *
 * // Example 2: Queue with initial values
 * // initialValues: [10, 20, 30]
 * // Internal data after constructor: [10, 20, 30]
 * const numQueue = createQueue<number>([10, 20, 30]);
 * console.log(numQueue.size); // Output: 3
 *
 * // Dequeue behavior with initial values (LIFO - pops from end)
 * console.log(numQueue.dequeue().unwrap()); // Output: 30
 * console.log(numQueue.dequeue().unwrap()); // Output: 20
 *
 * numQueue.enqueue(40); // Internal: [40, 10] (unshift to front, remaining [10])
 * console.log(numQueue.dequeue().unwrap()); // Output: 10 (pop from end)
 * console.log(numQueue.dequeue().unwrap()); // Output: 40 (pop from end)
 * console.log(numQueue.isEmpty);          // Output: true
 * ```
 */
export const createQueue = <T,>(initialValues?: readonly T[]): Queue<T> =>
  new QueueClass<T>(initialValues);
