const СontrolButtons = {
  LEFTMOUSEBTN: 0,
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
  return evt.key === СontrolButtons.Enter;
}

export const renderElements = (elements, containerElement, renderElement) => {
  const fragment = document.createDocumentFragment();
  elements.forEach((element, i) => {
    fragment.appendChild(renderElement(element, i));
  });
  containerElement.appendChild(fragment);
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