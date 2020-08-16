import { init, start } from './game';

import './styles/global/main.global.css';

const containerId = 'game-container';

function component() {
  // * Create page components

  // * Create a container div for the game grid
  const container = document.createElement('div');
  container.setAttribute('id', containerId);
  container.setAttribute('class', 'flexbox center col game-container');
  return container;
}

document.body.appendChild(component());

// * Initialize the game into the created container and start the loop
init(document.getElementById(containerId));
start();
