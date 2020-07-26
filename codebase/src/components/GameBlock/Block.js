export default class Block {
  constructor(context, blockSize, color) {
    this.context = context; // canvas context for drawing onto
    this.blockSize = blockSize; // block size in pixels of each block that makes up the shape
    this.color = color; // hex color of the filled blocks
    this.xPos = 0; // x position normalized the block size (0 = 0, 1 = this.blockSize, 2 = this.blockSize * 2)
    this.yPos = 0; // normalized y position
    this.rotationIndex = 0; // index in the rotation matrix
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
            this.xPos * this.blockSize + x * this.blockSize,
            this.yPos * this.blockSize + y * this.blockSize
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
            this.xPos * this.blockSize + x * this.blockSize,
            this.yPos * this.blockSize + y * this.blockSize
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
    this.xPos = x;
    this.yPos = y;
    this.draw();
  }

  moveLeft(gameBoundary) {
    let xpos = this.xPos - 1;
    let ypos = this.yPos;

    if (this.detectBoundaryCollision(gameBoundary, [xpos, ypos]) === null) {
      this.moveTo(xpos, ypos);
    }
  }

  moveRight(gameBoundary) {
    let xpos = this.xPos + 1;
    let ypos = this.yPos;

    if (this.detectBoundaryCollision(gameBoundary, [xpos, ypos]) === null) {
      this.moveTo(xpos, ypos);
    }
  }

  moveDown(gameBoundary) {
    let xpos = this.xPos;
    let ypos = this.yPos + 1;

    if (this.detectBoundaryCollision(gameBoundary, [xpos, ypos]) === null) {
      this.moveTo(xpos, ypos);
      return false;
    }
    return true;
  }

  /**
   * * Helper function to clear a block and select a new rotation in the shape matrix.
   */
  rotate(gameBoundary) {
    this.clear(); // clear the shape before rotating, uses the current shape in the matrix to clear
    this.rotationIndex =
      this.rotationIndex < this.shapeMatrix.length - 1
        ? this.rotationIndex + 1
        : 0; // handle overflows for rotationIndex, only go to 90deg * 4 for a complete circle

    // * Detect collisions as a result of the rotation (when a shape rotates at it's current position it may overflow the boundary of the game)
    let collision = this.detectBoundaryCollision(gameBoundary, [
      this.xPos,
      this.yPos
    ]);

    // * If there are collisions then we need to move the shape back into the playing field
    if (collision !== null && collision.length > 0) {
      // * If collision coordinates are positive then a collision has been calculated for that axis
      if (collision[0] > 0) {
        this.moveTo(this.xPos - collision[0], this.yPos);
      }
      // if (collision[1] > 0) {
      //   this.moveTo(this.xPos, this.yPos - collision[1]);
      // }
    }
    this.draw(); // draw the shape at the new position in the matrix
  }

  // ############# Collision Functions #################### //

  /**
   * * Calculates the basic hitbox for a shape, max of x,y footprint.
   */
  calculateHitbox() {
    var shape = this.shapeMatrix[this.rotationIndex];
    var start = []; // starting x, y coordinates of the shape, the top left most block
    var end = []; // ending x, y coordinates of the shape, the bottom right most block

    // * Loop through the shape matrix to determine the start / end coordinates
    for (let y = 0; y < shape.length; y++) {
      var row = shape[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          if (start.length === 0) {
            // special case on first loop
            start = [x, y];
          }
          if (end.length === 0) {
            // special case on first loop
            end = [x, y];
          }
          if (x < start[0]) {
            // x coordinate that is the smallest
            start[0] = x;
          }
          if (y < start[1]) {
            // y coordinate that is the smallest
            start[1] = y;
          }
          if (x > end[0]) {
            // largest x coordinate
            end[0] = x;
          }
          if (y > end[1]) {
            // largest y coordinate
            end[1] = y;
          }
        }
      }
    }

    var offset = [end[0] - start[0] + 1, end[1] - start[1] + 1]; // offset determines the right/down direction length of the shape
    return { start, offset };
  }

  calculateLengthMatrix() {
    var shape = this.shapeMatrix[this.rotationIndex];
    var rowLengths = [];
    var columnLengths = [];

    // * Initialize the length arrays
    for (let y = 0; y < shape.length; y++) {
      columnLengths[y] = 0;
    }
    for (let x = 0; x < shape[0].length; x++) {
      rowLengths[x] = 0;
    }

    // * A nested loop to determine the length of the shape matrix at each local origin.
    for (let y = 0; y < shape.length; y++) {
      console.log(shape[y]);
      for (let x = 0; x < shape[y].length; x++) {
        console.log(shape[y][x]);
        // console.log(x, y);
        if (shape[y][x]) {
          console.log(`block found at ${x}, ${y}`);
        }
      }
    }

    console.log(rowLengths, columnLengths);
  }

  /**
   * * Detect collisions on the x, y boundaries of the canvas, return a collision array of numbers.
   * @param {array} gameBoundary | x, y lengths of the game boundary
   * @param {array} nextPosition | possible next position of the shape, used to determine if the shape would move out of the boundary
   */
  detectBoundaryCollision(gameBoundary, nextPosition) {
    // * Calculate the 'hitbox' of the shape from the origin
    var { start, offset } = this.calculateHitbox();
    var collisions = []; // return a x, y pair that determines how many blocks the collision occured for

    // * Determine the if the shape will collide with a game boundary
    // check for negative positions first, easy check if the piece is going too far left
    if (nextPosition[0] + start[0] < 0 || nextPosition[1] + start[1] < 0) {
      collisions[0] = nextPosition[0] + start[0];
      collisions[1] = nextPosition[1] + start[1];
      return collisions;
    }

    // check for collision on the positive boundaries
    if (
      nextPosition[0] + offset[0] + start[0] > gameBoundary[0] ||
      nextPosition[1] + offset[1] + start[1] > gameBoundary[1]
    ) {
      collisions[0] = nextPosition[0] + offset[0] + start[0] - gameBoundary[0];
      collisions[1] = nextPosition[1] + offset[1] + start[1] - gameBoundary[1];
      return collisions;
    }

    return null; // no collision detected
  }
}
