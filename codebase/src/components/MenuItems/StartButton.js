import styles from './StartButton.module.css';

const render = (buttonCallback) => {
  const button = document.createElement('button');
  button.setAttribute('id', 'start-button');
  button.setAttribute('class', styles.button);
  button.innerHTML = 'START';

  // * On click event should call the button callback and hide the button
  button.onclick = () => {
    button.classList.add('hidden');
    buttonCallback();
  };
  return button;
};

export const startButton = { render };
