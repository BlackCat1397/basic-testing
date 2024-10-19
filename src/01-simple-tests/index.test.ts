import { simpleCalculator, Action } from './index';

describe('simpleCalculator tests', () => {
  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: Action.Add })).toBe(3);
    expect(simpleCalculator({ a: 2, b: 2, action: Action.Add })).toBe(4);
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Add })).toBe(5);
  });

  test('should subtract two numbers', () => {
    expect(simpleCalculator({ a: 3, b: 2, action: Action.Subtract })).toBe(1);
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Subtract })).toBe(8);
    expect(simpleCalculator({ a: 20, b: 2, action: Action.Subtract })).toBe(18);
  });

  test('should multiply two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Multiply })).toBe(20);
    expect(simpleCalculator({ a: 10, b: 3, action: Action.Multiply })).toBe(30);
    expect(simpleCalculator({ a: 20, b: 2, action: Action.Multiply })).toBe(40);
  });

  test('should divide two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 15, b: 3, action: Action.Divide })).toBe(5);
    expect(simpleCalculator({ a: 20, b: 2, action: Action.Divide })).toBe(10);
  });

  test('should exponentiate two numbers', () => {
    expect(simpleCalculator({ a: 10, b: 2, action: Action.Exponentiate })).toBe(
      100,
    );
    expect(simpleCalculator({ a: 3, b: 3, action: Action.Exponentiate })).toBe(
      27,
    );
    expect(simpleCalculator({ a: 20, b: 2, action: Action.Exponentiate })).toBe(
      400,
    );
  });

  test('should return null for invalid action', () => {
    expect(simpleCalculator({ a: 1, b: 2, action: null })).toBe(null);
  });

  test('should return null for invalid arguments', () => {
    expect(simpleCalculator({ a: '1', b: 2, action: Action.Add })).toBe(null);
    expect(simpleCalculator({ a: 1, b: '2', action: Action.Add })).toBe(null);
  });
});
