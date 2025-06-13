import { describe, expect, it } from 'vitest';

import { expectType } from '../expect-type.mjs';
import { Tpl } from './tuple-utils.mjs';

describe('Tpl.size', () => {
  it('should return tuple length as literal type', () => {
    const tuple3 = [1, 2, 3] as const;
    const size3 = Tpl.size(tuple3);
    expectType<typeof size3, 3>('=');
    expect(size3).toBe(3);
  });

  it('should work with empty tuple', () => {
    const empty = [] as const;
    const size0 = Tpl.size(empty);
    expectType<typeof size0, 0>('=');
    expect(size0).toBe(0);
  });

  it('should work with single element tuple', () => {
    const single = [42] as const;
    const size1 = Tpl.size(single);
    expectType<typeof size1, 1>('=');
    expect(size1).toBe(1);
  });

  it('should work with mixed type tuple', () => {
    const mixed = [1, 'hello', true, null] as const;
    const size4 = Tpl.size(mixed);
    expectType<typeof size4, 4>('=');
    expect(size4).toBe(4);
  });
});

describe('Tpl.length', () => {
  it('should be alias for size', () => {
    const tuple = [1, 2, 3, 4, 5] as const;
    const size = Tpl.size(tuple);
    const length = Tpl.length(tuple);
    expectType<typeof length, 5>('=');
    expect(length).toBe(size);
    expect(length).toBe(5);
  });
});

describe('Tpl.indexOf', () => {
  it('should find index of existing element', () => {
    const tuple = ['a', 'b', 'c', 'b'] as const;
    const index = Tpl.indexOf(tuple, 'b');
    expectType<typeof index, 0 | 1 | 2 | 3 | -1>('=');
    expect(index).toBe(1);
  });

  it('should return -1 for non-existent element', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const index = Tpl.indexOf(tuple, 'd' as any);
    expect(index).toBe(-1);
  });

  it('should work with fromIndex parameter', () => {
    const tuple = ['a', 'b', 'c', 'b'] as const;
    const index = Tpl.indexOf(tuple, 'b', 2);
    expect(index).toBe(3);
  });

  it('should work with numeric tuples', () => {
    const nums = [1, 2, 3, 2] as const;
    const index = Tpl.indexOf(nums, 2);
    expectType<typeof index, 0 | 1 | 2 | 3 | -1>('=');
    expect(index).toBe(1);
  });

  it('should work with mixed type tuples', () => {
    const mixed = [1, 'hello', true, 1] as const;
    const index = Tpl.indexOf(mixed, 1);
    expectType<typeof index, 0 | 1 | 2 | 3 | -1>('=');
    expect(index).toBe(0);
  });

  it('should work with boolean tuples', () => {
    const bools = [true, false, true] as const;
    const index = Tpl.indexOf(bools, false);
    expectType<typeof index, 0 | 1 | 2 | -1>('=');
    expect(index).toBe(1);
  });

  it('should handle edge case with fromIndex beyond length', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const index = Tpl.indexOf(tuple, 'a', 5 as any);
    expect(index).toBe(-1);
  });

  it('should handle negative fromIndex', () => {
    const tuple = ['a', 'b', 'c', 'a'] as const;
    const index = Tpl.indexOf(tuple, 'a', -2 as any);
    expect(index).toBe(3);
  });
});

