"use strict";

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

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
const pinsElement = document.querySelector(`.map__pins`);
const filtersContainerElement = document.querySelector(`.map__filters-container`);

const hotelTypes = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Дворец`,
  house: `Дом`
};

map.classList.remove(`map--faded`);

function getHotels() {
  const hotels = [];
  for (let i = 1; i <= Hotels.COUNT; i++) {
    hotels.push(getHotel(i));
  }
  return hotels;
}


function getHotel(hotelNumber) {
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
}

function getRandomIntInclusive(min, max) {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
}

function getHotelCheckin() {
  const randomNum = getRandomIntInclusive(1, 3);
  if (randomNum === 1) {
    return Hotels.CHECKIN[0];
  } else if (randomNum === 2) {
    return Hotels.CHECKIN[1];
  } else {
    return Hotels.CHECKIN[2];
  }
}

function getHotelCheckout() {
  const randomNum = getRandomIntInclusive(1, 3);
  if (randomNum === 1) {
    return Hotels.CHECKOUT[0];
  } else if (randomNum === 2) {
    return Hotels.CHECKOUT[1];
  } else {
    return Hotels.CHECKOUT[2];
  }
}

// Функция условно задает тип снимаемого помещения, в зависимости от порядкового номера помещения в массиве

function getRandomHotelType(hotelNumber) {
  if (hotelNumber % 4 === 0) {
    return Hotels.TYPE[0];
  } else if (hotelNumber % 3 === 0) {
    return Hotels.TYPE[1];
  } else if (hotelNumber % 2 === 0) {
    return Hotels.TYPE[2];
  } else {
    return Hotels.TYPE[3];
  }
}

function getRandomSlice(elements) {
  return elements.slice(getRandomIntInclusive(0, elements.length - 1));
}

function getHotelLocationY() {
  return getRandomIntInclusive(Pin.MIN_VERTICAL_COORD, Pin.MAX_VERTICAL_COORD);
}

function getHotelLocationX() {
  return getRandomIntInclusive(0, getMapWidth());
}

function getMapWidth() {
  return map.offsetWidth;
}

function movePinTo(pin, location) {
  pin.style.top = `${location.y - Pin.HEIGHT}px`;
  pin.style.left = `${location.x - Pin.WIDTH / 2}px`;
}

function createPin(hotel) {
  const pin = pinTemplate.cloneNode(true);
  movePinTo(pin, hotel.location);
  const pinImg = pin.querySelector(`img`);
  pinImg.src = `${hotel.author.avatar}`;
  pinImg.alt = `${hotel.offer.title}`;
  return pin;
}

const hotelsInfo = getHotels();

renderElements(hotelsInfo, pinsElement, createPin);

// Тут код для отрисовки карточки отеля

function createСard(hotel) {
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

  renderElements(hotel.offer.photos, сard.querySelector(`.popup__photos`), renderPhoto);

  renderElements(hotel.offer.features, сard.querySelector(`.popup__features`), renderFeature);

  return сard;
}

function renderFeatureField(condition, element, cb) {
  if (condition) {
    return cb(element);
  }
  return element.remove();
}

function renderElements(elements, containerElement, renderElement) {
  removeChildren(containerElement);
  const fragment = document.createDocumentFragment();
  elements.forEach((element) => {
    fragment.appendChild(renderElement(element));
  });
  containerElement.appendChild(fragment);
}


function renderFeature(feature) {
  const featureElement = document.createElement(`li`);
  featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
  return featureElement;
}

function renderPhoto(img) {
  const imgElement = document.createElement(`img`);
  imgElement.classList.add(`popup__photo`);
  imgElement.style.width = `40px`;
  imgElement.style.height = `40px`;
  imgElement.src = `${img}`;
  return imgElement;
}

function removeChildren(parentElement) {
  while (parentElement.firstChild) {
    parentElement.firstChild.remove();
  }
}

function renderCard(hotels) {
  map.insertBefore(createСard(hotels[0]), filtersContainerElement);
}

renderCard(hotelsInfo);
