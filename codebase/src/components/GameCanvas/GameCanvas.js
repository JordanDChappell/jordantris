import styles from "./GameCanvas.module.css";

export default class GameCanvas {
  constructor(id) {
    this.id = id;
    this.context = null;
    this.canvas = null;

    this.init();
  }

  init() {
    var canvas = document.createElement("canvas");
    canvas.setAttribute("id", this.id);
    canvas.setAttribute("class", styles["canvas"]);

    this.canvas = canvas;
    this.context = canvas.getContext("2d");
  }
}