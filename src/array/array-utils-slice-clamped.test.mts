import { Arr } from './array-utils.mjs';

describe('Arr', () => {
  describe('sliceClamped', () => {
    const list = [0, 1, 2, 3, 4] as const;

    test.each([
      {
        start: 0,
        end: 5,
        expected: [0, 1, 2, 3, 4],
      }, // 正常
      {
        start: 0,
        end: 6,
        expected: [0, 1, 2, 3, 4],
      }, // 片方オーバー
      {
        start: -1,
        end: 5,
        expected: [0, 1, 2, 3, 4],
      }, // 片方オーバー
      {
        start: -1,
        end: 6,
        expected: [0, 1, 2, 3, 4],
      }, // 両方オーバー
      {
        start: 0,
        end: 3,
        expected: [0, 1, 2],
      }, // 正常
      {
        start: 1,
        end: 3,
        expected: [1, 2],
      }, // 正常
      {
        start: -1,
        end: 3,
        expected: [0, 1, 2],
      }, // 片方オーバー
      {
        start: 3,
        end: 5,
        expected: [3, 4],
      }, // 正常
      {
        start: 3,
        end: 6,
        expected: [3, 4],
      }, // 片方オーバー
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
