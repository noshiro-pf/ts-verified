/**
 * Represents a read-only interface for a queue (FIFO - First-In, First-Out).
 * @template T The type of elements in the queue.
 */
export type Queue<T> = Readonly<{
  /** Checks if the queue is empty. */
  isEmpty: boolean;
  /** The number of elements in the queue. */
  size: number;
  /**
   * Removes and returns the element at the front of the queue.
   * @returns The element at the front of the queue, or `undefined` if the queue is empty.
   */
  dequeue: () => T | undefined;
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
  readonly #data: T[] = [];
  /** @internal Internal mutable counter for the queue size. */
  #mut_size: number = 0;

  /** @inheritdoc */
  get isEmpty(): boolean {
    return this.size === 0;
  }

  /** @inheritdoc */
  get size(): number {
    return this.#mut_size;
  }

  /** @inheritdoc */
  dequeue(): T | undefined {
    this.#mut_size = Math.max(0, this.#mut_size - 1);
    // For a FIFO queue, dequeue should remove from the front.
    // Array.pop() removes from the end, Array.shift() removes from the front.
    // The current implementation of enqueue (unshift) and dequeue (pop) makes it a LIFO (stack).
    // To make it a FIFO queue:
    // enqueue should use push: this.#data.push(value);
    // dequeue should use shift: return this.#data.shift();
    return this.#data.pop(); // This makes it behave like a stack (LIFO)
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
 * @template T The type of elements in the queue.
 * @returns A new Queue instance.
 */
export const createQueue = <T,>(): Queue<T> => new QueueClass<T>();
