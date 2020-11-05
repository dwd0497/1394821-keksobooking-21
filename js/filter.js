import {updatePins} from "./pin.js";

const Prices = {
  CHEAP: 10000,
  EXPANSEIVE: 50000,
};

const housingTypeSelect = document.querySelector(`#housing-type`);
const housingPriceSelect = document.querySelector(`#housing-price`);


const onHousingTypeSelectChange = () => {
  updatePins(filterHotels);
};

const onHousingPriceSelectChange = () => {
  updatePins(filterHotels);
};

const filterHotels = (data) => {
  return data.filter((hotel) => {
    return filterByType(hotel);
  }).filter((hotel) => {
    return filterByPrice(hotel);
  });
};

const filterByType = (hotel) => {
  if (housingTypeSelect.value === `any`) {
    return true;
  } else if (housingTypeSelect.value === hotel.offer.type) {
    return true;
  }
  return false;
};

const filterByPrice = (hotel) => {
  if (housingPriceSelect.value === `any`) {
    return true;
  } else if (housingPriceSelect.value === `low` && hotel.offer.price < Prices.CHEAP) {
    return true;
  } else if (housingPriceSelect.value === `middle` &&
    hotel.offer.price >= Prices.CHEAP &&
    hotel.offer.price <= Prices.EXPANSEIVE) {
    return true;
  } else if (housingPriceSelect.value === `high` && hotel.offer.price > Prices.EXPANSEIVE) {
    return true;
  }
  return false;
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


