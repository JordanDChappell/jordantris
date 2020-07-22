import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/Tetromino/BlockFactory';

const tetrominoSize = 24;
var gameCanvas = new GameCanvas('jordantris-canvas', tetrominoSize);
var currentTetromino;
var tetrominoList = ['l', 'long', 's', 'z', 't'];
var tetrominoIndex = 0;
var xpos = 0;
var ypos = 0;


export function init(container) {
  container.appendChild(gameCanvas.backgroundLayer);
  container.appendChild(gameCanvas.foregroundLayer);

  setKeyboardListeners();
}

export function run() {
  currentTetromino = createTetromino(
    tetrominoList[tetrominoIndex],
    gameCanvas.foregroundLayer.getContext('2d'),
    tetrominoSize
  );

  if (currentTetromino) {
    currentTetromino.moveOrigin(xpos, ypos);
    currentTetromino.draw();
    tetrominoIndex++;
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

    if (event.keyCode === 38) {
      currentTetromino.rotate();
    }

    if (event.keyCode === 40) {
      currentTetromino.clear();
      currentTetromino = createTetromino(
        tetrominoList[tetrominoIndex],
        gameCanvas.foregroundLayer.getContext('2d'),
        tetrominoSize
      );
      tetrominoIndex = tetrominoIndex < 4 ? tetrominoIndex + 1 : 0;

      currentTetromino.moveOrigin(xpos, ypos);
      currentTetromino.draw();
    }
  };
}
 