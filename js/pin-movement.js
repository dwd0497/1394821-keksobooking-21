import {getAdresInput} from "./map.js";

export const pinMovement = (evt, mainPin, mainPinHeight) => {
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

    if (mainPin.offsetTop < 130 - mainPin.offsetHeight - mainPinHeight) {
      mainPin.style.top = `${130 - mainPin.offsetHeight - mainPinHeight}px`;
    } else if (mainPin.offsetTop > 630 - mainPin.offsetHeight - mainPinHeight) {
      mainPin.style.top = `${630 - mainPin.offsetHeight - mainPinHeight}px`;
    } else {
      mainPin.style.top = (mainPin.offsetTop - shift.y) + `px`;
    }

    if (mainPin.offsetLeft < 0 - mainPin.offsetWidth / 2) {
      mainPin.style.left = `${-mainPin.offsetWidth / 2}px`;
    } else if (mainPin.offsetLeft > 1200 - mainPin.offsetWidth / 2) {
      mainPin.style.left = `${1200 - mainPin.offsetWidth / 2}px`;
    } else {
      mainPin.style.left = (mainPin.offsetLeft - shift.x) + `px`;
    }

    getAdresInput();
  };
  const onMouseUp = () => {
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};
