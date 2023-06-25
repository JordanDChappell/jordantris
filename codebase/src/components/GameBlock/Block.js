import { drawBox, drawImage } from '../../utils/drawing';

export default class Block {
  constructor(context, blockSize, color) {
    this.context = context; // canvas context for drawing onto
    this.blockSize = blockSize; // block size in pixels of each block that makes up the shape
    this.color = color; // hex color of the filled blocks
    this.rotationIndex = 0; // index in the rotation matrix

    // * Calculate x and y starting position (y is 0, duh)
    let halfWidthInBlocks = Math.floor(context.canvas.width / 2 / blockSize);
    this.xPos = halfWidthInBlocks - 1; // x position normalized the block size (0 = 0, 1 = this.blockSize, 2 = this.blockSize * 2)
    this.yPos = 0; // normalized y position
  }

  // #################  Helper functions ############### //

  /**
   * * Returns the current shape matrix at the current rotation.
   */
  getCurrentShapeMatrix() {
    return this.shapeMatrix[this.rotationIndex];
  }

  /**
   * * Uses the rotation index to determine angle in degrees to rotate images.
   */
  getCurrentImageRotation() {
    return this.rotationIndex * 90;
  }

  // ################ Drawing functions ################ //

  /**
   * * Draw a single block used to build larger shapes. Draws the block using the local coordinates
   * * as a negative origin (draws from top left to bottom right by current blockSize).
   * @param {number} x | x-axis local coordinate to draw a block from
   * @param {number} y | y-axis local coordinate to draw a block from
   */
  drawBlock(x, y) {
    if (y > 0) {
      drawBox(this.context, x, y, this.blockSize, this.blockSize, this.color);
    }
  }

  drawImageBlock(x, y, rotation, image) {
    if (y > 0) {
      drawBox(this.context, x, y, this.blockSize, this.blockSize, this.color);
      drawImage(this.context, image, x, y, this.blockSize, this.blockSize, rotation);
    }
  }

  /**
   * * Clear a single block from the canvas.
   * @param {number} x | x-axis local coordinate to clear a block from
   * @param {number} y | y-axis local coordinate to clear a block from
   */
  clearBlock(x, y) {
    this.context.clearRect(
      x,
      y,
      this.blockSize,
      this.blockSize
    );
  }

  /**
   * * Draw the current shape in the canvas, using combinations of squares.
   */
  draw() {
    var shape = this.getCurrentShapeMatrix(); // takes the current rotation of our shape
    var rotation = this.getCurrentImageRotation(); // rotation of image in degrees

    // * Loop over the x and y axis in the shape matrix, drawing a block in a position marked with a 1
    for (let y = 0; y < shape.length; y++) {
      var row = shape[y];
      for (let x = 0; x < row.length; x++) {
        if (row[x]) {
          // only draw blocks where a 1 is set
          this.drawImageBlock(
            this.xPos * this.blockSize + x * this.blockSize,
            this.yPos * this.blockSize + y * this.blockSize,
            rotation,
            row[x]
          );
        }
      }
    }
  }

