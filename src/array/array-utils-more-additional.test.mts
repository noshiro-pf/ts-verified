import { expectType } from '../expect-type.mjs';
import { Optional } from '../functional/optional.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr more additional edge cases and functions', () => {
  describe('Arr.tail', () => {
    it('should return all elements except the first', () => {
      const array = [1, 2, 3, 4] as const;
      const result = Arr.tail(array);
      expectType<typeof result, readonly [2, 3, 4]>('=');
      expect(result).toEqual([2, 3, 4]);
    });

    it('should work with single element array', () => {
      const array = [1] as const;
      const result = Arr.tail(array);
      expectType<typeof result, readonly []>('=');
      expect(result).toEqual([]);
    });

    it('should work with empty array', () => {
      const array = [] as const;
      const result = Arr.tail(array);
      expectType<typeof result, readonly []>('=');
      expect(result).toEqual([]);
    });
  });

  describe('Arr.butLast', () => {
    it('should return all elements except the last', () => {
      const array = [1, 2, 3, 4] as const;
      const result = Arr.butLast(array);
      expectType<typeof result, readonly [1, 2, 3]>('=');
      expect(result).toEqual([1, 2, 3]);
    });

    it('should work with single element array', () => {
      const array = [1] as const;
      const result = Arr.butLast(array);
      expectType<typeof result, readonly []>('=');
      expect(result).toEqual([]);
    });

    it('should work with empty array', () => {
      const array = [] as const;
      const result = Arr.butLast(array);
      expectType<typeof result, readonly []>('=');
      expect(result).toEqual([]);
    });
  });

  describe('Arr.sliceClamped', () => {
    it('should slice with clamped indices', () => {
      const array = [1, 2, 3, 4, 5];
      const result = Arr.sliceClamped(array, 1, 3);
      expect(result).toEqual([2, 3]);
    });

    it('should clamp start index below 0', () => {
      const array = [1, 2, 3, 4, 5];
      const result = Arr.sliceClamped(array, -10, 3);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should clamp end index above length', () => {
      const array = [1, 2, 3, 4, 5];
      const result = Arr.sliceClamped(array, 2, 100);
      expect(result).toEqual([3, 4, 5]);
    });

    it('should work with both indices out of range', () => {
      const array = [1, 2, 3];
      const result = Arr.sliceClamped(array, -10, 100);
      expect(result).toEqual([1, 2, 3]);
    });

    it('should work with empty array', () => {
      const array: readonly number[] = [];
      const result = Arr.sliceClamped(array, 0, 5);
      expect(result).toEqual([]);
    });
  });

  describe('Arr.groupBy', () => {
    it('should group elements by key', () => {
      const array = [
        { type: 'fruit', name: 'apple' },
        { type: 'vegetable', name: 'carrot' },
        { type: 'fruit', name: 'banana' },
      ];
      const grouped = Arr.groupBy(array, (item) => item.type);

      expect(grouped.size).toBe(2);
      const fruits = grouped.get('fruit');
      const vegetables = grouped.get('vegetable');

      expect(Optional.isSome(fruits)).toBe(true);
      expect(Optional.isSome(vegetables)).toBe(true);

      if (Optional.isSome(fruits)) {
        expect(fruits.value).toHaveLength(2);
        expect(fruits.value[0].name).toBe('apple');
        expect(fruits.value[1].name).toBe('banana');
      }

      if (Optional.isSome(vegetables)) {
        expect(vegetables.value).toHaveLength(1);
        expect(vegetables.value[0].name).toBe('carrot');
      }
    });

    it('should work with numeric keys', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const grouped = Arr.groupBy(numbers, (n) => n % 2);

      expect(grouped.size).toBe(2);
      const evens = grouped.get(0);
      const odds = grouped.get(1);

      if (Optional.isSome(evens)) {
        expect(evens.value).toEqual([2, 4, 6]);
      }

      if (Optional.isSome(odds)) {
        expect(odds.value).toEqual([1, 3, 5]);
      }
    });

    it('should work with empty array', () => {
      const empty: readonly number[] = [];
      const grouped = Arr.groupBy(empty, (n) => n % 2);
      expect(grouped.size).toBe(0);
    });

    it('should handle all elements in same group', () => {
      const array = [1, 2, 3, 4];
      const grouped = Arr.groupBy(array, () => 'all');

      expect(grouped.size).toBe(1);
      const all = grouped.get('all');

      if (Optional.isSome(all)) {
        expect(all.value).toEqual([1, 2, 3, 4]);
      }
    });
  });

  describe('Arr.uniq', () => {
    it('should remove duplicate primitives', () => {
      const array = [1, 2, 2, 3, 1, 4, 3];
      const result = Arr.uniq(array);
      expect(result).toEqual([1, 2, 3, 4]);
    });

    it('should work with strings', () => {
      const array = ['a', 'b', 'a', 'c', 'b'];
      const result = Arr.uniq(array);
      expect(result).toEqual(['a', 'b', 'c']);
    });

    it('should work with empty array', () => {
      const array: readonly number[] = [];
      const result = Arr.uniq(array);
      expect(result).toEqual([]);
    });

    it('should preserve order of first occurrence', () => {
      const array = [3, 1, 2, 1, 3, 2];
      const result = Arr.uniq(array);
      expect(result).toEqual([3, 1, 2]);
    });
  });

  describe('Arr.uniqBy', () => {
    it('should remove duplicates based on key function', () => {
      const array = [
        { id: 1, name: 'Alice' },
        { id: 2, name: 'Bob' },
        { id: 1, name: 'Alice Duplicate' },
        { id: 3, name: 'Charlie' },
      ];
      const result = Arr.uniqBy(array, (item) => item.id);

      expect(result).toHaveLength(3);
      expect(result[0]).toEqual({ id: 1, name: 'Alice' });
      expect(result[1]).toEqual({ id: 2, name: 'Bob' });
      expect(result[2]).toEqual({ id: 3, name: 'Charlie' });
    });

    it('should work with string key function', () => {
      const words = ['hello', 'world', 'hi', 'welcome'];
      const result = Arr.uniqBy(words, (word) => word.length);

      expect(result).toHaveLength(3);
      expect(result).toContain('hello'); // length 5
      expect(result).toContain('hi'); // length 2
      expect(result).toContain('welcome'); // length 7
    });

    it('should work with empty array', () => {
      const empty: readonly { id: number }[] = [];
      const result = Arr.uniqBy(empty, (item) => item.id);
      expect(result).toEqual([]);
    });
  });

  describe('Arr.toSortedBy', () => {
    it('should sort by key function', () => {
      const people = [
        { name: 'Alice', age: 30 },
        { name: 'Bob', age: 20 },
        { name: 'Charlie', age: 25 },
      ];
      const result = Arr.toSortedBy(people, (person) => person.age);

      expect(result).toHaveLength(3);
      expect(result[0].name).toBe('Bob');
      expect(result[1].name).toBe('Charlie');
      expect(result[2].name).toBe('Alice');
    });

    it('should work with string sorting', () => {
      const words = ['banana', 'apple', 'cherry'];
      const result = Arr.toSortedBy(
        words,
        (word) => word,
        (a, b) => a.localeCompare(b),
      );
      expect(result).toEqual(['apple', 'banana', 'cherry']);
    });

    it('should work with custom key extraction', () => {
      const items = ['hello', 'hi', 'welcome', 'bye'];
      const result = Arr.toSortedBy(items, (item) => item.length);
      expect(result).toEqual(['hi', 'bye', 'hello', 'welcome']);
    });

    it('should work with empty array', () => {
      const empty: readonly { value: number }[] = [];
      const result = Arr.toSortedBy(empty, (item) => item.value);
      expect(result).toEqual([]);
    });
  });

  describe('Arr.zip', () => {
    it('should zip two arrays', () => {
      const arr1 = [1, 2, 3];
      const arr2 = ['a', 'b', 'c'];
      const result = Arr.zip(arr1, arr2);
      expect(result).toEqual([
        [1, 'a'],
        [2, 'b'],
        [3, 'c'],
      ]);
    });

    it('should handle arrays of different lengths', () => {
      const arr1 = [1, 2, 3, 4];
      const arr2 = ['a', 'b'];
      const result = Arr.zip(arr1, arr2);
      expect(result).toEqual([
        [1, 'a'],
        [2, 'b'],
      ]);
    });

    it('should work with empty arrays', () => {
      const arr1: readonly number[] = [];
      const arr2: readonly string[] = [];
      const result = Arr.zip(arr1, arr2);
      expect(result).toEqual([]);
    });

    it('should handle one empty array', () => {
      const arr1 = [1, 2, 3];
      const arr2: readonly string[] = [];
      const result = Arr.zip(arr1, arr2);
      expect(result).toEqual([]);
    });
  });

  describe('Arr.partition (chunking)', () => {
    it('should partition array into chunks', () => {
      const numbers = [1, 2, 3, 4, 5, 6];
      const result = Arr.partition(numbers, 2);

      expect(result).toEqual([
        [1, 2],
        [3, 4],
        [5, 6],
      ]);
    });

    it('should handle arrays not evenly divisible by chunk size', () => {
      const numbers = [1, 2, 3, 4, 5];
      const result = Arr.partition(numbers, 2);

      expect(result).toEqual([[1, 2], [3, 4], [5]]);
    });

    it('should work with chunk size < 2 (returns empty)', () => {
      const numbers = [1, 2, 3];
      const result = Arr.partition(numbers, 1);

      // According to docs, returns empty array if chunkSize < 2
      expect(result).toEqual([]);
    });

    it('should work with chunk size larger than array', () => {
      const numbers = [1, 2];
      const result = Arr.partition(numbers, 5);

      expect(result).toEqual([[1, 2]]);
    });

    it('should work with empty array', () => {
      const empty: readonly number[] = [];
      const result = Arr.partition(empty, 2);

      expect(result).toEqual([]);
    });
  });
});
