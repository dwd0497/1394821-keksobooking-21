import {clearParentAndRenderElements} from "./util.js";

const hotelTypes = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Дворец`,
  house: `Дом`
};

const HotelImgs = {
  WIDTH: 45,
  HEIGHT: 40
};

const СontrolButtons = {
  LEFTMOUSEBTN: 0,
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

const map = document.querySelector(`.map`);
const filtersContainerElement = document.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);

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

const renderCard = (card) => {
  map.insertBefore(createСard(card), filtersContainerElement);
};

const onEscPress = (evt) => {
  if (evt.key === СontrolButtons.ESCAPE) {
    removeOldCard();
    changeCardEventsState(false);
  }
};

const onCardCloseBtnClick = () => {
  removeOldCard();
  changeCardEventsState(false);
};

const removeOldCard = () => {
  const oldCard = map.querySelector(`.map__card`);
  if (oldCard) {
    oldCard.remove();
  }
};

const changeCardEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  const popupCloseBtn = map.querySelector(`.popup__close`);
  if (popupCloseBtn) {
    popupCloseBtn[method](`click`, onCardCloseBtnClick);
    document[method](`keydown`, onEscPress);
  }
};

export {removeOldCard, renderCard, changeCardEventsState};
