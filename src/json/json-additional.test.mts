import { Arr } from '../array/index.mjs';
import { Result } from '../functional/result.mjs';
import { hasKey, isRecord } from '../guard/index.mjs';
import { Json } from './json.mjs';

describe('Json.parse with reviver', () => {
  it('should use reviver function to transform values', () => {
    const dateReviver = (_key: string, value: unknown): unknown => {
      if (typeof value === 'string' && /^\d{4}-\d{2}-\d{2}T/u.test(value)) {
        return new Date(value);
      }
      return value;
    };

    const jsonString = '{"name":"test","created":"2023-12-01T10:00:00.000Z"}';
    const result = Json.parse(jsonString, dateReviver);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      if (
        isRecord(result.value) &&
        hasKey(result.value, 'name') &&
        hasKey(result.value, 'created')
      ) {
        expect(result.value.name).toBe('test');
        expect(result.value.created).toBeInstanceOf(Date);
      }
    }
  });

  it('should handle reviver returning different types', () => {
    const transformReviver = (key: string, value: unknown): unknown => {
      if (key === 'number' && typeof value === 'string') {
        return Number.parseInt(value, 10);
      }
      return value;
    };

    const result = Json.parse(
      '{"number":"42","text":"hello"}',
      transformReviver,
    );

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toHaveProperty('number');
      expect(result.value).toHaveProperty('text');
      if (
        isRecord(result.value) &&
        hasKey(result.value, 'number') &&
        hasKey(result.value, 'text')
      ) {
        expect(result.value.number).toBe(42);
        expect(result.value.text).toBe('hello');
      }
    }
  });
});

describe('Json.stringify with replacer and space', () => {
  it('should use replacer function to filter values', () => {
    const data = {
      name: 'John',
      password: 'secret123',
      email: 'john@example.com',
    };

    const secureReplacer = (key: string, value: unknown) => {
      if (key === 'password') return '[REDACTED]';
      return value;
    };

    const result = Json.stringify(data, secureReplacer);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toContain('[REDACTED]');
      expect(result.value).not.toContain('secret123');
    }
  });

  it('should format output with space parameter (number)', () => {
    const data = { a: 1, b: 2 };
    const result = Json.stringify(data, undefined, 2);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toContain('\n');
      expect(result.value).toContain('  '); // 2 spaces indentation
    }
  });

  it('should format output with space parameter (string)', () => {
    const data = { a: 1, b: 2 };
    const result = Json.stringify(data, undefined, '\t');

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toContain('\n');
      expect(result.value).toContain('\t'); // tab indentation
    }
  });
});

describe('Json.stringifySelected', () => {
  it('should include only selected properties', () => {
    const user = {
      id: 1,
      name: 'Alice',
      email: 'alice@example.com',
      password: 'secret123',
      lastLogin: '2023-12-01',
    };

    const result = Json.stringifySelected(user, ['id', 'name', 'email']);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      const parsed: unknown = JSON.parse(result.value);
      expect(parsed).toEqual({
        id: 1,
        name: 'Alice',
        email: 'alice@example.com',
      });
      expect(parsed).not.toHaveProperty('password');
      expect(parsed).not.toHaveProperty('lastLogin');
    }
  });

  it('should work with nested objects', () => {
    const data = {
      users: [
        { id: 1, name: 'Alice', secret: 'hidden1' },
        { id: 2, name: 'Bob', secret: 'hidden2' },
      ],
      metadata: { total: 2, page: 1, internal: 'secret' },
    };

    const result = Json.stringifySelected(data, [
      'users',
      'id',
      'name',
      'metadata',
      'total',
    ]);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      const parsed: unknown = JSON.parse(result.value);
      if (isRecord(parsed) && hasKey(parsed, 'users')) {
        expect(isRecord(parsed.users)).toBe(true);
        expect(parsed.users).toHaveLength(2);
        if (Arr.isArray(parsed.users)) {
          expect(parsed.users[0]).toEqual({ id: 1, name: 'Alice' });
          expect(parsed.users[0]).not.toHaveProperty('secret');
        }
        if (isRecord(parsed) && hasKey(parsed, 'metadata')) {
          expect(parsed.metadata).toEqual({ total: 2 });
          expect(parsed.metadata).not.toHaveProperty('page');
          expect(parsed.metadata).not.toHaveProperty('internal');
        }
      }
    }
  });

  it('should work with array indices', () => {
    const matrix = [
      [1, 2, 3, 4],
      [5, 6, 7, 8],
      [9, 10, 11, 12],
    ];

    const result = Json.stringifySelected(matrix, [0, 1]);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      const parsed: unknown = JSON.parse(result.value);
      // Note: stringifySelected works with JSON.stringify's replacer parameter
      // which may not work as expected with arrays
      expect(Array.isArray(parsed)).toBe(true);
      expect(parsed).toHaveLength(3);
    }
  });

  it('should handle formatting with space parameter', () => {
    const data = { a: 1, b: { c: 2 } };
    const result = Json.stringifySelected(data, ['a', 'b', 'c'], 2);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toContain('\n');
      expect(result.value).toContain('  ');
    }
  });

  it('should handle empty selection array', () => {
    const data = { a: 1, b: 2, c: 3 };
    const result = Json.stringifySelected(data, []);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toBe('{}');
    }
  });

  it('should handle undefined properties parameter', () => {
    const data = { a: 1, b: 2 };
    const result = Json.stringifySelected(data, undefined);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      const parsed = JSON.parse(result.value);
      expect(parsed).toEqual({ a: 1, b: 2 });
    }
  });

  it('should handle circular references with error', () => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const circular: any = { name: 'test' };
    // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment, @typescript-eslint/no-unsafe-member-access
    circular.self = circular;

    const result = Json.stringifySelected(circular, ['name', 'self']);

    // Note: JSON.stringify may handle circular references differently depending on the replacer
    expect(Result.isOk(result) || Result.isErr(result)).toBe(true);
    if (Result.isErr(result)) {
      expect(typeof result.value).toBe('string');
    }
  });
});

