import styles from './GameCanvas.module.css';

export default class GameCanvas {
  constructor(id, gridSize) {
    this.id = id;
    this.backgroundLayer = null;
    this.foregroundLayer = null;
    this.height = 504;
    this.width = 412;
    this.padding = 50;
    this.gridSize = gridSize;

    this.initBackgroundLayer(this.height, this.width, this.padding);
    this.initForegroundLayer(this.height, this.width, this.padding);
  }

  /**
   * * Initlize default parameters for a game canvas background layer.
   */
  initBackgroundLayer(height, width, padding) {
    // * Create the canvas element
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', `${this.id}-background`);
    canvas.setAttribute('class', styles['canvas']);
    canvas.setAttribute('style', `left: calc(50% - ${this.width / 2}px)`);

    // * Set initial values
    canvas.height = height;
    canvas.width = width;

    // * Draw initial graphics
    var context = canvas.getContext('2d');

    // draw the game boundary
    context.strokeStyle = '#000000';
    context.strokeRect(padding, this.gridSize, width - padding * 2, height - this.gridSize);

    // draw the game grid
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    context.beginPath();
    for (let i = this.gridSize + padding; i < width - padding; i += this.gridSize) {
      context.moveTo(i, this.gridSize);
      context.lineTo(i, this.height);
    }
    for (let i = this.gridSize * 2; i < height; i += this.gridSize) {
      context.moveTo(padding, i);
      context.lineTo(this.width - padding, i);
    }
    context.stroke();

    this.backgroundLayer = canvas;
  }

  /**
   * * Initlize default parameters for a game canvas foreground layer.
   */
  initForegroundLayer(height, width, padding) {
    // * Create the canvas element
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', `${this.id}-foreground`);
    canvas.setAttribute('class', styles['canvas']);
    canvas.setAttribute(
      'style',
      `left: calc(50% - ${(this.width - this.padding * 2) / 2}px)`
    );

    canvas.height = height;
    canvas.width = width - padding * 2;

    this.foregroundLayer = canvas;
  }

  /**
   * * Helper function to clear the entire foreground canvas.
   */
  clearForegroundLayer() {
    let context = this.foregroundLayer.getContext("2d");
    context.clearRect(0, 0, this.foregroundLayer.width, this.foregroundLayer.height);
  }

  /**
   * * Clear an entire row in the canvas grid.
   * @param {number} yPos | Normalized y position of the row to clear
   */
  clearRow(yPos) {
    let context = this.foregroundLayer.getContext('2d');
    context.clearRect(
      0 - 1,
      yPos * this.gridSize - 1,
      this.foregroundLayer.width + 2,
      this.gridSize + 2
    );
  }

  /**
   * * Draw a row of blocks in the grid, if a color is available at the position in the row array.
   * @param {number} yPos | Normalized y position of the row to draw
   * @param {array} row | Array of colors to draw in each grid square on the row
   */
  drawRow(yPos, row) {
    let context = this.foregroundLayer.getContext('2d');
    for (let i = 0; i < row.length; i++) {
      if (row[i]) {
        let x = i * this.gridSize;
        let y = yPos * this.gridSize;
        context.fillStyle = row[i];
        context.strokeRect(x, y, this.gridSize, this.gridSize); // draw the blocks outline
        context.fillRect(x + 1, y + 1, this.gridSize - 2, this.gridSize - 2); // draw the blocks color, slightly smaller than the outline
      }
    }
  }
}
