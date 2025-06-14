import { ISet } from './iset.mjs';

describe('ISet additional functionality', () => {
  describe('ISet.create', () => {
    it('should create empty set', () => {
      const set = ISet.create<string>([]);
      expect(set.size).toBe(0);
      expect(set.isEmpty).toBe(true);
    });

    it('should create set from JavaScript Set', () => {
      const jsSet = new Set(['a', 'b', 'c']);
      const set = ISet.create(jsSet);
      expect(set.size).toBe(3);
      expect(set.has('a')).toBe(true);
      expect(set.has('b')).toBe(true);
      expect(set.has('c')).toBe(true);
    });

    it('should create set from another ISet', () => {
      const original = ISet.create(['a', 'b', 'c']);
      const copy = ISet.create(original);
      expect(copy.size).toBe(3);
      expect(copy.has('a')).toBe(true);
      expect(copy.has('b')).toBe(true);
      expect(copy.has('c')).toBe(true);
    });

    it('should deduplicate elements', () => {
      const set = ISet.create([1, 2, 2, 3, 3, 3]);
      expect(set.size).toBe(3);
      expect(set.has(1)).toBe(true);
      expect(set.has(2)).toBe(true);
      expect(set.has(3)).toBe(true);
    });
  });

  describe('ISet.equal', () => {
    it('should return true for equal sets', () => {
      const set1 = ISet.create(['a', 'b', 'c']);
      const set2 = ISet.create(['a', 'b', 'c']);
      expect(ISet.equal(set1, set2)).toBe(true);
    });

    it('should return true regardless of creation order', () => {
      const set1 = ISet.create(['a', 'b', 'c']);
      const set2 = ISet.create(['c', 'b', 'a']);
      expect(ISet.equal(set1, set2)).toBe(true);
    });

    it('should return false for sets with different sizes', () => {
      const set1 = ISet.create<string>(['a', 'b']);
      const set2 = ISet.create<string>(['a', 'b', 'c']);
      expect(ISet.equal(set1, set2)).toBe(false);
    });

    it('should return false for sets with different elements', () => {
      const set1 = ISet.create(['a', 'b', 'c']) as ISet<'a' | 'b' | 'c' | 'd'>;
      const set2 = ISet.create(['a', 'b', 'd']) as ISet<'a' | 'b' | 'c' | 'd'>;
      expect(ISet.equal(set1, set2)).toBe(false);
    });

    it('should return true for empty sets', () => {
      const set1 = ISet.create<string>([]);
      const set2 = ISet.create<string>([]);
      expect(ISet.equal(set1, set2)).toBe(true);
    });
  });

  describe('isEmpty property', () => {
    it('should be true for empty set', () => {
      const set = ISet.create<number>([]);
      expect(set.isEmpty).toBe(true);
    });

    it('should be false for non-empty set', () => {
      const set = ISet.create([1, 2, 3]);
      expect(set.isEmpty).toBe(false);
    });
  });

  describe('some method', () => {
    it('should return true when at least one element satisfies predicate', () => {
      const set = ISet.create([1, 2, 3, 4, 5]);
      expect(set.some((x) => x % 2 === 0)).toBe(true);
    });

    it('should return false when no elements satisfy predicate', () => {
      const set = ISet.create([1, 3, 5]);
      expect(set.some((x) => x % 2 === 0)).toBe(false);
    });

    it('should return false for empty set', () => {
      const set = ISet.create<number>([]);
      expect(set.some((x) => x > 0)).toBe(false);
    });
  });

  describe('add method edge cases', () => {
    it('should return same instance when adding existing element', () => {
      const set = ISet.create(['a', 'b', 'c']);
      const updated = set.add('b');
      expect(updated).toBe(set);
    });

    it('should add new element and return new instance', () => {
      const set = ISet.create<string>(['a', 'b']);
      const updated = set.add('c');
      expect(updated).not.toBe(set);
      expect(updated.size).toBe(3);
      expect(updated.has('c')).toBe(true);
    });
  });

  describe('withMutations method', () => {
    it('should apply multiple mutations', () => {
      const set = ISet.create<string>(['a', 'b']);

      const updated = set.withMutations([
        { type: 'add', key: 'c' },
        { type: 'delete', key: 'a' },
        { type: 'add', key: 'd' },
      ]);

      expect(updated.size).toBe(3);
      expect(updated.has('a')).toBe(false);
      expect(updated.has('b')).toBe(true);
      expect(updated.has('c')).toBe(true);
      expect(updated.has('d')).toBe(true);
    });

    it('should handle empty mutations array', () => {
      const set = ISet.create(['a', 'b', 'c']);
      const updated = set.withMutations([]);
      expect(updated.size).toBe(set.size);
      expect(updated.has('a')).toBe(true);
      expect(updated.has('b')).toBe(true);
      expect(updated.has('c')).toBe(true);
    });

    it('should handle adding and deleting same element', () => {
      const set = ISet.create(['a']);
      const updated = set.withMutations([
        { type: 'delete', key: 'a' },
        { type: 'add', key: 'a' },
      ]);
      expect(updated.size).toBe(1);
      expect(updated.has('a')).toBe(true);
    });
  });

  describe('filter method', () => {
    it('should filter elements based on predicate', () => {
      const set = ISet.create([1, 2, 3, 4, 5]);
      const evens = set.filter((x) => x % 2 === 0);

      expect(evens.size).toBe(2);
      expect(evens.has(2)).toBe(true);
      expect(evens.has(4)).toBe(true);
      expect(evens.has(1)).toBe(false);
    });

    it('should work as type guard', () => {
      const set = ISet.create<string | number>(['a', 1, 'b', 2]);
      const strings = set.filter((x): x is string => typeof x === 'string');

      expect(strings.size).toBe(2);
      expect(strings.has('a')).toBe(true);
      expect(strings.has('b')).toBe(true);
    });

    it('should return empty set when no elements match', () => {
      const set = ISet.create([1, 3, 5]);
      const evens = set.filter((x) => x % 2 === 0);
      expect(evens.isEmpty).toBe(true);
    });
  });

  describe('filterNot method', () => {
    it('should exclude elements that match predicate', () => {
      const set = ISet.create([1, 2, 3, 4, 5]);
      const odds = set.filterNot((x) => x % 2 === 0);

      expect(odds.size).toBe(3);
      expect(odds.has(1)).toBe(true);
      expect(odds.has(3)).toBe(true);
      expect(odds.has(5)).toBe(true);
      expect(odds.has(2)).toBe(false);
      expect(odds.has(4)).toBe(false);
    });

    it('should return empty set when all elements match', () => {
      const set = ISet.create([2, 4, 6]);
      const odds = set.filterNot((x) => x % 2 === 0);
      expect(odds.isEmpty).toBe(true);
    });

    it('should return same elements when no elements match', () => {
      const set = ISet.create([1, 3, 5]);
      const nonEvens = set.filterNot((x) => x % 2 === 0);
      expect(nonEvens.size).toBe(3);
      expect(ISet.equal(set, nonEvens)).toBe(true);
    });
  });

  describe('ISet.diff', () => {
    it('should compute differences between sets', () => {
      const oldSet = ISet.create(['a', 'b', 'c']) as ISet<'a' | 'b' | 'c' | 'd'>;
      const newSet = ISet.create(['b', 'c', 'd']) as ISet<'a' | 'b' | 'c' | 'd'>;

      const diff = ISet.diff(oldSet, newSet);

      expect(diff.deleted.size).toBe(1);
      expect(diff.deleted.has('a')).toBe(true);

      expect(diff.added.size).toBe(1);
      expect(diff.added.has('d')).toBe(true);
    });

    it('should handle no changes', () => {
      const set1 = ISet.create(['a', 'b', 'c']);
      const set2 = ISet.create(['a', 'b', 'c']);

      const diff = ISet.diff(set1, set2);

      expect(diff.deleted.isEmpty).toBe(true);
      expect(diff.added.isEmpty).toBe(true);
    });

    it('should handle complete replacement', () => {
      const oldSet = ISet.create(['a', 'b']) as ISet<'a' | 'b' | 'c' | 'd'>;
      const newSet = ISet.create(['c', 'd']) as ISet<'a' | 'b' | 'c' | 'd'>;

      const diff = ISet.diff(oldSet, newSet);

      expect(diff.deleted.size).toBe(2);
      expect(diff.deleted.has('a')).toBe(true);
      expect(diff.deleted.has('b')).toBe(true);

      expect(diff.added.size).toBe(2);
      expect(diff.added.has('c')).toBe(true);
      expect(diff.added.has('d')).toBe(true);
    });
  });

  describe('intersect method', () => {
    it('should find common elements', () => {
      const set1 = ISet.create<number>([1, 2, 3, 4]);
      const set2 = ISet.create<number>([3, 4, 5, 6]);

      const intersection = set1.intersect(set2);

      expect(intersection.size).toBe(2);
      expect(intersection.has(3)).toBe(true);
      expect(intersection.has(4)).toBe(true);
    });

    it('should return empty set for no common elements', () => {
      const set1 = ISet.create<number>([1, 2]);
      const set2 = ISet.create<number>([3, 4]);

      const intersection = set1.intersect(set2);
      expect(intersection.isEmpty).toBe(true);
    });

    it('should work with empty sets', () => {
      const set1 = ISet.create<number>([1, 2, 3]);
      const set2 = ISet.create<number>([]);

      const intersection = set1.intersect(set2);
      expect(intersection.isEmpty).toBe(true);
    });
  });

  describe('union method', () => {
    it('should combine all elements', () => {
      const set1 = ISet.create([1, 2, 3]);
      const set2 = ISet.create([3, 4, 5]);

      const union = set1.union(set2);

      expect(union.size).toBe(5);
      expect(union.has(1)).toBe(true);
      expect(union.has(2)).toBe(true);
      expect(union.has(3)).toBe(true);
      expect(union.has(4)).toBe(true);
      expect(union.has(5)).toBe(true);
    });

    it('should work with different types', () => {
      const numbers = ISet.create([1, 2]);
      const strings = ISet.create(['a', 'b']);

      const union = numbers.union(strings);

      expect(union.size).toBe(4);
      expect(union.has(1)).toBe(true);
      expect(union.has(2)).toBe(true);
      expect(union.has('a')).toBe(true);
      expect(union.has('b')).toBe(true);
    });

    it('should work with empty sets', () => {
      const set1 = ISet.create<number>([1, 2, 3]);
      const set2 = ISet.create<number>([]);

      const union = set1.union(set2);

      expect(union.size).toBe(3);
      expect(ISet.equal(union, set1)).toBe(true);
    });
  });

  describe('conversion methods', () => {
    const set = ISet.create(['a', 'b', 'c']);

    describe('toArray', () => {
      it('should return array of elements', () => {
        const array = set.toArray();
        expect(array).toHaveLength(3);
        expect(array).toContain('a');
        expect(array).toContain('b');
        expect(array).toContain('c');
      });
    });

    describe('toRawSet', () => {
      it('should return underlying ReadonlySet', () => {
        const rawSet = set.toRawSet();
        expect(rawSet.size).toBe(3);
        expect(rawSet.has('a')).toBe(true);
        expect(rawSet.has('b')).toBe(true);
        expect(rawSet.has('c')).toBe(true);
      });
    });
  });

  describe('iterable functionality', () => {
    it('should work with for-of loops', () => {
      const set = ISet.create(['a', 'b', 'c']);
      const collected: string[] = [];

      for (const element of set) {
        collected.push(element);
      }

      expect(collected).toHaveLength(3);
      expect(collected).toContain('a');
      expect(collected).toContain('b');
      expect(collected).toContain('c');
    });

    it('should work with spread operator', () => {
      const set = ISet.create(['a', 'b', 'c']);
      const elements = [...set];

      expect(elements).toHaveLength(3);
      expect(elements).toContain('a');
      expect(elements).toContain('b');
      expect(elements).toContain('c');
    });

    it('should work with Array.from', () => {
      const set = ISet.create(['a', 'b', 'c']);
      const elements = Array.from(set);

      expect(elements).toHaveLength(3);
      expect(elements).toContain('a');
      expect(elements).toContain('b');
      expect(elements).toContain('c');
    });
  });

  describe('forEach method', () => {
    it('should execute callback for each element', () => {
      const set = ISet.create(['a', 'b', 'c']);
      const collected: string[] = [];

      set.forEach((element) => {
        collected.push(element);
      });

      expect(collected).toHaveLength(3);
      expect(collected).toContain('a');
      expect(collected).toContain('b');
      expect(collected).toContain('c');
    });

    it('should work with empty set', () => {
      const set = ISet.create<string>([]);
      let called = false;

      set.forEach(() => {
        called = true;
      });

      expect(called).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('should handle NaN values correctly', () => {
      const set = ISet.create([Number.NaN, 1, 2]);
      expect(set.has(Number.NaN)).toBe(true);
      expect(set.size).toBe(3);
    });

    it('should handle boolean values', () => {
      const set = ISet.create([true, false, true]);
      expect(set.size).toBe(2);
      expect(set.has(true)).toBe(true);
      expect(set.has(false)).toBe(true);
    });

    it('should handle string number values', () => {
      const set = ISet.create(['1', '2', '3']);
      expect(set.has('1')).toBe(true);
      // @ts-expect-error Testing type coercion
      expect(set.has(1)).toBe(false); // Different types
    });

    it('should handle null and undefined', () => {
      const set = ISet.create([null, undefined, 'value']);
      expect(set.size).toBe(3);
      expect(set.has(null)).toBe(true);
      expect(set.has(undefined)).toBe(true);
    });
  });

  describe('immutability', () => {
    it('should not modify original set when adding', () => {
      const original = ISet.create<string>(['a', 'b']);
      const modified = original.add('c');

      expect(original.size).toBe(2);
      expect(modified.size).toBe(3);
      expect(original.has('c')).toBe(false);
      expect(modified.has('c')).toBe(true);
    });

    it('should not modify original set when deleting', () => {
      const original = ISet.create(['a', 'b', 'c']);
      const modified = original.delete('a');

      expect(original.size).toBe(3);
      expect(modified.size).toBe(2);
      expect(original.has('a')).toBe(true);
      expect(modified.has('a')).toBe(false);
    });

    it('should not modify original set when filtering', () => {
      const original = ISet.create([1, 2, 3, 4]);
      const modified = original.filter((x) => x % 2 === 0);

      expect(original.size).toBe(4);
      expect(modified.size).toBe(2);
      expect(original.has(1)).toBe(true);
      expect(modified.has(1)).toBe(false);
    });
  });

  describe('static utility functions', () => {
    describe('ISet.intersection', () => {
      it('should work as static method', () => {
        const set1 = ISet.create([1, 2, 3]) as ISet<1 | 2 | 3 | 4>;
        const set2 = ISet.create([2, 3, 4]) as ISet<1 | 2 | 3 | 4>;

        const intersection = ISet.intersection(set1, set2);
        expect(intersection.size).toBe(2);
        expect(intersection.has(2)).toBe(true);
        expect(intersection.has(3)).toBe(true);
      });
    });

    describe('ISet.union', () => {
      it('should work as static method', () => {
        const set1 = ISet.create([1, 2]);
        const set2 = ISet.create([2, 3]);

        const union = ISet.union(set1, set2);
        expect(union.size).toBe(3);
        expect(union.has(1)).toBe(true);
        expect(union.has(2)).toBe(true);
        expect(union.has(3)).toBe(true);
      });
    });
  });

  describe('every method as type guard', () => {
    it('should work as type guard', () => {
      const set = ISet.create<string | number>(['a', 'b', 'c']);
      if (set.every((x): x is string => typeof x === 'string')) {
        // Type should be narrowed to ISet<string>
        const firstElement = set.toArray()[0];
        expect(typeof firstElement).toBe('string');
      }
    });
  });
});
