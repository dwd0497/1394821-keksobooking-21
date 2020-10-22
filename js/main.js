import {renderElements} from "./util.js";
import {hotelsInfo} from "./data.js";
import {
  onAdformInputCapacityChange,
  onTypeInputChange,
  onTimeinInputChange,
  onTimeoutInputChange,
  toggleFormElementsState
} from "./form.js";
import {createPin, onMapPinKeydown} from "./pin.js";

const map = document.querySelector(`.map`);
const adformElement = document.querySelector(`.ad-form`);
const adformCapacityInput = adformElement.querySelector(`#capacity`);
const adformTypeInput = adformElement.querySelector(`#type`);
const adformTimeinInput = adformElement.querySelector(`#timein`);
const adformTimeoutInput = adformElement.querySelector(`#timeout`);
const filtersFormElement = document.querySelector(`.map__filters`);
const pinsElement = document.querySelector(`.map__pins`);

const removeInactiveState = () => {
  map.classList.remove(`map--faded`);
  adformElement.classList.remove(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, false);
  toggleFormElementsState(filtersFormElement.children, false);
  adformCapacityInput.addEventListener(`change`, onAdformInputCapacityChange);
  adformTypeInput.addEventListener(`change`, onTypeInputChange);
  adformTimeinInput.addEventListener(`change`, onTimeinInputChange);
  adformTimeoutInput.addEventListener(`change`, onTimeoutInputChange);
  renderElements(hotelsInfo, pinsElement, createPin);
  map.addEventListener(`keydown`, onMapPinKeydown);
};

export {removeInactiveState};
