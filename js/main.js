"use strict";

const Hotels = {
  COUNT: 8,
  TYPE: [`palace`, `flat`, `house`, `bungalow`],
  CHECKIN: [`12: 00`, `13: 00`, `14: 00`],
  CHECKOUT: [`12: 00`, `13: 00`, `14: 00`],
  FEATURES: [`wifi`, `dishwasher`, `parking`, `washer`, `elevator`, `conditioner`],
  PHOTOS: [
    `http://o0.github.io/assets/images/tokyo/hotel1.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel2.jpg`,
    `http://o0.github.io/assets/images/tokyo/hotel3.jpg`
  ]
};

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);

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
      features: getHotelFeatures(),
      description: `описание отеля`,
      photos: getHotelPhotos()
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

function getHotelFeatures() {
  const features = [];
  for (let i = 0; i <= getRandomIntInclusive(1, Hotels.FEATURES.length - 1); ++i) {
    features.push(Hotels.FEATURES[i]);
  }
  return features;
}

function getHotelPhotos() {
  const photos = [];
  for (let i = 0; i <= getRandomIntInclusive(1, Hotels.PHOTOS.length - 1); i++) {
    photos.push(Hotels.PHOTOS[i]);
  }
  return photos;
}

function getHotelLocationY() {
  return getRandomIntInclusive(130, 630);
}

function getHotelLocationX() {
  return getRandomIntInclusive(0, getMapWidth());
}

function getMapWidth() {
  return map.offsetWidth;
}

function createPin(hotel) {
  const pin = pinTemplate.cloneNode(true);
  pin.style = `left: ${hotel.location.x}px; top: ${hotel.location.y}px`;
  const pinImg = pin.querySelector(`img`);
  pinImg.src = `${hotel.author.avatar}`;
  pinImg.setAttribute(`alt`, `${hotel.offer.title}`);
  return pin;
}

function renderPins(hotels) {
  const fragment = document.createDocumentFragment();
  for (let i = 0; i < hotels.length; i++) {
    const hotel = hotels[i];
    fragment.appendChild(createPin(hotel));
  }
  document.querySelector(`.map__pins`).appendChild(fragment);
}

renderPins(getHotels());
