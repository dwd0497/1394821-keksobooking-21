import {getFillAdressInput} from "./map.js";

const MainPinPosition = {
  MIN_VERTICAL: 0,
  MAX_VERTICAL: 1200,
  MIN_HORIZONTAL: 130,
  MAX_HORIZONTAL: 630,
};

export const runPinMovement = (evt, mainPin, mainPinLegHeight) => {
  let startCoords = {
    x: evt.clientX,
    y: evt.clientY
  };

  const onMouseMove = (moveEvt) => {
    const shift = {
      x: startCoords.x - moveEvt.clientX,
      y: startCoords.y - moveEvt.clientY
    };

    startCoords = {
      x: moveEvt.clientX,
      y: moveEvt.clientY
    };

    const getMainPinHeight = () => {
      return mainPin.offsetHeight + mainPinLegHeight;
    };

    const getMinMainPinYCoord = () => {
      return MainPinPosition.MIN_HORIZONTAL - getMainPinHeight();
    };

    const getMaxMainPinYCoord = () => {
      return MainPinPosition.MAX_HORIZONTAL - getMainPinHeight();
    };

    if (mainPin.offsetTop < getMinMainPinYCoord()) {
      mainPin.style.top = `${getMinMainPinYCoord()}px`;
    } else if (mainPin.offsetTop > getMaxMainPinYCoord()) {
      mainPin.style.top = `${getMaxMainPinYCoord()}px`;
    } else {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
    }

    const getMainPinCenter = () => {
      return Math.ceil(mainPin.offsetWidth / 2);
    };

    const getMinMainPinXCoord = () => {
      return (MainPinPosition.MIN_VERTICAL - getMainPinCenter());
    };

    const getMaxMainPinXCoord = () => {
      return MainPinPosition.MAX_VERTICAL - getMainPinCenter();
    };

    if (mainPin.offsetLeft < getMinMainPinXCoord()) {
      mainPin.style.left = `${-getMainPinCenter()}px`;
    } else if (mainPin.offsetLeft > getMaxMainPinXCoord()) {
      mainPin.style.left = `${getMaxMainPinXCoord()}px`;
    } else {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
    }

    getFillAdressInput();
  };
  const onMouseUp = () => {
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};
