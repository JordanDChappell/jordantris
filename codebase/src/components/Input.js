import "../styles/global/main.global.css";
import styles from "../styles/modules/Input.module.css";

export default class Input {
  constructor(label, name) {
    this.label = label;
    this.name = name;
  }

  render() {
    return `
      <label class="${styles["label"]}" for="${this.name}">${this.label}</label>
      <input class="${styles["input"]} global-input" type="text" id="${this.name}" name="${this.name}">
    `;
  }
}