  /**
   * * Clear the current shape from the canvas.
   */
  clear() {
    var shape = this.getCurrentShapeMatrix();

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

  /**
   * * Helper function to move the current block left in the canvas, handles collisions.
   * @param {array} gameBoundary | Two block length numbers in an array, x and y axis max values
   * @param {array} gameState | Multidimensional array of the current game state (1s where blocks are sitting)
   */
  moveLeft(gameBoundary, gameState) {
    let xpos = this.xPos - 1; // left in the x-axis is a negative direction
    let ypos = this.yPos; // no movement in the y-axis

    // * Try to detect collisions, first with the boundary of the game canvas
    let boundaryCollision = this.detectBoundaryCollision(gameBoundary, [
      xpos,
      ypos
    ]);
    if (boundaryCollision === null) {
      // * Wait until after the boundary checking to check the game stack
      let stackCollision = this.detectGameStackCollision(gameState, [
        xpos,
        ypos
      ]);
      if (!stackCollision) {
        this.moveTo(xpos, ypos);
      }
    }
  }

  /**
   * * Helper function to move the current block right in the canvas, handles collisions.
   * @param {array} gameBoundary | Two block length numbers in an array, x and y axis max values
   * @param {array} gameState | Multidimensional array of the current game state (1s where blocks are sitting)
   */
  moveRight(gameBoundary, gameState) {
    let xpos = this.xPos + 1; // right in the x-axis is a positive direction
    let ypos = this.yPos; // no movement in the y-axis

    // * Try to detect collisions, first with the boundary of the game canvas
    let boundaryCollision = this.detectBoundaryCollision(gameBoundary, [
      xpos,
      ypos
    ]);
    if (boundaryCollision === null) {
      // * Wait until after the boundary checking to check the game stack
      let stackCollision = this.detectGameStackCollision(gameState, [
        xpos,
        ypos
      ]);
      if (!stackCollision) {
        this.moveTo(xpos, ypos);
      }
    }
  }

  /**
   * * Helper function to move the current block down in the canvas, handles collisions.
   * @param {array} gameBoundary | Two block length numbers in an array, x and y axis max values
   * @param {array} gameState | Multidimensional array of the current game state (1s where blocks are sitting)
   */
  moveDown(gameBoundary, gameState) {
    let xpos = this.xPos; // no x-axis movement
    let ypos = this.yPos + 1; // positive y-axis movement is downwards

    // * Try to detect collisions, first with the boundary of the game canvas
    let boundaryCollision = this.detectBoundaryCollision(gameBoundary, [
      xpos,
      ypos
    ]);
    if (boundaryCollision === null) {
      // * Wait until after the boundary checking to check the game stack
      let stackCollision = this.detectGameStackCollision(gameState, [
        xpos,
        ypos
      ]);
      if (!stackCollision) {
        this.moveTo(xpos, ypos);
        return false; // move the shape and then return false, return is used to spawn a new piece
      }
    }

    return true;
  }

  /**
   * * Helper function to clear a block and select a new rotation in the shape matrix.
   * @param {array} gameBoundary | Two block length numbers in an array, x and y axis max values
   * @param {array} gameState | Multidimensional array of the current game state (1s where blocks are sitting)
   */
  rotate(gameBoundary, gameState) {
    this.clear(); // clear the shape before rotating, uses the current shape in the matrix to clear
    this.rotationIndex =
      this.rotationIndex < this.shapeMatrix.length - 1
        ? this.rotationIndex + 1
        : 0; // handle overflows for rotationIndex, only go to 90deg * 4 for a complete circle

    // * Detect collisions as a result of the rotation (when a shape rotates at it's current position it may overflow the boundary of the game)
    let boundaryCollision = this.detectBoundaryCollision(gameBoundary, [
      this.xPos,
      this.yPos
    ]);

    // * If there are boundary collisions then we need to move the shape back into the playing field
    if (boundaryCollision !== null && boundaryCollision.length > 0) {
      // * If collision coordinates are positive then a collision has been calculated for that axis
      if (boundaryCollision[0] > 0 || boundaryCollision[0] < 0) {
        this.moveTo(this.xPos - boundaryCollision[0], this.yPos);
      }
    } else {
      let gameStackCollision = this.detectGameStackCollision(gameState, [
        this.xPos,
        this.yPos
      ]);

      // * If there are game piece collisions, don't rotate (yet);
      // TODO: Fix this so that a game piece collision also bumps the current shape into a valid position?
      if (gameStackCollision) {
        this.rotationIndex =
          this.rotationIndex === 0
            ? this.shapeMatrix.length - 1
            : this.rotationIndex - 1;
      }
    }

    this.draw(); // draw the shape at the new position in the matrix
  }

  /**
   * * Helper function to drop a piece until it hits a collision entity.
   * @param {array} gameBoundary | Two block length numbers in an array, x and y axis max values
   * @param {array} gameState | Multidimensional array of the current game state (1s where blocks are sitting)
   */
  drop(gameBoundary, gameState) {
    var collision = false;
    do {
      collision = this.moveDown(gameBoundary, gameState);
    } while (!collision);
  }

  // ############# Collision Functions #################### //

  /**
   * * Calculates the basic hitbox for a shape, max of x,y footprint.
   */
  calculateHitbox() {
    var shape = this.getCurrentShapeMatrix();
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

  /**
   * * Detect a collision between the current block and the existing blocks in the game state.
   * @param {array} gameState | Array containing the stack state
   * @param {array} nextPosition | possible next position of the shape, used to determine if the shape would move out of the boundary
   */
  detectGameStackCollision(gameState, nextPosition) {
    // * Calculate the exact block size and dimensions of the shape
    var shape = this.getCurrentShapeMatrix();
    var xAxisPos = nextPosition[0];
    var yAxisPos = nextPosition[1];

    // * We need to loop over the gamestate matrix starting from the nextPosition origin of the shape
    // * we loop until the end of the shape matrix and compare where blocks overlap.
    for (let y = yAxisPos; y < shape.length + yAxisPos; y++) {
      for (let x = xAxisPos; x < shape[0].length + xAxisPos; x++) {
        if (shape[y - yAxisPos][x - xAxisPos] && gameState[y][x]) {
          return true;
        }
      }
    }

    return false;
  }

  static preLoadImages(id, images) {
    images.forEach((image, index) => {
      const linkId = `${id}-${index}`;

      if (document.getElementById(linkId)) 
        return;

      const link = document.createElement('link');
      link.setAttribute('id', linkId);
      link.setAttribute('rel', 'preload');
      link.setAttribute('as', 'image');
      link.setAttribute('href', image);

      document.head.appendChild(link);
    });
  }
}
