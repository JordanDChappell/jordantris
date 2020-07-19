import Input from "./components/Input";
import Cruxil from "./images/cruxil.jpg";

function component() {
  let input = new Input("Test", "test");
  const container = document.createElement("div");
  const element = document.createElement("div");
  element.innerHTML = input.render();

  const image = document.createElement("img");
  image.src = Cruxil;
  image.classList.add("small-image");
  
  container.appendChild(element);
  container.appendChild(image);

  return container;
}

document.body.appendChild(component());
