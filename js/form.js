import {forEach} from "./util.js";

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

const toggleFormElementsState = (formElements, isDisabled) => {
  forEach(formElements, function (element) {
    element.disabled = isDisabled;
  });
};

toggleFormElementsState(adformElement.children, true);
toggleFormElementsState(filtersFormElement.children, true);

// Валидация

const guestsAndRoomsValidity = (rooms, guests, onElement) => {
  if (rooms === 100 && guests !== 0) {
    onElement.setCustomValidity(`100 комнат не для гостей`);
  } else if (rooms < guests && guests !== 0) {
    onElement.setCustomValidity(`Количество мест не может превышать количество комнат`);
  } else if (rooms !== 100 && guests === 0) {
    onElement.setCustomValidity(`Не для гостей только 100 комнатные номера`);
  } else {
    onElement.setCustomValidity(``);
  }
  onElement.reportValidity();
};

const onAdformInputCapacityChange = () => {
  const guests = +adformCapacityInput.value;
  const rooms = +adformRoomNumberInput.value;

  guestsAndRoomsValidity(rooms, guests, adformCapacityInput);
};

const onAdformInputRoomNumberChange = () => {
  const guests = +adformCapacityInput.value;
  const rooms = +adformRoomNumberInput.value;

  guestsAndRoomsValidity(rooms, guests, adformRoomNumberInput);
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

const changeFormInputsEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  adformCapacityInput[method](`change`, onAdformInputCapacityChange);
  adformRoomNumberInput[method](`change`, onAdformInputRoomNumberChange);
  adformTypeInput[method](`change`, onTypeInputChange);
  adformTimeinInput[method](`change`, onTimeinInputChange);
  adformTimeoutInput[method](`change`, onTimeoutInputChange);
};

export const activateForm = () => {
  adformElement.classList.remove(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, false);
  toggleFormElementsState(filtersFormElement.children, false);
  changeFormInputsEventsState(true);
};

export const deactivateForm = () => {
  adformElement.classList.add(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, true);
  toggleFormElementsState(filtersFormElement.children, true);
  changeFormInputsEventsState(false);
};

export const fillAdresInput = (x, y) => {
  adformAdressInput.value = `${x}, ${y}`;
};
