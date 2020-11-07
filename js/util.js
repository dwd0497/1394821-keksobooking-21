const СontrolButtons = {
  LEFT_MOUSE_BTN: 0,
  ENTER: `Enter`,
  ESCAPE: `Escape`,
};

export function isEnter(evt) {
  return evt.key === СontrolButtons.ENTER;
}

export function isEscape(evt) {
  return evt.key === СontrolButtons.ESCAPE;
}

export function isLeftMouseButton(evt) {
  return evt.button === СontrolButtons.LEFT_MOUSE_BTN;
}

export const renderElements = (elements, containerElement, renderElement) => {
  const fragment = document.createDocumentFragment();

  elements.forEach((element, i) => {
    fragment.appendChild(renderElement(element, i));
  });
  containerElement.appendChild(fragment);
};

export const renderAndGetElements = (elements, containerElement, renderElement, maxElenetCount = null) => {
  const fragment = document.createDocumentFragment();
  let currentElements = [];
  if (maxElenetCount) {
    elements = elements.slice(0, maxElenetCount);
  }
  elements.forEach((element, i) => {
    const currentElement = renderElement(element, i);
    fragment.appendChild(currentElement);
    currentElements.push(currentElement);
  });
  containerElement.appendChild(fragment);
  return currentElements;
};

export const clearParentAndRenderElements = (elements, containerElement, renderElement) => {
  removeChildren(containerElement);
  renderElements(elements, containerElement, renderElement);
};

export const removeChildren = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.firstChild.remove();
  }
};

export const removeCurrentChildren = (parentElement, element) => {
  for (let i = parentElement.children.length - 1; i > 0; i--) {
    if (parentElement.children[i].classList.contains(element)) {
      parentElement.children[i].remove();
    }
  }
};

export const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

export const getRandomSlice = (elements) => {
  return elements.slice(getRandomIntInclusive(0, elements.length - 1));
};

export const forEach = (elements, cb) => Array.prototype.forEach.call(elements, cb);

export const filter = (elements, cb, count) => {
  const outElements = [];
  // Помещаем дополнительное условие выхода из цикла
  for (let i = 0; i < elements.length && outElements.length !== count; i++) {
    const element = elements[i];
    // Оригинальный фильтр, в cb передает элемент, индекс и массив
    // сделаем также, для переносимости функций-колбэков между нашей и оригинальной реализациями
    if (!cb(element, i, elements)) {
      continue;
    }
    outElements.push(element);
  }
  return outElements;
};
