import { describe, expect, it } from 'vitest';

import { ISetMapped } from './iset-mapped.mjs';

type TestElement = { id: number; type: string };
const testElementToString = (elem: TestElement): string => `${elem.type}_${elem.id}`;
const stringToTestElement = (str: string): TestElement => {
  const [type, idStr] = str.split('_');
  return { type, id: Number(idStr) };
};

describe('ISetMapped additional functionality', () => {
  describe('ISetMapped.create', () => {
    it('should create empty set', () => {
      const set = ISetMapped.create<TestElement, string>([], testElementToString, stringToTestElement);
      expect(set.size).toBe(0);
      expect(set.isEmpty).toBe(true);
    });

    it('should create set with initial elements', () => {
      const elements: TestElement[] = [
        { id: 1, type: 'user' },
        { id: 2, type: 'admin' }
      ];
      const set = ISetMapped.create(elements, testElementToString, stringToTestElement);
      expect(set.size).toBe(2);
      expect(set.isEmpty).toBe(false);
      expect(set.has({ id: 1, type: 'user' })).toBe(true);
    });

    it('should handle duplicate elements', () => {
      const elements: TestElement[] = [
        { id: 1, type: 'user' },
        { id: 1, type: 'user' }, // duplicate
        { id: 2, type: 'admin' }
      ];
      const set = ISetMapped.create(elements, testElementToString, stringToTestElement);
      expect(set.size).toBe(2); // duplicates removed
    });
  });

  describe('ISetMapped.equal', () => {
    it('should return true for equal sets', () => {
      const set1 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const set2 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      expect(ISetMapped.equal(set1, set2)).toBe(true);
    });

    it('should return false for sets with different sizes', () => {
      const set1 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const set2 = ISetMapped.create<TestElement, string>(
        [],
        testElementToString,
        stringToTestElement
      );
      expect(ISetMapped.equal(set1, set2)).toBe(false);
    });

    it('should return false for sets with different elements', () => {
      const set1 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const set2 = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      expect(ISetMapped.equal(set1, set2)).toBe(false);
    });

    it('should return true for empty sets', () => {
      const set1 = ISetMapped.create<TestElement, string>([], testElementToString, stringToTestElement);
      const set2 = ISetMapped.create<TestElement, string>([], testElementToString, stringToTestElement);
      expect(ISetMapped.equal(set1, set2)).toBe(true);
    });
  });

  describe('ISetMapped.diff', () => {
    it('should compute difference between sets', () => {
      const oldSet = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      const newSet = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }, { id: 3, type: 'guest' }],
        testElementToString,
        stringToTestElement
      );

      const diff = ISetMapped.diff(oldSet, newSet);

      expect(diff.deleted.size).toBe(1);
      expect(diff.deleted.has({ id: 1, type: 'user' })).toBe(true);

      expect(diff.added.size).toBe(1);
      expect(diff.added.has({ id: 3, type: 'guest' })).toBe(true);
    });

    it('should handle empty differences', () => {
      const set1 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const set2 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );

      const diff = ISetMapped.diff(set1, set2);

      expect(diff.deleted.size).toBe(0);
      expect(diff.added.size).toBe(0);
    });
  });

  describe('ISetMapped.intersection', () => {
    it('should compute intersection of sets', () => {
      const setA = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      const setB = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }, { id: 3, type: 'guest' }],
        testElementToString,
        stringToTestElement
      );

      const intersection = ISetMapped.intersection(setA, setB);

      expect(intersection.size).toBe(1);
      expect(intersection.has({ id: 2, type: 'admin' })).toBe(true);
    });

    it('should handle empty intersection', () => {
      const setA = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const setB = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );

      const intersection = ISetMapped.intersection(setA, setB);
      expect(intersection.size).toBe(0);
    });
  });

  describe('ISetMapped.union', () => {
    it('should compute union of sets', () => {
      const setA = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const setB = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );

      const union = ISetMapped.union(setA, setB);

      expect(union.size).toBe(2);
      expect(union.has({ id: 1, type: 'user' })).toBe(true);
      expect(union.has({ id: 2, type: 'admin' })).toBe(true);
    });

    it('should handle overlapping sets', () => {
      const setA = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      const setB = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }, { id: 3, type: 'guest' }],
        testElementToString,
        stringToTestElement
      );

      const union = ISetMapped.union(setA, setB);

      expect(union.size).toBe(3);
      expect(union.has({ id: 1, type: 'user' })).toBe(true);
      expect(union.has({ id: 2, type: 'admin' })).toBe(true);
      expect(union.has({ id: 3, type: 'guest' })).toBe(true);
    });
  });

  describe('every method', () => {
    it('should return true when all elements satisfy predicate', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'user' }, { id: 4, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      expect(set.every((elem) => elem.id % 2 === 0)).toBe(true);
    });

    it('should return false when some elements do not satisfy predicate', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'user' }, { id: 3, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      expect(set.every((elem) => elem.id % 2 === 0)).toBe(false);
    });

    it('should return true for empty set', () => {
      const set = ISetMapped.create<TestElement, string>([], testElementToString, stringToTestElement);
      expect(set.every((elem) => elem.id > 0)).toBe(true);
    });
  });

  describe('some method', () => {
    it('should return true when at least one element satisfies predicate', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 4, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      expect(set.some((elem) => elem.id % 2 === 0)).toBe(true);
    });

    it('should return false when no elements satisfy predicate', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 3, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      expect(set.some((elem) => elem.id % 2 === 0)).toBe(false);
    });

    it('should return false for empty set', () => {
      const set = ISetMapped.create<TestElement, string>([], testElementToString, stringToTestElement);
      expect(set.some((elem) => elem.id > 0)).toBe(false);
    });
  });

  describe('add method', () => {
    it('should add new element', () => {
      const set = ISetMapped.create<TestElement, string>([], testElementToString, stringToTestElement);
      const updated = set.add({ id: 1, type: 'user' });
      
      expect(updated.size).toBe(1);
      expect(updated.has({ id: 1, type: 'user' })).toBe(true);
    });

    it('should return same set when adding existing element', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const updated = set.add({ id: 1, type: 'user' });
      
      expect(updated).toBe(set); // Should return same instance
    });
  });

  describe('delete method', () => {
    it('should delete existing element', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const updated = set.delete({ id: 1, type: 'user' });
      
      expect(updated.size).toBe(0);
      expect(updated.has({ id: 1, type: 'user' })).toBe(false);
    });

    it('should return same set when deleting non-existent element', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const updated = set.delete({ id: 2, type: 'admin' });
      
      expect(updated).toBe(set); // Should return same instance
    });
  });

  describe('withMutations method', () => {
    it('should apply multiple mutations', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      
      const updated = set.withMutations([
        { type: 'add', key: { id: 2, type: 'admin' } },
        { type: 'add', key: { id: 3, type: 'guest' } },
        { type: 'delete', key: { id: 1, type: 'user' } }
      ]);

      expect(updated.size).toBe(2);
      expect(updated.has({ id: 2, type: 'admin' })).toBe(true);
      expect(updated.has({ id: 3, type: 'guest' })).toBe(true);
      expect(updated.has({ id: 1, type: 'user' })).toBe(false);
    });

    it('should handle empty mutations array', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const updated = set.withMutations([]);
      expect(ISetMapped.equal(set, updated)).toBe(true);
    });
  });

  describe('map method', () => {
    it('should transform elements', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      const mapped = set.map((elem) => ({ ...elem, id: elem.id + 100 }));
      
      expect(mapped.size).toBe(2);
      expect(mapped.has({ id: 101, type: 'user' })).toBe(true);
      expect(mapped.has({ id: 102, type: 'admin' })).toBe(true);
    });
  });

  describe('filter method', () => {
    it('should filter elements', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }, { id: 3, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const filtered = set.filter((elem) => elem.type === 'user');
      
      expect(filtered.size).toBe(2);
      expect(filtered.has({ id: 1, type: 'user' })).toBe(true);
      expect(filtered.has({ id: 3, type: 'user' })).toBe(true);
      expect(filtered.has({ id: 2, type: 'admin' })).toBe(false);
    });
  });

  describe('filterNot method', () => {
    it('should filter out elements', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }, { id: 3, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const filtered = set.filterNot((elem) => elem.type === 'user');
      
      expect(filtered.size).toBe(1);
      expect(filtered.has({ id: 2, type: 'admin' })).toBe(true);
      expect(filtered.has({ id: 1, type: 'user' })).toBe(false);
      expect(filtered.has({ id: 3, type: 'user' })).toBe(false);
    });
  });

  describe('forEach method', () => {
    it('should iterate over all elements', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      const elements: TestElement[] = [];
      set.forEach((elem) => elements.push(elem));
      
      expect(elements).toHaveLength(2);
      expect(elements).toContainEqual({ id: 1, type: 'user' });
      expect(elements).toContainEqual({ id: 2, type: 'admin' });
    });
  });

  describe('isSubsetOf method', () => {
    it('should return true for proper subset', () => {
      const subset = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const superset = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      expect(subset.isSubsetOf(superset)).toBe(true);
    });

    it('should return false for non-subset', () => {
      const set1 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const set2 = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      expect(set1.isSubsetOf(set2)).toBe(false);
    });

    it('should return true for equal sets', () => {
      const set1 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const set2 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      
      expect(set1.isSubsetOf(set2)).toBe(true);
    });
  });

  describe('isSupersetOf method', () => {
    it('should return true for proper superset', () => {
      const superset = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      const subset = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      
      expect(superset.isSupersetOf(subset)).toBe(true);
    });

    it('should return false for non-superset', () => {
      const set1 = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const set2 = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      expect(set1.isSupersetOf(set2)).toBe(false);
    });
  });

  describe('subtract method', () => {
    it('should compute set difference', () => {
      const setA = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      const setB = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      const difference = setA.subtract(setB);
      
      expect(difference.size).toBe(1);
      expect(difference.has({ id: 1, type: 'user' })).toBe(true);
      expect(difference.has({ id: 2, type: 'admin' })).toBe(false);
    });
  });

  describe('intersect method', () => {
    it('should compute set intersection', () => {
      const setA = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      const setB = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }, { id: 3, type: 'guest' }],
        testElementToString,
        stringToTestElement
      );
      
      const intersection = setA.intersect(setB);
      
      expect(intersection.size).toBe(1);
      expect(intersection.has({ id: 2, type: 'admin' })).toBe(true);
    });
  });

  describe('union method', () => {
    it('should compute set union', () => {
      const setA = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      const setB = ISetMapped.create<TestElement, string>(
        [{ id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      const union = setA.union(setB);
      
      expect(union.size).toBe(2);
      expect(union.has({ id: 1, type: 'user' })).toBe(true);
      expect(union.has({ id: 2, type: 'admin' })).toBe(true);
    });
  });

  describe('iteration methods', () => {
    it('should provide keys iterator', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      const keys = Array.from(set.keys());
      expect(keys).toHaveLength(2);
      expect(keys).toContainEqual({ id: 1, type: 'user' });
      expect(keys).toContainEqual({ id: 2, type: 'admin' });
    });

    it('should provide values iterator', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      const values = Array.from(set.values());
      expect(values).toHaveLength(2);
      expect(values).toContainEqual({ id: 1, type: 'user' });
      expect(values).toContainEqual({ id: 2, type: 'admin' });
    });

    it('should provide entries iterator', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      
      const entries = Array.from(set.entries());
      expect(entries).toHaveLength(1);
      expect(entries[0]).toEqual([{ id: 1, type: 'user' }, { id: 1, type: 'user' }]);
    });

    it('should be iterable', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      const elements = [...set];
      expect(elements).toHaveLength(2);
      expect(elements).toContainEqual({ id: 1, type: 'user' });
      expect(elements).toContainEqual({ id: 2, type: 'admin' });
    });
  });

  describe('conversion methods', () => {
    it('should convert to array', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }, { id: 2, type: 'admin' }],
        testElementToString,
        stringToTestElement
      );
      
      const array = set.toArray();
      expect(array).toHaveLength(2);
      expect(array).toContainEqual({ id: 1, type: 'user' });
      expect(array).toContainEqual({ id: 2, type: 'admin' });
    });

    it('should convert to raw set', () => {
      const set = ISetMapped.create<TestElement, string>(
        [{ id: 1, type: 'user' }],
        testElementToString,
        stringToTestElement
      );
      
      const rawSet = set.toRawSet();
      expect(rawSet.size).toBe(1);
      expect(rawSet.has('user_1')).toBe(true);
    });
  });
});