import {loadData} from "./xhrs.js";
import {activateForm, fillAdresInput, emitter as formEmitter} from "./form.js";
import {getMainpinXCoord, getMainpinYCoord, returnPinToOriginalPosition, emitter as pinEmitter} from "./main-pin.js";
import {emitter as movementEmitter} from "./pin-movement.js";
import {showErrorPopup} from "./errorPopup.js";
import {renderPins, removePins} from "./pin.js";
import {removeOldCard} from "./card.js";
import {activateFilters, deactivateFilters} from "./filter.js";

const map = document.querySelector(`.map`);

formEmitter.on(`deactivate`, () => {
  addInactiveState();
  getFillAdressInput();
});

pinEmitter.on(`activate`, () => {
  activate();
});

movementEmitter.on(`move`, () => {
  getFillAdressInput();
});

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
  deactivateFilters();
  returnPinToOriginalPosition();
};

export const getFillAdressInput = () => {
  return fillAdresInput(getMainpinXCoord(), getMainpinYCoord(map));
};

export const activate = () => {
  if (map.classList.contains(`map--faded`)) {
    loadData(onSuccess, onError);
    getFillAdressInput();
  }
};

const onSuccess = (hotels) => {
  removeInactiveState(hotels);
};

const onError = (errorMessage) => {
  showErrorPopup(errorMessage, map);
};

getFillAdressInput();
