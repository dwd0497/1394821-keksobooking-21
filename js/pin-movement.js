import {create as createEmitter} from "./events.js";

const MainPinPosition = {
  MIN_VERTICAL: 130,
  MAX_VERTICAL: 630,
  MIN_HORIZONTAL: 0,
  MAX_HORIZONTAL: 1200,
};

export const emitter = createEmitter();

const getCoord = (coord, offset) => {
  return {
    x: coord.x - offset.x,
    y: coord.y - offset.y
  };
};

const getAddress = (coord, xDiff, yDiff) => {
  return {
    x: Math.floor(coord.x + xDiff),
    y: Math.floor(coord.y + yDiff)
  };
};

const convertAddressToCoord = (address, xDiff, yDiff) => {
  return getAddress(address, -xDiff, -yDiff);
};

const pinMove = (pinElement, {x, y}) => {
  pinElement.style.left = `${x}px`;
  pinElement.style.top = `${y}px`;
};

export const runPinMovement = (evt, mainPin, pinLegHeight) => {
  const rect = mainPin.getBoundingClientRect();
  const parentRect = mainPin.parentNode.getBoundingClientRect();

  const offset = {
    x: evt.clientX - rect.x,
    y: evt.clientY - rect.y
  };

  const xDiff = mainPin.offsetWidth / 2;
  const yDiff = mainPin.offsetHeight + pinLegHeight;

  const onMouseMove = (moveEvt) => {
    let coord = getCoord({
      x: moveEvt.clientX - parentRect.x,
      y: moveEvt.clientY - parentRect.y
    }, offset);

    const address = getAddress(coord, xDiff, yDiff);

    address.x = Math.max(address.x, MainPinPosition.MIN_HORIZONTAL);
    address.x = Math.min(address.x, MainPinPosition.MAX_HORIZONTAL);
    address.y = Math.max(address.y, MainPinPosition.MIN_VERTICAL);
    address.y = Math.min(address.y, MainPinPosition.MAX_VERTICAL);

    pinMove(mainPin, convertAddressToCoord(address, xDiff, yDiff));

    emitter.emit(`move`);
  };
  const onMouseUp = () => {
    document.removeEventListener(`mousemove`, onMouseMove);
    document.removeEventListener(`mouseup`, onMouseUp);
  };

  document.addEventListener(`mousemove`, onMouseMove);
  document.addEventListener(`mouseup`, onMouseUp);
};
