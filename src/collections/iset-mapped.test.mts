import { ISetMapped } from './iset-mapped.mjs';

const toKey = (a: Readonly<{ v: number }>): number => a.v;
const fromKey = (k: number): Readonly<{ v: number }> => ({ v: k });

describe('ISetMapped[Symbol.iterator]', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
      toKey,
      fromKey,
    );

    expect(s0).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
    );
  });
});

describe('ISetMapped.size', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );

    expect(s0.size).toBe(3);
  });
});

describe('ISetMapped.has', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );

    expect(s0.has({ v: 3 })).toBe(true);
  });
  test('case 2', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );

    expect(s0.has({ v: 4 })).toBe(false);
  });
  test('case 3', () => {
    const s0 = ISetMapped.create<{ v: number }, number>([], toKey, fromKey);

    expect(s0.has({ v: 3 })).toBe(false);
  });
});

describe('ISetMapped.add', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );

    expect(s0.add({ v: 5 })).toStrictEqual(
      ISetMapped.create(
        [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 5 }],
        toKey,
        fromKey,
      ),
    );
    expect(s0).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
    );
  });
  test('case 2', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );

    expect(s0.add({ v: 3 })).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
    );
    expect(s0).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
    );
  });
  test('case 3', () => {
    const s0 = ISetMapped.create([], toKey, fromKey);

    expect(s0.add({ v: 1 })).toStrictEqual(
      ISetMapped.create([{ v: 1 }], toKey, fromKey),
    );
    expect(s0).toStrictEqual(ISetMapped.create([], toKey, fromKey));
  });
});

describe('ISetMapped.delete', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );

    expect(s0.delete({ v: 10 })).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
    );
    expect(s0).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
    );
  });
  test('case 2', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );

    expect(s0.delete({ v: 3 })).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey),
    );
    expect(s0).toStrictEqual(
      ISetMapped.create([{ v: 1 }, { v: 2 }, { v: 3 }], toKey, fromKey),
    );
  });
  test('case 3', () => {
    const s0 = ISetMapped.create([], toKey, fromKey);

    expect(s0.delete({ v: 1 })).toStrictEqual(
      ISetMapped.create([], toKey, fromKey),
    );
    expect(s0).toStrictEqual(ISetMapped.create([], toKey, fromKey));
  });
});

describe('ISetMapped.forEach', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const xs = [{ v: 1 }, { v: 2 }, { v: 3 }];

    for (const a of s0) {
      expect(xs).toContainEqual(a);
    }
  });
});

describe('ISetMapped.keys', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const xs = [{ v: 1 }, { v: 2 }, { v: 3 }];

    for (const k of s0.keys()) {
      expect(xs).toContainEqual(k);
    }
  });
});

describe('ISetMapped.values', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const xs = [{ v: 1 }, { v: 2 }, { v: 3 }];

    for (const k of s0.values()) {
      expect(xs).toContainEqual(k);
    }
  });
});

describe('ISetMapped.entries', () => {
  test('case 1', () => {
    const s0 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const xs = [{ v: 1 }, { v: 2 }, { v: 3 }];

    for (const [k, v] of s0.entries()) {
      expect(k).toBe(v);
      expect(xs).toContainEqual(k);
      expect(xs).toContainEqual(v);
    }
  });
});

describe('ISetMapped.union', () => {
  test('union of non-overlapping sets', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 3 }, { v: 4 }], toKey, fromKey);

    const result = s1.union(s2);

    expect(result.size).toBe(4);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
    expect(result.has({ v: 3 })).toBe(true);
    expect(result.has({ v: 4 })).toBe(true);
  });

  test('union of overlapping sets', () => {
    const s1 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const s2 = ISetMapped.create(
      [{ v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );

    const result = s1.union(s2);

    expect(result.size).toBe(4);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
    expect(result.has({ v: 3 })).toBe(true);
    expect(result.has({ v: 4 })).toBe(true);
  });

  test('union with empty set', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([], toKey, fromKey);

    const result = s1.union(s2);

    expect(result.size).toBe(2);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
  });

  test('union of identical sets', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);

    const result = s1.union(s2);

    expect(result.size).toBe(2);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
  });

  test('union should be commutative', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 3 }, { v: 4 }], toKey, fromKey);

    const result1 = s1.union(s2);
    const result2 = s2.union(s1);

    expect(ISetMapped.equal(result1, result2)).toBe(true);
  });

  test('union should handle duplicates correctly', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 2 }, { v: 3 }], toKey, fromKey);

    const result = s1.union(s2);

    // The union should have exactly 3 elements: {1}, {2}, {3}
    expect(result.size).toBe(3);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
    expect(result.has({ v: 3 })).toBe(true);

    // Verify no duplicates by checking the array length matches the set size
    const resultArray = result.toArray();
    expect(resultArray.length).toBe(result.size);
  });
});

describe('ISetMapped.intersect', () => {
  test('intersection of overlapping sets', () => {
    const s1 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const s2 = ISetMapped.create(
      [{ v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );

    const result = s1.intersect(s2);

    expect(result.size).toBe(2);
    expect(result.has({ v: 2 })).toBe(true);
    expect(result.has({ v: 3 })).toBe(true);
    expect(result.has({ v: 1 })).toBe(false);
    expect(result.has({ v: 4 })).toBe(false);
  });

  test('intersection of non-overlapping sets', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 3 }, { v: 4 }], toKey, fromKey);

    const result = s1.intersect(s2);

    expect(result.size).toBe(0);
    expect(result.isEmpty).toBe(true);
  });

  test('intersection with empty set', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([], toKey, fromKey);

    const result = s1.intersect(s2);

    expect(result.size).toBe(0);
    expect(result.isEmpty).toBe(true);
  });

  test('intersection of identical sets', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);

    const result = s1.intersect(s2);

    expect(result.size).toBe(2);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
  });

  test('intersection should be commutative', () => {
    const s1 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const s2 = ISetMapped.create(
      [{ v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );

    const result1 = s1.intersect(s2);
    const result2 = s2.intersect(s1);

    expect(ISetMapped.equal(result1, result2)).toBe(true);
  });
});

