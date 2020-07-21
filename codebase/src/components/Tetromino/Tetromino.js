export default class Tetromino {
  constructor(context, blockSize, color) {
    this.context = context;
    this.blockSize = blockSize;
    this.color = color;
    this.xOrigin = null;
    this.yOrigin = null;
  }

  drawBlock(x, y) {
    this.xOrigin = x;
    this.yOrigin = y;
    this.context.fillStyle = this.color;
    this.context.strokeRect(x, y, this.blockSize, this.blockSize);
    this.context.fillRect(x + 1, y + 1, this.blockSize - 2, this.blockSize - 2);
  }

  moveOrigin(x, y) {
    
  }
}
