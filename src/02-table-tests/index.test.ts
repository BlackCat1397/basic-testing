import { simpleCalculator, Action } from './index';

const testCases = [
  { a: 1, b: 2, action: Action.Add, expected: 3 },
  { a: 2, b: 2, action: Action.Add, expected: 4 },
  { a: 3, b: 2, action: Action.Add, expected: 5 },

  { a: 3, b: 2, action: Action.Subtract, expected: 1 },
  { a: 10, b: 2, action: Action.Subtract, expected: 8 },
  { a: 20, b: 2, action: Action.Subtract, expected: 18 },

  { a: 10, b: 2, action: Action.Multiply, expected: 20 },
  { a: 10, b: 3, action: Action.Multiply, expected: 30 },
  { a: 20, b: 2, action: Action.Multiply, expected: 40 },

  { a: 10, b: 2, action: Action.Divide, expected: 5 },
  { a: 15, b: 3, action: Action.Divide, expected: 5 },
  { a: 20, b: 2, action: Action.Divide, expected: 10 },

  { a: 10, b: 2, action: Action.Exponentiate, expected: 100 },
  { a: 3, b: 3, action: Action.Exponentiate, expected: 27 },
  { a: 20, b: 2, action: Action.Exponentiate, expected: 400 },

  { a: 1, b: 2, action: null, expected: null },

  { a: '1', b: 2, action: Action.Add, expected: null },
  { a: 1, b: '2', action: Action.Add, expected: null },
];

describe('simpleCalculator', () => {
  test.each(testCases)('%p', ({ expected, ...payload }) => {
    expect(simpleCalculator(payload)).toBe(expected);
  });
});
