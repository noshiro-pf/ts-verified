import { Obj } from './object.mjs';

describe('shallowEq', () => {
  test('truthy case 1', () => {
    expect(Obj.shallowEq({ x: 0 }, { x: 0 })).toBe(true);
  });

  test('truthy case 2', () => {
    expect(Obj.shallowEq({}, {})).toBe(true);
  });

  test('falsy case 1', () => {
    expect(Obj.shallowEq({ x: 0 }, { x: 0, y: 0 })).toBe(false);
  });

  test('falsy case 2', () => {
    expect(Obj.shallowEq({ x: 0, y: 0 }, { x: 0 })).toBe(false);
  });

  test('falsy case 3', () => {
    expect(Obj.shallowEq({ x: 0 }, { y: 0 })).toBe(false);
  });

  test('type error', () => {
    // @ts-expect-error Arrays cannot be the value of an arg object.
    expect(Obj.shallowEq({ x: [] }, { y: 0 })).toBe(false);
  });
});

describe('pick', () => {
  test('truthy case 1', () => {
    expect(Obj.pick({ a: 1, b: 2, c: 3 }, ['a', 'b'])).toStrictEqual({
      a: 1,
      b: 2,
    });
  });

  test('should support curried form', () => {
    const pickAB = Obj.pick(['a', 'b'] as const);
    const result = pickAB({ a: 1, b: 2, c: 3, d: 4 });
    expect(result).toStrictEqual({ a: 1, b: 2 });
  });

  test('should work with pipe when curried', async () => {
    const { pipe } = await import('../functional/pipe.mjs');
    
    const pickIdAndName = Obj.pick(['id', 'name'] as const);
    const user = { id: 1, name: 'Alice', email: 'alice@example.com', age: 30 };
    
    const result = pipe(user).map(pickIdAndName).value;
    expect(result).toStrictEqual({ id: 1, name: 'Alice' });
  });

  test('should handle empty keys in curried form', () => {
    const pickNone = Obj.pick([] as const);
    const result = pickNone({ a: 1, b: 2 });
    expect(result).toStrictEqual({});
  });
});

describe('omit', () => {
  test('truthy case 1', () => {
    expect(Obj.omit({ a: 1, b: 2, c: 3 }, ['c'])).toStrictEqual({ a: 1, b: 2 });
  });

  test('should support curried form', () => {
    const omitC = Obj.omit(['c'] as const);
    const result = omitC({ a: 1, b: 2, c: 3, d: 4 });
    expect(result).toStrictEqual({ a: 1, b: 2, d: 4 });
  });

  test('should work with pipe when curried', async () => {
    const { pipe } = await import('../functional/pipe.mjs');
    
    const omitSensitive = Obj.omit(['password', 'email'] as const);
    const user = { 
      id: 1, 
      name: 'Alice', 
      email: 'alice@example.com', 
      password: 'secret123' 
    };
    
    const result = pipe(user).map(omitSensitive).value;
    expect(result).toStrictEqual({ id: 1, name: 'Alice' });
  });

  test('should handle empty keys in curried form', () => {
    const omitNone = Obj.omit([] as const);
    const original = { a: 1, b: 2, c: 3 };
    const result = omitNone(original);
    expect(result).toStrictEqual(original);
  });

  test('should omit multiple keys in curried form', () => {
    const omitBAndD = Obj.omit(['b', 'd'] as const);
    const result = omitBAndD({ a: 1, b: 2, c: 3, d: 4, e: 5 });
    expect(result).toStrictEqual({ a: 1, c: 3, e: 5 });
  });
});
