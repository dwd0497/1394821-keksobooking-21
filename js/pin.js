import {isEnter} from "./util.js";
import {hotelsInfo} from "./data.js";
import {showCard} from "./card.js";
import {renderElements} from "./util.js";
import {removeCurrentChildren} from "./util.js";

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_VERTICAL_COORD: 130,
  MAX_VERTICAL_COORD: 630
};

const SECONDARY_PIN = `map__pin--secondary`;

const pinsElement = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const movePinTo = (pin, location) => {
  pin.style.top = `${location.y - Pin.HEIGHT}px`;
  pin.style.left = `${location.x - Pin.WIDTH / 2}px`;
};

const createPin = (hotel, i) => {
  const pin = pinTemplate.cloneNode(true);
  pin.classList.add(SECONDARY_PIN);
  movePinTo(pin, hotel.location);
  const pinImg = pin.querySelector(`img`);
  pinImg.src = `${hotel.author.avatar}`;
  pinImg.alt = `${hotel.offer.title}`;
  pin.value = i;

  pin.addEventListener(`click`, onMapPinClick);
  pin.addEventListener(`keydown`, onMapPinKeydown);

  return pin;
};

export const renderPins = () => {
  removeCurrentChildren(pinsElement, SECONDARY_PIN);
  renderElements(hotelsInfo, pinsElement, createPin);
};

export const removePins = () => {
  removeCurrentChildren(pinsElement, SECONDARY_PIN);
};

// обработчики

const onMapPinClick = (evt) => {
  showCard(hotelsInfo[evt.currentTarget.value]);
};

const onMapPinKeydown = (evt) => {
  if (!isEnter(evt)) {
    return;
  } else {
    onMapPinClick(evt);
  }
};
