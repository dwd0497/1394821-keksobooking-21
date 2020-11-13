import {create as createEmitter} from "./events.js";
import {forEach, isEscape} from "./util.js";
import {Validattion} from "./texts.js";
import {sendData} from "./xhrs.js";
import {getImagePreview, clearPreviewElement} from "./imagePreview.js";
import {showErrorPopup} from "./errorPopup.js";

export const emitter = createEmitter();

const ROOMS_VALUE_100 = 100;
const GUESTS_VALUE_0 = 0;

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
const avatarInput = document.querySelector(`#avatar`);
const avatarPreviewElement = document.querySelector(`.ad-form-header__preview img`);
const hotelPhotoInput = document.querySelector(`#images`);
const hotelPhotoPreviewElement = document.querySelector(`.ad-form__photo`);

const toggleFormElementsState = (formElements, isDisabled) => {
  forEach(formElements, function (element) {
    element.disabled = isDisabled;
  });
};

toggleFormElementsState(adformElement.children, true);
toggleFormElementsState(filtersFormElement.children, true);


const validateGuestsAndRooms = (rooms, guests, element) => {
  if (rooms === ROOMS_VALUE_100 && guests !== GUESTS_VALUE_0) {
    element.setCustomValidity(Validattion.ONLY_100_ROOMS);
  } else if (rooms < guests && guests !== GUESTS_VALUE_0) {
    element.setCustomValidity(Validattion.GUESTS_MORE_THEN_ROOMS);
  } else if (rooms !== ROOMS_VALUE_100 && guests === GUESTS_VALUE_0) {
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
  setMinPriceAndPlaceholder();
};

const setMinPriceAndPlaceholder = () => {
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
  }
};

const onPopupClick = (popup) => {
  return () => {
    popup.remove();
  };
};

const createOnEscPress = (popup) => {
  const onEscPress = (evt) => {
    if (!isEscape(evt)) {
      return;
    }
    document.removeEventListener(`keydown`, onEscPress);
    popup.remove();
  };
  return onEscPress;
};

const showSuccessPopup = () => {
  const successPopup = successTemplate.cloneNode(true);
  adformElement.appendChild(successPopup);
  successPopup.addEventListener(`click`, onPopupClick(successPopup));
  document.addEventListener(`keydown`, createOnEscPress(successPopup));
};

const onSuccess = () => {
  showSuccessPopup();
  deactivateForm();
  adformElement.reset();
  setMinPriceAndPlaceholder();
};

const onError = (errorMessage) => {
  showErrorPopup(errorMessage, mainElement);
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
  getImagePreview(avatarInput, avatarPreviewElement, true);
  getImagePreview(hotelPhotoInput, hotelPhotoPreviewElement, true);
};

export const deactivateForm = () => {
  adformElement.classList.add(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, true);
  toggleFormElementsState(filtersFormElement.children, true);
  changeFormInputsEventsState(false);
  adformResetBtnElement.removeEventListener(`click`, onAdformResetBtnClick);
  getImagePreview(avatarInput, avatarPreviewElement, false);
  getImagePreview(hotelPhotoInput, hotelPhotoPreviewElement, false);
  clearPreviewElement(avatarPreviewElement);
  clearPreviewElement(hotelPhotoPreviewElement);
  emitter.emit(`deactivate`);
};

export const fillAdresInput = (x, y) => {
  adformAdressInput.value = `${x}, ${y}`;
};

const onAdformResetBtnClick = (evt) => {
  evt.preventDefault();
  adformElement.reset();
  deactivateForm();
};
