import {updatePins} from "./pin.js";
import {filter} from "./util.js";

const Prices = {
  CHEAP: 10000,
  EXPENSIVE: 50000,
};

const housingTypeSelect = document.querySelector(`#housing-type`);
const housingPriceSelect = document.querySelector(`#housing-price`);


const onHousingTypeSelectChange = () => {
  updatePins(filterByType);
};

const onHousingPriceSelectChange = () => {
  updatePins(filterByPrice);
};

const filterByType = (data, maxCount) => {
  return filter(data, (hotel) => filterByTypeСondition(hotel), maxCount);
};

const filterByTypeСondition = (hotel) => {
  return housingTypeSelect.value === `any` || housingTypeSelect.value === hotel.offer.type;
};

const filterByPrice = (data, maxCount) => {
  return filter(data, (hotel) => filterByPriceСondition(hotel), maxCount);
};

const filterByPriceСondition = (hotel) => {
  return housingPriceSelect.value === `any` ||
    housingPriceSelect.value === `low` && hotel.offer.price < Prices.CHEAP ||
    (housingPriceSelect.value === `middle` &&
      hotel.offer.price >= Prices.CHEAP &&
      hotel.offer.price <= Prices.EXPENSIVE) ||
    housingPriceSelect.value === `high` && hotel.offer.price > Prices.EXPENSIVE;
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


