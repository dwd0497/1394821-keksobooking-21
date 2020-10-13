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

function renderPins(hotels) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    fragment.appendChild(createPin(hotel));
  }
  pinsElement.appendChild(fragment);
}

const hotelsInfo = getHotels();

renderPins(hotelsInfo);

// Тут код для отрисовки карточки отеля

function createСard(hotel) {
  const сard = cardTemplate.cloneNode(true);

  renderFeatureField(
      hotel.offer.title,
      сard.querySelector(`.popup__title`),
      (element) => {
        element.innerText = hotel.offer.title;
      }
  );

  renderFeatureField(
      hotel.offer.address,
      сard.querySelector(`.popup__text--address`),
      (element) => {
        element.innerText = hotel.offer.address;
      }
  );

  renderFeatureField(
      hotel.offer.price,
      сard.querySelector(`.popup__text--price`),
      (element) => {
        element.innerText = `${hotel.offer.price}₽/ночь`;
      }
  );

  renderFeatureField(
      hotel.offer.type,
      сard.querySelector(`.popup__type`),
      (element) => {
        element.innerText = hotelTypes[hotel.offer.type];
      }
  );

  renderFeatureField(
      hotel.offer.rooms && hotel.offer.guests,
      сard.querySelector(`.popup__text--capacity`),
      (element) => {
        element.innerText = `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;
      }
  );

  renderFeatureField(
      hotel.offer.checkin && hotel.offer.checkout,
      сard.querySelector(`.popup__text--time`),
      (element) => {
        element.innerText = `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;
      }
  );

  renderFeatureField(
      hotel.offer.description,
      сard.querySelector(`.popup__description`),
      (element) => {
        element.innerText = hotel.offer.description;
      }
  );

  renderFeatureField(
      hotel.author.avatar,
      сard.querySelector(`.popup__avatar`),
      (element) => {
        element.src = hotel.author.avatar;
      }
  );

  renderFeatures(сard.querySelector(`.popup__features`), hotel.offer.features);
  renderPhotos(сard.querySelector(`.popup__photos`), hotel.offer.photos);

  return сard;
}

function renderFeatureField(condition, element, cb) {
  if (condition) {
    return cb(element);
  }
  return element.remove();
}

function renderFeatures(featuresElement, features) {
  removeChildrens(featuresElement);
  const fragment = document.createDocumentFragment();
  features.forEach((feature) => {
    const featureElement = renderFeature(feature);
    fragment.appendChild(featureElement);
  });
  featuresElement.appendChild(fragment);
}

function renderFeature(feature) {
  const featureElement = document.createElement(`li`);
  featureElement.classList.add(`popup__feature`, `popup__feature--${feature}`);
  return featureElement;
}

function renderPhotos(featuresElement, imgs) {
  removeChildrens(featuresElement);
  const fragment = document.createDocumentFragment();
  imgs.forEach((img) => {
    const featureElement = renderPhoto(img);
    fragment.appendChild(featureElement);
  });
  featuresElement.appendChild(fragment);
}

function renderPhoto(img) {
  const imgElement = document.createElement(`img`);
  imgElement.classList.add(`popup__photo`);
  imgElement.width = `40`;
  imgElement.height = `40`;
  imgElement.src = `${img}`;
  return imgElement;
}

function removeChildrens(ParentElement) {
  while (ParentElement.firstChild) {
    ParentElement.firstChild.remove();
  }
}


function renderCards(hotels) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createСard(hotels[0]));
  map.insertBefore(fragment, filtersContainerElement);
}

renderCards(hotelsInfo);
