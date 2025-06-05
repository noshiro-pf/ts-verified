import { Arr } from './array-utils.mjs';

describe('Arr', () => {
  describe('sliceClamped', () => {
    const list = [0, 1, 2, 3, 4] as const;

    test.each([
      {
        start: 0,
        end: 5,
        expected: [0, 1, 2, 3, 4],
      }, // normal
      {
        start: 0,
        end: 6,
        expected: [0, 1, 2, 3, 4],
      }, // one side overflow
      {
        start: -1,
        end: 5,
        expected: [0, 1, 2, 3, 4],
      }, // one side overflow
      {
        start: -1,
        end: 6,
        expected: [0, 1, 2, 3, 4],
      }, // both sides overflow
      {
        start: 0,
        end: 3,
        expected: [0, 1, 2],
      }, // normal
      {
        start: 1,
        end: 3,
        expected: [1, 2],
      }, // normal
      {
        start: -1,
        end: 3,
        expected: [0, 1, 2],
      }, // one side overflow
      {
        start: 3,
        end: 5,
        expected: [3, 4],
      }, // normal
      {
        start: 3,
        end: 6,
        expected: [3, 4],
      }, // one side overflow
      {
        start: 4,
        end: 3,
        expected: [],
      }, // start > end
      {
        start: 0,
        end: -1,
        expected: [],
      }, // start > end
      {
        start: -1,
        end: -2,
        expected: [],
      }, // start > end
      {
        start: 6,
        end: 9,
        expected: [],
      },
      {
        start: 6,
        end: 3,
        expected: [],
      },
    ] as const)('sliceClamped($start, $end)', ({ start, end, expected }) => {
      expect(Arr.sliceClamped(list, start, end)).toStrictEqual(expected);
    });
  });
});
