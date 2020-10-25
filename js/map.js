
import {activateForm, deactivateForm} from "./form.js";
import {getMainpinXCoord, getMainpinYCoord} from "./main-pin.js";
import {fillAdresInput} from "./form.js";
import {renderPins, removePins} from "./pin.js";
import {removeOldCard} from "./card.js";

const map = document.querySelector(`.map`);

export const removeInactiveState = () => {
  map.classList.remove(`map--faded`);
  renderPins();
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
  removeInactiveState();
  getAdresInput();
  // changeMainpinEventsState(false); добавить эту строчку на переход в неактивное состояние???(нет)
};

getAdresInput();

export const mapInsertBefore = (beforeElement, insertedElement) => {
  map.insertBefore(beforeElement, insertedElement);
};
