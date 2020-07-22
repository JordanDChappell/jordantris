import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/GameBlock/BlockFactory';

// * Root scoped game variables
const blockSize = 24;
var gameCanvas = new GameCanvas('jordantris-canvas', blockSize);
var currentShape;
var shapeList = ['L', 'I', 'S', 'Z', 'T'];
var shapeIndex = 0;
var xpos = 0;
var ypos = 0;


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
      currentShape.clear();
    }

    // on right button
    if (event.keyCode === 39) {
      xpos += 1;
      currentShape.moveTo(xpos, currentShape.yOrigin);
    }

    // on left button
    if (event.keyCode === 37) {
      xpos -= 1;
      currentShape.moveTo(xpos, currentShape.yOrigin);
    }

    if (event.keyCode === 38) {
      currentShape.rotate();
    }

    if (event.keyCode === 40) {
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
  };
}
 