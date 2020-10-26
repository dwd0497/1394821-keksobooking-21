import {isEscape, clearParentAndRenderElements} from "./util.js";
import {mapInsertBefore} from "./map.js";

const HotelImgs = {
  WIDTH: 45,
  HEIGHT: 40
};

const hotelTypes = {
  flat: `Квартира`,
  bungalow: `Бунгало`,
  palace: `Дворец`,
  house: `Дом`
};

const filtersContainerElement = document.querySelector(`.map__filters-container`);
const cardTemplate = document.querySelector(`#card`).content.querySelector(`.map__card`);
let currentCard = null;

const createСard = (hotel) => {
  const card = cardTemplate.cloneNode(true);
  card.style.display = `none`;

  renderFeatureField(
      hotel.offer.title,
      card.querySelector(`.popup__title`),
      (element) => {
        element.textContent = hotel.offer.title;
      }
  );

  renderFeatureField(
      hotel.offer.address,
      card.querySelector(`.popup__text--address`),
      (element) => {
        element.textContent = hotel.offer.address;
      }
  );

  renderFeatureField(
      hotel.offer.price,
      card.querySelector(`.popup__text--price`),
      (element) => {
        element.textContent = `${hotel.offer.price}₽/ночь`;
      }
  );

  renderFeatureField(
      hotel.offer.type,
      card.querySelector(`.popup__type`),
      (element) => {
        element.textContent = hotelTypes[hotel.offer.type];
      }
  );

  renderFeatureField(
      hotel.offer.rooms && hotel.offer.guests,
      card.querySelector(`.popup__text--capacity`),
      (element) => {
        element.textContent = `${hotel.offer.rooms} комнаты для ${hotel.offer.guests} гостей`;
      }
  );

  renderFeatureField(
      hotel.offer.checkin && hotel.offer.checkout,
      card.querySelector(`.popup__text--time`),
      (element) => {
        element.textContent = `Заезд после ${hotel.offer.checkin}, выезд до ${hotel.offer.checkout}`;
      }
  );

  renderFeatureField(
      hotel.offer.description,
      card.querySelector(`.popup__description`),
      (element) => {
        element.textContent = hotel.offer.description;
      }
  );

  renderFeatureField(
      hotel.author.avatar,
      card.querySelector(`.popup__avatar`),
      (element) => {
        element.src = hotel.author.avatar;
      }
  );
  clearParentAndRenderElements(hotel.offer.photos, card.querySelector(`.popup__photos`), renderPhoto);
  clearParentAndRenderElements(hotel.offer.features, card.querySelector(`.popup__features`), renderFeature);

  return card;
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
  const cardElement = createСard(card);
  mapInsertBefore(cardElement, filtersContainerElement);
  changeCardEventsState(true, cardElement);

  return cardElement;
};

const onEscPress = (evt) => {
  if (!isEscape(evt)) {
    return;
  } else {
    changeCardEventsState(false, currentCard);
  }
};

const onCardCloseBtnClick = () => {
  changeCardEventsState(false, currentCard);
};

export const hideOldCard = () => {
  if (!currentCard) {
    return;
  }
  currentCard.style.display = `none`;
};

const changeCardEventsState = (type, cardElement) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  const popupCloseBtn = cardElement.querySelector(`.popup__close`);
  if (popupCloseBtn) {
    popupCloseBtn[method](`click`, onCardCloseBtnClick);
    document[method](`keydown`, onEscPress);
  }
};

export const showCard = (cardNumber) => {
  hideOldCard();
  const cards = document.querySelectorAll(`.map__card`);
  cards.forEach((card, i)=>{
    if (i === +cardNumber) {
      card.style.display = `block`;
      currentCard = card;
    }
  });
};

export const createCards = (hotelsData) => {
  hotelsData.forEach((element) => {
    renderCard(element);
  });
};
