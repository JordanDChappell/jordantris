export default class Input {
  constructor(label, name) {
    this.label = label
    this.name = name
  }

  render() {
    return `
      <label for="${this.name}">${this.label}</label>
      <input type="text" id="${this.name}" name="${this.name}">
    `
  }
}