import { expectType } from '../expect-type.mjs';
import { Optional } from '../functional/index.mjs';
import { Arr } from './array-utils.mjs';

describe('Arr search operations', () => {
  describe('findIndex', () => {
    test('should find index of matching element', () => {
      const arr = ['a', 'b', 'c'];
      const result = Arr.findIndex(arr, (x) => x === 'b');

      expect(Optional.isSome(result)).toBe(true);
      if (Optional.isSome(result)) {
        expectType<typeof result.value, SizeType.Arr>('=');
        expect(result.value).toBe(1);
      }
    });

    test('should return None for no match', () => {
      const arr = ['a', 'b', 'c'];
      const result = Arr.findIndex(arr, (x) => x === 'd');

      expect(Optional.isNone(result)).toBe(true);
    });
  });

  describe('indexOf', () => {
    test('should find index of element', () => {
      const arr = ['a', 'b', 'c', 'b'];
      const result = Arr.indexOf(arr, 'b');

      expect(Optional.isSome(result)).toBe(true);
      if (Optional.isSome(result)) {
        expectType<typeof result.value, SizeType.Arr>('=');
        expect(result.value).toBe(1);
      }
    });

    test('should return None for non-existent element', () => {
      const arr = ['a', 'b', 'c'];
      const result = Arr.indexOf(arr, 'd');

      expect(Optional.isNone(result)).toBe(true);
    });

    test('should handle fromIndex parameter', () => {
      const arr = ['a', 'b', 'c', 'b'];
      const result = Arr.indexOf(arr, 'b', 2);

      expect(Optional.isSome(result)).toBe(true);
      if (Optional.isSome(result)) {
        expect(result.value).toBe(3);
      }
    });
  });

  describe('lastIndexOf', () => {
    test('should find last index of element', () => {
      const arr = ['a', 'b', 'c', 'b'];
      const result = Arr.lastIndexOf(arr, 'b');

      expect(Optional.isSome(result)).toBe(true);
      if (Optional.isSome(result)) {
        expectType<typeof result.value, SizeType.Arr>('=');
        expect(result.value).toBe(3);
      }
    });
  });
});
