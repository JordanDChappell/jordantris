export default class KeyHandler {
  constructor() {
    this.pressed = {};
    this.SPACE = 32;
    this.LEFT = 37;
    this.UP = 38;
    this.RIGHT = 39;
    this.DOWN = 40;
  }

  /**
   * * Returns true if a key is currently in the down position.
   * @param {number} keyCode | Number corresponding to a key
   */
  isDown(keyCode) {
    return this.pressed[keyCode];
  }

  /**
   * * Adds a keycode to the pressed object.
   * @param {*} event | Callback event
   */
  onKeyDown(event) {
    this.pressed[event.keyCode] = true;
  }

  /**
   * * Removes a keycode from the pressed object.
   * @param {*} event | Callback event
   */
  onKeyUp(event) {
    delete this.pressed[event.keyCode];
  }
}
