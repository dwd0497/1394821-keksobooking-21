import {forEach, removeChildren} from "./util.js";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const IMG_TAG_NAME = `IMG`;
const AVATAR_PREVIEW = `img/muffin-grey.svg`;

const getImgElement = () => {
  return document.createElement(`img`);
};

const isImg = (element) => {
  return element.tagName !== IMG_TAG_NAME;
};

const renderImage = (element, src) => {
  element.src = src;
};

const renderImages = (src, fragment, parent, current, total) => {
  const imgElement = getImgElement();
  imgElement.src = src;
  fragment.appendChild(imgElement);
  if (current === total) {
    parent.appendChild(fragment);
  }
};

export const clearPreviewElement = (preview) => {
  if (isImg(preview)) {
    removeChildren(preview);
  } else {
    renderImage(preview, AVATAR_PREVIEW);
  }
};

export const createOnImageChange = (preview) => {
  return (evt) => {
    clearPreviewElement(preview);
    const fragment = document.createDocumentFragment();
    const input = evt.target;
    let filesCounter = 0;
    forEach(input.files, (file) => {
      const name = file.name.toLowerCase();

      const isValid = FILE_TYPES.some((fileType) => {
        return name.endsWith(fileType);
      });

      if (!isValid) {
        return;
      }

      const reader = new FileReader();

      reader.addEventListener(`load`, () => {
        filesCounter++;

        if (isImg(preview)) {
          renderImages(
              reader.result,
              fragment,
              preview,
              filesCounter,
              input.files.length
          );
        } else {
          renderImage(preview, reader.result);
        }
      });
      reader.readAsDataURL(file);
    });
  };
};