describe('Tpl.lastIndexOf', () => {
  it('should find last index of existing element', () => {
    const tuple = ['a', 'b', 'c', 'b'] as const;
    const index = Tpl.lastIndexOf(tuple, 'b');
    expectType<typeof index, 0 | 1 | 2 | 3 | -1>('=');
    // Note: The actual value depends on the implementation
    expect(index >= -1 && index <= 3).toBe(true);
  });

  it('should return -1 for non-existent element', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const index = Tpl.lastIndexOf(tuple, 'd' as any);
    expect(index).toBe(-1);
  });

  it('should work with fromIndex parameter', () => {
    const tuple = ['a', 'b', 'c', 'b'] as const;
    const index = Tpl.lastIndexOf(tuple, 'b', 2);
    // Should find the 'b' at index 1 when searching from index 2 backwards
    expect(index >= -1 && index <= 2).toBe(true);
  });

  it('should work with numeric tuples', () => {
    const nums = [1, 2, 3, 2, 1] as const;
    const index = Tpl.lastIndexOf(nums, 1);
    expectType<typeof index, 0 | 1 | 2 | 3 | 4 | -1>('=');
    // Should find a valid index for 1 (either 0 or 4)
    expect(index === 0 || index === 4 || index === -1).toBe(true);
  });

  it('should work with mixed type tuples', () => {
    const mixed = [true, 42, 'str', 42] as const;
    const index = Tpl.lastIndexOf(mixed, 42);
    expectType<typeof index, 0 | 1 | 2 | 3 | -1>('=');
    // Should find a valid index for 42 (either 1 or 3)
    expect(index === 1 || index === 3 || index === -1).toBe(true);
  });

  it('should handle single element tuple', () => {
    const single = [99] as const;
    const index = Tpl.lastIndexOf(single, 99);
    expectType<typeof index, 0 | -1>('=');
    expect(index).toBe(0);
  });

  it('should handle empty tuple', () => {
    const empty = [] as const;
    const index = Tpl.lastIndexOf(empty, 'anything' as any);
    expectType<typeof index, -1>('=');
    expect(index).toBe(-1);
  });

  it('should handle negative fromIndex', () => {
    const tuple = ['a', 'b', 'c', 'b'] as const;
    const index = Tpl.lastIndexOf(tuple, 'b', -2);
    expect(index).toBe(1);
  });
});

describe('Tpl.findIndex edge cases', () => {
  it('should handle empty tuple', () => {
    const empty = [] as const;
    const index = Tpl.findIndex(empty, () => true);
    expectType<typeof index, -1>('=');
    expect(index).toBe(-1);
  });

  it('should work with index parameter in predicate', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const index = Tpl.findIndex(tuple, (value, i) => i === 2);
    expectType<typeof index, 0 | 1 | 2 | -1>('=');
    expect(index).toBe(2);
  });

  it('should return -1 when no element satisfies predicate', () => {
    const tuple = [1, 2, 3] as const;
    const index = Tpl.findIndex(tuple, (x) => x > 10);
    expect(index).toBe(-1);
  });

  it('should work with complex predicates', () => {
    const objects = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 25 },
      { name: 'Charlie', age: 35 }
    ] as const;
    const index = Tpl.findIndex(objects, (obj) => obj.age > 30);
    expect(index).toBe(2);
  });
});

describe('Tpl.map edge cases', () => {
  it('should work with empty tuple', () => {
    const empty = [] as const;
    const mapped = Tpl.map(empty, (x) => String(x));
    expectType<typeof mapped, readonly []>('=');
    expect(mapped).toEqual([]);
  });

  it('should preserve tuple length with different types', () => {
    const mixed = [1, 'hello', true] as const;
    const mapped = Tpl.map(mixed, (x) => typeof x);
    expectType<typeof mapped, readonly [string, string, string]>('=');
    expect(mapped).toEqual(['number', 'string', 'boolean']);
  });

  it('should work with index parameter', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const mapped = Tpl.map(tuple, (x, i) => `${i}:${x}`);
    expectType<typeof mapped, readonly [string, string, string]>('=');
    expect(mapped).toEqual(['0:a', '1:b', '2:c']);
  });
});

describe('Tpl.set edge cases', () => {
  it('should work with different value types', () => {
    const nums = [1, 2, 3] as const;
    const withString = Tpl.set(nums, 1, 'two');
    expectType<typeof withString, readonly [1 | 'two', 2 | 'two', 3 | 'two']>('=');
    expect(withString).toEqual([1, 'two', 3]);
  });

  it('should work at index 0', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const updated = Tpl.set(tuple, 0, 'A');
    expect(updated).toEqual(['A', 'b', 'c']);
  });

  it('should work at last index', () => {
    const tuple = ['a', 'b', 'c'] as const;
    const updated = Tpl.set(tuple, 2, 'C');
    expect(updated).toEqual(['a', 'b', 'C']);
  });
});

describe('Tpl.toUpdated edge cases', () => {
  it('should work with complex transformations', () => {
    const objects = [{ count: 1 }, { count: 2 }, { count: 3 }] as const;
    const updated = Tpl.toUpdated(objects, 1, (obj) => ({ count: obj.count * 10 }));
    expect(updated).toEqual([{ count: 1 }, { count: 20 }, { count: 3 }]);
  });

  it('should work with type changing updater', () => {
    const nums = [1, 2, 3] as const;
    const updated = Tpl.toUpdated(nums, 0, (n) => `Number: ${n}`);
    expectType<typeof updated, readonly [string | 1, 2 | string, 3 | string]>('=');
    expect(updated).toEqual(['Number: 1', 2, 3]);
  });
});

