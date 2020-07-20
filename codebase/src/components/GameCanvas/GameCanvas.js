import styles from './GameCanvas.module.css';

export default class GameCanvas {
  constructor(id) {
    this.id = id;
    this.context = null;
    this.canvas = null;
    this.height = 480;
    this.width = 412;
    this.padding = 50;

    this.init(this.height, this.width, this.padding);
  }

  /**
   * * Initlize default parameters for a game canvas.
   */
  init(height, width, padding) {
    // * Create the canvas element
    var canvas = document.createElement('canvas');
    canvas.setAttribute('id', this.id);
    canvas.setAttribute('class', styles['canvas']);

    // * Set initial values
    canvas.height = height;
    canvas.width = width;

    // * Draw initial graphics
    var context = canvas.getContext('2d');
    context.strokeStyle = '1px solid #000000';
    context.strokeRect(padding, 0, width - padding * 2, height);

    this.canvas = canvas;
    this.context = context;
  }
}
