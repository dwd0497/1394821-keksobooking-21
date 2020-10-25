import {getAdresInput, activate} from "./map.js";


const MAIN_PIN_LEG_HEIGHT = 22;

export const pinMovement = (evt, mainPin) => {
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

    if (mainPin.offsetTop < 130 - mainPin.offsetHeight - MAIN_PIN_LEG_HEIGHT) {
      mainPin.style.top = `${130 - mainPin.offsetHeight - MAIN_PIN_LEG_HEIGHT}px`;
    } else if (mainPin.offsetTop > 630 - mainPin.offsetHeight - MAIN_PIN_LEG_HEIGHT) {
      mainPin.style.top = `${630 - mainPin.offsetHeight - MAIN_PIN_LEG_HEIGHT}px`;
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
  };
  const onMouseUp = () => {
    getAdresInput();
    activate();
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};
