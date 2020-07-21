import GameCanvas from './components/GameCanvas/GameCanvas';
import createTetromino from './components/Tetromino/BlockFactory';

export default class Game {
  constructor() {
    this.gameCanvas = null;
    this.tetrominoSize = 24;
  }

  init(container) {
    this.gameCanvas = new GameCanvas('jordantris-canvas');
    container.appendChild(this.gameCanvas.canvas);
  }

  run() {
    let blocks = [
      { shape: 't', position: [this.gameCanvas.padding, this.tetrominoSize] },
      {
        shape: 'z',
        position: [
          this.gameCanvas.padding + this.tetrominoSize * 4,
          this.tetrominoSize
        ]
      },
      {
        shape: 'square',
        position: [this.gameCanvas.padding, this.tetrominoSize * 4]
      },
      {
        shape: 'l',
        position: [
          this.gameCanvas.padding + this.tetrominoSize * 4,
          this.tetrominoSize * 4
        ]
      }
    ];

    for (let i = 0; i < blocks.length; i++) {
      console.log(blocks[i]);
      var tetromino = createTetromino(
        blocks[i].shape,
        this.gameCanvas.context,
        this.tetrominoSize
      );
      if (tetromino) {
        tetromino.draw(blocks[i].position[0], blocks[i].position[1]);
      }
    }
  }
}
