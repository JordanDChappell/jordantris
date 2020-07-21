import Tetromino from './Tetromino';

export default class Letro extends Tetromino {
  constructor(context, blockSize) {
    super(context, blockSize, '#7EC0EE');
  }

  draw() {
    this.drawBlock(this.xOrigin, this.yOrigin);
    this.drawBlock(this.xOrigin, this.yOrigin + this.blockSize);
    this.drawBlock(
      this.xOrigin + this.blockSize,
      this.yOrigin + this.blockSize
    );
    this.drawBlock(
      this.xOrigin + this.blockSize * 2,
      this.yOrigin + this.blockSize
    );
  }

  clear() {
    this.clearBlock(this.xOrigin, this.yOrigin);
    this.clearBlock(this.xOrigin, this.yOrigin + this.blockSize);
    this.clearBlock(
      this.xOrigin + this.blockSize,
      this.yOrigin + this.blockSize
    );
    this.clearBlock(
      this.xOrigin + this.blockSize * 2,
      this.yOrigin + this.blockSize
    );
  }
}
