import {isEnter} from "./util.js";
import {hotelsInfo} from "./data.js";
import {showCard} from "./card.js";

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_VERTICAL_COORD: 130,
  MAX_VERTICAL_COORD: 630
};

const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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
  pin.addEventListener(`keydown`, onMapPinKeydown);

  return pin;
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

export {createPin};
