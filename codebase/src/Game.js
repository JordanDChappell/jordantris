import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/GameBlock/BlockFactory';

// * Root scoped game variables
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
var shapeList = ['L', 'I', 'S', 'Z', 'T']; // a list of all shape characters for creating blocks
var shapeIndex = 0; // indexes the shapeList
var xpos = 0; // current x origin / position of the shape being controlled
var ypos = 0; // current y origin / position of the shape being controlled

export function init(container) {
  container.appendChild(gameCanvas.backgroundLayer);
  container.appendChild(gameCanvas.foregroundLayer);
  setKeyboardListeners();
}

export function run() {
  currentShape = createTetromino(
    shapeList[shapeIndex],
    gameCanvas.foregroundLayer.getContext('2d'),
    blockSize
  );

  if (currentShape) {
    currentShape.moveOrigin(xpos, ypos);
    currentShape.draw();
    shapeIndex++;
  }
}

function setKeyboardListeners() {
  document.onkeydown = (event) => {
    console.log(event);
    // on 'c' key down event
    if (event.keyCode === 67) {
      // clear values
      xpos = 0;
      ypos = 0;
      currentShape.clear();
      currentShape = createTetromino(
        shapeList[shapeIndex],
        gameCanvas.foregroundLayer.getContext('2d'),
        blockSize
      );
      currentShape.moveOrigin(xpos, ypos);
      currentShape.draw();
    }

    if (event.keyCode === 32) {
      currentShape.clear();
      currentShape = createTetromino(
        shapeList[shapeIndex],
        gameCanvas.foregroundLayer.getContext('2d'),
        blockSize
      );
      shapeIndex = shapeIndex < 4 ? shapeIndex + 1 : 0;
      currentShape.moveOrigin(xpos, ypos);
      currentShape.draw();
    }

    // on right arrow
    if (event.keyCode === 39) {
      let nextXPos = xpos + 1;
      let collision = currentShape.detectCollision(gameBoundary, gameState, [nextXPos, ypos]);
      if (!collision) {
        xpos = nextXPos;
        currentShape.moveTo(xpos, ypos);
      }
    }

    // on left arrow
    if (event.keyCode === 37) {
      let nextXPos = xpos - 1;
      let collision = currentShape.detectCollision(gameBoundary, gameState, [nextXPos, ypos]);
      if (!collision) {
        xpos = nextXPos;
        currentShape.moveTo(xpos, ypos);
      }
    }

    // on up arrow
    if (event.keyCode === 38) {
      currentShape.rotate();
    }

    // on down arrow
    if (event.keyCode === 40) {
      let nextYPos = ypos + 1;
      let collision = currentShape.detectCollision(gameBoundary, gameState, [xpos, nextYPos]);
      if (!collision) {
        ypos = nextYPos;
        currentShape.moveTo(xpos, ypos);
      }
    }
  };
}
