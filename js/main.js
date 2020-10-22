import {renderElements} from "./util.js";
import {hotelsInfo} from "./data.js";
import {inputsListeners, toggleFormElementsState, fillAdresInput} from "./form.js";
import {createPin, onMapPinKeydown} from "./pin.js";

const СontrolButtons = {
  LEFTMOUSEBTN: 0,
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const map = document.querySelector(`.map`);
const adformElement = document.querySelector(`.ad-form`);
const filtersFormElement = document.querySelector(`.map__filters`);
const pinsElement = document.querySelector(`.map__pins`);
const mainPinElement = map.querySelector(`.map__pin--main`);

const removeInactiveState = () => {
  map.classList.remove(`map--faded`);
  adformElement.classList.remove(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, false);
  toggleFormElementsState(filtersFormElement.children, false);
  inputsListeners();
  renderElements(hotelsInfo, pinsElement, createPin);
  map.addEventListener(`keydown`, onMapPinKeydown);
};


const onMainpinMousedown = (evt) => {
  if (evt.button === СontrolButtons.LEFTMOUSEBTN) {
    removeInactiveState();
    fillAdresInput();
    changeMainpinEventsState(false);
  }
};

const onMainpinKeydown = (evt) => {
  if (evt.key === СontrolButtons.ENTER) {
    removeInactiveState();
    fillAdresInput();
    changeMainpinEventsState(false);
  }
};

const changeMainpinEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  mainPinElement[method](`mousedown`, onMainpinMousedown);
  mainPinElement[method](`keydown`, onMainpinKeydown);
};

changeMainpinEventsState(true);
