import Tetromino from './Tetromino';

export default class Longtro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, '#37FDFC');
    this.shapeMatrix = [
      [
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0],
        [1, 0, 0, 0]
      ],
      [
        [1, 1, 1, 1],
        [0, 0, 0, 0],
        [0, 0, 0, 0],
        [0, 0, 0, 0]
      ]
    ];
  }
}
