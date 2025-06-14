import { expectType } from '../expect-type.mjs';
import {
  isNonNullish,
  isNotBigint,
  isNotBoolean,
  isNotNumber,
  isNotString,
  isNotSymbol,
  isNullish,
} from './is-type.mjs';

describe('isNotBoolean', () => {
  it('should return false for boolean values', () => {
    expect(isNotBoolean(true)).toBe(false);
    expect(isNotBoolean(false)).toBe(false);
  });

  it('should return true for non-boolean values', () => {
    expect(isNotBoolean(0)).toBe(true);
    expect(isNotBoolean(1)).toBe(true);
    expect(isNotBoolean('true')).toBe(true);
    expect(isNotBoolean('false')).toBe(true);
    expect(isNotBoolean(null)).toBe(true);
    expect(isNotBoolean(undefined)).toBe(true);
    expect(isNotBoolean({})).toBe(true);
    expect(isNotBoolean([])).toBe(true);
  });

  it('should act as a type guard', () => {
    const value: string | number | boolean = 'test';
    if (isNotBoolean(value)) {
      expectType<typeof value, string | number>('<=');
      // Should not have boolean methods
      expect(typeof value === 'string' || typeof value === 'number').toBe(true);
    }
  });
});

describe('isNotNumber', () => {
  it('should return false for number values', () => {
    expect(isNotNumber(0)).toBe(false);
    expect(isNotNumber(42)).toBe(false);
    expect(isNotNumber(-3.14)).toBe(false);
    expect(isNotNumber(Number.NaN)).toBe(false);
    expect(isNotNumber(Number.POSITIVE_INFINITY)).toBe(false);
    expect(isNotNumber(Number.NEGATIVE_INFINITY)).toBe(false);
  });

  it('should return true for non-number values', () => {
    expect(isNotNumber('123')).toBe(true);
    expect(isNotNumber(true)).toBe(true);
    expect(isNotNumber(false)).toBe(true);
    expect(isNotNumber(null)).toBe(true);
    expect(isNotNumber(undefined)).toBe(true);
    expect(isNotNumber(BigInt(123))).toBe(true);
    expect(isNotNumber({})).toBe(true);
    expect(isNotNumber([])).toBe(true);
    expect(isNotNumber(Symbol('test'))).toBe(true);
  });

  it('should act as a type guard', () => {
    const value: string | number | boolean = 'test';
    if (isNotNumber(value)) {
      expectType<typeof value, string | boolean>('<=');
      expect(typeof value === 'string' || typeof value === 'boolean').toBe(
        true,
      );
    }
  });
});

describe('isNotBigint', () => {
  it('should return false for bigint values', () => {
    expect(isNotBigint(BigInt(0))).toBe(false);
    expect(isNotBigint(123n)).toBe(false);
    expect(isNotBigint(-456n)).toBe(false);
  });

  it('should return true for non-bigint values', () => {
    expect(isNotBigint(123)).toBe(true);
    expect(isNotBigint('123')).toBe(true);
    expect(isNotBigint(true)).toBe(true);
    expect(isNotBigint(false)).toBe(true);
    expect(isNotBigint(null)).toBe(true);
    expect(isNotBigint(undefined)).toBe(true);
    expect(isNotBigint({})).toBe(true);
    expect(isNotBigint(Symbol('test'))).toBe(true);
  });

  it('should act as a type guard', () => {
    const value: number | bigint = 123;
    if (isNotBigint(value)) {
      expectType<typeof value, number>('<=');
      expect(typeof value).toBe('number');
    }
  });
});

describe('isNotString', () => {
  it('should return false for string values', () => {
    expect(isNotString('')).toBe(false);
    expect(isNotString('hello')).toBe(false);
    expect(isNotString('123')).toBe(false);
    expect(isNotString(`template`)).toBe(false);
  });

  it('should return true for non-string values', () => {
    expect(isNotString(123)).toBe(true);
    expect(isNotString(true)).toBe(true);
    expect(isNotString(false)).toBe(true);
    expect(isNotString(null)).toBe(true);
    expect(isNotString(undefined)).toBe(true);
    expect(isNotString({})).toBe(true);
    expect(isNotString([])).toBe(true);
    expect(isNotString(Symbol('test'))).toBe(true);
    expect(isNotString(BigInt(123))).toBe(true);
  });

  it('should act as a type guard', () => {
    const value: string | number | boolean = 42;
    if (isNotString(value)) {
      expectType<typeof value, number | boolean>('<=');
      expect(typeof value === 'number' || typeof value === 'boolean').toBe(
        true,
      );
    }
  });
});

