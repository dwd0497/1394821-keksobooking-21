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

const Pin = {
  WIDTH: 50,
  HEIGHT: 70
};

const map = document.querySelector(`.map`);
const pinTemplate = document.querySelector(`#pin`).content.querySelector(`.map__pin`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);


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

function getRandomSlice(inArr) {
  return inArr.slice(getRandomIntInclusive(0, inArr.length - 1));
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
  document.querySelector(`.map__pins`).appendChild(fragment);
}

const hotelsInfo = getHotels();

renderPins(hotelsInfo);

// Тут код для отрисовки карточки отеля

function createСard(hotel) {
  const сard = cardTemplate.cloneNode(true);
  сard.querySelector(`.popup__title`).innerText = hotel.offer.title;
  сard.querySelector(`.popup__text--address`).innerText = hotel.offer.address;
  сard.querySelector(`.popup__text--price`).innerText = `${hotel.offer.price}₽/ночь`;
  сard.querySelector(`.popup__type`).innerText = hotel.offer.type;
  if (hotel.offer.rooms && hotel.offer.guests) {
    сard.querySelector(`.popup__text--capacity`).innerText = `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;
  } else {
    сard.querySelector(`.popup__text--capacity`).remove();
  }
  if (hotel.offer.checkin && hotel.offer.checkout) {
    сard.querySelector(`.popup__text--time`).innerText = `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;
  } else {
    сard.querySelector(`.popup__text--time`).remove();
  }
  сard.querySelector(`.popup__features`).innerText = hotel.offer.features.join(` `);
  сard.querySelector(`.popup__description`).innerText = hotel.offer.description;
  сard.querySelector(`.popup__photos`).innerHTML = createImgSrc(hotel.offer.photos);
  сard.querySelector(`.popup__avatar`).src = hotel.author.avatar;
  return сard;
}

// function addPropertyToElement(parentElement, elementSlector, property, isHTMLEnters) {
//   const item = parentElement.querySelector(`${elementSlector}`);
//   if (isHTMLEnters === true) {
//     if (property !== ``) {
//       item.innerHTML = property;
//     } else {
//       item.remove();
//     }
//   } else {
//     if (property !== ``) {
//       item.innerText = property;
//     } else {
//       item.remove();
//     }
//   }
// }

function createImgSrc(photosSrcs) {
  for (let i = 0; i < photosSrcs.length; i++) {
    photosSrcs[i] = `<img width="100px" src="${photosSrcs[i]}">`;
  }

  return photosSrcs.join(` `);
}

function renderCards(hotels) {
  const fragment = document.createDocumentFragment();
  fragment.appendChild(createСard(hotels[0]));
  map.insertBefore(fragment, document.querySelector(`.map__filters-container`));
}

renderCards(hotelsInfo);
