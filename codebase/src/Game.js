import GameCanvas from './components/GameCanvas/GameCanvas';
import Tetro from './components/Tetromino/Tetro';
import Zetro from './components/Tetromino/Zetro';
import Sqetro from './components/Tetromino/Sqetro';
import Letro from './components/Tetromino/Letro';

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
    var tblock = new Tetro(this.gameCanvas.context, this.tetrominoSize);
    tblock.draw(this.gameCanvas.padding, this.tetrominoSize);

    var zblock = new Zetro(this.gameCanvas.context, this.tetrominoSize);
    zblock.draw(this.gameCanvas.padding + this.tetrominoSize * 4, this.tetrominoSize);

    var sqblock = new Sqetro(this.gameCanvas.context, this.tetrominoSize);
    sqblock.draw(this.gameCanvas.padding, this.tetrominoSize * 4);

    var lblock = new Letro(this.gameCanvas.context, this.tetrominoSize);
    lblock.draw(this.gameCanvas.padding + this.tetrominoSize * 4, this.tetrominoSize * 4);
  }
}


