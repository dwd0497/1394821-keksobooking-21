import {loadData} from "./xhrs.js";
import {activateForm, deactivateForm} from "./form.js";
import {getMainpinXCoord, getMainpinYCoord} from "./main-pin.js";
import {fillAdresInput} from "./form.js";
import {renderPins, removePins} from "./pin.js";
import {createCards} from "./card.js";

const map = document.querySelector(`.map`);

export const removeInactiveState = (hotelsData) => {
  map.classList.remove(`map--faded`);
  renderPins(hotelsData);
  activateForm();
};

export const addInactiveState = () => {
  map.classList.add(`map--faded`);
  removePins();
  // removeOldCard();
  deactivateForm();
};

// setTimeout(addInactiveState, 5000); // Для проверки активации неактивного состония

export const getAdresInput = () => {
  return fillAdresInput(getMainpinXCoord(), getMainpinYCoord(map));
};

export const activate = () => {
  if (map.classList.contains(`map--faded`)) {
    loadData((hotelsData) => {
      removeInactiveState(hotelsData);
      createCards(hotelsData);
    });
    getAdresInput();
    // changeMainpinEventsState(false); добавить эту строчку на переход в неактивное состояние???(нет)
  }
};

getAdresInput();

export const mapInsertBefore = (beforeElement, insertedElement) => {
  map.insertBefore(beforeElement, insertedElement);
};
