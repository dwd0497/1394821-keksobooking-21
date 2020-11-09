import {updatePins} from "./pin.js";
import {filter} from "./util.js";

const Prices = {
  CHEAP: 10000,
  EXPENSIVE: 50000,
};

const currentFilterState = {
  "housing-type": `any`,
  "housing-price": `any`,
};

const housingTypeSelect = document.querySelector(`#housing-type`);
const housingPriceSelect = document.querySelector(`#housing-price`);

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

const getFiltered = function (data, maxCount) {
  return filter(data, (hotel) => {
    return filterByTypeСondition(hotel.offer.type, currentFilterState[`housing-type`]) &&
      filterByPriceСondition(hotel.offer.price, currentFilterState[`housing-price`]);
  }, maxCount);
};

const onHousingTypeSelectChange = function (evt) {
  currentFilterState[evt.target.name] = evt.target.value;

  updatePins(getFiltered);
};

const onHousingPriceSelectChange = function (evt) {
  currentFilterState[evt.target.name] = evt.target.value;

  updatePins(getFiltered);
};

const changeFiltersEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  housingTypeSelect[method](`change`, onHousingTypeSelectChange);
  housingPriceSelect[method](`change`, onHousingPriceSelectChange);
};

export const activateFilters = () => {
  changeFiltersEventsState(true);
};

export const deactivateFilters = () => {
  changeFiltersEventsState(false);
};