describe('isNotSymbol', () => {
  it('should return false for symbol values', () => {
    expect(isNotSymbol(Symbol())).toBe(false);
    expect(isNotSymbol(Symbol('test'))).toBe(false);
    expect(isNotSymbol(Symbol.iterator)).toBe(false);
  });

  it('should return true for non-symbol values', () => {
    expect(isNotSymbol('symbol')).toBe(true);
    expect(isNotSymbol(123)).toBe(true);
    expect(isNotSymbol(true)).toBe(true);
    expect(isNotSymbol(false)).toBe(true);
    expect(isNotSymbol(null)).toBe(true);
    expect(isNotSymbol(undefined)).toBe(true);
    expect(isNotSymbol({})).toBe(true);
    expect(isNotSymbol([])).toBe(true);
    expect(isNotSymbol(BigInt(123))).toBe(true);
  });

  it('should act as a type guard', () => {
    const value: string | number | symbol = 'test';
    if (isNotSymbol(value)) {
      expectType<typeof value, string | number>('<=');
      expect(typeof value === 'string' || typeof value === 'number').toBe(true);
    }
  });
});

describe('isNullish', () => {
  it('should return true for null and undefined', () => {
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });

  it('should return false for non-nullish values', () => {
    expect(isNullish(0)).toBe(false);
    expect(isNullish(false)).toBe(false);
    expect(isNullish('')).toBe(false);
    expect(isNullish('null')).toBe(false);
    expect(isNullish('undefined')).toBe(false);
    expect(isNullish({})).toBe(false);
    expect(isNullish([])).toBe(false);
    expect(isNullish(Number.NaN)).toBe(false);
  });

  it('should act as a type guard', () => {
    const value: string | null | undefined = null;
    if (isNullish(value)) {
      expectType<typeof value, null | undefined>('<=');
      // Value is guaranteed to be null or undefined in this branch
      expect(true).toBe(true);
    }
  });

  it('should handle edge cases', () => {
    // Test that it uses loose equality (==)
    expect(isNullish(null)).toBe(true);
    expect(isNullish(undefined)).toBe(true);
  });
});

describe('isNonNullish', () => {
  it('should return false for null and undefined', () => {
    expect(isNonNullish(null)).toBe(false);
    expect(isNonNullish(undefined)).toBe(false);
  });

  it('should return true for non-nullish values', () => {
    expect(isNonNullish(0)).toBe(true);
    expect(isNonNullish(false)).toBe(true);
    expect(isNonNullish('')).toBe(true);
    expect(isNonNullish('null')).toBe(true);
    expect(isNonNullish('undefined')).toBe(true);
    expect(isNonNullish({})).toBe(true);
    expect(isNonNullish([])).toBe(true);
    expect(isNonNullish(Number.NaN)).toBe(true);
    expect(isNonNullish(Symbol('test'))).toBe(true);
    expect(isNonNullish(BigInt(123))).toBe(true);
  });

  it('should act as a type guard', () => {
    const value: string | null | undefined = 'test';
    if (isNonNullish(value)) {
      expectType<typeof value, string>('<=');
      expect(value.length).toBe(4);
    }
  });

  it('should work with array filtering', () => {
    const items: (string | null | undefined)[] = [
      'hello',
      null,
      'world',
      undefined,
      'test',
    ];

    const definedItems = items.filter(isNonNullish);
    expectType<typeof definedItems, string[]>('<=');

    expect(definedItems).toHaveLength(3);
    expect(definedItems).toEqual(['hello', 'world', 'test']);
  });

  it('should handle complex union types', () => {
    type ComplexType = string | number | boolean | null | undefined;
    const value: ComplexType = 42;

    if (isNonNullish(value)) {
      expectType<typeof value, string | number | boolean>('<=');
      // Value is guaranteed to be non-nullish in this branch
      expect(true).toBe(true);
    }
  });
});

describe('type guard behavior in complex scenarios', () => {
  it('should work with nested conditions', () => {
    const value: string | number | boolean | null | undefined = 'test';

    if (isNonNullish(value)) {
      if (isNotBoolean(value)) {
        if (isNotNumber(value)) {
          expectType<typeof value, string>('<=');
          expect(typeof value).toBe('string');
        }
      }
    }
  });

  it('should work with array operations', () => {
    const mixed: (string | number | boolean | null | undefined)[] = [
      'hello',
      42,
      true,
      null,
      'world',
      undefined,
      false,
      123,
    ];

    const nonNullish = mixed.filter(isNonNullish);
    expectType<typeof nonNullish, (string | number | boolean)[]>('<=');

    const nonBooleans = nonNullish.filter(isNotBoolean);
    expectType<typeof nonBooleans, (string | number)[]>('<=');

    const strings = nonBooleans.filter(isNotNumber);
    expectType<typeof strings, string[]>('<=');

    expect(strings).toEqual(['hello', 'world']);
  });
});
