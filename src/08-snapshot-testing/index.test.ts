import { generateLinkedList } from './index';

describe('generateLinkedList', () => {
  const values = ['a', 'b', 'c'];

  // Check match by expect(...).toStrictEqual(...)
  test('should generate linked list from values 1', () => {
    expect(generateLinkedList(values)).toStrictEqual({
      value: 'a',
      next: {
        value: 'b',
        next: {
          value: 'c',
          next: {
            value: null,
            next: null,
          },
        },
      },
    });
  });

  // Check match by comparison with snapshot
  test('should generate linked list from values 2', () => {
    expect(generateLinkedList(values)).toMatchSnapshot();
  });
});
