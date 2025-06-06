import { Arr } from '../array/index.mjs';
import { Optional } from '../functional/index.mjs';
import { asUint32 } from '../number/index.mjs';
import { castMutable } from '../others/index.mjs';

/**
 * Represents an interface for a stack with LIFO (Last-In, First-Out) behavior.
 * Elements are added to the top of the stack and removed from the top.
 * @template T The type of elements in the stack.
 * @example
 * ```typescript
 * import { createStack, Stack } from './stack'; // Adjust import path as needed
 *
 * const myStack: Stack<string> = createStack<string>();
 *
 * myStack.push("first");
 * myStack.push("second");
 *
 * console.log(myStack.size); // Output: 2
 *
 * // LIFO behavior:
 * console.log(myStack.pop().unwrap()); // Output: "second" (last in, first out)
 * console.log(myStack.pop().unwrap()); // Output: "first"
 *
 * console.log(myStack.isEmpty); // Output: true
 * ```
 */
export type Stack<T> = Readonly<{
  /** Checks if the stack is empty. */
  isEmpty: boolean;

  /** The number of elements in the stack. */
  size: SizeType.Arr;

  /**
   * Removes and returns the element at the top of the stack.
   * @returns The element at the top of the stack, or `Optional.none` if the stack is empty.
   */
  pop: () => Optional<T>;

  /**
   * Adds an element to the top of the stack.
   * @param value The element to add.
   */
  push: (value: T) => void;
}>;

/**
 * Class implementation for a stack with LIFO (Last-In, First-Out) behavior using a dynamic array.
 * This implementation provides O(1) amortized push and O(1) pop operations by using a resizable buffer
 * that grows as needed.
 *
 * The underlying array automatically resizes when it becomes full, ensuring that the stack
 * can grow to accommodate any number of elements while maintaining efficient operations.
 *
 * @template T The type of elements in the stack.
 * @implements Stack
 */
class StackClass<T> implements Stack<T> {
  /** @internal Dynamic array to store stack elements. */
  #buffer: (T | undefined)[];

  /** @internal Current number of elements in the stack. */
  #mut_size: number;

  /** @internal Current capacity of the buffer. */
  #capacity: number;

  /** @internal Initial capacity for new stacks. */
  static readonly #INITIAL_CAPACITY = 8;

  /**
   * Constructs a new StackClass instance.
   * @param initialValues Optional initial values to populate the stack.
   */
  constructor(initialValues: readonly T[] = []) {
    const initialCapacity = asUint32(
      Math.max(StackClass.#INITIAL_CAPACITY, initialValues.length * 2),
    );

    this.#buffer = castMutable(
      Arr.create<T | undefined>(initialCapacity, undefined),
    );
    this.#mut_size = 0;
    this.#capacity = initialCapacity;

    // Add initial values
    for (const value of initialValues) {
      this.push(value);
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
   * Removes and returns an element from the top of the stack (LIFO).
   * Time complexity: O(1)
   *
   * @returns The element removed from the top of the stack, or `Optional.none` if empty.
   */
  pop(): Optional<T> {
    if (this.isEmpty) {
      return Optional.none;
    }

    this.#mut_size -= 1;
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const element = this.#buffer[this.#mut_size]!;
    this.#buffer[this.#mut_size] = undefined; // Clear reference for garbage collection

    return Optional.some(element);
  }

  /**
   * Adds an element to the top of the stack (LIFO).
   * Time complexity: O(1) amortized (O(n) when resizing)
   *
   * @param value The element to add to the stack.
   */
  push(value: T): void {
    // Resize if buffer is full
    if (this.#mut_size === this.#capacity) {
      this.#resize();
    }

    this.#buffer[this.#mut_size] = value;
    this.#mut_size += 1;
  }

  /**
   * @internal
   * Resizes the buffer when it becomes full.
   * Doubles the capacity while preserving all elements.
   */
  #resize(): void {
    const newCapacity = asUint32(this.#capacity * 2);
    const newBuffer = castMutable(
      Arr.create<T | undefined>(newCapacity, undefined),
    );

    // Copy existing elements
    for (let i = 0; i < this.#mut_size; i++) {
      newBuffer[i] = this.#buffer[i];
    }

    this.#buffer = newBuffer;
    this.#capacity = newCapacity;
  }
}

/**
 * Creates a new Stack instance with LIFO (Last-In, First-Out) behavior using a high-performance dynamic array.
 *
 * This implementation provides:
 * - **O(1) push operations** (amortized)
 * - **O(1) pop operations** (always)
 * - **Automatic resizing** when the buffer becomes full
 * - **Memory efficient** with garbage collection of removed elements
 *
 * The dynamic array starts with an initial capacity of 8 elements and doubles in size when full.
 * Elements are added to and removed from the top, maintaining LIFO (Last-In, First-Out) order.
 *
 * @template T The type of elements in the stack.
 * @param initialValues Optional initial values to populate the stack. Elements will
 *                      be popped in reverse order of how they appear in the array.
 * @returns A new Stack instance with dynamic array implementation.
 *
 * @example
 * ```typescript
 * import { createStack } from './stack'; // Adjust import path as needed
 *
 * // Example 1: Basic LIFO behavior with O(1) operations
 * const stack = createStack<string>();
 * stack.push("first_in");   // O(1)
 * stack.push("second_in");  // O(1)
 * stack.push("third_in");   // O(1)
 *
 * console.log(stack.pop().unwrap()); // O(1) - Output: "third_in" (last in, first out)
 * console.log(stack.pop().unwrap()); // O(1) - Output: "second_in"
 * console.log(stack.size);           // O(1) - Output: 1
 * console.log(stack.pop().unwrap()); // O(1) - Output: "first_in"
 * console.log(stack.isEmpty);        // O(1) - Output: true
 *
 * // Example 2: High-performance stack operations
 * const numStack = createStack<number>();
 * for (let i = 0; i < 1000; i++) {
 *   numStack.push(i); // Each operation is O(1) amortized
 * }
 *
 * while (!numStack.isEmpty) {
 *   numStack.pop(); // Each operation is O(1)
 * }
 *
 * // Example 3: Stack with initial values
 * const initialStack = createStack<number>([10, 20, 30]);
 * console.log(initialStack.size); // Output: 3
 * console.log(initialStack.pop().unwrap()); // Output: 30 (last pushed, first popped)
 * console.log(initialStack.pop().unwrap()); // Output: 20
 * console.log(initialStack.pop().unwrap()); // Output: 10
 * ```
 */
export const createStack = <T,>(initialValues?: readonly T[]): Stack<T> =>
  new StackClass<T>(initialValues);
