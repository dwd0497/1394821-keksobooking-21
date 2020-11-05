import {updatePins} from "./pin.js";

const housingTypeSelect = document.querySelector(`#housing-type`);

const onHousingTypeSelectChange = () => {
  updatePins(filterHotels);
};

const filterHotels = (data) => {
  return data.filter((hotel) => {
    return hotel.offer.type === housingTypeSelect.value;
  });
};

const changeFiltersEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  housingTypeSelect[method](`change`, onHousingTypeSelectChange);
};

export const activateFilters = () => {
  changeFiltersEventsState(true);
};

export const deactivateFilters = () => {
  changeFiltersEventsState(false);
};


