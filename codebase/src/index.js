import { init } from './game';

import './styles/global/main.global.css';

const containerId = 'game-container';

function component() {
  const container = document.createElement('div');
  container.setAttribute('id', containerId);
  container.setAttribute('class', containerId);
  return container;
}

document.body.appendChild(component());

init(document.getElementById(containerId));
