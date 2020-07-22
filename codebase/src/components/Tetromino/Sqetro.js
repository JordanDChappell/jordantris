import Tetromino from './Tetromino';

export default class Sqetro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, '#FFD500');
    this.shapeMatrix = [
      [
        [1, 1, 0],
        [1, 1, 0],
        [0, 0, 0]
      ]
    ];
  }
}
