export default class Block {
  constructor(context, blockSize, color) {
    this.context = context;
    this.blockSize = blockSize;
    this.color = color;
    this.xOrigin = 0;
    this.yOrigin = 0;
    this.rotationIndex = 0;
  }

  // ################ Drawing functions ################ //

  /**
   * * Draw a single block used to build larger shapes. Draws the block using the local coordinates
   * * as a negative origin (draws from top left to bottom right by current blockSize).
   * @param {number} x | x-axis local coordinate to draw a block from
   * @param {number} y | y-axis local coordinate to draw a block from
   */
  drawBlock(x, y) {
    this.context.fillStyle = this.color;
    this.context.strokeRect(x, y, this.blockSize, this.blockSize); // draw the blocks outline
    this.context.fillRect(x + 1, y + 1, this.blockSize - 2, this.blockSize - 2); // draw the blocks color, slightly smaller than the outline
  }

  /**
   * * Clear a single block from the canvas.
   * @param {number} x | x-axis local coordinate to clear a block from
   * @param {number} y | y-axis local coordinate to clear a block from
   */
  clearBlock(x, y) {
    // * Clear a slightly larger area (1 pixel in all directions) around a block.
    this.context.clearRect(
      x - 1,
      y - 1,
      this.blockSize + 2,
      this.blockSize + 2
    );
  }

  /**
   * * Moves the origin of the block to a new place, handles grid transform from pixels to local
   * * coordinate system.
   * @param {number} x | x-axis coordinate in the grid
   * @param {number} y | y-axis coordinate in the grid
   */
  moveOrigin(x, y) {
    this.xOrigin = x * this.blockSize;
    this.yOrigin = y * this.blockSize;
  }

  /**
   * * Draw the current shape in the canvas, using combinations of squares.
   */
  draw() {
    var shape = this.shapeMatrix[this.rotationIndex]; // takes the current rotation of our shape

    // * Loop over the x and y axis in the shape matrix, drawing a block in a position marked with a 1
    for (let y = 0; y < shape.length; y++) {
      var row = shape[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          // only draw blocks where a 1 is set
          this.drawBlock(
            this.xOrigin + x * this.blockSize,
            this.yOrigin + y * this.blockSize
          );
        }
      }
    }
  }

  /**
   * * Clear the current shape from the canvas.
   */
  clear() {
    var shape = this.shapeMatrix[this.rotationIndex];

    // * Loop over the x and y axis in the shape matrix, clearing all of the blocks marked with a 1
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

  // ############## Movement functions ################# //

  /**
   * * Helper function to clear a block and draw it in a new position.
   * @param {number} x | x coordinate to move our shape to
   * @param {number} y | y coordinate to move our shape to
   */
  moveTo(x, y) {
    this.clear();
    this.moveOrigin(x, y);
    this.draw();
  }

  /**
   * * Helper function to clear a block and select a new rotation in the shape matrix.
   */
  rotate() {
    this.clear(); // clear the shape before rotating, uses the current shape in the matrix to clear
    this.rotationIndex =
      this.rotationIndex < this.shapeMatrix.length - 1
        ? this.rotationIndex + 1
        : 0; // handle overflows for rotationIndex, only go to 90deg * 4 for a complete circle
    this.draw(); // draw the shape at the new position in the matrix
  }
}
