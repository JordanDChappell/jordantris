import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/Tetromino/BlockFactory';

export default class Game {
  constructor() {
    this.gameCanvas = null;
    this.tetrominoSize = 24;
  }

  init(container) {
    this.gameCanvas = new GameCanvas('jordantris-canvas', this.tetrominoSize);
    container.appendChild(this.gameCanvas.backgroundLayer);
    container.appendChild(this.gameCanvas.foregroundLayer);
  }

  run() {
    let blocks = [
      { shape: 't', position: [0, 0] },
      {
        shape: 'z',
        position: [this.tetrominoSize * 4, 0]
      },
      {
        shape: 'square',
        position: [0, this.tetrominoSize * 4]
      },
      {
        shape: 'l',
        position: [this.tetrominoSize * 4, this.tetrominoSize * 4]
      }
    ];

    var tetromino = createTetromino(
      blocks[0].shape,
      this.gameCanvas.foregroundLayer.getContext('2d'),
      this.tetrominoSize
    );

    if (tetromino) {
      tetromino.moveOrigin(blocks[0].position[0], blocks[0].position[1]);
      tetromino.draw();
      this.setKeyboardListeners(tetromino);
    }
  }

  setKeyboardListeners(tetromino) {
    document.onkeydown = (event) => {
      console.log(event);
      // on 'c' key down event
      if (event.keyCode === 67) {
        tetromino.clear();
      }

      // on right button
      if (event.keyCode === 39) {
        tetromino.moveTo(tetromino.xOrigin + this.tetrominoSize, tetromino.yOrigin);
      }

      // on left button
      if (event.keyCode === 37) {
        tetromino.moveTo(tetromino.xOrigin - this.tetrominoSize, tetromino.yOrigin);
      }
    };
  }
}
