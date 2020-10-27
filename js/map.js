import {loadData} from "./xhrs.js";
import {activateForm, deactivateForm} from "./form.js";
import {getMainpinXCoord, getMainpinYCoord} from "./main-pin.js";
import {fillAdresInput} from "./form.js";
import {renderPins, removePins} from "./pin.js";
import {removeOldCard} from "./card.js";

const map = document.querySelector(`.map`);

export const removeInactiveState = (hotelsData) => {
  map.classList.remove(`map--faded`);
  renderPins(hotelsData);
  activateForm();
};

export const addInactiveState = () => {
  map.classList.add(`map--faded`);
  removePins();
  removeOldCard();
  deactivateForm();
};

// setTimeout(addInactiveState, 5000); // Для проверки активации неактивного состония

export const getAdresInput = () => {
  return fillAdresInput(getMainpinXCoord(), getMainpinYCoord(map));
};

export const activate = () => {
  if (map.classList.contains(`map--faded`)) {
    loadData(successHandler, errorHandler);
    getAdresInput();
    // changeMainpinEventsState(false); добавить эту строчку на переход в неактивное состояние???(нет)
  }
};

const successHandler = (hotelsData) => {
  removeInactiveState(hotelsData);
};

const errorHandler = (errorMessage) => {
  const node = document.createElement(`div`);
  node.style = `z-index: 100; text-align: center; background-color: gray; transform: translate(-50%, -50%);`;
  node.style.position = `fixed`;
  node.style.borderRadius = `20px`;
  node.style.boxShadow = `4px 4px 8px 0px rgba(255, 255, 255, 0.5)`;
  node.style.color = `#fff`;
  node.style.top = `50%`;
  node.style.left = `50%`;
  node.style.padding = `40px 20px`;
  node.style.fontSize = `30px`;
  node.style.cursor = `default`;

  node.textContent = errorMessage;
  document.body.appendChild(node);

  // добавить оверлей и возможноть закрытия
};

getAdresInput();

export const mapInsertBefore = (beforeElement, insertedElement) => {
  map.insertBefore(beforeElement, insertedElement);
};
