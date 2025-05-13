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
});

describe('omit', () => {
  test('truthy case 1', () => {
    expect(Obj.omit({ a: 1, b: 2, c: 3 }, ['c'])).toStrictEqual({ a: 1, b: 2 });
  });
});
