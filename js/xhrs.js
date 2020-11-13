const Code = {
  SUCCESS: 200,
  INVALID_REQUEST: 400,
  AUTHORIZATION_ERROR: 401,
  ERROR_NOT_FOUND: 404,
  SERVER_ERROR: 500
};

const Method = {
  GET: `GET`,
  POST: `POST`,
};

const Server = {
  LOAD: `https://21.javascript.pages.academy/keksobooking/data`,
  SEND: `https://21.javascript.pages.academy/keksobooking`,
};

const XHRErrorMessage = {
  INVALID_REQUEST: `Неверный запрос. Ошибка 400.`,
  AUTHORIZATION_ERROR: `Пользователь не авторизован. Ошибка 401.`,
  ERROR_NOT_FOUND: `Информация не найдена. Ошибка 404.`,
  SERVER_ERROR: `Ошибка сервера. Ошибка 500.`,
  CONNECTION_ERROR: `Произошла ошибка соединения.`,
  TIMEOUT_ERROR: `Запрос не успел выполниться за`,
  MILLISECONDS: `мс`,
};

const errorCodes = {
  400: XHRErrorMessage.INVALID_REQUEST,
  401: XHRErrorMessage.AUTHORIZATION_ERROR,
  404: XHRErrorMessage.ERROR_NOT_FOUND,
  500: XHRErrorMessage.SERVER_ERROR,
};

const TIMEOUT_IN_MS = 10000;

const createXHR = (url, onSuccess, onError, method = Method.GET, data = null) => {
  const xhr = new XMLHttpRequest();

  xhr.responseType = `json`;

  xhr.addEventListener(`load`, () => {

    if (xhr.status === Code.SUCCESS) {
      onSuccess(xhr.response);
    } else {
      onError(errorCodes[xhr.status]);
    }
  });

  xhr.addEventListener(`error`, function () {
    onError(XHRErrorMessage.CONNECTION_ERROR);
  });
  xhr.addEventListener(`timeout`, function () {
    onError(`${XHRErrorMessage.TIMEOUT_ERROR} ${xhr.timeout} ${XHRErrorMessage.MILLISECONDS}`);
  });

  xhr.timeout = TIMEOUT_IN_MS;

  xhr.open(method, url);
  xhr.send(data);
};

export const loadData = (onSuccess, onError) => {
  createXHR(Server.LOAD, onSuccess, onError);
};

export const sendData = (onSuccess, onError, data) => {
  createXHR(Server.SEND, onSuccess, onError, Method.POST, data);
};

