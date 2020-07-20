import Tetromino from './Tetromino';

export default class Sqetro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, 'red');
  }

  draw(x, y) {
    this.drawBlock(x, y);
    this.drawBlock(x + this.blockSize, y);
    this.drawBlock(x, y + this.blockSize);
    this.drawBlock(x + this.blockSize, y + this.blockSize);
  }
}
