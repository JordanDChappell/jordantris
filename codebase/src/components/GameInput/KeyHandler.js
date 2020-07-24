export default class KeyHandler {
  constructor() {
    this.pressed = {};
    this.SPACE = 32;
    this.LEFT = 37;
    this.UP = 38;
    this.RIGHT = 39;
    this.DOWN = 40;
  }

  isDown(keyCode) {
    return this.pressed[keyCode];
  }

  onKeyDown(event) {
    this.pressed[event.keyCode] = true;
  }

  onKeyUp(event) {
    delete this.pressed[event.keyCode];
  }
}
