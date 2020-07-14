import Input from './components/Input';

function component() {
  let input = new Input("Test", "test");
  const element = document.createElement('div');

  element.innerHTML = input.render();

  return element;
}

document.body.appendChild(component());
