const StatusCode = {
  OK: 200
};
const TIMEOUT_IN_MS = 10000;

const createXHR = (method, url, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    if (xhr.status === StatusCode.OK) {
      onSuccess(xhr.response);
    } else {
      onError(`Статус ответа: ` + xhr.status + ` ` + xhr.statusText);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ` + xhr.timeout + `мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);
  xhr.send();
};

export const loadData = (onSuccess, onError) => {
  createXHR(`GET`, `https://21.javascript.pages.academy/keksobooking/data`, onSuccess, onError);
};

