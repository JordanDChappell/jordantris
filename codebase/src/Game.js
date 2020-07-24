import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/GameBlock/BlockFactory';
import KeyHandler from './components/GameInput/KeyHandler';

// * Root scoped animation variables
var xAxisTimestamp = 0;
var xAxisSpeed = 0.06;
var yAxisTimestamp = 0;
var yAxisSpeed = 0.5;
// var fps;

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

export function run(timestamp) {
  // * Calculate the number of seconds passed since the last frame
  let secondsPassedSinceX = (timestamp - xAxisTimestamp) / 1000;
  let secondsPassedSinceY = (timestamp - yAxisTimestamp) / 1000;

  if (secondsPassedSinceX > xAxisSpeed) {
    xAxisTimestamp = timestamp;
    handleInput();
  }
  if (secondsPassedSinceY > yAxisSpeed) {
    yAxisTimestamp = timestamp;
    handleDrop();
  }

  window.requestAnimationFrame(run);
}

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

function handleDrop() {
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

function handleInput() {
  if (keyHandler.isDown(keyHandler.SPACE)) swapPieces();
  if (keyHandler.isDown(keyHandler.UP)) currentShape.rotate(gameBoundary);
  if (keyHandler.isDown(keyHandler.LEFT)) currentShape.moveLeft(gameBoundary);
  if (keyHandler.isDown(keyHandler.DOWN)) handleDrop();
  if (keyHandler.isDown(keyHandler.RIGHT)) currentShape.moveRight(gameBoundary);
}

function setKeyboardListeners() {
  document.addEventListener('keyup', (event) => {
    keyHandler.onKeyUp(event);
  });
  document.addEventListener('keydown', (event) => {
    keyHandler.onKeyDown(event);
  });
}
