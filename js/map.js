import {loadData} from "./xhrs.js";
import {activateForm, deactivateForm, fillAdresInput} from "./form.js";
import {getMainpinXCoord, getMainpinYCoord, returnPinToOriginalPosition} from "./main-pin.js";
import {showErrorPopup} from "./errorPopup.js";
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
  deactivateFilters();
  returnPinToOriginalPosition();
};

export const getFillAdressInput = () => {
  return fillAdresInput(getMainpinXCoord(), getMainpinYCoord(map));
};

export const activate = () => {
  if (map.classList.contains(`map--faded`)) {
    loadData(onSccess, onError);
    getFillAdressInput();
  }
};

const onSccess = (hotels) => {
  removeInactiveState(hotels);
};

const onError = (errorMessage) => {
  showErrorPopup(errorMessage, map);
};

getFillAdressInput();

export const insertBeforeInMap = (beforeElement, insertedElement) => {
  map.insertBefore(beforeElement, insertedElement);
};
