import GameCanvas from './components/GameCanvas/GameCanvas';

import "./styles/global/main.global.css";

function component() {
  const container = document.createElement("div");

  const jordantrisGameCanvas = new GameCanvas("jordantris-canvas");
  console.log(jordantrisGameCanvas);
  
  container.appendChild(jordantrisGameCanvas.canvas);
  return container;
}

document.body.appendChild(component());
