import {forEach} from "./util.js";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const IMG_TAG_NAME = `IMG`;

const createAndRenderImgElement = (parentElement) => {
  const imgElement = document.createElement(`img`);
  parentElement.appendChild(imgElement);
  return imgElement;
};

export const getImagePreview = (input, preview, type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  input[method](`change`, () => {
    forEach(input.files, (file) => {
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((fileType) => {
        return fileName.endsWith(fileType);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, () => {
          if (preview.tagName !== IMG_TAG_NAME) {
            createAndRenderImgElement(preview).src = reader.result;
          } else {
            preview.src = reader.result;
          }
        });
        reader.readAsDataURL(file);
      }
    });
  });
};
