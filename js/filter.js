import {updatePins} from "./pin.js";
import {filter} from "./util.js";
import {debounce} from "./debounce.js";

const Prices = {
  CHEAP: 10000,
  EXPENSIVE: 50000,
};

const mapFiltersElement = document.querySelector(`.map__filters`);
const housingTypeSelect = mapFiltersElement.querySelector(`#housing-type`);
const housingPriceSelect = mapFiltersElement.querySelector(`#housing-price`);
const housingRoomsSelect = mapFiltersElement.querySelector(`#housing-rooms`);
const housingGuestsSelect = mapFiltersElement.querySelector(`#housing-guests`);
const housingFeatures = mapFiltersElement.querySelector(`#housing-features`);


const createInitialFilters = () => {
  return {
    "housing-type": `any`,
    "housing-price": `any`,
    "housing-rooms": `any`,
    "housing-guests": `any`
  };
};

const selectedFeatures = new Set();

const currentFilterState = createInitialFilters();

const filterByFeatures = (features) => {
  return [...selectedFeatures].every((feature) => features.includes(feature.value));
};

const isAny = function (value) {
  return value === `any`;
};

const filterByTypeСondition = (value, currentValue) => {
  return isAny(currentValue) || value === currentValue;
};

const filterByPriceСondition = (value, currentValue) => {
  return isAny(currentValue) || currentValue === `low` && value < Prices.CHEAP ||
    (currentValue === `middle` &&
      value >= Prices.CHEAP &&
      value <= Prices.EXPENSIVE) ||
    currentValue === `high` && value > Prices.EXPENSIVE;
};

const filterByRoomsСondition = (value, currentValue) => {
  return isAny(currentValue) || value === +currentValue;
};

const filterByGuestsСondition = (value, currentValue) => {
  return isAny(currentValue) || value === +currentValue;
};

const getFiltered = (data, maxCount) => {
  return filter(data, (hotel) => {
    return filterByTypeСondition(hotel.offer.type, currentFilterState[`housing-type`]) &&
      filterByPriceСondition(hotel.offer.price, currentFilterState[`housing-price`]) &&
      filterByRoomsСondition(hotel.offer.rooms, currentFilterState[`housing-rooms`]) &&
      filterByGuestsСondition(hotel.offer.guests, currentFilterState[`housing-guests`]) &&
      filterByFeatures(hotel.offer.features);
  }, maxCount);
};

const onSelectChange = debounce((evt) => {
  currentFilterState[evt.target.name] = evt.target.value;
  updatePins(getFiltered);
});

const onhousingFeaturesChange = debounce((evt) => {
  if (selectedFeatures.has(evt.target)) {
    selectedFeatures.delete(evt.target);
  } else {
    selectedFeatures.add(evt.target);
  }
  updatePins(getFiltered);
});

const changeFiltersEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  housingTypeSelect[method](`change`, onSelectChange);
  housingPriceSelect[method](`change`, onSelectChange);
  housingRoomsSelect[method](`change`, onSelectChange);
  housingGuestsSelect[method](`change`, onSelectChange);
  housingFeatures[method](`change`, onhousingFeaturesChange);
};

const resetCurrentFilterState = () => {
  Object.assign(currentFilterState, createInitialFilters());
  selectedFeatures.clear();
};

export const activateFilters = () => {
  changeFiltersEventsState(true);
};

export const deactivateFilters = () => {
  changeFiltersEventsState(false);
  resetCurrentFilterState();
  mapFiltersElement.reset();
};
