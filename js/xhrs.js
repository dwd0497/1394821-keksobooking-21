const Code = {
  SUCCESS: 200,
  CACHED: 302,
  INVALID_REQUEST: 400,
  AUTHORIZATION_ERROR: 401,
  ERROR_NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const TIMEOUT_IN_MS = 1000;

const createXHR = (method, url, onSuccess, onError) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {
    let error;
    switch (xhr.status) {
      case Code.SUCCESS:
        onSuccess(xhr.response);
        break;

      case Code.INVALID_REQUEST:
        error = `Неверный запрос`;
        break;
      case Code.AUTHORIZATION_ERROR:
        error = `Пользователь не авторизован`;
        break;
      case Code.ERROR_NOT_FOUND:
        error = `Ничего не найдено`;
        break;
      case Code.SERVER_ERROR:
        error = `Ошибка сервера`;
        break;

      default:
        error = `Cтатус ответа: ${xhr.status} ${xhr.statusText}`;
    }
    if (error) {
      onError(error);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(`Произошла ошибка соединения`);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`Запрос не успел выполниться за ${xhr.timeout} мс`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);
  xhr.send();
};

export const loadData = (onSuccess, onError) => {
  createXHR(`GET`, `https://21.javascript.pages.academy/keksobooking/data`, onSuccess, onError);
};

