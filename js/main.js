"use strict";

const map = document.querySelector(`.map`);

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

map.classList.remove(`map--faded`);

function getHotels() {
  let hotels = [];
  for (let i = 1; i <= Hotels.COUNT; i++) {
    hotels.push(getHotel(i));
  }
  return hotels;
}

let hotels = getHotels();

function getHotel(i) {
  const hotel = {
    author: {
      avatar: `img/avatars/user0${i}.png`
    },
    offer: {
      title: `Hotel № ${i}`,
      price: 300 * i,
      type: getHotelType(i),
      rooms: i,
      guests: i * 2,
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

function getHotelType(i) {
  if (i / 1 === 1 || i / 5 === 1) {
    return Hotels.TYPE[0];
  } else if (i / 2 === 1 || i / 6 === 1) {
    return Hotels.TYPE[1];
  } else if (i / 3 === 1 || i / 7 === 1) {
    return Hotels.TYPE[2];
  } else {
    return Hotels.TYPE[3];
  }
}

function getHotelFeatures() {
  let features = [];
  for (let i = 0; i < getRandomIntInclusive(1, Hotels.FEATURES.length); i++) {
    features.push(Hotels.FEATURES[i]);
  }
  return features;
}

function getHotelPhotos() {
  let photos = [];
  for (let i = 0; i < getRandomIntInclusive(1, Hotels.PHOTOS.length); i++) {
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

function createPin(i) {
  let pin = document.querySelector(`#pin`).content.querySelector(`.map__pin`).cloneNode(true);
  pin.style = `left: ${hotels[i].location.x}px; top: ${hotels[i].location.y}px`;
  let pinImg = pin.querySelector(`img`);
  pinImg.src = `${hotels[i].author.avatar}`;
  pinImg.setAttribute(`alt`, `${hotels[i].offer.title}`);
  return pin;
}

function renderPins() {
  let fragment = document.createDocumentFragment();
  for (let i = 0; i < hotels.length; i++) {
    fragment.appendChild(createPin(i));
  }
  document.querySelector(`.map__pins`).appendChild(fragment);
}
renderPins();
