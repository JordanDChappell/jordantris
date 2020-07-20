import Tetromino from './Tetromino';

export default class Tetro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, 'blue');
  }

  draw(x, y) {
    this.drawBlock(x, y);
    this.drawBlock(x + this.blockSize, y);
    this.drawBlock(x + (this.blockSize * 2), y);
    this.drawBlock(x + this.blockSize, y + this.blockSize);
  }
}
