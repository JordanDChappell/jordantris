import Tetromino from './Tetromino';

export default class Tetro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, 'blue');
  }

  draw() {
    this.drawBlock(this.xOrigin, this.yOrigin);
    this.drawBlock(this.xOrigin + this.blockSize, this.yOrigin);
    this.drawBlock(this.xOrigin + this.blockSize * 2, this.yOrigin);
    this.drawBlock(
      this.xOrigin + this.blockSize,
      this.yOrigin + this.blockSize
    );
  }

  clear() {
    this.clearBlock(this.xOrigin, this.yOrigin);
    this.clearBlock(this.xOrigin + this.blockSize, this.yOrigin);
    this.clearBlock(this.xOrigin + this.blockSize * 2, this.yOrigin);
    this.clearBlock(
      this.xOrigin + this.blockSize,
      this.yOrigin + this.blockSize
    );
  }
}
