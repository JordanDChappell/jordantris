import Tetromino from './Tetromino';

export default class Zetro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, 'green');
  }

  draw(x, y) {
    this.drawBlock(x, y);
    this.drawBlock(x + this.blockSize, y);
    this.drawBlock(x + this.blockSize, y + this.blockSize);
    this.drawBlock(x + (this.blockSize * 2), y + this.blockSize);
  }
}
