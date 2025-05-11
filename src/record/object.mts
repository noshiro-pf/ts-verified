const shallowEq = (
  a: ReadonlyRecord<string, Primitive>,
  b: ReadonlyRecord<string, Primitive>,
): boolean => {
  const aEntries = Object.entries(a);
  const bEntries = Object.entries(b);

  if (aEntries.length !== bEntries.length) return false;

  return aEntries.every(([k, v]) => b[k] === v);
};

/**
 * Creates a new record that contains the `keys` of `record` and omits the rest.
 *
 * Example:
 *
 * ```ts
 * expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toStrictEqual({
 *   a: 1,
 *   b: 2,
 * });
 * ```
 */
const pick = <
  const R extends UnknownRecord,
  const Keys extends readonly (keyof R)[],
>(
  record: R,
  keys: Keys,
): Pick<R, ArrayElement<Keys>> => {
  const keysSet = new Set<keyof R>(keys);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return Object.fromEntries(
    Object.entries(record).filter(([k, _v]) => keysSet.has(k)),
  ) as never;
};

/**
 * Creates a new record that omits the `keys` of `record` and contains the rest.
 *
 * Example:
 *
 * ```ts
 * expect(omit({ a: 1, b: 2, c: 3 }, ['c'])).toStrictEqual({ a: 1, b: 2 });
 * ```
 */
const omit = <
  const R extends UnknownRecord,
  const Keys extends readonly (keyof R)[],
>(
  record: R,
  keys: Keys,
): Omit<R, ArrayElement<Keys>> => {
  const keysSet = new Set<keyof R>(keys);
  // eslint-disable-next-line @typescript-eslint/no-unsafe-type-assertion
  return Object.fromEntries(
    Object.entries(record).filter(([k, _v]) => !keysSet.has(k)),
  ) as never;
};

if (import.meta.vitest !== undefined) {
  describe('shallowEq', () => {
    test('truthy case 1', () => {
      expect(shallowEq({ x: 0 }, { x: 0 })).toBe(true);
    });

    test('truthy case 2', () => {
      expect(shallowEq({}, {})).toBe(true);
    });

    test('falsy case 1', () => {
      expect(shallowEq({ x: 0 }, { x: 0, y: 0 })).toBe(false);
    });

    test('falsy case 2', () => {
      expect(shallowEq({ x: 0, y: 0 }, { x: 0 })).toBe(false);
    });

    test('falsy case 3', () => {
      expect(shallowEq({ x: 0 }, { y: 0 })).toBe(false);
    });

    test('type error', () => {
      // @ts-expect-error Arrays cannot be the value of an arg object.
      expect(shallowEq({ x: [] }, { y: 0 })).toBe(false);
    });
  });

  describe('pick', () => {
    test('truthy case 1', () => {
      expect(pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toStrictEqual({
        a: 1,
        b: 2,
      });
    });
  });

  describe('omit', () => {
    test('truthy case 1', () => {
      expect(omit({ a: 1, b: 2, c: 3 }, ['c'])).toStrictEqual({ a: 1, b: 2 });
    });
  });
}

export const Obj = {
  shallowEq,
  pick,
  omit,
} as const;
