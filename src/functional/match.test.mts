import { expectType } from '../expect-type.mjs';
import { match, strictMatch } from './match.mjs';

describe('strictMatch', () => {
  type Direction = 'E' | 'N' | 'S' | 'W';
  const direction: Direction = 'N' as Direction;

  test('literal union', () => {
    const res = strictMatch(direction, {
      E: 2,
      N: 3,
      S: 4,
      W: 5,
    });

    expectType<typeof res, 2 | 3 | 4 | 5>('=');

    expect(res).toBe(3);
  });

  test('Literal union with missing key - requires default', () => {
    const res = strictMatch(
      direction,
      {
        E: 2,
        S: 4,
        W: 5,
      },
      999,
    );

    expectType<typeof res, 2 | 4 | 5 | 999>('=');

    expect(res).toBe(999);
  });

  test('Literal union with missing key - 2-arg form should cause type error', () => {
    // @ts-expect-error Cannot use 2-argument form when not all cases are covered
    const res = strictMatch(direction, {
      E: 2,
      S: 4,
      W: 5,
    });

    expectType<typeof res, unknown>('=');

    expect(res).toBeUndefined();
  });

  test('Missing key cases with string - requires default', () => {
    const res = strictMatch(
      direction as string,
      {
        E: 2,
        S: 4,
        W: 5,
      },
      'default',
    );

    expectType<typeof res, 2 | 4 | 5 | 'default'>('=');

    expect(res).toBe('default');
  });

  test('String type always requires default even with all keys', () => {
    const res = strictMatch(
      direction as string,
      {
        E: 2,
        N: 3,
        S: 4,
        W: 5,
      },
      'default',
    );

    expectType<typeof res, 2 | 3 | 4 | 5 | 'default'>('=');

    expect(res).toBe(3);
  });

  test('A case with excess properties', () => {
    // @ts-expect-error excess properties
    const res = strictMatch(direction, {
      E: 2,
      N: 3,
      S: 4,
      W: 5,
      X: 0,
    });

    expectType<typeof res, 2 | 3 | 4 | 5>('=');

    expect(res).toBe(3);
  });

  test('with default case - all keys present should cause type error', () => {
    const res = strictMatch(
      direction,
      {
        E: 2,
        N: 3,
        S: 4,
        W: 5,
      },
      // @ts-expect-error When all cases are covered, default value should not be allowed
      999,
    );

    expect(res).toBe(3);
  });

  test('all keys present without default - should work correctly', () => {
    const res = strictMatch(direction, {
      E: 2,
      N: 3,
      S: 4,
      W: 5,
    });

    expectType<typeof res, 2 | 3 | 4 | 5>('=');

    expect(res).toBe(3);
  });

  test('with default case - missing key', () => {
    const res = strictMatch(
      direction,
      {
        E: 2,
        S: 4,
        W: 5,
      },
      999,
    );

    expectType<typeof res, 2 | 4 | 5 | 999>('=');

    expect(res).toBe(999);
  });

  test('with default case - string key', () => {
    const res = strictMatch(
      direction as string,
      {
        E: 2,
        N: 3,
        S: 4,
        W: 5,
      },
      'default',
    );

    expectType<typeof res, 2 | 3 | 4 | 5 | 'default'>('=');

    expect(res).toBe(3);
  });

  test('with default case - string key missing', () => {
    const unknownDirection = 'X' as string;
    const res = strictMatch(
      unknownDirection,
      {
        E: 2,
        N: 3,
        S: 4,
        W: 5,
      },
      'default',
    );

    expectType<typeof res, 2 | 3 | 4 | 5 | 'default'>('=');

    expect(res).toBe('default');
  });
});

describe('match', () => {
  type Direction = 'E' | 'N' | 'S' | 'W';
  const direction: Direction = 'N' as Direction;

  test('literal union', () => {
    const res = match(direction, {
      E: 2,
      N: 3,
      S: 4,
      W: 5,
    });

    expectType<typeof res, 2 | 3 | 4 | 5>('=');

    expect(res).toBe(3);
  });

  test('string key', () => {
    const res = match(direction as string, {
      E: 2,
      N: 3,
      S: 4,
      W: 5,
    });

    expectType<typeof res, 2 | 3 | 4 | 5 | undefined>('=');

    expect(res).toBe(3);
  });

  test('Missing key cases with literal union', () => {
    const res = match(direction, {
      E: 2,
      S: 4,
      W: 5,
    });

    expectType<typeof res, 2 | 4 | 5>('=');

    expect(res).toBeUndefined();
  });

  test('Missing key cases with string', () => {
    const res =
      match(direction as string, {
        E: 2,
        S: 4,
        W: 5,
      }) ?? 999;

    expectType<typeof res, 2 | 4 | 5 | 999>('=');

    expect(res).toBe(999);
  });
});
