import { unknownToString } from './unknown-to-string.mjs';

describe('unknownToString', () => {
  test('string', () => {
    expect(unknownToString('aaaaa')).toBe('aaaaa');
    expect(JSON.stringify('aaaaa')).toBe('"aaaaa"');
  });

  test('number', () => {
    expect(unknownToString(1)).toBe('1');
    expect(JSON.stringify(1)).toBe('1');
  });

  test('boolean', () => {
    expect(unknownToString(true)).toBe('true');
    expect(JSON.stringify(true)).toBe('true');
  });

  test('symbol', () => {
    expect(unknownToString(Symbol('sym'))).toBe('Symbol(sym)');
    expect(JSON.stringify(Symbol('sym'))).toBeUndefined();
  });

  test('function', () => {
    expect(unknownToString(() => 0)).toBe('() => 0');
    expect(JSON.stringify(() => 0)).toBeUndefined();
  });

  test('undefined', () => {
    expect(unknownToString(undefined)).toBe('undefined');
    expect(JSON.stringify(undefined)).toBeUndefined();
  });

  test('null', () => {
    expect(unknownToString(null)).toBe('null');

    expect(JSON.stringify(null)).toBe('null');
  });

  test('object', () => {
    expect(unknownToString({ a: { b: 1 } })).toBe('{"a":{"b":1}}');

    expect(JSON.stringify({ a: { b: 1 } })).toBe('{"a":{"b":1}}');
  });

  test('object(prettyPrint=true)', () => {
    expect(unknownToString({ a: { b: 1 } }, { prettyPrintObject: true })).toBe(
      [
        //
        `{`,
        `  "a": {`,
        `    "b": 1`,
        `  }`,
        `}`,
      ].join('\n'),
    );
  });
});
