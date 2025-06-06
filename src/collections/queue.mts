import { Arr } from '../array/index.mjs';
import { Optional } from '../functional/index.mjs';
import { asUint32 } from '../number/index.mjs';
import { castMutable } from '../others/index.mjs';

/**
 * Represents an interface for a queue with FIFO (First-In, First-Out) behavior.
 * Elements are added to the back of the queue and removed from the front.
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
 * // FIFO behavior:
 * console.log(myQueue.dequeue().unwrap()); // Output: "hello" (first in, first out)
 * console.log(myQueue.dequeue().unwrap()); // Output: "world"
 *
 * console.log(myQueue.isEmpty); // Output: true
 * ```
 */
export type Queue<T> = Readonly<{
  /** Checks if the queue is empty. */
  isEmpty: boolean;

  /** The number of elements in the queue. */
  size: SizeType.Arr;

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
 * Class implementation for a queue with FIFO (First-In, First-Out) behavior using a circular buffer.
 * This implementation provides O(1) enqueue and dequeue operations by using a fixed-size buffer
 * with head and tail pointers that wrap around when they reach the buffer boundary.
 *
 * The circular buffer automatically resizes when it becomes full, ensuring that the queue
 * can grow to accommodate any number of elements while maintaining efficient operations.
 *
 * @template T The type of elements in the queue.
 * @implements Queue
 */
class QueueClass<T> implements Queue<T> {
  /** @internal Circular buffer to store queue elements. */
  #buffer: (T | undefined)[];

  /** @internal Index of the first element (front of queue). */
  #head: number;

  /** @internal Index where the next element will be added (back of queue). */
  #tail: number;

  /** @internal Current number of elements in the queue. */
  #mut_size: number;

  /** @internal Current capacity of the buffer. */
  #capacity: number;

  /** @internal Initial capacity for new queues. */
  static readonly #INITIAL_CAPACITY = 8;

  /**
   * Constructs a new QueueClass instance.
   * @param initialValues Optional initial values to populate the queue.
   */
  constructor(initialValues: readonly T[] = []) {
    const initialCapacity = asUint32(
      Math.max(QueueClass.#INITIAL_CAPACITY, initialValues.length * 2),
    );

    this.#buffer = castMutable(
      Arr.create<T | undefined>(initialCapacity, undefined),
    );
    this.#head = 0;
    this.#tail = 0;
    this.#mut_size = 0;
    this.#capacity = initialCapacity;

    // Add initial values
    for (const value of initialValues) {
      this.enqueue(value);
    }
  }

  /** @inheritdoc */
  get isEmpty(): boolean {
    return this.#mut_size === 0;
  }

  /** @inheritdoc */
  get size(): SizeType.Arr {
    return asUint32(this.#mut_size);
  }

  /**
   * Removes and returns an element from the front of the queue (FIFO).
   * Time complexity: O(1)
   *
   * @returns The element removed from the front of the queue, or `Optional.none` if empty.
   */
  dequeue(): Optional<T> {
    if (this.isEmpty) {
      return Optional.none;
    }

    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = this.#buffer[this.#head]!;
    this.#buffer[this.#head] = undefined; // Clear reference for garbage collection
    this.#head = (this.#head + 1) % this.#capacity;
    this.#mut_size -= 1;

    return Optional.some(element);
  }

  /**
   * Adds an element to the back of the queue (FIFO).
   * Time complexity: O(1) amortized (O(n) when resizing)
   *
   * @param value The element to add to the queue.
   */
  enqueue(value: T): void {
    // Resize if buffer is full
    if (this.#mut_size === this.#capacity) {
      this.#resize();
    }

    this.#buffer[this.#tail] = value;
    this.#tail = (this.#tail + 1) % this.#capacity;
    this.#mut_size += 1;
  }

  /**
   * @internal
   * Resizes the circular buffer when it becomes full.
   * Doubles the capacity and reorganizes elements to maintain queue order.
   */
  #resize(): void {
    const newCapacity = asUint32(this.#capacity * 2);
    const newBuffer = castMutable(
      Arr.create<T | undefined>(newCapacity, undefined),
    );

    // Copy elements in order from head to tail
    for (let i = 0; i < this.#mut_size; i++) {
      const sourceIndex = (this.#head + i) % this.#capacity;
      newBuffer[i] = this.#buffer[sourceIndex];
    }

    this.#buffer = newBuffer;
    this.#head = 0;
    this.#tail = this.#mut_size;
    this.#capacity = newCapacity;
  }
}

/**
 * Creates a new Queue instance with FIFO (First-In, First-Out) behavior using a high-performance circular buffer.
 *
 * This implementation provides:
 * - **O(1) enqueue operations** (amortized)
 * - **O(1) dequeue operations** (always)
 * - **Automatic resizing** when the buffer becomes full
 * - **Memory efficient** with garbage collection of removed elements
 *
 * The circular buffer starts with an initial capacity of 8 elements and doubles in size when full.
 * Elements are added to the back and removed from the front, maintaining the order in which they were added.
 *
 * @template T The type of elements in the queue.
 * @param initialValues Optional initial values to populate the queue. Elements will
 *                      be dequeued in the same order they appear in the array.
 * @returns A new Queue instance with circular buffer implementation.
 *
 * @example
 * ```typescript
 * import { createQueue } from './queue'; // Adjust import path as needed
 *
 * // Example 1: Basic FIFO behavior with O(1) operations
 * const queue = createQueue<string>();
 * queue.enqueue("first_in");   // O(1)
 * queue.enqueue("second_in");  // O(1)
 * queue.enqueue("third_in");   // O(1)
 *
 * console.log(queue.dequeue().unwrap()); // O(1) - Output: "first_in"
 * console.log(queue.dequeue().unwrap()); // O(1) - Output: "second_in"
 * console.log(queue.size);               // O(1) - Output: 1
 * console.log(queue.dequeue().unwrap()); // O(1) - Output: "third_in"
 * console.log(queue.isEmpty);            // O(1) - Output: true
 *
 * // Example 2: High-performance queue operations
 * const numQueue = createQueue<number>();
 * for (let i = 0; i < 1000; i++) {
 *   numQueue.enqueue(i); // Each operation is O(1) amortized
 * }
 *
 * while (!numQueue.isEmpty) {
 *   numQueue.dequeue(); // Each operation is O(1)
 * }
 *
 * // Example 3: Queue with initial values
 * const initialQueue = createQueue<number>([10, 20, 30]);
 * console.log(initialQueue.size); // Output: 3
 * console.log(initialQueue.dequeue().unwrap()); // Output: 10
 * console.log(initialQueue.dequeue().unwrap()); // Output: 20
 * console.log(initialQueue.dequeue().unwrap()); // Output: 30
 * ```
 */
export const createQueue = <T,>(initialValues?: readonly T[]): Queue<T> =>
  new QueueClass<T>(initialValues);
