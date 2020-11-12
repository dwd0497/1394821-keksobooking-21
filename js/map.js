import {loadData} from "./xhrs.js";
import {activateForm, deactivateForm, fillAdresInput} from "./form.js";
import {getMainpinXCoord, getMainpinYCoord} from "./main-pin.js";
import {isEscape} from "./util.js";
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
  const node = document.createElement(`div`);
  node.classList.add(`error_popup`);
  node.textContent = errorMessage;
  const onEscPress = (evt) => {
    if (!isEscape(evt)) {
      return;
    } else {
      node.remove();
      document.removeEventListener(`keydown`, onEscPress);
    }
  };
  document.addEventListener(`keydown`, onEscPress);
  document.body.appendChild(node);
};

getFillAdressInput();

export const mapInsertBefore = (beforeElement, insertedElement) => {
  map.insertBefore(beforeElement, insertedElement);
};
