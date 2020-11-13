import {isEnter, isLeftMouseButton} from "./util.js";
import {runPinMovement} from "./pin-movement.js";
import {activate} from "./map.js";

const MainPin = {
  START_X_COORD: `570px`,
  START_Y_COORD: `375px`,
  LEG_HEIGHT: 22,
};

const mainPinElement = document.querySelector(`.map__pin--main`);

const getMainPinHeight = () => {
  return mainPinElement.offsetHeight;
};

const getMainPinWidth = () => {
  return mainPinElement.offsetWidth;
};

export const getMainpinXCoord = () => {
  return Math.round(parseInt(mainPinElement.style.left, 10) + getMainPinWidth() / 2);
};

export const getMainpinYCoord = (mapElement) => {
  if (mapElement.classList.contains(`map--faded`)) {
    return Math.round(parseInt(mainPinElement.style.top, 10) + getMainPinHeight() / 2);
  }
  return Math.round(parseInt(mainPinElement.style.top, 10) + getMainPinHeight() + MainPin.LEG_HEIGHT);
};

const onMainpinMousedown = (evt) => {
  if (!isLeftMouseButton(evt)) {
    return;
  } else {
    activate();
    runPinMovement(evt, mainPinElement, MainPin.LEG_HEIGHT);
  }
};

const onMainpinKeydown = (evt) => {
  if (!isEnter(evt)) {
    return;
  } else {
    activate();
  }
};

export const returnPinToOriginalPosition = () => {
  mainPinElement.style.top = MainPin.START_Y_COORD;
  mainPinElement.style.left = MainPin.START_X_COORD;
};

export const changeMainpinEventsState = (type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  mainPinElement[method](`mousedown`, onMainpinMousedown);
  mainPinElement[method](`keydown`, onMainpinKeydown);
};

changeMainpinEventsState(true);
