import {getRandomIntInclusive, getRandomSlice} from "./util.js";

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

const getHotelLocationY = () => {
  return getRandomIntInclusive(Pin.MIN_VERTICAL_COORD, Pin.MAX_VERTICAL_COORD);
};

const getHotelLocationX = () => {
  return getRandomIntInclusive(0, getMapWidth());
};


const getMapWidth = () => {
  return map.offsetWidth;
};

const hotelsInfo = getHotels();

export {hotelsInfo};
