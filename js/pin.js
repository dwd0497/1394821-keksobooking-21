import {isEnter} from "./util.js";
import {showCard, removeOldCard} from "./card.js";
import {renderAndGetElements} from "./util.js";

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_VERTICAL_COORD: 130,
  MAX_VERTICAL_COORD: 630,
  CLASS_SECONDARY: `map__pin--secondary`,
  CLASS_ACTIVE: `map__pin--active`,
  MAX_COUNT: 8,
};

const pinsElement = document.querySelector(`.map__pins`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

let pins = null;
export let data = [];
let activePin = null;

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

export const renderPins = (hotelsData) => {
  data = hotelsData;
  removePins();
  pins = renderAndGetElements(data, pinsElement, createPin, Pin.MAX_COUNT);
};

export const removePins = () => {
  if (pins !== null && pins !== []) {
    pins.forEach((element) => element.remove());
  }
};

const deletePinActiveClass = () => {
  if (activePin) {
    activePin.classList.remove(Pin.CLASS_ACTIVE);
  }
};

const onMapPinClick = (evt) => {
  deletePinActiveClass();
  const target = evt.currentTarget;
  activePin = target;
  target.classList.add(Pin.CLASS_ACTIVE);
  showCard(data[target.value]);
};

const onMapPinKeydown = (evt) => {
  if (!isEnter(evt)) {
    return;
  } else {
    onMapPinClick(evt);
  }
};

// Фильтрация

export const updatePins = (cb) => {
  removePins();
  removeOldCard();
  pins = renderAndGetElements(cb(data), pinsElement, createPin, Pin.MAX_COUNT);
};
