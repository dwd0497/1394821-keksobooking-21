import {isEnter, isLeftMouseBtnClick} from "./util.js";
import {activate} from "./map.js";

const mainPinElement = document.querySelector(`.map__pin--main`);

const MAIN_PIN_LEG_HEIGHT = 22;

export const getMainpinXCoord = () => {
  return Math.round(parseInt(mainPinElement.style.left, 10) + mainPinElement.offsetWidth / 2);
};

export const getMainpinYCoord = (mapElement) => {
  if (mapElement.classList.contains(`map--faded`)) {
    return Math.round(parseInt(mainPinElement.style.top, 10) + mainPinElement.offsetHeight / 2);
  }
  return Math.round(parseInt(mainPinElement.style.top, 10) + mainPinElement.offsetHeight + MAIN_PIN_LEG_HEIGHT);
};

const onMainpinMousedown = (evt) => {
  if (!isLeftMouseBtnClick(evt)) {
    return;
  } else {
    activate();
  }
};

const onMainpinKeydown = (evt) => {
  if (!isEnter(evt)) {
    return;
  } else {
    activate();
  }
};

export const changeMainpinEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  mainPinElement[method](`mousedown`, onMainpinMousedown);
  mainPinElement[method](`keydown`, onMainpinKeydown);
};

changeMainpinEventsState(true);