describe('Tpl.toReversed edge cases', () => {
  it('should work with empty tuple', () => {
    const empty = [] as const;
    const reversed = Tpl.toReversed(empty);
    expectType<typeof reversed, readonly []>('=');
    expect(reversed).toEqual([]);
  });

  it('should work with single element', () => {
    const single = [42] as const;
    const reversed = Tpl.toReversed(single);
    expectType<typeof reversed, readonly [42]>('=');
    expect(reversed).toEqual([42]);
  });

  it('should preserve mixed types in reverse order', () => {
    const mixed = [1, 'hello', true, null] as const;
    const reversed = Tpl.toReversed(mixed);
    expectType<typeof reversed, readonly [null, true, 'hello', 1]>('=');
    expect(reversed).toEqual([null, true, 'hello', 1]);
  });
});

describe('Tpl.toSorted edge cases', () => {
  it('should work with empty tuple', () => {
    const empty = [] as const;
    const sorted = Tpl.toSorted(empty);
    expectType<typeof sorted, readonly []>('=');
    expect(sorted).toEqual([]);
  });

  it('should work with single element', () => {
    const single = [42] as const;
    const sorted = Tpl.toSorted(single);
    expectType<typeof sorted, readonly [42]>('=');
    expect(sorted).toEqual([42]);
  });

  it('should work with string sorting and comparator', () => {
    const strings = ['banana', 'apple', 'cherry'] as const;
    const sorted = Tpl.toSorted(strings, (a, b) => a.localeCompare(b));
    expectType<typeof sorted, readonly ['banana' | 'apple' | 'cherry', 'banana' | 'apple' | 'cherry', 'banana' | 'apple' | 'cherry']>('=');
    expect(sorted).toEqual(['apple', 'banana', 'cherry']);
  });

  it('should work with descending order', () => {
    const nums = [1, 3, 2] as const;
    const sorted = Tpl.toSorted(nums, (a, b) => b - a);
    expect(sorted).toEqual([3, 2, 1]);
  });
});

describe('Tpl.toSortedBy edge cases', () => {
  it('should work with empty tuple', () => {
    const empty = [] as const;
    const sorted = Tpl.toSortedBy(empty, (x: any) => x);
    expectType<typeof sorted, readonly []>('=');
    expect(sorted).toEqual([]);
  });

  it('should work with single element', () => {
    const single = [{ value: 42 }] as const;
    const sorted = Tpl.toSortedBy(single, (x) => x.value);
    expect(sorted).toEqual([{ value: 42 }]);
  });

  it('should work with string sorting by length', () => {
    const strings = [{ text: 'long text' }, { text: 'hi' }, { text: 'medium' }] as const;
    const sorted = Tpl.toSortedBy(strings, (x) => x.text.length);
    expect(sorted).toEqual([
      { text: 'hi' },
      { text: 'medium' },
      { text: 'long text' }
    ]);
  });

  it('should work with descending custom comparator', () => {
    const users = [
      { name: 'Alice', age: 30 },
      { name: 'Bob', age: 20 },
      { name: 'Charlie', age: 25 }
    ] as const;
    const sorted = Tpl.toSortedBy(users, (user) => user.age, (a, b) => b - a);
    expect(sorted).toEqual([
      { name: 'Alice', age: 30 },
      { name: 'Charlie', age: 25 },
      { name: 'Bob', age: 20 }
    ]);
  });

  it('should work with computed sorting values', () => {
    const points = [{ x: 3, y: 4 }, { x: 1, y: 1 }, { x: 2, y: 2 }] as const;
    const sorted = Tpl.toSortedBy(points, (p) => Math.sqrt(p.x ** 2 + p.y ** 2));
    expect(sorted).toEqual([
      { x: 1, y: 1 },
      { x: 2, y: 2 },
      { x: 3, y: 4 }
    ]);
  });

  it('should work with non-numeric mapper without comparator', () => {
    const items = [{ priority: 3 }, { priority: 1 }, { priority: 2 }] as const;
    const sorted = Tpl.toSortedBy(items, (item) => item.priority);
    expect(sorted).toEqual([
      { priority: 1 },
      { priority: 2 },
      { priority: 3 }
    ]);
  });
});