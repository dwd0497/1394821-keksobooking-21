import {updatePins} from "./pin.js";
import {filter} from "./util.js";

const Prices = {
  CHEAP: 10000,
  EXPENSIVE: 50000,
};

const currentFilterState = {
  "housing-type": `any`,
  "housing-price": `any`,
  "housing-rooms": `any`,
  "housing-guests": `any`,
};

const mapFiltersElement = document.querySelector(`.map__filters`);
const housingTypeSelect = mapFiltersElement.querySelector(`#housing-type`);
const housingPriceSelect = mapFiltersElement.querySelector(`#housing-price`);
const housingRoomsSelect = mapFiltersElement.querySelector(`#housing-rooms`);
const housingGuestsSelect = mapFiltersElement.querySelector(`#housing-guests`);

const isAny = function (value) {
  return value === `any`;
};

const filterByTypeСondition = function (value, currentValue) {
  return isAny(currentValue) || value === currentValue;
};

const filterByPriceСondition = function (value, currentValue) {
  return isAny(currentValue) || currentValue === `low` && value < Prices.CHEAP ||
    (currentValue === `middle` &&
      value >= Prices.CHEAP &&
      value <= Prices.EXPENSIVE) ||
    currentValue === `high` && value > Prices.EXPENSIVE;
};

const filterByRoomsСondition = function (value, currentValue) {
  return isAny(currentValue) || value === +currentValue;
};

const filterByGuestsСondition = function (value, currentValue) {
  return isAny(currentValue) || value === +currentValue;
};

const getFiltered = function (data, maxCount) {
  return filter(data, (hotel) => {
    return filterByTypeСondition(hotel.offer.type, currentFilterState[`housing-type`]) &&
      filterByPriceСondition(hotel.offer.price, currentFilterState[`housing-price`]) &&
      filterByRoomsСondition(hotel.offer.rooms, currentFilterState[`housing-rooms`]) &&
      filterByGuestsСondition(hotel.offer.guests, currentFilterState[`housing-guests`]);
  }, maxCount);
};

const onSelectChange = function (evt) {
  currentFilterState[evt.target.name] = evt.target.value;
  updatePins(getFiltered);
};

const changeFiltersEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  housingTypeSelect[method](`change`, onSelectChange);
  housingPriceSelect[method](`change`, onSelectChange);
  housingRoomsSelect[method](`change`, onSelectChange);
  housingGuestsSelect[method](`change`, onSelectChange);
};

const resetCurrentFilterState = () => {
  for (let key in currentFilterState) {
    if (currentFilterState.hasOwnProperty(key)) {
      currentFilterState[key] = `any`;
    }
  }
};

export const activateFilters = () => {
  changeFiltersEventsState(true);
};

export const deactivateFilters = () => {
  changeFiltersEventsState(false);
  resetCurrentFilterState();
  mapFiltersElement.reset();
};
