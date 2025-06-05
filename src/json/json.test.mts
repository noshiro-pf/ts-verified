import { Result } from '../functional/result.mjs';
import { Json } from './json.mjs';

describe('parse', () => {
  test('should parse primitive values', () => {
    expect(Json.parse('"hello"')).toStrictEqual(Result.ok('hello'));
    expect(Json.parse('42')).toStrictEqual(Result.ok(42));
    expect(Json.parse('true')).toStrictEqual(Result.ok(true));
    expect(Json.parse('false')).toStrictEqual(Result.ok(false));
    expect(Json.parse('null')).toStrictEqual(Result.ok(null));
  });

  test('should parse arrays', () => {
    expect(Json.parse('[1,2,3]')).toStrictEqual(Result.ok([1, 2, 3]));
    expect(Json.parse('["a","b","c"]')).toStrictEqual(
      Result.ok(['a', 'b', 'c']),
    );
    expect(Json.parse('[1,"two",true,null]')).toStrictEqual(
      Result.ok([1, 'two', true, null]),
    );
  });

  test('should parse objects', () => {
    expect(Json.parse('{"a":1,"b":2}')).toStrictEqual(
      Result.ok({ a: 1, b: 2 }),
    );
    expect(Json.parse('{"name":"test","value":42}')).toStrictEqual(
      Result.ok({
        name: 'test',
        value: 42,
      }),
    );
  });

  test('should parse nested structures', () => {
    const json = '{"level1":{"level2":{"array":[1,2,{"level3":"deep"}]}}}';
    const expected = {
      level1: {
        level2: {
          array: [1, 2, { level3: 'deep' }],
        },
      },
    };
    expect(Json.parse(json)).toStrictEqual(Result.ok(expected));
  });

  test('should handle whitespace', () => {
    expect(Json.parse('  {  "a" : 1 ,  "b" : 2  }  ')).toStrictEqual(
      Result.ok({ a: 1, b: 2 }),
    );
    expect(Json.parse('\n[\n  1,\n  2,\n  3\n]\n')).toStrictEqual(
      Result.ok([1, 2, 3]),
    );
  });

  test('should return error for invalid JSON', () => {
    expect(Result.isErr(Json.parse('invalid'))).toBe(true);
    expect(Result.isErr(Json.parse('{missing quotes: true}'))).toBe(true);
    expect(Result.isErr(Json.parse('[1,2,]'))).toBe(true); // Trailing comma
    expect(Result.isErr(Json.parse('undefined'))).toBe(true);
  });

  test('should return parsed value for valid JSON', () => {
    expect(Json.parse('{"a":1}')).toStrictEqual(Result.ok({ a: 1 }));
    expect(Json.parse('[1,2,3]')).toStrictEqual(Result.ok([1, 2, 3]));
    expect(Json.parse('"string"')).toStrictEqual(Result.ok('string'));
    expect(Json.parse('42')).toStrictEqual(Result.ok(42));
    expect(Json.parse('true')).toStrictEqual(Result.ok(true));
    expect(Json.parse('null')).toStrictEqual(Result.ok(null));
  });

  test('should return error for invalid JSON cases', () => {
    expect(Result.isErr(Json.parse('invalid'))).toBe(true);
    expect(Result.isErr(Json.parse('{bad json}'))).toBe(true);
    expect(Result.isErr(Json.parse('[1,2,]'))).toBe(true);
    expect(Result.isErr(Json.parse('undefined'))).toBe(true);
    expect(Result.isErr(Json.parse(''))).toBe(true);
  });

  test('should handle edge cases', () => {
    expect(Json.parse('0')).toStrictEqual(Result.ok(0));
    expect(Json.parse('""')).toStrictEqual(Result.ok(''));
    expect(Json.parse('[]')).toStrictEqual(Result.ok([]));
    expect(Json.parse('{}')).toStrictEqual(Result.ok({}));
  });

  test('should not throw errors', () => {
    expect(() => Json.parse('{{{')).not.toThrow();
    expect(() => Json.parse('null null')).not.toThrow();

    // @ts-expect-error undefined is not a valid JSON
    expect(() => Json.parse(undefined)).not.toThrow();
  });
});

