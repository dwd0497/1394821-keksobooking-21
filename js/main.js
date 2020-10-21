"use strict";

const СontrolButtons = {
  LEFTMOUSEBTN: 0,
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const Hotels = {
  COUNT: 8,
  TYPE: [`palace`, `flat`, `house`, `bungalow`],
  CHECKIN: [`12:00`, `13:00`, `14:00`],
  CHECKOUT: [`12:00`, `13:00`, `14:00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  PHOTOS: [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ]
};

const Pin = {
  WIDTH: 50,
  HEIGHT: 70,
  MIN_VERTICAL_COORD: 130,
  MAX_VERTICAL_COORD: 630
};

const HotelImgs = {
  WIDTH: 45,
  HEIGHT: 40
};

const MAIN_PIN_LEG_HEIGHT = 22;

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const adformElement = document.querySelector(`.ad-form`);
const adformAdressInput = adformElement.querySelector(`#address`);
const adformCapacityInput = adformElement.querySelector(`#capacity`);
const adformRoomNumberInput = adformElement.querySelector(`#room_number`);
const adformTypeInput = adformElement.querySelector(`#type`);
const adformPriceInput = adformElement.querySelector(`#price`);
const adformTimeinInput = adformElement.querySelector(`#timein`);
const adformTimeoutInput = adformElement.querySelector(`#timeout`);
const filtersFormElement = document.querySelector(`.map__filters`);
const mainPinElement = map.querySelector(`.map__pin--main`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const pinsElement = document.querySelector(`.map__pins`);
const filtersContainerElement = document.querySelector(`.map__filters-container`);

const hotelTypes = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Дворец`,
  house: `Дом`
};

const minPrices = {
  bungalow: 0,
  flat: 1000,
  house: 5000,
  palace: 10000
};

const getHotels = () => {
  const hotels = [];
  for (let i = 1; i <= Hotels.COUNT; i++) {
    hotels.push(getHotel(i));
  }
  return hotels;
};


const getHotel = (hotelNumber) => {
  const hotel = {
    author: {
      avatar: `img/avatars/user0${hotelNumber}.png`
    },
    offer: {
      title: `Hotel № ${hotelNumber}`,
      price: 300 * hotelNumber,
      type: getRandomHotelType(hotelNumber),
      rooms: hotelNumber,
      guests: hotelNumber * 2,
      checkin: getHotelCheckin(),
      checkout: getHotelCheckout(),
      features: getRandomSlice(Hotels.FEATURES),
      description: `описание отеля`,
      photos: getRandomSlice(Hotels.PHOTOS)
    },
    location: {
      x: getHotelLocationX(),
      y: getHotelLocationY()
    }
  };
  hotel.offer.address = `${hotel.location.x}, ${hotel.location.y}`;
  return hotel;
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getHotelCheckin = () => {
  const randomNum = getRandomIntInclusive(1, 3);
  if (randomNum === 1) {
    return Hotels.CHECKIN[0];
  } else if (randomNum === 2) {
    return Hotels.CHECKIN[1];
  } else {
    return Hotels.CHECKIN[2];
  }
};

const getHotelCheckout = () => {
  const randomNum = getRandomIntInclusive(1, 3);
  if (randomNum === 1) {
    return Hotels.CHECKOUT[0];
  } else if (randomNum === 2) {
    return Hotels.CHECKOUT[1];
  } else {
    return Hotels.CHECKOUT[2];
  }
};

// Функция условно задает тип снимаемого помещения, в зависимости от порядкового номера помещения в массиве

const getRandomHotelType = (hotelNumber) => {
  if (hotelNumber % 4 === 0) {
    return Hotels.TYPE[0];
  } else if (hotelNumber % 3 === 0) {
    return Hotels.TYPE[1];
  } else if (hotelNumber % 2 === 0) {
    return Hotels.TYPE[2];
  } else {
    return Hotels.TYPE[3];
  }
};

const getRandomSlice = (elements) => {
  return elements.slice(getRandomIntInclusive(0, elements.length - 1));
};

const getHotelLocationY = () => {
  return getRandomIntInclusive(Pin.MIN_VERTICAL_COORD, Pin.MAX_VERTICAL_COORD);
};

const getHotelLocationX = () => {
  return getRandomIntInclusive(0, getMapWidth());
};

const getMapWidth = () => {
  return map.offsetWidth;
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

const hotelsInfo = getHotels();

// Тут код для отрисовки карточки отеля

const createСard = (hotel) => {
  const сard = cardTemplate.cloneNode(true);

  renderFeatureField(
    hotel.offer.title,
    сard.querySelector(`.popup__title`),
    (element) => {
      element.textContent = hotel.offer.title;
    }
  );

  renderFeatureField(
    hotel.offer.address,
    сard.querySelector(`.popup__text--address`),
    (element) => {
      element.textContent = hotel.offer.address;
    }
  );

  renderFeatureField(
    hotel.offer.price,
    сard.querySelector(`.popup__text--price`),
    (element) => {
      element.textContent = `${hotel.offer.price}₽/ночь`;
    }
  );

  renderFeatureField(
    hotel.offer.type,
    сard.querySelector(`.popup__type`),
    (element) => {
      element.textContent = hotelTypes[hotel.offer.type];
    }
  );

  renderFeatureField(
    hotel.offer.rooms && hotel.offer.guests,
    сard.querySelector(`.popup__text--capacity`),
    (element) => {
      element.textContent = `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;
    }
  );

  renderFeatureField(
    hotel.offer.checkin && hotel.offer.checkout,
    сard.querySelector(`.popup__text--time`),
    (element) => {
      element.textContent = `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;
    }
  );

  renderFeatureField(
    hotel.offer.description,
    сard.querySelector(`.popup__description`),
    (element) => {
      element.textContent = hotel.offer.description;
    }
  );

  renderFeatureField(
    hotel.author.avatar,
    сard.querySelector(`.popup__avatar`),
    (element) => {
      element.src = hotel.author.avatar;
    }
  );
  clearParentAndRenderElements(hotel.offer.photos, сard.querySelector(`.popup__photos`), renderPhoto);
  clearParentAndRenderElements(hotel.offer.features, сard.querySelector(`.popup__features`), renderFeature);

  return сard;
};

const renderFeatureField = (condition, element, cb) => {
  if (condition) {
    return cb(element);
  }
  return element.remove();
};

const clearParentAndRenderElements = (elements, containerElement, renderElement) => {
  removeChildren(containerElement);
  renderElements(elements, containerElement, renderElement);
};

const renderElements = (elements, containerElement, renderElement) => {
  const fragment = document.createDocumentFragment();
  elements.forEach((element, i) => {
    fragment.appendChild(renderElement(element, i));
  });
  containerElement.appendChild(fragment);
};


const renderFeature = (feature) => {
  const featureElement = document.createElement(`li`);
  featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
  return featureElement;
};

const renderPhoto = (img) => {
  const imgElement = document.createElement(`img`);
  imgElement.classList.add(`popup__photo`);
  imgElement.style.width = `${HotelImgs.WIDTH}px`;
  imgElement.style.height = `${HotelImgs.HEIGHT}px`;
  imgElement.src = `${img}`;
  return imgElement;
};


const removeChildren = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.firstChild.remove();
  }
};

const renderCard = (card) => {
  map.insertBefore(createСard(card), filtersContainerElement);
};


// Тут код для 4-ого задания

const forEach = (elements, cb) => Array.prototype.forEach.call(elements, cb);

const toggleFormElementsState = (formElements, isDisabled) => {
  forEach(formElements, function (element) {
    element.disabled = isDisabled;
  });
};

toggleFormElementsState(adformElement.children, true);
toggleFormElementsState(filtersFormElement.children, true);

const fillAdresInput = () => {
  adformAdressInput.value = getMainpinCoords();
};

fillAdresInput();

const changeMainpinEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  mainPinElement[method](`mousedown`, onMainpinMousedown);
  mainPinElement[method](`keydown`, onMainpinKeydown);
};

changeMainpinEventsState(true);

const onMainpinMousedown = (evt) => {
  if (evt.button === СontrolButtons.LEFTMOUSEBTN) {
    removeInactiveState();
    fillAdresInput();
    changeMainpinEventsState(false);
  }
};

const onMainpinKeydown = (evt) => {
  if (evt.key === СontrolButtons.ENTER) {
    removeInactiveState();
    fillAdresInput();
    changeMainpinEventsState(false);
  }
};

const removeInactiveState = () => {
  map.classList.remove(`map--faded`);
  adformElement.classList.remove(`ad-form--disabled`);
  toggleFormElementsState(adformElement.children, false);
  toggleFormElementsState(filtersFormElement.children, false);
  adformCapacityInput.addEventListener(`change`, onAdformInputCapacityChange);
  adformTypeInput.addEventListener(`change`, onTupeInputChange);
  adformTimeinInput.addEventListener(`change`, onTimeinInputChange);
  adformTimeoutInput.addEventListener(`change`, onTimeoutInputChange);
  renderElements(hotelsInfo, pinsElement, createPin);
  map.addEventListener(`keydown`, onMapPinKeydown);
};

const getMainpinCoords = () => {
  return `${getMainpinXCoord()}, ${getMainpinYCoord()}`;
};

const getMainpinYCoord = () => {
  if (map.classList.contains(`map--faded`)) {
    return Math.round(parseInt(mainPinElement.style.top, 10) + mainPinElement.offsetHeight / 2);
  }
  return Math.round(parseInt(mainPinElement.style.top, 10) + mainPinElement.offsetHeight + MAIN_PIN_LEG_HEIGHT);
};

const getMainpinXCoord = () => {
  return Math.round(parseInt(mainPinElement.style.left, 10) + mainPinElement.offsetWidth / 2);
};

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

// тут код показа карточки отеля

const onMapPinClick = (evt) => {
  removeOldCard();
  renderCard(hotelsInfo[evt.currentTarget.value]);
  changePopupEventsState(true);
};

const onEscPress = (evt) => {
  if (evt.key === СontrolButtons.ESCAPE) {
    removeOldCard();
    changePopupEventsState(false);
  }
};

const onPopupCloseBtnClick = () => {
  removeOldCard();
  changePopupEventsState(false);
};

const onMapPinKeydown = (evt) => {
  if (evt.key === СontrolButtons.ENTER) {
    onMapPinClick(evt);
  }
};

const removeOldCard = () => {
  const oldCard = map.querySelector(`.map__card`);
  if (oldCard) {
    oldCard.remove();
  }
};

const changePopupEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  const popupCloseBtn = map.querySelector(`.popup__close`);
  if (popupCloseBtn) {
    popupCloseBtn[method](`click`, onPopupCloseBtnClick);
    document[method](`keydown`, onEscPress);
  }
};

// продолжение валидации


const onTupeInputChange = () => {
  adformPriceInput.min = minPrices[adformTypeInput.value];
};

const onTimeinInputChange = () => {
  adformTimeoutInput.value = adformTimeinInput.value;
};

const onTimeoutInputChange = () => {
  adformTimeinInput.value = adformTimeoutInput.value;
};

