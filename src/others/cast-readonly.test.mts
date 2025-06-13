import { describe, expect, it } from 'vitest';

import { castDeepReadonly, castReadonly } from './cast-readonly.mjs';

describe('castReadonly', () => {
  it('should cast mutable array to readonly', () => {
    const mutableArr = [1, 2, 3];
    const readonlyArr = castReadonly(mutableArr);
    
    expect(readonlyArr).toBe(mutableArr); // Same reference
    expect(readonlyArr).toEqual([1, 2, 3]);
  });

  it('should cast mutable object to readonly', () => {
    const mutableObj = { x: 1, y: 2 };
    const readonlyObj = castReadonly(mutableObj);
    
    expect(readonlyObj).toBe(mutableObj); // Same reference
    expect(readonlyObj).toEqual({ x: 1, y: 2 });
  });

  it('should preserve the runtime value', () => {
    const original = { value: 42 };
    const readonly = castReadonly(original);
    
    expect(readonly.value).toBe(42);
    expect(Object.is(readonly, original)).toBe(true);
  });

  it('should work with primitives', () => {
    expect(castReadonly(42)).toBe(42);
    expect(castReadonly('hello')).toBe('hello');
    expect(castReadonly(true)).toBe(true);
  });

  it('should work with null and undefined', () => {
    expect(castReadonly(null)).toBe(null);
    expect(castReadonly(undefined)).toBe(undefined);
  });
});

describe('castDeepReadonly', () => {
  it('should cast deeply nested structure to readonly', () => {
    const mutableNested = {
      a: { b: [1, 2, 3] },
      c: { d: { e: 'value' } }
    };
    const readonlyNested = castDeepReadonly(mutableNested);
    
    expect(readonlyNested).toBe(mutableNested); // Same reference
    expect(readonlyNested.a.b).toEqual([1, 2, 3]);
    expect(readonlyNested.c.d.e).toBe('value');
  });

  it('should preserve runtime value for complex structures', () => {
    const complex = {
      users: [{ id: 1, profile: { name: 'Alice' } }],
      settings: { theme: 'dark', options: { debug: true } }
    };
    const readonly = castDeepReadonly(complex);
    
    expect(readonly).toBe(complex);
    expect(readonly.users[0].profile.name).toBe('Alice');
    expect(readonly.settings.options.debug).toBe(true);
  });

  it('should work with arrays of objects', () => {
    const data = [
      { id: 1, meta: { active: true } },
      { id: 2, meta: { active: false } }
    ];
    const readonly = castDeepReadonly(data);
    
    expect(readonly).toBe(data);
    expect(readonly[0].meta.active).toBe(true);
    expect(readonly[1].meta.active).toBe(false);
  });

  it('should work with primitives', () => {
    expect(castDeepReadonly(42)).toBe(42);
    expect(castDeepReadonly('hello')).toBe('hello');
    expect(castDeepReadonly(true)).toBe(true);
  });

  it('should work with null and undefined', () => {
    expect(castDeepReadonly(null)).toBe(null);
    expect(castDeepReadonly(undefined)).toBe(undefined);
  });
});