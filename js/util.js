const renderElements = (elements, containerElement, renderElement) => {
  const fragment = document.createDocumentFragment();
  elements.forEach((element, i) => {
    fragment.appendChild(renderElement(element, i));
  });
  containerElement.appendChild(fragment);
};

const clearParentAndRenderElements = (elements, containerElement, renderElement) => {
  removeChildren(containerElement);
  renderElements(elements, containerElement, renderElement);
};

const removeChildren = (parentElement) => {
  while (parentElement.firstChild) {
    parentElement.firstChild.remove();
  }
};

const getRandomIntInclusive = (min, max) => {
  min = Math.ceil(min);
  max = Math.floor(max);
  return Math.floor(Math.random() * (max - min + 1) + min);
};

const getRandomSlice = (elements) => {
  return elements.slice(getRandomIntInclusive(0, elements.length - 1));
};

export {renderElements, clearParentAndRenderElements, removeChildren, getRandomIntInclusive, getRandomSlice};
