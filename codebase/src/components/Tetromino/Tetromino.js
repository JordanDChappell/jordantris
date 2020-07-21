export default class Tetromino {
  constructor(context, blockSize, color) {
    this.context = context;
    this.blockSize = blockSize;
    this.color = color;
    this.xOrigin = 0;
    this.yOrigin = 0;
  }

  moveOrigin(x, y) {
    this.xOrigin = x * this.blockSize;
    this.yOrigin = y * this.blockSize;
  }

  drawBlock(x, y) {
    this.context.fillStyle = this.color;
    this.context.strokeRect(x, y, this.blockSize, this.blockSize);
    this.context.fillRect(x + 1, y + 1, this.blockSize - 2, this.blockSize - 2);
  }

  clearBlock(x, y) {
    this.context.clearRect(
      x - 1,
      y - 1,
      this.blockSize + 2,
      this.blockSize + 2
    );
  }
}
