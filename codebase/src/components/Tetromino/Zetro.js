import Tetromino from './Tetromino';

export default class Zetro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, '#FF3213');
    this.shapeMatrix = [
      [
        [1, 1, 0],
        [0, 1, 1],
        [0, 0, 0]
      ],
      [
        [0, 1, 0],
        [1, 1, 0],
        [1, 0, 0]
      ]
    ];
  }
}
