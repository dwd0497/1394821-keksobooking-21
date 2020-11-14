const getListeners = (allListeners, event) => {
  const listeners = allListeners[event] ? allListeners[event] : new Set();
  allListeners[event] = listeners;

  return listeners;
};

const on = function (event, onEvent) {
  const listeners = getListeners(this.listeners, event);
  listeners.add(onEvent);
};

const off = function (event, onEvent) {
  const listeners = getListeners(this.listeners, event);
  listeners.delete(onEvent);
};

const emit = function (event, ...args) {
  const listeners = getListeners(this.listeners, event);

  listeners.forEach((listener) => {
    listener(...args);
  });
};

export const create = () => {
  return {
    listeners: {},
    on, off, emit
  };
};
