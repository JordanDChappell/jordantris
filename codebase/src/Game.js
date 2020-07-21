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
      { shape: 't', position: [0, this.tetrominoSize] },
      {
        shape: 'z',
        position: [
          this.tetrominoSize * 4,
          this.tetrominoSize
        ]
      },
      {
        shape: 'square',
        position: [0, this.tetrominoSize * 4]
      },
      {
        shape: 'l',
        position: [
          this.tetrominoSize * 4,
          this.tetrominoSize * 4
        ]
      }
    ];

    for (let i = 0; i < blocks.length; i++) {
      var tetromino = createTetromino(
        blocks[i].shape,
        this.gameCanvas.foregroundLayer.getContext('2d'),
        this.tetrominoSize
      );
      if (tetromino) {
        tetromino.draw(blocks[i].position[0], blocks[i].position[1]);
      }
    }
  }
}
