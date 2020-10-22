import {hotelsInfo} from "./data.js";
import {removeOldCard, renderCard, changeCardEventsState} from "./card.js";

const MAIN_PIN_LEG_HEIGHT = 22;

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_VERTICAL_COORD: 130,
  MAX_VERTICAL_COORD: 630
};

const СontrolButtons = {
  LEFTMOUSEBTN: 0,
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const mainPinElement = map.querySelector(`.map__pin--main`);

const getMainpinXCoord = () => {
  return Math.round(parseInt(mainPinElement.style.left, 10) + mainPinElement.offsetWidth / 2);
};

const getMainpinYCoord = () => {
  if (map.classList.contains(`map--faded`)) {
    return Math.round(parseInt(mainPinElement.style.top, 10) + mainPinElement.offsetHeight / 2);
  }
  return Math.round(parseInt(mainPinElement.style.top, 10) + mainPinElement.offsetHeight + MAIN_PIN_LEG_HEIGHT);
};

const getMainpinCoords = () => {
  return `${getMainpinXCoord()}, ${getMainpinYCoord()}`;
};

const movePinTo = (pin, location) => {
  pin.style.top = `${location.y - Pin.HEIGHT}px`;
  pin.style.left = `${location.x - Pin.WIDTH / 2}px`;
};

const createPin = (hotel, i) => {
  const pin = pinTemplate.cloneNode(true);
  movePinTo(pin, hotel.location);
  const pinImg = pin.querySelector(`img`);
  pinImg.src = `${hotel.author.avatar}`;
  pinImg.alt = `${hotel.offer.title}`;
  pin.value = i;

  pin.addEventListener(`click`, onMapPinClick);

  return pin;
};

// обработчики

const onMapPinClick = (evt) => {
  removeOldCard();
  renderCard(hotelsInfo[evt.currentTarget.value]);
  changeCardEventsState(true);
};

const onMapPinKeydown = (evt) => {
  if (evt.key === СontrolButtons.ENTER) {
    onMapPinClick(evt);
  }
};

export {createPin, getMainpinCoords, onMapPinKeydown};
