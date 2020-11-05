import {loadData} from "./xhrs.js";
import {activateForm, deactivateForm} from "./form.js";
import {getMainpinXCoord, getMainpinYCoord} from "./main-pin.js";
import {fillAdresInput} from "./form.js";
import {renderPins, removePins} from "./pin.js";
import {removeOldCard} from "./card.js";
import {activateFilters, deactivateFilters} from "./filter.js";

const map = document.querySelector(`.map`);

export const removeInactiveState = (hotels) => {
  map.classList.remove(`map--faded`);
  renderPins(hotels);
  activateForm();
  activateFilters();
};

export const addInactiveState = () => {
  map.classList.add(`map--faded`);
  removePins();
  removeOldCard();
  deactivateForm();
  getFillAdressInput();
  deactivateFilters();
};

// setTimeout(addInactiveState, 5000); // Для проверки активации неактивного состония

export const getFillAdressInput = () => {
  return fillAdresInput(getMainpinXCoord(), getMainpinYCoord(map));
};

export const activate = () => {
  if (map.classList.contains(`map--faded`)) {
    loadData(onSccess, onError);
    getFillAdressInput();
    // changeMainpinEventsState(false); добавить эту строчку на переход в неактивное состояние???(нет)
  }
};

const onSccess = (hotels) => {
  removeInactiveState(hotels);
};

const onError = (errorMessage) => {
  const node = document.createElement(`div`);
  node.classList.add(`error_popup`);

  node.textContent = errorMessage;
  document.body.appendChild(node);

  // добавить оверлей и возможноть закрытия
};

getFillAdressInput();

export const mapInsertBefore = (beforeElement, insertedElement) => {
  map.insertBefore(beforeElement, insertedElement);
};
