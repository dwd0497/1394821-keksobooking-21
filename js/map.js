import {renderElements} from "./util.js";
import {activateForm} from "./form.js";
import {hotelsInfo} from "./data.js";
import {createPin} from "./pin.js";
import {getMainpinXCoord, getMainpinYCoord, changeMainpinEventsState} from "./main-pin.js";

import {fillAdresInput} from "./form.js";

const map = document.querySelector(`.map`);
const pinsElement = document.querySelector(`.map__pins`);

const removeInactiveState = () => {
  map.classList.remove(`map--faded`);
  renderElements(hotelsInfo, pinsElement, createPin);
  activateForm();
};

export const activate = () => {
  removeInactiveState();
  fillAdresInput(getMainpinXCoord(), getMainpinYCoord(map));
  changeMainpinEventsState(false);
};

fillAdresInput(getMainpinXCoord(), getMainpinYCoord(map));

export const mapInsertBefore = (beforeElement, insertedElement) => {
  map.insertBefore(beforeElement, insertedElement);
};

export {removeInactiveState};
