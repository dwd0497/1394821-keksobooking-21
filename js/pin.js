import {isEnter, forEach} from "./util.js";
import {hotelsInfo} from "./data.js";
import {showCard} from "./card.js";
import {renderElements} from "./util.js";
import {removeCurrentChildren} from "./util.js";

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_VERTICAL_COORD: 130,
  MAX_VERTICAL_COORD: 630,
  CLASS_SECONDARY: `map__pin--secondary`,
  CLASS_ACTIVE: `map__pin--active`
};

const pinsElement = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

const movePinTo = (pin, location) => {
  pin.style.top = `${location.y - Pin.HEIGHT}px`;
  pin.style.left = `${location.x - Pin.WIDTH / 2}px`;
};

const createPin = (hotel, i) => {
  const pin = pinTemplate.cloneNode(true);
  pin.classList.add(Pin.CLASS_SECONDARY);
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
  removePins();
  renderElements(hotelsInfo, pinsElement, createPin);
};

export const removePins = () => {
  removeCurrentChildren(pinsElement, Pin.CLASS_SECONDARY);
};

const deletePinActiveClass = () => {
  forEach(pinsElement.children, (pin) => {
    if (pin.classList.contains(Pin.CLASS_ACTIVE)) {
      pin.classList.remove(Pin.CLASS_ACTIVE);
    }
  });
};


const onMapPinClick = (evt) => {
  deletePinActiveClass();
  evt.currentTarget.classList.add(Pin.CLASS_ACTIVE);
  showCard(hotelsInfo[evt.currentTarget.value]);
};

const onMapPinKeydown = (evt) => {
  if (!isEnter(evt)) {
    return;
  } else {
    onMapPinClick(evt);
  }
};
