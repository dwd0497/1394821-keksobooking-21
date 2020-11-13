import {isEscape} from "./util.js";

const errorTemplate = document.querySelector(`#error`).content.querySelector(`.error`);

export const showErrorPopup = (errorMessage, parentElement) => {
  const errorPopup = errorTemplate.cloneNode(true);
  const errorMessageElement = errorPopup.querySelector(`.error__message`);
  const errorPopupBtn = errorPopup.querySelector(`.error__button`);
  errorMessageElement.textContent = errorMessage;
  parentElement.appendChild(errorPopup);
  errorPopup.addEventListener(`click`, onPopupClick(errorPopup));
  errorPopupBtn.addEventListener(`click`, onErrorPopupBtnClick(errorPopup));
  document.addEventListener(`keydown`, onEscPress(errorPopup));
};

const onPopupClick = (popup) => {
  return () => {
    popup.remove();
  };
};

const onEscPress = (popup) => {
  return (evt) => {
    if (!isEscape(evt)) {
      return;
    } else {
      document.removeEventListener(`keydown`, onEscPress(popup));
      popup.remove();
    }
  };
};

const onErrorPopupBtnClick = (errorPopup) => {
  return () => {
    errorPopup.remove();
  };
};
