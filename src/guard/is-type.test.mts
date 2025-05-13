import { expectType } from '../expect-type.mjs';
import {
  isBigint,
  isBoolean,
  isNotNull,
  isNotUndefined,
  isNull,
  isNumber,
  isString,
  isSymbol,
  isUndefined,
} from './is-type.mjs';

describe('isUndefined', () => {
  test('should return true for undefined', () => {
    expect(isUndefined(undefined)).toBe(true);
  });

  test('should return false for non-undefined values', () => {
    expect(isUndefined(null)).toBe(false);
    expect(isUndefined(0)).toBe(false);
    expect(isUndefined('')).toBe(false);
    expect(isUndefined(false)).toBe(false);
    expect(isUndefined({})).toBe(false);
  });

  test('should act as a type guard', () => {
    const value: string | undefined = undefined;
    if (isUndefined(value)) {
      expectType<typeof value, undefined>('=');
    }
  });
});

describe('isNotUndefined', () => {
  test('should return false for undefined', () => {
    expect(isNotUndefined(undefined)).toBe(false);
  });

  test('should return true for non-undefined values', () => {
    expect(isNotUndefined(null)).toBe(true);
    expect(isNotUndefined(0)).toBe(true);
    expect(isNotUndefined('')).toBe(true);
    expect(isNotUndefined(false)).toBe(true);
  });

  test('should narrow types correctly', () => {
    const value: string | undefined = 'test';
    if (isNotUndefined(value)) {
      expectType<typeof value, string>('=');
    }
  });
});

describe('isNull', () => {
  test('should return true for null', () => {
    expect(isNull(null)).toBe(true);
  });

  test('should return false for non-null values', () => {
    expect(isNull(undefined)).toBe(false);
    expect(isNull(0)).toBe(false);
    expect(isNull('')).toBe(false);
    expect(isNull(false)).toBe(false);
    expect(isNull({})).toBe(false);
  });

  test('should act as a type guard', () => {
    const value: string | null = null;
    if (isNull(value)) {
      expectType<typeof value, null>('=');
    }
  });
});

describe('isNotNull', () => {
  test('should return false for null', () => {
    expect(isNotNull(null)).toBe(false);
  });

  test('should return true for non-null values', () => {
    expect(isNotNull(undefined)).toBe(true);
    expect(isNotNull(0)).toBe(true);
    expect(isNotNull('')).toBe(true);
  });

  test('should narrow types correctly', () => {
    const value: string | null = 'test';
    if (isNotNull(value)) {
      expectType<typeof value, string>('=');
    }
  });
});

describe('isString', () => {
  test('should return true for strings', () => {
    expect(isString('')).toBe(true);
    expect(isString('hello')).toBe(true);
    expect(isString('123')).toBe(true);
    expect(isString(`template`)).toBe(true);
  });

  test('should return false for non-strings', () => {
    expect(isString(123)).toBe(false);
    expect(isString(true)).toBe(false);
    expect(isString(null)).toBe(false);
    expect(isString(undefined)).toBe(false);
    // eslint-disable-next-line no-new-wrappers
    expect(isString(new String('hello'))).toBe(false);
  });

  test('should act as a type guard', () => {
    const value: unknown = 'test';
    if (isString(value)) {
      expectType<typeof value, string>('=');
      expect(value.length).toBe(4);
    }
  });
});

describe('isNumber', () => {
  test('should return true for numbers', () => {
    expect(isNumber(0)).toBe(true);
    expect(isNumber(42)).toBe(true);
    expect(isNumber(-3.14)).toBe(true);
    expect(isNumber(Number.NaN)).toBe(true);
    expect(isNumber(Number.POSITIVE_INFINITY)).toBe(true);
    expect(isNumber(Number.NEGATIVE_INFINITY)).toBe(true);
  });

  test('should return false for non-numbers', () => {
    expect(isNumber('123')).toBe(false);
    expect(isNumber(true)).toBe(false);
    expect(isNumber(null)).toBe(false);
    expect(isNumber(BigInt(123))).toBe(false);
    // eslint-disable-next-line no-new-wrappers
    expect(isNumber(new Number(42))).toBe(false);
  });

  test('should act as a type guard', () => {
    const value: unknown = 42;
    if (isNumber(value)) {
      expectType<typeof value, number>('=');
      expect(value + 1).toBe(43);
    }
  });
});

describe('isBigint', () => {
  test('should return true for bigints', () => {
    expect(isBigint(BigInt(0))).toBe(true);
    expect(isBigint(123n)).toBe(true);
    expect(isBigint(-456n)).toBe(true);
  });

  test('should return false for non-bigints', () => {
    expect(isBigint(123)).toBe(false);
    expect(isBigint('123')).toBe(false);
    expect(isBigint(true)).toBe(false);
    expect(isBigint(null)).toBe(false);
  });

  test('should act as a type guard', () => {
    const value: unknown = 123n;
    if (isBigint(value)) {
      expectType<typeof value, bigint>('=');
      expect(value + 1n).toBe(124n);
    }
  });
});

describe('isBoolean', () => {
  test('should return true for booleans', () => {
    expect(isBoolean(true)).toBe(true);
    expect(isBoolean(false)).toBe(true);
  });

  test('should return false for non-booleans', () => {
    expect(isBoolean(1)).toBe(false);
    expect(isBoolean(0)).toBe(false);
    expect(isBoolean('true')).toBe(false);
    expect(isBoolean(null)).toBe(false);
    // eslint-disable-next-line no-new-wrappers
    expect(isBoolean(new Boolean(true))).toBe(false);
  });

  test('should act as a type guard', () => {
    const value: unknown = true;
    if (isBoolean(value)) {
      expectType<typeof value, boolean>('=');
      expect(!value).toBe(false);
    }
  });
});

describe('isSymbol', () => {
  test('should return true for symbols', () => {
    expect(isSymbol(Symbol())).toBe(true);
    expect(isSymbol(Symbol('test'))).toBe(true);
    expect(isSymbol(Symbol.iterator)).toBe(true);
  });

  test('should return false for non-symbols', () => {
    expect(isSymbol('symbol')).toBe(false);
    expect(isSymbol(123)).toBe(false);
    expect(isSymbol(null)).toBe(false);
  });

  test('should act as a type guard', () => {
    const value: unknown = Symbol('test');
    if (isSymbol(value)) {
      expectType<typeof value, symbol>('=');
      expect(value.toString()).toContain('Symbol');
    }
  });
});
