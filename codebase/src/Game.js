import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/GameBlock/BlockFactory';
import KeyHandler from './components/GameInput/KeyHandler';

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

/**
 * * Helper function to swap a game piece during play.
 */
function swapPieces() {
  currentShape.clear();
  shapeIndex = shapeIndex < shapeList.length - 1 ? shapeIndex + 1 : 0;
  currentShape = createTetromino(
    shapeList[shapeIndex],
    gameCanvas.foregroundLayer.getContext('2d'),
    blockSize
  );
  currentShape.draw();
}

/**
 * * Helper function to move a game piece downwards at each gravity interval.
 * * Also handles piece swapping when the current piece hits y-axis collision.
 */
function handleGravity() {
  let shapeAtBottom = currentShape.moveDown(gameBoundary);

  if (shapeAtBottom) {
    shapeIndex = shapeIndex < shapeList.length - 1 ? shapeIndex + 1 : 0;
    currentShape = createTetromino(
      shapeList[shapeIndex],
      gameCanvas.foregroundLayer.getContext('2d'),
      blockSize
    );
    currentShape.draw();
  }
}

/**
 * * Helper function to handle movement based inputs. (left and right)
 */
function handleMovement() {
  if (keyHandler.isDown(keyHandler.SPACE)) swapPieces();
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