describe('stringify', () => {
  test('should stringify primitive values', () => {
    expect(Json.stringify('hello')).toStrictEqual(Result.ok('"hello"'));
    expect(Json.stringify(42)).toStrictEqual(Result.ok('42'));
    expect(Json.stringify(true)).toStrictEqual(Result.ok('true'));
    expect(Json.stringify(null)).toStrictEqual(Result.ok('null'));
  });

  test('should stringify arrays', () => {
    expect(Json.stringify([1, 2, 3])).toStrictEqual(Result.ok('[1,2,3]'));
    expect(Json.stringify(['a', 'b', 'c'])).toStrictEqual(
      Result.ok('["a","b","c"]'),
    );
    expect(Json.stringify([1, 'two', true, null])).toStrictEqual(
      Result.ok('[1,"two",true,null]'),
    );
  });

  test('should stringify objects', () => {
    expect(Json.stringify({ a: 1, b: 2 })).toStrictEqual(
      Result.ok('{"a":1,"b":2}'),
    );
    expect(Json.stringify({ name: 'test', value: 42 })).toStrictEqual(
      Result.ok('{"name":"test","value":42}'),
    );
  });

  test('should stringify nested structures', () => {
    const nested = {
      level1: {
        level2: {
          array: [1, 2, { level3: 'deep' }],
        },
      },
    };
    expect(Json.stringify(nested)).toStrictEqual(
      Result.ok('{"level1":{"level2":{"array":[1,2,{"level3":"deep"}]}}}'),
    );
  });

  test('should handle empty structures', () => {
    expect(Json.stringify({})).toStrictEqual(Result.ok('{}'));
    expect(Json.stringify([])).toStrictEqual(Result.ok('[]'));
  });

  test('should handle special string values', () => {
    expect(Json.stringify('with "quotes"')).toStrictEqual(
      Result.ok('"with \\"quotes\\""'),
    );
    expect(Json.stringify('with\nnewline')).toStrictEqual(
      Result.ok('"with\\nnewline"'),
    );
    expect(Json.stringify('with\ttab')).toStrictEqual(
      Result.ok('"with\\ttab"'),
    );
  });

  test('should return stringified value for valid JSON values', () => {
    expect(Json.stringify({ a: 1 })).toStrictEqual(Result.ok('{"a":1}'));
    expect(Json.stringify([1, 2, 3])).toStrictEqual(Result.ok('[1,2,3]'));
    expect(Json.stringify('string')).toStrictEqual(Result.ok('"string"'));
    expect(Json.stringify(42)).toStrictEqual(Result.ok('42'));
    expect(Json.stringify(true)).toStrictEqual(Result.ok('true'));
    expect(Json.stringify(null)).toStrictEqual(Result.ok('null'));
  });

  test('should handle non-serializable values', () => {
    expect(Json.stringify(undefined)).toStrictEqual(Result.ok(undefined));
    expect(Json.stringify(Symbol('test'))).toStrictEqual(Result.ok(undefined));
    expect(Json.stringify(() => {})).toStrictEqual(Result.ok(undefined));
    // BigInt should cause an error
    expect(Result.isErr(Json.stringify(BigInt(123)))).toBe(true);
  });

  test('should handle circular references', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const obj: any = { a: 1 };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    obj.circular = obj;
    expect(Result.isErr(Json.stringify(obj))).toBe(true);
  });

  test('should handle objects with toJSON method', () => {
    const obj = {
      toJSON() {
        return { custom: 'value' };
      },
    };
    expect(Json.stringify(obj)).toStrictEqual(Result.ok('{"custom":"value"}'));
  });

  test('should handle Date objects', () => {
    const date = new Date('2023-01-01T00:00:00.000Z');
    expect(Json.stringify(date)).toStrictEqual(
      Result.ok('"2023-01-01T00:00:00.000Z"'),
    );
  });

  test('should not throw errors', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const circularArray: any[] = [];
    circularArray.push(circularArray);

    expect(() => Json.stringify(circularArray)).not.toThrow();
    expect(() => Json.stringify({ fn: () => {} })).not.toThrow();
  });
});
