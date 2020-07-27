import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/GameBlock/BlockFactory';
import KeyHandler from './components/GameInput/KeyHandler';
import { shuffle } from './utils/array';

// * Root scoped animation variables
var movementTimestamp = 0;
var movementSpeed = 0.06;
var rotationTimestamp = 0;
var rotationSpeed = 0.08;
var gravityTimestamp = 0;
var gravity = 0.5;

// * Root scoped game variables
var keyHandler = new KeyHandler();
const blockSize = 24;
var gameCanvas = new GameCanvas('jordantris-canvas', blockSize); // create a game canvas object, with foreground / background
var gameBoundary = [
  // calculate the game boundary size in block rather than pixels
  gameCanvas.foregroundLayer.width / blockSize,
  gameCanvas.foregroundLayer.height / blockSize
];
var gameState = [];

// * Root scoped shape variables
var currentShape; // holds the shape being controlled
var shapeList = ['L', 'I', 'S', 'Z', 'T', 'J', 'O']; // a list of all shape characters for creating blocks
var shapeIndex = 0; // indexes the shapeList

/**
 * * Sets up the game canvas and initializes a shape, starts the animation.
 * @param {HTMLElement} container | Container element to append canvas to
 */
export function init(container) {
  container.appendChild(gameCanvas.backgroundLayer);
  container.appendChild(gameCanvas.foregroundLayer);

  // * Shuffle the shape list
  shuffle(shapeList);

  // * Set up the game state array
  for (let y = 0; y < gameBoundary[1]; y++) {
    gameState[y] = [];
    for (let x = 0; x < gameBoundary[0]; x++) {
      gameState[y][x] = 0;
    }
  }

  // * Set up our first shape
  currentShape = createTetromino(
    shapeList[shapeIndex],
    gameCanvas.foregroundLayer.getContext('2d'),
    blockSize
  );
  currentShape.draw();

  setKeyboardListeners();
  window.requestAnimationFrame(run);
}

/**
 * * The game loop, handle input and game logic using delta time values.
 * @param {number} timestamp | Animation frame callback parameter, used to calculate time values for animation
 */
export function run(timestamp) {
  // * Calculate the number of seconds passed since the last frame
  let secondsSinceMovement = (timestamp - movementTimestamp) / 1000;
  let secondsSinceRotation = (timestamp - rotationTimestamp) / 1000;
  let secondsSinceGravity = (timestamp - gravityTimestamp) / 1000;

  if (secondsSinceMovement > movementSpeed) {
    movementTimestamp = timestamp;
    handleMovement();
  }

  if (secondsSinceRotation > rotationSpeed) {
    rotationTimestamp = timestamp;
    handleRotation();
  }

  if (secondsSinceGravity > gravity) {
    gravityTimestamp = timestamp;
    handleGravity();
  }

  window.requestAnimationFrame(run);
}

function generateNextBlock() {
  // * Check if we have run out of shapes in the permutation, reshuffle and reset indices
  if (shapeIndex === shapeList.length - 1) {
    shuffle(shapeList);
    shapeIndex = 0;
  }
  else {
    shapeIndex += 1;
  }

  currentShape = createTetromino(
    shapeList[shapeIndex],
    gameCanvas.foregroundLayer.getContext('2d'),
    blockSize
  );
  currentShape.draw();
}

function updateGameState() {
  let {
    rowLengths,
    rowOffset,
    columnLengths,
    columnOffset
  } = currentShape.calculateLengthMatrix(); // height at each local x value of the shape
  let shape = currentShape.getCurrentShapeMatrix();

  console.log(rowLengths, rowOffset, columnLengths, columnOffset);

  // * Loop over the current shape block positions and flag them in the gamestate
  for (let y = currentShape.yPos; y < rowLengths.length + currentShape.yPos; y++) {
    for (let x = currentShape.xPos; x < columnLengths.length + currentShape.xPos; x++) {
      if (shape[y - currentShape.yPos][x - currentShape.xPos]) {
        gameState[y][x] = 1;
      }
    }
  }

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
  let shapeAtBottom = currentShape.moveDown(gameBoundary);

  if (shapeAtBottom) {
    updateGameState();
  }
}

/**
 * * Helper function to handle movement based inputs. (left and right)
 */
function handleMovement() {
  if (keyHandler.isDown(keyHandler.SPACE)) swapBlocks();
  if (keyHandler.isDown(keyHandler.LEFT)) currentShape.moveLeft(gameBoundary);
  if (keyHandler.isDown(keyHandler.DOWN)) handleGravity();
  if (keyHandler.isDown(keyHandler.RIGHT)) currentShape.moveRight(gameBoundary);
}

/**
 * * Helper function to handle rotation inputs.
 */
function handleRotation() {
  if (keyHandler.isDown(keyHandler.UP)) currentShape.rotate(gameBoundary);
}

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
