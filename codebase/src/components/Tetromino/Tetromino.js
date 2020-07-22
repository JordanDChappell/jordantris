export default class Tetromino {
  constructor(context, blockSize, color) {
    this.context = context;
    this.blockSize = blockSize;
    this.color = color;
    this.xOrigin = 0;
    this.yOrigin = 0;
    this.rotationIndex = 0;
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

  moveOrigin(x, y) {
    this.xOrigin = x * this.blockSize;
    this.yOrigin = y * this.blockSize;
  }

  draw() {
    console.log(this.rotationIndex);
    console.log(this.shapeMatrix);
    var shape = this.shapeMatrix[this.rotationIndex];

    for (let y = 0; y < shape.length; y++) {
      var row = shape[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          this.drawBlock(
            this.xOrigin + x * this.blockSize,
            this.yOrigin + y * this.blockSize
          );
        }
      }
    }
  }

  clear() {
    var shape = this.shapeMatrix[this.rotationIndex];

    for (let y = 0; y < shape.length; y++) {
      var row = shape[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          this.clearBlock(
            this.xOrigin + x * this.blockSize,
            this.yOrigin + y * this.blockSize
          );
        }
      }
    }
  }

  moveTo(x, y) {
    this.clear();
    this.moveOrigin(x, y);
    this.draw();
  }

  rotate() {
    this.clear(); // clear the shape before rotating, uses the current shape in the matrix to clear
    this.rotationIndex =
      this.rotationIndex < this.shapeMatrix.length - 1
        ? this.rotationIndex + 1
        : 0; // handle overflows for rotationIndex, only go to 90deg * 4 for a complete circle
    this.draw(); // draw the shape at the new position in the matrix
  }
}
