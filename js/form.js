import {forEach, isEscape} from "./util.js";
import {Validattion} from "./texts.js";
import {addInactiveState, getFillAdressInput} from "./map.js";
import {sendData} from "./xhrs.js";

const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const mainElement = document.querySelector(`main`);
const adformElement = document.querySelector(`.ad-form`);
const adformAdressInput = adformElement.querySelector(`#address`);
const adformCapacityInput = adformElement.querySelector(`#capacity`);
const adformRoomNumberInput = adformElement.querySelector(`#room_number`);
const adformTypeInput = adformElement.querySelector(`#type`);
const adformPriceInput = adformElement.querySelector(`#price`);
const adformTimeinInput = adformElement.querySelector(`#timein`);
const adformTimeoutInput = adformElement.querySelector(`#timeout`);
const filtersFormElement = document.querySelector(`.map__filters`);
const adformResetBtnElement = document.querySelector(`.ad-form__reset`);
const successTemplate = document.querySelector(`#success`).content.querySelector(`.success`);
const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

// Управление состоянием форм

const toggleFormElementsState = (formElements, isDisabled) => {
  forEach(formElements, function (element) {
    element.disabled = isDisabled;
  });
};

toggleFormElementsState(adformElement.children, true);
toggleFormElementsState(filtersFormElement.children, true);

// Валидация


const validateGuestsAndRooms = (rooms, guests, element) => {
  if (rooms === 100 && guests !== 0) {
    element.setCustomValidity(Validattion.ONLY_100_ROOMS);
  } else if (rooms < guests && guests !== 0) {
    element.setCustomValidity(Validattion.GUESTS_MORE_THEN_ROOMS);
  } else if (rooms !== 100 && guests === 0) {
    element.setCustomValidity(Validattion.NOT_FOR_GUESTS);
  } else {
    element.setCustomValidity(``);
  }
  element.reportValidity();
};

const onAdformInputCapacityChange = () => {
  const guests = +adformCapacityInput.value;
  const rooms = +adformRoomNumberInput.value;

  validateGuestsAndRooms(rooms, guests, adformCapacityInput);
};

const onAdformInputRoomNumberChange = () => {
  const guests = +adformCapacityInput.value;
  const rooms = +adformRoomNumberInput.value;

  validateGuestsAndRooms(rooms, guests, adformCapacityInput);
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

const onFormSubmit = (evt) => {
  evt.preventDefault();

  const guests = +adformCapacityInput.value;
  const rooms = +adformRoomNumberInput.value;
  validateGuestsAndRooms(rooms, guests, adformCapacityInput);

  if (adformCapacityInput.checkValidity() && adformRoomNumberInput.checkValidity()) {
    sendData(onSuccess, onError, new FormData(adformElement));
    adformElement.reset();
  }
};

const onPopupClick = (popup) => {
  return () => {
    popup.remove();
  };
};

const onEscPress = (popup) => {
  return (evt) => {
    if (!isEscape(evt)) {
      return;
    } else {
      document.remove(`keydown`, onEscPress(popup));
      popup.remove();
    }
  };
};

const showSuccessPopup = () => {
  const successPopup = successTemplate.cloneNode(true);
  adformElement.appendChild(successPopup);
  successPopup.addEventListener(`click`, onPopupClick(successPopup));
  document.addEventListener(`keydown`, onEscPress(successPopup));
};

const onErrorPopupBtnClick = (errorPopup) => {
  return () => {
    errorPopup.remove();
  };
};

const showErrorPopup = (errorMessage) => {
  const errorPopup = errorTemplate.cloneNode(true);
  const errorMessageElement = errorPopup.querySelector(`.error__message`);
  const errorPopupBtn = errorPopup.querySelector(`.error__button`);
  errorMessageElement.textContent = errorMessage;
  mainElement.appendChild(errorPopup);
  errorPopup.addEventListener(`click`, onPopupClick(errorPopup));
  errorPopupBtn.addEventListener(`click`, onErrorPopupBtnClick(errorPopup));
  document.addEventListener(`keydown`, onEscPress(errorPopup));
};

const onSuccess = () => {
  showSuccessPopup();
  addInactiveState();
};

const onError = (errorMessage) => {
  showErrorPopup(errorMessage);
};

const changeFormInputsEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  adformCapacityInput[method](`change`, onAdformInputCapacityChange);
  adformRoomNumberInput[method](`change`, onAdformInputRoomNumberChange);
  adformTypeInput[method](`change`, onTypeInputChange);
  adformTimeinInput[method](`change`, onTimeinInputChange);
  adformTimeoutInput[method](`change`, onTimeoutInputChange);
  adformElement[method](`submit`, onFormSubmit);
};

export const activateForm = () => {
  adformElement.classList.remove(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, false);
  toggleFormElementsState(filtersFormElement.children, false);
  changeFormInputsEventsState(true);
  adformResetBtnElement.addEventListener(`click`, onAdformResetBtnClick);
};

export const deactivateForm = () => {
  adformElement.classList.add(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, true);
  toggleFormElementsState(filtersFormElement.children, true);
  changeFormInputsEventsState(false);
  adformResetBtnElement.removeEventListener(`click`, onAdformResetBtnClick);
};

export const fillAdresInput = (x, y) => {
  adformAdressInput.value = `${x}, ${y}`;
};


const onAdformResetBtnClick = (evt) => {
  evt.preventDefault();
  adformElement.reset();
  getFillAdressInput();
};
