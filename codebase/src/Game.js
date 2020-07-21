import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/Tetromino/BlockFactory';

const tetrominoSize = 24;
var gameCanvas = new GameCanvas('jordantris-canvas', tetrominoSize);
var currentTetromino;
var xpos = 0;
var ypos = 0;


export function init(container) {
  container.appendChild(gameCanvas.backgroundLayer);
  container.appendChild(gameCanvas.foregroundLayer);

  setKeyboardListeners();
}

export function run() {
  currentTetromino = createTetromino(
    't',
    gameCanvas.foregroundLayer.getContext('2d'),
    tetrominoSize
  );

  if (currentTetromino) {
    currentTetromino.moveOrigin(xpos, ypos);
    currentTetromino.draw();
  }
}

function setKeyboardListeners() {
  document.onkeydown = (event) => {
    console.log(event);
    // on 'c' key down event
    if (event.keyCode === 67) {
      currentTetromino.clear();
    }

    // on right button
    if (event.keyCode === 39) {
      xpos += 1;
      currentTetromino.moveTo(xpos, currentTetromino.yOrigin);
    }

    // on left button
    if (event.keyCode === 37) {
      xpos -= 1;
      currentTetromino.moveTo(xpos, currentTetromino.yOrigin);
    }
  };
}
