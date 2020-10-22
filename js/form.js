import {getMainpinCoords} from "./pin.js";

const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const adformElement = document.querySelector(`.ad-form`);
const adformAdressInput = adformElement.querySelector(`#address`);
const adformCapacityInput = adformElement.querySelector(`#capacity`);
const adformRoomNumberInput = adformElement.querySelector(`#room_number`);
const adformTypeInput = adformElement.querySelector(`#type`);
const adformPriceInput = adformElement.querySelector(`#price`);
const adformTimeinInput = adformElement.querySelector(`#timein`);
const adformTimeoutInput = adformElement.querySelector(`#timeout`);
const filtersFormElement = document.querySelector(`.map__filters`);

// Управление состоянием форм

const forEach = (elements, cb) => Array.prototype.forEach.call(elements, cb);

const toggleFormElementsState = (formElements, isDisabled) => {
  forEach(formElements, function (element) {
    element.disabled = isDisabled;
  });
};

toggleFormElementsState(adformElement.children, true);
toggleFormElementsState(filtersFormElement.children, true);

// Валидация

const onAdformInputCapacityChange = () => {
  const guests = +adformCapacityInput.value;
  const rooms = +adformRoomNumberInput.value;

  if (rooms === 100 && guests !== 0) {
    adformCapacityInput.setCustomValidity(`100 комнат не для гостей`);
  } else if (rooms < guests && guests !== 0) {
    adformCapacityInput.setCustomValidity(`Количество мест не может превышать количество комнат`);
  } else if (rooms !== 100 && guests === 0) {
    adformCapacityInput.setCustomValidity(`Не для гостей только 100 комнатные номера`);
  } else {
    adformCapacityInput.setCustomValidity(``);
  }
  adformCapacityInput.reportValidity();
};

const onTypeInputChange = () => {
  adformPriceInput.min = minPrices[adformTypeInput.value];
  adformPriceInput.placeholder = minPrices[adformTypeInput.value];
};

const onTimeinInputChange = () => {
  adformTimeoutInput.value = adformTimeinInput.value;
};

const onTimeoutInputChange = () => {
  adformTimeinInput.value = adformTimeoutInput.value;
};

const fillAdresInput = () => {
  adformAdressInput.value = getMainpinCoords();
};

const inputsListeners = () => {
  adformCapacityInput.addEventListener(`change`, onAdformInputCapacityChange);
  adformTypeInput.addEventListener(`change`, onTypeInputChange);
  adformTimeinInput.addEventListener(`change`, onTimeinInputChange);
  adformTimeoutInput.addEventListener(`change`, onTimeoutInputChange);
};

fillAdresInput();

export {
  inputsListeners, fillAdresInput, toggleFormElementsState
};