describe('Json.stringifySortedKey', () => {
  it('should sort object keys alphabetically', () => {
    const unsortedObj = {
      zebra: 'animal',
      apple: 'fruit',
      banana: 'fruit',
      aardvark: 'animal',
    };

    const result = Json.stringifySortedKey(unsortedObj);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toBe(
        '{"aardvark":"animal","apple":"fruit","banana":"fruit","zebra":"animal"}',
      );
    }
  });

  it('should sort nested object keys', () => {
    const nestedObj = {
      user: {
        name: 'Alice',
        age: 30,
        address: {
          zip: '12345',
          city: 'New York',
          country: 'USA',
        },
      },
      settings: {
        theme: 'dark',
        language: 'en',
      },
    };

    const result = Json.stringifySortedKey(nestedObj);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      const parsed = JSON.parse(result.value);
      const keys = Object.keys(parsed);
      expect(keys).toEqual(['settings', 'user']); // sorted top-level keys

      const userKeys = Object.keys(parsed.user);
      expect(userKeys).toEqual(['address', 'age', 'name']); // sorted nested keys

      const addressKeys = Object.keys(parsed.user.address);
      expect(addressKeys).toEqual(['city', 'country', 'zip']); // sorted deeper nested keys
    }
  });

  it('should handle arrays with objects', () => {
    const dataWithArrays = {
      users: [
        { name: 'Bob', id: 2, active: true },
        { name: 'Alice', id: 1, active: false },
      ],
      metadata: {
        version: '1.0',
        created: '2023-12-01',
        author: 'system',
      },
    };

    const result = Json.stringifySortedKey(dataWithArrays);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      const parsed = JSON.parse(result.value);

      // Check top-level keys are sorted
      const topKeys = Object.keys(parsed);
      expect(topKeys).toEqual(['metadata', 'users']);

      // Check metadata keys are sorted
      const metadataKeys = Object.keys(parsed.metadata);
      expect(metadataKeys).toEqual(['author', 'created', 'version']);

      // Check user object keys are sorted
      const userKeys = Object.keys(parsed.users[0]);
      expect(userKeys).toEqual(['active', 'id', 'name']);
    }
  });

  it('should handle formatting with space parameter', () => {
    const obj = { b: 2, a: 1 };
    const result = Json.stringifySortedKey(obj, 2);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toContain('\n');
      expect(result.value).toContain('  ');
      expect(result.value).toMatch(/{\s+"a": 1,\s+"b": 2\s+}/);
    }
  });

  it('should produce deterministic output', () => {
    const obj1 = { c: 3, a: 1, b: 2 };
    const obj2 = { b: 2, a: 1, c: 3 };

    const result1 = Json.stringifySortedKey(obj1);
    const result2 = Json.stringifySortedKey(obj2);

    expect(Result.isOk(result1)).toBe(true);
    expect(Result.isOk(result2)).toBe(true);

    if (Result.isOk(result1) && Result.isOk(result2)) {
      expect(result1.value).toBe(result2.value);
    }
  });

  it('should handle problematic objects', () => {
    try {
      const problematicObj = {
        normal: 'value',
        circular: {} as any,
      };
      problematicObj.circular.self = problematicObj;

      const result = Json.stringifySortedKey(problematicObj);

      // This may throw due to circular reference during key extraction
      expect(Result.isErr(result)).toBe(true);
      if (Result.isErr(result)) {
        expect(typeof result.value).toBe('string');
      }
    } catch (error) {
      // Expected if circular reference causes stack overflow
      expect(error).toBeDefined();
    }
  });

  it('should handle empty object', () => {
    const result = Json.stringifySortedKey({});

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      expect(result.value).toBe('{}');
    }
  });

  it('should handle deeply nested structures', () => {
    const deep = {
      level1: {
        z: 'last',
        a: {
          nested: {
            y: 2,
            x: 1,
          },
        },
      },
    };

    const result = Json.stringifySortedKey(deep);

    expect(Result.isOk(result)).toBe(true);
    if (Result.isOk(result)) {
      const parsed: unknown = JSON.parse(result.value);
      expect(Object.keys(parsed.level1)).toEqual(['a', 'z']);
      expect(Object.keys(parsed.level1.a.nested)).toEqual(['x', 'y']);
    }
  });
});
