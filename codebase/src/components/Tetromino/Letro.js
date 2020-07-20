import Tetromino from './Tetromino';

export default class Letro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, '#7EC0EE');
  }

  draw(x, y) {
    this.drawBlock(x, y);
    this.drawBlock(x, y + this.blockSize);
    this.drawBlock(x + this.blockSize, y + this.blockSize);
    this.drawBlock(x + (this.blockSize * 2), y + this.blockSize);
  }
}
