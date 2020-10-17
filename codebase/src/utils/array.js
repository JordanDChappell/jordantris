/**
 * * Creates an array of all zeros.
 * @param {number} length | Length of the array to create
 */
export function zeros(length) {
  let returnArray = [];
  for (let i = 0; i < length; i++) {
    returnArray[i] = 0;
  }
  return returnArray;
}

/**
 * * Shuffle random indices of an array, taken from.
 * @param {array} array | Array to shuffle
 */
export function shuffle(array) {
  for (var i = array.length - 1; i > 0; i--) {
    var j = Math.floor(Math.random() * (i + 1));
    var temp = array[i];
    array[i] = array[j];
    array[j] = temp;
  }
}
