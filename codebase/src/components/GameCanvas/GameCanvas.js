import { drawBox, drawImage } from '../../utils/drawing';
import { isObject } from '../../utils/utils';
import styles from './GameCanvas.module.css';

export default class GameCanvas {
  constructor(id, blockSize, gridWidth, gridHeight, padding) {
    this.id = id;
    this.backgroundLayer = null;
    this.foregroundLayer = null;
    this.width = gridWidth * blockSize;
    this.height = gridHeight * blockSize;
    this.padding = padding;
    this.blockSize = blockSize;

    this.initBackgroundLayer(
      this.height,
      this.width + this.padding * 2,
      this.padding
    );
    this.initForegroundLayer(this.height, this.width);
  }

  /**
   * * Initlize default parameters for a game canvas background layer.
   */
  initBackgroundLayer(height, width, padding) {
    // * Create the canvas element
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', `${this.id}-background`);
    canvas.setAttribute('class', styles['canvas']);

    // * Set initial values
    canvas.height = height;
    canvas.width = width;

    // * Draw initial graphics
    var context = canvas.getContext('2d');

    // draw the game boundary
    context.strokeStyle = '#000000';
    context.strokeRect(
      padding,
      this.blockSize,
      width - padding * 2,
      height - this.blockSize
    );

    // draw the game grid
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    context.beginPath();
    for (
      let i = this.blockSize + padding;
      i < width - padding;
      i += this.blockSize
    ) {
      context.moveTo(i, this.blockSize);
      context.lineTo(i, this.height);
    }
    for (let i = this.blockSize * 2; i < height; i += this.blockSize) {
      context.moveTo(padding, i);
      context.lineTo(width - padding, i);
    }
    context.stroke();

    this.backgroundLayer = canvas;
  }

  /**
   * * Initlize default parameters for a game canvas foreground layer.
   */
  initForegroundLayer(height, width) {
    // * Create the canvas element
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', `${this.id}-foreground`);
    canvas.setAttribute('class', styles['canvas']);

    canvas.height = height;
    canvas.width = width;

    this.foregroundLayer = canvas;
  }

  /**
   * * Helper function to clear the entire foreground canvas.
   */
  clearForegroundLayer() {
    let context = this.foregroundLayer.getContext('2d');
    context.clearRect(
      0,
      0,
      this.foregroundLayer.width,
      this.foregroundLayer.height
    );
  }

  /**
   * * Clear an entire row in the canvas grid.
   * @param {number} yPos | Normalized y position of the row to clear
   */
  clearRow(yPos) {
    let context = this.foregroundLayer.getContext('2d');
    context.clearRect(
      0 - 1,
      yPos * this.blockSize - 1,
      this.foregroundLayer.width + 2,
      this.blockSize + 2
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
        let x = i * this.blockSize;
        let y = yPos * this.blockSize;

        if (isObject(row[i]) && 'image' in row[i]) {
          drawBox(context, x, y, this.blockSize, this.blockSize);
          drawImage(
            context,
            row[i].image,
            x,
            y,
            this.blockSize,
            this.blockSize,
            row[i].angle
          );
        } else {
          drawBox(context, x, y, this.blockSize, this.blockSize, row[i]);
        }
      }
    }
  }
}