describe('ISetMapped.subtract', () => {
  test('subtract overlapping elements', () => {
    const s1 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const s2 = ISetMapped.create(
      [{ v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );

    const result = s1.subtract(s2);

    expect(result.size).toBe(1);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(false);
    expect(result.has({ v: 3 })).toBe(false);
    expect(result.has({ v: 4 })).toBe(false);
  });

  test('subtract non-overlapping elements', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 3 }, { v: 4 }], toKey, fromKey);

    const result = s1.subtract(s2);

    expect(result.size).toBe(2);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
  });

  test('subtract from empty set', () => {
    const s1 = ISetMapped.create([], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);

    const result = s1.subtract(s2);

    expect(result.size).toBe(0);
    expect(result.isEmpty).toBe(true);
  });

  test('subtract empty set', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([], toKey, fromKey);

    const result = s1.subtract(s2);

    expect(result.size).toBe(2);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
  });

  test('subtract identical sets', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);

    const result = s1.subtract(s2);

    expect(result.size).toBe(0);
    expect(result.isEmpty).toBe(true);
  });

  test('subtract is not commutative', () => {
    const s1 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const s2 = ISetMapped.create(
      [{ v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );

    const result1 = s1.subtract(s2); // Should be {1}
    const result2 = s2.subtract(s1); // Should be {4}

    expect(result1.size).toBe(1);
    expect(result1.has({ v: 1 })).toBe(true);

    expect(result2.size).toBe(1);
    expect(result2.has({ v: 4 })).toBe(true);

    expect(ISetMapped.equal(result1, result2)).toBe(false);
  });
});

describe('ISetMapped.diff static method', () => {
  test('diff with added and deleted elements', () => {
    const oldSet = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const newSet = ISetMapped.create(
      [{ v: 2 }, { v: 3 }, { v: 4 }, { v: 5 }],
      toKey,
      fromKey,
    );

    const result = ISetMapped.diff(oldSet, newSet);

    // Deleted: elements in oldSet but not in newSet
    expect(result.deleted.size).toBe(1);
    expect(result.deleted.has({ v: 1 })).toBe(true);

    // Added: elements in newSet but not in oldSet
    expect(result.added.size).toBe(2);
    expect(result.added.has({ v: 4 })).toBe(true);
    expect(result.added.has({ v: 5 })).toBe(true);
  });

  test('diff with no changes', () => {
    const oldSet = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const newSet = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);

    const result = ISetMapped.diff(oldSet, newSet);

    expect(result.deleted.size).toBe(0);
    expect(result.added.size).toBe(0);
  });

  test('diff with only additions', () => {
    const oldSet = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const newSet = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );

    const result = ISetMapped.diff(oldSet, newSet);

    expect(result.deleted.size).toBe(0);
    expect(result.added.size).toBe(2);
    expect(result.added.has({ v: 3 })).toBe(true);
    expect(result.added.has({ v: 4 })).toBe(true);
  });

  test('diff with only deletions', () => {
    const oldSet = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );
    const newSet = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);

    const result = ISetMapped.diff(oldSet, newSet);

    expect(result.deleted.size).toBe(2);
    expect(result.deleted.has({ v: 3 })).toBe(true);
    expect(result.deleted.has({ v: 4 })).toBe(true);
    expect(result.added.size).toBe(0);
  });

  test('diff from empty to non-empty', () => {
    const oldSet = ISetMapped.create([], toKey, fromKey);
    const newSet = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);

    const result = ISetMapped.diff(oldSet, newSet);

    expect(result.deleted.size).toBe(0);
    expect(result.added.size).toBe(2);
    expect(result.added.has({ v: 1 })).toBe(true);
    expect(result.added.has({ v: 2 })).toBe(true);
  });

  test('diff from non-empty to empty', () => {
    const oldSet = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const newSet = ISetMapped.create([], toKey, fromKey);

    const result = ISetMapped.diff(oldSet, newSet);

    expect(result.deleted.size).toBe(2);
    expect(result.deleted.has({ v: 1 })).toBe(true);
    expect(result.deleted.has({ v: 2 })).toBe(true);
    expect(result.added.size).toBe(0);
  });
});

describe('ISetMapped static methods', () => {
  test('ISetMapped.union static method', () => {
    const s1 = ISetMapped.create([{ v: 1 }, { v: 2 }], toKey, fromKey);
    const s2 = ISetMapped.create([{ v: 2 }, { v: 3 }], toKey, fromKey);

    const result = ISetMapped.union(s1, s2);

    expect(result.size).toBe(3);
    expect(result.has({ v: 1 })).toBe(true);
    expect(result.has({ v: 2 })).toBe(true);
    expect(result.has({ v: 3 })).toBe(true);
  });

  test('ISetMapped.intersection static method', () => {
    const s1 = ISetMapped.create(
      [{ v: 1 }, { v: 2 }, { v: 3 }],
      toKey,
      fromKey,
    );
    const s2 = ISetMapped.create(
      [{ v: 2 }, { v: 3 }, { v: 4 }],
      toKey,
      fromKey,
    );

    const result = ISetMapped.intersection(s1, s2);

    expect(result.size).toBe(2);
    expect(result.has({ v: 2 })).toBe(true);
    expect(result.has({ v: 3 })).toBe(true);
  });
});
