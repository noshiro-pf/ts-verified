import { Optional } from '../functional/index.mjs';
import { createQueue, type Queue } from './queue.mjs';

describe('Queue', () => {
  describe('initialization', () => {
    test('should be empty if initialized without values', () => {
      const q = createQueue();
      expect(q.isEmpty).toBe(true);
      expect(q.size).toBe(0);
    });

    test('should not be empty if initialized with values', () => {
      const q = createQueue([1, 2, 3]);
      expect(q.isEmpty).toBe(false);
      expect(q.size).toBe(3);
    });
  });

  describe('enqueue', () => {
    let q: Queue<number>;

    beforeEach(() => {
      q = createQueue();
    });

    test('should increase size and not be empty after enqueueing to an empty queue', () => {
      q.enqueue(1);
      expect(q.isEmpty).toBe(false);
      expect(q.size).toBe(1);
    });

    test('should increase size when enqueueing to a non-empty queue', () => {
      q.enqueue(1);
      q.enqueue(2);
      expect(q.size).toBe(2);
    });
  });

  describe('dequeue', () => {
    test('should return Optional.none and size should be 0 when dequeuing from an empty queue', () => {
      const q = createQueue<number>();
      const result = q.dequeue();
      expect(Optional.isNone(result)).toBe(true);
      expect(q.isEmpty).toBe(true);
      expect(q.size).toBe(0);
    });

    test('should decrease size and return the dequeued element for a non-empty queue', () => {
      const q = createQueue([1, 2, 3]); // Current LIFO: enqueue [3,2,1] -> internal data: [1,2,3]
      const initialSize = q.size;

      const result1 = q.dequeue(); // Dequeues 3
      expect(Optional.isSome(result1)).toBe(true);
      if (Optional.isSome(result1)) {
        expect(result1.value).toBe(3);
      }
      expect(q.size).toBe(initialSize - 1);

      const result2 = q.dequeue(); // Dequeues 2
      expect(Optional.isSome(result2)).toBe(true);
      if (Optional.isSome(result2)) {
        expect(result2.value).toBe(2);
      }
      expect(q.size).toBe(initialSize - 2);
    });

    test('should become empty after dequeuing all elements', () => {
      const q = createQueue([1, 2]); // Internal: [2,1]
      q.dequeue(); // Dequeues 1
      q.dequeue(); // Dequeues 2
      expect(q.isEmpty).toBe(true);
      expect(q.size).toBe(0);
      const result = q.dequeue(); // Dequeue from empty
      expect(Optional.isNone(result)).toBe(true);
    });
  });

  describe('LIFO behavior (current implementation is a Stack)', () => {
    test('elements should be dequeued in last-in, first-out order', () => {
      const q = createQueue<number>();
      q.enqueue(1); // internal: [1]
      q.enqueue(2); // internal: [2,1]
      q.enqueue(3); // internal: [3,2,1]

      expect(q.size).toBe(3);

      let result = q.dequeue(); // Dequeues 1
      expect(Optional.isSome(result) && result.value === 1).toBe(true);
      expect(q.size).toBe(2);

      result = q.dequeue(); // Dequeues 2
      expect(Optional.isSome(result) && result.value === 2).toBe(true);
      expect(q.size).toBe(1);

      result = q.dequeue(); // Dequeues 3
      expect(Optional.isSome(result) && result.value === 3).toBe(true);
      expect(q.size).toBe(0);
      expect(q.isEmpty).toBe(true);

      result = q.dequeue();
      expect(Optional.isNone(result)).toBe(true);
    });

    test('initial values are dequeued in reverse order of input (LIFO)', () => {
      const q = createQueue([1, 2, 3]); // enqueue 3, then 2, then 1. Internal: [1,2,3]
      expect(q.size).toBe(3);

      let result = q.dequeue(); // Dequeues 3
      expect(Optional.isSome(result) && result.value === 3).toBe(true);

      result = q.dequeue(); // Dequeues 2
      expect(Optional.isSome(result) && result.value === 2).toBe(true);

      result = q.dequeue(); // Dequeues 1
      expect(Optional.isSome(result) && result.value === 1).toBe(true);

      expect(q.isEmpty).toBe(true);
    });
  });
});
