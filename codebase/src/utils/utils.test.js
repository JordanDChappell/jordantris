import { isObject } from './utils';

describe('isObject function', () => {
  it('returns true when argument is an object', () => {
    // * Arrange
    const sut = {};
    const expected = true;

    // * Act
    const actual = isObject(sut);

    // * Arrange
    expect(actual).toBe(expected);
  });
  it('returns true with a range of objects', () => {
    // * Arrange
    const sut1 = {};
    const sut2 = { obj: true };
    const sut3 = {
      myStringKey: 'string',
      myIntKey: 1,
      myObjectKey: {
        key: true
      }
    };
    const expected = true;

    // * Act
    const actual1 = isObject(sut1);
    const actual2 = isObject(sut2);
    const actual3 = isObject(sut3);

    // * Arrange
    expect(actual1).toBe(expected);
    expect(actual2).toBe(expected);
    expect(actual3).toBe(expected);
  });
  it('returns false for non object type', () => {
    // * Arrange
    const sut = 'string';
    const expected = false;

    // * Act
    const actual = isObject(sut);

    // * Arrange
    expect(actual).toBe(expected);
  });
});
