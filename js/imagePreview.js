import {forEach} from "./util.js";

const FILE_TYPES = [`gif`, `jpg`, `jpeg`, `png`];
const IMG_TAG_NAME = `IMG`;

const getImgElement = () => {
  return document.createElement(`img`);
};

export const getImagePreview = (input, preview, type) => {
  const method = type ? `addEventListener` : `removeEventListener`;
  input[method](`change`, () => {
    const fragment = document.createDocumentFragment();
    let filesCounter = 0;
    forEach(input.files, (file) => {
      const fileName = file.name.toLowerCase();

      const matches = FILE_TYPES.some((fileType) => {
        return fileName.endsWith(fileType);
      });

      if (matches) {
        const reader = new FileReader();

        reader.addEventListener(`load`, () => {
          if (preview.tagName !== IMG_TAG_NAME) {
            const imgElement = getImgElement();
            imgElement.src = reader.result;
            fragment.appendChild(imgElement);
            filesCounter++;
            if (filesCounter === input.files.length) {
              preview.appendChild(fragment);
            }
          } else {
            preview.src = reader.result;
          }
        });
        reader.readAsDataURL(file);
      }
    });
  });
};
