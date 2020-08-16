import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/GameBlock/BlockFactory';
import KeyHandler from './components/GameInput/KeyHandler';
import { zeros, shuffle } from './utils/array';
import { throttle } from 'lodash';

// * Root scoped animation variables
const maxGravity = 0.05;
const gravityFactor = 0.02;
var gravity;
var gravityTimestamp;

// * Root scoped game variables
const blockSize = 24;
var keyHandler = new KeyHandler();
var gameCanvas = new GameCanvas('jordantris-canvas', blockSize); // create a game canvas object, with foreground / background
var gameBoundary = [
  // calculate the game boundary size in block rather than pixels
  gameCanvas.foregroundLayer.width / blockSize,
  gameCanvas.foregroundLayer.height / blockSize
];
var gameState = [];
var rowsCleared;
var gameStopped;

// * Root scoped shape variables
var currentShape; // holds the shape being controlled
var shapeList = ['L', 'I', 'S', 'Z', 'T', 'J', 'O']; // a list of all shape characters for creating blocks
var shapeIndex; // indexes the shapeList

/**
 * * Sets up the game canvas and initializes a shape, starts the animation.
 * @param {HTMLElement} container | Container element to append canvas to
 */
export function init(container) {
  // * Initialize variables
  gravity = 0.5;
  gravityTimestamp = 0;
  rowsCleared = 0;
  gameStopped = false;
  shapeIndex = 0;

  // * Initialize game objects
  container.appendChild(gameCanvas.backgroundLayer);
  container.appendChild(gameCanvas.foregroundLayer);
  setKeyboardListeners();
}

export function start() {
  // * Set up the game state array
  for (let y = 0; y < gameBoundary[1]; y++) {
    gameState[y] = [];
    for (let x = 0; x < gameBoundary[0]; x++) {
      gameState[y][x] = 0;
    }
  }

  // * Shuffle the shape list
  shuffle(shapeList);

  // * Set up our first shape
  currentShape = createTetromino(
    shapeList[shapeIndex],
    gameCanvas.foregroundLayer.getContext('2d'),
    blockSize
  );
  currentShape.draw();

  window.requestAnimationFrame(run);
}

/**
 * * The game loop, handle input and game logic using delta time values.
 * @param {number} timestamp | Animation frame callback parameter, used to calculate time values for animation
 */
export function run(timestamp) {
  if (!gameStopped) {
    // * Calculate the number of seconds passed since the last frame
    let secondsSinceGravity = (timestamp - gravityTimestamp) / 1000;

    // * Test for player inputs
    handleMovement();

    // * Handle gravity
    if (secondsSinceGravity > gravity) {
      gravityTimestamp = timestamp;
      handleGravity();
    }

    window.requestAnimationFrame(run);
  }
}

/**
 * * Function to end the game after a loss.
 */
function gameOver() {
  gameStopped = true;
  alert(`You managed to clear ${rowsCleared} rows!`);
  gameCanvas.clearForegroundLayer();
}

/**
 * * Helper function to select the next block and generate it.
 */
function generateNextBlock() {
  // * Check if we have run out of shapes in the permutation, reshuffle and reset indices
  if (shapeIndex === shapeList.length - 1) {
    shuffle(shapeList);
    shapeIndex = 0;
  } else {
    shapeIndex += 1;
  }

  currentShape = createTetromino(
    shapeList[shapeIndex],
    gameCanvas.foregroundLayer.getContext('2d'),
    blockSize
  );
  currentShape.draw();
}

/**
 * * Clears a row in the gamecanvas and game state, handles squashing the stack downwards.
 * @param {number} y | Row to clear (in blocks from top of canvas)
 */
function clearRow(y) {
  rowsCleared += 1; // increment the number of cleared rows
  gameCanvas.clearRow(y); // clear the canvas in the current row

  // * Increase gravity
  increaseGravity();

  // * Update the game state to push everything down 1 block
  var tempGameState = [...gameState]; // temp state used when making changes
  for (let i = y; i > 0; i--) {
    // * Determine if the game state is empty here and on the next line (skipping)
    let blocksInCurrentRow = gameState[i].some((block) => {
      return block;
    });

    if (blocksInCurrentRow) {
      tempGameState[i] = gameState[i - 1].slice();
      gameCanvas.clearRow(i);
      gameCanvas.drawRow(i, tempGameState[i]);
    }
  }

  tempGameState[0] = zeros(gameState[0].length);
  gameState = [...tempGameState];
}

/**
 * * Determine if a row should be cleared (block in all row positions).
 */
function checkForRowClear() {
  for (let y = 0; y < gameState.length; y++) {
    if (
      gameState[y].every((column) => {
        return column;
      })
    ) {
      clearRow(y);
    }
  }
}

/**
 * * Helper function to update the game state array after each block reaches it's endpoint.
 * * Leaves a block in the canvas and draws a new one.
 */
function updateGameState() {
  let shape = currentShape.getCurrentShapeMatrix();

  // * Loop over the current shape block positions and flag them in the gamestate
  for (let y = currentShape.yPos; y < shape.length + currentShape.yPos; y++) {
    for (
      let x = currentShape.xPos;
      x < shape[0].length + currentShape.xPos;
      x++
    ) {
      if (shape[y - currentShape.yPos][x - currentShape.xPos]) {
        gameState[y][x] = currentShape.color;
      }
    }
  }

  checkForRowClear();
  generateNextBlock(); // leave the block where it is draw and create a new one
}

/**
 * * Helper function to swap a game piece during play.
 */
function swapBlocks() {
  currentShape.clear();
  generateNextBlock();
}

/**
 * * Helper function to move a game piece downwards at each gravity interval.
 * * Also handles piece swapping when the current piece hits y-axis collision.
 */
function handleGravity() {
  let shapeHasVerticalCollision = currentShape.moveDown(
    gameBoundary,
    gameState
  );

  if (shapeHasVerticalCollision) {
    if (currentShape.yPos === 0) {
      gameOver();
    } else {
      updateGameState();
    }
  }
}

function increaseGravity() {
  if (gravity > maxGravity) {
    gravity -= gravityFactor;
  }
}

/**
 * * Helper function to handle movement based inputs. (left and right)
 */
const handleMovement = throttle(() => {
  if (keyHandler.isDown(keyHandler.SPACE)) {
    swapBlocks();
  }
  if (keyHandler.isDown(keyHandler.LEFT)) {
    currentShape.moveLeft(gameBoundary, gameState);
  }
  if (
    keyHandler.isDown(keyHandler.DOWN) &&
    !keyHandler.isHeld(keyHandler.DOWN)
  ) {
    keyHandler.onKeyHold(keyHandler.DOWN);
    currentShape.drop(gameBoundary, gameState);
  }
  if (keyHandler.isDown(keyHandler.RIGHT)) {
    currentShape.moveRight(gameBoundary, gameState);
  }
  if (keyHandler.isDown(keyHandler.UP) && !keyHandler.isHeld(keyHandler.UP)) {
    keyHandler.onKeyHold(keyHandler.UP);
    currentShape.rotate(gameBoundary, gameState);
  }
}, 50);

/**
 * * Using our KeyHandler class add event listeners to the document.
 */
function setKeyboardListeners() {
  document.addEventListener('keyup', (event) => {
    keyHandler.onKeyUp(event);
  });
  document.addEventListener('keydown', (event) => {
    keyHandler.onKeyDown(event);
  });
}
