import { zeros, shuffle } from './array';

describe('zeros function', () => {
  it('should create an array of given size containing zeros', () => {
    // * Arrange
    const length = 5;
    const expected = [0, 0, 0, 0, 0];

    // * Act
    const actual = zeros(length);

    // * Assert
    expect(actual).toStrictEqual(expected);
  });
});

// * This one is hard to write a test for, technically we randomly shuffle, so toShuffle can be the same as the control value
// describe('shuffle function', () => {
//   it('should randomly shuffle all indices of an array', () => {
//     // * Arrange
//     const control = ['black', 'red', 'blue'];
//     var toShuffle = ['black', 'red', 'blue'];

//     // * Act
//     shuffle(toShuffle);

//     // * Assert
//     expect(toShuffle).not.toStrictEqual(control);
//   });
// });
