const createXHR = (method, url, onSuccess) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.open(method, url);

  xhr.addEventListener(`load`, () => {
    onSuccess(xhr.response);
  });

  xhr.send();
};

export const loadData = (onSuccess) => {
  createXHR(`GET`, `https://21.javascript.pages.academy/keksobooking/data`, onSuccess);
};

