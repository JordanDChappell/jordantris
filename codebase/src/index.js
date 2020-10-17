import { init, start } from './game';
import { startButton } from './components/MenuItems/StartButton';

import './styles/global/main.global.css';

const containerId = 'game-container';

function gameContainer(id) {
  // * Create a container div for the game grid
  const container = document.createElement('div');
  container.setAttribute('id', id);
  container.setAttribute('class', 'flexbox center col game-container');

  // * Add some menu item elements to the container
  const playButton = startButton.render(start);

  container.append(playButton);

  return container;
}

document.body.appendChild(gameContainer(containerId));

// * Initialize the game into the created container
init(document.getElementById(containerId));
