import styles from './GameCanvas.module.css';

export default class GameCanvas {
  constructor(id, gridSize) {
    this.id = id;
    this.backgroundLayer = null;
    this.foregroundLayer = null;
    this.height = 480;
    this.width = 412;
    this.padding = 50;
    this.gridSize = gridSize;

    this.initBackgroundLayer(this.height, this.width, this.padding);
    this.initForegroundLayer(this.height, this.width, this.padding);
  }

  /**
   * * Initlize default parameters for a game canvas.
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
    context.strokeRect(padding, 0, width - padding * 2, height);

    // draw the game grid
    context.strokeStyle = 'rgba(0, 0, 0, 0.5)';
    context.beginPath();
    for (let i = this.gridSize + padding; i < width - padding; i += 24) {
      context.moveTo(i, 0);
      context.lineTo(i, this.height);
    }
    for (let i = this.gridSize; i < height; i += 24) {
      context.moveTo(padding, i);
      context.lineTo(this.width - padding, i);
    }
    context.stroke();

    this.backgroundLayer = canvas;
  }

  initForegroundLayer(height, width, padding) {
    // * Create the canvas element
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', `${this.id}-foreground`);
    canvas.setAttribute('class', styles['canvas']);
    canvas.setAttribute('style', `left: calc(50% - ${(this.width - this.padding * 2) / 2}px)`);

    canvas.height = height;
    canvas.width = width - padding * 2;

    this.foregroundLayer = canvas;
  }
}
